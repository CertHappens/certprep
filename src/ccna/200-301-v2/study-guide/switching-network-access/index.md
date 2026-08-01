---
layout: layouts/article.njk
title: "CCNA 200-301 v2.0 Domain 2: Switching and Network Access"
description: Learn CCNA v2.0 Domain 2 through VLANs, trunks, LACP EtherChannel, SVIs, edge-port design, CDP and LLDP, troubleshooting evidence, and Rapid PVST+.
permalink: /ccna/200-301-v2/study-guide/switching-network-access/
ogType: article
printable: true
printTitle: "CCNA 200-301 v2.0 Domain 2: Switching and Network Access"
author: certHappens
datePublished: 2026-07-31
dateModified: 2026-07-31
articleSection: CCNA 200-301 v2.0 Domain 2
eyebrow: CCNA v2.0 domain 2 guide
lede: Build the Layer 2 path deliberately, verify its operational state, and use spanning-tree, neighbor, and port-channel evidence before changing configuration.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
  - label: Domain 2
    url: /ccna/200-301-v2/study-guide/switching-network-access/
toc:
  - id: domain-map
    label: Domain map
  - id: switching-model
    label: Switching troubleshooting model
  - id: interfaces
    label: Layer 2 and Layer 3 interfaces
  - id: trunks
    label: 802.1Q trunks
  - id: etherchannel
    label: LACP EtherChannel
  - id: svi
    label: Switch virtual interfaces
  - id: edge-ports
    label: Edge-host ports
  - id: neighbors
    label: CDP and LLDP
  - id: evidence
    label: Troubleshooting evidence
  - id: rapid-pvst
    label: Rapid PVST+
  - id: integrated-scenario
    label: Integrated troubleshooting scenario
  - id: common-traps
    label: Common traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 Domain 2
  - Switching and Network Access
  - Cisco VLAN trunk
  - LACP EtherChannel
  - Rapid PVST+
  - Cisco SVI
  - CDP LLDP
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Expand switching and Cisco abbreviations used throughout this guide.
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Return to the complete five-domain v2.0 guide and practical study method.
  - title: "Domain 1: Network Infrastructure and Connectivity"
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
    description: Review interfaces, addressing, wireless clients, virtualization, IPv4, IPv6, and DHCPv4 troubleshooting.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose the VLAN, trunk, EtherChannel, spanning-tree, neighbor, routing, logging, or path command that exposes the state you need.
  - title: VLANs, Trunks, STP, and LACP Quick Review
    url: /network-plus/quick-review/vlans-trunks-stp-lacp/
    description: Refresh the vendor-neutral Layer 2 concepts before applying them to Cisco IOS configuration and output.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Review management and infrastructure protocols that appear elsewhere in CCNA configuration and troubleshooting.
---
Domain 2 accounts for **25% of the published CCNA 200-301 v2.0 blueprint**. Cisco expects you to configure virtual local area network (VLAN) switching infrastructure, connect edge devices correctly, validate documentation from neighbor evidence, troubleshoot Layer 2 and Layer 3 operations, and configure Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+).

The central skill is separating **configured intent** from **operational state**. A port can be configured as a trunk without carrying the virtual local area network (VLAN) you need. An EtherChannel can exist while a member is suspended. A switch virtual interface (SVI) can have the correct IP address while its line protocol remains down. A physical uplink can be healthy while spanning tree intentionally keeps it from forwarding.

<div class="article-callout">
  <p><strong>Use this guide for v2.0.</strong> Cisco says the 200-301 v2.0 exam begins February 3, 2027. Candidates testing through February 2, 2027 should use the active v1.1 blueprint for exam-specific coverage.</p>
</div>

<h2 id="domain-map">Domain 2 objective map</h2>

