# NET-009 Batch 003 Review

- Batch ID: `NET009-BATCH-003`
- Review date: 2026-07-25
- Questions generated: 30
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000049` through `NET009-0000078`

## Why Batch 003 contains 30 questions

Batch size is now driven by Network+ coverage needs rather than a fixed 24-question template. Thirty questions allow a near-exact official domain-weight allocation while adding meaningful subtopic depth without padding:

| Domain | Official weight | Batch 003 count | Batch percentage |
|---|---:|---:|---:|
| 1.0 Networking Concepts | 23% | 7 | 23.3% |
| 2.0 Network Implementation | 20% | 6 | 20.0% |
| 3.0 Network Operations | 19% | 6 | 20.0% |
| 4.0 Network Security | 14% | 4 | 13.3% |
| 5.0 Network Troubleshooting | 24% | 7 | 23.3% |

## Distribution checks

| Measure | Result | Planned | Status |
|---|---:|---:|---|
| Easy | 7 | 7 | Pass |
| Medium | 16 | 16 | Pass |
| Hard | 7 | 7 | Pass |
| Single choice | 26 | 26 | Pass |
| Multi-select | 2 | 2 | Pass |
| Best available | 2 | 2 | Pass |
| Direct | 7 | 7 | Pass |
| Scenario | 17 | 17 | Pass |
| Comparison | 4 | 4 | Pass |
| Calculation | 2 | 2 | Pass |

## Correct-answer distribution

| Stored key | Batch 003 selections | Cumulative selections |
|---|---:|---:|
| A | 8 | 21 |
| B | 8 | 21 |
| C | 8 | 21 |
| D | 8 | 21 |

The two multi-select questions create 32 correct selections. Batch 003 is exactly balanced with eight selections for each stored key. The cumulative bank remains exactly balanced at 21 selections for each key.

## Coverage improvements

Batch 003 adds or deepens coverage for:

- Intrusion detection versus inline prevention
- SaaS and cloud security groups
- SSH and common management ports
- Fiber connectors and collapsed-core architecture
- Infrastructure as code and source control
- OSPF, eBGP, inter-VLAN routing, route summarization, MTU, and directional antennas
- IPAM, IPFIX, syslog, high-availability modes, DHCP pool sizing, and jump hosts
- PKI certificates, evil twins, screened subnets, and device hardening
- Duplex mismatches, duplicate IP addressing, default routes, wireless roaming, DNS tools, and LLDP

All 25 numbered objectives retain approved coverage, and the new questions target distinct concepts rather than restating prior stems.

## Programmatic arithmetic checks

- `NET009-0000059`: Confirmed `10.20.8.0/22` covers exactly `10.20.8.0/24` through `10.20.11.0/24`.
- `NET009-0000066`: Confirmed the inclusive DHCP range contains 150 addresses and 15 exclusions leave 135 dynamic leases.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000049 | 1.2 | Intrusion detection and prevention | medium | single_choice | comparison | A |
| NET009-0000050 | 1.3 | Cloud service models | easy | single_choice | direct | B |
| NET009-0000051 | 1.3 | Cloud network security | medium | best_available | scenario | C |
| NET009-0000052 | 1.4 | Secure remote management | medium | single_choice | direct | D |
| NET009-0000053 | 1.5 | Fiber connectors | easy | single_choice | direct | A |
| NET009-0000054 | 1.6 | Campus architecture | hard | single_choice | scenario | B |
| NET009-0000055 | 1.8 | Infrastructure as code | medium | single_choice | scenario | C |
| NET009-0000056 | 2.1 | Interior routing protocols | medium | single_choice | scenario | D |
| NET009-0000057 | 2.1 | External routing | hard | best_available | scenario | A |
| NET009-0000058 | 2.2 | Inter-VLAN routing | medium | single_choice | scenario | B |
| NET009-0000059 | 2.1 | Route summarization | hard | single_choice | calculation | C |
| NET009-0000060 | 2.3 | Wireless antennas | easy | single_choice | scenario | D |
| NET009-0000061 | 2.2 | Maximum transmission unit | medium | single_choice | scenario | A |
| NET009-0000062 | 3.1 | IP address management | easy | single_choice | direct | B |
| NET009-0000063 | 3.2 | Flow monitoring | medium | single_choice | comparison | C |
| NET009-0000064 | 3.2 | Centralized logging | medium | single_choice | scenario | D |
| NET009-0000065 | 3.3 | High availability models | medium | multi_select | comparison | A|C |
| NET009-0000066 | 3.4 | DHCP pool capacity | hard | single_choice | calculation | B |
| NET009-0000067 | 3.5 | Privileged management access | medium | single_choice | scenario | D |
| NET009-0000068 | 4.1 | Public key infrastructure | easy | single_choice | direct | A |
| NET009-0000069 | 4.2 | Wireless attacks | medium | single_choice | scenario | C |
| NET009-0000070 | 4.3 | Network zones | hard | single_choice | scenario | B |
| NET009-0000071 | 4.3 | Device hardening | medium | multi_select | scenario | B|D |
| NET009-0000072 | 5.1 | Troubleshooting documentation | easy | single_choice | direct | C |
| NET009-0000073 | 5.2 | Ethernet interface negotiation | medium | single_choice | scenario | A |
| NET009-0000074 | 5.3 | Duplicate addressing | hard | single_choice | scenario | D |
| NET009-0000075 | 5.3 | Route troubleshooting | medium | single_choice | scenario | B |
| NET009-0000076 | 5.4 | Wireless roaming | medium | single_choice | scenario | C |
| NET009-0000077 | 5.5 | DNS troubleshooting tools | easy | single_choice | direct | A |
| NET009-0000078 | 5.5 | Neighbor discovery | hard | single_choice | comparison | D |

## Internal quality review

- All 78 permanent question IDs are unique and sequential.
- All 78 concept keys are unique.
- Every answer choice is populated and distinct after normalization.
- Multi-select instructions state exactly how many answers to select.
- Best-available questions state the decision criterion.
- No answer-position-dependent wording, all-of-the-above choices, or none-of-the-above choices are used.
- Each answer choice has a separate explanation.
- Every referenced source ID exists in `source-register.csv`.
- Approved rows contain review dates and the accelerated internal reviewer.
- The draft file remains header-only, and the normal review and retirement structure remains available.
