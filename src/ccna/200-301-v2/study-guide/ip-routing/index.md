---
layout: layouts/article.njk
title: "CCNA 200-301 v2.0 Domain 3: IP Routing"
description: Learn CCNA v2.0 IP routing through routing-table interpretation, IPv4 and IPv6 static routes, OSPFv2, OSPFv3, and HSRP/VRRP operational state.
permalink: /ccna/200-301-v2/study-guide/ip-routing/
ogType: article
printable: true
printTitle: "CCNA 200-301 v2.0 Domain 3: IP Routing"
author: certHappens
datePublished: 2026-07-31
dateModified: 2026-07-31
articleSection: CCNA 200-301 v2.0 Domain 3
eyebrow: CCNA v2.0 domain 3 guide
lede: Follow the packet. Read the routing table, prove the next hop, verify the routing relationship, and separate route-selection problems from forwarding and return-path problems.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
  - label: Domain 3
    url: /ccna/200-301-v2/study-guide/ip-routing/
toc:
  - id: domain-map
    label: Domain map
  - id: routing-table
    label: Read the routing table
  - id: route-selection
    label: Route selection
  - id: ipv4-static
    label: IPv4 static routes
  - id: ipv6-static
    label: IPv6 static routes
  - id: ospfv2
    label: Single-area OSPFv2
  - id: adjacency
    label: OSPF adjacency clues
  - id: network-types
    label: Point-to-point vs broadcast
  - id: ospfv3
    label: Single-area OSPFv3
  - id: fhrp
    label: HSRP and VRRP status
  - id: integrated-scenario
    label: Integrated routing scenario
  - id: common-traps
    label: Common traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 Domain 3
  - CCNA IP routing
  - Cisco static routes
  - OSPFv2
  - OSPFv3
  - HSRP
  - VRRP
  - Cisco routing table
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Expand routing and first-hop redundancy abbreviations used throughout this guide.
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Return to the complete five-domain v2.0 guide and practical study method.
  - title: "Domain 2: Switching and Network Access"
    url: /ccna/200-301-v2/study-guide/switching-network-access/
    description: Review trunks, SVIs, routed ports, EtherChannel, neighbor discovery, and spanning tree before troubleshooting routed paths.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose routing, interface, neighbor, and path-testing commands based on the state you need to prove.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Review prefixes, subnet boundaries, host ranges, and wildcard masks before applying them to route selection and OSPF.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check a prefix or address role after working the subnet calculation manually.
---
Domain 3 accounts for **20%** of the published CCNA 200-301 v2.0 blueprint. Cisco expects you to interpret routing tables, troubleshoot IPv4 and IPv6 static routes, configure single-area Open Shortest Path First version 2 (OSPFv2) and version 3 (OSPFv3), and interpret the operational status of Hot Standby Router Protocol (HSRP) and Virtual Router Redundancy Protocol (VRRP).

Routing becomes much easier when you keep three questions separate:

1. **Which route is installed?** Routing sources compete to place usable routes in the routing table.
2. **Which installed route matches the destination best?** Forwarding uses the longest matching prefix.
3. **Can the next hop and return path actually work?** A correct table entry does not guarantee end-to-end communication.

If those three questions blur together, routing output starts to look like alphabet soup. If you answer them in order, the table becomes a map.

Use this guide for v2.0. Cisco says the 200-301 v2.0 exam begins February 3, 2027. Candidates testing through February 2, 2027 should use the active v1.1 blueprint for exam-specific coverage.

<h2 id="domain-map">Domain 3 objective map</h2>

