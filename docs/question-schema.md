# Cert Happens Question Bank Schema

## Authority and scope

This document is the shared authoring and lifecycle contract for every Cert Happens question bank. Exam-specific identifiers, objectives, and source registers live in each bank directory, but the CSV columns, review states, answer-key rules, stimulus contract, and retirement behavior are shared.

Question content must be original. Do not copy, closely paraphrase, reconstruct, or adapt actual exam questions, vendor course questions, commercial practice questions, recalled exam content, or dumps. Official objectives and primary technical sources define scope and facts, not question wording.

## Registered authoring authorities

| Project test ID | Certification | Exam version | Objectives version | Data directory | Question ID | Batch ID | Runtime status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `SEC-701` | CompTIA Security+ | `SY0-701` | `6.0` | `data/security-plus/sec-701/` | `SEC701-0000001` | `SEC701-BATCH-001` | Registered in the quiz catalog |
| `NET-009` | CompTIA Network+ | `N10-009` | `6.0` | `data/network-plus/n10-009/` | `NET009-0000001` | `NET009-BATCH-001` | Registered in the quiz catalog |
| `CCNA-301-V2` | Cisco CCNA | `200-301 v2.0` | `2.0` | `data/ccna/200-301-v2/` | `CCNA301V2-0000001` | `CCNA301V2-BATCH-001` | Authoring-ready; not yet registered |

A later major exam version receives a new namespace so question history, reports, routes, and analytics remain unambiguous. Permanent question IDs do not encode domains or objectives because mappings can be corrected without changing the ID. Sequence numbers are never reused.

## Repository structure

Each bank uses:

```text
data/<certification>/<exam-version>/
  draft-questions.csv
  objective-map.csv
  questions.csv
  retired-questions.csv
  source-register.csv
  stimuli.json              # present when the bank uses or pre-registers stimuli
```

Shared authority and tools:

```text
docs/blank-question-template.csv
docs/blank-stimuli-template.json
docs/question-schema.md
docs/question-stimulus-schema.md
scripts/validate_question_bank.py
scripts/build_quiz_data.py
```

Only catalog-registered banks are converted into public runtime JSON. Validation may recognize an authoring-only bank before public quiz registration.

## CSV rules

- UTF-8, comma-delimited, RFC 4180 compatible.
- One header row and no spreadsheet-generated index column.
- Dates use `YYYY-MM-DD`.
- Multi-value fields use a pipe with no surrounding spaces.
- Store plain text rather than HTML or Markdown in question and explanation fields.
- Stable answer keys are `A`, `B`, `C`, and `D`. Display shuffling must preserve the stored key, answer text, and explanation.
- Do not use answer-position wording such as `both A and C`, `the choice above`, or `the previous answer`.

## Question columns

```text
question_id
test_id
certification
exam_version
objectives_version
question_version
batch_id
domain_id
domain_name
objective_id
objective_text
topic
concept_key
difficulty
question_type
question_style
question_instruction
question_text
answer_a
answer_b
answer_c
answer_d
correct_answers
correct_explanation
answer_a_explanation
answer_b_explanation
answer_c_explanation
answer_d_explanation
study_topics
source_ids
reference_notes
date_added
date_modified
date_reviewed
review_status
reviewer
quality_flags
author_notes
```

Retired rows add:

```text
retired_date
retirement_reason
replacement_question_id
```

## Allowed values

- `difficulty`: `easy`, `medium`, `hard`
- `question_type`: `single_choice`, `multi_select`, `best_available`
- `question_style`: `direct`, `scenario`, `comparison`, `calculation`
- `review_status`: `draft`, `review`, `approved`

`single_choice` and `best_available` require exactly one correct stored key. `multi_select` requires two or more sorted, unique pipe-delimited keys and an instruction stating exactly how many answers to select. `best_available` requires an instruction identifying the stated decision criterion.

## Objective and source authority

- Every question maps to one objective ID present in that bank's `objective-map.csv`.
- `domain_id`, `domain_name`, and `objective_text` must exactly match the selected objective-map row.
- Prefer the most specific published objective or subobjective that fits the tested task.
- `source_ids` must resolve to rows in that bank's `source-register.csv`.
- Use official vendor documentation, standards bodies, and other primary sources wherever practical.
- `reference_notes` should identify the precise fact, command behavior, table, section, or constraint used to review the item.

## Lifecycle workflow

1. Author new records in `draft-questions.csv`, unless the repository owner has authorized accelerated staging approval for that bank.
2. Set completed draft records to `review`, populate `date_reviewed` and `reviewer`, and run validation.
3. Perform technical, objective-mapping, ambiguity, editorial, answer-choice, source, duplication, and stimulus reviews.
4. Resolve every quality flag.
5. After approval, set the row to `approved` and move it atomically to `questions.csv`.
6. Move withdrawn public questions to `retired-questions.csv` with retirement metadata.
7. Never reuse a retired ID. A replacement receives a new ID.
8. Minor wording or explanation corrections may retain the ID and increment `question_version`. A material change to the tested concept, correct answer, scenario facts, or objective mapping normally receives a new ID.

Approved rows must have a review date and reviewer and must not retain quality flags. Production runtime data is built only from approved rows in catalog-registered `questions.csv` files.

## CCNA 200-301 v2.0 authoring authority

The CCNA map contains all 29 published numbered objectives plus all 30 lettered subobjectives, for 59 objective IDs across the five official weighted domains. Questions should use the most specific applicable ID. A parent objective may be used when it has no lettered children or when one question genuinely evaluates the umbrella task across multiple children.

CCNA identifiers are enforced as:

- Test ID: `CCNA-301-V2`
- Exam version: `200-301 v2.0`
- Objectives version: `2.0`
- Question regex: `^CCNA301V2-\d{7}$`
- Batch regex: `^CCNA301V2-BATCH-\d{3}$`

The CCNA directory is intentionally valid with header-only lifecycle CSVs and an empty stimulus registry before Batch 001. Do not add CCNA to `config/quiz-catalog.json`, publish a practice-test route, or claim that a public bank exists until approved rows are present and the full staging workflow passes.

## Optional read-only stimuli

Command output, configuration fragments, logs, and evidence tables live in the optional per-exam JSON sidecar rather than multiline CSV cells. The normal validator checks configured authoring sidecars even before a bank is added to the public quiz catalog. Catalog-registered banks are validated again while runtime JSON is built. See `docs/question-stimulus-schema.md`.
