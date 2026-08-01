---
layout: layouts/article.njk
title: CCNA 200-301 v2.0 Study Guide
description: Study the five CCNA 200-301 v2.0 domains with a practical focus on configuration, verification, troubleshooting, routing, switching, security, and operations.
permalink: /ccna/200-301-v2/study-guide/
ogType: article
printable: true
printTitle: CCNA 200-301 v2.0 Study Guide
author: certHappens
datePublished: 2026-07-31
dateModified: 2026-08-01
articleSection: CCNA 200-301 v2.0
eyebrow: CCNA v2.0 study guide
lede: Build the network, verify what it is doing, then troubleshoot from evidence. The v2.0 blueprint rewards that cycle across routing, switching, services, security, wireless, automation, and operations.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
toc:
  - id: version-check
    label: Choose the right blueprint
  - id: how-to-use
    label: How to use this guide
  - id: domain-map
    label: Five-domain map
  - id: domain-1
    label: Network Infrastructure and Connectivity
  - id: domain-2
    label: Switching and Network Access
  - id: domain-3
    label: IP Routing
  - id: domain-4
    label: Network Services and Security
  - id: domain-5
    label: AI and Network Operations
  - id: command-output
    label: Study command output
  - id: lab-loop
    label: A practical lab loop
  - id: readiness
    label: Readiness checklist
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0
  - CCNA study guide
  - Cisco networking
  - Cisco IOS
  - CCNA troubleshooting
  - CCNA v2.0 domains
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Look up the full expansion and practical meaning of CCNA networking abbreviations used throughout the guides.
  - title: "Domain 1: Network Infrastructure and Connectivity"
    url: /ccna/200-301-v2/study-guide/network-infrastructure-connectivity/
    description: Diagnose links, addressing, wireless clients, virtualization, IPv4, IPv6, and DHCPv4 with a practical troubleshooting sequence.
  - title: "Domain 2: Switching and Network Access"
    url: /ccna/200-301-v2/study-guide/switching-network-access/
    description: Configure and troubleshoot trunks, LACP EtherChannel, SVIs, edge ports, neighbor discovery, and Rapid PVST+.
  - title: "Domain 3: IP Routing"
    url: /ccna/200-301-v2/study-guide/ip-routing/
    description: Interpret routing tables, troubleshoot static routes, configure single-area OSPFv2 and OSPFv3, and read HSRP and VRRP state.
  - title: "Domain 4: Network Services and Security"
    url: /ccna/200-301-v2/study-guide/network-services-security/
    description: Configure AAA, secure file transfer, NAT and PAT, IPv4 ACLs, and Layer 2 security while diagnosing DNS and IPsec behavior.
  - title: "Domain 5: AI, Network Operations, and Management"
    url: /ccna/200-301-v2/study-guide/ai-network-operations-management/
    description: Use AI prompts, management approaches, SNMP, Ansible, and syslog to collect and interpret operational evidence.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose the command that exposes the state you need to verify before changing configuration.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Rebuild masks, boundaries, host ranges, wildcard masks, and VLSM decisions from a repeatable method.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check subnet boundaries and address roles after working the calculation manually.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Review common services, transports, secure alternatives, and protocols that do not use TCP or UDP ports.
  - title: CCNA 200-301 Overview
    url: /ccna/
    description: Review the v1.1 to v2.0 transition and decide which blueprint matches your intended test date.
---
CCNA v2.0 expects more than recognizing networking terms. Cisco's published objectives repeatedly use verbs such as **diagnose, troubleshoot, configure, validate, interpret, select, and use**. A useful study session should therefore end with something you can inspect: interface state, a routing table, a neighbor relationship, a configuration fragment, a packet exchange, a log message, or a failed path you can explain.

The five domains overlap heavily. A trunk problem can appear to be an IP problem. A missing route can look like an access control list (ACL) failure. A Dynamic Host Configuration Protocol (DHCP) relay issue can leave a perfectly healthy switchport attached to a client that still has no usable address. Treat the blueprint as one network rather than five disconnected lists.

