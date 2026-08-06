---
layout: layouts/article.njk
title: "Network+ N10-009 Domain 1: Networking Concepts"
description: Learn Network+ N10-009 Domain 1 with clear comparisons for models, devices, cloud, protocols, traffic, media, and IPv4 addressing.
permalink: /network-plus/n10-009/study-guide/networking-concepts/
ogType: article
printable: true
printTitle: "Network+ N10-009 Domain 1: Networking Concepts"
author: certHappens
datePublished: 2026-07-25
dateModified: 2026-08-06
articleSection: Network+ N10-009 Domain 1
eyebrow: Network+ domain 1 guide
lede: Build the mental model that lets you trace traffic, choose the right device or service, and recognize where a network problem begins.
breadcrumbs:
  - label: Home
    url: /
  - label: Network+
    url: /network-plus/
  - label: N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
  - label: Domain 1
    url: /network-plus/n10-009/study-guide/networking-concepts/
toc:
  - id: domain-map
    label: Domain map
  - id: osi-model
    label: OSI model and traffic flow
  - id: devices-functions
    label: Devices and functions
  - id: cloud-concepts
    label: Cloud concepts
  - id: ports-protocols
    label: Ports and protocols
  - id: traffic-types
    label: Traffic types
  - id: media-transceivers
    label: Media and transceivers
  - id: topologies
    label: Topologies and architectures
  - id: ipv4-addressing
    label: IPv4 addressing
  - id: subnetting
    label: Subnetting
  - id: ipv6-addressing
    label: IPv6 addressing
  - id: modern-networks
    label: Modern network environments
  - id: trace-a-session
    label: Trace a complete session
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CompTIA Network+
  - N10-009 Domain 1
  - networking concepts
  - OSI model
  - IPv4 subnetting
  - IPv6 addressing
  - network topologies
relatedLinks:
  - title: Network+ Acronyms and Terms
    url: /network-plus/acronyms/
    description: Look up full expansions, practical meanings, related terms, and the domains where each abbreviation appears.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Practice CIDR masks, host counts, borrowed bits, boundaries, special ranges, and VLSM with worked examples.
  - title: IPv4 Subnet Calculator
    url: /tools/subnet-calculator/
    description: Check subnet boundaries, usable ranges, masks, wildcard masks, binary work, and address status.
  - title: IPv6 Addressing and Prefix Reference
    url: /ipv6-addressing/
    description: Review address compression, common address types, /64 planning, SLAAC, DHCPv6, and Neighbor Discovery.
  - title: IPv6 Address and Prefix Calculator
    url: /tools/ipv6-calculator/
    description: Expand and compress IPv6 addresses, identify common address types, find prefix boundaries, and plan child prefixes.
  - title: Network+ N10-009 Practice Test
    url: /network-plus/n10-009/practice-test/
    description: Apply networking concepts in randomized questions with detailed explanations.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Return to the complete roadmap for all five exam domains.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Search services by port, transport, purpose, and security clue.
  - title: Network+ resource hub
    url: /network-plus/
    description: Find the current practice test, study guides, and shared references.
---
Domain 1 accounts for 23% of the N10-009 exam, but its real importance is larger than the percentage suggests. Addressing, devices, protocols, media, and traffic flow also appear inside implementation, security, operations, and troubleshooting questions.

A scenario may begin with an application symptom and end with a Layer 1 cause. A user cannot reach a cloud service. The client has an address, but the prefix is wrong. The default gateway is therefore treated as local, Address Resolution Protocol (ARP) never finds it, and the session never reaches the router. Solving that question requires more than naming a subnet mask. You must follow the traffic and identify the first decision that fails.

Use this guide to build that kind of reasoning. The official objectives remain the coverage checklist. The explanations, examples, and comparisons below are designed to help you distinguish answers that look similar at first glance.

<div class="article-callout">
  <p><strong>Study by asking what changes.</strong> A switch changes the forwarding path inside a Layer 2 domain. A router changes the Layer 2 frame and forwards the packet toward another IP network. A proxy creates a new application connection. Those differences are more useful than memorizing a list of devices.</p>
</div>

<h2 id="domain-map">Domain 1 objective map</h2>

<div class="table-scroll" role="region" aria-label="Network+ Domain 1 objective map" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main topic</th>
        <th scope="col">Question to answer</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1.1</td><td>OSI model</td><td>Which layer owns the function, address, protocol behavior, or fault?</td></tr>
      <tr><td>1.2</td><td>Appliances, applications, and functions</td><td>Which component changes the traffic in the way the scenario requires?</td></tr>
      <tr><td>1.3</td><td>Cloud concepts and connectivity</td><td>Which cloud boundary, gateway, service model, or connection fits the requirement?</td></tr>
      <tr><td>1.4</td><td>Ports, protocols, services, and traffic types</td><td>What is communicating, how is it transported, and who receives it?</td></tr>
      <tr><td>1.5</td><td>Media and transceivers</td><td>Which medium, connector, or optic meets the distance, bandwidth, and environment?</td></tr>
      <tr><td>1.6</td><td>Topologies and architectures</td><td>How are systems connected, where does traffic flow, and what fails when a component is lost?</td></tr>
      <tr><td>1.7</td><td>IPv4 addressing</td><td>Which network contains the address, how many hosts fit, and can the systems communicate directly?</td></tr>
      <tr><td>1.8</td><td>Modern network environments</td><td>Which design reduces manual work, extends segmentation, centralizes policy, or supports IPv6 transition?</td></tr>
    </tbody>
  </table>
