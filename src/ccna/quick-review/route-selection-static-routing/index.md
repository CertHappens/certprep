---
layout: layouts/article.njk
title: Route Selection and Static Routing Quick Reference for CCNA 200-301 v2.0
description: Review longest-prefix match, administrative distance, metrics, routing-table fields, IPv4 and IPv6 static routes, floating routes, and Cisco IOS verification.
permalink: /ccna/quick-review/route-selection-static-routing/
ogType: article
printable: true
printTitle: Route Selection and Static Routing Quick Reference for CCNA 200-301 v2.0
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CCNA 200-301 v2.0 Quick Review
eyebrow: CCNA quick review
lede: Separate route installation from packet forwarding, then verify the next hop and return path before changing configuration.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: Quick Review
    url: /ccna/quick-review/
  - label: Route Selection
    url: /ccna/quick-review/route-selection-static-routing/
toc:
  - id: three-decisions
    label: Three routing decisions
  - id: route-fields
    label: Routing-table fields
  - id: selection-order
    label: Selection order
  - id: static-types
    label: Static route types
  - id: forwarding-options
    label: Forwarding options
  - id: ipv6-static
    label: IPv6 static routes
  - id: missing-routes
    label: Missing routes
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
  - CCNA route selection
  - longest prefix match
  - administrative distance
  - static route
  - floating static route
  - IPv6 static route
relatedLinks:
  - title: CCNA Quick Review Guides
    url: /ccna/quick-review/
    description: Browse all focused CCNA comparisons and return to the quick-review hub.
  - title: "Domain 3: IP Routing"
    url: /ccna/200-301-v2/study-guide/ip-routing/
    description: Continue with OSPFv2, OSPFv3, HSRP, VRRP, and complete routing scenarios.
  - title: IPv6 Addressing and Neighbor Discovery Quick Reference
    url: /ccna/quick-review/ipv6-addressing-neighbor-discovery/
    description: Review IPv6 prefixes, link-local addresses, and Neighbor Discovery before troubleshooting IPv6 routes.
  - title: Cisco IOS Verification Commands
    url: /ccna/commands/
    description: Choose routing, interface, path-testing, and neighbor commands by the state you need to verify.
  - title: Take a randomized CCNA practice test
    url: /ccna/200-301-v2/practice-test/
    description: Apply these distinctions in a fresh 10, 20, 30, or 50-question session.
---

Routing questions become easier when you separate three decisions that happen at different times.

<h2 id="three-decisions">Keep route learning, installation, and forwarding separate</h2>

1. A route source selects its preferred path using its own rules and metric.
2. The router decides which competing route source to install for the same destination prefix.
3. The forwarding process chooses the longest matching installed prefix for the packet's destination.

Administrative distance and metrics help decide what enters the routing table. Longest-prefix match decides which installed route forwards one packet.

<h2 id="route-fields">Read each routing-table field as evidence</h2>

```text
R1# show ip route
O    10.40.0.0/16 [110/20] via 192.0.2.6, GigabitEthernet0/0
S    10.40.8.0/24 [1/0] via 198.51.100.2
S*   0.0.0.0/0 [1/0] via 192.0.2.2
```

<div class="table-scroll" role="region" aria-label="Cisco routing table fields" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Field</th><th scope="col">What it tells you</th></tr></thead>
  <tbody>
    <tr><td data-label="Field">Route code</td><td data-label="What it tells you">Where the route came from, such as connected, static, or OSPF.</td></tr>
    <tr><td data-label="Field">Prefix and mask</td><td data-label="What it tells you">Which destination addresses the route can match.</td></tr>
    <tr><td data-label="Field">Administrative distance</td><td data-label="What it tells you">Which route source is preferred for the same destination prefix.</td></tr>
    <tr><td data-label="Field">Metric</td><td data-label="What it tells you">Which path one routing protocol prefers among its candidates.</td></tr>
    <tr><td data-label="Field">Next hop</td><td data-label="What it tells you">Which neighboring address receives the packet next.</td></tr>
    <tr><td data-label="Field">Exit interface</td><td data-label="What it tells you">Which local interface sends the packet.</td></tr>
    <tr><td data-label="Field"><code>*</code></td><td data-label="What it tells you">A candidate default route in common IOS output.</td></tr>
  </tbody>
