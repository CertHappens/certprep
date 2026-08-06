---
layout: layouts/article.njk
title: IPv6 Addressing and Neighbor Discovery Quick Reference for CCNA 200-301 v2.0
description: Review IPv6 address scopes, prefix sizing, compression, modified EUI-64, Neighbor Discovery, SLAAC, router advertisements, and Cisco IOS verification.
permalink: /ccna/quick-review/ipv6-addressing-neighbor-discovery/
ogType: article
printable: true
printTitle: IPv6 Addressing and Neighbor Discovery Quick Reference for CCNA 200-301 v2.0
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-06
articleSection: CCNA 200-301 v2.0 Quick Review
eyebrow: CCNA quick review
lede: Identify what the IPv6 address can do, confirm the prefix and interface state, then use Neighbor Discovery evidence before changing configuration.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: Quick Review
    url: /ccna/quick-review/
  - label: IPv6 Addressing
    url: /ccna/quick-review/ipv6-addressing-neighbor-discovery/
toc:
  - id: decision-order
    label: Decision order
  - id: address-types
    label: Address types
  - id: prefixes
    label: Prefixes and compression
  - id: eui-64
    label: Modified EUI-64
  - id: neighbor-discovery
    label: Neighbor Discovery
  - id: assignment
    label: Address assignment
  - id: routing
    label: Routing and next hops
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
  - CCNA IPv6
  - IPv6 link-local address
  - Neighbor Discovery Protocol
  - modified EUI-64
  - SLAAC
  - IPv6 static route
relatedLinks:
  - title: CCNA Quick Review Guides
    url: /ccna/quick-review/
    description: Browse all focused CCNA comparisons and return to the quick-review hub.
  - title: "Domain 1: Network Infrastructure and Connectivity"
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
    description: Continue with interface, cabling, IPv4, IPv6, wireless, client, and DHCPv4 troubleshooting.
  - title: Route Selection and Static Routing Quick Reference
    url: /ccna/quick-review/route-selection-static-routing/
    description: Apply IPv6 prefixes and link-local next hops to routing-table and static-route decisions.
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Look up IPv6 and Cisco networking terms with plain-language explanations.
  - title: IPv6 Addressing and Prefix Reference
    url: /ipv6-addressing/
    description: Review address structure, compression, common ranges, /64 planning, and assignment methods.
  - title: IPv6 Address and Prefix Calculator
    url: /tools/ipv6-calculator/
    description: Expand, compress, classify, and calculate IPv6 prefixes and child-prefix boundaries.
  - title: Take a randomized CCNA practice test
    url: /ccna/200-301-v2/practice-test/
    description: Apply these distinctions in a fresh 10, 20, 30, or 50-question session.
---

IPv6 troubleshooting becomes easier when you separate four questions:

1. What kind of address is this?
2. Which prefix identifies the local network?
3. How was the interface identifier created?
4. Can the device discover its neighbor and a usable path?

<h2 id="decision-order">Use a short IPv6 decision order</h2>

Start with live state rather than rebuilding the address from memory.

1. Confirm the interface is up.
2. Confirm the expected global or unique-local address and prefix are present.
3. Confirm a link-local address exists.
4. Check the default gateway or route.
5. Check Neighbor Discovery state.
6. Test the local link before testing a remote destination.
7. Check the return path.

Useful starting commands are:

```text
show ipv6 interface brief
show ipv6 interface GigabitEthernet0/0/0
show ipv6 neighbors
show ipv6 route
```

<h2 id="address-types">Match the address type to its job</h2>

<div class="table-scroll" role="region" aria-label="IPv6 address type comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Type</th><th scope="col">Common value</th><th scope="col">What it does</th></tr></thead>
  <tbody>
    <tr><td data-label="Type">Global unicast</td><td data-label="Common value"><code>2000::/3</code></td><td data-label="What it does">Identifies one interface with an address intended for global routing.</td></tr>
    <tr><td data-label="Type">Link-local</td><td data-label="Common value"><code>FE80::/10</code></td><td data-label="What it does">Works only on the local link. Routers do not forward it to another network.</td></tr>
    <tr><td data-label="Type">Unique local</td><td data-label="Common value"><code>FC00::/7</code></td><td data-label="What it does">Provides internal addressing that is not intended for ordinary internet routing.</td></tr>
    <tr><td data-label="Type">Loopback</td><td data-label="Common value"><code>::1/128</code></td><td data-label="What it does">Refers to the local host.</td></tr>
    <tr><td data-label="Type">Unspecified</td><td data-label="Common value"><code>::/128</code></td><td data-label="What it does">Means no address has been selected yet. It is not assigned as a normal interface address.</td></tr>
    <tr><td data-label="Type">Multicast</td><td data-label="Common value"><code>FF00::/8</code></td><td data-label="What it does">Sends traffic to a group of interested interfaces. IPv6 does not use broadcast.</td></tr>
  </tbody>
