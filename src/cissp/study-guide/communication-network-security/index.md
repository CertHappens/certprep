---
layout: layouts/article.njk
title: "CISSP Domain 4: Communication and Network Security"
description: Study CISSP Domain 4 with practical guidance on network models, secure protocols, segmentation, wireless and cloud networking, network components, monitoring, and protected communication channels.
permalink: /cissp/study-guide/communication-network-security/
ogType: article
printable: true
printTitle: "CISSP Domain 4: Communication and Network Security"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 4
eyebrow: CISSP Domain 4 guide
lede: Connect network design, segmentation, secure protocols, infrastructure, monitoring, and communication channels to the business traffic and services they must protect.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Communication and Network Security
    url: /cissp/study-guide/communication-network-security/
toc:
  - id: domain-map
    label: Domain 4 map
  - id: decision-order
    label: Decision order
  - id: models-addressing
    label: Models and addressing
  - id: secure-protocols
    label: Secure protocols
  - id: transport-performance
    label: Transport and performance
  - id: segmentation-flows
    label: Segmentation and traffic flows
  - id: edge-wireless
    label: Edge and wireless networks
  - id: software-defined-cloud
    label: Software-defined and cloud networks
  - id: monitoring-management
    label: Monitoring and management
  - id: network-components
    label: Network components
  - id: communication-channels
    label: Communication channels
  - id: ai-networking
    label: AI network security
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 4
  - Communication and Network Security
  - network segmentation
  - secure protocols
  - network access control
  - wireless security
  - software-defined networking
  - remote access
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Review the classification, handling, and data-state requirements that network controls must enforce.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Connect secure design principles, trust boundaries, cryptography, and system architecture to network decisions.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Connect network admission, remote access, protected administration, federation, and third-party connectivity to identity controls.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Refresh networking concepts, implementation, operations, security, and troubleshooting at the foundational level.
  - title: Ports and Protocols Reference
    url: /ports-protocols/
    description: Review common protocol purposes and default ports before applying the broader CISSP design perspective.
  - title: IPv4 Subnetting Reference
    url: /network-plus/n10-009/study-guide/ipv4-subnetting/
    description: Refresh subnet boundaries, prefixes, address ranges, and host calculations used in network design.
---
Domain 4 accounts for 13 percent of the current CISSP exam outline. It asks how an organization moves information between people, systems, sites, cloud services, devices, and external partners without losing confidentiality, integrity, availability, or control.

The domain includes many technologies, but it is not a memorization contest about cable types and protocol names. The stronger CISSP answer begins with the communication requirement: **what must connect, what information will cross the connection, who should be allowed to use it, what failures matter, and how will the organization detect trouble?**

A network can carry traffic successfully and still be poorly designed. Secure communication requires more than reachability. It requires appropriate trust boundaries, protected management paths, controlled data flows, resilient components, useful monitoring, and clear responsibility for every connection.

<h2 id="domain-map">Domain 4 map</h2>

The official outline divides Communication and Network Security into three objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 4 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>4.1</td><td>Secure network architecture</td><td>How should traffic move, where should trust change, and which design limits exposure and failure?</td></tr>
      <tr><td>4.2</td><td>Network components</td><td>How are infrastructure, transmission media, access controls, and endpoints protected and maintained?</td></tr>
      <tr><td>4.3</td><td>Secure communication channels</td><td>Which protections fit voice, video, remote access, data links, and third-party connections?</td></tr>
    </tbody>
  </table>
</div>

The three objectives work together. Architecture determines the paths and trust boundaries. Components enforce those decisions. Secure channels protect the information while it crosses the chosen paths.

<h2 id="decision-order">Use the right decision order</h2>

A firewall, virtual private network, wireless standard, or monitoring platform is not a complete network strategy. Choose the design only after the communication need and protection requirements are understood.

A practical decision sequence is:

1. **Identify the business service and participants.** Determine which users, devices, applications, sites, suppliers, and cloud services need to communicate.
2. **Classify the information and traffic.** Identify sensitivity, criticality, privacy obligations, expected volume, and acceptable delay or interruption.
3. **Define trust boundaries and allowed flows.** Decide where traffic may enter, leave, or move between zones. Deny paths that have no business purpose.
4. **Choose the architecture.** Select physical, logical, cloud, wireless, edge, and remote-access designs that fit the requirement.
5. **Choose secure protocols and authentication.** Protect confidentiality and integrity, verify peers, and manage keys and certificates across the connection's lifecycle.
6. **Protect infrastructure and endpoints.** Harden devices, control administrative access, maintain support, and secure transmission media.
7. **Build resilience.** Address capacity, component failure, provider failure, power loss, route failure, and denial-of-service conditions.
8. **Monitor and manage.** Collect useful telemetry, establish baselines, detect faults and suspicious changes, and control configuration.
9. **Review third-party dependencies.** Document ownership, service levels, escalation paths, maintenance access, and exit plans.
10. **Test the complete path.** Verify that the connection works, the controls enforce policy, failures are handled, and monitoring produces actionable evidence.

A question that asks for the **best design** usually starts with requirements and segmentation. A question that asks for the **most secure protocol** still depends on what is being protected, where the connection terminates, and how identities and keys are managed.

<h2 id="models-addressing">Use models and addressing to locate the control</h2>

Network models provide a shared way to describe where communication functions occur. They are maps, not physical devices. Their value is helping a team identify where a protocol operates, where a control can be applied, and where a failure may be occurring.

<h3>OSI and TCP/IP models</h3>

The **Open Systems Interconnection (OSI) model** divides communication into seven conceptual layers. The **Transmission Control Protocol/Internet Protocol (TCP/IP) model** groups real Internet protocols into fewer layers.

A useful top-to-bottom OSI mnemonic is:

> **APS transports network data physically.**

It maps to Application, Presentation, Session, Transport, Network, Data Link, and Physical. The sentence stays close to the actual layer names, which makes the order easier to reconstruct.

<div class="table-scroll" role="region" aria-label="OSI model layers" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">OSI layer</th><th scope="col">Plain purpose</th><th scope="col">Common examples</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="OSI layer">7. Application</td><td data-label="Plain purpose">Provides network services used by applications and users.</td><td data-label="Common examples">HTTP, DNS, SMTP, SSH</td></tr>
      <tr><td data-label="OSI layer">6. Presentation</td><td data-label="Plain purpose">Formats, transforms, compresses, or encrypts data.</td><td data-label="Common examples">Data encoding, serialization, encryption formats</td></tr>
      <tr><td data-label="OSI layer">5. Session</td><td data-label="Plain purpose">Starts, maintains, and ends conversations between systems.</td><td data-label="Common examples">Session checkpoints and dialog control</td></tr>
      <tr><td data-label="OSI layer">4. Transport</td><td data-label="Plain purpose">Moves data between applications and may provide reliability, ordering, and flow control.</td><td data-label="Common examples">TCP, UDP</td></tr>
      <tr><td data-label="OSI layer">3. Network</td><td data-label="Plain purpose">Routes packets between networks.</td><td data-label="Common examples">IPv4, IPv6, IPsec routing context</td></tr>
      <tr><td data-label="OSI layer">2. Data link</td><td data-label="Plain purpose">Moves frames across one local link and identifies local interfaces.</td><td data-label="Common examples">Ethernet, Wi-Fi, VLANs, MAC addresses</td></tr>
      <tr><td data-label="OSI layer">1. Physical</td><td data-label="Plain purpose">Carries signals through cable, fiber, or radio.</td><td data-label="Common examples">Copper, fiber, radio frequencies, connectors</td></tr>
    </tbody>
  </table>
</div>

The TCP/IP model usually uses four layers:

<div class="table-scroll" role="region" aria-label="TCP IP and OSI model mapping" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">TCP/IP layer</th><th scope="col">Rough OSI match</th><th scope="col">What it handles</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="TCP/IP layer">Application</td><td data-label="Rough OSI match">Application, Presentation, and Session</td><td data-label="What it handles">Application services, data formatting, encryption, and session functions.</td></tr>
      <tr><td data-label="TCP/IP layer">Transport</td><td data-label="Rough OSI match">Transport</td><td data-label="What it handles">Communication between applications, including TCP and UDP.</td></tr>
      <tr><td data-label="TCP/IP layer">Internet</td><td data-label="Rough OSI match">Network</td><td data-label="What it handles">IP addressing, packet delivery, and routing between networks.</td></tr>
      <tr><td data-label="TCP/IP layer">Network Access</td><td data-label="Rough OSI match">Data Link and Physical</td><td data-label="What it handles">Frames, local delivery, media access, cables, fiber, and radio signals.</td></tr>
    </tbody>
  </table>
