---
layout: layouts/article.njk
title: IPv6 Addressing and Prefix Reference
description: Learn how to read, compress, classify, and subnet IPv6 addresses, including prefix lengths, common address types, /64 planning, SLAAC, DHCPv6, and Neighbor Discovery.
permalink: /ipv6-addressing/
ogType: article
printable: true
printTitle: IPv6 Addressing and Prefix Reference
author: certHappens
datePublished: 2026-08-06
dateModified: 2026-08-06
articleSection: Shared Networking Reference
eyebrow: Networking reference
lede: Read an IPv6 address, identify what the prefix controls, and plan smaller prefixes without carrying over IPv4 assumptions about broadcasts and usable-host ranges.
breadcrumbs:
  - label: Home
    url: /
  - label: IPv6 Addressing and Prefix Reference
    url: /ipv6-addressing/
toc:
  - id: address-structure
    label: Address structure
  - id: compression
    label: Compress and expand
  - id: prefixes
    label: Prefix lengths
  - id: address-types
    label: Address types
  - id: subnet-planning
    label: Subnet planning
  - id: address-assignment
    label: Address assignment
  - id: neighbor-discovery
    label: Neighbor Discovery
  - id: common-mistakes
    label: Common mistakes
  - id: worked-examples
    label: Worked examples
  - id: official-references
    label: Official references
keywords:
  - IPv6 addressing
  - IPv6 prefix length
  - IPv6 subnetting
  - IPv6 compression
  - IPv6 address types
  - IPv6 /64
  - SLAAC
  - Neighbor Discovery
relatedLinks:
  - title: IPv6 Address and Prefix Calculator
    url: /tools/ipv6-calculator/
    description: Expand and compress an address, identify its type, find prefix boundaries, and divide a parent prefix into smaller child prefixes.
  - title: CCNA IPv6 Addressing and Neighbor Discovery Quick Review
    url: /ccna/quick-review/ipv6-addressing-neighbor-discovery/
    description: Connect address types, SLAAC, Neighbor Discovery, and Cisco IOS evidence to exam scenarios.
  - title: "CCNA Domain 1: Network Infrastructure and Connectivity"
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
    description: Apply IPv6 addressing to interfaces, modified EUI-64, client connectivity, and troubleshooting.
  - title: "Network+ Domain 1: Networking Concepts"
    url: /network-plus/n10-009/study-guide/networking-concepts/
    description: Place IPv6 beside the OSI model, IPv4, traffic types, devices, and modern network designs.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Compare IPv6 prefix planning with IPv4 network, broadcast, and usable-host calculations.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Calculate IPv4 boundaries, host ranges, masks, wildcard masks, and special-use status.
---
IPv6 addresses look long because they contain 128 bits, four times the size of an IPv4 address. The basic task is still familiar: identify which leading bits describe the routed prefix and which remaining bits identify an interface or another value inside that prefix.

The important difference is that IPv6 is not IPv4 with more digits. IPv6 does not use broadcast addresses, and its first and last values are not automatically reserved as network and broadcast addresses. Avoid carrying IPv4 shortcuts into IPv6 questions.

<div class="article-callout">
  <p><strong>Start with three questions.</strong> What type of address is this? Which bits belong to the prefix? What process assigned or discovered the address?</p>
</div>

<h2 id="address-structure">Read the eight 16-bit groups</h2>

An IPv6 address contains eight groups of four hexadecimal digits when written in full. Each group represents 16 bits.

<pre><code>2001:0db8:1234:0012:0000:0000:0000:0020</code></pre>

Hexadecimal uses the digits <code>0</code> through <code>9</code> and the letters <code>a</code> through <code>f</code>. One hexadecimal digit represents four bits, so four hexadecimal digits represent 16 bits.

The slash value is the prefix length:

<pre><code>2001:db8:1234:12::20/64</code></pre>

