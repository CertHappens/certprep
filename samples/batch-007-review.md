# NET-009 Batch 007 Review

- Batch ID: `NET009-BATCH-007`
- Review date: 2026-07-26
- Questions generated: 30
- Review status: Approved under the accelerated staging authorization
- Permanent IDs: `NET009-0000151` through `NET009-0000180`

## Coverage-driven domain allocation

Batch 007 resumes the normal 30-question size with a 7 / 6 / 6 / 4 / 7 allocation.

| Domain | Official weight | Batch 007 | Final count | Final percentage | Difference |
|---|---:|---:|---:|---:|---:|
| 1.0 Networking Concepts | 23% | 7 | 42 | 23.33% | +0.33 |
| 2.0 Network Implementation | 20% | 6 | 36 | 20.00% | 0.00 |
| 3.0 Network Operations | 19% | 6 | 34 | 18.89% | -0.11 |
| 4.0 Network Security | 14% | 4 | 25 | 13.89% | -0.11 |
| 5.0 Network Troubleshooting | 24% | 7 | 43 | 23.89% | -0.11 |

The 180-question bank is within 0.34 percentage points of every official domain weight.

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

| Stored key | Batch 007 selections | Cumulative selections |
|---|---:|---:|
| A | 7 | 48 |
| B | 8 | 48 |
| C | 8 | 48 |
| D | 9 | 49 |

The two multi-select questions create 32 correct selections. The cumulative distribution differs by no more than one selection.

## Coverage improvements

Batch 007 adds coverage for:

- OSI application-layer services
- Web application firewalls
- SFTP
- Multimode versus single-mode fiber
- Full-mesh connection calculations
- RFC 1918 private addressing
- Software-defined networking
- Static NAT and OSPF cost
- BPDU guard and storm control
- WPA3-Enterprise with 802.1X and RADIUS
- Demarcation points
- Physical network diagrams
- SNMPv3 security
- Offsite configuration backups
- CNAME records and stateful DHCPv6
- Local console management
- AAA accounting and digital signatures
- Wireless jamming and dynamic ARP inspection
- Recent-change correlation
- EMI and CRC/FCS errors
- NTP time skew
- Wireless signal-to-noise ratio
- DHCP renewal and host routing-table tools

All 25 numbered objectives retain approved coverage.

## Programmatic calculation checks

- `NET009-0000155`: Confirmed that a six-site full mesh requires 15 unique links.
- `NET009-0000159`: Confirmed that 100 Mbps divided by 10 Mbps produces the stated OSPF cost of 10.
- `NET009-0000156`: Confirmed the selected addresses are within the exact RFC 1918 ranges.

## Question inventory

| ID | Objective | Topic | Difficulty | Type | Style | Correct |
|---|---|---|---|---|---|---|
| NET009-0000151 | 1.1 | OSI application layer | easy | single_choice | direct | A |
| NET009-0000152 | 1.2 | Application security appliances | medium | single_choice | scenario | B |
| NET009-0000153 | 1.4 | Secure file transfer | easy | single_choice | direct | C |
| NET009-0000154 | 1.5 | Fiber media selection | medium | single_choice | comparison | D |
| NET009-0000155 | 1.6 | Full-mesh topology | hard | single_choice | calculation | A |
| NET009-0000156 | 1.7 | Private IPv4 addressing | medium | multi_select | direct | B|D |
| NET009-0000157 | 1.8 | Software-defined networking | hard | best_available | scenario | C |
| NET009-0000158 | 2.1 | Static network address translation | medium | single_choice | scenario | D |
| NET009-0000159 | 2.1 | OSPF interface cost | hard | single_choice | calculation | A |
| NET009-0000160 | 2.2 | Spanning-tree edge protection | medium | single_choice | scenario | B |
| NET009-0000161 | 2.2 | Broadcast control | medium | single_choice | scenario | C |
| NET009-0000162 | 2.3 | Enterprise wireless authentication | hard | best_available | scenario | D |
| NET009-0000163 | 2.4 | Service-provider handoff | easy | single_choice | direct | A |
| NET009-0000164 | 3.1 | Physical network documentation | easy | single_choice | comparison | B |
| NET009-0000165 | 3.2 | Secure network monitoring | medium | single_choice | scenario | C |
| NET009-0000166 | 3.3 | Backup resilience | hard | single_choice | scenario | B |
| NET009-0000167 | 3.4 | DNS aliases | easy | single_choice | direct | A |
| NET009-0000168 | 3.4 | Stateful DHCPv6 | medium | single_choice | scenario | B |
| NET009-0000169 | 3.5 | Local console management | medium | single_choice | scenario | C |
| NET009-0000170 | 4.1 | AAA accounting | easy | single_choice | direct | D |
| NET009-0000171 | 4.1 | Digital signatures | medium | multi_select | comparison | A|C |
| NET009-0000172 | 4.2 | Wireless denial of service | hard | single_choice | scenario | B |
| NET009-0000173 | 4.3 | ARP inspection | medium | single_choice | scenario | D |
| NET009-0000174 | 5.1 | Problem identification | easy | single_choice | direct | A |
| NET009-0000175 | 5.2 | Electromagnetic interference | medium | single_choice | scenario | B |
| NET009-0000176 | 5.2 | Interface error counters | medium | single_choice | scenario | C |
| NET009-0000177 | 5.3 | Time synchronization | hard | single_choice | scenario | D |
| NET009-0000178 | 5.4 | Wireless signal quality | medium | single_choice | scenario | C |
| NET009-0000179 | 5.5 | DHCP client tools | medium | single_choice | scenario | D |
| NET009-0000180 | 5.5 | Routing-table inspection | medium | single_choice | scenario | D |

## Internal quality review

- All 180 permanent question IDs are unique and sequential.
- All 180 concept keys are unique.
- All answer choices are populated and distinct after normalization.
- Multi-select instructions state exactly how many answers to select.
- Best-available questions state the decision criterion.
- Each answer choice has a separate explanation.
- Every referenced source ID exists in `source-register.csv`.
- Approved rows contain review dates and the accelerated internal reviewer.
- Draft and retired files remain header-only.