</table>
</div>

Every IPv6-enabled interface normally has a link-local address. That address supports local neighbor communication and can be used as a routing next hop when the outgoing interface is also clear.

<h2 id="prefixes">Read prefixes and compress addresses carefully</h2>

A LAN commonly uses a `/64` prefix. The first 64 bits identify the subnet, and the last 64 bits identify the interface within that subnet.

Do not apply IPv4 host-count habits to ordinary IPv6 LANs. IPv6 subnet design usually emphasizes a clear address hierarchy rather than saving individual addresses.

To shorten an IPv6 address:

- Remove leading zeros inside a hexadecimal group.
- Replace one continuous run of all-zero groups with `::`.
- Use `::` only once.

```text
2001:0db8:0010:0020:0000:0000:0000:0042
2001:db8:10:20::42
```

To expand the shortened address, restore eight groups and four hexadecimal digits per group.

<h2 id="eui-64">Recognize modified EUI-64</h2>

Modified Extended Unique Identifier 64-bit (EUI-64) can build a 64-bit interface identifier from a 48-bit MAC address.

For MAC address `00:1A:2B:3C:4D:5E`:

1. Split the MAC into two halves.
2. Insert `FF:FE` between them.
3. Flip the universal/local bit in the first byte. `00` becomes `02`.
4. Combine the result with the `/64` prefix.

```text
00:1A:2B:FF:FE:3C:4D:5E
021A:2BFF:FE3C:4D5E
```

With prefix `2001:db8:10:20::/64`, the full address becomes:

```text
2001:db8:10:20:21a:2bff:fe3c:4d5e
```

Cisco IOS XE can create the interface identifier with:

```text
interface GigabitEthernet0/0/0
 ipv6 address 2001:db8:10:20::/64 eui-64
```

Modern endpoints may use privacy-oriented or randomly generated interface identifiers. The exam still expects you to recognize the modified EUI-64 process.

<h2 id="neighbor-discovery">Neighbor Discovery replaces several IPv4 local-link functions</h2>

Neighbor Discovery Protocol (NDP) uses Internet Control Message Protocol version 6 (ICMPv6). It helps devices find local neighbors, learn routers, resolve Layer 3 addresses to Layer 2 addresses, and detect certain reachability problems.

<div class="table-scroll" role="region" aria-label="Neighbor Discovery message comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Message</th><th scope="col">Plain-language job</th></tr></thead>
  <tbody>
    <tr><td data-label="Message">Router Solicitation</td><td data-label="Plain-language job">A host asks nearby routers to advertise sooner.</td></tr>
    <tr><td data-label="Message">Router Advertisement</td><td data-label="Plain-language job">A router announces prefixes, gateway information, and address-assignment guidance.</td></tr>
    <tr><td data-label="Message">Neighbor Solicitation</td><td data-label="Plain-language job">A device asks for a neighbor's Layer 2 address or checks reachability.</td></tr>
    <tr><td data-label="Message">Neighbor Advertisement</td><td data-label="Plain-language job">A device answers with neighbor information.</td></tr>
    <tr><td data-label="Message">Redirect</td><td data-label="Plain-language job">A router tells a host about a better first hop on the local link.</td></tr>
  </tbody>
</table>
</div>

If ICMPv6 is blocked too broadly, IPv6 can fail in ways that look unrelated because Neighbor Discovery depends on it.

<h2 id="assignment">Separate SLAAC, DHCPv6, and manual configuration</h2>

**Stateless Address Autoconfiguration (SLAAC)** lets a host build an address from a prefix learned in a Router Advertisement.

**DHCPv6** can provide addresses or other configuration depending on the design and Router Advertisement flags.

**Manual configuration** assigns the address directly on the device.

A client can have a valid link-local address but no usable global address. That usually means the local IPv6 stack is running, while prefix advertisement, address assignment, or policy still needs attention.

<h2 id="routing">Treat link-local next hops as local-link addresses</h2>