A <code>/64</code> means the first 64 bits belong to the prefix. The remaining 64 bits follow that prefix. In a typical LAN, those remaining bits form the interface identifier, although modern IPv6 standards do not require the identifier to contain a MAC address.

<h2 id="compression">Compress and expand the address</h2>

IPv6 text can omit unnecessary characters without changing the numeric address.

### Remove leading zeros

Leading zeros inside each 16-bit group may be removed:

<pre><code>0db8 becomes db8
0012 becomes 12
0000 becomes 0</code></pre>

### Replace one zero run with <code>::</code>

One consecutive run of all-zero groups may be replaced with <code>::</code>:

<pre><code>2001:0db8:1234:0012:0000:0000:0000:0020
2001:db8:1234:12::20</code></pre>

Use <code>::</code> only once. If several zero runs have the same length, the recommended text form compresses the first run. A single zero group remains <code>0</code> rather than being shortened with <code>::</code>.

RFC 5952 recommends lowercase hexadecimal, removal of leading zeros, and compression of the longest zero run. Systems should accept other valid forms, but a consistent form makes searching, logging, and comparison more reliable.

<h2 id="prefixes">Understand prefix lengths and the /64 boundary</h2>

The prefix length tells a router how many leading bits identify the destination network. A longer prefix is more specific.

<div class="table-scroll" role="region" aria-label="Common IPv6 prefix planning sizes" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Prefix</th><th scope="col">Common planning use</th><th scope="col">Number of /64 prefixes inside it</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Prefix"><code>/48</code></td><td data-label="Common planning use">Large site or organization assignment</td><td data-label="Number of /64 prefixes inside it">65,536</td></tr>
      <tr><td data-label="Prefix"><code>/56</code></td><td data-label="Common planning use">Smaller site or customer assignment</td><td data-label="Number of /64 prefixes inside it">256</td></tr>
      <tr><td data-label="Prefix"><code>/60</code></td><td data-label="Common planning use">Small deployment with several LANs</td><td data-label="Number of /64 prefixes inside it">16</td></tr>
      <tr><td data-label="Prefix"><code>/64</code></td><td data-label="Common planning use">Common LAN prefix</td><td data-label="Number of /64 prefixes inside it">1</td></tr>
    </tbody>
  </table>
</div>

A <code>/64</code> is the normal size for many IPv6 LANs and is expected by common Stateless Address Autoconfiguration (SLAAC) designs. IPv6 routing still supports other prefix lengths. A prefix that is not <code>/64</code> is not automatically invalid, but using a different size can affect address-assignment features and device expectations.

The prefix boundary may fall inside a hexadecimal group. A <code>/57</code>, for example, uses three complete 16-bit groups and the first 9 bits of the fourth group. Calculators can help check that boundary, but you should still understand that the slash length counts bits, not hexadecimal groups.

<h2 id="address-types">Recognize common IPv6 address types</h2>

<div class="table-scroll" role="region" aria-label="Common IPv6 address types" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Address or prefix</th><th scope="col">Plain-language purpose</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Address or prefix"><code>::/128</code></td><td data-label="Plain-language purpose">Unspecified address. A system uses it before it has a usable source address.</td></tr>
      <tr><td data-label="Address or prefix"><code>::1/128</code></td><td data-label="Plain-language purpose">Loopback. Traffic stays on the local system.</td></tr>
      <tr><td data-label="Address or prefix"><code>fe80::/10</code></td><td data-label="Plain-language purpose">Link-local. Traffic remains on the local link and is not routed to another link.</td></tr>
      <tr><td data-label="Address or prefix"><code>fc00::/7</code></td><td data-label="Plain-language purpose">Unique local. Intended for private local communication, not normal public internet routing.</td></tr>
      <tr><td data-label="Address or prefix"><code>2000::/3</code></td><td data-label="Plain-language purpose">Main global-unicast range. Allocation and reachability still need separate verification.</td></tr>
      <tr><td data-label="Address or prefix"><code>2001:db8::/32</code></td><td data-label="Plain-language purpose">Documentation. Reserved for examples and training material.</td></tr>
      <tr><td data-label="Address or prefix"><code>ff00::/8</code></td><td data-label="Plain-language purpose">Multicast. Sends traffic to a group of interfaces.</td></tr>
      <tr><td data-label="Address or prefix"><code>::ffff:0:0/96</code></td><td data-label="Plain-language purpose">IPv4-mapped IPv6 form used by software and APIs.</td></tr>
      <tr><td data-label="Address or prefix"><code>64:ff9b::/96</code></td><td data-label="Plain-language purpose">Well-known NAT64 prefix for embedding IPv4 destinations in translation environments.</td></tr>
    </tbody>
  </table>
