---
layout: layouts/article.njk
title: "CCNA 200-301 v2.0 Domain 1: Network Infrastructure and Connectivity"
description: Learn CCNA v2.0 Domain 1 through link diagnosis, virtualization, IPv4 and IPv6 troubleshooting, wireless, client connectivity, and DHCPv4 on IOS.
permalink: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
ogType: article
printable: true
printTitle: "CCNA 200-301 v2.0 Domain 1: Network Infrastructure and Connectivity"
author: certHappens
datePublished: 2026-07-31
dateModified: 2026-08-06
articleSection: CCNA 200-301 v2.0 Domain 1
eyebrow: CCNA v2.0 domain 1 guide
lede: Start at the link, prove the address, follow the path, and separate wireless or Dynamic Host Configuration Protocol (DHCP) symptoms from the layer that actually failed.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
  - label: Domain 1
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
toc:
  - id: domain-map
    label: Domain map
  - id: troubleshooting-order
    label: Troubleshooting order
  - id: interfaces-cabling
    label: Interfaces and cabling
  - id: virtualization
    label: Hypervisors, VMs, and containers
  - id: ipv4
    label: IPv4 addressing and subnetting
  - id: ipv6
    label: IPv6 and modified EUI-64
  - id: wireless
    label: Wireless principles
  - id: clients
    label: Client connectivity
  - id: dhcp
    label: DHCPv4 on IOS
  - id: integrated-scenario
    label: Integrated troubleshooting scenario
  - id: common-traps
    label: Common traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 Domain 1
  - Network Infrastructure and Connectivity
  - Cisco interface troubleshooting
  - IPv4 subnetting
  - IPv6 EUI-64
  - CCNA wireless
  - Cisco DHCP
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Expand the networking initials used throughout this guide without leaving the CCNA resource set.
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Return to the complete five-domain v2.0 roadmap and practical study method.
  - title: "Domain 2: Switching and Network Access"
    url: /ccna/200-301-v2/study-guide/switching-network-access/
    description: Continue from links and addressing into trunks, EtherChannel, switch virtual interfaces, edge ports, neighbor discovery, and spanning tree.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose the show, routing, neighbor, DHCP, logging, or path command that exposes the state you need.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Work CIDR masks, block sizes, host ranges, wildcard masks, and VLSM from a repeatable method.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Verify network, broadcast, usable range, masks, and address roles after solving manually.
  - title: IPv6 Addressing and Prefix Reference
    url: /ipv6-addressing/
    description: Review compression, address types, prefix planning, SLAAC, DHCPv6, and Neighbor Discovery.
  - title: IPv6 Address and Prefix Calculator
    url: /tools/ipv6-calculator/
    description: Check expanded and compressed forms, common address categories, prefix boundaries, and child prefixes.
  - title: Network Troubleshooting Tools
    url: /network-plus/quick-review/troubleshooting-tools/
    description: Match endpoint, path, packet, cable, and wireless tools to the evidence they provide.
---
Domain 1 accounts for **25% of the published CCNA 200-301 v2.0 blueprint**. It covers a wide troubleshooting path: physical interfaces, copper and fiber, virtualization, IPv4, IPv6, wireless, endpoint connectivity, and Dynamic Host Configuration Protocol version 4 (DHCPv4) on IOS devices.

The topics belong together. A client that cannot reach the network might have a damaged cable, a disabled interface, the wrong prefix, a failed wireless authentication, a missing DHCP relay, or a correct address with no route beyond the local network. The useful skill is finding the first broken assumption without changing unrelated configuration.

<div class="article-callout">
  <p><strong>Use this guide for v2.0.</strong> Cisco says the 200-301 v2.0 exam begins February 3, 2027. Candidates testing through February 2, 2027 should use the active v1.1 blueprint for exam-specific coverage.</p>
</div>

<h2 id="domain-map">Domain 1 objective map</h2>

