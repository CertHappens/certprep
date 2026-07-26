# NET-009 Batch 005 Review

- Batch ID: `NET009-BATCH-005`
- Review date: 2026-07-26
- Questions generated: 30
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000109` through `NET009-0000138`

## Coverage-driven domain allocation

Batch 005 uses a 6 / 6 / 6 / 5 / 7 allocation. Network Security receives five questions because it was the most underweight cumulative domain after Batch 004.

| Domain | Official weight | Batch 005 | Cumulative count | Cumulative percentage |
|---|---:|---:|---:|---:|
| 1.0 Networking Concepts | 23% | 6 | 32 | 23.19% |
| 2.0 Network Implementation | 20% | 6 | 28 | 20.29% |
| 3.0 Network Operations | 19% | 6 | 26 | 18.84% |
| 4.0 Network Security | 14% | 5 | 19 | 13.77% |
| 5.0 Network Troubleshooting | 24% | 7 | 33 | 23.91% |

The 138-question bank is within 0.29 percentage points of every official domain weight.

## Distribution checks

| Measure | Result | Planned | Status |
|---|---:|---:|---|
| Easy | 8 | 8 | Pass |
| Medium | 15 | 15 | Pass |
| Hard | 7 | 7 | Pass |
| Single choice | 26 | 26 | Pass |
| Multi-select | 2 | 2 | Pass |
| Best available | 2 | 2 | Pass |
| Direct | 9 | 9 | Pass |
| Scenario | 15 | 15 | Pass |
| Comparison | 4 | 4 | Pass |
| Calculation | 2 | 2 | Pass |

## Correct-answer distribution

| Stored key | Batch 005 selections | Cumulative selections |
|---|---:|---:|
| A | 8 | 37 |
| B | 8 | 37 |
| C | 8 | 37 |
| D | 8 | 37 |

The two multi-select questions create 32 correct selections. Batch 005 is exactly balanced, and the cumulative bank remains exactly balanced.

## Coverage improvements

Batch 005 adds or deepens coverage for transport-layer multiplexing, CDNs, PaaS, SNMP ports, QSFP, dual stack, longest-prefix matching, administrative distance, STP root election, allowed VLANs, guest isolation, rack capacity, lifecycle planning, configuration drift, availability checks, MTBF and MTTR, tabletop exercises, DNSSEC, microsegmentation, MAC flooding, DNS poisoning, URL filtering, certificate-key compromise, troubleshooting planning, cable distance, transceiver mismatch, DHCP exhaustion, bottleneck calculations, ping, and socket inspection.

All 25 numbered objectives retain approved coverage.

## Programmatic arithmetic checks

- `NET009-0000120`: 42U minus 16U of switches and 10U of patch panels leaves 16U.
- `NET009-0000136`: A decimal 2.5 GB file over a 200 Mbps bottleneck requires an ideal minimum of 100 seconds.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000109 | 1.1 | Transport-layer multiplexing | medium | single_choice | scenario | B |
| NET009-0000110 | 1.2 | Content delivery networks | easy | single_choice | direct | C |
| NET009-0000111 | 1.3 | Cloud service models | medium | single_choice | comparison | D |
| NET009-0000112 | 1.4 | SNMP ports | medium | multi_select | direct | A|D |
| NET009-0000113 | 1.5 | Transceiver form factors | medium | single_choice | comparison | A |
| NET009-0000114 | 1.8 | IPv6 migration | hard | best_available | scenario | C |
| NET009-0000115 | 2.1 | Route selection | hard | single_choice | scenario | D |
| NET009-0000116 | 2.1 | Routing preference | medium | single_choice | comparison | B |
| NET009-0000117 | 2.2 | Spanning tree election | easy | single_choice | direct | C |
| NET009-0000118 | 2.2 | VLAN trunking | medium | single_choice | scenario | A |
| NET009-0000119 | 2.3 | Guest wireless access | hard | best_available | scenario | D |
| NET009-0000120 | 2.4 | Rack capacity | hard | single_choice | calculation | B |
| NET009-0000121 | 3.1 | Asset lifecycle | easy | single_choice | direct | A |
| NET009-0000122 | 3.2 | Configuration monitoring | medium | single_choice | scenario | C |
| NET009-0000123 | 3.2 | Availability monitoring | medium | single_choice | scenario | B |
| NET009-0000124 | 3.3 | Reliability metrics | easy | multi_select | comparison | B|D |
| NET009-0000125 | 3.3 | Disaster recovery exercises | hard | single_choice | scenario | A |
| NET009-0000126 | 3.4 | DNS security | medium | single_choice | direct | B |
| NET009-0000127 | 4.1 | Segmentation | medium | single_choice | scenario | D |
| NET009-0000128 | 4.2 | Switching attacks | easy | single_choice | direct | A |
| NET009-0000129 | 4.2 | DNS attacks | medium | single_choice | scenario | C |
| NET009-0000130 | 4.3 | Content filtering | easy | single_choice | direct | B |
| NET009-0000131 | 4.3 | Certificate key management | hard | single_choice | scenario | C |
| NET009-0000132 | 5.1 | Troubleshooting methodology | medium | single_choice | scenario | A |
| NET009-0000133 | 5.2 | Copper distance and attenuation | medium | single_choice | scenario | B |
| NET009-0000134 | 5.2 | Transceiver compatibility | easy | single_choice | scenario | C |
| NET009-0000135 | 5.3 | DHCP service troubleshooting | medium | single_choice | scenario | C |
| NET009-0000136 | 5.4 | Bottleneck throughput | hard | single_choice | calculation | A |
| NET009-0000137 | 5.5 | Connectivity testing | easy | single_choice | direct | D |
| NET009-0000138 | 5.5 | Socket inspection | medium | single_choice | direct | D |

## Internal quality review

- All 138 permanent question IDs are unique and sequential.
- All 138 concept keys are unique.
- All answer choices are populated and distinct after normalization.
- Multi-select instructions state exactly how many answers to select.
- Best-available questions state the decision criterion.
- Every answer choice has a separate explanation.
- Every source ID exists in `source-register.csv`.
- Draft and retired files remain header-only.
