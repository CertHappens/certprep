---
layout: layouts/article.njk
title: IPv4 Subnetting Reference for Network+
description: Learn IPv4 CIDR blocks, subnet masks, powers-of-two host counts, borrowed bits, block-size shortcuts, special ranges, VLSM, and worked examples.
permalink: /network-plus/n10-009/study-guide/ipv4-subnetting/
ogType: article
printable: true
printTitle: IPv4 Subnetting Reference for Network+
author: certHappens
datePublished: 2026-07-26
articleSection: Network+ N10-009 IPv4 Subnetting
eyebrow: Network+ subnetting reference
lede: Build subnetting answers from a repeatable process, then use the shortcuts that make network boundaries and host counts faster to recognize.
breadcrumbs:
  - label: Home
    url: /
  - label: Network+
    url: /network-plus/
  - label: N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
  - label: IPv4 Subnetting
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
toc:
  - id: core-model
    label: Core model
  - id: cidr-reference
    label: CIDR reference
  - id: powers-of-two
    label: Powers of two
  - id: borrowed-bits
    label: Borrowed bits
  - id: block-size
    label: Block-size shortcut
  - id: special-ranges
    label: Special IPv4 ranges
  - id: slash-31-32
    label: /31 and /32
  - id: worked-examples
    label: Worked examples
  - id: vlsm
    label: VLSM allocation
  - id: common-mistakes
    label: Common mistakes
  - id: practice-routine
    label: Practice routine
  - id: official-references
    label: Official references
keywords:
  - IPv4 subnetting
  - Network+ subnetting
  - CIDR reference
  - subnet mask chart
  - VLSM
  - subnetting examples
relatedLinks:
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check network and broadcast boundaries, usable ranges, masks, wildcard masks, address status, and binary work.
  - title: "Domain 1: Networking Concepts"
    url: /network-plus/n10-009/study-guide/networking-concepts/
    description: Place subnetting inside the larger traffic-flow model for IPv4, devices, protocols, cloud networks, and troubleshooting.
  - title: "Domain 2: Network Implementation"
    url: /network-plus/n10-009/study-guide/network-implementation/
    description: Apply prefixes to route selection, VLAN gateways, subinterfaces, NAT, and implementation scenarios.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Return to the roadmap for all five N10-009 domains.
  - title: Network+ N10-009 Practice Test
    url: /network-plus/n10-009/practice-test/
    description: Apply subnetting and other networking concepts in randomized questions with detailed explanations.
---
Subnetting questions become manageable when every answer comes from the same few decisions: how many bits are fixed, how large each block is, which block contains the address, and whether the available host count fits the requirement.

Suppose a host is configured as `192.168.40.77/26`. The first three octets look familiar, but they do not settle the subnet. A `/26` splits the fourth octet into blocks of 64. Address 77 belongs to the 64-127 block, so the network is `192.168.40.64` and the broadcast address is `192.168.40.127`.

That process works for unfamiliar addresses because it does not depend on recognizing a memorized example. Use the tables as accelerators, not substitutes for the method.

<div class="article-callout article-callout--action">
  <p><strong>Check your work:</strong> The <a href="/tools/subnet-calculator/">IPv4 Subnet Calculator</a> shows the network, broadcast, usable range, host counts, mask, wildcard mask, address status, binary octets, and the steps behind the result.</p>
</div>

<h2 id="core-model">The 32-bit subnetting model</h2>

An IPv4 address contains 32 bits arranged as four 8-bit octets. CIDR notation places a slash and prefix length after the address. The prefix length tells you how many leading bits identify the network.

For `192.168.40.77/26`:

- 26 bits identify the network.
- 6 bits remain for addresses inside the subnet.
- The mask contains 26 ones followed by 6 zeros.
- The total address count is `2^6`, which equals 64.
- Traditional usable host count is 64 minus the network and broadcast addresses, which equals 62.

A dependable calculation follows this order:

1. Identify the prefix and subnet mask.
2. Find the changing octet.
3. Calculate the block size.
4. Locate the boundary below the entered address.
5. Find the next boundary, then subtract one for the broadcast address.
6. Move one address inward from each boundary for the traditional usable range.
7. Confirm that the host count satisfies the requirement.

This order prevents a common mistake: finding the right host count but attaching it to the wrong network boundary.

<h2 id="cidr-reference">Common IPv4 CIDR blocks</h2>