</div>

### Multicast scope

The final hexadecimal digit in the first multicast group identifies scope. For example:

- <code>ff01::/16</code>: interface-local
- <code>ff02::/16</code>: link-local
- <code>ff05::/16</code>: site-local
- <code>ff08::/16</code>: organization-local
- <code>ff0e::/16</code>: global

IPv6 uses multicast instead of broadcast. The all-nodes group <code>ff02::1</code> reaches IPv6 nodes on the local link. The all-routers group <code>ff02::2</code> reaches IPv6 routers on that link.

### Anycast

Anycast uses an ordinary unicast address assigned to more than one interface. Routing delivers traffic to one of the available instances, usually the closest according to the routing system. You cannot identify anycast from the written address alone.

<h2 id="subnet-planning">Divide a parent prefix into child prefixes</h2>

Subnet planning asks how many additional bits are borrowed after the parent prefix.

A <code>/48</code> divided into <code>/64</code> prefixes uses 16 additional subnet bits:

<pre><code>64 - 48 = 16 subnet bits
2^16 = 65,536 child /64 prefixes</code></pre>

Example parent:

<pre><code>2001:db8:1234::/48</code></pre>

The fourth 16-bit group becomes the subnet field:

<pre><code>2001:db8:1234:0000::/64
2001:db8:1234:0001::/64
2001:db8:1234:0002::/64
...
2001:db8:1234:ffff::/64</code></pre>

A <code>/56</code> divided into <code>/64</code> prefixes uses 8 subnet bits and creates 256 child prefixes. A <code>/60</code> uses 4 additional bits and creates 16 child prefixes.

Do not calculate “usable hosts” by subtracting two. IPv6 has no broadcast address, and the prefix boundary values are not handled like the IPv4 network and broadcast addresses. Address-assignment rules and reserved anycast uses can still affect whether a particular value should be assigned in a specific design.

<h2 id="address-assignment">Separate SLAAC, DHCPv6, and static addressing</h2>

**SLAAC** lets a host build an address from information in Router Advertisements. The router supplies the prefix and flags that guide host behavior. The host creates its interface identifier and performs Duplicate Address Detection before using the address.

**DHCPv6** can provide addresses and other configuration information. Stateful DHCPv6 assigns addresses. Stateless DHCPv6 provides information such as DNS settings while another process, often SLAAC, supplies the address.

**Static addressing** is configured manually or through automation. It can be appropriate for infrastructure and predictable services, but it still requires correct prefix, route, gateway, and duplicate-address planning.

A host normally creates a link-local address even when it also has global or unique-local addresses. IPv6 routers often use link-local addresses as next hops because the next-hop relationship exists on one local link.

<h2 id="neighbor-discovery">Use Neighbor Discovery instead of ARP</h2>

IPv6 Neighbor Discovery uses Internet Control Message Protocol for IPv6 (ICMPv6) messages to discover routers, prefixes, neighbors, and address conflicts.

