---
layout: layouts/article.njk
title: VLANs, Trunks, Rapid PVST+, and EtherChannel Quick Reference for CCNA 200-301 v2.0
description: Review Cisco access ports, trunks, native and allowed VLANs, SVIs, LACP EtherChannel, Rapid PVST+ roles, PortFast, BPDU Guard, Root Guard, and Loop Guard.
permalink: /ccna/quick-review/vlans-trunks-stp-etherchannel/
ogType: article
printable: true
printTitle: VLANs, Trunks, Rapid PVST+, and EtherChannel Quick Reference for CCNA 200-301 v2.0
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CCNA 200-301 v2.0 Quick Review
eyebrow: CCNA quick review
lede: Decide what the link must carry, verify the logical interface, then use spanning-tree and EtherChannel state before changing working redundancy.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: Quick Review
    url: /ccna/quick-review/
  - label: Switching Decisions
    url: /ccna/quick-review/vlans-trunks-stp-etherchannel/
toc:
  - id: link-purpose
    label: Link purpose
  - id: access-trunk-routed
    label: Access, trunk, and routed
  - id: trunk-details
    label: Trunk details
  - id: svi
    label: SVIs and routing
  - id: etherchannel
    label: EtherChannel and LACP
  - id: rapid-pvst
    label: Rapid PVST+
  - id: protections
    label: STP protections
  - id: commands
    label: IOS evidence
  - id: scenarios
    label: Scenario comparisons
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: official-references
    label: Official references
keywords:
  - CCNA VLAN trunk
  - Rapid PVST+
  - LACP EtherChannel
  - PortFast BPDU Guard
  - Root Guard Loop Guard
  - Cisco switch troubleshooting
relatedLinks:
  - title: CCNA Quick Review Guides
    url: /ccna/quick-review/
    description: Browse all focused CCNA comparisons and return to the quick-review hub.
  - title: "Domain 2: Switching and Network Access"
    url: /ccna/200-301-v2/study-guide/switching-network-access/
    description: Continue with edge-host designs, CDP, LLDP, packet evidence, and complete switching scenarios.
  - title: Cisco IOS Verification Commands
    url: /ccna/commands/
    description: Choose interface, trunk, EtherChannel, spanning-tree, and neighbor commands by the state you need to verify.
  - title: Route Selection and Static Routing Quick Reference
    url: /ccna/quick-review/route-selection-static-routing/
    description: Continue from Layer 2 placement and SVIs into Layer 3 forwarding decisions.
  - title: Take a randomized CCNA practice test
    url: /ccna/200-301-v2/practice-test/
    description: Apply these distinctions in a fresh 10, 20, 30, or 50-question session.
---

Switching questions become easier when you first decide what one physical link is supposed to do.

<h2 id="link-purpose">Start with the intended link purpose</h2>

Ask four questions:

1. Is the link carrying one VLAN or several VLANs?
2. Is the interface switching frames or routing packets?
3. Is this one physical link or a member of a logical bundle?
4. Is spanning tree forwarding, protecting, or blocking this path?

A physical link can be up while the logical design is wrong. Check interface mode, VLAN allowance, port-channel state, and spanning-tree role before replacing hardware.

<h2 id="access-trunk-routed">Separate access ports, trunks, and routed interfaces</h2>

<div class="table-scroll" role="region" aria-label="Cisco switch interface type comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Interface role</th><th scope="col">What it carries</th><th scope="col">Common use</th></tr></thead>
  <tbody>
    <tr><td data-label="Interface role">Access port</td><td data-label="What it carries">Ordinary endpoint traffic for one access VLAN</td><td data-label="Common use">Desktop, printer, camera, or other single-VLAN endpoint</td></tr>
    <tr><td data-label="Interface role">802.1Q trunk</td><td data-label="What it carries">Multiple VLANs, normally identified by tags</td><td data-label="Common use">Switch uplink, router-on-a-stick, access point, or virtualized host</td></tr>
    <tr><td data-label="Interface role">Routed port</td><td data-label="What it carries">Layer 3 traffic with an IP address on the physical interface</td><td data-label="Common use">Point-to-point routed connection</td></tr>
    <tr><td data-label="Interface role">Switch virtual interface</td><td data-label="What it carries">Layer 3 gateway or management function for a VLAN</td><td data-label="Common use">Inter-VLAN routing or switch management</td></tr>
  </tbody>
</table>
</div>

A switchport in the wrong access VLAN can still show `connected`. The endpoint may receive an address from the wrong scope or fail because the expected DHCP service is not reachable from that VLAN.

<h2 id="trunk-details">Read native and allowed VLANs separately</h2>