<div class="table-scroll" role="region" aria-label="CCNA v2.0 Domain 3 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main skill</th>
        <th scope="col">Useful question</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Objective">3.1</td><td data-label="Main skill">Routing-table interpretation</td><td data-label="Useful question">Which installed route is the best match for this destination, and what next hop will the router use?</td></tr>
      <tr><td data-label="Objective">3.2</td><td data-label="Main skill">IPv4 and IPv6 static routing</td><td data-label="Useful question">Is the route correctly defined, resolvable, preferred at the intended administrative distance, and supported by a working return path?</td></tr>
      <tr><td data-label="Objective">3.3</td><td data-label="Main skill">Single-area OSPFv2 and OSPFv3</td><td data-label="Useful question">Did the expected neighbors become adjacent, and did the intended routes enter the table?</td></tr>
      <tr><td data-label="Objective">3.4</td><td data-label="Main skill">HSRP and VRRP status</td><td data-label="Useful question">Which device currently owns the forwarding role for the virtual gateway, and does the observed state match the design?</td></tr>
    </tbody>
  </table>
</div>

<h2 id="routing-table">Read the routing table as evidence</h2>

A routing table is not a list of every network the router has ever heard about. It is the set of routes the device has accepted for forwarding after considering route sources and path information.

A simplified IPv4 example might look like this:

```text
R1# show ip route
Gateway of last resort is 192.0.2.2 to network 0.0.0.0

O    10.40.0.0/16 [110/20] via 192.0.2.6, GigabitEthernet0/0
S    10.40.8.0/24 [1/0] via 198.51.100.2
S*   0.0.0.0/0 [1/0] via 192.0.2.2
```

Read each line deliberately.

<div class="table-scroll" role="region" aria-label="Cisco IOS routing table fields" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Field</th>
        <th scope="col">What it tells you</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Field">Route code</td><td data-label="What it tells you">Where the route came from, such as connected, static, or OSPF</td></tr>
      <tr><td data-label="Field">Prefix and mask</td><td data-label="What it tells you">Which destinations the route can match</td></tr>
      <tr><td data-label="Field">Administrative distance</td><td data-label="What it tells you">Preference between competing route sources for the same destination prefix</td></tr>
      <tr><td data-label="Field">Metric</td><td data-label="What it tells you">Cost used by the routing protocol when choosing among its candidate paths</td></tr>
      <tr><td data-label="Field">Next hop</td><td data-label="What it tells you">The neighboring address that receives the packet next</td></tr>
      <tr><td data-label="Field">Exit interface</td><td data-label="What it tells you">The local interface used to reach the next hop or destination</td></tr>
      <tr><td data-label="Field"><code>*</code> on a route code</td><td data-label="What it tells you">A candidate default route in common IOS routing-table output</td></tr>
    </tbody>
  </table>
</div>

For `10.40.8.25`, both `10.40.0.0/16` and `10.40.8.0/24` match. The `/24` wins because it is more specific.

For `10.40.9.25`, the `/24` does not match, so the OSPF `/16` is used.

For a destination outside both prefixes, the `/0` default route can be used if no more-specific route matches.

### Administrative distance and metric solve different problems

This distinction is worth learning precisely.

**Administrative distance (AD)** compares the trustworthiness of different route sources when they offer competing routes to the same destination prefix. On Cisco IOS, a connected route normally has AD 0, a static route normally has AD 1, and OSPF normally has AD 110.

**Metric** is protocol-specific. OSPF uses cost. A lower OSPF cost represents a more preferred OSPF path.

Do not compare the OSPF metric in one prefix against the static-route metric in another prefix and conclude that the smaller number must win. Prefix matching and route-source selection happen in their proper contexts.

<h2 id="route-selection">Route selection: use the right order</h2>

For CCNA troubleshooting, use this sequence:

1. **Confirm the destination address.** Know the exact IP you are trying to reach.
2. **Find all installed prefixes that contain it.** A route cannot win if the destination does not fall inside its prefix.
3. **Choose the longest matching prefix.** `/32` is more specific than `/24`; `/24` is more specific than `/16`; `/0` is the least specific.
4. **Read the next hop or exit interface.** Determine where the router intends to send the packet.
5. **Prove the next hop is reachable.** Check connected routes, interface state, Address Resolution Protocol (ARP) or IPv6 neighbor state when appropriate, and recursive resolution.
6. **Check the return path.** A successful outbound forwarding decision does not guarantee that the destination can reply.

