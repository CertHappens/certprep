# Question stimulus schema

## Purpose

A question may optionally present read-only evidence before its answer choices. The stimulus contract is certification-neutral and supports Security+, Network+, CCNA, and future exam engines without embedding vendor-specific behavior in the renderer.

Stimuli are stored in a separate JSON sidecar so existing question-bank CSV files do not need multiline command output or nested table data.

## Quiz configuration

Add an optional `stimuli_json` path to an exam entry in `config/quiz-catalog.json`:

```json
{
  "questions_csv": "data/ccna/200-301-v2/questions.csv",
  "stimuli_json": "data/ccna/200-301-v2/stimuli.json"
}
```

If `stimuli_json` is omitted, the quiz builds exactly as it does today. An authoring-only bank may still declare its sidecar in the validator configuration so `npm run validate:data` checks it before public quiz registration.

## Registry shape

```json
{
  "schemaVersion": 1,
  "stimuli": {
    "CCNA301V2-0000001": {
      "type": "preformatted",
      "variant": "command_output",
      "title": "Router R1 output",
      "content": "R1# show ip route\n..."
    }
  }
}
```

Each key must match an approved question ID in that exam's active CSV. Unknown IDs fail the data build.

## Preformatted stimulus

Use for command output, configuration fragments, logs, or other text where spacing and line breaks matter.

Required fields:

- `type`: `preformatted`
- `variant`: `command_output`, `configuration`, `log`, or `plain_text`
- `title`: short learner-facing label
- `content`: plain text, maximum 12,000 characters

The browser inserts `content` with `textContent`. HTML and scripts are never interpreted.

## Evidence table

```json
{
  "type": "table",
  "title": "Observed interface evidence",
  "caption": "Evidence collected after the reported outage.",
  "columns": [
    { "key": "device", "label": "Device" },
    { "key": "status", "label": "Status" }
  ],
  "rows": [
    { "device": "SW1", "status": "Up" },
    { "device": "SW2", "status": "Down" }
  ]
}
```

Rules:

- 1 to 10 columns
- Unique lowercase keys using letters, numbers, and underscores
- 1 to 50 rows
- Every row must contain exactly the declared column keys
- Cell values are plain text, maximum 500 characters each
- `caption` is optional

## Runtime behavior

The built question snapshot stores the normalized `stimulus` object. This preserves the same evidence across browser-session navigation, paged routes, completed-test review, and question reports tied to the question version and data version.

This first layer is read-only. Ordering, matching, classification, selectable lines, and multi-part response state will use separate response contracts rather than overloading the stimulus object.