An 802.1Q trunk can carry several VLANs across one physical or logical link.

- The **allowed VLAN list** controls which VLANs may cross the trunk.
- The **native VLAN** handles untagged traffic on the trunk.
- The **operational trunk state** proves what the interface is doing now.

If VLAN 10 and VLAN 20 work while VLAN 30 fails, the shared physical link is not completely down. Check whether VLAN 30 exists, is allowed on both ends, and is active across the path.

A native VLAN mismatch can place untagged frames into different VLANs at opposite ends. Do not confuse the native VLAN on a trunk with the access VLAN on an endpoint port.

```text
show interfaces trunk
show interfaces switchport
show vlan brief
```

<h2 id="svi">An SVI provides a Layer 3 interface for a VLAN</h2>

A switch virtual interface (SVI) can provide a default gateway or management address for a VLAN.

```text
interface Vlan20
 ip address 192.0.2.1 255.255.255.0
 no shutdown
```

An SVI may remain down when the VLAN does not exist or has no active Layer 2 port participating in that VLAN, depending on platform behavior and configuration.

Creating VLANs does not automatically permit communication between them. Inter-VLAN traffic still depends on Layer 3 routing, gateway configuration, and access policy.

<h2 id="etherchannel">LACP EtherChannel makes several links one logical interface</h2>

EtherChannel combines compatible physical links into one port-channel. Spanning tree normally sees the bundle as one logical interface.

Link Aggregation Control Protocol (LACP) modes:

- **active:** sends LACP messages and can form a bundle with active or passive.
- **passive:** listens for LACP and forms a bundle when the other side is active.
- **on:** forces a static bundle without LACP negotiation. Both ends must be configured consistently.

`passive` plus `passive` does not start negotiation.

Member interfaces generally need consistent speed, duplex, switchport mode, VLAN, trunk, and channel settings. A mismatch can suspend a member or prevent the bundle from forming.

```text
interface range GigabitEthernet1/0/47-48
 channel-group 10 mode active
interface Port-channel10
 switchport mode trunk
```

Verify the logical and physical state:

```text
show etherchannel summary
show interfaces port-channel 10
show interfaces trunk
```

One large conversation may stay on one member because load balancing commonly uses a hash. Four 1-Gbps links do not guarantee that one TCP flow reaches 4 Gbps.

<h2 id="rapid-pvst">Rapid PVST+ keeps Layer 2 redundancy loop free</h2>

Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+) maintains one rapid spanning-tree instance per VLAN. Different VLANs can use different roots and forwarding paths.

Key roles:

- **Root bridge:** reference switch for one VLAN's tree.
- **Root port:** best path toward the root on a non-root switch.
- **Designated port:** forwarding port selected for a segment.
- **Alternate port:** redundant path that can replace the current path.
- **Backup port:** redundant path on the same shared segment, uncommon in modern switched networks.

Rapid spanning tree uses **discarding, learning, and forwarding** states. A discarding redundant port may be healthy and intentionally preventing a loop.

```text
spanning-tree mode rapid-pvst
spanning-tree vlan 20 root primary
show spanning-tree vlan 20
```

<h2 id="protections">Match each spanning-tree protection to the assumption it protects</h2>

<div class="table-scroll" role="region" aria-label="Spanning-tree protection comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Feature</th><th scope="col">Plain-language purpose</th><th scope="col">Typical clue</th></tr></thead>
  <tbody>
    <tr><td data-label="Feature">PortFast</td><td data-label="Plain-language purpose">Lets an edge port begin forwarding without the normal delay.</td><td data-label="Typical clue">An endpoint, not another switch, is expected on the port.</td></tr>
    <tr><td data-label="Feature">BPDU Guard</td><td data-label="Plain-language purpose">Protects the edge-port assumption by reacting if a BPDU arrives.</td><td data-label="Typical clue">An unexpected switch appears on a PortFast port.</td></tr>
    <tr><td data-label="Feature">Root Guard</td><td data-label="Plain-language purpose">Prevents a neighbor from becoming the path to a superior root.</td><td data-label="Typical clue">The connected network must never control root placement.</td></tr>
    <tr><td data-label="Feature">Loop Guard</td><td data-label="Plain-language purpose">Prevents a redundant path from forwarding when expected BPDUs disappear.</td><td data-label="Typical clue">A root or alternate path may have a one-way failure.</td></tr>
  </tbody>
</table>
</div>

Do not place every protection on every interface. Each feature protects a different design assumption.

<h2 id="commands">Choose IOS evidence that matches the suspected state</h2>

