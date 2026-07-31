---
layout: layouts/article.njk
title: Core Cisco IOS Verification and Troubleshooting Commands for CCNA 200-301 v2.0
description: Use Cisco IOS show, routing, neighbor, ACL, NAT, and logging commands to verify network state and choose the next troubleshooting step for CCNA 200-301 v2.0.
permalink: /ccna/commands/
ogType: article
printable: true
printTitle: Core Cisco IOS Verification and Troubleshooting Commands for CCNA 200-301 v2.0
author: certHappens
datePublished: 2026-07-31
articleSection: CCNA 200-301 v2.0 Quick Reference
eyebrow: CCNA command quick reference
lede: Start with the question you need to answer, run the command that exposes that state, and change configuration only after the evidence points somewhere specific.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: IOS Commands
    url: /ccna/commands/
toc:
  - id: workflow
    label: Troubleshooting workflow
  - id: command-map
    label: Command map
  - id: interfaces
    label: Interfaces and addressing
  - id: vlans-trunks
    label: VLANs and trunks
  - id: etherchannel
    label: EtherChannel
  - id: spanning-tree
    label: Spanning tree
  - id: neighbors
    label: CDP and LLDP
  - id: routing
    label: IPv4 and IPv6 routing
  - id: ospf
    label: OSPF neighbors
  - id: dhcp-fhrp
    label: DHCP and first-hop redundancy
  - id: acl-nat
    label: ACLs and NAT
  - id: logs-path
    label: Logs, ping, and path tests
  - id: sequence
    label: A practical sequence
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 commands
  - Cisco IOS show commands
  - CCNA troubleshooting commands
  - show interfaces trunk
  - show ip route
  - show ip ospf neighbor
  - Cisco IOS verification
relatedLinks:
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Follow the five-domain v2.0 scope with practical configuration, verification, and troubleshooting guidance.
  - title: "Domain 1: Network Infrastructure and Connectivity"
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
    description: Apply interface, addressing, wireless, endpoint, and DHCP troubleshooting in the first v2.0 domain.
  - title: CCNA 200-301 Overview
    url: /ccna/
    description: Review the v1.1 to v2.0 transition and the five published v2.0 exam domains.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Review prefixes, subnet boundaries, masks, usable ranges, and address roles.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check subnet calculations while practicing them manually.
  - title: VLANs, Trunks, STP, and LACP
    url: /network-plus/quick-review/vlans-trunks-stp-lacp/
    description: Refresh the Layer 2 concepts behind the Cisco verification commands.
  - title: Network Troubleshooting Tools
    url: /network-plus/quick-review/troubleshooting-tools/
    description: Match host, path, packet, cable, and wireless tools to the evidence you need.
---
CCNA command output is easier to interpret when each command is tied to a job. Memorizing a long list of `show` commands is less useful than knowing which one exposes the state you need to verify.

A good habit is simple: **observe first, narrow the problem, then change configuration**. Cisco's published CCNA v2.0 blueprint repeatedly asks candidates to configure, troubleshoot, diagnose, interpret, validate, and use operational evidence, so being able to read state is as important as remembering syntax.

<div class="article-callout">
  <p><strong>Platform note:</strong> Cisco IOS and IOS XE syntax and output can vary by device family and software release. Use context-sensitive help (<code>?</code>) and the documentation for the platform you are working on when a command differs from an example.</p>
</div>

<h2 id="workflow">Troubleshooting workflow: ask one question at a time</h2>

When traffic fails, start at the lowest layer that could explain the symptom and move upward only when the evidence supports it.

1. **Is the interface physically and logically up?**
2. **Is the port in the expected VLAN or trunk state?**
3. **Is the local IP addressing correct?**
4. **Does the routing table contain the expected path?**
5. **Are protocol neighbors established?**
6. **Are ACLs, NAT, or another policy changing the traffic?**
7. **What do logs and path tests reveal?**

This prevents a common troubleshooting mistake: changing routing because a host cannot communicate when the real problem is an access port in the wrong VLAN.

<h2 id="command-map">Command map: what are you trying to learn?</h2>