</div>

These objectives overlap. A cloud subnet still uses addressing and routing. An SD-WAN edge still forwards packets. A VXLAN overlay still depends on a working underlay. Keep connecting each new term to the same traffic-flow model.

<h2 id="osi-model">Open Systems Interconnection (OSI) model and traffic flow</h2>

The OSI model gives you seven places to organize a network function or symptom. Real implementations may cross layer boundaries, yet the model remains useful for troubleshooting.

A useful top-to-bottom mnemonic is:

> **APS transports network data physically.**

It maps to Application, Presentation, Session, Transport, Network, Data Link, and Physical. The sentence stays close to what a network stack does, which makes it easier to reconstruct than an unrelated phrase.

<div class="table-scroll" role="region" aria-label="OSI layers, protocol data units, and troubleshooting clues" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Layer</th>
        <th scope="col">What it handles</th>
        <th scope="col">Useful evidence</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>7 Application</strong></td><td>Network services used by applications, such as Domain Name System (DNS), Hypertext Transfer Protocol (HTTP), email, and file sharing</td><td>Service-specific error, wrong DNS answer, failed authentication, or unavailable application</td></tr>
      <tr><td><strong>6 Presentation</strong></td><td>Representation, encoding, compression, encryption, and format translation</td><td>Certificate, encryption, character encoding, compression, or incompatible format issue</td></tr>
      <tr><td><strong>5 Session</strong></td><td>Establishing, maintaining, and ending exchanges between applications</td><td>Session setup, persistence, timeout, or reconnection behavior</td></tr>
      <tr><td><strong>4 Transport</strong></td><td>Transmission Control Protocol (TCP) and User Datagram Protocol (UDP) delivery, ports, segmentation, reliability, and flow behavior</td><td>Failed TCP handshake, blocked destination port, retransmissions, or UDP loss</td></tr>
      <tr><td><strong>3 Network</strong></td><td>Logical addressing and forwarding between IP networks</td><td>Incorrect prefix, gateway, route, TTL, hop limit, or address translation</td></tr>
      <tr><td><strong>2 Data Link</strong></td><td>Frames, Media Access Control (MAC) addresses, switching, virtual local area networks (VLANs), and local-link delivery</td><td>Wrong VLAN, loop, MAC-table issue, frame error, or duplex problem</td></tr>
      <tr><td><strong>1 Physical</strong></td><td>Signals, bits, media, connectors, transceivers, and radio energy</td><td>No link light, damaged cable, attenuation, interference, or mismatched optic</td></tr>
    </tbody>
  </table>
</div>

At the sender, each layer adds information needed by the corresponding function. Application data becomes a TCP segment or UDP datagram, then an IP packet, then a Layer 2 frame, then a signal on the medium. The receiver removes those headers in reverse order.

The addresses also serve different scopes:

- A **port number** identifies the service or conversation at the transport layer.
- An **IP address** identifies a logical interface and supports routing across networks.
- A **MAC address** identifies the next local-link interface used for this frame.

The destination IP normally remains the same from client to server unless translation occurs. The source and destination MAC addresses change at each routed hop because every Layer 2 frame is built for the next local link.

<h3>Use the model to choose a starting point</h3>

Suppose a user can open a website by IP address but not by name. The physical link, switching, IP addressing, routing, and transport path are already working well enough to reach the server. Name resolution is the stronger lead. Replacing the cable ignores the evidence.

Now suppose the interface has no link light. DNS settings do not matter yet. Start at the physical layer, confirm power and media, inspect the connector, and verify that both ends support the same link.

<div class="article-callout">
  <p><strong>Exam clue:</strong> The layer named in an answer is less important than the evidence. A firewall can inspect several layers. A multilayer switch can forward frames and route packets. Choose the function described in the scenario.</p>
</div>

<h2 id="devices-functions">Network appliances, applications, and functions</h2>

Physical and virtual appliances can perform the same network role. The implementation changes where the function runs, not the decision the function makes.

<div class="table-scroll" role="region" aria-label="Network devices and their main decisions" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">Main decision or service</th>
        <th scope="col">Distinguishing clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Router</strong></td><td>Selects a path between IP networks</td><td>Routing table, next hop, prefix, metric, or WAN connection</td></tr>
      <tr><td><strong>Switch</strong></td><td>Forwards frames inside a Layer 2 domain</td><td>MAC address table, access port, trunk, VLAN, or local switching</td></tr>
      <tr><td><strong>Firewall</strong></td><td>Permits or denies traffic according to security policy</td><td>Source, destination, service, application, state, zone, or inspection rule</td></tr>
      <tr><td><strong>Intrusion detection system (IDS)</strong></td><td>Detects and reports suspicious activity</td><td>Alerting without being placed inline to block the traffic</td></tr>
      <tr><td><strong>Intrusion prevention system (IPS)</strong></td><td>Detects and can stop suspicious traffic inline</td><td>Prevention, reset, drop, or active blocking requirement</td></tr>
      <tr><td><strong>Load balancer</strong></td><td>Distributes connections across available service instances</td><td>Health checks, virtual service address, session distribution, or high availability</td></tr>
      <tr><td><strong>Proxy</strong></td><td>Creates a connection on behalf of a client or server</td><td>Application-aware intermediary, caching, filtering, or hiding an endpoint</td></tr>
      <tr><td><strong>Network-attached storage (NAS)</strong></td><td>Presents shared files over the network</td><td>Users or systems access files through Server Message Block (SMB), Network File System (NFS), or another file protocol</td></tr>
      <tr><td><strong>Storage area network (SAN)</strong></td><td>Presents block storage to servers</td><td>Storage appears to the host as a disk or logical unit rather than a shared folder</td></tr>
      <tr><td><strong>Wireless access point (AP)</strong></td><td>Bridges wireless clients into the network</td><td>Radio coverage, Service Set Identifier (SSID), association, and local client access</td></tr>
      <tr><td><strong>Wireless controller</strong></td><td>Coordinates managed access points</td><td>Central policy, radio management, roaming, and lightweight AP control</td></tr>
      <tr><td><strong>Content delivery network (CDN)</strong></td><td>Serves content from distributed locations near users</td><td>Reduced latency, offloaded origin traffic, and geographically distributed caching</td></tr>
    </tbody>
  </table>
