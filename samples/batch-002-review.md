# NET-009 Batch 002 Review

- Batch ID: `NET009-BATCH-002`
- Review date: 2026-07-25
- Questions generated: 24
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000025` through `NET009-0000048`

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

| Stored key | Batch 002 selections | Cumulative selections |
|---|---:|---:|
| A | 7 | 13 |
| B | 6 | 13 |
| C | 6 | 13 |
| D | 7 | 13 |

The two multi-select questions create 26 correct selections. Batch 002 complements Batch 001's 6, 7, 7, 6 distribution, producing an exactly balanced cumulative distribution of 13 selections for each stored key.

## Objective coverage

- Numbered objectives covered by Batch 002: 25 of 25.
- Cumulative numbered objectives covered: 25 of 25.
- Previously untouched objectives 1.6, 1.8, and 3.5 now have approved coverage.
- Every official numbered N10-009 objective now has at least one approved question.
- Objective 1.8 receives two questions to distinguish SD-WAN from VXLAN.
- Objective 3.5 receives two questions to cover management paths and VPN tunneling.
- Objective 5.2 receives two questions to cover PoE capacity and fiber optical power.

## Programmatic arithmetic checks

- `NET009-0000030`: Confirmed a /26 provides 64 total addresses and 62 conventional usable hosts; a /27 provides only 30 usable hosts.
- `NET009-0000044`: Confirmed 24 access points at 18 W require 432 W, exceeding a 370 W PoE budget by 62 W.
- `NET009-0000048`: Confirmed -2 dBm minus 12 dB equals -14 dBm and provides 4 dB of margin above a -18 dBm receiver-sensitivity threshold.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000025 | 1.6 | Data center architecture | medium | single_choice | scenario | D |
| NET009-0000026 | 1.8 | Software-defined WAN | medium | best_available | scenario | A |
| NET009-0000027 | 1.8 | Network overlays | hard | single_choice | comparison | C |
| NET009-0000028 | 1.1 | OSI protocol data units | easy | single_choice | direct | B |
| NET009-0000029 | 1.4 | Network traffic types | medium | multi_select | direct | A|D |
| NET009-0000030 | 1.7 | IPv4 subnet sizing | hard | single_choice | calculation | C |
| NET009-0000031 | 2.1 | Address translation | easy | single_choice | direct | A |
| NET009-0000032 | 2.2 | Spanning tree | medium | single_choice | scenario | D |
| NET009-0000033 | 2.3 | Wireless security | medium | single_choice | comparison | B |
| NET009-0000034 | 2.4 | Data center airflow | hard | best_available | scenario | C |
| NET009-0000035 | 2.1 | First-hop redundancy | easy | single_choice | direct | D |
| NET009-0000036 | 3.5 | Management access | medium | single_choice | comparison | A |
| NET009-0000037 | 3.5 | Remote-access VPN | medium | multi_select | scenario | B|D |
| NET009-0000038 | 3.2 | SNMP monitoring | easy | single_choice | direct | C |
| NET009-0000039 | 3.4 | DHCP relay | hard | single_choice | scenario | B |
| NET009-0000040 | 4.1 | Authorization | easy | single_choice | scenario | A |
| NET009-0000041 | 4.2 | DHCP attacks | medium | single_choice | scenario | C |
| NET009-0000042 | 4.3 | Access control lists | hard | single_choice | scenario | D |
| NET009-0000043 | 5.1 | Troubleshooting methodology | easy | single_choice | direct | B |
| NET009-0000044 | 5.2 | Power over Ethernet | medium | single_choice | scenario | A |
| NET009-0000045 | 5.3 | Switching loops | hard | single_choice | scenario | C |
| NET009-0000046 | 5.4 | Real-time traffic performance | medium | single_choice | comparison | D |
| NET009-0000047 | 5.5 | Copper cable testing | medium | single_choice | scenario | B |
| NET009-0000048 | 5.2 | Fiber optical power | medium | single_choice | calculation | A |

## Internal quality review

- All Batch 002 IDs and concept keys are unique across the complete 48-question bank.
- Batch 002 avoids the narrow concepts tested in Batch 001 while reinforcing broader objective coverage.
- All answer choices are populated and distinct after normalization.
- No displayed-letter-dependent wording, all-of-the-above choices, or none-of-the-above choices are used.
- Each answer choice has a separate teaching explanation.
- Every source ID used by Batch 002 exists in `source-register.csv`.
- Approved rows contain review dates and the accelerated internal reviewer.
- The draft file remains header-only, and the retirement structure remains available.