<div class="table-scroll" role="region" aria-label="CCNA v2.0 Domain 1 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main skill</th>
        <th scope="col">Useful question</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Objective">1.1</td><td data-label="Main skill">Interfaces and cabling</td><td data-label="Useful question">Which physical, speed, duplex, distance, pinout, error, or signal clue explains the link behavior?</td></tr>
      <tr><td data-label="Objective">1.2</td><td data-label="Main skill">Virtualization</td><td data-label="Useful question">What role is played by the hypervisor, virtual machine (VM), container, virtual interface, and host network?</td></tr>
      <tr><td data-label="Objective">1.3</td><td data-label="Main skill">IPv4</td><td data-label="Useful question">Is the address, mask, assignment method, subnet, and gateway correct for the intended path?</td></tr>
      <tr><td data-label="Objective">1.4</td><td data-label="Main skill">IPv6</td><td data-label="Useful question">Is the unicast address, prefix, link-local behavior, and interface identifier consistent with the design?</td></tr>
      <tr><td data-label="Objective">1.5</td><td data-label="Main skill">Wireless principles</td><td data-label="Useful question">Do band, channel, radio frequency (RF) conditions, security, and interference support a reliable association?</td></tr>
      <tr><td data-label="Objective">1.6</td><td data-label="Main skill">Client connectivity</td><td data-label="Useful question">Did the endpoint fail at link, association, authentication, IP configuration, name resolution, or routed reachability?</td></tr>
      <tr><td data-label="Objective">1.7</td><td data-label="Main skill">DHCPv4 on IOS</td><td data-label="Useful question">Did the client, relay, server, pool, and return path all participate in the address exchange?</td></tr>
    </tbody>
  </table>
</div>

<h2 id="troubleshooting-order">Use a troubleshooting order that preserves evidence</h2>

A network symptom can tempt you to jump directly to the technology you most recently studied. Resist that. Start with the lowest condition that must be true and move upward as each condition is proven.

A practical sequence is:

1. **Link:** Is the interface or wireless connection physically usable?
2. **Local network:** Is the client attached to the expected Layer 2 network?
3. **Address:** Does it have the correct IPv4 or IPv6 address and prefix?
4. **Gateway:** Does it know where to send traffic for remote networks?
5. **Service:** Did Dynamic Host Configuration Protocol (DHCP), Domain Name System (DNS), authentication, or another required service complete?
6. **Path:** Can traffic reach the destination and return?

Do not interpret the sequence as a rule that every ticket begins at Layer 1. Strong evidence can move you forward. If a client can reach a server by IP but not by name, the physical link, local switching, IP address, gateway, and routed path are already working well enough to support the session. DNS becomes a stronger lead than the cable.

<h2 id="interfaces-cabling">Interfaces and cabling: read the link before changing it</h2>

Start with a compact state view:

```text
show ip interface brief
```

The important distinction is between **Status** and **Protocol**. An interface that is administratively down needs a different response from an interface that is physically down. An interface that is physically up while the line protocol is down points toward a different class of failure again.

Use the full interface output when counters and negotiation matter:

```text
show interfaces GigabitEthernet1/0/1
```

Useful clues include:

- Interface and line-protocol state
- Configured or negotiated speed
- Duplex
- Input and output errors
- cyclic redundancy check (CRC)-related errors
- Drops
- Resets or state transitions
- Traffic counters

A single old counter is weaker evidence than a counter that continues increasing while the problem occurs. Clear baselines matter. If a port accumulated errors months ago and has been stable since, the raw total may not explain today's complaint.

<h3>Duplex and collision clues</h3>

Modern switched Ethernet normally operates full duplex. Persistent collisions or late collisions deserve attention because they can indicate a negotiation or duplex problem, a legacy shared segment, or another physical-layer issue.

A classic duplex mismatch can produce confusing symptoms: the link stays up, light traffic may work, and performance collapses as load increases. One side may report collision-related behavior while the other records errors. Verify both ends rather than changing only the side you can see.

<h3>Copper: pinout, category, and distance</h3>

Twisted-pair Ethernet depends on the correct copper category, termination, pair integrity, and supported distance.

Two pinout standards are common for eight-position modular Ethernet cabling:

- **T568A** places the green pair on pins 1 and 2 and the orange pair on pins 3 and 6.
- **T568B** places the orange pair on pins 1 and 2 and the green pair on pins 3 and 6.

Using the same standard at both ends produces a straight-through pinout. Using A at one end and B at the other produces a crossover pinout. Modern automatic medium-dependent interface crossover (auto-MDI-X) support often removes the operational need to choose crossover cabling for ordinary Ethernet device combinations, but pinout mistakes and split pairs can still produce real faults.

