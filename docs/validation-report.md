# NET-009 Validation Report

- Run date: 2026-08-01
- Approved question rows validated: 205
- Batch 008 question rows: 25
- Batch 008 stimulus entries: 25
- Errors: 0
- Warnings: 0

## Standard question-bank validator

```text
NET-009 QUESTION BANK VALIDATION
==================================
INFO: Objectives: 25
INFO: Registered sources: 61
INFO: Question rows: 205
INFO: Approved answer-key counts: {'A': 56, 'B': 56, 'C': 56, 'D': 57}
INFO: Approved domain counts: {'1.0': 48, '2.0': 41, '3.0': 39, '4.0': 28, '5.0': 49}
INFO: Approved difficulty counts: {'easy': 49, 'hard': 49, 'medium': 107}
INFO: Approved type counts: {'best_available': 22, 'multi_select': 20, 'single_choice': 163}
INFO: Approved style counts: {'calculation': 15, 'comparison': 31, 'direct': 46, 'scenario': 113}
----------------------------------
Errors: 0
Warnings: 0
```

## Batch 008 stimulus checks

- Permanent IDs: `NET009-0000181` through `NET009-0000205`
- Every Batch 008 question has one stimulus: yes
- Unknown stimulus question IDs: none
- Stimulus schema version: 1
- Supported stimulus forms only: yes
- Table column and row contracts valid: yes
- Preformatted variants and content limits valid: yes
- Stimulus forms: table 15, preformatted 10
- Domain allocation: 6 / 5 / 5 / 3 / 6
- Final cumulative domain distribution: 48 / 41 / 39 / 28 / 49
- Final cumulative domain percentages: 23.41% / 20.00% / 19.02% / 13.66% / 23.90%
- Difficulty distribution: easy 5, medium 14, hard 6
- Question-type distribution: single_choice 9, multi_select 7, best_available 9
- Batch correct-key inclusion: A 8, B 8, C 8, D 8
- Final correct-key inclusion: A 56, B 56, C 56, D 57
- Duplicate question IDs: none
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact duplicate answer choices: none
- High-similarity stem conflicts: none
- Programmatic subnet, full-mesh, UPS, and source-reference checks: passed

The overlay adds `stimuli_json` to the Network+ quiz-catalog entry so the existing public-data builder can validate and publish the sidecar. Automated validation does not replace staging tests, learner feedback, or periodic technical review.
