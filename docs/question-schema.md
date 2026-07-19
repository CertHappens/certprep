# Security+ SEC-701 Question Schema

## Authority and scope

- Certification: CompTIA Security+
- Project test ID: `SEC-701`
- Exam version: `SY0-701`
- Objectives source: CompTIA Security+ SY0-701 Exam Objectives, Version 6.0
- Objective count: 28
- Question content must be original. Do not use recalled exam content, brain dumps, commercial question-bank wording, or copied provider explanations.

### Published domain weights

| Domain | Name | Weight |
|---|---|---:|
| 1.0 | General Security Concepts | 12% |
| 2.0 | Threats, Vulnerabilities, and Mitigations | 22% |
| 3.0 | Security Architecture | 18% |
| 4.0 | Security Operations | 28% |
| 5.0 | Security Program Management and Oversight | 20% |

The source of truth for objective IDs, titles, domain names, and weights is `objective-map.csv`. The production website should treat the schema and objective map as data contracts.

## Recommended folder workflow

```text
question-bank/
  security-plus/
    sec-701/
      question-schema.md
      objective-map.csv
      source-register.csv
      blank-question-template.csv
      draft-questions.csv
      questions.csv
      retired-questions.csv
      sample-coverage-report.csv
      sample-review.md
      validate_question_bank.py
      validation-report.md
```

Keeping retired questions in a separate file is recommended. It prevents production filtering mistakes and keeps the active file small, while preserving IDs, history, review notes, and replacement links. `draft-questions.csv` and `questions.csv` use the active-question columns. `retired-questions.csv` adds three retirement-only audit columns.

## ID convention

Use `SEC701-0000001`.

- `SEC701` is the stable exam namespace.
- The seven-digit sequence is globally unique within the exam version.
- Regex: `^SEC701-\d{7}$`
- Never reuse an ID, including after retirement.
- Do not embed the domain, objective, status, or date in the permanent ID. Those values can change without changing links or analytics history.
- A future exam version should receive a new namespace, for example `SEC702-0000001`, even when a concept is adapted from an earlier bank.

## CSV format rules

- Encoding: UTF-8.
- Delimiter: comma.
- CSV convention: RFC 4180 compatible, with a single header row.
- Dates: ISO 8601 calendar dates in `YYYY-MM-DD` format.
- Multi-value fields: pipe-delimited with no surrounding spaces, for example `PKI|Certificates|Trust chains`.
- Avoid embedded line breaks in fields. Normal CSV quoting still applies to commas and quotation marks.
- Store plain text, not HTML or Markdown, in question and explanation fields.
- Keep answer labels out of prose. Do not write `both A and C`, `the choice above`, or similar position-dependent wording.

## Column definitions

| Column | Required | Format and purpose |
|---|---|---|
| `question_id` | Yes | Permanent ID matching `SEC701-0000001`. |
| `test_id` | Yes | Exactly `SEC-701`. |
| `certification` | Yes | Exactly `CompTIA Security+`. |
| `exam_version` | Yes | Exactly `SY0-701`. |
| `objectives_version` | Yes | Published objectives document version, currently `6.0`. |
| `question_version` | Yes | Positive integer. Increment for edits to a retained record. |
| `batch_id` | Yes | Creation/review batch identifier, for example `SEC701-BATCH-001`. |
| `domain_id` | Yes | One of `1.0` through `5.0`, matching the objective map. |
| `domain_name` | Yes | Exact mapped domain name. |
| `objective_id` | Yes | Exact objective ID, for example `4.3`. |
| `objective_text` | Yes | Exact objective title from the objective map. |
| `topic` | Yes | Concise learner-facing topic label. |
| `concept_key` | Yes | Stable lowercase kebab-case concept identifier used for duplicate and coverage review. |
| `difficulty` | Yes | `easy`, `medium`, or `hard`. |
| `question_type` | Yes | `single_choice`, later `multi_select` or `best_available`. |
| `question_style` | Yes | `direct`, `scenario`, `comparison`, or `calculation`. |
| `question_instruction` | Conditional | Blank for ordinary single choice. Required for multi-select or special judgment instructions. |
| `question_text` | Yes | Complete, self-contained stem with all material facts. |
| `answer_a through answer_d` | Yes | Four distinct stored choices. They may be randomized for display. |
| `correct_answers` | Yes | Stored key. One letter for single choice; sorted pipe-delimited letters for multi-select, such as `A|C`. |
| `correct_explanation` | Yes | Concise teaching explanation of the governing concept and why it answers the stem. |
| `answer_a_explanation through answer_d_explanation` | Yes | Choice-specific explanation tied to the stored answer key, not display position. |
| `study_topics` | Yes | Pipe-delimited review topics for learners who miss the question. |
| `source_ids` | Yes | Pipe-delimited IDs from `source-register.csv`; no raw URLs in the question CSV. |
| `reference_notes` | Yes | Internal section, objective, terminology, or verification notes. |
| `date_added` | Yes | Date the permanent record was created. |
| `date_modified` | Yes | Date of the most recent edit. |
| `date_reviewed` | Conditional | Date of the most recent review decision. Use it for approval, return for revision, rejection, or retirement review; blank before the first review. |
| `review_status` | Yes | `draft`, `review`, or `approved`. |
| `reviewer` | Conditional | Reviewer name or stable reviewer identifier after review. |
| `quality_flags` | No | Pipe-delimited unresolved flags, such as `possible-ambiguity` or `source-check-needed`. Approved rows must be blank. |
| `author_notes` | No | Internal drafting notes that are not shown publicly. |
### Retirement-only columns