</div>

<h3>Functions that may be built into several devices</h3>

A function is not always a separate appliance:

- A **virtual private network (VPN)** creates a protected logical connection across an untrusted or shared network.
- **Quality of service (QoS)** classifies and treats traffic according to business importance, delay sensitivity, or bandwidth policy.
- **Time to live (TTL)** in IPv4 and the IPv6 hop limit prevent packets from circulating forever. Each router reduces the value before forwarding.

A router, firewall, cloud gateway, or dedicated concentrator may terminate a VPN. QoS may be applied on switches, routers, wireless infrastructure, or provider links. Read the requested outcome before choosing the box.

<h3>Nearby answers that require different reasoning</h3>

A reverse proxy and a load balancer may both sit in front of servers. The proxy's defining behavior is representing the server side of an application exchange. The load balancer's defining behavior is selecting a service instance. One product may perform both roles, but the scenario usually emphasizes one outcome.

NAS and SAN both provide networked storage. NAS provides file access. SAN provides block access. Asking how the consuming server sees the storage often resolves the choice.

<h2 id="cloud-concepts">Cloud concepts and connectivity</h2>

Cloud networking uses familiar components expressed through provider-managed services. A virtual private cloud or virtual network provides an isolated logical environment. Subnets, routes, gateways, security policy, load balancers, DNS, and VPNs still determine how traffic moves.

<div class="table-scroll" role="region" aria-label="Cloud networking concepts and decisions" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Concept</th>
        <th scope="col">Purpose</th>
        <th scope="col">Scenario clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Network functions virtualization (NFV)</strong></td><td>Runs network functions as software rather than requiring a dedicated physical appliance</td><td>Rapid deployment of virtual routers, firewalls, or load balancers</td></tr>
      <tr><td><strong>Virtual private cloud (VPC) or virtual network</strong></td><td>Creates a logically isolated cloud network</td><td>Cloud subnets, route tables, security policy, and gateways</td></tr>
      <tr><td><strong>Security group or security list</strong></td><td>Applies cloud traffic policy to resources or network boundaries</td><td>Allow or deny rules around instances, interfaces, or subnets; exact behavior varies by provider</td></tr>
      <tr><td><strong>Internet gateway</strong></td><td>Provides a path between a cloud network and the public internet</td><td>Publicly reachable resources with appropriate addressing, routes, and policy</td></tr>
      <tr><td><strong>Network Address Translation (NAT) gateway</strong></td><td>Allows private resources to initiate outbound IPv4 connections without becoming directly reachable inbound</td><td>Private subnet needs updates or external APIs but should not accept unsolicited internet sessions</td></tr>
      <tr><td><strong>VPN connectivity</strong></td><td>Builds an encrypted connection over an existing network</td><td>Faster or lower-cost site connection that depends on internet transport</td></tr>
      <tr><td><strong>Dedicated cloud connection</strong></td><td>Provides private provider connectivity separate from ordinary internet paths</td><td>Predictable performance, private routing, or consistent enterprise connectivity</td></tr>
    </tbody>
  </table>
</div>

<h3>Deployment and service models</h3>

- **Public cloud** uses provider infrastructure shared across customers through logical isolation.
- **Private cloud** dedicates the cloud environment to one organization.
- **Hybrid cloud** connects private and public environments so workloads or data can use both.

The service model changes who manages each layer:

- **Software as a service (SaaS)** delivers the finished application. The customer mainly manages users, data, and application settings.
- **Platform as a service (PaaS)** delivers a managed application platform. The customer deploys code and data without managing the full server stack.
- **Infrastructure as a service (IaaS)** delivers compute, storage, and networking building blocks. The customer manages more of the operating system and application environment.

<h3>Scalability, elasticity, and multitenancy</h3>

**Scalability** is the ability to add capacity. **Elasticity** is the ability to adjust capacity as demand changes, often automatically. A service that can be expanded manually is scalable. A service that adds and removes resources in response to demand is elastic.

**Multitenancy** allows multiple customers or organizational units to use shared infrastructure while remaining logically separated. The provider must enforce isolation even though the underlying hardware may be shared.

<h2 id="ports-protocols">Ports, protocols, and services</h2>

A port number is a clue, not proof of the application. Services can use nonstandard ports, and several protocols can share the same transport. Connect each number to purpose, direction, protection, and failure symptoms.

