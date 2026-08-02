# NET-009 Batch 008 Stimulus Question Review

## Batch summary

- Batch ID: `NET009-BATCH-008`
- Questions: 25
- IDs: `NET009-0000181` through `NET009-0000205`
- Status: `approved`
- Approval date: `2026-08-01`
- Approved production questions after Batch 008: 205
- Draft questions remaining: 0
- Stimulus-backed questions in Batch 008: 25 of 25
- Stimulus forms: table = 15, preformatted = 10
- Domain allocation: 6 / 5 / 5 / 3 / 6
- Difficulty distribution: easy = 5, medium = 14, hard = 6
- Question types: single_choice = 9, multi_select = 7, best_available = 9
- Correct-key inclusion: A = 8, B = 8, C = 8, D = 8
- Cumulative correct-key inclusion: A = 56, B = 56, C = 56, D = 57
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact duplicate answer choices: none
- High-similarity stem conflicts: none

Every new question requires the learner to interpret a log, command output, configuration fragment, measurement table, or operational record before selecting an answer.

## Final domain coverage

| Domain | Before | Added | Final | Share | Target |
|---|---:|---:|---:|---:|---:|
| 1.0 Networking Concepts | 42 | 6 | 48 | 23.41% | 23% |
| 2.0 Network Implementation | 36 | 5 | 41 | 20.00% | 20% |
| 3.0 Network Operations | 34 | 5 | 39 | 19.02% | 19% |
| 4.0 Network Security | 25 | 3 | 28 | 13.66% | 14% |
| 5.0 Network Troubleshooting | 43 | 6 | 49 | 23.90% | 24% |

## Question review

### NET009-0000181 · Objective 1.1 · multi_select · medium

**Stimulus:** Observed network actions (`table`)

**Instruction:** Select TWO answers.

Which TWO observations show a Layer 2 forwarding decision and a Layer 3 forwarding decision?

- **A.** The switch looks up the destination MAC address and selects an egress port
- **B.** The client uses TCP port 443 to deliver data to the browser process
- **C.** The router matches the destination IPv4 prefix and selects a next hop
- **D.** The access point converts a bit stream into radio signals

**Correct:** A|C

**Explanation:** The switch MAC lookup is a data-link-layer forwarding decision, and the router prefix lookup is a network-layer forwarding decision.

**Sources:** `SRC-COMPTIA-N10009-V6`

### NET009-0000182 · Objective 1.4 · multi_select · easy

**Stimulus:** Packet capture summary (`preformatted`, log)

**Instruction:** Select TWO answers.

Which TWO captured exchanges use UDP-based services?

- **A.** The HTTPS connection to TCP port 443
- **B.** The DNS query to port 53
- **C.** An SSH session to TCP port 22
- **D.** The NTP request to port 123

**Correct:** B|D

**Explanation:** The capture shows DNS and NTP using UDP. HTTPS and SSH use TCP in the listed exchanges.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IANA-SERVICE-NAMES|SRC-RFC1035|SRC-RFC5905`

### NET009-0000183 · Objective 1.5 · best_available · hard

**Stimulus:** Proposed 10 GbE links (`table`)

**Instruction:** Choose the BEST answer.

Which link requires correction before it can establish the intended Ethernet connection?

- **A.** Link A, because OS2 cannot carry a 10GBASE-LR signal for 6 km
- **B.** Link B, because OM4 cannot carry a 10GBASE-SR signal for 100 m
- **C.** Link C, because its endpoints use different optical standards and the SR optic is paired with OS2
- **D.** Link D, because 10GBASE-T cannot operate over Category 6A for 80 m

**Correct:** C

**Explanation:** Link C combines mismatched SR and LR optics and uses an SR optic on single-mode OS2 fiber. The other listed media, optics, and distances are compatible with their stated designs.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IEEE-8023`

### NET009-0000184 · Objective 1.6 · single_choice · easy

**Stimulus:** Campus device roles (`table`)

**Instruction:** Choose one answer.

Which network architecture is represented by the role summary?

- **A.** A three-tier campus architecture
- **B.** A full-mesh WAN
- **C.** A peer-to-peer workgroup
- **D.** A coaxial bus

**Correct:** A

**Explanation:** The access, distribution, and core roles form a traditional three-tier campus architecture.

**Sources:** `SRC-COMPTIA-N10009-V6`

### NET009-0000185 · Objective 1.7 · best_available · hard

**Stimulus:** Windows IPv4 configuration (`preformatted`, command_output)

**Instruction:** Choose the BEST answer.

Which address can be assigned to another host on the same subnet without using the current host address or default gateway?