<div class="table-scroll" role="region" aria-label="CCNA v2.0 Domain 2 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main skill</th>
        <th scope="col">Useful question</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Objective">2.1</td><td data-label="Main skill">Infrastructure connectivity</td><td data-label="Useful question">Is this link supposed to operate at Layer 2 or Layer 3, and does its trunk, port-channel, or SVI state match that design?</td></tr>
      <tr><td data-label="Objective">2.2</td><td data-label="Main skill">Edge-host ports</td><td data-label="Useful question">Does the access port match the attached endpoint's VLAN, power, voice, trunking, or aggregation requirements?</td></tr>
      <tr><td data-label="Objective">2.3</td><td data-label="Main skill">Cisco Discovery Protocol (CDP) and Link Layer Discovery Protocol (LLDP) validation</td><td data-label="Useful question">Does live neighbor information agree with the diagram, port label, and expected remote interface?</td></tr>
      <tr><td data-label="Objective">2.4</td><td data-label="Main skill">Operational troubleshooting</td><td data-label="Useful question">Which show command, log, ping, trace, or packet observation can confirm the next Layer 2 or Layer 3 theory?</td></tr>
      <tr><td data-label="Objective">2.5</td><td data-label="Main skill">Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+)</td><td data-label="Useful question">Which bridge is root, which ports should forward or discard, and which protection feature matches the port's intended role?</td></tr>
    </tbody>
  </table>
</div>

<h2 id="switching-model">Use a switching model before memorizing commands</h2>

For any switched path, identify five things before troubleshooting:

1. **Port role:** Is the interface an access port, trunk, routed port, port-channel member, or SVI?
2. **Layer 2 membership:** Which VLAN or VLANs should cross the interface?
3. **Aggregation:** Is the physical link standalone or part of a Link Aggregation Control Protocol (LACP) EtherChannel?
4. **Loop prevention:** Is spanning tree forwarding on this path or intentionally holding it in reserve?
5. **Layer 3 handoff:** Where does traffic leave the VLAN through an SVI or routed interface?

This prevents a common mistake: treating every link that is physically up as equivalent. A switch-to-switch trunk, a routed link, and an access port can all show an up physical state while forwarding completely different traffic.

<h2 id="interfaces">Layer 2 and Layer 3 physical interfaces</h2>

Cisco switches can use physical interfaces as Layer 2 switchports or, on supported multilayer platforms, as Layer 3 routed ports.

A Layer 2 access port associates ordinary untagged endpoint traffic with one access VLAN:

```text
interface GigabitEthernet1/0/10
 switchport mode access
 switchport access vlan 20
 no shutdown
```

A routed port removes Layer 2 switchport behavior and receives an IP address directly:

```text
interface GigabitEthernet1/0/48
 no switchport
 ip address 192.0.2.1 255.255.255.252
 no shutdown
```

The important distinction is architectural. An access or trunk switchport participates in VLAN switching and spanning tree. A routed port behaves as a Layer 3 interface and does not carry a Layer 2 VLAN trunk.

Useful verification includes:

```text
show interfaces status
show interfaces switchport
show ip interface brief
show running-config interface GigabitEthernet1/0/48
```

If a link between a switch and router is intended to carry several VLANs, it may be an 802.1Q trunk to router subinterfaces. If the switch and router use a dedicated routed point-to-point link instead, the switch interface should be Layer 3. The topology and addressing plan tell you which behavior is intended.

<h2 id="trunks">802.1Q trunks: prove what is actually crossing the link</h2>

An 802.1Q trunk carries traffic for multiple VLANs over one physical or logical link. Most VLAN traffic is tagged so the receiving device knows which VLAN the frame belongs to.

A basic static trunk might look like:

```text
interface GigabitEthernet1/0/47
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
 no shutdown
```

The configuration states intent. Operational verification tells you whether the interface is really trunking and which VLANs are usable:

```text
show interfaces trunk
show interfaces GigabitEthernet1/0/47 switchport
```

When a VLAN fails across an otherwise healthy trunk, check three separate questions:

- Does the VLAN exist where it is needed?
- Is the VLAN allowed across every trunk in the path?
- Is spanning tree forwarding that VLAN on the intended path?

Do not assume that because VLAN 10 works, VLAN 20 must also work. Allowed VLAN lists and per-VLAN spanning-tree state can make the behavior different on the same trunk.

<h3>Native VLAN behavior</h3>

802.1Q trunks have a native VLAN used for traffic sent untagged under the normal native-VLAN behavior. Native VLAN mismatches can produce unexpected forwarding and control-plane warnings. Verify both ends instead of assuming the default or reading only one configuration.

A common configuration form is:

```text
interface GigabitEthernet1/0/47
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20,30,99
```

Exact defaults and supported commands vary by platform and software release. For exam work, focus on the relationship among trunk state, allowed VLANs, tagging, and the native VLAN.