</div>

The mapping is approximate because the two models were created for different purposes. The important relationship is that TCP/IP combines the top three OSI layers into its Application layer and combines the bottom two OSI layers into its Network Access layer.

For example:

- A web application firewall examines application requests rather than only IP addresses and ports.
- A network firewall can filter traffic by addresses, ports, connection state, and sometimes application identity.
- Media Access Control Security (MACsec) protects Ethernet frames on a local link.
- Transport Layer Security (TLS) protects an application session between endpoints or intermediaries.
- Internet Protocol Security (IPsec) protects IP packets and can connect hosts or networks.

A control at one layer does not automatically protect every other layer. An encrypted connection can carry malicious application requests. A segmented network can still expose an insecure service inside the segment.

<h3>IPv4 and IPv6</h3>

An **IP address** identifies a network interface so packets can be delivered to it. IPv4 uses 32-bit addresses. IPv6 uses 128-bit addresses and provides a much larger address space.

Important traffic types include:

- **Unicast:** one sender sends to one destination.
- **Broadcast:** one sender sends to every device in an IPv4 broadcast domain. IPv6 does not use broadcast.
- **Multicast:** one sender sends to a group of interested receivers.
- **Anycast:** the same address is available from multiple systems, and routing delivers traffic to one of them, usually the one with the best route.

IPv6 should not be treated as automatically secure. It changes addressing, discovery, configuration, and filtering requirements. Security devices, inventories, monitoring tools, access rules, and incident procedures must understand both IPv4 and IPv6 when both are present.

Temporary tunnels and translation mechanisms can help during migration, but they also create additional paths and headers that monitoring and filtering tools must inspect.

<h2 id="secure-protocols">Choose secure protocols for the communication need</h2>

A secure protocol protects a communication function such as remote administration, web traffic, or site-to-site connectivity. The protocol name alone does not make the channel safe. Security depends on current versions, strong configuration, trusted identities, protected keys, and correct endpoint behavior.

<h3>IPsec</h3>

**Internet Protocol Security (IPsec)** protects IP packets. It can provide confidentiality, integrity, peer authentication, and protection against replayed packets.

Two common modes are:

- **Transport mode:** protects the packet's payload while keeping the original IP header. It is commonly used between hosts.
- **Tunnel mode:** protects the original packet by placing it inside a new packet. It is commonly used between security gateways or for remote-access virtual private networks.

The Internet Key Exchange (IKE) process negotiates security parameters and establishes keys. Weak peer authentication, old algorithms, incorrect traffic selectors, and poor key handling can undermine the tunnel even when IPsec is present.

<h3>SSH</h3>

**Secure Shell (SSH)** provides an encrypted and authenticated channel for remote administration and related services. It is commonly used for command-line access, file transfer, and tunneling.

Protect SSH by limiting which systems can reach it, using strong authentication, controlling administrative privileges, protecting host keys, recording appropriate activity, and disabling older or unnecessary features. An encrypted administrative session does not excuse broad network exposure or shared administrator accounts.

<h3>TLS and SSL</h3>

**Transport Layer Security (TLS)** protects application traffic between communicating endpoints. It can encrypt data, detect changes, and authenticate a server. It can also authenticate the client when mutual TLS is used.

**Secure Sockets Layer (SSL)** is the older predecessor to TLS. SSL is obsolete and should not be treated as an acceptable modern protocol merely because people still use “SSL” as a casual name for encrypted web traffic.

TLS security depends on more than enabling HTTPS. Important decisions include:

- Which TLS versions and cipher suites are allowed
- How certificates are issued, validated, renewed, and revoked
- Whether traffic is terminated or inspected by an intermediary
- Whether mutual authentication is required
- How private keys are stored
- Whether application redirects, cookies, headers, and session controls are also secure

<h3>Multilayer and converged protocols</h3>

A **multilayer protocol** places one protocol inside another or uses several layers together to deliver a service. Encapsulation can provide flexibility and protection, but it can also hide traffic from a control that does not understand the inner protocol.

Examples include:

- Application traffic inside TLS
- IP packets inside an IPsec tunnel
- Network overlays carried across an underlay network
- Storage traffic carried over Ethernet or IP