Cable category also matters. Cat 5e commonly supports 1000BASE-T to 100 meters. Cat 6a supports 10GBASE-T to 100 meters. Cat 6 can support 10GBASE-T at shorter distances under appropriate conditions. When a link requirement approaches the limit, use the standard, device documentation, cable certification, and installation environment rather than guessing from the jacket label alone.

<h3>Fiber: match the optic to the path</h3>

Fiber troubleshooting requires you to match several properties:

- Single-mode or multimode fiber
- Optic type on each end
- Supported wavelength
- Reach of the optic
- Connector and polarity
- Transmit and receive signal levels when monitoring is available

Multimode fiber is common for shorter building and data-center links. Single-mode fiber supports much longer reaches when paired with the appropriate optics.

On supported Cisco platforms, transceiver detail can expose optical monitoring information:

```text
show interfaces transceiver detail
```

The exact command and fields vary by platform. When digital optical monitoring is available, compare received and transmitted levels with the optic's supported thresholds. A link can fail because the signal is too weak, but an unexpectedly strong received signal can also exceed a receiver's acceptable range.

<div class="article-callout">
  <p><strong>Physical-layer rule:</strong> link up does not prove link healthy. Error counters, speed, duplex, optic compatibility, signal levels, and intermittent state changes can explain a path that technically remains up.</p>
</div>

<h2 id="virtualization">Hypervisors, virtual machines, and containers</h2>

Virtualization changes where a network boundary exists, but packets and frames still need addresses, forwarding decisions, and policy. A virtual machine (VM) commonly has a virtual network interface card (NIC), a Media Access Control (MAC) address, and may attach to a virtual local area network (VLAN).

<div class="table-scroll" role="region" aria-label="Hypervisor VM and container comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">Role</th>
        <th scope="col">Networking clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Component"><strong>Hypervisor</strong></td><td data-label="Role">Creates and manages virtual machines and their access to physical resources.</td><td data-label="Networking clue">Connects virtual interfaces to virtual switches, VLANs, or physical uplinks according to the platform design.</td></tr>
      <tr><td data-label="Component"><strong>Virtual machine</strong></td><td data-label="Role">Runs its own guest operating system with virtualized central processing unit (CPU), memory, storage, and network interfaces.</td><td data-label="Networking clue">Has its own virtual NIC, MAC address, IP configuration, routes, and guest firewall behavior.</td></tr>
      <tr><td data-label="Component"><strong>Container</strong></td><td data-label="Role">Packages an application and its dependencies while sharing the host operating system kernel.</td><td data-label="Networking clue">May use a virtual bridge, namespace, overlay, port mapping, or another host-managed network model.</td></tr>
    </tbody>
  </table>
</div>

A VM can fail network access even while the physical host is healthy. The guest may have the wrong VLAN, a disconnected virtual NIC, incorrect IP configuration, or a guest firewall rule. Conversely, several VMs failing together can point toward the host uplink, virtual switch, trunk, or shared upstream network.

Containers are generally lighter than full VMs because they do not each require a separate guest kernel. That does not mean their networking is simpler. Container platforms can add virtual bridges, overlays, network namespaces, service translation, and policy between an application and the physical interface.

<h2 id="ipv4">IPv4: prove the address, prefix, and path</h2>

IPv4 troubleshooting begins with four values:

- Address
- Subnet mask or prefix
- Default gateway
- Assignment method

A correct-looking address with the wrong mask can be worse than no address because the client may incorrectly decide that a remote destination is local. It then tries Address Resolution Protocol (ARP) instead of sending the packet to its gateway.

<h3>Private and public addressing</h3>

Request for Comments (RFC) 1918 defines three IPv4 ranges for private internets:

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

These ranges are not globally routed on the public internet. Network Address Translation is commonly used when privately addressed systems need IPv4 internet access.

An address in `169.254.0.0/16` on a client often indicates link-local self-assignment after ordinary DHCP configuration was unavailable. Treat that as evidence of an address-assignment problem, then determine whether the fault is the client, local link, relay, server, or scope.

<h3>Work the prefix, not the visual pattern</h3>

Consider:

```text
192.0.2.77/26
```