<h2 id="etherchannel">Link Aggregation Control Protocol (LACP) EtherChannel: several links, one logical interface</h2>

EtherChannel bundles compatible physical interfaces into one logical port-channel. Link Aggregation Control Protocol (LACP) negotiates membership and helps both ends agree on which links belong to the bundle.

LACP commonly uses two negotiation modes:

- **active:** initiates LACP negotiation.
- **passive:** responds to LACP negotiation.

Active with active can form. Active with passive can form. Passive with passive does not initiate the exchange, so the channel does not form through LACP negotiation.

A simple Layer 2 LACP bundle might use:

```text
interface range GigabitEthernet1/0/47-48
 channel-group 10 mode active
 no shutdown
!
interface Port-channel10
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
```

Verify the logical bundle and member state:

```text
show etherchannel summary
show interfaces port-channel 10
show interfaces trunk
```

Do not stop when `Port-channel10` exists in the configuration. The useful question is whether the expected physical members actually joined the bundle and whether the logical port-channel carries the intended Layer 2 state.

<h3>Layer 3 EtherChannel</h3>

A port-channel can also operate as a routed Layer 3 interface. A simplified pattern is:

```text
interface range GigabitEthernet1/0/47-48
 no switchport
 channel-group 20 mode active
 no shutdown
!
interface Port-channel20
 no switchport
 ip address 198.51.100.1 255.255.255.252
```

The member interfaces and logical interface must be compatible with the intended bundle. When an EtherChannel does not form, compare both ends for Layer 2 versus Layer 3 mode, trunk/access behavior, VLAN settings, speed, and other relevant interface parameters before replacing hardware.

<div class="article-callout">
  <p><strong>Evidence habit:</strong> `show etherchannel summary` is usually more useful than merely finding `channel-group` in the running configuration. Configuration tells you what someone asked for. The summary tells you what the switch formed.</p>
</div>

<h2 id="svi">Switch virtual interfaces (SVIs) connect VLANs to Layer 3</h2>

A switch virtual interface represents a VLAN at Layer 3. On a multilayer switch, an SVI can provide the default gateway for hosts in that VLAN or participate in routed management and control functions.

A common configuration pattern is:

```text
vlan 20
 name USERS
!
interface Vlan20
 ip address 10.20.0.1 255.255.255.0
 no shutdown
```

Verify both the VLAN and the SVI:

```text
show vlan brief
show ip interface brief
show interfaces vlan 20
```

An SVI can be administratively enabled yet still lack an operational Layer 2 path for its VLAN. If the line protocol is down, investigate whether the VLAN exists and whether an active Layer 2 interface or trunk is carrying that VLAN on the switch.

For inter-VLAN routing on a multilayer switch, IP routing must also be enabled where required by the platform and design. Do not confuse the presence of an SVI IP address with proof that the switch is actually routing traffic between VLANs.

<h2 id="edge-ports">Edge-host ports should match the device attached to them</h2>

Objective 2.2 broadens access-port thinking beyond a desktop computer. Cisco calls out desktops, printers, Internet of Things (IoT) devices, wireless access points (APs), Voice over IP (VoIP) phones, virtualized hosts, and network appliances.

The endpoint type changes what a healthy switchport may need.

<div class="table-scroll" role="region" aria-label="CCNA edge port design examples" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Attached device</th>
        <th scope="col">Common port considerations</th>
        <th scope="col">Useful evidence</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Attached device">Desktop or printer</td><td data-label="Common port considerations">Access VLAN, edge behavior, speed/duplex, endpoint authentication where used</td><td data-label="Useful evidence">Switchport mode, VLAN membership, Media Access Control (MAC) learning, interface state</td></tr>
      <tr><td data-label="Attached device">IoT appliance</td><td data-label="Common port considerations">Access VLAN, Power over Ethernet (PoE) when required, segmentation, edge protections</td><td data-label="Useful evidence">VLAN, power state, MAC address, interface counters</td></tr>
      <tr><td data-label="Attached device">Wireless access point</td><td data-label="Common port considerations">PoE, access or trunk design, controller relationship, allowed VLANs</td><td data-label="Useful evidence">Power, trunk/access state, CDP or LLDP neighbor information</td></tr>
      <tr><td data-label="Attached device">VoIP phone</td><td data-label="Common port considerations">PoE, data VLAN, voice VLAN, downstream workstation when present</td><td data-label="Useful evidence">Voice VLAN, power, neighbor information, learned MAC addresses</td></tr>
      <tr><td data-label="Attached device">Virtualized host</td><td data-label="Common port considerations">Possible trunking, multiple VLANs, LACP or port-channel design, redundant uplinks</td><td data-label="Useful evidence">Trunk state, allowed VLANs, port-channel membership, MAC learning</td></tr>
      <tr><td data-label="Attached device">Network appliance</td><td data-label="Common port considerations">Access, trunk, routed, or LACP design depending on function</td><td data-label="Useful evidence">Interface mode, VLANs, port-channel state, neighbor discovery</td></tr>
    </tbody>
  </table>