<h2 id="version-check">Choose the right blueprint for your test date</h2>

Cisco has published the **200-301 CCNA v2.0** topics for exams beginning **February 3, 2027**. The current v1.1 exam remains available through **February 2, 2027**.

<div class="article-callout">
  <p><strong>Testing by February 2, 2027?</strong> Use the current v1.1 blueprint for exam-specific coverage. <strong>Testing February 3, 2027 or later?</strong> This guide follows the published v2.0 blueprint.</p>
</div>

Many core skills carry across both versions. Subnetting, switching, routing, wireless, security, and network operations remain useful regardless of the test date. The version check matters because the organization and depth of the objectives change.

<h2 id="how-to-use">How to use this guide</h2>

For each objective, build four kinds of fluency:

1. **Explain it.** Describe what the technology does and where it fits in the traffic path.
2. **Configure it.** Enter the small set of commands needed when the blueprint expects configuration.
3. **Verify it.** Know which command, table, log, or client-side observation proves the intended state.
4. **Troubleshoot it.** Recognize the symptom produced when one part is wrong and choose the next useful check.

Suppose you are studying DHCP relay. Memorizing `ip helper-address` is not enough. You should also know why the relay is needed across a routed boundary, which client-facing interface receives the broadcast, how the server identifies the requesting subnet, which command confirms leases on an IOS DHCP server, and what a client looks like when the exchange fails.

The same approach applies to switching and routing. If you configure a trunk, inspect the operational trunk state. If you configure Open Shortest Path First (OSPF), verify the adjacency and then the learned route. If you configure an ACL, check both the rule order and where the ACL is applied.

<h2 id="domain-map">The five CCNA v2.0 domains</h2>

<div class="table-scroll" role="region" aria-label="CCNA 200-301 v2.0 domain map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Domain</th>
        <th scope="col">Weight</th>
        <th scope="col">What the work looks like</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Domain"><strong><a href="/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/">1.0 Network Infrastructure and Connectivity</a></strong></td>
        <td data-label="Weight">25%</td>
        <td data-label="What the work looks like">Diagnose links and cabling, troubleshoot IPv4 and IPv6, understand virtualization and wireless behavior, isolate client connectivity faults, and troubleshoot Dynamic Host Configuration Protocol version 4 (DHCPv4).</td>
      </tr>
      <tr>
        <td data-label="Domain"><strong><a href="/ccna/200-301-v2/study-guide/switching-network-access/">2.0 Switching and Network Access</a></strong></td>
        <td data-label="Weight">25%</td>
        <td data-label="What the work looks like">Configure physical interfaces, virtual local area network (VLAN) trunks, Link Aggregation Control Protocol (LACP) EtherChannel, switch virtual interfaces, edge ports, and Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+), then validate topology and operations from device evidence.</td>
      </tr>
      <tr>
        <td data-label="Domain"><strong><a href="/ccna/200-301-v2/study-guide/ip-routing/">3.0 IP Routing</a></strong></td>
        <td data-label="Weight">20%</td>
        <td data-label="What the work looks like">Interpret route selection, troubleshoot IPv4 and IPv6 static routes, configure single-area OSPFv2 and OSPFv3, and interpret first-hop redundancy state.</td>
      </tr>
      <tr>
        <td data-label="Domain"><strong><a href="/ccna/200-301-v2/study-guide/network-services-security/">4.0 Network Services and Security</a></strong></td>
        <td data-label="Weight">20%</td>
        <td data-label="What the work looks like">Configure management authentication, secure file transfer, Network Address Translation (NAT) and Port Address Translation (PAT), IPv4 access control lists (ACLs), and Layer 2 protections while diagnosing Domain Name System (DNS) and virtual private network (VPN) behavior.</td>
      </tr>
      <tr>
        <td data-label="Domain"><strong><a href="/ccna/200-301-v2/study-guide/ai-network-operations-management/">5.0 AI, and Network Operations and Management</a></strong></td>
        <td data-label="Weight">10%</td>
        <td data-label="What the work looks like">Use sound prompts and judgment with artificial intelligence (AI)-assisted operations, compare management approaches, understand Simple Network Management Protocol (SNMP), execute commands through Ansible, and interpret syslog.</td>
      </tr>
    </tbody>
  </table>