Use the full [Common Ports and Protocols Reference](/ports-protocols/) for search and printing. The N10-009 objectives emphasize these common defaults:

<div class="table-scroll" role="region" aria-label="Common Network+ ports and services" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Service</th>
        <th scope="col">Port</th>
        <th scope="col">Practical clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>File Transfer Protocol (FTP)</td><td>TCP 20/21</td><td>Separate data and control behavior; plaintext unless protected</td></tr>
      <tr><td>Secure File Transfer Protocol (SFTP) and Secure Shell (SSH)</td><td>TCP 22</td><td>SSH-based secure administration or file transfer</td></tr>
      <tr><td>Telnet</td><td>TCP 23</td><td>Legacy plaintext remote terminal</td></tr>
      <tr><td>Simple Mail Transfer Protocol (SMTP)</td><td>TCP 25 or 587</td><td>Server relay on 25; authenticated message submission commonly on 587</td></tr>
      <tr><td>Domain Name System (DNS)</td><td>UDP/TCP 53</td><td>Name resolution; TCP also supports exchanges such as traditional zone transfers</td></tr>
      <tr><td>Dynamic Host Configuration Protocol for IPv4 (DHCPv4)</td><td>UDP 67/68</td><td>Server and client ports for dynamic IPv4 configuration</td></tr>
      <tr><td>Trivial File Transfer Protocol (TFTP)</td><td>UDP 69</td><td>Simple unauthenticated transfer, often for boot or device files</td></tr>
      <tr><td>Hypertext Transfer Protocol (HTTP)</td><td>TCP 80</td><td>Unencrypted web traffic</td></tr>
      <tr><td>Network Time Protocol (NTP)</td><td>UDP 123</td><td>Time synchronization for systems, logs, and authentication</td></tr>
      <tr><td>Simple Network Management Protocol (SNMP)</td><td>UDP 161/162</td><td>Queries on 161; traps and informs commonly received on 162</td></tr>
      <tr><td>Lightweight Directory Access Protocol (LDAP)</td><td>TCP/UDP 389</td><td>Directory access; protect credentials and sensitive directory traffic</td></tr>
      <tr><td>Hypertext Transfer Protocol Secure (HTTPS)</td><td>TCP/UDP 443</td><td>TLS-protected web traffic; HTTP/3 uses QUIC over UDP</td></tr>
      <tr><td>Server Message Block (SMB)</td><td>TCP 445</td><td>Windows file, printer, and named-pipe sharing</td></tr>
      <tr><td>Syslog</td><td>UDP 514</td><td>Traditional log transport without confidentiality or delivery assurance</td></tr>
      <tr><td>Lightweight Directory Access Protocol over TLS (LDAPS)</td><td>TCP 636</td><td>LDAP using implicit Transport Layer Security (TLS)</td></tr>
      <tr><td>Structured Query Language (SQL) Server</td><td>TCP 1433</td><td>Common default database service port</td></tr>
      <tr><td>Remote Desktop Protocol (RDP)</td><td>TCP/UDP 3389</td><td>Microsoft remote desktop</td></tr>
      <tr><td>Session Initiation Protocol (SIP)</td><td>5060/5061</td><td>Voice and video signaling; media normally uses separately negotiated ports</td></tr>
    </tbody>
  </table>
</div>

<h3>Transmission Control Protocol (TCP), User Datagram Protocol (UDP), and protocols that do not use ports</h3>

TCP establishes a connection and provides ordered delivery, acknowledgments, retransmission, and flow behavior. UDP sends independent datagrams without establishing the same reliable transport session. Applications choose the tradeoff that fits their needs.

Some protocols operate directly over IP and do not use TCP or UDP ports:

- **Internet Control Message Protocol (ICMP)** carries control, error, and diagnostic messages.
- **Generic Routing Encapsulation (GRE)** encapsulates packets inside another IP packet.
- **Internet Protocol Security (IPsec) Authentication Header (AH)** provides integrity and authentication without encrypting the payload.
- **IPsec Encapsulating Security Payload (ESP)** can provide confidentiality, integrity, and authentication services.
- **Internet Key Exchange (IKE)** negotiates the security associations and keys used by IPsec.

Do not turn an IP protocol number into a fake port. ESP is IP protocol 50, not TCP or UDP port 50.

<h2 id="traffic-types">Traffic types</h2>

<div class="table-scroll" role="region" aria-label="Unicast multicast anycast and broadcast comparison" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Type</th>
        <th scope="col">Delivery pattern</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Unicast</strong></td><td>One sender to one destination</td><td>A client opens a TCP connection to one web server address</td></tr>
      <tr><td><strong>Multicast</strong></td><td>One sender to receivers that joined a group</td><td>Selected routing, streaming, or discovery traffic</td></tr>
      <tr><td><strong>Anycast</strong></td><td>One address is advertised from multiple locations; routing delivers traffic to a suitable instance</td><td>Distributed DNS or content service</td></tr>
      <tr><td><strong>Broadcast</strong></td><td>One sender to all hosts in the local IPv4 broadcast domain</td><td>Initial DHCP discovery or local ARP request</td></tr>
    </tbody>
  </table>
</div>

Routers normally contain Layer 2 broadcasts unless a service such as DHCP relay deliberately carries the required information across the boundary. IPv6 does not use broadcast; it relies on multicast and other mechanisms.

Anycast is easy to confuse with load balancing. Anycast uses routing to direct the same advertised address toward an available or nearby location. A load balancer accepts the connection and selects a backend service instance after the traffic reaches it.