A **converged network** carries services that once used separate infrastructure. Voice over Internet Protocol (VoIP), Internet Small Computer Systems Interface (iSCSI), InfiniBand over Ethernet, management traffic, storage traffic, and application traffic may share links and devices. The official outline also includes Compute Express Link (CXL), a high-speed interconnect used among processors, memory, and accelerators.

Convergence can reduce cost and simplify infrastructure, but it also joins failure domains. A shared switch failure, denial-of-service event, routing error, or congestion problem may affect voice, storage, applications, and administration at the same time. Use segmentation, quality of service, capacity planning, resilience, and monitoring to prevent one workload from overwhelming the others.

<h2 id="transport-performance">Design transport paths for security and service quality</h2>

A transport architecture describes how traffic moves through the network and which devices make forwarding decisions. Security choices must fit the topology, traffic direction, failure modes, and performance requirements.

<h3>Topology and planes</h3>

A **topology** is the arrangement of connections between systems and network devices. Common designs include star, mesh, hub-and-spoke, leaf-and-spine, and combinations of these patterns.

Network functions are often separated into planes:

- **Data plane:** forwards ordinary user and application traffic.
- **Control plane:** learns routes, topology, and other information used to make forwarding decisions.
- **Management plane:** allows administrators and management systems to configure and monitor devices.

Protecting the management plane is especially important because control of a network device can provide control of the traffic that crosses it. Use separate management paths where practical, strong administrator authentication, limited source addresses, encrypted protocols, logging, and configuration control.

The control plane also needs protection against false route information, excessive updates, resource exhaustion, and unauthorized peers.

<h3>Forwarding methods</h3>

**Store-and-forward switching** receives the complete frame and checks it before forwarding. **Cut-through switching** begins forwarding after reading enough of the frame to determine the destination.

Cut-through can reduce delay, while store-and-forward can detect some damaged frames before passing them onward. The right choice depends on performance, error handling, equipment capability, and workload requirements.

<h3>Performance metrics</h3>

Security and availability depend on understanding what the network can actually carry.

- **Bandwidth** is the theoretical or configured capacity of a link.
- **Throughput** is the amount of useful data successfully delivered during a period.
- **Latency** is the time data takes to travel from source to destination.
- **Jitter** is variation in delay between packets. Voice and video are especially sensitive to it.
- **Signal-to-noise ratio** compares the desired signal with unwanted interference. A higher ratio generally means the receiver can distinguish the signal more reliably.
- **Packet loss** is the percentage of packets that do not reach the destination.

A security control that creates unacceptable delay or packet loss may cause people to bypass it or may make a critical service unusable. Capacity and performance testing should include encryption, inspection, logging, failover, and peak traffic rather than only normal unprotected traffic.

<h2 id="segmentation-flows">Control traffic flows with segmentation</h2>

**Segmentation** divides a network into smaller areas so communication can be limited and monitored. The goal is not to create more diagrams. The goal is to reduce unnecessary access, contain failures, and make allowed traffic easier to understand.

<h3>North-south and east-west traffic</h3>

- **North-south traffic** enters or leaves an environment, such as traffic between an internal application and the Internet.
- **East-west traffic** moves between systems inside an environment, such as traffic between application servers, databases, containers, or cloud workloads.

Traditional perimeter controls often focus on north-south traffic. Attackers who compromise one internal system may move east-west toward other systems. Internal segmentation and workload-level controls help limit that movement.

<h3>Physical segmentation</h3>

**Physical segmentation** uses separate hardware or transmission paths.

- **In-band management** uses the same general network that carries production traffic.
- **Out-of-band management** uses a separate path for administration and recovery.
- **Air-gapped** systems have no intended network connection to less trusted systems.

Physical separation can reduce shared exposure, but it does not eliminate all paths. Removable media, maintenance laptops, wireless interfaces, suppliers, people, and temporary connections can cross the boundary. An air gap must be supported by procedures, inventory, monitoring, and controlled transfer methods.

<h3>Logical segmentation</h3>

**Logical segmentation** separates traffic through configuration while the underlying hardware may still be shared.

- A **virtual local area network (VLAN)** creates a separate Layer 2 broadcast domain.
- A **virtual private network (VPN)** creates a protected logical connection across another network.
- **Virtual routing and forwarding (VRF)** allows one router to maintain separate routing tables.
- A **virtual domain** divides one physical platform into separate logical security or administrative contexts.

