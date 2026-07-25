# NET-009 Validation Report

- Validation date: 2026-07-25
- Package: Batch 001 approved staging overlay
- Validator exit code: `0`
- Questions evaluated: 24
- Objective-map rows: 25
- Registered sources: 41

## Result

```text
NET-009 QUESTION BANK VALIDATION
==================================
INFO: Objectives: 25
INFO: Registered sources: 41
INFO: Question rows: 24
INFO: Approved answer-key counts: {'A': 6, 'B': 7, 'C': 7, 'D': 6}
INFO: Approved domain counts: {'1.0': 6, '2.0': 5, '3.0': 4, '4.0': 3, '5.0': 6}
INFO: Approved difficulty counts: {'easy': 6, 'hard': 6, 'medium': 12}
INFO: Approved type counts: {'best_available': 2, 'multi_select': 2, 'single_choice': 20}
INFO: Approved style counts: {'calculation': 2, 'comparison': 4, 'direct': 6, 'scenario': 12}
----------------------------------
Errors: 0
Warnings: 0
```

## Additional batch assertions

- Domain distribution: 6, 5, 4, 3, 6
- Difficulty distribution: 6 easy, 12 medium, 6 hard
- Type distribution: 20 single choice, 2 multi-select, 2 best available
- Style distribution: 6 direct, 12 scenario, 4 comparison, 2 calculation
- Correct-key distribution across 26 correct selections: A 6, B 7, C 7, D 6
- Unique question IDs: 24
- Unique concept keys: 24
- Programmatic subnet and transfer-time assertions: passed