- **A.** 10.44.18.192
- **B.** 10.44.18.223
- **C.** 10.44.18.224
- **D.** 10.44.18.222

**Correct:** D

**Explanation:** The mask is /27, so the subnet is 10.44.18.192 through 10.44.18.223. The network address is .192, the broadcast address is .223, and usable hosts are .193 through .222. Therefore .222 is usable.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC4632`

### NET009-0000186 · Objective 1.8 · single_choice · medium

**Stimulus:** Overlay interface configuration (`preformatted`, configuration)

**Instruction:** Choose one answer.

Which overlay technology is configured on the device?

- **A.** GRE without Ethernet overlays
- **B.** VXLAN
- **C.** MPLS Layer 3 VPN
- **D.** IPsec transport mode

**Correct:** B

**Explanation:** The network-virtualization interface, VNI, and UDP port 4789 identify a VXLAN overlay.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC7348`

### NET009-0000187 · Objective 2.1 · best_available · medium

**Stimulus:** Router forwarding table (`preformatted`, command_output)

**Instruction:** Choose the BEST answer.

Which route will the router use for destination 10.60.40.25, and why?

- **A.** The eBGP route through 203.0.113.9 because it has a lower administrative distance than the OSPF route for the same prefix
- **B.** The OSPF /16 route because it was learned by an interior routing protocol
- **C.** The default route because it appears first in the output
- **D.** Both /24 routes simultaneously because their prefix lengths match

**Correct:** A

**Explanation:** The two /24 routes are equally specific. The eBGP route has administrative distance 20, while the OSPF route has administrative distance 110, so the eBGP route is preferred.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC2328|SRC-RFC4271`

### NET009-0000188 · Objective 2.1 · single_choice · medium

**Stimulus:** Active translation entries (`table`)

**Instruction:** Choose one answer.

Which translation method is shown?

- **A.** Static one-to-one NAT
- **B.** NAT64
- **C.** Port address translation
- **D.** A DHCP reservation

**Correct:** C

**Explanation:** Multiple inside addresses share one public address while unique translated source ports distinguish their sessions. This is port address translation.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC3022`

### NET009-0000189 · Objective 2.2 · multi_select · medium

**Stimulus:** User-facing switch interface (`preformatted`, configuration)

**Instruction:** Select TWO answers.

Which TWO behaviors result from the interface configuration?

- **A.** The port carries every VLAN as an unrestricted trunk
- **B.** Untagged computer traffic is assigned to data VLAN 20
- **C.** The port ignores spanning-tree BPDUs from attached devices
- **D.** Receiving an unexpected BPDU can place the edge port into a disabled state

**Correct:** B|D

**Explanation:** The access VLAN places ordinary untagged endpoint traffic in VLAN 20. BPDU guard protects the edge port by disabling it when a BPDU is received.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IEEE-8021Q`

### NET009-0000190 · Objective 2.3 · best_available · hard

**Stimulus:** 2.4 GHz survey summary (`table`)

**Instruction:** Choose the BEST answer.

Which change most directly reduces contention between the two strongest overlapping cells while preserving 2.4 GHz coverage?

- **A.** Increase both AP1 and AP2 to maximum transmit power and keep channel 1
- **B.** Move AP3 from channel 6 to channel 1
- **C.** Move AP2 to a surveyed non-overlapping channel and then validate cell coverage
- **D.** Increase channel width on all access points

**Correct:** C

**Explanation:** AP1 and AP2 have strong overlapping signals on the same 2.4 GHz channel and many clients. Moving one to a non-overlapping channel, followed by validation, reduces co-channel contention without blindly changing power or width.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IEEE-80211`

### NET009-0000191 · Objective 2.4 · single_choice · medium

**Stimulus:** UPS usable capacity (`table`)

**Instruction:** Choose one answer.

How much usable UPS capacity remains for additional equipment?

- **A.** 100 W
- **B.** 400 W
- **C.** 700 W
- **D.** 1,700 W

**Correct:** A

**Explanation:** The listed equipment uses 600 W plus 400 W plus 700 W, totaling 1,700 W. The UPS usable capacity is 1,800 W, leaving 100 W.

**Sources:** `SRC-COMPTIA-N10009-V6`

### NET009-0000192 · Objective 3.1 · best_available · medium

**Stimulus:** Change record CHG-NET-318 (`table`)

**Instruction:** Choose the BEST response.

What should the change owner do next?

- **A.** Continue the remaining deployment because the maintenance window is still open
- **B.** Change the approved validation criteria to match the failed state
- **C.** Disable monitoring until the change is completed
- **D.** Initiate rollback, document the result, and investigate before rescheduling

**Correct:** D