A /26 mask is `255.255.255.192`, giving a block size of 64 in the final octet. The subnet boundaries are 0, 64, 128, and 192. Address 77 therefore belongs to:

- Network: `192.0.2.64`
- Broadcast: `192.0.2.127`
- Traditional usable range: `192.0.2.65` through `192.0.2.126`

Use the [IPv4 Subnetting Reference](/network-plus/n10-009/study-guide/ipv4-subnetting/) for the complete method and the [IPv4 Subnet Calculator](/tools/subnet-calculator/) to check your work.

<h3>Basic IOS interface configuration</h3>

A simple routed-interface example looks like this:

```text
interface GigabitEthernet0/0/0
 ip address 192.0.2.1 255.255.255.192
 no shutdown
```

Then verify the live state:

```text
show ip interface brief
show interfaces GigabitEthernet0/0/0
```

Do not stop after reading the running configuration. A correct configuration on a physically down interface still produces a broken path.

<h2 id="ipv6">IPv6 addressing, prefixes, and modified Extended Unique Identifier 64-bit (EUI-64)</h2>

IPv6 uses 128-bit addresses and prefix notation. The same first question still matters: **which bits identify the network and which identify the interface?**

Common unicast scopes include:

<div class="table-scroll" role="region" aria-label="Common IPv6 unicast address scopes" tabindex="0">
  <table>
    <thead><tr><th scope="col">Type</th><th scope="col">Common range</th><th scope="col">Use</th></tr></thead>
    <tbody>
      <tr><td><strong>Global unicast</strong></td><td><code>2000::/3</code></td><td>Globally routable unicast addressing.</td></tr>
      <tr><td><strong>Link-local</strong></td><td><code>FE80::/10</code></td><td>Communication on the local link and important neighbor or next-hop functions.</td></tr>
      <tr><td><strong>Unique local</strong></td><td><code>FC00::/7</code></td><td>Internal unicast addressing that is not intended for ordinary global internet routing.</td></tr>
    </tbody>
  </table>
</div>

A LAN commonly uses a /64 prefix. Do not apply IPv4 host-count habits to IPv6. IPv6 subnet design is normally about prefix hierarchy and interface behavior, not squeezing a few extra host addresses out of each LAN.

<h3>Compression rules</h3>

You may remove leading zeros from each hexadecimal group and replace one continuous run of all-zero groups with `::`.

For example:

```text
2001:0db8:0010:0020:0000:0000:0000:0042
```

can be written as:

```text
2001:db8:10:20::42
```

Use `::` only once in an address so the omitted number of groups remains unambiguous.

<h3>Modified EUI-64</h3>

Cisco's v2.0 blueprint explicitly includes modified Extended Unique Identifier 64-bit (EUI-64). The method can derive a 64-bit interface identifier from a 48-bit MAC address.

Using MAC address `00:1A:2B:3C:4D:5E`:

1. Split the MAC in half: `00:1A:2B` and `3C:4D:5E`.
2. Insert `FF:FE`: `00:1A:2B:FF:FE:3C:4D:5E`.
3. Flip the universal/local bit in the first byte. `00` becomes `02`.
4. The interface identifier becomes `021A:2BFF:FE3C:4D5E`.

With prefix `2001:db8:10:20::/64`, the resulting address is:

```text
2001:db8:10:20:21a:2bff:fe3c:4d5e
```

On IOS XE, an interface can be configured to derive the interface ID this way:

```text
interface GigabitEthernet0/0/0
 ipv6 address 2001:db8:10:20::/64 eui-64
```

If the device must route IPv6 traffic, global IPv6 forwarding is enabled with:

```text
ipv6 unicast-routing
```

Verify the resulting interface state and addresses rather than trying to reconstruct everything from memory:

```text
show ipv6 interface brief
show ipv6 interface GigabitEthernet0/0/0
```

Real endpoint operating systems may use privacy-oriented or randomly generated interface identifiers rather than modified EUI-64. The exam objective still expects you to understand the EUI-64 mechanism and recognize its result.

<h2 id="wireless">Wireless principles: separate radio frequency (RF), association, security, and IP</h2>

A wireless client can fail before IP addressing begins. Treat the connection as several stages:

1. Can the client hear a usable signal?
2. Is it using the intended service set identifier (SSID) and band?
3. Can it associate with the access point?
4. Does security authentication succeed?
5. Does the client receive usable IP configuration?
6. Can it reach the local gateway and remote destinations?

<h3>Bands and channels</h3>

The main Wi-Fi bands have different operating tradeoffs:

<div class="table-scroll" role="region" aria-label="Wi-Fi band comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">Band</th><th scope="col">General strength</th><th scope="col">Common concern</th></tr></thead>
    <tbody>
      <tr><td data-label="Band"><strong>2.4 GHz</strong></td><td data-label="General strength">Longer effective range and stronger penetration through many obstacles.</td><td data-label="Common concern">Fewer clean channel choices and substantial interference from Wi-Fi and non-Wi-Fi devices.</td></tr>
      <tr><td data-label="Band"><strong>5 GHz</strong></td><td data-label="General strength">More channel capacity and commonly less congestion than 2.4 GHz.</td><td data-label="Common concern">Higher attenuation through distance and building materials than lower frequencies.</td></tr>
      <tr><td data-label="Band"><strong>6 GHz</strong></td><td data-label="General strength">Large amount of spectrum for newer Wi-Fi operation and many channel options.</td><td data-label="Common concern">Requires compatible clients and access points, with propagation constraints that matter in coverage design.</td></tr>
    </tbody>
  </table>
</div>

For 2.4 GHz Wi-Fi using 20 MHz channels in common North American planning, channels 1, 6, and 11 are the familiar non-overlapping set. Wider channels consume more spectrum. More width can increase potential throughput, but it can also reduce the number of independent channel choices in a crowded environment.

<h3>RF characteristics and interference</h3>

Wireless quality depends on more than raw signal strength.

- **Attenuation** reduces signal power over distance and through materials.
- **Absorption** converts some RF energy into another form as it passes through material.
- **Reflection** bounces RF energy from surfaces.
- **Diffraction** bends energy around edges.
- **Refraction** changes the path as energy passes between materials.
- **Interference** introduces competing energy that makes the desired signal harder to interpret.

Received Signal Strength Indicator (RSSI) tells you about received signal level. Signal-to-noise ratio (SNR) compares useful signal with background noise. A client can show a seemingly adequate signal and still perform poorly when noise or contention is high.

<h3>Security protocols</h3>

Wi-Fi Protected Access 2 (WPA2) with Advanced Encryption Standard (AES)-based protection remains widely deployed. Wi-Fi Protected Access 3 (WPA3) improves modern Wi-Fi security, including stronger personal-mode authentication with Simultaneous Authentication of Equals (SAE). Enterprise wireless local area networks (WLANs) commonly use 802.1X with an authentication backend rather than one shared personal passphrase.

Legacy Wired Equivalent Privacy (WEP) and Temporal Key Integrity Protocol (TKIP)-based designs should be recognized as weak choices. A client that sees the SSID but cannot authenticate may have the wrong credential, unsupported security mode, certificate or 802.1X problem, or incompatible client settings. Do not start with DHCP until association and authentication are successful.

<h2 id="clients">Wired and wireless client connectivity</h2>

Cisco's v2.0 objective explicitly includes Windows, macOS, and Linux clients. You do not need every operating-system command memorized, but you should be able to expose the same facts on each platform: interface state, IP address, prefix, gateway, DNS, route, neighbor information, and path reachability.

<div class="table-scroll" role="region" aria-label="Client troubleshooting commands by operating system" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">Question</th><th scope="col">Windows</th><th scope="col">macOS or Linux examples</th></tr></thead>
    <tbody>
      <tr><td data-label="Question">What address, mask/prefix, gateway, and DNS are configured?</td><td data-label="Windows"><code>ipconfig /all</code></td><td data-label="macOS or Linux examples"><code>ifconfig</code> on macOS; <code>ip address</code> on Linux</td></tr>
      <tr><td data-label="Question">What route would the client use?</td><td data-label="Windows"><code>route print</code></td><td data-label="macOS or Linux examples"><code>route -n get default</code> on macOS; <code>ip route</code> on Linux</td></tr>
      <tr><td data-label="Question">What local neighbor mappings exist?</td><td data-label="Windows"><code>arp -a</code></td><td data-label="macOS or Linux examples"><code>arp -a</code> or platform-specific neighbor commands</td></tr>
      <tr><td data-label="Question">Can the destination respond?</td><td data-label="Windows"><code>ping</code></td><td data-label="macOS or Linux examples"><code>ping</code></td></tr>
      <tr><td data-label="Question">Where does the path stop responding?</td><td data-label="Windows"><code>tracert</code></td><td data-label="macOS or Linux examples"><code>traceroute</code></td></tr>
      <tr><td data-label="Question">Does DNS return the expected record?</td><td data-label="Windows"><code>nslookup</code></td><td data-label="macOS or Linux examples"><code>dig</code> or <code>nslookup</code> when installed</td></tr>
    </tbody>
  </table>