</table>
</div>

<h2 id="selection-order">Use the correct route-selection order</h2>

For forwarding one packet:

1. Identify the exact destination address.
2. Find installed routes whose prefixes contain that address.
3. Choose the longest matching prefix.
4. Read the next hop or exit interface.
5. Confirm the next hop can be resolved and reached.
6. Confirm the destination has a return path.

For routes competing to enter the table for the same prefix:

1. A routing protocol uses its metric to choose its own best path.
2. If different route sources offer the same prefix, the lower administrative distance is preferred.
3. Equal-cost paths from the selected source may be installed when the platform and protocol allow it.

A `/24` route can forward a packet instead of a `/16` route even when the `/16` came from a source with a lower administrative distance. The prefixes are different, so both may be installed. Longest-prefix match then chooses the `/24` for destinations inside it.

<h2 id="static-types">Recognize the purpose of each static route</h2>

<div class="table-scroll" role="region" aria-label="Static route type comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Type</th><th scope="col">IPv4 example</th><th scope="col">Purpose</th></tr></thead>
  <tbody>
    <tr><td data-label="Type">Network route</td><td data-label="IPv4 example"><code>10.30.0.0/24</code></td><td data-label="Purpose">Matches a range of destination addresses.</td></tr>
    <tr><td data-label="Type">Host route</td><td data-label="IPv4 example"><code>10.30.0.25/32</code></td><td data-label="Purpose">Matches one destination address.</td></tr>
    <tr><td data-label="Type">Default route</td><td data-label="IPv4 example"><code>0.0.0.0/0</code></td><td data-label="Purpose">Matches when no more-specific route is available.</td></tr>
    <tr><td data-label="Type">Floating static</td><td data-label="IPv4 example">Static route with a higher AD</td><td data-label="Purpose">Waits as a backup while a preferred route remains installed.</td></tr>
  </tbody>
</table>
</div>

```text
ip route 10.30.0.0 255.255.255.0 192.0.2.2
ip route 10.30.0.25 255.255.255.255 192.0.2.2
ip route 0.0.0.0 0.0.0.0 192.0.2.2
ip route 10.30.0.0 255.255.255.0 198.51.100.2 200
```

The last route uses administrative distance 200, so it can remain out of the table while a lower-AD route to the same prefix is healthy.

<h2 id="forwarding-options">Next hop, exit interface, and fully specified routes</h2>

A static route may name:

- A **next-hop address**, which the router resolves through another route.
- An **exit interface**, which tells the router where to send traffic.
- Both, creating a **fully specified route**.

On point-to-point links, an exit-interface route is often clear because only one neighbor exists. On multi-access Ethernet, a next hop or fully specified route gives clearer neighbor-resolution behavior.

The best syntax depends on the interface type and design. The exam clue is usually whether the router can resolve a usable forwarding path.

<h2 id="ipv6-static">Apply the same logic to IPv6 static routes</h2>

```text
ipv6 route 2001:db8:30::/64 2001:db8:12::2
ipv6 route 2001:db8:30::25/128 2001:db8:12::2
ipv6 route ::/0 2001:db8:12::2
```

A link-local next hop needs the outgoing interface because link-local addresses have meaning only on one link:

```text
ipv6 route 2001:db8:30::/64 GigabitEthernet0/0/1 FE80::2
```

<h2 id="missing-routes">A configured route is not automatically usable</h2>

If a static route appears in the running configuration but not in the routing table, check:

- Is the exit interface up?
- Can the next-hop address be reached through an installed route?
- Is the destination prefix and mask correct?
- Is a tracking condition preventing installation?
- Is this a floating route whose preferred route is still present?
- For an IPv6 link-local next hop, was the outgoing interface included?