**Explanation:** The validation failure and DNS outage meet the documented rollback condition. Restoring the known state and recording the outcome is the appropriate next action.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-NIST-SP800-128`

### NET009-0000193 · Objective 3.2 · multi_select · medium

**Stimulus:** Current monitoring values (`table`)

**Instruction:** Select TWO answers.

Which TWO measurements most clearly exceed the normal baseline and support investigating a WAN performance incident?

- **A.** WAN utilization at 92% compared with a normal 35% to 55%
- **B.** Router CPU at 38% compared with a normal 20% to 45%
- **C.** Packet loss at 3.2% compared with a normal value below 0.5%
- **D.** Device temperature at 50 C compared with a normal 40 C to 55 C

**Correct:** A|C

**Explanation:** WAN utilization and packet loss are both far outside their normal baselines. CPU and temperature remain within their listed normal ranges.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC7011`

### NET009-0000194 · Objective 3.3 · single_choice · medium

**Stimulus:** Recovery plans (`table`)

**Instruction:** Choose one answer.

The service requires an RTO of two hours or less and an RPO of thirty minutes or less. Which plan meets both limits?

- **A.** Plan A
- **B.** Plan B
- **C.** Plan C
- **D.** Plan D

**Correct:** B

**Explanation:** Plan B provides a 30-minute RTO and a 15-minute RPO, satisfying both maximum limits. The other plans miss at least one requirement or are not the plan shown with both qualifying values.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-NIST-SP800-34R1`

### NET009-0000195 · Objective 3.4 · best_available · hard

**Stimulus:** Router VLAN interfaces (`preformatted`, configuration)

**Instruction:** Choose the BEST answer.

Clients in VLAN 30 cannot obtain DHCP leases, while VLANs 10 and 20 work and static IPv4 configuration works in VLAN 30. What should be changed first?

- **A.** Replace the DHCP server because no VLAN can reach it
- **B.** Remove the helper addresses from VLANs 10 and 20
- **C.** Configure an IPv4 link-local range on VLAN 30
- **D.** Add the authorized DHCP relay or helper address to the VLAN 30 routed interface

**Correct:** D

**Explanation:** The configuration shows helper addresses on VLANs 10 and 20 but not VLAN 30. Because the DHCP server is on another subnet, VLAN 30 broadcasts need the relay configuration.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC2131|SRC-RFC1542`

### NET009-0000196 · Objective 3.5 · multi_select · easy

**Stimulus:** Available management paths (`table`)

**Instruction:** Select TWO answers.

Which TWO methods remain available without relying on the production routed network?

- **A.** A direct serial console connection at the device
- **B.** A console server reached through an independent cellular link
- **C.** SSH to the switch management address through the production LAN
- **D.** HTTPS to the controller through the production WAN

**Correct:** A|B

**Explanation:** A direct console and an independently connected console server are out-of-band methods. The SSH and HTTPS methods depend on the production routed network.

**Sources:** `SRC-COMPTIA-N10009-V6`

### NET009-0000197 · Objective 4.1 · multi_select · medium

**Stimulus:** Access-control events (`table`)

**Instruction:** Select TWO answers.

Which TWO events represent authorization and accounting?

- **A.** The system negotiates a TLS cipher with the client
- **B.** The server confirms the supplied password belongs to the user
- **C.** The policy denies a command because the operator role lacks permission
- **D.** The system records session start, stop, commands, and transferred bytes

**Correct:** C|D

**Explanation:** Authorization determines whether an authenticated user may perform an action. Accounting records session activity and usage.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC2865|SRC-RFC8907`

### NET009-0000198 · Objective 4.2 · single_choice · hard

**Stimulus:** Captured trunk frame behavior (`preformatted`, log)

**Instruction:** Choose one answer.

Which attack technique is demonstrated by the frame evidence?

- **A.** MAC flooding
- **B.** Double-tagging VLAN hopping
- **C.** DNS cache poisoning
- **D.** Wireless deauthentication

**Correct:** B

**Explanation:** The frame contains an outer tag associated with the native VLAN and an inner tag for the target VLAN. When the first switch removes the outer tag, the inner tag can influence forwarding on the next trunk. This is double-tagging VLAN hopping.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IEEE-8021Q`

### NET009-0000199 · Objective 4.3 · best_available · hard

**Stimulus:** Firewall rules for management network (`table`)

**Instruction:** Choose the BEST change.

Which policy change best reduces management exposure while preserving authorized administration?

- **A.** Remove the public SSH rule and require management from the admin subnet through the approved jump path
- **B.** Keep public SSH and increase log retention
- **C.** Allow public SSH only outside business hours
- **D.** Move the public SSH rule below the final deny rule without testing rule processing

