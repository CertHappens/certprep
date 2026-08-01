---
layout: layouts/article.njk
title: "CCNA 200-301 v2.0 Domain 4: Network Services and Security"
description: Learn CCNA v2.0 Domain 4 through AAA management access, secure file transfer, NAT and PAT, DNS records, IPsec VPNs, IPv4 ACLs, and Layer 2 security controls.
permalink: /ccna/200-301-v2/study-guide/network-services-security/
ogType: article
printable: true
printTitle: "CCNA 200-301 v2.0 Domain 4: Network Services and Security"
author: certHappens
datePublished: 2026-07-31
dateModified: 2026-07-31
articleSection: CCNA 200-301 v2.0 Domain 4
eyebrow: CCNA v2.0 domain 4 guide
lede: Secure management first, follow traffic through services and policy, and verify every control from the state it is supposed to create.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
  - label: Domain 4
    url: /ccna/200-301-v2/study-guide/network-services-security/
toc:
  - id: domain-map
    label: Domain map
  - id: service-security-model
    label: Service and security model
  - id: aaa
    label: Local users and AAA
  - id: file-transfer
    label: Secure file transfer
  - id: nat-pat
    label: NAT and PAT
  - id: dns
    label: DNS records
  - id: ipsec
    label: IPsec VPN concepts
  - id: ipv4-acls
    label: IPv4 ACLs
  - id: dhcp-snooping
    label: DHCP snooping
  - id: dai
    label: Dynamic ARP Inspection
  - id: storm-control
    label: Storm control
  - id: ra-guard
    label: RA Guard
  - id: port-security
    label: Port security
  - id: integrated-scenario
    label: Integrated troubleshooting scenario
  - id: common-traps
    label: Common traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 Domain 4
  - Network Services and Security
  - Cisco AAA TACACS RADIUS
  - Cisco NAT PAT
  - Cisco IPv4 ACL
  - DHCP snooping DAI
  - Cisco port security
  - IPsec VPN CCNA
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Expand the management, translation, DNS, VPN, ACL, and Layer 2 security terms used throughout this guide.
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Return to the complete five-domain v2.0 guide and practical study method.
  - title: "Domain 3: IP Routing"
    url: /ccna/200-301-v2/study-guide/ip-routing/
    description: Review route selection, static routing, OSPF, and first-hop redundancy before tracing service and security behavior across the path.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose ACL, NAT, interface, logging, and path-testing commands based on the state you need to prove.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Review DNS, TACACS+, RADIUS, SSH-based file transfer, IPsec, and other management or security traffic.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Rebuild wildcard masks and address ranges before applying them to ACL and NAT configuration.
---
Domain 4 accounts for **20% of the published CCNA 200-301 v2.0 blueprint**. Cisco expects you to configure management authentication, move files securely, configure Network Address Translation (NAT) and Port Address Translation (PAT), diagnose Domain Name System (DNS) records, describe Internet Protocol Security (IPsec) virtual private networks (VPNs), configure IPv4 access control lists (ACLs), and configure several Layer 2 protections.

The topics look separate until you follow the traffic. Authentication, authorization, and accounting (AAA) controls who manages a device. Secure file transfer protects configurations and software in transit. NAT changes address representation. DNS tells applications where to connect. IPsec protects traffic across an untrusted path. ACLs and Layer 2 controls decide which traffic is accepted, rejected, limited, or trusted.

<div class="article-callout">
  <p><strong>Use this guide for v2.0.</strong> Cisco says the 200-301 v2.0 exam begins February 3, 2027. Candidates testing through February 2, 2027 should use the active v1.1 blueprint for exam-specific coverage.</p>
</div>

<h2 id="domain-map">Domain 4 objective map</h2>

