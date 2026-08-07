# Quiz Runtime Data Contract

## Purpose

`docs/question-schema.md` remains authoritative for question authoring, review, and lifecycle management.

This document describes the smaller generated JSON contract consumed by the browser quiz engine. Generated JSON is a build artifact and must not be edited manually.

## Build sources

Each public quiz is registered in `config/quiz-catalog.json`. The current active banks are:

```text
data/security-plus/sec-701/questions.csv
data/network-plus/n10-009/questions.csv
data/ccna/200-301-v2/questions.csv
```

A bank may also register:

```text
stimuli.json
responses.json
```

`stimuli.json` contains read-only evidence such as logs, configurations, command output, and tables. `responses.json` contains nested authoring data for structured response questions. Draft and retired questions are validated separately and are never included in public runtime data.

## Generated files

Each exam receives `manifest.json` and `questions.json` under `src/quiz-data/`. Eleventy copies these files to the equivalent `/quiz-data/` URLs during the production build.

## Choice-question identity

The authoring CSV stores choice content under keys `A`, `B`, `C`, and `D`. The converter creates question-specific stable IDs:

```text
SEC701-0000001:A
SEC701-0000001:B
SEC701-0000001:C
SEC701-0000001:D
```

The quiz engine may shuffle answer objects for display, but it preserves each answer's ID, text, and explanation. Grading compares selected answer IDs with `correctAnswerIds`. Displayed letters are temporary labels and are never grading keys.

## Choice-question shape

```json
{
  "id": "SEC701-0000001",
  "version": 1,
  "type": "single_choice",
  "style": "scenario",
  "difficulty": "medium",
  "instruction": null,
  "text": "Question text",
  "topic": "Digital signatures",
  "domain": {
    "id": "1.0",
    "name": "General Security Concepts"
  },
  "objective": {
    "id": "1.4",
    "text": "Objective text"
  },
  "answers": [
    {
      "id": "SEC701-0000001:A",
      "text": "Answer text",
      "explanation": "Choice-specific explanation"
    }
  ],
  "correctAnswerIds": ["SEC701-0000001:B"],
  "correctExplanation": "Overall teaching explanation",
  "studyTopics": ["Digital signatures", "Hashing"]
}
```

`correctAnswerIds` is always an array. `single_choice` and `best_available` contain one correct answer ID. `multi_select` contains two or more.

## Structured-question shape

Structured question types are `matching`, `ordering`, and `line_select`. Matching also supports a `classification` variant in which categories may be reused.

A structured runtime question contains `response` instead of `answers` and `correctAnswerIds`:

```json
{
  "id": "CCNA301V2-0000201",
  "version": 1,
  "type": "ordering",
  "instruction": "Place the troubleshooting actions in the correct order.",
  "text": "Arrange the actions from first to last.",
  "response": {
    "type": "ordering",
    "items": [
      {
        "id": "first",
        "text": "First action",
        "explanation": "Why this action belongs here."
      }
    ],
    "correctOrder": ["first", "second", "third"]
  },
  "correctExplanation": "Overall teaching explanation"
}
```

See `docs/question-response-schema.md` for the complete authoring and validation rules.

## Optional question stimulus

A question may include one read-only `stimulus` object built from `stimuli.json`. Supported stimulus types are preformatted command/configuration/log/plain text and accessible evidence tables. See `docs/question-stimulus-schema.md`.

`line_select` requires a preformatted stimulus because the learner selects actual authored evidence lines. The line-selection control renders those lines directly rather than showing a duplicate read-only copy above them.

Stimulus values become part of the public question snapshot and deterministic `dataVersion`. The browser renders authored evidence as text; authored HTML is never executed.

## Excluded internal fields

The runtime output intentionally excludes internal management and review fields, including batch ID, concept key, source IDs, reference notes, review status, reviewer, quality flags, author notes, and authoring/review dates.

## Practice-test route

Each generated test object includes `practiceTestPath`, the canonical route for that exam version's practice-test entry page. Paged navigation uses this value so all certifications share the same engine while retaining their own routes.

## Data version

Each exam manifest contains a deterministic SHA-256 `dataVersion` calculated from public test metadata and public question content. Changes to a stimulus or structured response therefore change the data version. Editorial-only changes that do not affect public runtime content do not.
