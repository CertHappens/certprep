# NET-009 Batch 001 Review

- Batch ID: `NET009-BATCH-001`
- Review date: 2026-07-25
- Questions generated: 24
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000001` through `NET009-0000024`

## Distribution checks

| Measure | Result | Target | Status |
|---|---:|---:|---|
| Domain 1.0 | 6 | 6 | Pass |
| Domain 2.0 | 5 | 5 | Pass |
| Domain 3.0 | 4 | 4 | Pass |
| Domain 4.0 | 3 | 3 | Pass |
| Domain 5.0 | 6 | 6 | Pass |
| Easy | 6 | 6 | Pass |
| Medium | 12 | 12 | Pass |
| Hard | 6 | 6 | Pass |
| Single choice | 20 | 20 | Pass |
| Multi-select | 2 | 2 | Pass |
| Best available | 2 | 2 | Pass |
| Direct | 6 | 6 | Pass |
| Scenario | 12 | 12 | Pass |
| Comparison | 4 | 4 | Pass |
| Calculation | 2 | 2 | Pass |

## Correct-answer distribution

| Stored key | Correct selections |
|---|---:|
| A | 6 |
| B | 7 |
| C | 7 |
| D | 6 |

The two multi-select questions create 26 correct selections across 24 questions. The resulting 6, 7, 7, 6 distribution differs by no more than one and is the closest balanced distribution without changing correct answers.

## Objective coverage

- Numbered objectives covered: 22 of 25
- Objectives intentionally deferred: 1.6, 1.8, and 3.5.
- Objective 5.5 receives one direct diagnostic-tool question.
- Objective 2.2 receives two questions to cover both VLAN trunking and link aggregation.
- Objective 5.4 receives two questions to cover wireless performance and quantitative throughput reasoning.

## Programmatic arithmetic checks

- `NET009-0000006`: Confirmed 192.168.50.64/27 has network .64, broadcast .95, and usable hosts .65 through .94.
- `NET009-0000021`: Confirmed 192.168.40.70/26 belongs to 192.168.40.64/26 and gateway 192.168.40.1 is outside that subnet.
- `NET009-0000024`: Confirmed 4,000,000,000 bytes multiplied by 8 divided by 1,000,000,000 bits per second equals 32 seconds.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000001 | 1.1 | OSI model | easy | single_choice | direct | A |
| NET009-0000002 | 1.2 | Network appliances | medium | single_choice | scenario | B |
| NET009-0000003 | 1.3 | Cloud resource management | medium | single_choice | comparison | C |
| NET009-0000004 | 1.4 | DNS ports and transport | medium | multi_select | direct | A|D |
| NET009-0000005 | 1.5 | Fiber media and transceivers | medium | single_choice | scenario | D |
| NET009-0000006 | 1.7 | IPv4 subnetting | hard | single_choice | calculation | B |
| NET009-0000007 | 2.1 | Route selection | hard | best_available | scenario | C |
| NET009-0000008 | 2.2 | VLAN trunking | medium | single_choice | scenario | D |
| NET009-0000009 | 2.3 | Wireless frequency bands | easy | single_choice | comparison | A |
| NET009-0000010 | 2.4 | Power protection | easy | single_choice | direct | B |
| NET009-0000011 | 2.2 | Link aggregation | medium | single_choice | scenario | C |
| NET009-0000012 | 3.1 | Change management | medium | single_choice | scenario | D |
| NET009-0000013 | 3.2 | Packet monitoring | medium | single_choice | scenario | A |
| NET009-0000014 | 3.3 | Recovery objectives | hard | single_choice | comparison | B |
| NET009-0000015 | 3.4 | DNS record types | medium | multi_select | direct | B|C |
| NET009-0000016 | 4.1 | AAA protocols | medium | single_choice | comparison | C |
| NET009-0000017 | 4.2 | Layer 2 attacks | easy | single_choice | scenario | D |
| NET009-0000018 | 4.3 | Network access control | hard | best_available | scenario | A |
| NET009-0000019 | 5.1 | Troubleshooting methodology | easy | single_choice | direct | B |
| NET009-0000020 | 5.2 | Fiber interface troubleshooting | medium | single_choice | scenario | C |
| NET009-0000021 | 5.3 | IPv4 service troubleshooting | hard | single_choice | scenario | D |
| NET009-0000022 | 5.4 | Wireless performance | medium | single_choice | scenario | A |
| NET009-0000023 | 5.5 | Network diagnostic tools | easy | single_choice | direct | B |
| NET009-0000024 | 5.4 | Throughput calculation | hard | single_choice | calculation | C |

## Internal quality review

- All stems and concept keys are unique within the bank.
- All answer choices are populated and distinct after normalization.
- No displayed-letter-dependent wording, all-of-the-above choices, or none-of-the-above choices are used.
- Each answer choice has a separate explanation.
- Sources used by questions are registered in `source-register.csv`.
- Approved rows contain review dates and a reviewer.
- The draft file remains header-only, and the retired file remains available for future history.