A useful command sequence is:

```text
show ip route
show ip route 10.40.8.25
show ip interface brief
ping 198.51.100.2
traceroute 10.40.8.25
```

Use the IPv6 equivalents when the path is IPv6:

```text
show ipv6 route
show ipv6 route 2001:db8:40:8::25
show ipv6 interface brief
ping 2001:db8:12::2
traceroute 2001:db8:40:8::25
```

The point is not to type every command. Choose the command that answers the next unresolved question.

<h2 id="ipv4-static">IPv4 static routes</h2>

A static route manually defines how the router should reach a destination. The core syntax can specify a next-hop address, an exit interface, or both depending on the design and interface type.

A network route using a next hop:

```text
ip route 10.30.0.0 255.255.255.0 192.0.2.2
```

A default route:

```text
ip route 0.0.0.0 0.0.0.0 192.0.2.2
```

A host route matches one IPv4 address:

```text
ip route 10.30.0.25 255.255.255.255 192.0.2.2
```

Verify the result rather than assuming the configuration line created a usable route:

```text
show ip route static
show ip route 10.30.0.25
show running-config | include ^ip route
```

### Why a configured static route may be missing

If the route exists in the running configuration but not in the routing table, ask whether the router can resolve and use the specified forwarding path.

Common causes include:

- The exit interface is down.
- The next-hop address is not reachable through another installed route.
- The destination prefix or mask was entered incorrectly.
- A tracking condition tied to the route is not satisfied where tracking is used.
- A floating static route has a higher administrative distance and the preferred route is still present.

The last case is not a failure. It is the intended behavior of a backup route.

### Floating static routes

A floating static route uses a higher administrative distance so that another route is preferred while healthy.

Suppose OSPF normally supplies `10.30.0.0/24` with AD 110. A static backup could use AD 200:

```text
ip route 10.30.0.0 255.255.255.0 198.51.100.2 200
```

While the OSPF route is installed, the higher-AD static route normally stays out of the routing table. If the OSPF route disappears and the static next hop remains usable, the floating route can become active.

Troubleshoot it by checking both states:

1. Is the preferred route still present?
2. If the preferred route is removed, does the floating static route actually install?

A configured backup that never becomes usable is not redundancy.

<h2 id="ipv6-static">IPv6 static routes</h2>

IPv6 static routing follows the same basic forwarding logic, but the syntax uses a prefix length rather than a dotted-decimal mask.

IPv6 forwarding must be enabled on a router that is routing IPv6 traffic:

```text
ipv6 unicast-routing
```

A network route using a global next-hop address:

```text
ipv6 route 2001:db8:30::/64 2001:db8:12::2
```

A default route:

```text
ipv6 route ::/0 2001:db8:12::2
```

A host route:

```text
ipv6 route 2001:db8:30::25/128 2001:db8:12::2
```

A floating static route can add a higher administrative distance:

```text
ipv6 route 2001:db8:30::/64 2001:db8:12::2 200
```

### Link-local next hops need interface context

A link-local address such as `fe80::2` is meaningful only on its local link. When using a link-local next hop in an IPv6 static route, include the exit interface so IOS knows which link contains that neighbor:

```text
ipv6 route 2001:db8:30::/64 GigabitEthernet0/0/0 fe80::2
```

Useful verification includes:

```text
show ipv6 route static
show ipv6 route 2001:db8:30::25
show ipv6 interface brief
show ipv6 neighbors
```

When an IPv6 route looks correct but forwarding fails, confirm the next-hop scope and interface as carefully as the prefix itself.

<h2 id="ospfv2">Single-area Open Shortest Path First version 2 (OSPFv2) for IPv4</h2>

OSPF is a link-state routing protocol. In v2.0 Domain 3, Cisco expects configuration of **single-area OSPFv2 for IPv4**.

A compact modern IOS configuration can enable OSPF directly on interfaces:

```text
router ospf 10
 router-id 1.1.1.1
!
interface GigabitEthernet0/0/0
 ip ospf 10 area 0
!
interface GigabitEthernet0/0/1
 ip ospf 10 area 0
```

The process ID `10` is locally significant. Neighboring routers do not need matching OSPF process IDs. They do need compatible OSPF parameters on the shared link.

After configuration, verify three separate things:

```text
show ip ospf interface brief
show ip ospf neighbor
show ip route ospf
```

- The **interface** command confirms where OSPF is active and which area applies.
- The **neighbor** command confirms adjacency state.
- The **routing table** confirms whether OSPF-learned prefixes were installed.

Do not treat one as proof of all three. A neighbor can be fully adjacent while the route you expected is still absent because that network is not being advertised or a competing route source is preferred.

### Router ID

The OSPF router ID is a 32-bit identifier written in dotted-decimal form. It identifies the OSPF router; it is not required to be an address used for forwarding user traffic.

Explicit configuration removes ambiguity:

```text
router ospf 10
 router-id 1.1.1.1
```

If two routers use the same router ID, OSPF operation becomes unreliable. When troubleshooting adjacency or unexpected topology information, verify uniqueness rather than assuming every dotted-decimal value is merely another interface address.

<h2 id="adjacency">Open Shortest Path First (OSPF) adjacency clues</h2>

When OSPF routes are missing, determine whether the problem happens **before adjacency**, **during adjacency formation**, or **after adjacency**.

Start with:

```text
show ip ospf neighbor
show ip ospf interface GigabitEthernet0/0/0
show ip interface brief
show running-config interface GigabitEthernet0/0/0
```

Common checks include:

- The physical and Layer 3 interface must be operational.
- The neighbors must be on a compatible IP network for the link.
- The OSPF area must match across the link.
- Hello and dead timers must be compatible.
- Router IDs must be unique.
- Network-type expectations should match the link design.
- Maximum transmission unit (MTU) differences can interfere with later adjacency formation on some links even after Hellos are exchanged.

Authentication is excluded from the v2.0 objective's neighbor-adjacency subtopic, so keep your Domain 3 study centered on the routing and operational conditions Cisco actually lists.

### State names are clues, not decorations

You may see neighbor states such as `DOWN`, `INIT`, `2-WAY`, `EXSTART`, `EXCHANGE`, `LOADING`, and `FULL`.

Do not memorize them as an isolated sequence only. Use the state to narrow the failure:

- **No neighbor at all:** start with interface state, addressing, OSPF enablement, area, and Hello visibility.
- **INIT:** one side is receiving Hellos but bidirectional communication is not established.
- **2-WAY:** can be normal between certain routers on a broadcast segment; not every OSPF neighbor pair on Ethernet must become FULL with each other.
- **EXSTART/EXCHANGE:** investigate database-exchange conditions such as MTU or network compatibility.
- **FULL:** the adjacency completed with that neighbor.

<h2 id="network-types">Point-to-point and broadcast Open Shortest Path First (OSPF) behavior</h2>

The v2.0 blueprint specifically calls out **point-to-point** and **broadcast** OSPF behavior.

### Point-to-point

A point-to-point OSPF link connects two routing devices for OSPF purposes. There is no Designated Router (DR) or Backup Designated Router (BDR) election on that network type.

Verification focuses on whether the expected peer becomes adjacent and whether routes are exchanged:

```text
show ip ospf interface
show ip ospf neighbor
show ip route ospf
```

### Broadcast

Ethernet commonly operates as an OSPF broadcast network type. Because several routers can share the segment, OSPF uses a DR and BDR to reduce unnecessary adjacency and flooding complexity.

Useful fields include:

- OSPF interface priority
- DR identity
- BDR identity
- Neighbor priority
- Neighbor state

A router with interface priority `0` is ineligible to become DR or BDR. Among eligible routers at election time, priority is considered before router ID. DR/BDR elections are not something to treat like an always-on ranking that instantly changes every time a higher-priority router appears.