Logical separation is useful only when the boundaries are enforced. VLANs do not replace routing and firewall policy. A VPN protects traffic across the tunnel but does not prove that the connected endpoint is trustworthy.

<h3>Microsegmentation and zero trust</h3>

**Microsegmentation** applies narrowly scoped communication rules to workloads, applications, or small groups of systems. Controls may be enforced by distributed firewalls, host agents, virtual switches, routers, gateways, service meshes, or cloud policies.

The plain goal is simple: a compromised workload should not be able to contact every other workload merely because both are inside the same data center or cloud account.

A **network overlay** creates a logical network on top of another network. Encapsulation carries overlay traffic across the underlying network. The overlay can improve flexibility and isolation, but operations teams still need visibility into both layers.

**Zero trust** does not mean that no communication is allowed. It means access is not granted merely because a user or device is on an internal network. Each request should be evaluated using identity, device state, policy, resource sensitivity, and current context.

<h2 id="edge-wireless">Protect edge, wireless, cellular, and distribution networks</h2>

The network edge is where an organization connects to users, providers, partners, cloud services, and the public Internet. It is both a service boundary and a common attack point.

<h3>Ingress, egress, and peering</h3>

- **Ingress traffic** enters the organization's network or service.
- **Egress traffic** leaves it.
- **Peering** is a direct routing relationship between networks that exchange traffic.

Ingress controls limit what outside systems can reach. Egress controls limit where internal systems can send traffic. Egress monitoring can reveal command-and-control connections, data transfer, misconfiguration, or unexpected cloud use.

Edge design may include redundant providers, route filtering, denial-of-service protection, firewalls, proxies, load balancers, content delivery networks, and separate services for public-facing systems.

<h3>Wireless networks</h3>

Wireless signals can travel beyond walls and property boundaries. Security must address both the radio environment and the devices using it.

For Wi-Fi, important controls include:

- Current encryption and authentication methods
- Enterprise authentication where appropriate
- Protected administrator access and strong device configuration
- Separate guest and unmanaged-device access
- Detection of unauthorized or impersonating access points
- Coverage planning and signal assessment
- Client isolation where users should not communicate directly
- Certificate and credential lifecycle management

Bluetooth and Zigbee serve different ranges and device types, but the same questions apply: how are devices paired, authenticated, updated, inventoried, and removed? What information do they expose, and can an untrusted device join the network?

<h3>Cellular, mobile, and satellite networks</h3>

Fourth-generation and fifth-generation cellular networks can provide primary or backup connectivity. Security responsibilities are shared among the organization, device maker, carrier, platform provider, and application owner.

Consider device identity, subscriber credentials, roaming, baseband and operating-system updates, management control, application encryption, location privacy, carrier dependencies, and lawful or contractual requirements.

Satellite links can reach areas without terrestrial service, but they may have greater delay, weather or visibility limitations, specialized equipment, and provider dependencies. Encrypt sensitive application traffic even when the carrier link has its own protections.

<h3>Content delivery networks</h3>

A **content delivery network (CDN)** places copies or delivery points closer to users so content can arrive faster and absorb large request volumes. A CDN can improve availability and reduce load on the origin service.

It also changes the trust path. The organization must manage certificates, origin access, cache rules, logging, purge procedures, provider administration, and protection against exposing the origin directly.

<h2 id="software-defined-cloud">Secure software-defined and cloud networks</h2>

Modern networks are increasingly controlled through software, application programming interfaces, and cloud policy. This can improve consistency and automation, but a mistake or stolen administrative credential can change many systems at once.

<h3>SDN, SD-WAN, and NFV</h3>

**Software-defined networking (SDN)** separates network control decisions from packet forwarding and manages those decisions through software. The controller and its application programming interfaces become high-value assets because they can change routes, policies, and flows across the environment.

**Software-Defined Wide Area Networking (SD-WAN)** uses centralized software policy to select and manage paths across multiple wide-area links. It can improve availability and application performance, but it requires secure controllers, protected edge devices, trustworthy updates, and clear provider responsibilities.

**Network functions virtualization (NFV)** runs functions such as routing, firewalling, load balancing, or intrusion detection as software instead of dedicated appliances. Protect the virtualization platform, management interfaces, images, orchestration system, and resource isolation.

<h3>Virtual Private Clouds</h3>

A **Virtual Private Cloud (VPC)** is a logically isolated network area inside a cloud provider. It usually includes subnets, route tables, gateways, security rules, and connections to other networks.