<div class="table-scroll" role="region" aria-label="CCNA v2.0 Domain 4 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main skill</th>
        <th scope="col">Useful question</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Objective">4.1</td><td data-label="Main skill">Local users and AAA clients</td><td data-label="Useful question">Who verifies the administrator, what happens if the server is unavailable, and which authorization or accounting decision follows?</td></tr>
      <tr><td data-label="Objective">4.2</td><td data-label="Main skill">Secure file transfer</td><td data-label="Useful question">Can the device reach and authenticate to the secure server, and is the source or destination file path correct?</td></tr>
      <tr><td data-label="Objective">4.3</td><td data-label="Main skill">NAT and PAT</td><td data-label="Useful question">Which inside address should be translated, which rule should match it, and does a translation appear when traffic crosses the boundary?</td></tr>
      <tr><td data-label="Objective">4.4</td><td data-label="Main skill">DNS record diagnosis</td><td data-label="Useful question">Which record type must exist for this host, web application, or mail flow, and what answer does the resolver actually return?</td></tr>
      <tr><td data-label="Objective">4.5</td><td data-label="Main skill">IPsec VPN concepts</td><td data-label="Useful question">Are individual users or entire networks being connected, and which IPsec component negotiates or protects the traffic?</td></tr>
      <tr><td data-label="Objective">4.6</td><td data-label="Main skill">IPv4 ACLs</td><td data-label="Useful question">Which line matches first, what does the implicit deny do, and where is the ACL applied?</td></tr>
      <tr><td data-label="Objective">4.7</td><td data-label="Main skill">Layer 2 security</td><td data-label="Useful question">Which source, message, address binding, traffic rate, or learned MAC state should the switch trust?</td></tr>
    </tbody>
  </table>
</div>

<h2 id="service-security-model">Use one model across services and controls</h2>

For each Domain 4 technology, identify four things:

1. **Trust boundary:** Which interface, server, address range, user database, or uplink is trusted?
2. **Match or trigger:** Which username, packet field, DNS record, translation rule, message type, or traffic level activates the behavior?
3. **Resulting state:** What should appear in an authentication result, translation table, ACL counter, DHCP binding table, secure MAC table, or log?
4. **Failure symptom:** What would the user or administrator observe if the trust decision, rule, or state were wrong?

This keeps security study practical. A command matters because it creates or verifies a specific decision, not because the letters look familiar.

<h2 id="aaa">Local usernames and Authentication, Authorization, and Accounting (AAA)</h2>

AAA separates three questions:

- **Authentication:** Who are you?
- **Authorization:** What are you allowed to do?
- **Accounting:** What activity should be recorded?

A local username gives the device its own identity database. A centralized AAA server allows several devices to use a common administrative policy.

### Local login

A basic local administrative account and Secure Shell (SSH) login could look like this:

```text
username netadmin privilege 15 secret <strong-secret>
!
aaa new-model
aaa authentication login default local
!
line vty 0 4
 login authentication default
 transport input ssh
```

The `secret` form protects the stored credential better than a clear-text password. The virtual terminal (VTY) lines use the named AAA method list, and `transport input ssh` prevents Telnet access on those lines.

Verify the configuration and actual login path:

```text
show running-config | section aaa
show running-config | section line vty
show users
show ssh
```

Do not remove a working recovery path until the replacement authentication method has been tested from another session.

### TACACS+ and RADIUS as device-management AAA services

Terminal Access Controller Access-Control System Plus (TACACS+) and Remote Authentication Dial-In User Service (RADIUS) can both centralize AAA. For CCNA, focus on the client relationship and method list rather than memorizing a complete server deployment.

A TACACS+ client example:

```text
tacacs server TAC1
 address ipv4 192.0.2.10
 key <shared-secret>
!
aaa authentication login default group tacacs+ local
aaa authorization exec default group tacacs+ local if-authenticated
```

A RADIUS client example:

```text
radius server RAD1
 address ipv4 192.0.2.20 auth-port 1812 acct-port 1813
 key <shared-secret>
!
aaa authentication login default group radius local
```

The order in a method list matters. `group tacacs+ local` or `group radius local` tries the centralized service first and then uses the local database when the server method cannot respond. A server that deliberately rejects valid communication is different from a server that is unreachable. Do not assume every failed centralized login automatically falls through to local authentication.

Useful checks include:

```text
show aaa servers
show radius statistics
show logging
```

A strong lab test uses two sessions. Keep one privileged session open while testing the new AAA method from another connection.

<h2 id="file-transfer">Secure file transfer with SFTP and SCP</h2>