</div>

<h3>PoE is part of link troubleshooting</h3>

Power over Ethernet (PoE) matters for devices such as access points, phones, cameras, and other IoT equipment. A switchport can be correctly assigned to a VLAN while the endpoint remains offline because it is not receiving sufficient power.

A common verification command is:

```text
show power inline
```

When an AP or phone is dark, check power before spending ten minutes troubleshooting VLANs on a device that never booted.

<h3>Voice VLANs separate phone and workstation traffic</h3>

A phone port may carry ordinary access traffic for a connected workstation and voice traffic for the phone. A common pattern is:

```text
interface GigabitEthernet1/0/12
 switchport mode access
 switchport access vlan 20
 switchport voice vlan 30
 spanning-tree portfast
```

The data and voice VLANs solve different attachment requirements. Verify the design rather than assuming every endpoint on the physical port belongs to the same VLAN.

<h2 id="neighbors">Use Cisco Discovery Protocol (CDP) and Link Layer Discovery Protocol (LLDP) to test the documentation</h2>

A diagram is a claim about the network. CDP and LLDP provide live evidence about directly connected devices.

CDP is Cisco proprietary. LLDP is a vendor-neutral standard. Both can expose information such as the neighboring device identity, local interface, remote port, capabilities, and management information depending on configuration and platform support.

Useful commands include:

```text
show cdp neighbors
show cdp neighbors detail
show lldp neighbors
show lldp neighbors detail
```

Suppose the diagram says `Gi1/0/48` connects Access1 to Distribution1, but neighbor output shows Distribution2 on `Gi1/0/48`. Do not force your troubleshooting to fit the drawing. Confirm the live topology first, then correct either the cable, documentation, or expectation.

Neighbor discovery is especially useful when:

- A cable label is wrong.
- An uplink was moved during maintenance.
- A phone, access point, switch, or router is attached to a port you did not expect.
- The local and remote interface names matter for comparing both ends of a trunk or port-channel.

<h2 id="evidence">Troubleshoot from several kinds of evidence</h2>

Objective 2.4 explicitly includes `show` commands, logs, ping, extended ping, traceroute, and packet-capture output. These tools answer different questions.

### Show commands expose device state

Start with the smallest command that can prove or reject your theory:

```text
show interfaces status
show interfaces switchport
show interfaces trunk
show etherchannel summary
show spanning-tree vlan 20
show cdp neighbors
show lldp neighbors
show logging
```

The [Cisco IOS verification command reference](/ccna/commands/) is organized around the state each command exposes.

### Ping tests reachability, not the entire design

A successful ping proves that Internet Control Message Protocol (ICMP) Echo traffic completed a round trip between the tested endpoints. It does not prove that every application, VLAN, access control list (ACL), or redundant path is correct.

Extended ping is useful when the source address or interface matters. Choosing a source can help answer whether traffic works from a particular routed interface or subnet rather than from whichever source the device would select automatically.

### Traceroute shows the visible Layer 3 path

Traceroute can help locate where routed forwarding stops or changes. It is not a Layer 2 topology map, so a missing switch does not mean the switch was bypassed. Ordinary Layer 2 switches do not appear as routed hops.

### Packet-capture output shows the actual exchange

You do not need to treat a packet capture as a wall of hex. Look for evidence tied to the question:

- Source and destination MAC addresses
- 802.1Q VLAN tags when present
- Address Resolution Protocol (ARP) or Neighbor Discovery exchanges
- ICMP requests and replies
- LACP messages
- Spanning-tree Bridge Protocol Data Units (BPDUs)
- Retransmissions or repeated requests without replies

If a capture shows an ARP request repeatedly leaving with no reply, that is different evidence from an interface that never transmitted anything.