<div class="table-scroll" role="region" aria-label="Cisco IOS switching command comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Question</th><th scope="col">Useful command</th></tr></thead>
  <tbody>
    <tr><td data-label="Question">Which ports belong to each VLAN?</td><td data-label="Useful command"><code>show vlan brief</code></td></tr>
    <tr><td data-label="Question">What is one port's access or trunk state?</td><td data-label="Useful command"><code>show interfaces switchport</code></td></tr>
    <tr><td data-label="Question">Which VLANs cross each trunk?</td><td data-label="Useful command"><code>show interfaces trunk</code></td></tr>
    <tr><td data-label="Question">Did the LACP bundle form?</td><td data-label="Useful command"><code>show etherchannel summary</code></td></tr>
    <tr><td data-label="Question">Which switch is root and which ports forward?</td><td data-label="Useful command"><code>show spanning-tree vlan</code></td></tr>
    <tr><td data-label="Question">Which neighbor is physically connected?</td><td data-label="Useful command"><code>show cdp neighbors detail</code> or <code>show lldp neighbors detail</code></td></tr>
    <tr><td data-label="Question">Why was a port disabled?</td><td data-label="Useful command"><code>show logging</code> and interface status</td></tr>
  </tbody>
</table>
</div>

<h2 id="scenarios">Scenario comparisons</h2>

### One VLAN fails across a trunk while others work

Check VLAN existence and the allowed VLAN list on the port-channel or trunk. Do not replace the shared cable first.

### Two parallel links are connected but only one should forward

If they are independent Layer 2 links, spanning tree may correctly block one. If both should act as one logical link, configure and verify EtherChannel consistently on both ends.

### An edge port becomes error-disabled after a switch is connected

BPDU Guard may have protected a PortFast edge port. Find the unexpected device before removing the protection.

### A port-channel exists, but one member is suspended

Compare member speed, duplex, switchport mode, VLAN, trunk, and channel configuration. Fix the mismatch rather than configuring the suspended link independently.

### Same-VLAN traffic works, but traffic to another VLAN fails

Check the SVI or routed gateway, routing state, host default gateway, and access policy. Layer 2 VLAN membership alone does not provide inter-VLAN forwarding.

<h2 id="exam-traps">Common exam traps</h2>

- Treating a trunk as a faster access port.
- Assuming VLAN creation automatically enables routing.
- Confusing a trunk's native VLAN with an endpoint's access VLAN.
- Replacing a healthy spanning-tree blocked link.
- Expecting `passive` plus `passive` to form an LACP bundle.
- Configuring physical EtherChannel members differently from the port-channel.
- Assuming EtherChannel multiplies the speed of one conversation.
- Applying PortFast, BPDU Guard, Root Guard, and Loop Guard as though they solve the same problem.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of Cisco switching decisions" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Requirement or clue</th><th scope="col">Best fit</th></tr></thead>
  <tbody>
    <tr><td data-label="Requirement or clue">Place an endpoint in one VLAN</td><td data-label="Best fit">Access port</td></tr>
    <tr><td data-label="Requirement or clue">Carry several VLANs across one link</td><td data-label="Best fit">802.1Q trunk</td></tr>
    <tr><td data-label="Requirement or clue">Provide a Layer 3 interface for a VLAN</td><td data-label="Best fit">SVI</td></tr>
    <tr><td data-label="Requirement or clue">Combine compatible physical links</td><td data-label="Best fit">EtherChannel, commonly with LACP</td></tr>
    <tr><td data-label="Requirement or clue">Prevent a Layer 2 loop while keeping redundancy</td><td data-label="Best fit">Rapid PVST+</td></tr>
    <tr><td data-label="Requirement or clue">Protect an edge port from an unexpected switch</td><td data-label="Best fit">PortFast with BPDU Guard</td></tr>
    <tr><td data-label="Requirement or clue">Prevent an unexpected superior root</td><td data-label="Best fit">Root Guard</td></tr>
    <tr><td data-label="Requirement or clue">Protect a redundant path when BPDUs disappear</td><td data-label="Best fit">Loop Guard</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [Cisco CCNA 200-301 v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco: Understand EtherChannel Load Balance and Redundancy](https://www.cisco.com/c/en/us/support/docs/lan-switching/etherchannel/12023-4.html)
- [Cisco: Understand EtherChannel Inconsistency Detection](https://www.cisco.com/c/en/us/support/docs/lan-switching/etherchannel/20625-127.html)
- [Cisco: Troubleshoot EtherChannels on Catalyst 9000 Switches](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9300-series-switches/220367-troubleshoot-etherchannels-on-catalyst-9.html)