SSH File Transfer Protocol (SFTP) and Secure Copy Protocol (SCP) protect file transfer with SSH. CCNA v2.0 includes management of configuration and software files through these secure operations.

Common tasks include:

- Copying the running configuration to a protected server
- Restoring a saved configuration
- Uploading or downloading an IOS XE software image
- Confirming available storage before moving a large file
- Verifying the copied file after transfer

Examples using the IOS XE `copy` workflow:

```text
copy running-config sftp://backupuser@192.0.2.50/router1-running.cfg
copy sftp://backupuser@192.0.2.50/cat9k_iosxe.bin flash:
copy running-config scp://backupuser@192.0.2.50/router1-running.cfg
```

Before blaming the transfer protocol, verify the path and local storage:

```text
ping 192.0.2.50
show ip route 192.0.2.50
show file systems
dir flash:
show logging
```

A failed copy can come from routing, DNS, authentication, authorization, an incorrect transfer address or path, insufficient storage, or a server-side problem. The word “secure” does not remove ordinary reachability requirements.

<h2 id="nat-pat">Network Address Translation (NAT) and Port Address Translation (PAT)</h2>

NAT changes address information as traffic crosses a translation boundary. PAT, also called NAT overload, allows many inside connections to share a smaller number of global addresses by also tracking transport-layer ports.

Keep the address terms straight:

<div class="table-scroll" role="region" aria-label="NAT address terminology" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Term</th>
        <th scope="col">Meaning</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Term"><strong>Inside local</strong></td><td data-label="Meaning">The inside host address as it appears inside the network.</td><td data-label="Example"><code>10.10.10.25</code></td></tr>
      <tr><td data-label="Term"><strong>Inside global</strong></td><td data-label="Meaning">The translated address representing that inside host externally.</td><td data-label="Example"><code>203.0.113.25</code></td></tr>
      <tr><td data-label="Term"><strong>Outside global</strong></td><td data-label="Meaning">The outside host address as it appears globally.</td><td data-label="Example"><code>198.51.100.80</code></td></tr>
      <tr><td data-label="Term"><strong>Outside local</strong></td><td data-label="Meaning">The outside host address as it appears to the inside network, often the same as the outside global address.</td><td data-label="Example"><code>198.51.100.80</code></td></tr>
    </tbody>
  </table>
</div>

### Static NAT

Static NAT creates a fixed one-to-one mapping:

```text
ip nat inside source static 10.10.10.10 203.0.113.10
```

This is useful when an inside service must be represented consistently by a known global address.

### Dynamic NAT and PAT overload

A common PAT configuration marks the inside and outside interfaces, identifies eligible inside addresses, and overloads the outside interface address:

```text
interface GigabitEthernet0/0/0
 ip nat inside
!
interface GigabitEthernet0/0/1
 ip nat outside
!
access-list 10 permit 10.10.0.0 0.0.255.255
ip nat inside source list 10 interface GigabitEthernet0/0/1 overload
```

The ACL in this configuration identifies addresses eligible for translation. It is not being applied to an interface as a packet-filtering ACL.

Verify while generating matching traffic:

```text
show ip nat translations
show ip nat statistics
show access-lists 10
show ip interface brief
```

If the translation table stays empty, check whether:

- The test traffic actually crosses from an `ip nat inside` interface to an `ip nat outside` interface.
- The source address matches the NAT ACL.
- The route sends the packet through the expected outside interface.
- Another policy blocks the packet before it reaches the translation point.

A translation entry proves that NAT matched traffic. It does not prove that the remote application replied or that the return path is healthy.

<h2 id="dns">Diagnose Domain Name System (DNS) records</h2>

DNS problems often look like application problems because the application starts with a name. Test the address path and the name-resolution path separately.

