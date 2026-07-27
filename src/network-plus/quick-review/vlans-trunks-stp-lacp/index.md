---
layout: layouts/article.njk
title: VLANs, Trunks, STP, and Link Aggregation Quick Reference for Network+ N10-009
description: Compare access ports, trunks, VLAN tagging, native VLANs, inter-VLAN routing, spanning tree, and LACP through practical Network+ switching scenarios.
permalink: /network-plus/quick-review/vlans-trunks-stp-lacp/
ogType: article
printable: true
printTitle: VLANs, Trunks, STP, and Link Aggregation Quick Reference for Network+ N10-009
author: certHappens
datePublished: 2026-07-27
articleSection: Network+ N10-009 Quick Review
eyebrow: Network+ quick review
lede: Separate traffic membership, link transport, loop prevention, and bandwidth aggregation before choosing a switch setting.
breadcrumbs:
  - label: Home
    url: /
  - label: Network+
    url: /network-plus/
  - label: Quick Review
    url: /network-plus/quick-review/
  - label: Switching Decisions
    url: /network-plus/quick-review/vlans-trunks-stp-lacp/
toc:
  - id: four-jobs
    label: Four different jobs
  - id: access-ports
    label: Access ports
  - id: trunks-tagging
    label: Trunks and tagging
  - id: native-vlan
    label: Native VLAN
  - id: inter-vlan
    label: Inter-VLAN routing
  - id: spanning-tree
    label: Spanning tree
  - id: root-path
    label: Root and path decisions
  - id: link-aggregation
    label: Link aggregation and LACP
  - id: symptoms
    label: Symptoms and evidence
  - id: scenarios
    label: Scenario comparisons
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: official-references
    label: Official references
keywords:
  - CompTIA Network+
  - N10-009 VLANs
  - access port versus trunk
  - spanning tree protocol
  - LACP
  - inter-VLAN routing
relatedLinks:
  - title: Network+ Quick Review
    url: /network-plus/quick-review/
    description: Compare additional monitoring and troubleshooting decisions.
  - title: "Domain 2: Network Implementation"
    url: /network-plus/n10-009/study-guide/network-implementation/
    description: Continue with routing, switching, wireless, and physical implementation.
  - title: "Domain 5: Network Troubleshooting"
    url: /network-plus/n10-009/study-guide/network-troubleshooting/
    description: Diagnose VLAN, trunk, spanning-tree, and link-aggregation failures from evidence.
  - title: Monitoring Evidence Quick Reference
    url: /network-plus/quick-review/monitoring-evidence/
    description: Choose counters, logs, flow records, captures, and baselines for switch evidence.
  - title: Network+ Acronyms and Terms
    url: /network-plus/acronyms/
    description: Expand VLAN, STP, RSTP, MSTP, LACP, SVI, and related switching terms.
  - title: Network+ N10-009 Practice Test
    url: /network-plus/n10-009/practice-test/
    description: Apply switching decisions in randomized questions.
---
A VLAN, trunk, spanning-tree decision, and aggregated link can all involve the same switch ports. They still solve different problems.

- A **VLAN** defines Layer 2 membership and broadcast scope.
- A **trunk** carries traffic for multiple VLANs across one link.
- **Spanning Tree Protocol (STP)** prevents a Layer 2 loop by blocking redundant paths when necessary.
- **Link aggregation** combines compatible physical links into one logical link.

<div class="article-callout">
  <p><strong>Fast split:</strong> VLANs separate traffic. Trunks carry multiple VLANs. STP controls redundant paths. LACP negotiates a link bundle.</p>
</div>

<h2 id="four-jobs">Four jobs at a glance</h2>

<div class="table-scroll" role="region" aria-label="Switching feature comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Feature</th><th scope="col">Primary job</th><th scope="col">Common clue</th><th scope="col">Does not provide</th></tr></thead>
  <tbody>
    <tr><td data-label="Feature"><strong>VLAN</strong></td><td data-label="Primary job">Create a logical Layer 2 segment</td><td data-label="Common clue">Separate departments, voice, guests, management, or devices</td><td data-label="Does not provide">Routing between VLANs by itself</td></tr>
    <tr><td data-label="Feature"><strong>802.1Q trunk</strong></td><td data-label="Primary job">Carry multiple VLANs across one link</td><td data-label="Common clue">Switch-to-switch, switch-to-router, switch-to-AP, or switch-to-hypervisor link</td><td data-label="Does not provide">Loop prevention</td></tr>
    <tr><td data-label="Feature"><strong>STP or RSTP</strong></td><td data-label="Primary job">Prevent Layer 2 loops while preserving redundancy</td><td data-label="Common clue">Broadcast storm, duplicate frames, redundant switch links</td><td data-label="Does not provide">Additional aggregate bandwidth</td></tr>
    <tr><td data-label="Feature"><strong>LACP bundle</strong></td><td data-label="Primary job">Combine compatible links into one logical channel</td><td data-label="Common clue">More capacity and link redundancy between the same devices</td><td data-label="Does not provide">Per-flow use of every member in all cases</td></tr>
  </tbody>