If the route is installed but traffic still fails, check neighbor resolution, access controls, downstream routing, and the return path.

<h2 id="commands">Choose IOS evidence that answers the next question</h2>

<div class="table-scroll" role="region" aria-label="Cisco IOS routing command comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Question</th><th scope="col">Useful command</th></tr></thead>
  <tbody>
    <tr><td data-label="Question">Which routes are installed?</td><td data-label="Useful command"><code>show ip route</code> or <code>show ipv6 route</code></td></tr>
    <tr><td data-label="Question">Which route matches one destination?</td><td data-label="Useful command"><code>show ip route address</code> or <code>show ipv6 route address</code></td></tr>
    <tr><td data-label="Question">Which static routes are configured?</td><td data-label="Useful command"><code>show running-config | include ^ip route</code></td></tr>
    <tr><td data-label="Question">Is the exit interface usable?</td><td data-label="Useful command"><code>show ip interface brief</code> or <code>show ipv6 interface brief</code></td></tr>
    <tr><td data-label="Question">Can the router reach the next hop?</td><td data-label="Useful command"><code>ping</code>, extended ping, ARP, or IPv6 neighbor output</td></tr>
    <tr><td data-label="Question">Where does routed forwarding stop?</td><td data-label="Useful command"><code>traceroute</code></td></tr>
  </tbody>
</table>
</div>

<h2 id="scenarios">Scenario comparisons</h2>

### A `/24` static route and `/16` OSPF route both match

Use the `/24` for a destination inside that prefix. Longest-prefix match is more specific than the `/16`.

### A floating route is configured but absent from the table

Check whether the preferred route still exists. A healthy primary route is a valid reason for the floating route to remain inactive.

### The outbound path works but replies never return

Check the destination's route back to the source, stateful firewall behavior, and address translation where present. Routing is a round-trip problem.

### A route names a next hop that is not reachable

The configuration line alone is not enough. Add or repair the route that resolves the next hop, or correct the intended forwarding path.

<h2 id="exam-traps">Common exam traps</h2>

- Treating administrative distance as longest-prefix match.
- Comparing metrics from unrelated routing protocols.
- Assuming the smallest number anywhere in the table always wins.
- Assuming a configured static route must be installed.
- Replacing a floating route because it is correctly inactive.
- Forgetting the return path.
- Using a link-local IPv6 next hop without interface context.
- Reading a successful ping as proof that the complete design is correct.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of route selection" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Decision</th><th scope="col">Rule</th></tr></thead>
  <tbody>
    <tr><td data-label="Decision">Forward one packet</td><td data-label="Rule">Use the longest matching installed prefix.</td></tr>
    <tr><td data-label="Decision">Choose between route sources for the same prefix</td><td data-label="Rule">Prefer the lower administrative distance.</td></tr>
    <tr><td data-label="Decision">Choose among paths from one routing protocol</td><td data-label="Rule">Use that protocol's metric.</td></tr>
    <tr><td data-label="Decision">Match one IPv4 host</td><td data-label="Rule">Use a `/32` host route.</td></tr>
    <tr><td data-label="Decision">Match one IPv6 host</td><td data-label="Rule">Use a `/128` host route.</td></tr>
    <tr><td data-label="Decision">Provide a backup route</td><td data-label="Rule">Use a floating static route with a higher AD.</td></tr>
    <tr><td data-label="Decision">Use an IPv6 link-local next hop</td><td data-label="Rule">Include the outgoing interface.</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [Cisco CCNA 200-301 v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco: Understand Administrative Distance](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/15986-admin-distance.html)
- [Cisco: Configure Route Selection for Routers](https://www.cisco.com/c/en/us/support/docs/ip/enhanced-interior-gateway-routing-protocol-eigrp/8651-21.html)
- [Cisco: Configure a Next Hop IP Address for Static Routes](https://www.cisco.com/c/en/us/support/docs/dial-access/floating-static-route/118263-technote-nexthop-00.html)