<h2 id="media-transceivers">Transmission media, connectors, and transceivers</h2>

Choose media by distance, bandwidth, interference, installation environment, cost, and the equipment at both ends.

<div class="table-scroll" role="region" aria-label="Common network media choices" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Medium</th>
        <th scope="col">Where it fits</th>
        <th scope="col">Important tradeoff</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Twisted-pair copper</strong></td><td>Horizontal office cabling and Ethernet access links</td><td>Affordable and supports power delivery, but distance and interference matter</td></tr>
      <tr><td><strong>Single-mode fiber</strong></td><td>Long-distance, campus, provider, and high-capacity links</td><td>Long reach with a small core; optics and installation cost more</td></tr>
      <tr><td><strong>Multimode fiber</strong></td><td>Shorter building and data-center links</td><td>Useful at high speed over shorter distances than single-mode fiber</td></tr>
      <tr><td><strong>Direct Attach Copper (DAC) or twinax</strong></td><td>Very short switch-to-server or switch-to-switch links</td><td>Low cost and power for short runs, but limited reach</td></tr>
      <tr><td><strong>Coaxial cable</strong></td><td>Cable broadband, antennas, and legacy applications</td><td>Connector and impedance must match the application</td></tr>
      <tr><td><strong>Wireless LAN</strong></td><td>Mobile access inside homes, offices, and public spaces</td><td>Shared radio medium affected by channel use, interference, distance, and obstacles</td></tr>
      <tr><td><strong>Cellular</strong></td><td>Mobile WAN, backup links, and locations without wired service</td><td>Coverage, provider policy, latency, and recurring cost vary</td></tr>
      <tr><td><strong>Satellite</strong></td><td>Remote locations beyond terrestrial service</td><td>Wide reach, but latency, weather, visibility, and cost may matter</td></tr>
    </tbody>
  </table>
</div>

<h3>Copper and environmental choices</h3>

Category 5e commonly supports 1 Gb Ethernet to the normal 100-meter channel limit. Category 6 supports 1 Gb over the full channel and can support 10 Gb on shorter runs. Category 6A is the common copper choice for 10 Gb over a full 100-meter channel.

Plenum-rated cable uses materials intended for spaces that move environmental air. The requirement is driven by fire and smoke behavior, not faster network performance.

<h3>Transceivers and connectors</h3>

A transceiver must match the device slot, protocol, speed, wavelength, fiber type, and distance. **Small Form-factor Pluggable (SFP)** and **Quad Small Form-factor Pluggable (QSFP)** describe pluggable transceiver families, not one fixed speed or medium. Modules may carry Ethernet or Fibre Channel depending on their design and the equipment.

Common connector clues include:

- **Local Connector (LC):** small fiber connector frequently used with modern pluggable optics
- **Subscriber Connector (SC):** larger square push-pull fiber connector
- **Straight Tip (ST):** round bayonet-style fiber connector often seen in older installations
- **Multifiber Push On (MPO):** multi-fiber connector used for parallel optical links and dense cabling
- **Registered Jack (RJ45):** common twisted-pair Ethernet connector
- **RJ11:** smaller connector associated with telephone wiring
- **F-type:** threaded coaxial connector common in cable broadband
- **Bayonet Neill-Concelman (BNC):** bayonet coaxial connector used in selected video, radio, and legacy networking applications

A clean-looking fiber connector can still be contaminated. Inspect and clean fiber properly before assuming the optic or cable must be replaced.

<h2 id="topologies">Topologies, architectures, and traffic direction</h2>

<div class="table-scroll" role="region" aria-label="Network topology and architecture comparison" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Design</th>
        <th scope="col">How it is organized</th>
        <th scope="col">Decision clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Star</strong></td><td>Endpoints connect to a central device</td><td>Simple access design; central device becomes important to availability</td></tr>
      <tr><td><strong>Hub and spoke</strong></td><td>Remote sites or networks connect through a central hub</td><td>Centralized control with potentially indirect site-to-site paths</td></tr>
      <tr><td><strong>Mesh</strong></td><td>Nodes have multiple interconnections</td><td>Path diversity and resilience with greater cost and complexity</td></tr>
      <tr><td><strong>Hybrid</strong></td><td>Combines topology types</td><td>Real networks often mix access stars, WAN hub-and-spoke, and resilient cores</td></tr>
      <tr><td><strong>Point to point</strong></td><td>Direct connection between two endpoints</td><td>Simple dedicated path without a shared intermediate topology</td></tr>
      <tr><td><strong>Spine and leaf</strong></td><td>Each leaf connects to each spine</td><td>Predictable east-west paths and scalable data-center connectivity</td></tr>
      <tr><td><strong>Three-tier</strong></td><td>Access, distribution, and core layers</td><td>Separate endpoint access, policy aggregation, and backbone functions</td></tr>
      <tr><td><strong>Collapsed core</strong></td><td>Distribution and core functions share a layer</td><td>Smaller environment needs fewer devices and simpler operation</td></tr>
    </tbody>
  </table>
</div>

**North-south traffic** moves into or out of a data center, cloud environment, or protected network boundary. **East-west traffic** moves between systems inside that environment. Traditional designs focused heavily on client-to-server north-south flow. Virtualized and distributed applications can create large amounts of east-west traffic between services.