A VPC is not private merely because it has “private” in the name. Public addresses, permissive security groups, exposed gateways, peering relationships, shared services, identity permissions, and provider-managed components can still create paths into or out of it.

Treat cloud network policy as code where practical. Review changes, test them, limit who can approve them, and monitor for drift from the approved design.

<h2 id="monitoring-management">Make the network observable and manageable</h2>

**Network observability** means having enough evidence to understand what the network is doing and investigate why. It combines data such as logs, metrics, flows, packet samples, traces, configurations, routes, and device health.

Monitoring should answer practical questions:

- Which systems communicated?
- Was the connection allowed and expected?
- How much data moved?
- Did performance change?
- Did a route, policy, certificate, or configuration change?
- Is a device or link failing?
- Can the team trace an event across on-premises, cloud, wireless, and provider networks?

<h3>Traffic flow and shaping</h3>

**Traffic shaping** controls how quickly selected traffic can use a link. **Quality of service (QoS)** classifies and prioritizes traffic so important applications receive the performance they need.

These controls can protect voice, video, storage, and critical applications from congestion. They do not create more bandwidth. Policies should be based on business importance and verified under real load.

<h3>Capacity and fault management</h3>

Capacity management compares current use, expected growth, peak demand, and failure conditions with available resources. Include the overhead created by encryption, inspection, replication, backups, logging, and failover.

Fault management detects, isolates, reports, and helps correct failures. Good monitoring should distinguish a failed component from a security event, while recognizing that attackers may intentionally create conditions that resemble ordinary failure.

Management systems also need protection. Use strong authentication, least privilege, secure protocols, restricted administration paths, configuration backups, change control, time synchronization, and monitored administrative activity.

<h2 id="network-components">Secure network components and transmission media</h2>

Network architecture depends on physical and virtual components that must remain supported, configured, powered, and protected.

<h3>Infrastructure operation</h3>

Routers, switches, firewalls, wireless controllers, load balancers, proxies, gateways, and virtual network functions require lifecycle management.

Important considerations include:

- Redundant power supplies, links, devices, and paths
- Tested failover rather than assumed failover
- Current firmware and secure configuration baselines
- Warranty, vendor support, replacement inventory, and support contracts
- Configuration backups and controlled restoration
- Time synchronization and reliable logging
- Restricted local and remote administration
- End-of-life and end-of-support planning

Redundancy can improve availability, but duplicated components must not share every dependency. Two firewalls connected to one power source or one upstream provider do not protect against those shared failures.

<h3>Transmission media</h3>

**Transmission media** is the path that carries the signal, such as copper cable, fiber-optic cable, or radio.

Protect media against unauthorized access, damage, interference, tapping, and accidental disconnection. Controls may include locked pathways, protected closets, conduit, separation from electrical interference, tamper evidence, route diversity, and monitoring.

Fiber is difficult to tap without detection when properly monitored, but it is not impossible. Copper can leak electromagnetic signals and is affected by interference. Wireless media crosses physical boundaries. Select protections based on the environment and information sensitivity rather than assuming one medium is universally safe.

<h3>Network Access Control</h3>

**Network Access Control (NAC)** checks a user or device before granting network access and may continue checking while the connection remains active.

A NAC decision can use identity, device ownership, certificate status, operating-system version, security-tool status, location, and other policy conditions. Possible results include full access, limited access, remediation access, guest access, or denial.

NAC does not replace segmentation or endpoint security. It helps decide how a device enters the network. The architecture must still limit what the device can reach after admission.

<h3>Endpoint security</h3>

An **endpoint** is a device that connects to and uses the network, such as a workstation, server, phone, sensor, or virtual machine. Endpoint controls may include host firewalls, endpoint detection and response, anti-malware, disk encryption, application control, configuration management, patching, and device certificates.

The network and endpoint should reinforce one another. Network controls can limit exposure and detect unusual traffic. Endpoint controls can see local processes and behavior that the network cannot. A remote device with a valid VPN connection can still be dangerous if it is compromised.

<h2 id="communication-channels">Implement secure communication channels according to design</h2>

A secure channel must match the users, devices, data, service, and operating environment. Encryption is important, but so are authentication, authorization, endpoint security, availability, monitoring, and lifecycle management.

<h3>Voice, video, and collaboration</h3>