<div class="table-scroll" role="region" aria-label="CCNA command map" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Question</th><th scope="col">Useful command</th><th scope="col">What to inspect</th></tr></thead>
  <tbody>
    <tr><td data-label="Question">Is an IPv4 interface up and addressed?</td><td data-label="Useful command"><code>show ip interface brief</code></td><td data-label="What to inspect">Interface, IPv4 address, status, line protocol</td></tr>
    <tr><td data-label="Question">Is an IPv6 interface up and addressed?</td><td data-label="Useful command"><code>show ipv6 interface brief</code></td><td data-label="What to inspect">Interface state, link-local address, global addresses</td></tr>
    <tr><td data-label="Question">Are counters or errors pointing to a link problem?</td><td data-label="Useful command"><code>show interfaces</code></td><td data-label="What to inspect">Line state, speed, duplex, errors, drops, counters</td></tr>
    <tr><td data-label="Question">How is a switchport operating?</td><td data-label="Useful command"><code>show interfaces switchport</code></td><td data-label="What to inspect">Administrative and operational mode, access VLAN, trunk details</td></tr>
    <tr><td data-label="Question">Does the VLAN exist and which access ports belong to it?</td><td data-label="Useful command"><code>show vlan brief</code></td><td data-label="What to inspect">VLAN ID, name, status, listed ports</td></tr>
    <tr><td data-label="Question">Which links are trunks and which VLANs can cross them?</td><td data-label="Useful command"><code>show interfaces trunk</code></td><td data-label="What to inspect">Trunk state, native VLAN, allowed and forwarding VLANs</td></tr>
    <tr><td data-label="Question">Did an EtherChannel form correctly?</td><td data-label="Useful command"><code>show etherchannel summary</code></td><td data-label="What to inspect">Port-channel state, protocol, member flags</td></tr>
    <tr><td data-label="Question">Which switch is root and what are the port roles?</td><td data-label="Useful command"><code>show spanning-tree</code></td><td data-label="What to inspect">Root bridge, root port, designated or alternate roles, forwarding state</td></tr>
    <tr><td data-label="Question">What Cisco device is directly connected?</td><td data-label="Useful command"><code>show cdp neighbors</code></td><td data-label="What to inspect">Device ID, local interface, platform, remote port</td></tr>
    <tr><td data-label="Question">What multivendor neighbor is directly connected?</td><td data-label="Useful command"><code>show lldp neighbors</code></td><td data-label="What to inspect">Device ID, local port, capabilities, remote port</td></tr>
    <tr><td data-label="Question">What IPv4 route will be used?</td><td data-label="Useful command"><code>show ip route</code></td><td data-label="What to inspect">Prefix, source, administrative distance, metric, next hop, exit interface</td></tr>
    <tr><td data-label="Question">What IPv6 route will be used?</td><td data-label="Useful command"><code>show ipv6 route</code></td><td data-label="What to inspect">Prefix, route source, next hop, exit interface</td></tr>
    <tr><td data-label="Question">Did an OSPFv2 adjacency form?</td><td data-label="Useful command"><code>show ip ospf neighbor</code></td><td data-label="What to inspect">Neighbor ID, state, dead time, address, interface</td></tr>
    <tr><td data-label="Question">Did an OSPFv3 adjacency form?</td><td data-label="Useful command"><code>show ospfv3 neighbor</code></td><td data-label="What to inspect">Neighbor ID, state, interface, process or address-family context</td></tr>
    <tr><td data-label="Question">Does the DHCP server have usable addresses?</td><td data-label="Useful command"><code>show ip dhcp pool</code></td><td data-label="What to inspect">Pool range, utilization, leased and excluded addresses</td></tr>
    <tr><td data-label="Question">Which DHCP leases exist?</td><td data-label="Useful command"><code>show ip dhcp binding</code></td><td data-label="What to inspect">Assigned address, client identifier or hardware address, lease information</td></tr>
    <tr><td data-label="Question">Which HSRP router is active?</td><td data-label="Useful command"><code>show standby brief</code></td><td data-label="What to inspect">Group, priority, state, active and standby peers, virtual IP</td></tr>
    <tr><td data-label="Question">Which VRRP router is master?</td><td data-label="Useful command"><code>show vrrp brief</code></td><td data-label="What to inspect">Group, priority, state, master, virtual address</td></tr>
    <tr><td data-label="Question">What IP ACL entries exist?</td><td data-label="Useful command"><code>show ip access-lists</code></td><td data-label="What to inspect">Sequence, permit or deny, match criteria, counters when available</td></tr>
    <tr><td data-label="Question">Is NAT translating traffic?</td><td data-label="Useful command"><code>show ip nat translations</code></td><td data-label="What to inspect">Inside local/global and outside local/global mappings</td></tr>
    <tr><td data-label="Question">What is the current NAT state?</td><td data-label="Useful command"><code>show ip nat statistics</code></td><td data-label="What to inspect">Translation counts, interfaces, pool or mapping information</td></tr>
    <tr><td data-label="Question">What did the device report?</td><td data-label="Useful command"><code>show logging</code></td><td data-label="What to inspect">Recent messages, severity, timestamps, interface or protocol events</td></tr>
  </tbody>