<div class="table-scroll" role="region" aria-label="CCNA v2.0 DNS record types" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Record</th>
        <th scope="col">Purpose</th>
        <th scope="col">Common symptom when wrong</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Record"><strong>A (address)</strong></td><td data-label="Purpose">Maps a name to an IPv4 address.</td><td data-label="Common symptom when wrong">IPv4 clients reach the wrong host or cannot resolve the service.</td></tr>
      <tr><td data-label="Record"><strong>AAAA (IPv6 address)</strong></td><td data-label="Purpose">Maps a name to an IPv6 address.</td><td data-label="Common symptom when wrong">IPv6-capable clients attempt a broken or incorrect IPv6 path.</td></tr>
      <tr><td data-label="Record"><strong>CNAME (canonical name)</strong></td><td data-label="Purpose">Makes one name an alias of another canonical name.</td><td data-label="Common symptom when wrong">The alias points to a missing or incorrect target.</td></tr>
      <tr><td data-label="Record"><strong>MX (mail exchange)</strong></td><td data-label="Purpose">Identifies mail exchangers for a domain, with preference values.</td><td data-label="Common symptom when wrong">Other mail systems cannot locate the correct receiving server.</td></tr>
      <tr><td data-label="Record"><strong>NS (name server)</strong></td><td data-label="Purpose">Identifies authoritative name servers for a zone.</td><td data-label="Common symptom when wrong">Delegation or authoritative answers fail.</td></tr>
      <tr><td data-label="Record"><strong>PTR (pointer)</strong></td><td data-label="Purpose">Maps an address back to a name for reverse lookup.</td><td data-label="Common symptom when wrong">Reverse-name checks fail or return an unexpected identity.</td></tr>
    </tbody>
  </table>
</div>

Useful client-side checks include:

```text
nslookup app.example.test
nslookup -type=AAAA app.example.test
nslookup -type=CNAME portal.example.test
nslookup -type=MX example.test
nslookup -type=NS example.test
nslookup 192.0.2.80
```

On systems with `dig`, request the specific record type rather than relying on a default query:

```text
dig A app.example.test
dig AAAA app.example.test
dig MX example.test
dig -x 192.0.2.80
```

A practical diagnosis sequence is:

1. Resolve the name and inspect the returned record.
2. Compare the answer with the intended service address or target.
3. Test reachability to the returned address.
4. Test the application on the correct transport and port.
5. Consider resolver cache or propagation only after confirming the authoritative data.

If a website works by IP address but not by name, routing may be healthy while DNS is wrong. If the name resolves correctly but the application still fails, continue with reachability, ACL, NAT, service, and return-path checks.

<h2 id="ipsec">Internet Protocol Security (IPsec) VPN concepts</h2>

A VPN protects traffic across an untrusted network. CCNA v2.0 asks you to describe IPsec remote-access and site-to-site VPNs, including protocols and transport modes.

### Remote access vs. site to site

- **Remote-access VPN:** Connects an individual user or endpoint to an organization. The client usually receives protected access to selected internal resources.
- **Site-to-site VPN:** Connects networks through VPN gateways. Hosts behind each gateway can communicate across the protected tunnel without each host operating the tunnel directly.

### IKE, ESP, and AH

Internet Key Exchange (IKE) negotiates security parameters and creates the security associations used by IPsec peers.

Encapsulating Security Payload (ESP) can provide confidentiality through encryption, along with integrity and authentication. Authentication Header (AH) provides integrity and source authentication but does not encrypt the payload. In modern deployments, ESP is far more common.

### Tunnel and transport modes

- **Tunnel mode:** Protects the entire original IP packet and adds a new outer IP header. This fits gateway-to-gateway site-to-site VPNs.
- **Transport mode:** Protects the upper-layer payload while retaining the original IP header as the outer header. This is more commonly associated with host-to-host protection or as a component inside another tunnel design.

Do not confuse the mode with the use case. Remote access and site to site describe who or what is connected. Tunnel and transport describe how IPsec encapsulates protected traffic.

When troubleshooting conceptually, separate:

1. Underlay reachability between the VPN peers
2. IKE negotiation
3. IPsec security association formation
4. Selection of traffic that should enter the tunnel
5. Routing and policy on both sides

A tunnel can be negotiated while the wrong traffic selector, route, ACL, or return path still prevents the application from working.

<h2 id="ipv4-acls">IPv4 access control lists (ACLs)</h2>

An ACL is an ordered list of permit and deny entries. IOS evaluates entries from top to bottom and stops at the first match. If no entry matches, the implicit `deny any` at the end applies.