The table combines masks, address counts, and familiar uses. Large blocks are included because route tables and private ranges often use them. Treat the usable-host column as subnet math, not a recommendation to place millions of devices in one broadcast domain.

<div class="table-scroll" role="region" aria-label="Common IPv4 CIDR prefixes, masks, and host counts" tabindex="0">
  <table class="subnet-reference-table">
    <thead>
      <tr>
        <th scope="col">Prefix</th>
        <th scope="col">Subnet mask</th>
        <th scope="col">Total addresses</th>
        <th scope="col">Traditional usable</th>
        <th scope="col">Useful clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>/0</td><td>0.0.0.0</td><td>4,294,967,296</td><td>4,294,967,294</td><td>IPv4 default route, matches every destination</td></tr>
      <tr><td>/8</td><td>255.0.0.0</td><td>16,777,216</td><td>16,777,214</td><td>Historical Class A size; 10.0.0.0/8 is private</td></tr>
      <tr><td>/12</td><td>255.240.0.0</td><td>1,048,576</td><td>1,048,574</td><td>172.16.0.0/12 private range</td></tr>
      <tr><td>/16</td><td>255.255.0.0</td><td>65,536</td><td>65,534</td><td>Historical Class B size; two octets fixed</td></tr>
      <tr><td>/20</td><td>255.255.240.0</td><td>4,096</td><td>4,094</td><td>Third-octet block size 16</td></tr>
      <tr><td>/21</td><td>255.255.248.0</td><td>2,048</td><td>2,046</td><td>Third-octet block size 8</td></tr>
      <tr><td>/22</td><td>255.255.252.0</td><td>1,024</td><td>1,022</td><td>Third-octet block size 4</td></tr>
      <tr><td>/23</td><td>255.255.254.0</td><td>512</td><td>510</td><td>Spans two /24-sized ranges</td></tr>
      <tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td><td>Fourth-octet block size 256</td></tr>
      <tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td><td>Fourth-octet boundaries 0 and 128</td></tr>
      <tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td><td>Boundaries 0, 64, 128, 192</td></tr>
      <tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td><td>Fourth-octet block size 32</td></tr>
      <tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td><td>Fourth-octet block size 16</td></tr>
      <tr><td>/29</td><td>255.255.255.248</td><td>8</td><td>6</td><td>Fourth-octet block size 8</td></tr>
      <tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td><td>Traditional small point-to-point subnet</td></tr>
      <tr><td>/31</td><td>255.255.255.254</td><td>2</td><td>2 on supported point-to-point links</td><td>RFC 3021 endpoint pair, no directed broadcast</td></tr>
      <tr><td>/32</td><td>255.255.255.255</td><td>1</td><td>1</td><td>One host address or host route</td></tr>
    </tbody>
  </table>
</div>

For prefixes between rows, keep halving or doubling. Moving from `/24` to `/25` adds one network bit and halves the block from 256 to 128 addresses. Moving back from `/25` to `/24` removes one network bit and doubles the block.

<h2 id="powers-of-two">Powers of two and host requirements</h2>

Host counts come from the number of host bits:

```text
Total addresses = 2^(32 - prefix)
```

For ordinary subnets through `/30`:

```text
Traditional usable hosts = total addresses - 2
```

The subtraction accounts for the network and broadcast addresses. `/31` and `/32` follow the special behavior covered later.

Memorize the small powers of two because they appear in both host calculations and block sizes:

<div class="table-scroll" role="region" aria-label="Powers of two used in IPv4 subnetting" tabindex="0">
  <table class="table--compact-second-column">
    <thead>
      <tr>
        <th scope="col">Host bits</th>
        <th scope="col">Power</th>
        <th scope="col">Total addresses</th>
        <th scope="col">Traditional usable</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1</td><td>2¹</td><td>2</td><td>Special `/31` case</td></tr>
      <tr><td>2</td><td>2²</td><td>4</td><td>2</td></tr>
      <tr><td>3</td><td>2³</td><td>8</td><td>6</td></tr>
      <tr><td>4</td><td>2⁴</td><td>16</td><td>14</td></tr>
      <tr><td>5</td><td>2⁵</td><td>32</td><td>30</td></tr>
      <tr><td>6</td><td>2⁶</td><td>64</td><td>62</td></tr>
      <tr><td>7</td><td>2⁷</td><td>128</td><td>126</td></tr>
      <tr><td>8</td><td>2⁸</td><td>256</td><td>254</td></tr>
      <tr><td>9</td><td>2⁹</td><td>512</td><td>510</td></tr>
      <tr><td>10</td><td>2¹⁰</td><td>1,024</td><td>1,022</td></tr>
      <tr><td>11</td><td>2¹¹</td><td>2,048</td><td>2,046</td></tr>
      <tr><td>12</td><td>2¹²</td><td>4,096</td><td>4,094</td></tr>
    </tbody>
  </table>