</table>
</div>

<h2 id="interfaces">Interfaces and addressing: prove the local link first</h2>

`show ip interface brief` is a fast IPv4 starting point. It summarizes interface addressing and separates interface **status** from **line protocol** state.

Those two columns matter. An interface can be administratively down, physically down, or physically up while the line protocol is down. Do not treat all three as the same failure.

For IPv6, `show ipv6 interface brief` provides a compact view of IPv6-enabled interfaces and their addresses.

Use `show interfaces` when the brief view is not enough. It can expose details such as:

- Physical and line-protocol state
- Speed and duplex
- Input and output errors
- Drops and queue behavior
- Traffic counters

An interface that is `up/up` is only the beginning. It proves the link has reached a useful operational state, not that the VLAN, IP address, route, or policy is correct.

On a Layer 2 switchport, `show interfaces switchport` helps answer a different question: **how is this port operating as a switchport?** Check the operational mode, access VLAN, trunking state, and related switchport characteristics instead of assuming the configuration intent matches the live state.

<h2 id="vlans-trunks">VLANs and trunks: separate membership from transport</h2>

Use `show vlan brief` to confirm that a VLAN exists and to see the access ports associated with VLANs in the brief table.

Use `show interfaces trunk` for trunk questions. A useful read order is:

1. Is the interface actually trunking?
2. What is the native VLAN?
3. Which VLANs are allowed?
4. Which allowed VLANs are active and forwarding?

That sequence matters because a VLAN can exist locally and still fail to cross a trunk. If VLAN 30 works on one switch but not across the uplink, checking the VLAN database alone is incomplete.

`show interfaces switchport` is useful when one specific port is suspicious. It helps distinguish configured mode from operational mode and can expose the VLAN information tied to that port.

<div class="article-callout">
  <p><strong>Symptom clue:</strong> If several VLANs cross a trunk successfully and only one VLAN fails, investigate that VLAN's existence, allowed list, and spanning-tree state before blaming the physical link.</p>
</div>

<h2 id="etherchannel">EtherChannel: check the bundle and the members</h2>

`show etherchannel summary` gives a compact view of port channels, negotiation protocol, and member-port state.

Read the legend before interpreting the flags. The goal is to determine whether the logical port channel is usable and whether the expected physical interfaces are actually bundled.

If one member is suspended or acting as a stand-alone link, compare the member configurations. Common causes include mismatched Layer 2 mode, VLAN or trunk settings, channel-group settings, speed, or other parameters that prevent the interfaces from joining the same logical bundle.

Do not stop after confirming that the physical members are up. EtherChannel troubleshooting is about whether they formed **one logical link** as intended.

<h2 id="spanning-tree">Spanning tree: root, role, and state</h2>

`show spanning-tree` helps answer three exam-level questions:

- Which switch is the root bridge for the VLAN or instance?
- Which local port is the best path toward the root?
- Which redundant ports are forwarding or intentionally not forwarding?

A non-forwarding redundant port is not automatically broken. It may be doing exactly what spanning tree requires to prevent a Layer 2 loop.

For Rapid PVST+ troubleshooting, connect the output to the topology. If the wrong switch became root, traffic may take an inefficient path. If an access port is unexpectedly participating in topology changes, examine whether edge-port features and protections match the design.

The important skill is not merely recognizing `show spanning-tree`. It is reading the output against the expected topology.

<h2 id="neighbors">CDP and LLDP: verify what is actually connected</h2>

`show cdp neighbors` discovers directly connected Cisco devices when Cisco Discovery Protocol (CDP) is enabled. It can quickly reveal:

- The neighboring device
- Your local interface
- The neighbor's platform or capabilities
- The remote port

`show lldp neighbors` serves a similar purpose with Link Layer Discovery Protocol (LLDP), which is useful in multivendor environments.

These commands are excellent for catching a topology assumption that is simply wrong. If a cable was moved, documentation is stale, or you are looking at the wrong switchport, neighbor discovery can save a long detour through higher-layer troubleshooting.

Use the detailed form when you need more neighbor information, such as management addressing or additional advertised attributes:

```text
show cdp neighbors detail
show lldp neighbors detail
```

<h2 id="routing">IPv4 and IPv6 routing: follow the most specific path</h2>

`show ip route` displays the IPv4 routing table. For a destination problem, do not just scan for a familiar network. Identify the route that actually wins for the destination address.

Check:

- Prefix and mask
- Route source
- Administrative distance and metric when shown
- Next hop
- Exit interface
- Default route when no more-specific route exists

`show ipv6 route` performs the same core job for the IPv6 routing table.

For both IPv4 and IPv6, remember that forwarding follows the **longest matching prefix**. A default route can exist and still lose to a more-specific route. Likewise, the presence of a route does not prove the next hop is reachable or the return path is correct.

When a static route is suspected, compare the configured next hop or exit interface with the live topology. When dynamic routing is involved, verify the neighbor relationship as well as the learned route.

<h2 id="ospf">OSPF neighbors: adjacency before learned routes</h2>

For OSPFv2, `show ip ospf neighbor` shows neighbor information such as the neighbor ID, state, dead time, address, and interface.

A healthy adjacency often reaches `FULL`, but the expected state depends on the network type and the relationship being examined. For example, broadcast networks use designated router (DR) and backup designated router (BDR) behavior, so the state text carries topology information as well as health information.

If the expected neighbor is missing entirely, investigate the local interface and basic OSPF compatibility before troubleshooting route selection. If the neighbor is stuck in an intermediate state, the state itself becomes evidence.

For OSPFv3 on current IOS XE, `show ospfv3 neighbor` is a useful verification command. Some Cisco IOS material and older syntax also use `show ipv6 ospf neighbor`. Know that both forms exist so a syntax difference does not become a conceptual problem.

Useful questions include:

- Is the expected neighbor present?
- What state is the adjacency in?
- Which interface formed the adjacency?
- Does that interface belong to the expected area or process?
- If the adjacency is healthy, did the expected route enter the routing table?

<h2 id="dhcp-fhrp">DHCP and first-hop redundancy: verify service state</h2>

For an IOS DHCP server, `show ip dhcp pool` tells you whether the configured pool has addresses available and how the pool is being used. `show ip dhcp binding` shows addresses that have already been leased. If clients are failing to obtain addresses, these two views help distinguish pool exhaustion or missing bindings from a problem elsewhere in the DHCP exchange.

`show ip dhcp conflict` is also useful when IOS has detected addresses that should not be handed out. For relay problems, combine DHCP state with interface addressing, routing, and the relay configuration rather than assuming the server is the only possible fault.

The v2.0 blueprint also expects you to interpret First Hop Redundancy Protocol (FHRP) status. For Hot Standby Router Protocol (HSRP), `show standby brief` summarizes the group, priority, state, active router, standby router, and virtual IP. For Virtual Router Redundancy Protocol (VRRP), `show vrrp brief` provides the corresponding operational view.

When the wrong device owns the virtual gateway role, compare priority and preemption behavior with the intended design. When neither peer appears healthy, verify the participating interfaces and Layer 3 reachability before treating the redundancy protocol itself as the root cause.

<h2 id="acl-nat">ACLs and NAT: inspect policy after connectivity</h2>

An Access Control List (ACL) can make a healthy path look broken. `show ip access-lists` displays current IP ACL entries so you can inspect sequence, matching criteria, and permit or deny logic.

Remember that ACL order matters. The first matching entry determines the result, and an implicit deny follows the configured entries. Also verify where the ACL is applied and in which direction. A correct ACL attached to the wrong interface or direction still produces the wrong behavior.

For Network Address Translation (NAT) and Port Address Translation (PAT):

- `show ip nat translations` displays active translation mappings.
- `show ip nat statistics` displays NAT state and statistics.