**Correct:** A

**Explanation:** Direct public SSH to the management subnet creates unnecessary exposure. Limiting management to the controlled admin path reduces attack surface while preserving approved access.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-NIST-SP800-41R1`

### NET009-0000200 · Objective 5.1 · single_choice · easy

**Stimulus:** Troubleshooting worksheet (`table`)

**Instruction:** Choose one answer.

What should the technician do next?

- **A.** Replace the cable even though the test disproved the theory
- **B.** Document the issue as resolved
- **C.** Establish a new theory from the remaining evidence or escalate appropriately
- **D.** Skip directly to preventive measures

**Correct:** C

**Explanation:** The cable theory was tested and not confirmed. The methodology calls for a new probable-cause theory or appropriate escalation, using the evidence already collected.

**Sources:** `SRC-COMPTIA-N10009-V6`

### NET009-0000201 · Objective 5.2 · best_available · medium

**Stimulus:** Fiber receive measurements (`table`)

**Instruction:** Choose the BEST answer.

Which link should be investigated first for insufficient received optical power?

- **A.** Link A
- **B.** Link B
- **C.** Link C
- **D.** Link D

**Correct:** D

**Explanation:** Link D receives -12 dBm while the receiver requires at least -10 dBm. Its margin is negative, so the received signal is below the supported sensitivity.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IEEE-8023`

### NET009-0000202 · Objective 5.3 · single_choice · medium

**Stimulus:** Name-resolution tests (`preformatted`, command_output)

**Instruction:** Choose one answer.

What is the most likely problem?

- **A.** The application server has no working IP path
- **B.** The primary DNS resolver or its zone-processing path is failing
- **C.** The client has a physical-link failure
- **D.** The default gateway is outside the client subnet

**Correct:** B

**Explanation:** The application server is reachable by IP, and the secondary resolver returns the expected record. Only the primary resolver returns SERVFAIL, pointing to that resolver or its path to authoritative data.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC1034|SRC-RFC1035`

### NET009-0000203 · Objective 5.4 · multi_select · medium

**Stimulus:** WAN service measurements (`table`)

**Instruction:** Select TWO answers.

Which TWO measurements most directly support congestion as the cause of degraded voice quality?

- **A.** WAN utilization at 96% against an 80% target
- **B.** Packet loss at 0.2% against a 1% target
- **C.** Jitter at 45 ms against a 30 ms target
- **D.** DNS response time at 18 ms against a 100 ms target

**Correct:** A|C

**Explanation:** WAN utilization and jitter exceed their targets. High utilization can create queuing, and excessive jitter directly harms real-time voice quality.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC2474`

### NET009-0000204 · Objective 5.5 · single_choice · easy

**Stimulus:** Traceroute result (`preformatted`, command_output)

**Instruction:** Choose one answer.

At which hop do responses first stop?

- **A.** Hop 1
- **B.** Hop 2
- **C.** Hop 3
- **D.** Hop 4

**Correct:** D

**Explanation:** Hops 1 through 3 return addresses and response times. Hop 4 is the first line containing only timeouts.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-RFC792`

### NET009-0000205 · Objective 5.5 · best_available · medium

**Stimulus:** Listening sockets (`preformatted`, command_output)

**Instruction:** Choose the BEST answer.

Which service is listening on every IPv4 interface and therefore deserves review if remote SSH access was not intended?

- **A.** PostgreSQL on TCP port 5432
- **B.** SSH on TCP port 22
- **C.** HTTPS bound only to 10.20.5.15
- **D.** The local DNS resolver on UDP port 53

**Correct:** B

**Explanation:** The 0.0.0.0:22 listener means SSH accepts connections on all IPv4 interfaces. The database listener is loopback-only, and HTTPS is bound to one specified address.

**Sources:** `SRC-COMPTIA-N10009-V6|SRC-IANA-SERVICE-NAMES|SRC-RFC4251`

## Similarity review

- `NET009-0000200` and `NET009-0000192`: 0.81
- `NET009-0000198` and `NET009-0000186`: 0.60
- `NET009-0000203` and `NET009-0000071`: 0.56
- `NET009-0000197` and `NET009-0000098`: 0.55
- `NET009-0000183` and `NET009-0000138`: 0.53
- `NET009-0000199` and `NET009-0000190`: 0.51
- `NET009-0000189` and `NET009-0000183`: 0.50
- `NET009-0000196` and `NET009-0000189`: 0.49
- `NET009-0000186` and `NET009-0000182`: 0.48
- `NET009-0000193` and `NET009-0000065`: 0.47