<div class="table-scroll" role="region" aria-label="Standard and extended IPv4 ACL comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">ACL type</th>
        <th scope="col">Can match</th>
        <th scope="col">Typical placement guideline</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="ACL type"><strong>Standard</strong></td><td data-label="Can match">Source IPv4 address</td><td data-label="Typical placement guideline">Closer to the destination, because the rule cannot distinguish among destination services.</td></tr>
      <tr><td data-label="ACL type"><strong>Extended</strong></td><td data-label="Can match">Protocol, source, destination, and transport ports where applicable</td><td data-label="Typical placement guideline">Closer to the source, so unwanted traffic can be stopped earlier.</td></tr>
    </tbody>
  </table>
</div>

Numbered and named ACLs describe how the list is identified. Standard and extended describe what the entries can match.

### Standard named ACL

```text
ip access-list standard MGMT-SOURCES
 permit 10.10.50.0 0.0.0.255
 deny any log
!
line vty 0 4
 access-class MGMT-SOURCES in
```

This ACL permits management connections from one source subnet. Because it is standard, it does not distinguish SSH from another transport. The line configuration controls where the list is used.

### Extended named ACL

```text
ip access-list extended WEB-IN
 permit tcp 10.20.0.0 0.0.255.255 host 192.0.2.80 eq 443
 deny ip any host 192.0.2.80 log
!
interface GigabitEthernet0/0/0
 ip access-group WEB-IN in
```

This list permits Hypertext Transfer Protocol Secure (HTTPS) traffic from a source range to one server, then explicitly logs other IP traffic to that server. Traffic matching no entry still reaches the implicit deny.

### Wildcard masks

ACLs use wildcard masks in many IOS IPv4 commands:

```text
10.20.0.0 0.0.255.255
```

A wildcard bit of `0` means the corresponding address bit must match. A wildcard bit of `1` means it can vary. For a contiguous subnet, subtract the subnet mask from `255.255.255.255`.

### Verification

```text
show access-lists
show ip access-lists
show ip interface GigabitEthernet0/0/0
show running-config | section access-list
```

Counters help prove which entry matches traffic. A zero counter can mean no traffic matched, the ACL is applied in the wrong place or direction, or an earlier entry already matched it.

When troubleshooting, write the packet as a tuple before reading the ACL:

```text
protocol | source IP | source port | destination IP | destination port
```

Then walk the ACL from the top. Do not start with the line you hope will match.

<h2 id="dhcp-snooping">Dynamic Host Configuration Protocol (DHCP) snooping</h2>

DHCP snooping controls where DHCP server messages may enter the switched network and builds a binding table from observed address assignments.

The trust model is the key:

- **Trusted port:** Expected path toward a legitimate DHCP server or relay.
- **Untrusted port:** Client-facing port where server replies should not originate.

A basic configuration can enable snooping globally, select VLANs, and trust the infrastructure uplink:

```text
ip dhcp snooping
ip dhcp snooping vlan 10,20
!
interface GigabitEthernet1/0/48
 ip dhcp snooping trust
```

Verify:

```text
show ip dhcp snooping
show ip dhcp snooping binding
show ip dhcp snooping statistics
```

Trust only the path that should carry legitimate server replies. Trusting a client-facing port defeats the control and can allow a rogue DHCP server to respond there.

<h2 id="dai">Dynamic ARP Inspection (DAI)</h2>

Dynamic ARP Inspection (DAI) validates Address Resolution Protocol (ARP) messages against trusted address-binding information, commonly the DHCP snooping binding table.

A basic VLAN configuration and trusted uplink can look like this:

```text
ip arp inspection vlan 10,20
!
interface GigabitEthernet1/0/48
 ip arp inspection trust
```

Verify:

```text
show ip arp inspection
show ip arp inspection interfaces
show ip arp inspection statistics
show ip dhcp snooping binding
```

DAI and DHCP snooping are related but solve different problems. DHCP snooping validates the address-assignment path and creates bindings. DAI uses trusted information to validate ARP behavior.

Static-address devices need deliberate treatment because they may not appear in the DHCP snooping database. Depending on the design, ARP ACLs or other supported bindings may be required. Do not “fix” DAI by trusting every access port.

<h2 id="storm-control">Storm control</h2>