</div>

The weights help allocate study time, but they do not create hard walls. `show interfaces` can support Domain 1 link diagnosis and Domain 2 device troubleshooting. Syslog belongs in Domain 5, yet a log message may expose a Domain 2 or Domain 3 fault.

<h2 id="domain-1">Domain 1: Network Infrastructure and Connectivity</h2>

Domain 1 begins at the physical link and continues through endpoint connectivity. Cisco expects you to diagnose copper and fiber problems, understand the network role of hypervisors, virtual machines, and containers, troubleshoot IPv4 and IPv6 addressing, reason about wireless radio frequency (RF) behavior and security, and troubleshoot Dynamic Host Configuration Protocol version 4 (DHCPv4) on IOS devices.

A strong Domain 1 workflow answers questions in this order:

1. Is the physical or wireless link usable?
2. Does the endpoint or interface have the expected address and prefix?
3. Is the destination local or remote from the source's perspective?
4. Is the default gateway or next hop reachable?
5. If addressing is dynamic, did DHCP complete and did the correct scope apply?
6. If wireless is involved, did association and authentication succeed before IP troubleshooting begins?

Read the full [Domain 1: Network Infrastructure and Connectivity guide](/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/) for link counters, cabling clues, IPv4 and IPv6 examples, modified Extended Unique Identifier 64-bit (EUI-64), wireless troubleshooting, endpoint commands, DHCP configuration, and an integrated fault-isolation example.

For subnet calculations, use the [IPv4 Subnetting Reference](/network-plus/n10-009/study-guide/ipv4-subnetting/) and [IPv4 Subnet Calculator](/tools/subnet-calculator/) as supporting tools. Work the calculation manually first, then use the calculator to check it.

<h2 id="domain-2">Domain 2: Switching and Network Access</h2>

Domain 2 moves from a working link to the switching behavior built on top of it. The v2.0 objectives include Layer 2 and Layer 3 physical interfaces, 802.1Q trunks, Layer 2 and Layer 3 Link Aggregation Control Protocol (LACP) port channels, switch virtual interfaces (SVIs), edge-port attributes, Cisco Discovery Protocol (CDP) and Link Layer Discovery Protocol (LLDP) validation, troubleshooting from operational evidence, and Rapid Per-VLAN Spanning Tree Plus (Rapid PVST+).

Build the concepts around observable state:

- A virtual local area network (VLAN) existing in the database does not prove that a host port belongs to it.
- An administratively configured trunk does not prove that the interface is operationally trunking.
- An EtherChannel configuration does not prove that every member joined the bundle.
- A healthy physical link does not prove that spanning tree is forwarding on it.
- Network documentation can be wrong. CDP and LLDP give you live neighbor evidence to compare with the diagram.

Useful verification commands include `show vlan brief`, `show interfaces switchport`, `show interfaces trunk`, `show etherchannel summary`, `show spanning-tree`, `show cdp neighbors`, and `show lldp neighbors`.

Read the full [Domain 2: Switching and Network Access guide](/ccna/200-301-v2/study-guide/switching-network-access/) for Layer 2 and Layer 3 interfaces, trunk configuration, LACP EtherChannel, SVIs, edge-host ports, neighbor validation, troubleshooting evidence, and Rapid PVST+.

Use the [Cisco IOS Verification and Troubleshooting Commands](/ccna/commands/) reference to connect each command to the question it answers. The [VLANs, Trunks, Spanning Tree Protocol (STP), and LACP quick review](/network-plus/quick-review/vlans-trunks-stp-lacp/) is useful when the Layer 2 concepts need a vendor-neutral refresher before you return to Cisco configuration.

