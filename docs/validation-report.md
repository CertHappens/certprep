# NET-009 Validation Report

- Validation date: 2026-07-26
- Package: Batch 007 approved staging overlay
- Validator exit code: `0`
- Questions evaluated: 180
- Batch 007 questions: 30
- Objective-map rows: 25
- Registered sources: 61

## Result

```text
NET-009 QUESTION BANK VALIDATION
==================================
INFO: Objectives: 25
INFO: Registered sources: 61
INFO: Question rows: 180
INFO: Approved answer-key counts: {'A': 48, 'B': 48, 'C': 48, 'D': 49}
INFO: Approved domain counts: {'1.0': 42, '2.0': 36, '3.0': 34, '4.0': 25, '5.0': 43}
INFO: Approved difficulty counts: {'easy': 44, 'hard': 43, 'medium': 93}
INFO: Approved type counts: {'best_available': 13, 'multi_select': 13, 'single_choice': 154}
INFO: Approved style counts: {'calculation': 13, 'comparison': 23, 'direct': 46, 'scenario': 98}
----------------------------------
Errors: 0
Warnings: 0
```

## Additional Batch 007 assertions

- Batch domain distribution: 7, 6, 6, 4, 7
- Final cumulative domain distribution: 42, 36, 34, 25, 43
- Batch difficulty distribution: 7 easy, 16 medium, 7 hard
- Batch type distribution: 26 single choice, 2 multi-select, 2 best available
- Batch style distribution: 7 direct, 18 scenario, 3 comparison, 2 calculation
- Batch correct-key distribution: A 7, B 8, C 8, D 9
- Cumulative correct-key distribution: A 48, B 48, C 48, D 49
- Unique question IDs: 180
- Unique concept keys: 180
- Cumulative objective coverage: 25 of 25
- Programmatic full-mesh, OSPF-cost, and private-address assertions: passed
- Header-only draft and retired files: present
- Prohibited-choice, unsupported-absolute, and dash-character scans: passed