Storm control monitors selected traffic levels on an interface and suppresses traffic when configured thresholds are exceeded. It can protect the switch and attached network from broadcast, multicast, or unknown-unicast storms.

A platform-supported percentage example might look like:

```text
interface GigabitEthernet1/0/10
 storm-control broadcast level 1.00 0.50
 storm-control multicast level 1.00 0.50
```

The first value is the rising threshold and the second is the falling threshold. Exact options and behavior vary by platform and software release, so verify the command support on the device used in the lab.

Useful checks include:

```text
show storm-control
show storm-control interface GigabitEthernet1/0/10
show logging
```

Storm control is not a substitute for finding the loop, malfunction, or attack that caused the excessive traffic. It limits the impact while you investigate the source.

<h2 id="ra-guard">IPv6 Router Advertisement (RA) Guard</h2>

IPv6 hosts use Router Advertisement (RA) messages to learn information such as available routers and prefixes. RA Guard blocks or validates unwanted RA messages on Layer 2 ports so an untrusted host cannot present itself as the local IPv6 router.

A policy-based IOS XE example:

```text
ipv6 nd raguard policy HOST-PORT
 device-role host
!
interface GigabitEthernet1/0/10
 ipv6 nd raguard attach-policy HOST-PORT
```

Verify:

```text
show ipv6 nd raguard policy
show running-config interface GigabitEthernet1/0/10
show logging
```

The design principle is the same as DHCP snooping: client-facing ports should not be trusted to originate infrastructure control messages. Apply the policy according to the expected role of the attached device.

<h2 id="port-security">Port security</h2>

Port security limits which Media Access Control (MAC) addresses may use a switchport and defines the response to a violation.

A basic access-port example:

```text
interface GigabitEthernet1/0/10
 switchport mode access
 switchport access vlan 20
 switchport port-security
 switchport port-security maximum 2
 switchport port-security mac-address sticky
 switchport port-security violation restrict
```

The common violation modes are:

- **Protect:** Drops violating traffic without shutting the port; visibility is limited.
- **Restrict:** Drops violating traffic and increments counters or generates notifications, depending on platform behavior.
- **Shutdown:** Places the port into an error-disabled state after a violation; this is the default on many platforms.

Verify:

```text
show port-security
show port-security interface GigabitEthernet1/0/10
show mac address-table interface GigabitEthernet1/0/10
show interfaces status err-disabled
```

Sticky learning adds learned secure MAC addresses to the running configuration. Save the configuration deliberately if those learned entries should survive a reload.

Port security is best suited to stable edge-port expectations. It is a poor fit for an uplink or virtualized host carrying many legitimate MAC addresses unless the design explicitly accounts for them.

<h2 id="integrated-scenario">Integrated troubleshooting scenario: PAT is configured, but users still cannot browse</h2>

Clients in `10.20.0.0/24` can reach their inside default gateway and the router can reach an internet test address from its outside interface. Users still cannot browse externally.

### 1. Prove the route and interfaces

```text
show ip interface brief
show ip route 0.0.0.0
```

The inside and outside interfaces are up, and a default route exists.

### 2. Generate traffic and inspect translations

```text
show ip nat translations
show ip nat statistics
```

No translation appears while a client sends traffic. That makes the NAT match path a stronger lead than DNS at this moment.

### 3. Inspect the NAT rule and match ACL

```text
show running-config | include ip nat
show access-lists 10
```

The configuration contains:

```text
access-list 10 permit 10.10.0.0 0.0.255.255
ip nat inside source list 10 interface GigabitEthernet0/0/1 overload
```

The clients are in `10.20.0.0/24`, but ACL 10 matches `10.10.0.0/16`. The client source never qualifies for translation.

### 4. Correct and prove the result

After correcting the intended source match, generate traffic again and check:

```text
show access-lists 10
show ip nat translations
show ip nat statistics
```

The ACL counter and translation entry now increase. Test an external IP address first, then a DNS name. That sequence separates translation and routed reachability from DNS.

This scenario shows why “NAT is configured” is not enough. Interfaces, source matching, traffic direction, and translation state all have to agree.

<h2 id="common-traps">Common Domain 4 traps</h2>

### Treating local fallback as “try the next method after any failure”