Topology questions often test failure impact. Losing one access switch affects its connected endpoints. Losing the only hub can isolate all spokes. A mesh can preserve alternate paths, but only when routing and policy use them correctly.

<h2 id="ipv4-addressing">IPv4 addressing</h2>

An IPv4 address has 32 bits. The prefix length identifies the network portion, and the remaining bits identify addresses inside that network.

<h3>Special-use address clues</h3>

<div class="table-scroll" role="region" aria-label="Common IPv4 address ranges and uses" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Range</th>
        <th scope="col">Purpose</th>
        <th scope="col">Useful clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>10.0.0.0/8</strong></td><td>Private IPv4 addressing</td><td>Large private address block; requires translation or another routed design for ordinary internet access</td></tr>
      <tr><td><strong>172.16.0.0/12</strong></td><td>Private IPv4 addressing</td><td>Private range ends at 172.31.255.255, not every 172 address</td></tr>
      <tr><td><strong>192.168.0.0/16</strong></td><td>Private IPv4 addressing</td><td>Common home and small-office addressing</td></tr>
      <tr><td><strong>169.254.0.0/16</strong></td><td>Automatic Private IP Addressing (APIPA) link-local addressing</td><td>Windows client could not obtain normal DHCP configuration; local-link communication may still work</td></tr>
      <tr><td><strong>127.0.0.0/8</strong></td><td>Loopback</td><td>Tests the local host's IP stack without leaving the system</td></tr>
      <tr><td><strong>224.0.0.0/4</strong></td><td>Class D multicast space</td><td>Group delivery rather than ordinary host addressing</td></tr>
    </tbody>
  </table>
</div>

A public address is globally routable when assigned and advertised appropriately. A private address is not automatically more secure. Firewall policy, segmentation, authentication, and exposure still determine risk.

<h3>Classful labels and modern Classless Inter-Domain Routing (CIDR)</h3>

Class A, B, and C historically implied default network sizes. Class D is multicast, and Class E is reserved or experimental. Modern networks use CIDR prefix lengths rather than class boundaries, but classful labels may still appear in questions and documentation.

<div class="table-scroll" role="region" aria-label="Historical IPv4 address classes" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Class</th>
        <th scope="col">First-octet range</th>
        <th scope="col">Historical default</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>A</td><td>1-126</td><td>/8</td></tr>
      <tr><td>B</td><td>128-191</td><td>/16</td></tr>
      <tr><td>C</td><td>192-223</td><td>/24</td></tr>
      <tr><td>D</td><td>224-239</td><td>Multicast</td></tr>
      <tr><td>E</td><td>240-255</td><td>Reserved or experimental</td></tr>
    </tbody>
  </table>
</div>

The ranges above describe the historical class system. Special-use ranges and reservations still take precedence. For example, 127.0.0.0/8 is loopback even though its first octet falls near the Class A range.

<h2 id="subnetting">Subnetting and variable-length subnet masking (VLSM)</h2>

Subnetting divides an address block into smaller networks. The prefix controls how many bits identify the network and how many remain for addresses inside each subnet.

A dependable process is more valuable than a chart you cannot recreate. The [IPv4 Subnetting Reference](/network-plus/n10-009/study-guide/ipv4-subnetting/) expands this method with borrowed bits, special ranges, VLSM, and additional worked examples. The [IPv4 Subnet Calculator](/tools/subnet-calculator/) can check each answer and show the binary steps.

1. Convert the prefix to the relevant mask.
2. Identify the changing octet.
3. Calculate the block size.
4. Find the network boundary containing the address.
5. Find the next boundary and subtract one for the broadcast address.
6. Determine the usable range and confirm the host requirement.

<h3>Common small-subnet reference</h3>

<div class="table-scroll" role="region" aria-label="Common IPv4 subnet prefixes and usable host counts" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Prefix</th>
        <th scope="col">Mask</th>
        <th scope="col">Addresses</th>
        <th scope="col">Traditional usable hosts</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>/24</td><td>255.255.255.0</td><td>256</td><td>254</td></tr>
      <tr><td>/25</td><td>255.255.255.128</td><td>128</td><td>126</td></tr>
      <tr><td>/26</td><td>255.255.255.192</td><td>64</td><td>62</td></tr>
      <tr><td>/27</td><td>255.255.255.224</td><td>32</td><td>30</td></tr>
      <tr><td>/28</td><td>255.255.255.240</td><td>16</td><td>14</td></tr>
      <tr><td>/29</td><td>255.255.255.248</td><td>8</td><td>6</td></tr>
      <tr><td>/30</td><td>255.255.255.252</td><td>4</td><td>2</td></tr>
    </tbody>
  </table>
</div>

For the traditional usable-host calculation, subtract the network and broadcast addresses. The exam may focus on the standard model unless a scenario explicitly introduces another design.

<h3>Worked example: locate an address inside a /26</h3>

Consider `192.168.40.77/26`.

- A /26 mask is `255.255.255.192`.
- The block size is `256 - 192 = 64`.
- Fourth-octet boundaries are 0, 64, 128, and 192.
- Address 77 falls inside the 64-127 block.
- Network address: `192.168.40.64`
- Broadcast address: `192.168.40.127`
- Traditional usable range: `192.168.40.65` through `192.168.40.126`

Two hosts can communicate directly only when their local addressing decisions place them in the same subnet and the Layer 2 path permits the exchange. Otherwise, they send traffic toward a router.

<h3>Choose a subnet for a requirement</h3>

