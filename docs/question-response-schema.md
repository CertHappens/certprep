# Structured question response schema

## Purpose

CertHappens supports three PBQ-like response formats without simulating a vendor interface or command line:

- `matching`: match items one-to-one or classify several items into reusable categories.
- `ordering`: arrange a short set of steps or events into the correct sequence.
- `line_select`: select one or more lines from a preformatted stimulus such as configuration, command output, or a log.

Structured response data lives in `responses.json` beside the exam's question CSV and optional `stimuli.json`. This keeps nested interaction data out of CSV while preserving the same question lifecycle, session persistence, reporting, grading, and review engine.

## Registry

```json
{
  "schemaVersion": 1,
  "responses": {}
}
```

Each key is a question ID. A structured question must have exactly one response entry whose `type` matches the CSV `question_type`. Multiple-choice question types must not have structured response entries.

For `matching`, `ordering`, and `line_select` rows, leave `answer_a` through `answer_d`, `correct_answers`, and all four answer-choice explanation fields blank. Continue to provide `question_instruction` and `correct_explanation`.

## Matching and classification

```json
{
  "type": "matching",
  "variant": "classification",
  "items": [
    {
      "id": "fe80",
      "text": "FE80::/10",
      "correctOptionId": "link_local",
      "explanation": "FE80::/10 identifies IPv6 link-local unicast addresses."
    }
  ],
  "options": [
    { "id": "link_local", "label": "Link-local unicast" },
    { "id": "multicast", "label": "Multicast" }
  ]
}
```

Rules:

- 2 to 10 items and 2 to 10 options.
- IDs are stable lowercase identifiers using letters, numbers, underscores, and hyphens.
- Every item supplies learner-facing text, one correct option ID, and an explanation.
- `variant: "matching"` is one-to-one: item and option counts must match and each correct option is used once. The interface prevents a learner from assigning one option to more than one item.
- `variant: "classification"` allows several items to use the same category.
- Option display order is randomized once when the browser session begins and then remains stable.

## Ordering

```json
{
  "type": "ordering",
  "items": [
    {
      "id": "prepare",
      "text": "Preparation",
      "explanation": "Preparation establishes the people, tools, and procedures needed before an incident."
    },
    {
      "id": "analyze",
      "text": "Detection and analysis",
      "explanation": "Detection and analysis determine whether an event is an incident and establish its scope."
    },
    {
      "id": "contain",
      "text": "Containment",
      "explanation": "Containment limits additional damage before eradication and recovery."
    }
  ],
  "correctOrder": ["prepare", "analyze", "contain"]
}
```

Rules:

- 3 to 10 items.
- `correctOrder` contains every item ID exactly once.
- The learner's initial order is randomized once per browser session.
- The interface uses keyboard-accessible Move up and Move down controls rather than requiring drag-and-drop.
- An ordering question is not considered answered until the learner moves an item or explicitly chooses **Use this order**. This handles the case where the randomized starting order is already correct.

## Selectable evidence lines

```json
{
  "type": "line_select",
  "selectionCount": 2,
  "correctLineNumbers": [3, 7]
}
```

Rules:

- Requires a `preformatted` stimulus in `stimuli.json` for the same question ID.
- `selectionCount` is 1 through 8.
- `correctLineNumbers` contains exactly that many sorted, unique positive line numbers.
- A correct line cannot be blank.
- The preformatted stimulus may contain no more than 100 lines for this response type.
- The interface preserves the authored line numbering and spacing and prevents selecting more than the required number of lines.

## Session and grading behavior

Structured response state is saved in the existing tab-scoped quiz session snapshot. A response can be `answered`, `incomplete`, or `unanswered` for navigation purposes. Partial matching or line-selection work is marked incomplete; grading treats an attempted but incomplete response as incorrect if the learner finishes the test.

Structured questions use the same one-question scoring model as existing questions. A matching question is correct only when every item has the correct match, an ordering question only when the entire order is correct, and a line-selection question only when the selected line set exactly matches the correct set.

Question reports remain compatible with the existing D1 schema. The browser stores compact stable response tokens in the existing displayed/selected-answer JSON fields so reports can identify the learner's structured response without requiring a database migration.