</div>

When a question asks for the smallest subnet supporting 50 hosts, find the first usable count that reaches 50. A `/27` provides 30, which fails. A `/26` provides 62, which fits. A `/25` also fits, but it consumes twice the address space.

Watch the wording. “50 devices” may not be the same as “50 endpoint addresses” when the subnet also needs router interfaces, appliances, printers, access points, growth, or reserved addresses. Use the requirement the scenario actually gives.

<h2 id="borrowed-bits">Borrowed subnet bits</h2>

Borrowed bits describe how a parent block is divided. The parent prefix must be stated or implied before the phrase has useful meaning.

Suppose an organization owns `192.168.50.0/24` and divides it into `/27` subnets:

- Parent prefix: `/24`
- New prefix: `/27`
- Borrowed bits: `27 - 24 = 3`
- Number of equal subnets: `2^3 = 8`
- Host bits per new subnet: `32 - 27 = 5`
- Addresses per new subnet: `2^5 = 32`
- Traditional usable hosts per subnet: 30

The eight boundaries are 0, 32, 64, 96, 128, 160, 192, and 224 in the fourth octet.

<div class="article-callout">
  <p><strong>Important qualifier:</strong> An address does not carry its parent allocation with it. You cannot say how many bits were borrowed from `/27` alone. You need the original prefix, such as `/24`, for that comparison.</p>
</div>

<h2 id="block-size">The block-size shortcut</h2>

Find the first mask octet that is not 255. That is the changing octet. Subtract its value from 256:

```text
Block size = 256 - changing mask octet
```

For `/26`, the mask is `255.255.255.192`:

```text
256 - 192 = 64
```

Fourth-octet boundaries therefore occur every 64 values: 0, 64, 128, and 192.

For `/20`, the mask is `255.255.240.0`. The third octet changes:

```text
256 - 240 = 16
```

Third-octet boundaries occur at 0, 16, 32, 48, and so on through 240. Every block includes all 256 values of the fourth octet.

Use this sequence when locating an address:

1. Write the mask.
2. Identify the changing octet.
3. Calculate the block size.
4. Count boundaries until one is less than or equal to the entered octet.
5. The next boundary minus one is the final value in that block.

For `172.20.77.9/20`, the third octet is 77 and the block size is 16. Boundaries around 77 are 64 and 80. The network begins at `172.20.64.0`, and the broadcast address is one before the next boundary: `172.20.79.255`.

<h2 id="special-ranges">Private and special-use IPv4 ranges</h2>

Subnet math still works inside special ranges, but the address category changes how the result should be interpreted.

<div class="table-scroll" role="region" aria-label="Common private and special-use IPv4 address ranges" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Range</th>
        <th scope="col">Category</th>
        <th scope="col">Operational clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>10.0.0.0/8</td><td>Private</td><td>RFC 1918 private-use space</td></tr>
      <tr><td>172.16.0.0/12</td><td>Private</td><td>Private range ends at 172.31.255.255</td></tr>
      <tr><td>192.168.0.0/16</td><td>Private</td><td>Common home and small-office private space</td></tr>
      <tr><td>100.64.0.0/10</td><td>Shared address space</td><td>Commonly associated with carrier-grade NAT, not RFC 1918</td></tr>
      <tr><td>127.0.0.0/8</td><td>Loopback</td><td>Traffic remains on the local host</td></tr>
      <tr><td>169.254.0.0/16</td><td>IPv4 link-local</td><td>Often called APIPA in Windows; DHCP failure is a common clue</td></tr>
      <tr><td>192.0.2.0/24</td><td>Documentation</td><td>TEST-NET-1 for examples</td></tr>
      <tr><td>198.51.100.0/24</td><td>Documentation</td><td>TEST-NET-2 for examples</td></tr>
      <tr><td>203.0.113.0/24</td><td>Documentation</td><td>TEST-NET-3 for examples</td></tr>
      <tr><td>198.18.0.0/15</td><td>Benchmarking</td><td>Reserved for network-device benchmarking tests</td></tr>
      <tr><td>224.0.0.0/4</td><td>Multicast</td><td>Group delivery, not ordinary unicast host assignment</td></tr>
      <tr><td>240.0.0.0/4</td><td>Reserved</td><td>Special-use rules take precedence over ordinary public addressing</td></tr>
      <tr><td>255.255.255.255/32</td><td>Limited broadcast</td><td>Local-link broadcast destination, not normally routed</td></tr>
    </tbody>
  </table>