</table>
</div>

<h2 id="access-ports">Access ports: one ordinary VLAN for the endpoint</h2>

An access port normally assigns untagged endpoint traffic to one VLAN. A workstation sends an ordinary Ethernet frame. The switch associates that frame with the access VLAN internally.

Common access-port scenarios include:

- A desktop in the user VLAN
- A printer in a device VLAN
- A camera in a surveillance VLAN
- An unused port placed in an unused VLAN and disabled

A switchport in the wrong access VLAN can still show link up. The host may receive an address from the wrong scope, reach the wrong services, or fail because no DHCP service exists in that VLAN.

Some phone deployments use a data VLAN for the attached workstation and a tagged voice VLAN for the phone. That is a special edge-port design, not a reason to treat every endpoint link as a general switch trunk.

<h2 id="trunks-tagging">Trunks and 802.1Q tagging</h2>

A trunk carries multiple VLANs. IEEE 802.1Q inserts a tag that identifies the VLAN for tagged frames. Both ends must agree on the trunk and on which VLANs are permitted.

Use a trunk when multiple VLANs must cross the same physical link, such as:

- Between switches
- From a switch to a router using router-on-a-stick
- From a switch to an access point carrying several wireless networks
- From a switch to a virtualization host with guests in different VLANs

An **allowed VLAN list** limits which VLANs can cross the trunk. If VLAN 30 is missing from the allowed list, VLAN 10 and VLAN 20 may work while VLAN 30 fails. That pattern points toward trunk configuration rather than a dead cable.

<h2 id="native-vlan">Native VLAN and untagged trunk traffic</h2>

The native VLAN identifies how untagged traffic is handled on an 802.1Q trunk. Both ends should use a consistent, intentional configuration.

A native VLAN mismatch can place untagged traffic into different VLANs on opposite ends. It can produce confusing connectivity and security behavior even though the trunk remains up.

Do not confuse the native VLAN with an access VLAN. An access VLAN classifies ordinary endpoint traffic on an access port. The native VLAN concerns untagged traffic on a trunk.

<h2 id="inter-vlan">Inter-VLAN routing</h2>

Hosts in different VLANs need a Layer 3 device to communicate. Common designs include:

- **Router-on-a-stick:** one router interface carries multiple tagged subinterfaces.
- **Layer 3 switch:** switch virtual interfaces (SVIs) provide gateways and route between VLANs.
- **Firewall routing:** a firewall routes and applies policy between security zones or VLANs.

A VLAN does not automatically block or permit inter-VLAN traffic. The routing device, access control lists, and firewall policy decide what crosses the Layer 3 boundary.

When two hosts in the same VLAN communicate, the default gateway may not participate. When they are in different IP subnets, each host sends remote traffic toward its gateway.

<h2 id="spanning-tree">Spanning tree: prevent Layer 2 loops</h2>

Redundant Ethernet paths can create loops because ordinary frames do not have a hop limit at Layer 2. Broadcast and unknown-unicast frames may circulate, multiply, and consume the switching fabric. MAC address tables can become unstable as the same source appears on different ports.

STP builds a loop-free logical topology. It elects a root bridge, calculates preferred paths, and places redundant paths into a non-forwarding role until needed.

Rapid Spanning Tree Protocol (RSTP) improves convergence compared with classic STP. Multiple Spanning Tree Protocol (MSTP) can map VLANs to spanning-tree instances so selected VLAN groups can use different logical paths.

A blocked port is not automatically broken. It may be correctly preventing a loop.

<h2 id="root-path">Root bridge and path decisions</h2>

The root bridge should be chosen intentionally. Switches compare bridge identifiers, which include priority and a MAC-address component. Lower values win.

Each non-root switch selects its best path toward the root based on path cost and tie breakers. The exact port-role terminology varies by STP version, but the exam-level reasoning is consistent: one logical path forwards while another redundant path may wait.

Poor root placement can cause traffic to take an inefficient path. Changing root priority can improve the logical topology, but it should be planned because the change can trigger reconvergence.

Edge protections such as BPDU guard help protect access ports from an unexpected switch. They are not substitutes for correct trunk and spanning-tree design.

<h2 id="link-aggregation">Link aggregation and LACP</h2>

Link aggregation combines multiple compatible physical links into one logical channel. Link Aggregation Control Protocol (LACP) can negotiate and maintain the bundle.

The member links generally need compatible speed, duplex, VLAN, trunk, and channel settings. A mismatch can leave one member suspended or create inconsistent forwarding.

Traffic is commonly distributed using a hash of fields such as source and destination addresses or ports. One large conversation may remain on one member link, while many conversations spread across the bundle. Four 1-Gbps members do not guarantee that one TCP flow reaches 4 Gbps.

