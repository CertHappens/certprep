# Grading and Review Contract

## Purpose

This document defines browser-side grading and completed-test review for the CertHappens quiz engine. The authoritative authoring schemas remain `docs/question-schema.md`, `docs/question-stimulus-schema.md`, and `docs/question-response-schema.md`.

## Choice grading

Choice questions are graded by stable answer IDs, not stored CSV positions and not displayed letters.

A choice question is correct only when the selected answer-ID set exactly matches `correctAnswerIds`. Order does not affect `multi_select` grading, but missing or extra selections make the response incorrect.

## Structured grading

Structured questions use exact deterministic grading:

- `matching`: every item must have its correct option.
- matching with `variant: "classification"`: every item must have its correct category; categories may be reused.
- `ordering`: the complete learner order must match `correctOrder`.
- `line_select`: the selected line-number set must exactly match `correctLineNumbers`.

There is no partial credit. Every question contributes either one correct question or zero correct questions to the overall score.

## Question status

Completed-test grading uses:

- `correct`: the complete response is correct.
- `incorrect`: the learner attempted the question but the response is wrong or incomplete.
- `unanswered`: no response was supplied.

During an active test, navigation can additionally label partial matching and line-selection work as `incomplete` so the learner can return to it before finishing.

## Overall score

The percentage is:

```text
correct questions / total questions
```

The result is rounded to the nearest whole percentage. Incorrect and unanswered questions remain in the denominator.

## Domain results

Domain results show raw counts for only the questions presented in the randomized session:

- Total
- Correct
- Incorrect
- Unanswered

The interface does not label small samples as strengths, weaknesses, or mastery.

## Elapsed time

Elapsed time is calculated from `startedAt` through `completedAt`. It represents full elapsed browser-session time, not only active reading time.

## Review order

Review uses the session's saved question order and saved response state. Nothing is shuffled again during review.

For choice questions, review shows the learner selection, correct answer, every choice in its saved display order, choice explanations, and the overall explanation.

For matching and classification, review shows each item, the learner's match/category, the correct match/category, and the item explanation.

For ordering, review shows the learner's saved order in the response summary and the correct ordered sequence with item explanations.

For selectable evidence lines, review shows the evidence lines with markers for the learner's selections and the correct lines. The active line-selection view already contains the stimulus lines, so review does not duplicate the same preformatted evidence block immediately above them.

Every review card also shows the question text, optional instruction, domain, objective, topic, and overall correct-response explanation. Correct questions use the same review format inside the expandable correct-question section.

## Stimulus review

Read-only stimuli are rendered from the session snapshot before answer analysis. For `line_select`, the evidence is rendered as the selectable/reviewable line list instead of as a second duplicate stimulus block.

## Persistence

Completed results are calculated entirely from the saved question snapshot. A later data deployment does not change a completed or unfinished test already stored in the browser tab.