AAA fallback depends on the result returned by the method. A rejected credential is not the same as an unavailable server.

### Assuming a successful secure copy proves the image is usable

Verify the destination, available storage, file size, and supported integrity check before changing the boot configuration.

### Reading a NAT ACL as though it were automatically filtering an interface

A NAT match ACL identifies eligible addresses. It filters packets only when separately applied as an interface ACL or used by another feature.

### Diagnosing DNS before checking the returned record

Ask for the specific record type and compare the answer with the intended service. “DNS is up” is not proof that the A, AAAA, CNAME, MX, NS, or PTR data is correct.

### Forgetting ACL order and the implicit deny

The first matching entry wins. A correct permit below a broader deny never gets a chance to match.

### Trusting every uplink-looking port

DHCP snooping and DAI trust should follow the actual infrastructure path. A mislabeled or repurposed port can turn broad trust into a security hole.

### Applying edge controls without checking the attached device

Port security and RA Guard assumptions differ for a desktop, access point, IP phone, virtualized host, or downstream switch. Match the control to the port role.

<h2 id="rapid-review">Rapid review</h2>

- AAA separates authentication, authorization, and accounting.
- Local users provide a device-resident identity source and a possible recovery method.
- TACACS+ and RADIUS centralize AAA; method-list order and server response matter.
- SFTP and SCP protect file transfer with SSH but still depend on routing, authentication, authorization, storage, and correct paths.
- NAT changes addresses; PAT overload also distinguishes concurrent flows with ports.
- `show ip nat translations` proves translation state only when matching traffic is generated.
- A and AAAA map names to IPv4 and IPv6 addresses; CNAME creates an alias; MX identifies mail exchangers; NS identifies authoritative servers; PTR supports reverse lookup.
- IKE negotiates IPsec security associations; ESP commonly protects traffic with encryption and integrity.
- Tunnel mode protects the original packet inside a new outer packet; transport mode protects the payload while retaining the original outer IP header.
- Standard ACLs match source IPv4 addresses; extended ACLs can match protocol, source, destination, and ports.
- ACLs are processed top to bottom, first match wins, and an implicit deny ends the list.
- DHCP snooping establishes trust for DHCP messages and builds bindings.
- DAI validates ARP against trusted information such as DHCP snooping bindings.
- Storm control limits excessive broadcast, multicast, or unknown-unicast traffic.
- RA Guard blocks unwanted IPv6 router advertisements on ports that should not provide router services.
- Port security limits learned secure MAC addresses and applies a violation response.

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco IOS XE TACACS+ configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-cfg-tacacs-0.html)
- [Cisco IOS XE RADIUS configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/radius/radius-configuration-guide/radius.html)
- [Cisco IOS XE SFTP configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_ssh-configuring-sftp-username-and-password.html)
- [Cisco IOS XE Secure Copy configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/security-vpn/security-vpn/m_sec-usr-ssh-sec-copy-0.html)
- [Cisco IOS XE NAT configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_iadnat-addr-consv-xe.html)
- [Cisco DNS configuration and troubleshooting guidance](https://www.cisco.com/c/en/us/support/docs/ip/domain-name-system-dns/24182-reversedns.html)
- [Cisco IOS XE IPsec configuration guide](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/sec-vpn/b-security-vpn/m_sec-cfg-vpn-ipsec-0.html)
- [Cisco IOS XE IPv4 ACL configuration](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/security/acls/acls-configuration-guide/access-control-lists.html)
- [Cisco IOS XE DHCP snooping](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/dhcp-snooping.html)
- [Cisco IOS XE Dynamic ARP Inspection](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/sec-crypto/fhs-sisf/fhs-and-sisf-configuration-guide/dynamic-arp-inspection.html)
- [Cisco IOS XE storm control](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/flowcontrol-stormcontrol/flow-control-and-storm-control-configuration-guide/m-storm-control.html)
- [Cisco IOS XE IPv6 RA Guard](https://www.cisco.com/c/en/us/td/docs/routers/ios-xe/security-vpn/security-vpn/m_ip6-ra-guard.html)
- [Cisco IOS XE port security](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-14/configuration_guide/sec/b_1714_sec_9300_cg/port_security.html)