Voice and video services may carry business discussions, personal information, recordings, screen shares, files, and chat messages. Protect signaling, media, meeting access, recordings, administrative consoles, integrations, and room devices.

Useful controls include:

- Authenticated meeting access and waiting rooms where appropriate
- Protected invitations and meeting identifiers
- Encryption for signaling and media
- Controlled recording and retention
- Restricted screen sharing and file transfer
- Updated room systems and conferencing clients
- Clear handling rules for confidential discussions
- Monitoring for fraud, impersonation, and unauthorized forwarding

Availability and quality matter. Excessive delay, jitter, or packet loss can make emergency or business communication unusable.

<h3>Remote access and network administration</h3>

Remote access extends an organization's trust decisions to devices and networks it may not control. Begin by deciding whether the user needs access to an entire network, one application, a virtual desktop, or an administrative interface.

Strong remote access commonly includes:

- Multi-factor authentication
- Managed devices or verified device health
- Least-privilege access to specific resources
- Encryption using current protocols
- Separate privileged administration paths
- Session timeouts and reauthentication
- Monitoring, logging, and alerting
- Restrictions on split tunneling when it creates unacceptable exposure
- Secure recovery and revocation processes

Administrative access deserves stronger controls than ordinary user access. Consider dedicated workstations, bastion hosts, just-in-time privileges, out-of-band management, and approval or monitoring for high-impact changes.

<h3>Data communications and backhaul</h3>

A **backhaul network** carries traffic from an access location or remote site toward the main network or provider core. Examples include cellular backhaul, branch connectivity, and links from remote sensors or facilities.

The organization should understand where the link begins and ends, who operates each segment, how traffic is protected, what capacity and availability are promised, and how failures are escalated. Encrypt sensitive data end to end when provider protections do not fully meet the requirement.

<h3>Third-party connectivity</h3>

Every partner, telecom provider, managed service, cloud connection, and hardware-support path creates a trust relationship.

Before connecting a third party:

1. Define the business purpose and required flows.
2. Identify data, systems, and administrative privileges exposed by the connection.
3. Perform appropriate due diligence.
4. Document security, availability, monitoring, incident, notification, and termination requirements.
5. Use the narrowest practical segmentation and access.
6. Authenticate both parties and protect the channel.
7. Monitor use and review continued need.
8. Revoke access and remove routes when the relationship ends.

A support tunnel left open for convenience can become a permanent uncontrolled path. Temporary access should expire automatically when possible.

<h2 id="ai-networking">Protect AI workloads and use AI carefully in network defense</h2>

AI workloads can move large training datasets between storage, accelerators, cloud services, and distributed compute nodes. Inference may also occur at branch, mobile, or edge locations.

Apply the same network principles used for other critical workloads:

- Segment training, development, testing, and production environments.
- Limit which datasets, model stores, tools, and external services each workload can reach.
- Protect communication between distributed nodes and management systems.
- Monitor large or unusual data transfers.
- Separate management traffic from workload traffic.
- Control third-party model and application programming interface connections.
- Plan capacity for high-volume data movement without weakening inspection or logging.

Network Detection and Response (NDR) tools may use machine learning to identify traffic patterns that differ from an established baseline. This can help surface activity that a fixed signature does not recognize.

AI-based detection still requires validation and human oversight. A model can produce false alarms, miss new behavior, inherit biased training data, or become less useful as network patterns change. Protect the detection platform, document how alerts are used, and measure whether it improves investigation and response.

<h2 id="exam-traps">Common Domain 4 exam traps</h2>

<h3>Choosing encryption before defining the connection</h3>

Encryption protects data in transit, but the design must still define allowed participants, authentication, routing, segmentation, endpoint security, and monitoring.

<h3>Treating an internal network as trusted</h3>

Internal location alone does not prove that a user, device, or workload should have access. Evaluate each request according to identity, device condition, policy, and resource sensitivity.

<h3>Confusing a VLAN with a security policy</h3>

A VLAN creates a separate Layer 2 domain. Routing, firewall rules, access controls, and monitoring determine what can cross between VLANs.

<h3>Assuming a VPN secures the endpoint</h3>

A VPN protects traffic through the tunnel. It does not remove malware, patch a device, limit excessive privileges, or prove that every application on the endpoint is safe.

<h3>Protecting north-south traffic while ignoring east-west movement</h3>