When troubleshooting, compare the inside local address with the inside global address and make sure the observed translation matches the traffic you are testing. If no expected translation appears, the problem may be traffic matching, interface roles, the NAT rule, or a path problem that prevents traffic from reaching the translation point.

<h2 id="logs-path">Logs, ping, traceroute, and packet evidence</h2>

`show logging` exposes system logging status and buffered messages. Logs can reveal interface transitions, protocol events, configuration changes, security actions, and other clues that are easy to miss in a static configuration.

Do not read logs as isolated error strings. Match the timestamp and event to what the user or network was doing.

Use `ping` to test reachability, but interpret the result carefully. A failed ping does not identify the failing layer by itself. A successful ping to one target can still help narrow the fault domain.

Cisco IOS also supports extended ping options that let you control parameters such as the source. That is valuable when a router has several interfaces and you need to test from the same source address that production traffic should use.

Use `traceroute` when the path matters. It can show how far traffic travels before replies stop, but missing responses do not always prove that the forwarding path itself failed because intermediate devices may filter or deprioritize the control messages used by the test.

The v2.0 blueprint also calls for interpreting packet-capture output. A capture can answer questions that device state alone cannot, such as whether ARP, Neighbor Discovery, DHCP, DNS, TCP handshakes, or other exchanges are actually occurring on the wire.

<h2 id="sequence">A practical verification sequence</h2>

Suppose a user in VLAN 20 cannot reach a server in another subnet. A disciplined sequence could look like this:

1. Check the user's switchport state and VLAN with `show interfaces switchport` and `show vlan brief`.
2. If traffic must cross a trunk, verify VLAN 20 with `show interfaces trunk`.
3. Check the gateway interface or switch virtual interface state with the appropriate interface command.
4. Confirm the destination route with `show ip route` or `show ipv6 route`.
5. If OSPF should provide the route, verify the neighbor before assuming a routing-table problem.
6. Inspect ACLs if the route and interfaces are correct.
7. Inspect NAT only if the traffic path actually crosses a translation boundary.
8. Use ping, traceroute, logs, or packet evidence to narrow what remains.

Notice what is missing: random configuration changes. Each step should either confirm the current theory or tell you where to look next.

<div class="article-callout">
  <p><strong>Memory rule:</strong> interface, Layer 2, address, route, neighbor, policy, path. You do not have to use every step every time, but the order keeps troubleshooting grounded in evidence.</p>
</div>

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco IOS XE VLAN configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html)
- [Cisco IOS interface and switchport command reference](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9500/software/release/17-5/command_reference/b_175_9500_cr/interface_and_hardware_commands.html)
- [Cisco EtherChannel configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/etherchannel/etherchannel-configuration-guide/etherchannels.html)
- [Cisco spanning-tree configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/stp/stp-configuration-guide/m-stp.html)
- [Cisco CDP configuration and verification guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/cdp-lldp-mac-udld/cdp-lldp-mac-udld-configuration-guide/c-configure-cdp.html)
- [Cisco LLDP configuration and verification guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/cdp-lldp-mac-udld/cdp-lldp-mac-udld-configuration-guide/c-configure-lldp.html)
- [Cisco IPv4 routing command reference](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/iproute_pi/command/Cisco_IOS_IP_Routing_Protocol-Independent_Command_Reference/IP_Routing_Protocol-Independent_Commands_S_through_T.html)
- [Cisco IPv6 addressing and basic connectivity guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_ip6-add-basic-conn-xe.html)
- [Cisco OSPFv2 neighbor output reference](https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/13688-16.html)
- [Cisco IOS XE OSPFv3 configuration guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-routing/b-ip-routing/m_ip6-route-ospfv3-xe.html)
- [Cisco IOS XE ACL configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/security/acls/acls-configuration-guide/access-control-lists.html)
- [Cisco IOS XE DHCP server configuration and verification](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_config-dhcp-server-xe.html)
- [Cisco IOS XE HSRP configuration and verification](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-hsrp-0.html)
- [Cisco IOS XE VRRP configuration and verification](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ntw-servs/b-network-services/m_fhp-vrrp-0.html)
- [Cisco IOS XE NAT monitoring guide](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_nat/configuration/xe-2/nat-xe-2-book/iadnat-monmain.html)
- [Cisco IOS XE system logging guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/syst-mgmt/b-system-management/m_esm-syslog.html)