</div>

A private address does not automatically provide security. Firewall policy, segmentation, authentication, exposed services, and routing determine risk. A public address is not automatically reachable either. It must be allocated, configured, routed, and allowed by policy.

Legacy class labels may still appear in exam questions. Class A historically used a `/8` default, Class B a `/16`, and Class C a `/24`. Modern subnetting and routing use the stated CIDR prefix. An address such as `192.168.10.10` is not automatically `/24` just because it falls in the old Class C first-octet range.

<h2 id="slash-31-32">How /31 and /32 behave</h2>

<h3>/31 point-to-point links</h3>

A `/31` contains two addresses. Traditional subtraction would leave zero usable hosts, but RFC 3021 defines a different model for supported point-to-point links. Both addresses can act as endpoints, and the link does not use a directed broadcast address.

For `203.0.113.10/31`:

- Lower endpoint: `203.0.113.10`
- Upper endpoint: `203.0.113.11`
- Total endpoint addresses: 2
- Directed broadcast: none for the RFC 3021 point-to-point design

Use `/31` only when the scenario and devices support point-to-point behavior. A normal Ethernet LAN with several hosts still needs an appropriate multi-access subnet.

<h3>/32 host routes</h3>

A `/32` fixes all 32 address bits. The block contains exactly one address. Route tables use `/32` to identify one IPv4 destination, and loopback interfaces often receive `/32` addresses because the route should represent one stable endpoint rather than a connected multi-host subnet.

For `192.0.2.44/32`, the network and only address are both `192.0.2.44`. There is no separate broadcast address.

<h2 id="worked-examples">Worked subnetting examples</h2>

<h3>Example 1: Find the boundaries of a /26</h3>

Address: `192.168.40.77/26`

1. `/26` mask: `255.255.255.192`
2. Changing octet: fourth
3. Block size: `256 - 192 = 64`
4. Boundaries: 0, 64, 128, 192
5. Address 77 falls between 64 and 127
6. Network: `192.168.40.64`
7. Broadcast: `192.168.40.127`
8. Usable range: `192.168.40.65` through `192.168.40.126`
9. Usable hosts: 62

<h3>Example 2: Work in the third octet</h3>

Address: `10.50.38.200/21`

1. `/21` mask: `255.255.248.0`
2. Changing octet: third
3. Block size: `256 - 248 = 8`
4. Boundaries around 38: 32 and 40
5. Network: `10.50.32.0`
6. Broadcast: `10.50.39.255`
7. Usable range: `10.50.32.1` through `10.50.39.254`
8. Total addresses: 2,048
9. Traditional usable hosts: 2,046

The fourth octet spans 0 through 255 because the changing boundary occurs in the third octet.

<h3>Example 3: Decide whether two hosts are local</h3>

Hosts:

- `10.20.30.62/27`
- `10.20.30.65/27`

A `/27` uses blocks of 32. Address 62 falls in the 32-63 block. Address 65 falls in the 64-95 block. The addresses differ by only 3, yet they belong to separate subnets and require routing between them.

<h3>Example 4: Choose the smallest subnet</h3>

A segment requires 120 usable addresses.

- `/26` provides 62, too small.
- `/25` provides 126, fits.
- `/24` provides 254, fits but wastes more space.

The smallest suitable answer is `/25`, assuming the stated 120 includes every address the design needs.

<h2 id="vlsm">VLSM allocation example</h2>

Variable-length subnet masking lets one parent block use several prefix sizes. Allocate the largest requirement first so small early choices do not fragment the remaining space.

Suppose `192.168.60.0/24` must support:

- User LAN: 100 hosts
- Voice LAN: 50 hosts
- Server LAN: 20 hosts
- Router point-to-point link: 2 endpoints with `/31` support

A clean allocation is:

<div class="table-scroll" role="region" aria-label="VLSM allocation example from a /24 parent network" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Need</th>
        <th scope="col">Assigned block</th>
        <th scope="col">Usable range or endpoints</th>
        <th scope="col">Reason</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>User LAN</td><td>192.168.60.0/25</td><td>192.168.60.1-192.168.60.126</td><td>126 traditional usable addresses</td></tr>
      <tr><td>Voice LAN</td><td>192.168.60.128/26</td><td>192.168.60.129-192.168.60.190</td><td>62 traditional usable addresses</td></tr>
      <tr><td>Server LAN</td><td>192.168.60.192/27</td><td>192.168.60.193-192.168.60.222</td><td>30 traditional usable addresses</td></tr>
      <tr><td>Point-to-point</td><td>192.168.60.224/31</td><td>192.168.60.224 and 192.168.60.225</td><td>Two RFC 3021 endpoints</td></tr>
    </tbody>
  </table>
</div>

The remaining addresses begin at `192.168.60.226`. Future allocations must still begin on a valid boundary for their chosen prefix. For example, another `/29` needs a multiple-of-8 boundary, so `192.168.60.232/29` is aligned while `192.168.60.226/29` is not.

<h2 id="common-mistakes">Common subnetting mistakes</h2>

<h3>Assuming the first three octets define the subnet</h3>

That shortcut works only for a `/24`. A `/23` crosses two third-octet values, while `/25` through `/30` divide the fourth octet into smaller blocks.

<h3>Using the old address class instead of the stated prefix</h3>

`172.20.10.5/24` uses `/24`, even though 172 historically fell in the Class B range. CIDR controls the modern network boundary.

<h3>Subtracting two before finding total addresses</h3>

The exponent gives total addresses. Calculate `2^(host bits)` first, then subtract two for traditional subnets. Subtracting from the exponent produces the wrong scale.

<h3>Forgetting the network and broadcast addresses</h3>

A `/27` has 32 total addresses and 30 traditional usable hosts. The first and last addresses are boundaries, not ordinary endpoint choices.

<h3>Treating every /31 as unusable</h3>

RFC 3021 allows two endpoints on supported point-to-point links. Context determines whether that special design applies.

<h3>Calling every 172 address private</h3>

Only `172.16.0.0/12` is RFC 1918 private space. The range ends at `172.31.255.255`.

<h3>Calling APIPA a private DHCP lease</h3>

`169.254.0.0/16` is IPv4 link-local space. In a Windows troubleshooting scenario, it often indicates that normal DHCP configuration was not obtained.

<h3>Allocating small VLSM blocks first</h3>

A handful of small subnets can leave gaps that no longer fit the largest requirement. Sort needs from largest to smallest before assigning boundaries.

<h3>Rounding a boundary to a convenient-looking number</h3>

Valid boundaries follow the block size. A `/27` begins on multiples of 32. `192.168.1.96/27` is aligned; `192.168.1.100/27` is an address inside that block, not its network address.

<h2 id="practice-routine">A subnetting practice routine</h2>

Use short repetitions rather than one long memorization session:

1. Write the powers of two from 2 through 256.
2. Rebuild the `/24` through `/30` mask and host table from those values.
3. Solve five fourth-octet examples using block size.
4. Solve two third-octet examples such as `/20` or `/21`.
5. Choose the smallest prefix for three host requirements.
6. Decide whether several address pairs share a subnet.
7. Check the answers with the [IPv4 Subnet Calculator](/tools/subnet-calculator/).
8. Explain one error in words before moving on.

A calculation error usually belongs to one of four categories: wrong mask, wrong block size, wrong boundary, or wrong host formula. Naming the category makes the next practice set more useful.

<h2 id="official-references">Official references</h2>

- [IANA IPv4 Special-Purpose Address Space registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml)
- [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918)
- [RFC 3021: Using 31-Bit Prefixes on IPv4 Point-to-Point Links](https://www.rfc-editor.org/rfc/rfc3021)
- [RFC 3927: Dynamic Configuration of IPv4 Link-Local Addresses](https://www.rfc-editor.org/rfc/rfc3927)
- [RFC 4632: Classless Inter-domain Routing](https://www.rfc-editor.org/rfc/rfc4632)
- [RFC 5737: IPv4 Address Blocks Reserved for Documentation](https://www.rfc-editor.org/rfc/rfc5737)
- [RFC 6598: Shared Address Space Request](https://www.rfc-editor.org/rfc/rfc6598)
