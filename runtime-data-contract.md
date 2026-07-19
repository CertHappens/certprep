# Quiz Runtime Data Contract

## Purpose

`docs/question-schema.md` remains authoritative for question authoring, review, and lifecycle management.

This document describes the smaller generated JSON contract consumed by the browser quiz engine. Generated JSON is a build artifact and must not be edited manually.

## Build source

The production converter reads only the active file configured in `config/quiz-catalog.json`:

```text
data/security-plus/sec-701/questions.csv
```

Draft and retired questions are validated elsewhere but are never included in public runtime data.

## Generated files

```text
src/quiz-data/catalog.json
src/quiz-data/security-plus/sec-701/manifest.json
src/quiz-data/security-plus/sec-701/questions.json
```

Eleventy copies these files to the equivalent `/quiz-data/` URLs during the production build.

## Stable answer identity

The authoring CSV stores answer objects under keys `A`, `B`, `C`, and `D`. The converter creates question-specific IDs:

```text
SEC701-0000001:A
SEC701-0000001:B
SEC701-0000001:C
SEC701-0000001:D
```

The quiz engine may shuffle answer objects for display, but it must preserve each answer's `id`, text, and explanation. Grading compares selected answer IDs with `correctAnswerIds`. Displayed letters are temporary labels and are never grading keys.

## Public question shape

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
  "correctAnswerIds": [
    "SEC701-0000001:B"
  ],
  "correctExplanation": "Overall teaching explanation",
  "studyTopics": [
    "Digital signatures",
    "Hashing"
  ]
}
```

`correctAnswerIds` is always an array. This allows the future multi-select interface to use the same session and grading model as single-choice questions.

## Excluded internal fields

The runtime output intentionally excludes internal management and review fields, including:

- Batch ID
- Concept key
- Source IDs
- Reference notes
- Review status
- Reviewer
- Quality flags
- Author notes
- Authoring and review dates

## Data version

Each exam manifest contains a deterministic SHA-256 `dataVersion` calculated from the public test metadata and public question content. Editorial-only changes that do not affect public runtime content do not change this value.

The future session model will store this value so an unfinished or completed test can be associated with the exact question data used when the session began.