A segment needs 50 usable IPv4 addresses. A /27 provides 30, so it is too small. A /26 provides 62, which fits. Choosing /25 would also fit, but it consumes twice as many addresses and may not be the best answer when conservation matters.

**Variable-length subnet masking (VLSM)** assigns different prefix lengths according to each subnet's need. A server segment may receive a /27, a user segment a /24, and a point-to-point link a much smaller prefix. Start with the largest requirement so smaller allocations do not fragment the remaining space.

<div class="article-callout">
  <p><strong>Exam clue:</strong> When two addresses look close, do not guess from the first three octets. Apply the prefix. Hosts ending in .63 and .64 are adjacent numbers, but they fall on opposite sides of a /26 boundary.</p>
</div>

<h2 id="ipv6-addressing">IPv6 addressing and transition</h2>

IPv6 uses 128-bit addresses written in hexadecimal groups. Prefix notation still identifies the network portion, but IPv6 does not use an IPv4-style broadcast address.

<h3>Compression rules</h3>

You may remove leading zeros inside a group. You may replace one continuous run of all-zero groups with `::`. Use `::` only once in an address because the omitted length must remain unambiguous.

For example:

```text
2001:0db8:0000:0000:0000:0000:0000:0042
```

can be written as:

```text
2001:db8::42
```

<h3>Common IPv6 address types</h3>

<div class="table-scroll" role="region" aria-label="Common IPv6 address types" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Type</th>
        <th scope="col">Common prefix or example</th>
        <th scope="col">Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Global unicast</strong></td><td>Commonly 2000::/3</td><td>Globally routable unicast addressing</td></tr>
      <tr><td><strong>Link-local</strong></td><td>FE80::/10</td><td>Local-link communication, neighbor discovery, and many next-hop operations</td></tr>
      <tr><td><strong>Unique local</strong></td><td>FC00::/7</td><td>Private organizational use without ordinary global routing</td></tr>
      <tr><td><strong>Multicast</strong></td><td>FF00::/8</td><td>Group delivery; replaces several tasks that used broadcast in IPv4</td></tr>
      <tr><td><strong>Loopback</strong></td><td>::1</td><td>Tests the local IPv6 stack</td></tr>
      <tr><td><strong>Unspecified</strong></td><td>::</td><td>Represents the absence of an assigned address in selected contexts</td></tr>
    </tbody>
  </table>
</div>

Internet Control Message Protocol for IPv6 (ICMPv6) supports essential functions such as neighbor discovery and path information. Blocking all ICMPv6 can break normal IPv6 behavior.

<h3>Transition approaches</h3>

- **Dual stack:** Systems run IPv4 and IPv6 together and choose the appropriate path.
- **Tunneling:** One protocol is carried across a network built for the other protocol.
- **Network Address Translation 64 (NAT64):** IPv6 clients communicate with IPv4 services through translation, normally with supporting DNS behavior.

IPv6 reduces pressure from IPv4 address exhaustion, but migration still depends on application compatibility, provider support, security policy, monitoring, and operational knowledge.

<h2 id="modern-networks">Modern network environments</h2>

Modern designs change how networks are controlled and extended. They do not remove the need for correct addressing, routing, and physical connectivity.

<div class="table-scroll" role="region" aria-label="Modern networking concepts and the problems they solve" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Concept</th>
        <th scope="col">Problem addressed</th>
        <th scope="col">Distinguishing clue</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><strong>Software-defined networking (SDN)</strong></td><td>Separates centralized control logic from distributed forwarding</td><td>Programmable policy, controller-driven behavior, and consistent changes</td></tr>
      <tr><td><strong>Software-defined wide area networking (SD-WAN)</strong></td><td>Manages wide area network (WAN) paths and policy across different transports</td><td>Application-aware path selection, zero-touch deployment, and transport independence</td></tr>
      <tr><td><strong>Virtual Extensible LAN (VXLAN)</strong></td><td>Extends large numbers of logical Layer 2 segments across a Layer 3 underlay</td><td>Overlay encapsulation, data-center interconnect, and scalable segment identifiers</td></tr>
      <tr><td><strong>Zero trust architecture</strong></td><td>Reduces implicit trust based on network location</td><td>Policy-based authentication, authorization, and least-privilege access</td></tr>
      <tr><td><strong>Secure access service edge (SASE)</strong></td><td>Combines wide-area networking and cloud-delivered security functions</td><td>Distributed users and branches need consistent access and security policy</td></tr>
      <tr><td><strong>Security service edge (SSE)</strong></td><td>Provides the security-service portion without defining the WAN transport function</td><td>Cloud-delivered access and security controls are emphasized</td></tr>
      <tr><td><strong>Infrastructure as code</strong></td><td>Makes infrastructure repeatable, reviewable, and less dependent on manual changes</td><td>Templates, playbooks, reusable tasks, version control, and drift detection</td></tr>
    </tbody>
  </table>
</div>

<h3>Infrastructure as code is an operational workflow</h3>

A useful IaC process stores intended configuration in a central repository. Branches isolate proposed work. Review identifies conflicts and unsafe changes. Automation applies approved templates or playbooks. Monitoring compares production with the intended state and reports drift.

Automation can support upgrades, dynamic inventory, compliance checks, and repeated provisioning. It also repeats mistakes quickly when source data, testing, approval, or rollback planning is weak. The right answer often includes both automation and control of the automation.

