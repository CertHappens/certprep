# NET-009 Batch 006 Review

- Batch ID: `NET009-BATCH-006`
- Review date: 2026-07-26
- Questions generated: 12
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000139` through `NET009-0000150`

## Purpose of the 12-question batch

Batch 006 closes the initial build at 150 approved questions. Its 3 / 2 / 2 / 2 / 3 domain allocation optimizes the whole-number distribution at that bank size.

| Domain | Official weight | Batch 006 | Final count | Final percentage | Difference |
|---|---:|---:|---:|---:|---:|
| 1.0 Networking Concepts | 23% | 3 | 35 | 23.33% | +0.33 |
| 2.0 Network Implementation | 20% | 2 | 30 | 20.00% | 0.00 |
| 3.0 Network Operations | 19% | 2 | 28 | 18.67% | -0.33 |
| 4.0 Network Security | 14% | 2 | 21 | 14.00% | 0.00 |
| 5.0 Network Troubleshooting | 24% | 3 | 36 | 24.00% | 0.00 |

Domains 2, 4, and 5 match the official weights exactly. Domains 1 and 3 differ by one-half question from their mathematical targets and are each within 0.33 percentage points.

## Distribution checks

| Measure | Result | Planned | Status |
|---|---:|---:|---|
| Easy | 3 | 3 | Pass |
| Medium | 6 | 6 | Pass |
| Hard | 3 | 3 | Pass |
| Single choice | 10 | 10 | Pass |
| Multi-select | 1 | 1 | Pass |
| Best available | 1 | 1 | Pass |
| Direct | 4 | 4 | Pass |
| Scenario | 6 | 6 | Pass |
| Comparison | 1 | 1 | Pass |
| Calculation | 1 | 1 | Pass |

## Correct-answer distribution

| Stored key | Batch 006 selections | Cumulative selections |
|---|---:|---:|
| A | 4 | 41 |
| B | 3 | 40 |
| C | 3 | 40 |
| D | 3 | 40 |

The multi-select question creates 13 correct selections. The final cumulative distribution differs by no more than one selection.

## Coverage improvements

Batch 006 adds coverage for:

- Infrastructure as a service
- Hub-and-spoke WAN topology
- IPv4 /28 broadcast calculations
- Controller-based wireless management
- Plenum-rated cabling
- DHCP reservations
- Clientless SSL VPN access
- The confidentiality, integrity, and availability triad
- DHCP snooping
- The initial troubleshooting step
- DNS-specific service troubleshooting
- Quality of service for voice during congestion

All 25 numbered objectives retain approved coverage.

## Programmatic arithmetic check

- `NET009-0000141`: Confirmed that `192.168.100.142/28` belongs to `192.168.100.128/28` and has broadcast address `192.168.100.143`.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000139 | 1.3 | Cloud service models | medium | single_choice | comparison | B |
| NET009-0000140 | 1.6 | WAN topologies | easy | single_choice | direct | C |
| NET009-0000141 | 1.7 | IPv4 subnet boundaries | hard | single_choice | calculation | D |
| NET009-0000142 | 2.3 | Controller-based wireless | medium | single_choice | scenario | A |
| NET009-0000143 | 2.4 | Cable installation environments | easy | single_choice | direct | B |
| NET009-0000144 | 3.4 | DHCP reservations | medium | single_choice | scenario | C |
| NET009-0000145 | 3.5 | Clientless remote access | hard | best_available | scenario | D |
| NET009-0000146 | 4.1 | Security objectives | medium | multi_select | direct | A|C |
| NET009-0000147 | 4.3 | DHCP protection | hard | single_choice | scenario | B |
| NET009-0000148 | 5.1 | Troubleshooting methodology | easy | single_choice | direct | D |
| NET009-0000149 | 5.3 | Name-resolution troubleshooting | medium | single_choice | scenario | A |
| NET009-0000150 | 5.4 | Quality of service | medium | single_choice | scenario | A |

## Internal quality review

- All 150 permanent question IDs are unique and sequential.
- All 150 concept keys are unique.
- All answer choices are populated and distinct after normalization.
- The multi-select instruction states exactly how many answers to select.
- The best-available question states the decision criterion.
- Each answer choice has a separate explanation.
- Every source ID exists in `source-register.csv`.
- Approved rows contain review dates and the accelerated internal reviewer.
- Draft and retired files remain header-only.