<div class="table-scroll" role="region" aria-label="IPv6 Neighbor Discovery messages" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Message</th><th scope="col">Plain-language purpose</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Message">Router Solicitation</td><td data-label="Plain-language purpose">A host asks routers to send configuration information sooner.</td></tr>
      <tr><td data-label="Message">Router Advertisement</td><td data-label="Plain-language purpose">A router announces prefixes, default-router information, and address-assignment flags.</td></tr>
      <tr><td data-label="Message">Neighbor Solicitation</td><td data-label="Plain-language purpose">A node asks who owns an IPv6 address or checks reachability.</td></tr>
      <tr><td data-label="Message">Neighbor Advertisement</td><td data-label="Plain-language purpose">A node answers with link-layer information or announces a change.</td></tr>
      <tr><td data-label="Message">Redirect</td><td data-label="Plain-language purpose">A router tells a host about a better next hop on the same link.</td></tr>
    </tbody>
  </table>
</div>

The solicited-node multicast range <code>ff02::1:ff00:0/104</code> limits neighbor discovery traffic to nodes whose addresses share the final 24 bits. This replaces the broad local broadcast behavior used by IPv4 Address Resolution Protocol (ARP).

<h2 id="common-mistakes">Avoid common IPv6 mistakes</h2>

- **Using <code>::</code> twice.** The address would be ambiguous because the system could not determine how many zeros belong in each location.
- **Compressing a single zero group.** Recommended text representation uses <code>::</code> for the longest run of at least two zero groups.
- **Assuming every prefix must be <code>/64</code>.** Many LANs use <code>/64</code>, but routing can use other prefix lengths.
- **Subtracting two addresses for network and broadcast.** IPv6 has no broadcast address.
- **Treating link-local addresses as globally unique.** The same link-local value can appear on different links, so a zone or interface may be needed to identify the intended link.
- **Assuming an address proves reachability.** A valid global-unicast address does not confirm current allocation, routing, firewall policy, or service availability.
- **Assuming an interface identifier reveals a MAC address.** Stable privacy methods and temporary addresses commonly avoid direct MAC-derived identifiers.

<h2 id="worked-examples">Work through two prefix examples</h2>

### Find the containing /64

Input:

<pre><code>2001:db8:1234:12ab:44::20/48</code></pre>

The <code>/48</code> parent is:

<pre><code>2001:db8:1234::/48</code></pre>

The address falls inside this <code>/64</code>:

<pre><code>2001:db8:1234:12ab::/64</code></pre>

The fourth group, <code>12ab</code>, is the 16-bit child-prefix number within the <code>/48</code>.

### Find a non-hextet boundary

Input:

<pre><code>2001:db8:1234:abff::1/57</code></pre>

A <code>/57</code> keeps the first 48 bits and the first 9 bits of the fourth group. The containing prefix is:

<pre><code>2001:db8:1234:ab80::/57</code></pre>

The final address in that prefix is:

<pre><code>2001:db8:1234:abff:ffff:ffff:ffff:ffff</code></pre>

Use the <a href="/tools/ipv6-calculator/">IPv6 Address and Prefix Calculator</a> to check expanded forms, common address types, non-hextet boundaries, and child-prefix planning.

<h2 id="official-references">Official references</h2>

- [RFC 4291: IP Version 6 Addressing Architecture](https://www.rfc-editor.org/info/rfc4291/)
- [RFC 5952: A Recommendation for IPv6 Address Text Representation](https://www.rfc-editor.org/info/rfc5952/)
- [RFC 4861: Neighbor Discovery for IP version 6](https://www.rfc-editor.org/info/rfc4861/)
- [RFC 4862: IPv6 Stateless Address Autoconfiguration](https://www.rfc-editor.org/info/rfc4862/)
- [RFC 8415: Dynamic Host Configuration Protocol for IPv6](https://www.rfc-editor.org/info/rfc8415/)
- [RFC 7421: Analysis of the 64-bit Boundary in IPv6 Addressing](https://www.rfc-editor.org/info/rfc7421/)
- [IANA IPv6 Special-Purpose Address Space](https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml)
