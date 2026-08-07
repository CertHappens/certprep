# Security+ Batch 012 Validation Report

- Validation date: `2026-08-07`
- Base staging commit: `121596cbc5958cc10295708379a497cc3c3e6bcc`
- Security+ question rows: 274
- New structured-response rows: 24
- Security+ stimuli: 31
- Security+ structured responses: 24
- Validation errors across all configured banks: 0
- Validation warnings across all configured banks: 0

## Batch 012 checks

- Matching interactions: 6
- Classification interactions: 6
- Ordering interactions: 6
- Selectable evidence-line interactions: 6
- Structured A-D answer fields blank: passed
- Every structured question has one matching `responses.json` entry: passed
- Every line-selection question has a preformatted stimulus: passed
- Matching one-to-one option uniqueness: passed
- Classification category reuse: supported and validated
- Ordering lists contain every item exactly once: passed
- Line-selection line numbers are sorted, unique, nonblank, and in range: passed
- Permanent question IDs are sequential through `SEC701-0000274`: passed
- Runtime quiz-data build: passed
- Full `npm test` suite: passed

## Validator output

```text
> certprep@0.6.1 validate:data
> node scripts/run_validator.mjs

SEC-701 QUESTION BANK VALIDATION
================================
INFO: Objectives: 28
INFO: Registered sources: 62
INFO: Question rows: 274
INFO: Stimuli: 31
INFO: Structured responses: 24
INFO: Approved answer-key counts: {'A': 66, 'B': 66, 'C': 66, 'D': 66}
INFO: Approved domain counts: {'1.0': 33, '2.0': 60, '3.0': 49, '4.0': 77, '5.0': 55}
INFO: Approved difficulty counts: {'easy': 69, 'hard': 66, 'medium': 139}
INFO: Approved type counts: {'best_available': 19, 'line_select': 6, 'matching': 12, 'multi_select': 13, 'ordering': 6, 'single_choice': 218}
INFO: Approved style counts: {'calculation': 7, 'comparison': 45, 'direct': 35, 'scenario': 187}
--------------------------------
Errors: 0
Warnings: 0

CCNA-301-V2 QUESTION BANK VALIDATION
====================================
INFO: Objectives: 59
INFO: Registered sources: 51
INFO: Question rows: 120
INFO: Stimuli: 40
INFO: Structured responses: 0
INFO: Approved answer-key counts: {'A': 34, 'B': 34, 'C': 34, 'D': 34}
INFO: Approved domain counts: {'1.0': 30, '2.0': 30, '3.0': 24, '4.0': 24, '5.0': 12}
INFO: Approved difficulty counts: {'easy': 28, 'hard': 28, 'medium': 64}
INFO: Approved type counts: {'best_available': 20, 'multi_select': 16, 'single_choice': 84}
INFO: Approved style counts: {'calculation': 7, 'comparison': 18, 'direct': 22, 'scenario': 73}
------------------------------------
Errors: 0
Warnings: 0

NET-009 QUESTION BANK VALIDATION
================================
INFO: Objectives: 25
INFO: Registered sources: 61
INFO: Question rows: 205
INFO: Stimuli: 25
INFO: Structured responses: 0
INFO: Approved answer-key counts: {'A': 56, 'B': 56, 'C': 56, 'D': 57}
INFO: Approved domain counts: {'1.0': 48, '2.0': 41, '3.0': 39, '4.0': 28, '5.0': 49}
INFO: Approved difficulty counts: {'easy': 49, 'hard': 49, 'medium': 107}
INFO: Approved type counts: {'best_available': 22, 'multi_select': 20, 'single_choice': 163}
INFO: Approved style counts: {'calculation': 15, 'comparison': 31, 'direct': 46, 'scenario': 113}
--------------------------------
Errors: 0
Warnings: 0

Validated question banks: 3
Total errors: 0
Total warnings: 0
```