A router can use a global address or a link-local address as an IPv6 next hop. When a link-local next hop is used, the outgoing interface must also be specified because the same link-local range exists on every IPv6 link.

```text
ipv6 route 2001:db8:30::/64 GigabitEthernet0/0/1 FE80::2
```

A default route matches destinations that do not have a more-specific route:

```text
ipv6 route ::/0 2001:db8:12::2
```

If the router must forward IPv6 traffic, enable routing globally:

```text
ipv6 unicast-routing
```

<h2 id="commands">Choose IOS evidence that answers one question</h2>

<div class="table-scroll" role="region" aria-label="Cisco IOS IPv6 command comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Question</th><th scope="col">Useful command</th></tr></thead>
  <tbody>
    <tr><td data-label="Question">Which IPv6 addresses are active?</td><td data-label="Useful command"><code>show ipv6 interface brief</code></td></tr>
    <tr><td data-label="Question">What prefix and NDP behavior apply on one interface?</td><td data-label="Useful command"><code>show ipv6 interface</code></td></tr>
    <tr><td data-label="Question">Which local neighbors were discovered?</td><td data-label="Useful command"><code>show ipv6 neighbors</code></td></tr>
    <tr><td data-label="Question">Which IPv6 route matches a destination?</td><td data-label="Useful command"><code>show ipv6 route</code></td></tr>
    <tr><td data-label="Question">Can one source reach one destination?</td><td data-label="Useful command"><code>ping ipv6</code> or extended ping</td></tr>
    <tr><td data-label="Question">Where does routed forwarding stop?</td><td data-label="Useful command"><code>traceroute ipv6</code></td></tr>
  </tbody>
</table>
</div>

<h2 id="scenarios">Scenario comparisons</h2>

### The host has `FE80::` but no global address

The local IPv6 stack is active. Check Router Advertisements, SLAAC or DHCPv6 design, VLAN placement, and filtering before changing the link-local address.

### A static route uses `FE80::2` and does not install

Confirm the outgoing interface is included and is operational. A link-local next hop needs interface context.

### Two addresses look different but represent the same value

Expand both to eight groups before comparing them. Compression changes the notation, not the address.

### Local-link ping works but remote traffic fails

Check IPv6 routing, the default route, forwarding state, and the return path. Local neighbor success does not prove end-to-end routing.

<h2 id="exam-traps">Common exam traps</h2>

- Treating a link-local address as globally routable.
- Expecting IPv6 broadcast instead of multicast.
- Using `::` more than once in one address.
- Applying IPv4 host-count optimization to ordinary IPv6 `/64` LANs.
- Forgetting the outgoing interface with a link-local static-route next hop.
- Assuming a link-local address proves that global address assignment succeeded.
- Blocking ICMPv6 without considering Neighbor Discovery.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of IPv6 decisions" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Clue or need</th><th scope="col">Best interpretation</th></tr></thead>
  <tbody>
    <tr><td data-label="Clue or need"><code>FE80::/10</code></td><td data-label="Best interpretation">Local-link communication only</td></tr>
    <tr><td data-label="Clue or need"><code>2000::/3</code></td><td data-label="Best interpretation">Global unicast address space</td></tr>
    <tr><td data-label="Clue or need">One omitted run of zero groups</td><td data-label="Best interpretation"><code>::</code> compression</td></tr>
    <tr><td data-label="Clue or need"><code>FF:FE</code> inserted into a MAC-derived identifier</td><td data-label="Best interpretation">Modified EUI-64</td></tr>
    <tr><td data-label="Clue or need">Resolve an IPv6 neighbor to a Layer 2 address</td><td data-label="Best interpretation">Neighbor Solicitation and Neighbor Advertisement</td></tr>
    <tr><td data-label="Clue or need">Learn a prefix and default router</td><td data-label="Best interpretation">Router Advertisement</td></tr>
    <tr><td data-label="Clue or need">Use a link-local next hop in a static route</td><td data-label="Best interpretation">Specify the outgoing interface</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [Cisco CCNA 200-301 v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco: Understand the IPv6 Link-Local Address](https://www.cisco.com/c/en/us/support/docs/ip/ip-version-6-ipv6/113328-ipv6-lla.html)
- [IETF RFC 4291: IP Version 6 Addressing Architecture](https://datatracker.ietf.org/doc/html/rfc4291)
- [IETF RFC 4861: Neighbor Discovery for IP version 6](https://datatracker.ietf.org/doc/html/rfc4861)