<h3>Overlay and underlay</h3>

An overlay creates logical connectivity on top of an underlay network. VXLAN may carry an encapsulated Layer 2 segment across routed infrastructure. The overlay can simplify tenant or workload mobility, but it cannot repair a failed underlay route or physical link.

<h2 id="trace-a-session">Trace a complete client session</h2>

Suppose a laptop opens `https://portal.example` on a remote network:

1. The laptop checks its local configuration and determines that the DNS server is reachable through the network.
2. DNS resolves the name to an IP address.
3. The laptop applies its prefix to decide whether the destination is local or remote.
4. For a remote destination, the laptop resolves the default gateway's local-link address through ARP for IPv4 or neighbor discovery for IPv6.
5. The switch forwards the frame toward the gateway according to the destination MAC address and VLAN.
6. The router removes the incoming Layer 2 frame, reduces the TTL or hop limit, selects a route, and builds a new frame for the next link.
7. A firewall evaluates the session according to policy. NAT may translate addressing where required.
8. A proxy or load balancer may accept the application connection and select the service destination.
9. The server responds, and return routing, policy, translation state, and name or certificate expectations must all remain consistent.

That sequence helps you interpret symptoms:

- No link light points toward media, interface, or physical configuration.
- An APIPA address points toward failed DHCP configuration.
- A correct address with no gateway reachability points toward local subnet, VLAN, ARP, or link issues.
- IP access that works while name access fails points toward DNS.
- A completed TCP handshake followed by an application error points higher in the stack.
- One cloud instance failing while peers work may point toward a local security rule, route association, health check, or service configuration rather than the entire WAN.

<h2 id="exam-traps">Common exam traps</h2>

<h3>Choosing a device by name instead of function</h3>

A modern firewall may route, terminate VPNs, proxy applications, and inspect traffic. Identify the required outcome. If the question asks to distribute sessions across healthy servers, load balancing is the defining function even when one appliance performs several jobs.

<h3>Treating a default port as proof</h3>

TCP 22 suggests Secure Shell (SSH)-based activity, but the action determines whether the best answer is SSH, Secure File Transfer Protocol (SFTP), or Secure Copy Protocol (SCP). Confirm the protocol behavior, not only the number.

<h3>Using classful assumptions when a prefix is given</h3>

A `192.168.x.x` address is not automatically a /24. The provided prefix controls the subnet. CIDR replaced the old class boundary for modern routing and subnetting.

<h3>Confusing a close address with the same subnet</h3>

Boundary math decides whether hosts are local. Addresses can differ by one and still belong to different subnets.

<h3>Confusing scalability with elasticity</h3>

Scalability means capacity can grow. Elasticity means capacity adjusts with demand. A manual upgrade can be scalable without being elastic.

<h3>Confusing a transceiver form factor with a protocol</h3>

SFP and QSFP identify module families. The actual module must still match speed, wavelength, fiber, reach, protocol, and the device at each end.

<h3>Assuming IPv6 works like larger IPv4</h3>

IPv6 has no broadcast, uses neighbor discovery, depends on ICMPv6 for essential behavior, and introduces different address scopes. Apply IPv6 concepts directly rather than translating every question into IPv4 habits.

<h2 id="rapid-review">Rapid review checklist</h2>

You are ready to move beyond Domain 1 review when you can:

- Reconstruct all seven OSI layers and attach a real symptom or protocol to each one.
- Explain how MAC addresses, IP addresses, and ports change the delivery decision.
- Distinguish a router, switch, firewall, IDS, IPS, load balancer, proxy, NAS, SAN, AP, and controller from scenario clues.
- Explain when a cloud workload needs an internet gateway, NAT gateway, VPN, or dedicated connection.
- Match the common N10-009 service ports to their purposes and protected alternatives.
- Distinguish TCP, UDP, ICMP, GRE, AH, ESP, and IKE.
- Explain unicast, multicast, anycast, and broadcast delivery.
- Select copper, single-mode fiber, multimode fiber, DAC, cellular, satellite, or wireless according to constraints.
- Recognize common connectors and determine what a transceiver must match.
- Compare star, mesh, hub-and-spoke, spine-and-leaf, three-tier, and collapsed-core designs.
- Find the network, broadcast, usable range, and host capacity for a typical IPv4 subnet.
- Recognize private, APIPA, loopback, multicast, and public IPv4 addressing.
- Compress and expand basic IPv6 addresses and recognize major IPv6 address types.
- Explain dual stack, tunneling, NAT64, SDN, SD-WAN, VXLAN, zero trust, SASE, SSE, and infrastructure as code by the problem each one solves.
- Trace a client request from application name through DNS, local delivery, routing, policy, and the destination service.

After reviewing, take a [Network+ N10-009 practice test](/network-plus/n10-009/practice-test/) and classify each missed question. A wrong term suggests a knowledge gap. A wrong layer or device suggests a traffic-flow gap. A calculation error suggests more subnetting repetitions. A missed qualifier suggests the concepts were understood but the decision process needs work.

<h2 id="official-references">Official references</h2>

- [CompTIA Network+ certification page](https://www.comptia.org/en-us/certifications/network/)
- [IANA Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml)
- [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918)
- [RFC 4632: Classless Inter-domain Routing](https://www.rfc-editor.org/rfc/rfc4632)
- [RFC 8200: Internet Protocol, Version 6](https://www.rfc-editor.org/rfc/rfc8200)