These columns appear only in `retired-questions.csv`, not in `draft-questions.csv`, `questions.csv`, or the blank active-question template.

| Column | Required | Format and purpose |
|---|---|---|
| `retired_date` | Yes | Date the record was moved to the retired file. |
| `retirement_reason` | Yes | Concise reason such as outdated objective, disputed wording, duplication, or replacement. |
| `replacement_question_id` | No | Permanent ID of a replacement question, when applicable. |

## Allowed values

### Difficulty

- `easy`: straightforward recognition or one-step application of a core concept.
- `medium`: requires distinction between plausible alternatives or application to a realistic scenario.
- `hard`: requires multiple facts, prioritization, calculation, or careful discrimination without relying on trick wording.

Difficulty is calibrated within Security+ scope, not against specialist-level certifications.

### Question type

- `single_choice`: exactly one correct stored answer.
- `multi_select`: two or more correct stored answers; `question_instruction` must state the exact number to select.
- `best_available`: one intended answer under stated decision criteria; `question_instruction` must warn that the learner is choosing the best available option.

### Question style

- `direct`: asks for a concept, purpose, or result without an extended scenario.
- `scenario`: applies knowledge to a realistic situation.
- `comparison`: distinguishes closely related concepts or techniques.
- `calculation`: requires a Security+ appropriate computation or interpretation of numeric targets.

### Review status

- `draft`: still being written or materially revised.
- `review`: complete enough for technical and editorial review, but not public.
- `approved`: passed validation and review and may be moved to `questions.csv`.

### Review-date interpretation

The `date_reviewed` field records the latest formal review decision. It is updated when a question is approved, returned for revision, rejected, or reviewed for retirement. Approval does not require a separate date field.

## Answer storage and randomization contract

The CSV stores answer objects under stable keys `A`, `B`, `C`, and `D`. The website may shuffle the objects for display, but it must preserve each object's stored key, text, and explanation. Correctness is checked against `correct_answers`, not the displayed position.

Do not use:

- all of the above or none of the above
- both A and C
- the previous answer or the choice below
- grammar that reveals the answer after shuffling

## Review and lifecycle workflow

1. Create new records in `draft-questions.csv` with `review_status=draft`.
2. When a record is complete, change it to `review` and run automated validation.
3. Perform separate technical, objective-mapping, ambiguity, editorial, and duplicate reviews.
4. Resolve every `quality_flags` entry.
5. When approved, set the row to `approved`, update `date_reviewed` and `reviewer`, then move it atomically to `questions.csv`.
6. The production build reads only `questions.csv` and rejects any row not marked `approved`.
7. To remove a public question, move the entire row to `retired-questions.csv`, add retirement metadata, and do not reuse its ID.
8. If a replacement is created, assign a new ID and link the retired record through `replacement_question_id`.

A typo-only correction can retain the ID and increment `question_version`. A change to the tested concept, correct answer, material scenario facts, or objective mapping should normally create a replacement record so historical quiz analytics remain interpretable.

## Automated validation minimums

- All required fields are present.
- IDs are unique across draft, active, and retired files.
- Domain and objective fields exactly match `objective-map.csv`.
- Enum and date formats are valid.
- All four choices are populated and distinct.
- `correct_answers` contains valid stored keys and the count matches `question_type`.
- Every choice has an explanation.
- Source IDs exist in `source-register.csv`.
- Approved questions have `date_reviewed`, a reviewer, and no quality flags.
- Active questions are approved and have a completed review date; draft rows are draft/review; retired rows contain the retirement-only audit columns.
- Exact normalized duplicate stems are rejected.
- Position-dependent phrases are rejected.

Automated checks cannot establish technical truth or eliminate all ambiguity. Manual review remains required.

## Batch quality review

For every batch of roughly 10–20 questions:

1. Compare domain counts to published weights.
2. Review objective, topic, difficulty, type, and style coverage.
3. Compare normalized stems and `concept_key` values against all three files.
4. Inspect correct-answer distribution and repeated sequences. Balance is a diagnostic, not a rule that should distort correctness.
5. Check for long-answer clues, grammar clues, implausible distractors, unsupported absolutes, vague decision criteria, and missing scenario facts.
6. Verify every explanation independently against authoritative sources.
7. Approve only after unresolved flags are empty.

## Coverage strategy

Domain weighting should guide the bank, but objective-level coverage should prevent popular topics from crowding out less familiar material. A mature bank should track:

- domain and objective
- topic and concept key
- difficulty
- question type and style
- correct stored answer distribution
- question age and most recent review date

Use domain weights as long-run targets. Small batches may differ slightly, but cumulative coverage should be reviewed after every merge.

## Source tracking

Question rows contain stable `source_ids`; full citations and URLs live in `source-register.csv`. This keeps question CSVs readable and allows a source URL or publication version to be updated in one place.

CompTIA objectives define scope, but they are not always sufficient to verify a technical claim. Use primary sources such as NIST, CISA, RFCs, and official vendor documentation for the underlying explanation.

## Initial sample status

The ten supplied sample questions were approved by the project owner on `2026-07-19` and moved to `questions.csv`. `draft-questions.csv` is now a header-only working file.