A properly formed bundle appears to STP as one logical link. Simply connecting several independent links between switches without STP or aggregation creates a loop risk.

<h2 id="symptoms">Symptoms and likely evidence</h2>

<div class="table-scroll" role="region" aria-label="Switching symptom comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Symptom</th><th scope="col">Likely area</th><th scope="col">Useful evidence</th></tr></thead>
  <tbody>
    <tr><td data-label="Symptom">One endpoint gets an address from the wrong subnet</td><td data-label="Likely area">Access VLAN or voice/data VLAN assignment</td><td data-label="Useful evidence">Switchport mode, VLAN membership, DHCP scope</td></tr>
    <tr><td data-label="Symptom">One VLAN fails across a trunk while others work</td><td data-label="Likely area">Allowed VLAN list or VLAN existence</td><td data-label="Useful evidence">Trunk status and allowed VLANs on both ends</td></tr>
    <tr><td data-label="Symptom">Untagged trunk traffic lands in different networks</td><td data-label="Likely area">Native VLAN mismatch</td><td data-label="Useful evidence">Native VLAN configuration on both ends</td></tr>
    <tr><td data-label="Symptom">Broadcast storm and unstable MAC learning</td><td data-label="Likely area">Layer 2 loop or spanning-tree failure</td><td data-label="Useful evidence">STP topology, interface counters, MAC movement, logs</td></tr>
    <tr><td data-label="Symptom">One bundle member does not forward</td><td data-label="Likely area">LACP or member configuration mismatch</td><td data-label="Useful evidence">Channel state, member flags, speed, trunk, VLAN settings</td></tr>
    <tr><td data-label="Symptom">Same-VLAN traffic works, cross-VLAN traffic fails</td><td data-label="Likely area">Gateway, SVI, routing, ACL, or firewall policy</td><td data-label="Useful evidence">Host gateway, SVI state, route table, policy counters</td></tr>
  </tbody>
</table>
</div>

<h2 id="scenarios">Scenario comparisons</h2>

### Add a guest wireless network without another cable to the access point

Use a trunk between the switch and access point, permit the guest VLAN, and map the guest service set identifier to that VLAN. A new STP instance does not carry the VLAN.

### Preserve two switch links without creating a loop

Use a correctly configured LACP bundle when both links should actively participate as one logical channel. Use STP when the design requires separate redundant Layer 2 paths and one may remain blocked.

### Users in VLAN 20 cannot reach VLAN 30

Check the gateways, SVIs or router subinterfaces, routing state, and security policy. Adding VLAN tags to an access port does not provide Layer 3 forwarding.

### A redundant switch link appears down to users but shows a valid physical connection

Check STP role and state before replacing the cable. The link may be intentionally non-forwarding.

<h2 id="exam-traps">Common exam traps</h2>

- Treating a trunk as a faster access port.
- Assuming VLAN creation automatically enables routing.
- Calling every untagged frame an access-port frame without considering the native VLAN on a trunk.
- Replacing an STP-blocked redundant link.
- Assuming link aggregation multiplies the speed of one conversation.
- Creating several parallel switch links without aggregation or loop prevention.
- Changing the STP root during an outage without considering reconvergence and topology impact.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of switching decisions" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Requirement</th><th scope="col">Best fit</th></tr></thead>
  <tbody>
    <tr><td data-label="Requirement">Place an endpoint into one Layer 2 segment</td><td data-label="Best fit">Access VLAN</td></tr>
    <tr><td data-label="Requirement">Carry several VLANs across one link</td><td data-label="Best fit">802.1Q trunk</td></tr>
    <tr><td data-label="Requirement">Handle untagged traffic on a trunk</td><td data-label="Best fit">Native VLAN</td></tr>
    <tr><td data-label="Requirement">Communicate between VLANs</td><td data-label="Best fit">Router, Layer 3 switch, or firewall routing</td></tr>
    <tr><td data-label="Requirement">Prevent a Layer 2 loop</td><td data-label="Best fit">STP or RSTP</td></tr>
    <tr><td data-label="Requirement">Combine compatible parallel links</td><td data-label="Best fit">Link aggregation, commonly with LACP</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [CompTIA Network+ certification page](https://www.comptia.org/en-us/certifications/network/)
- [CompTIA Network+ N10-009 exam objectives](https://assets.ctfassets.net/82ripq7fjls2/113XqW3JHT7AlIU33M63I0/af42da2af7383a38f318bad10aa9afbd/Network_Plus_N10-009_Exam_Objectives.pdf)
- [IEEE 802.1Q: Bridges and Bridged Networks](https://standards.ieee.org/ieee/802.1Q/10323/)
- [IEEE 802.1AX: Link Aggregation](https://standards.ieee.org/ieee/802.1AX/6761/)