<h2 id="rapid-pvst">Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+): redundancy without a Layer 2 loop</h2>

Redundant Layer 2 links improve resilience, but forwarding the same Ethernet frames around a physical loop can create broadcast storms, duplicate frames, and unstable MAC learning. Spanning Tree Protocol (STP) creates a loop-free logical topology while preserving redundant physical paths.

Rapid PVST+ applies a rapid spanning-tree instance per VLAN. That means different VLANs can have different root bridges and forwarding paths.

A common mode configuration is:

```text
spanning-tree mode rapid-pvst
```

Verify a VLAN's tree with:

```text
show spanning-tree vlan 20
```

<h3>Root bridge and root port</h3>

The root bridge is the reference point for the spanning-tree instance. Each non-root switch selects one **root port**, the port providing its best path toward the root.

Cisco provides convenient root-selection commands such as:

```text
spanning-tree vlan 20 root primary
spanning-tree vlan 20 root secondary
```

The design goal matters more than memorizing a default priority. The primary root should normally be placed intentionally in the network, commonly on a distribution or backbone device rather than left to an accidental lowest bridge ID.

<h3>Port roles and states</h3>

Rapid spanning tree commonly uses these port roles:

- **Root port:** best path toward the root bridge on a non-root switch.
- **Designated port:** forwarding port selected for a network segment.
- **Alternate port:** redundant path toward the root that can replace the current path.
- **Backup port:** redundant path on the same shared segment, uncommon in modern switched Ethernet designs.

Rapid STP uses the operational states **discarding, learning, and forwarding**. A discarding redundant port is not automatically broken. It may be doing exactly what the loop-free design requires.

<h3>PortFast is for edge behavior</h3>

PortFast allows an edge-facing port to move to forwarding without waiting for the normal spanning-tree transition. It belongs on ports where a Layer 2 switch is not expected on the far end.

```text
interface GigabitEthernet1/0/10
 spanning-tree portfast
```

Do not enable PortFast casually on switch-to-switch links. The feature assumes edge behavior and should match the actual topology.

<h3>Bridge Protocol Data Unit (BPDU) Guard protects the edge assumption</h3>

If an edge port should never receive spanning-tree Bridge Protocol Data Units (BPDUs), BPDU Guard can react when that assumption is violated.

```text
interface GigabitEthernet1/0/10
 spanning-tree portfast
 spanning-tree bpduguard enable
```

Receiving a BPDU on that protected edge port can cause the interface to be error-disabled, depending on configuration. That behavior is protective evidence, not a reason to disable the guard without understanding what appeared on the port.

<h3>Root Guard protects root placement</h3>

Root Guard is useful on an interface where the connected network should never become the path to a superior root bridge. If superior BPDUs arrive, the port can enter a root-inconsistent blocked state rather than allowing the unexpected switch to change the root topology.

```text
interface GigabitEthernet1/0/24
 spanning-tree guard root
```

Use Root Guard based on design intent. It is not a generic command to place on every trunk.

<h3>Loop Guard protects against lost BPDUs on redundant paths</h3>

Loop Guard helps prevent root or alternate ports from becoming designated and forwarding when a failure causes expected BPDUs to stop arriving, such as certain unidirectional-link failures.

```text
interface GigabitEthernet1/0/48
 spanning-tree guard loop
```

Root Guard and Loop Guard protect different assumptions. Root Guard rejects an unexpected superior-root path. Loop Guard protects a redundant spanning-tree path when expected BPDUs disappear.

<h2 id="integrated-scenario">Integrated troubleshooting scenario: one VLAN disappears across the uplink</h2>

Users in VLAN 20 on an access switch cannot reach their default gateway. VLAN 10 users on the same switch are working.

Start with what the symptom already tells you. The shared physical uplink is unlikely to be completely down because VLAN 10 crosses it successfully.

### 1. Verify the client-facing VLAN

```text
show vlan brief
show interfaces GigabitEthernet1/0/10 switchport
```

The user port is an access port in VLAN 20. That supports the local attachment theory.

### 2. Verify the bundle

```text
show etherchannel summary
```

`Port-channel10` is up and both expected physical members are bundled. The EtherChannel itself is not the strongest lead.

### 3. Verify trunk state and VLAN allowance

```text
show interfaces trunk
```