<h2 id="domain-3">Domain 3: IP Routing</h2>

Routing questions become much easier when you separate **route presence** from **route selection**.

A routing table entry gives you a candidate path. Forwarding still depends on the destination matching that prefix, the next hop or exit interface being usable, and a valid return path existing when the application requires two-way communication.

For every routing table line, practice identifying:

- Route source
- Destination prefix and mask
- Administrative distance when shown
- Metric when shown
- Next hop
- Exit interface
- Whether a more-specific match exists

The longest matching prefix determines the forwarding choice among matching routes. A default route is therefore a fallback, not a command to ignore more-specific entries.

The v2.0 scope also includes IPv4 and IPv6 default, network, host, and floating static routes; single-area Open Shortest Path First version 2 (OSPFv2) for IPv4; version 3 (OSPFv3) for IPv6; and operational interpretation of Hot Standby Router Protocol (HSRP) and Virtual Router Redundancy Protocol (VRRP).

A good routing lab does not end when a route appears. Verify the neighbor when a routing protocol is involved, inspect the routing table, test the path, then deliberately break one condition and use the evidence to locate it.

Read the full [Domain 3: IP Routing guide](/ccna/200-301-v2/study-guide/ip-routing/) for route-table interpretation, IPv4 and IPv6 static routes, floating statics, single-area OSPFv2 and OSPFv3, broadcast and point-to-point behavior, and HSRP/VRRP operational state.

<h2 id="domain-4">Domain 4: Network Services and Security</h2>

Domain 4 combines services that make the network usable with controls that decide who may manage or cross it.

The v2.0 blueprint includes:

- Local usernames and authentication, authorization, and accounting (AAA) client configuration with Terminal Access Controller Access-Control System Plus (TACACS+) and Remote Authentication Dial-In User Service (RADIUS)
- Secure Shell (SSH) File Transfer Protocol (SFTP) and Secure Copy Protocol (SCP) for secure file transfer
- Network Address Translation (NAT) and Port Address Translation (PAT) on IOS XE routers
- Domain Name System (DNS) record diagnosis for A, AAAA, CNAME, MX, NS, and PTR records
- Remote-access and site-to-site Internet Protocol Security (IPsec) virtual private network (VPN) concepts
- Standard, extended, numbered, and named IPv4 access control lists (ACLs)
- Dynamic Host Configuration Protocol (DHCP) snooping; Address Resolution Protocol (ARP) validation through Dynamic ARP Inspection (DAI); storm control; Router Advertisement guard; and port security

Study these by following traffic. An ACL is an ordered decision applied to traffic at a specific interface and direction. NAT changes address representation at a translation boundary. DHCP snooping builds trust around address assignment. Dynamic ARP Inspection uses trusted information to reject invalid ARP behavior. The control makes more sense when you can describe the packet or frame it is evaluating.

Read the full [Domain 4: Network Services and Security guide](/ccna/200-301-v2/study-guide/network-services-security/) for local and centralized AAA, secure file transfer, NAT/PAT, DNS record troubleshooting, IPsec VPN concepts, IPv4 ACLs, DHCP snooping, Dynamic ARP Inspection, storm control, RA Guard, and port security.

The [Common Ports and Protocols Reference](/ports-protocols/) is useful for services such as DNS, TACACS+, RADIUS, SSH-based file transfer, and other management traffic.

<h2 id="domain-5">Domain 5: AI, and Network Operations and Management</h2>

The smallest weighted domain still affects how modern networks are operated. Cisco's v2.0 objectives include agentic artificial intelligence (AI), prompt selection for generative AI, device-, cloud-, controller-, automation-, and infrastructure-as-code management approaches, Simple Network Management Protocol (SNMP), Ansible, and syslog.

Keep the work evidence-based:

- AI can organize or recommend, but device state and approved network information remain the source of truth.
- A prompt should respect data classification and clearly define the persona, instructions, evidence, and output format.
- Centralized management shows intended state, but direct verification proves realized state.
- SNMP polling and notifications expose operational measurements and events.
- Ansible can execute the same verification commands across an inventory of devices.
- Syslog severity, facility, mnemonic, timestamp, and message text help explain what changed.

Read the full [Domain 5: AI, Network Operations, and Management guide](/ccna/200-301-v2/study-guide/ai-network-operations-management/) for agentic AI boundaries, prompt selection, management models, SNMP components, an Ansible command-collection example, syslog severity levels, and an integrated operations workflow.

<h2 id="command-output">Treat command output as study material</h2>

Configuration syntax matters, but troubleshooting depends on recognizing what the device is telling you after the configuration exists.

When reviewing output, ask:

1. **What state is being shown?** Interface, VLAN, route, neighbor, policy, lease, translation, or log event?
2. **What would healthy look like?** Know the expected baseline before deciding the output is wrong.
3. **Which field is the strongest clue?** Avoid reacting to every counter or line equally.
4. **What check would confirm the theory?** Choose the next command before proposing a change.

The [CCNA IOS command reference](/ccna/commands/) is organized around those questions. It is more useful to know why you need `show interfaces trunk` than to recite it without knowing what the output proves.

<h2 id="lab-loop">A practical CCNA lab loop</h2>

Use the same small loop repeatedly:

### 1. Build one behavior

Configure a VLAN and access port, a trunk, an EtherChannel, a static route, an OSPF adjacency, a DHCP pool, an ACL, or another single feature.

### 2. Verify before breaking it

Capture the healthy output. Save the relevant `show` commands and identify which fields prove success.

### 3. Break one thing

Change one variable: wrong VLAN, missing allowed VLAN, shutdown interface, wrong prefix, bad static next hop, mismatched OSPF condition, incorrect helper address, or ACL in the wrong direction.

### 4. Diagnose without looking at the answer

Start from the symptom. Use as few commands as practical to narrow the fault. Record which observation changed your theory.

### 5. Repair and prove recovery

Restore the intended configuration and run the same verification used in the healthy baseline. A fix is stronger when you can show what changed in the evidence.

<div class="article-callout">
  <p><strong>Lab habit:</strong> save both the healthy and broken output. Learning what normal looks like makes abnormal output much easier to recognize under exam pressure.</p>
</div>

<h2 id="readiness">Readiness checklist</h2>

You are building useful CCNA v2.0 readiness when you can:

- Read an interface summary and distinguish administrative, physical, and protocol state.
- Explain which cable, optic, speed, duplex, or signal clue could cause a link symptom.
- Calculate an IPv4 subnet and explain whether two addresses are local to each other.
- Read and configure basic IPv6 addressing without treating it as oversized IPv4.
- Separate wireless association, authentication, IP assignment, DNS, and routed reachability when a client cannot connect.
- Trace DHCP through a client, relay, and server.
- Verify VLAN membership, trunk state, EtherChannel membership, and spanning-tree roles from output.
- Interpret a routing table by prefix, source, distance, metric, next hop, and exit interface.
- Verify OSPF neighbors before blaming route selection.
- Explain where NAT, ACLs, AAA, and Layer 2 protections affect traffic.
- Read a syslog message and use it as evidence rather than as a configuration instruction.
- Evaluate AI-assisted recommendations against network state before applying a change.

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco 200-301 CCNA exam page](https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html)
- [Cisco guidance for the v1.1 to v2.0 transition](https://blogs.cisco.com/learning/stay-on-track-get-certified-before-the-ccna-refresh)
- [Cisco IOS XE IPv6 addressing and basic connectivity](https://www.cisco.com/c/en/us/td/docs/ios/ipv6/configuration/guide/ipv6-xe-16-book-cat8000/m_ip6-addrg-bsc-con.html)
- [Cisco IOS XE DHCP server configuration](https://www.cisco.com/c/en/us/td/docs/routers/ios/config/17-x/ip-addressing/b-ip-addressing/m_config-dhcp-server-xe.html)