This matters when reading output. A neighbor showing `FULL/DR` or `FULL/BDR` is telling you both adjacency state and that neighbor's role on the segment.

<h2 id="ospfv3">Single-area Open Shortest Path First version 3 (OSPFv3) for IPv6</h2>

The v2.0 blueprint pairs OSPFv2 with IPv4 and **OSPFv3 with IPv6**.

Current IOS XE documentation recommends the `router ospfv3` syntax. A simple single-area example can look like:

```text
ipv6 unicast-routing
!
router ospfv3 10
 router-id 1.1.1.1
!
interface GigabitEthernet0/0/0
 ospfv3 10 ipv6 area 0
!
interface GigabitEthernet0/0/1
 ospfv3 10 ipv6 area 0
```

You may encounter older material using `ipv6 router ospf` and `ipv6 ospf` syntax. Recognize it, but understand that current IOS XE documentation recommends the newer `router ospfv3` form.

Useful verification includes:

```text
show ospfv3 interface brief
show ospfv3 neighbor
show ospfv3 database
show ipv6 route ospf
```

The troubleshooting questions remain familiar:

1. Is OSPFv3 enabled on the intended interface and area?
2. Does the interface have working IPv6 connectivity?
3. Did the expected neighbor relationship form?
4. Did the expected IPv6 prefixes enter the routing table?
5. Does a more-specific or otherwise preferred installed route explain the forwarding behavior?

OSPFv3 commonly uses IPv6 link-local addresses for neighbor communication on the local link. That is another reason to pay attention to the interface associated with a next hop rather than reading only the IPv6 address.

<h2 id="fhrp">First Hop Redundancy Protocol (FHRP): interpret HSRP and VRRP operational state</h2>

First-hop redundancy protocols let multiple routers present a resilient default-gateway service to hosts. The host uses a **virtual IP address** as its gateway while the participating routers coordinate which device currently performs the forwarding role.

For v2.0, Cisco's Domain 3 wording asks you to **interpret operational status** for Hot Standby Router Protocol (HSRP) and Virtual Router Redundancy Protocol (VRRP). Focus on reading the state rather than turning this section into a configuration-command memorization exercise.

### HSRP

HSRP uses roles such as **Active** and **Standby**.

Useful commands include:

```text
show standby brief
show standby
```

A simplified interpretation might be:

```text
Interface   Grp  Pri  State    Active        Standby       Virtual IP
Gi0/0       10   110  Active   local         10.10.10.3    10.10.10.1
```

From this, you should be able to identify:

- The virtual gateway is `10.10.10.1`.
- The local router is currently Active.
- The peer at `10.10.10.3` is Standby.
- The displayed priority is part of the election behavior.

If the design expects another router to be Active, investigate priority, preemption behavior, peer reachability, and interface state before assuming the protocol itself is broken.

### VRRP

VRRP uses **Master** and **Backup** terminology for the equivalent forwarding relationship.

Useful verification includes:

```text
show vrrp brief
show vrrp
```

The same core questions apply:

- What is the virtual IP address?
- Which router currently owns the forwarding role?
- Which router is waiting as backup?
- Does the observed priority and role match the intended design?

Do not let the different role names hide the shared purpose. Both protocols provide a resilient first-hop gateway so hosts do not need to change their configured default-gateway address when one participating router fails.

<h2 id="integrated-scenario">Integrated routing scenario</h2>

A user in virtual local area network (VLAN) 20 can reach the local default gateway but cannot reach `10.40.8.25` at a remote site. Other remote networks still work.

R1 shows:

```text
R1# show ip route 10.40.8.25
Routing entry for 10.40.0.0/16
  Known via "ospf 10", distance 110, metric 20
  * 192.0.2.6, via GigabitEthernet0/0
```

The design documentation says `10.40.8.0/24` should use a dedicated static path through `198.51.100.2`.

Do not start by changing OSPF. Work the evidence:

1. **The current match:** `10.40.8.25` is being covered only by the broader OSPF `/16`.
2. **The expected route:** a more-specific `/24` static route should exist and would win by longest-prefix match if installed.
3. **Check configuration:** determine whether the `/24` route is absent from configuration or configured but not installed.
4. **Check the next hop:** if the static route is configured, verify reachability to `198.51.100.2` and the outgoing interface.
5. **Check the return path:** after restoring the intended forward path, confirm that the remote side can route back to VLAN 20.

Suppose the running configuration contains:

```text
ip route 10.40.8.0 255.255.255.0 198.51.100.2
```

but the route is absent from `show ip route`. That shifts the investigation toward next-hop resolution or interface state, not OSPF cost.

This is the CCNA habit to build: **use each command to eliminate a class of explanations before making a change.**

<h2 id="common-traps">Common Domain 3 traps</h2>

### Treating administrative distance as longest-prefix match

AD helps choose among route sources for the same destination prefix. Forwarding among installed routes uses the most-specific matching prefix.

### Assuming a configured route must be installed

Static configuration is intent. The next hop still has to be usable for the route to participate in forwarding.

### Forgetting the return path

A router can make a correct outbound decision while the destination lacks a route back. Test both directions when the application needs bidirectional communication.

### Comparing metrics from unrelated routing protocols

Metrics are protocol-specific. Do not compare an OSPF cost directly with an unrelated protocol's metric as if they share one universal scale.

### Expecting every broadcast OSPF neighbor pair to be FULL

DROTHER routers on a broadcast segment can remain 2-WAY with each other while maintaining full adjacency with the DR and BDR.

### Assuming matching OSPF process IDs are required

The process ID is local to the router. Area, addressing, timers, network behavior, and other adjacency conditions matter across the link.

### Reading HSRP and VRRP role names as different goals

HSRP Active/Standby and VRRP Master/Backup use different terminology but both solve first-hop gateway redundancy.

<h2 id="rapid-review">Rapid review</h2>

Before leaving Domain 3, make sure you can answer these without guessing:

- Given several installed routes, which prefix matches a destination most specifically?
- What do the two values in an IOS route entry such as `[110/20]` represent?
- When does administrative distance matter?
- When does a routing-protocol metric matter?
- What is the difference among a default route, network route, host route, and floating static route?
- Why might a configured static route be absent from the routing table?
- How do IPv4 and IPv6 static-route syntax differ?
- Why does an IPv6 link-local next hop need interface context?
- Which commands show OSPFv2 interfaces, neighbors, and installed routes?
- Which OSPF conditions commonly prevent adjacency?
- What changes between point-to-point and broadcast OSPF network behavior?
- What do DR and BDR mean on a broadcast OSPF segment?
- Why should router IDs be unique?
- Which commands verify OSPFv3 neighbors and IPv6 OSPF routes?
- Which device is forwarding when HSRP reports Active or VRRP reports Master?
- What virtual address should an end host normally use as its default gateway in an FHRP design?

<h2 id="official-references">Official references</h2>

Use Cisco's current documentation when checking syntax or platform-specific behavior:

- [Official 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco IOS XE basic IP routing and static routes](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_iri-iprouting.html)
- [Cisco IOS XE IPv6 static routing](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/ip-routing/b-ip-routing/m_ip6-route-static-xe.html)
- [Cisco IOS XE OSPF configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_iro-cfg-0.html)
- [Cisco IOS XE OSPFv3](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ip6-route-ospfv3-xe.html)
- [Cisco IOS XE HSRP](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/network-services/network-services/m_fhp-hsrp-0.html)
- [Cisco VRRP configuration reference](https://www.cisco.com/c/en/us/td/docs/ios/ios_xe/ipapp/configuration/guide/2_xe/ipapp_xe_book/ipapp_vrrp_xe.html)

Exact command support and defaults can vary by platform and software release. For CCNA, understand the forwarding logic and the evidence each command provides rather than assuming one device image represents every Cisco platform.
