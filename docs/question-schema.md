# CompTIA Network+ NET-009 Question Schema

## Authority and scope

- Certification: `CompTIA Network+`
- Project test ID: `NET-009`
- Exam version: `N10-009`
- Objectives source: CompTIA Network+ N10-009 V9 Certification Exam Objectives
- Objectives document version: `6.0`
- Numbered objectives: `25`
- Domain weights: Networking Concepts 23%, Network Implementation 20%, Network Operations 19%, Network Security 14%, Network Troubleshooting 24%.

The cover's `V9` label is retained in the source title. The bank stores `N10-009` in `exam_version` because that is the required exam code, and stores `6.0` in `objectives_version`.

Question content must be original. Do not copy, closely paraphrase, reconstruct, or adapt actual exam questions, CertMaster questions, CompTIA social-media questions, commercial practice questions, recalled exam content, or dumps.

## Repository paths

```text
data/
  network-plus/
    n10-009/
      draft-questions.csv
      objective-map.csv
      questions.csv
      retired-questions.csv
      source-register.csv

docs/
  blank-question-template.csv
  question-schema.md
  validation-report.md

samples/
  batch-###-review.md
  batch-###-coverage-report.csv
  cumulative-coverage-report.csv
  approval-summary.md

scripts/
  validate_question_bank.py
```

Production reads only approved rows from `data/network-plus/n10-009/questions.csv`.

## Permanent identifiers

- Project test ID: `NET-009`
- Question ID example: `NET009-0000001`
- Regex: `^NET009-\d{7}$`
- Batch ID example: `NET009-BATCH-001`
- Sequence numbers are globally unique within the N10-009 bank and are never reused.
- IDs do not encode a domain or objective because mappings can be corrected without changing permanent links or analytics history.
- A future exam receives a new namespace, even when an older concept is independently rewritten.

## CSV rules

- UTF-8, comma-delimited, RFC 4180 compatible.
- One header row and no spreadsheet-generated index column.
- Dates use `YYYY-MM-DD`.
- Multi-value fields use a pipe with no surrounding spaces.
- Store plain text rather than HTML or Markdown in question and explanation fields.
- Stable answer keys are `A`, `B`, `C`, and `D`. Display shuffling must preserve the stored key, text, and explanation.
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

## Review workflow

1. Write new records in `draft-questions.csv`.
2. Set completed records to `review`, populate `date_reviewed` and `reviewer`, and run validation.
3. Perform technical, objective-mapping, ambiguity, editorial, answer-choice, source, and duplication reviews.
4. Resolve all quality flags.
5. After owner approval, set rows to `approved` and move them atomically to `questions.csv`.
6. Move withdrawn public questions to `retired-questions.csv` with retirement metadata.
7. Never reuse a retired ID. A replacement receives a new ID.
8. Minor wording or explanation corrections may retain the ID and increment `question_version`. A material change to the tested concept, correct answer, scenario facts, or objective mapping normally receives a new ID.

## First 24-question batch target

- Domain allocation: 1.0 = 6, 2.0 = 5, 3.0 = 4, 4.0 = 3, 5.0 = 6.
- Difficulty: 6 easy, 12 medium, 6 hard.
- Correct stored answers: A = 6, B = 6, C = 6, D = 6, when correctness permits.
- Initial type target: 20 single choice, 2 multi-select, 2 best available.
- Initial style target: 6 direct, 12 scenario, 4 comparison, 2 calculation.
- New rows remain in review status until explicitly approved.
- Subnetting and other arithmetic must be checked programmatically and explained step by step.