</div>

Exact tools and output vary by operating-system version and installed packages. Focus on the network fact you need, then use the local tool that exposes it.

<h3>A useful client-side test order</h3>

For a wired client with no access to remote networks:

1. Confirm interface/link state.
2. Inspect address and prefix.
3. Confirm the default gateway.
4. Ping the local gateway when policy permits.
5. Test a known remote IP address.
6. Test name resolution separately.
7. Use traceroute only after simpler local checks support a path problem.

For wireless, add SSID, band, signal, association, and authentication checks before the IP steps.

<h2 id="dhcp">Dynamic Host Configuration Protocol version 4 (DHCPv4): client, server, and relay on IOS</h2>

DHCPv4 automates several settings a client needs, commonly including address, mask, default gateway, DNS servers, and lease information.

A basic initial exchange follows four familiar messages:

1. **Discover:** the client looks for a DHCP server.
2. **Offer:** a server proposes configuration.
3. **Request:** the client requests the offered address and identifies the selected server.
4. **Acknowledgment:** the server confirms the lease and options.

The first client messages are local broadcasts because the client does not yet have ordinary IP configuration. Routers do not normally forward those broadcasts between subnets, which is why a relay is needed when the server lives elsewhere.

<h3>IOS DHCP server example</h3>

The following example reserves infrastructure addresses and creates a pool for `192.0.2.0/26`:

```text
ip dhcp excluded-address 192.0.2.1 192.0.2.10

ip dhcp pool USERS
 network 192.0.2.0 255.255.255.192
 default-router 192.0.2.1
 dns-server 198.51.100.53
```

Useful server verification commands include:

```text
show ip dhcp pool
show ip dhcp binding
show ip dhcp conflict
```

Ask different questions of each command. The pool view helps with scope and utilization. Bindings show leases. Conflicts show addresses IOS has identified as unsuitable for ordinary assignment.

<h3>IOS DHCP client</h3>

An IOS interface that should obtain its IPv4 address dynamically can use:

```text
interface GigabitEthernet0/0/0
 ip address dhcp
 no shutdown
```

Then check the resulting address and interface state with:

```text
show ip interface brief
```

If no usable address appears, verify the link and Layer 2 path before assuming the DHCP server is broken.

<h3>DHCP relay</h3>

When clients and the DHCP server are separated by a router, configure the helper on the **client-facing Layer 3 interface**:

```text
interface GigabitEthernet0/0/1
 ip address 192.0.2.1 255.255.255.192
 ip helper-address 198.51.100.20
```

The relay forwards the client's DHCP/Bootstrap Protocol (BOOTP) broadcast toward the configured server. Cisco IOS XE uses relay information, including the gateway address field, so the server can identify the subnet from which the request originated and select the appropriate pool.

A relay troubleshooting sequence should therefore verify:

1. Client-facing interface and subnet
2. Helper address
3. Route from relay to server
4. Server pool matching the client subnet
5. Available leases
6. Return reachability
7. Any access control list (ACL) or policy that could block the exchange

<div class="article-callout">
  <p><strong>Common mistake:</strong> putting <code>ip helper-address</code> on the server-facing interface. The command belongs where the client broadcast is received.</p>
</div>

<h2 id="integrated-scenario">Integrated scenario: a client has no usable address</h2>

A user connects a laptop to an access switch. The link light is on, but the laptop self-assigns `169.254.31.44` and cannot reach its gateway. The DHCP server is located on another routed subnet.

A disciplined investigation might look like this:

### Step 1: Prove the local link

Check the switchport state and error counters. If the port is physically down or accumulating errors, fix the link before investigating DHCP.

### Step 2: Prove Layer 2 placement

Confirm that the access port belongs to the intended VLAN. If several clients in the same VLAN are affected, inspect the shared path rather than assuming multiple endpoints failed at once.

### Step 3: Check the gateway interface

Confirm the VLAN's Layer 3 interface is up with the expected IPv4 address and prefix.

### Step 4: Inspect the relay

The client-facing Layer 3 interface should contain the correct helper address. Then verify the relay can route to the server.

### Step 5: Inspect the server state

Check the DHCP pool and bindings. A pool with no free addresses produces a different remedy from a relay that never reaches the server.

### Step 6: Test recovery

Renew the client lease or reconnect after the fault is fixed. Confirm that the endpoint receives the expected address, mask, gateway, and DNS values, then test gateway and remote reachability.

Notice how the `169.254.x.x` symptom narrowed the problem without proving the root cause. It indicated that ordinary address assignment had failed. The investigation still had to separate link, VLAN, gateway, relay, path, and server possibilities.

<h2 id="common-traps">Common Domain 1 traps</h2>

<h3>Assuming up/up means healthy</h3>

An interface can be operational while errors, duplex problems, congestion, or bad higher-layer configuration still break applications. `up/up` is a checkpoint, not a verdict.

<h3>Changing the subnet mask because two addresses look close</h3>

Visual similarity does not determine subnet membership. Apply the prefix and calculate the boundary.

<h3>Treating every wireless failure as an RF problem</h3>

A strong signal does not prove successful authentication, DHCP, DNS, or routed access. Separate the stages.

<h3>Troubleshooting DHCP only at the server</h3>

DHCP depends on the client's local link and, when subnets differ, the relay and routed path. A healthy server cannot answer a request that never arrives.

<h3>Assuming a virtual workload bypasses ordinary networking rules</h3>

A VM or container may add virtual network layers, but IP addressing, Layer 2 placement, routes, policy, and upstream physical connectivity still matter.

<h3>Memorizing modified EUI-64 without checking the bit flip</h3>

The inserted `FFFE` is only part of the method. Remember to invert the universal/local bit in the first byte before forming the interface ID.

<h2 id="rapid-review">Rapid review checklist</h2>

You are ready to move beyond Domain 1 review when you can:

- Distinguish administratively down, physically down, line-protocol down, and healthy interface states.
- Explain what increasing CRC errors, collision-related counters, speed, duplex, and drops can tell you.
- Compare copper and fiber troubleshooting by medium, pinout, optic, distance, and signal constraints.
- Explain the network role of a hypervisor, VM, container, virtual NIC, and physical uplink.
- Calculate IPv4 subnet boundaries and determine whether two hosts consider each other local.
- Recognize public, private, and IPv4 link-local addressing.
- Compress and expand IPv6 addresses and recognize global, link-local, and unique-local unicast scopes.
- Derive a modified EUI-64 interface identifier from a MAC address.
- Separate Wi-Fi band/channel/RF problems from authentication and IP problems.
- Use endpoint commands to inspect addressing, routes, neighbors, DNS, and path behavior on Windows, macOS, or Linux.
- Explain DHCP Discover, Offer, Request, and Acknowledgment in the context of a real client exchange.
- Configure or recognize a basic IOS DHCP pool, DHCP client, and `ip helper-address` relay.
- Troubleshoot a failed DHCP exchange from the client-facing link through the server and return path.

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco 200-301 CCNA exam page](https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html)
- [Cisco IOS XE interface and hardware command reference](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/26-x/command_reference/b_26x_9600_cr/interface_and_hardware_commands.html)
- [Cisco IOS XE IPv6 addressing and basic connectivity](https://www.cisco.com/c/en/us/td/docs/ios/ipv6/configuration/guide/ipv6-xe-16-book-cat8000/m_ip6-addrg-bsc-con.html)
- [Cisco IOS XE DHCP server configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_config-dhcp-server-xe.html)
- [Cisco IOS XE DHCP relay agent configuration](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/ipaddr_dhcp/configuration/xe-2/dhcp-xe-2-book/dhcp-relay-agent-xe.html)