A strong perimeter does not stop a compromised internal workload from contacting every other internal system. Use internal segmentation and workload-level policy.

<h3>Calling SSL and TLS interchangeable</h3>

People may casually say “SSL certificate,” but SSL protocols are obsolete. Modern secure application transport uses supported TLS versions and sound certificate management.

<h3>Adding redundancy without removing shared failures</h3>

Two devices do not provide meaningful resilience if they depend on the same power, link, provider, route, controller, or physical location.

<h3>Opening broad access for a supplier</h3>

Third-party access should be limited to the required systems, time, actions, and source conditions. It should be authenticated, monitored, reviewed, and removed when no longer needed.

<h3>Collecting more telemetry without an operating plan</h3>

Logs and flows are useful only when the organization can retain, search, correlate, protect, and act on them. Begin with questions the monitoring program needs to answer.

<h2 id="review-checklist">Domain 4 review checklist</h2>

You should be able to:

- Explain what each OSI layer does in plain language and map it to the TCP/IP model.
- Distinguish unicast, broadcast, multicast, and anycast.
- Explain why IPv6 requires its own inventory, filtering, and monitoring attention.
- Compare IPsec transport and tunnel modes.
- Explain when SSH, TLS, and IPsec protect different communication needs.
- Explain why SSL is not an acceptable modern protocol.
- Describe the security implications of encapsulation and converged traffic.
- Distinguish the data, control, and management planes.
- Compare bandwidth, throughput, latency, jitter, packet loss, and signal-to-noise ratio.
- Distinguish north-south from east-west traffic.
- Compare physical, logical, and microsegmentation.
- Explain in-band, out-of-band, and air-gapped management or operation.
- Explain what VLANs, VPNs, VRFs, and virtual domains separate.
- Explain overlays and why both overlay and underlay visibility matter.
- Describe ingress, egress, peering, and content delivery network concerns.
- Identify wireless, cellular, mobile, and satellite security considerations.
- Explain SDN, SD-WAN, NFV, and VPC responsibilities.
- Define network observability and identify useful telemetry.
- Explain traffic shaping, quality of service, capacity management, and fault management.
- Identify infrastructure lifecycle, power, support, and failover concerns.
- Explain how transmission media can be damaged, intercepted, or disrupted.
- Explain what NAC checks and what it does not replace.
- Combine endpoint and network controls rather than treating either as sufficient alone.
- Select protections for voice, video, collaboration, remote access, and backhaul links.
- Design narrow, monitored, and revocable third-party connections.
- Apply segmentation and monitoring to AI training, inference, and network-defense systems.

<h2 id="official-references">Official references</h2>

Use the current ISC2 outline as the authoritative scope for Domain 4. The other sources provide primary guidance for major network-security topics:

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-215: Guide to a Secure Enterprise Network Landscape](https://csrc.nist.gov/pubs/sp/800/215/final)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-52 Revision 2: Guidelines for TLS Implementations](https://csrc.nist.gov/pubs/sp/800/52/r2/final)
- [NIST SP 800-77 Revision 1: Guide to IPsec VPNs](https://csrc.nist.gov/pubs/sp/800/77/r1/final)
- [NIST SP 800-46 Revision 2: Enterprise Telework, Remote Access, and BYOD Security](https://csrc.nist.gov/pubs/sp/800/46/r2/final)
- [NIST SP 800-153: Guidelines for Securing Wireless Local Area Networks](https://csrc.nist.gov/pubs/sp/800/153/final)
- [NIST SP 800-137: Information Security Continuous Monitoring](https://csrc.nist.gov/pubs/sp/800/137/final)
- [NIST SP 800-125B: Secure Virtual Network Configuration](https://csrc.nist.gov/pubs/sp/800/125/b/final)
- [IETF RFC 8200: Internet Protocol, Version 6 Specification](https://www.rfc-editor.org/rfc/rfc8200)
- [IETF RFC 4301: Security Architecture for the Internet Protocol](https://www.rfc-editor.org/rfc/rfc4301)
- [IETF RFC 4251: The Secure Shell Protocol Architecture](https://www.rfc-editor.org/rfc/rfc4251)
- [IETF RFC 8446: The Transport Layer Security Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446)
- [IETF RFC 7568: Deprecating Secure Sockets Layer Version 3.0](https://www.rfc-editor.org/rfc/rfc7568)
