# Quiz Session Contract

## Purpose

The quiz session model preserves a visitor's randomized test within the current browser tab. It keeps question order, response state, flags, and current position stable during navigation and page refreshes.

The session is stored in `sessionStorage`. It is not a user account, long-term test history, or cross-device record.

## Storage key

```text
certprep.quiz.SEC-701.session.v1
```

Each test ID receives a separate key.

## Common session shape

```json
{
  "sessionVersion": 1,
  "sessionId": "browser-generated ID",
  "test": {
    "testId": "SEC-701",
    "certification": "CompTIA Security+",
    "examVersion": "SY0-701"
  },
  "dataVersion": "sha256:...",
  "startedAt": "2026-08-07T12:00:00.000Z",
  "updatedAt": "2026-08-07T12:04:00.000Z",
  "completedAt": null,
  "currentIndex": 0,
  "questionOrder": ["SEC701-0000008"],
  "questions": {}
}
```

Each selected public question is cloned into its question state. A later deployment therefore does not silently change an unfinished test already open in the tab.

## Choice-question state

```json
{
  "question": { "id": "SEC701-0000008", "type": "single_choice" },
  "displayedAnswerIds": [
    "SEC701-0000008:D",
    "SEC701-0000008:A",
    "SEC701-0000008:C",
    "SEC701-0000008:B"
  ],
  "selectedAnswerIds": [],
  "flaggedForReview": false
}
```

Displayed letters are derived from `displayedAnswerIds` and are never stored as grading identities. Selected choices use the stable question-specific answer IDs.

## Matching and classification state

```json
{
  "question": { "id": "SEC701-0000201", "type": "matching" },
  "displayedAnswerIds": [],
  "selectedAnswerIds": [],
  "responseState": {
    "type": "matching",
    "matches": {
      "item_a": "category_one"
    },
    "optionOrder": ["category_two", "category_one"],
    "touched": true
  },
  "flaggedForReview": false
}
```

The option order is randomized once per session and then preserved. One-to-one matching does not allow the same option to satisfy multiple items. Classification may reuse categories.

## Ordering state

```json
{
  "responseState": {
    "type": "ordering",
    "order": ["step_three", "step_one", "step_two"],
    "touched": false
  }
}
```

The initial order is randomized. It remains `unanswered` until the learner deliberately moves an item or chooses **Use this order**. This prevents a coincidentally correct initial shuffle from being counted without learner confirmation.

## Selectable-line state

```json
{
  "responseState": {
    "type": "line_select",
    "selectedLineNumbers": [3, 7],
    "touched": true
  }
}
```

Only nonblank lines from the saved preformatted stimulus can be selected. The stored line numbers refer to the exact stimulus snapshot in the same question state.

## Response progress

Navigation recognizes three response states:

- `answered`: a complete choice or structured response has been provided.
- `incomplete`: matching or line-selection work has begun but is not complete.
- `unanswered`: no response has been provided. An untouched ordering shuffle is also unanswered.

The navigator shows incomplete work separately so a learner can find it before finishing.

## Completion and return to test

Finishing records `completedAt`. If incomplete or unanswered questions remain, the final-question confirmation reports both counts. Returning from results clears completion status, keeps the saved response state, and allows changes before the test is finished again.

## Reporting

Structured responses are converted to compact stable response tokens for question reports. This preserves the learner's response in the existing displayed/selected-answer report fields without a D1 schema migration.
