# NET-009 Batch 004 Review

- Batch ID: `NET009-BATCH-004`
- Review date: 2026-07-25
- Questions generated: 30
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000079` through `NET009-0000108`

## Coverage-driven batch size

Batch 004 contains 30 questions because that count supports a near-exact official domain allocation and allows meaningful coverage of remaining subtopics without padding.

| Domain | Official weight | Batch 004 count | Batch percentage |
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
| Scenario | 18 | 18 | Pass |
| Comparison | 3 | 3 | Pass |
| Calculation | 2 | 2 | Pass |

## Correct-answer distribution

| Stored key | Batch 004 selections | Cumulative selections |
|---|---:|---:|
| A | 8 | 29 |
| B | 8 | 29 |
| C | 8 | 29 |
| D | 8 | 29 |

The two multi-select questions create 32 correct selections. Batch 004 is exactly balanced, and the cumulative bank remains exactly balanced.

## Coverage improvements

Batch 004 adds or deepens coverage for:

- Layer 3 forwarding and TTL behavior
- Reverse proxies
- NAS versus SAN
- Dedicated cloud connectivity
- DHCP and NTP ports
- Category 6A and 10GBASE-T
- IPv4 link-local addressing and APIPA
- Router subinterfaces and voice VLANs
- Wireless channel planning and band steering
- MDF and IDF design
- Power-capacity calculations
- Logical diagrams, SLAs, and performance baselines
- Hot recovery sites
- SLAAC and site-to-site VPNs
- MFA factors, SAML, DDoS, and port security
- Fiber polarity, incorrect subnet masks, packet-loss calculations, Nmap, protocol analysis, and cable certification

All 25 numbered objectives retain approved coverage.

## Programmatic arithmetic checks

- `NET009-0000091`: Confirmed a 120 V, 20 A circuit at 80% allows 1,920 W; the stated equipment uses 1,620 W; remaining capacity is 300 W.
- `NET009-0000105`: Confirmed 45 lost packets out of 9,000 equals 0.5% loss.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000079 | 1.1 | OSI network layer | medium | single_choice | scenario | C |
| NET009-0000080 | 1.2 | Proxy services | medium | single_choice | scenario | A |
| NET009-0000081 | 1.2 | Network storage | easy | single_choice | comparison | B |
| NET009-0000082 | 1.3 | Cloud connectivity | hard | best_available | scenario | D |
| NET009-0000083 | 1.4 | Common ports and services | medium | multi_select | direct | A|C |
| NET009-0000084 | 1.5 | Copper Ethernet media | easy | single_choice | direct | B |
| NET009-0000085 | 1.7 | IPv4 link-local addressing | easy | single_choice | scenario | D |
| NET009-0000086 | 2.1 | Router subinterfaces | medium | single_choice | scenario | C |
| NET009-0000087 | 2.2 | Voice VLANs | medium | single_choice | scenario | A |
| NET009-0000088 | 2.3 | Wireless channel planning | easy | single_choice | direct | B |
| NET009-0000089 | 2.3 | Band steering | medium | single_choice | scenario | D |
| NET009-0000090 | 2.4 | Telecommunications spaces | hard | single_choice | scenario | C |
| NET009-0000091 | 2.4 | Power capacity | hard | single_choice | calculation | A |
| NET009-0000092 | 3.1 | Network documentation | easy | single_choice | direct | B |
| NET009-0000093 | 3.1 | Service-level agreements | medium | single_choice | scenario | D |
| NET009-0000094 | 3.2 | Performance baselines | medium | single_choice | scenario | A |
| NET009-0000095 | 3.3 | Recovery sites | hard | single_choice | comparison | C |
| NET009-0000096 | 3.4 | IPv6 address configuration | medium | single_choice | scenario | B |
| NET009-0000097 | 3.5 | Site-to-site VPNs | medium | single_choice | scenario | D |
| NET009-0000098 | 4.1 | Multifactor authentication | easy | multi_select | direct | A|D |
| NET009-0000099 | 4.1 | Federated identity | medium | single_choice | direct | B |
| NET009-0000100 | 4.2 | Denial-of-service attacks | medium | single_choice | scenario | C |
| NET009-0000101 | 4.3 | Switch port security | hard | best_available | scenario | A |
| NET009-0000102 | 5.1 | Troubleshooting methodology | medium | single_choice | scenario | A |
| NET009-0000103 | 5.2 | Fiber polarity | medium | single_choice | scenario | B |
| NET009-0000104 | 5.3 | Subnet mask troubleshooting | hard | single_choice | scenario | C |
| NET009-0000105 | 5.4 | Packet loss | medium | single_choice | calculation | D |
| NET009-0000106 | 5.5 | Network discovery tools | easy | single_choice | direct | B |
| NET009-0000107 | 5.5 | Protocol analysis | hard | single_choice | scenario | C |
| NET009-0000108 | 5.5 | Copper verification tools | medium | single_choice | comparison | D |

## Internal quality review

- All 108 permanent question IDs are unique and sequential.
- All 108 concept keys are unique.
- All answer choices are populated and distinct after normalization.
- Multi-select instructions state exactly how many answers to select.
- Best-available questions state the decision criterion.
- No answer-position-dependent wording, all-of-the-above choices, or none-of-the-above choices are used.
- Each answer choice has a separate explanation.
- Every referenced source ID exists in `source-register.csv`.
- Approved rows contain review dates and the accelerated internal reviewer.
- Draft and retired files remain header-only.