The port-channel is operationally trunking, but the allowed VLAN list contains `10,30` and omits VLAN 20.

That is a strong root-cause clue. VLAN 10 works because it is allowed. VLAN 20 fails because the logical trunk does not carry it.

### 4. Correct the logical interface and verify

After adding VLAN 20 to the intended port-channel trunk configuration, run the same verification again. Do not declare success only because the command was accepted.

```text
show interfaces trunk
show spanning-tree vlan 20
ping 10.20.0.1
```

The repair is proven when VLAN 20 is allowed, spanning tree has a forwarding path, and the client-side or appropriately sourced reachability test succeeds.

This scenario illustrates the Domain 2 mindset: **use working VLANs, port-channel state, trunk output, and spanning-tree state to narrow the failure before editing configuration.**

<h2 id="common-traps">Common Domain 2 traps</h2>

<h3>Reading only the running configuration</h3>

A configured trunk or port-channel is not proof that it formed operationally. Pair configuration with `show interfaces trunk` or `show etherchannel summary`.

<h3>Assuming every VLAN has the same path</h3>

Allowed VLAN lists and per-VLAN spanning tree can make VLAN 10 work while VLAN 20 fails on the same physical links.

<h3>Treating a blocked spanning-tree port as a fault</h3>

A redundant port in discarding state may be protecting the network from a Layer 2 loop. Check the root, role, and intended topology before forcing forwarding.

<h3>Putting PortFast on infrastructure links because convergence is faster</h3>

PortFast is an edge behavior. Faster is not safer when the far end can participate in switching loops.

<h3>Troubleshooting an SVI only from its IP address</h3>

The SVI may have the correct address while its VLAN has no active Layer 2 path. Check VLAN existence, active interfaces, trunks, and line-protocol state.

<h3>Ignoring power on phones and access points</h3>

A correct VLAN does not boot a device that lacks PoE. Check power state early when the endpoint itself appears dead.

<h3>Trusting the diagram more than the neighbor table</h3>

Documentation can lag behind cabling changes. CDP and LLDP can reveal the live directly connected device and port so you can compare evidence with the drawing.

<h2 id="rapid-review">Rapid review checklist</h2>

You are ready to move beyond Domain 2 review when you can:

- Distinguish an access switchport, trunk, routed port, port-channel member, logical port-channel, and SVI.
- Configure and verify a basic static 802.1Q trunk and allowed VLAN list.
- Explain how the native VLAN differs from tagged VLAN traffic.
- Configure a basic Layer 2 or Layer 3 LACP EtherChannel and verify member state.
- Explain why active/passive LACP can form while passive/passive does not initiate a bundle.
- Configure or recognize an SVI and troubleshoot why its protocol might remain down.
- Match desktop, printer, IoT, AP, phone, virtual-host, and appliance connections to sensible VLAN, PoE, trunk, voice, or LACP requirements.
- Use CDP and LLDP neighbor output to verify a directly connected topology.
- Choose among show commands, logs, ping, extended ping, traceroute, and packet evidence based on the question you need answered.
- Identify the Rapid PVST+ root bridge, root port, designated port, alternate port, and forwarding state from output.
- Explain when PortFast, BPDU Guard, Root Guard, and Loop Guard fit the topology.
- Troubleshoot a VLAN failure by separating access-port state, EtherChannel state, trunk allowance, spanning-tree forwarding, and Layer 3 reachability.

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco 200-301 CCNA exam page](https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html)
- [Cisco IOS XE VLAN trunk configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan-trunks.html)
- [Cisco IOS XE EtherChannel configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/etherchannel/etherchannel-configuration-guide/etherchannels.html)
- [Cisco IOS XE CDP configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/cdp-lldp-mac-udld/cdp-lldp-mac-udld-configuration-guide/c-configure-cdp.html)
- [Cisco IOS XE LLDP configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/cdp-lldp-mac-udld/cdp-lldp-mac-udld-configuration-guide/c-configure-lldp.html)
- [Cisco IOS XE Rapid PVST+ and STP configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-15/configuration_guide/lyr2/b_1715_lyr2_9300_cg/configuring_spanning_tree_protocol.html)
- [Cisco IOS XE optional spanning-tree features](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/26-x/configuration_guide/lyr2/b_26x_lyr2_9300_cg/configuring_optional_spanning_tree_features.html)
