---
layout: layouts/article.njk
title: "Network+ N10-009 Domain 4: Network Security"
description: Study Network+ N10-009 Domain 4 through practical identity, encryption, segmentation, attack recognition, hardening, network access control, filtering, and security-zone decisions.
permalink: /network-plus/n10-009/study-guide/network-security/
ogType: article
printable: true
printTitle: "Network+ N10-009 Domain 4: Network Security"
author: certHappens
datePublished: 2026-07-26
articleSection: Network+ N10-009 Domain 4
eyebrow: Network+ domain 4 guide
lede: Protect traffic and administrative access by matching each risk to the control point that can actually change the outcome.
breadcrumbs:
  - label: Home
    url: /
  - label: Network+
    url: /network-plus/
  - label: N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
  - label: Domain 4
    url: /network-plus/n10-009/study-guide/network-security/
toc:
  - id: domain-map
    label: Domain map
  - id: security-decisions
    label: Security decisions
  - id: encryption
    label: Encryption
  - id: certificates-pki
    label: Certificates and PKI
  - id: identity-access
    label: Identity and access
  - id: physical-deception
    label: Physical and deception controls
  - id: terminology-compliance
    label: Terminology and compliance
  - id: segmentation
    label: Segmentation
  - id: network-attacks
    label: Network attacks
  - id: layer2-attacks
    label: Layer 2 attacks
  - id: name-address-attacks
    label: Name and address attacks
  - id: wireless-human-malware
    label: Wireless, human, and malware threats
  - id: hardening-nac
    label: Hardening and NAC
  - id: keys-rules-zones
    label: Keys, rules, and zones
  - id: security-scenarios
    label: Security scenarios
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CompTIA Network+
  - N10-009 Domain 4
  - network security
  - network attacks
  - network access control
  - RADIUS and TACACS+
  - network segmentation
  - device hardening
relatedLinks:
  - title: Network+ Acronyms and Terms
    url: /network-plus/acronyms/
    description: Look up full expansions, practical meanings, related terms, and the domains where each abbreviation appears.
  - title: Network+ N10-009 Practice Test
    url: /network-plus/n10-009/practice-test/
    description: Apply identity, attack, segmentation, hardening, and access-control decisions in randomized questions.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Return to the complete roadmap for all five exam domains.
  - title: "Domain 1: Networking Concepts"
    url: /network-plus/n10-009/study-guide/networking-concepts/
    description: Review firewalls, proxies, VPNs, zero trust, cloud security boundaries, protocols, and traffic flow.
  - title: "Domain 2: Network Implementation"
    url: /network-plus/n10-009/study-guide/network-implementation/
    description: Review VLANs, trunks, wireless authentication, WPA2, WPA3, guest networks, and physical installation controls.
  - title: "Domain 3: Network Operations"
    url: /network-plus/n10-009/study-guide/network-operations/
    description: Connect security decisions to monitoring, configuration control, logs, time services, VPN access, and management paths.
  - title: "Domain 5: Network Troubleshooting"
    url: /network-plus/n10-009/study-guide/network-troubleshooting/
    description: Diagnose blocked traffic, rogue services, address failures, interface counters, wireless symptoms, and performance problems from evidence.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Review RADIUS, LDAP, LDAPS, SSH, HTTPS, DNS, DHCP, and other services that appear in security scenarios.
  - title: Security+ resource hub
    url: /security-plus/
    description: Continue into deeper security architecture, threats, controls, operations, and governance topics.
  - title: Network+ resource hub
    url: /network-plus/
    description: Find the current practice test, detailed guides, and shared networking references.
---
Domain 4 accounts for 14% of N10-009. The percentage is smaller than the other domains, but security clues appear inside routing, switching, wireless, operations, and troubleshooting questions. A switchport that accepts any device is both an implementation choice and an access-control decision. A false default gateway from a rogue DHCP server looks like a connectivity problem until the unauthorized service is identified.

Security questions become easier when you identify four things: the asset, the threat, the control point, and the evidence that would prove the control worked. A certificate protects a different decision than an access control list. Port security addresses a different problem than 802.1X. A screened subnet changes where a public service sits, while URL filtering changes which destinations users may request.

Use this guide to compare nearby answers and follow the attack path. The official objectives remain the coverage checklist. The examples below show where each control belongs and what failure or attack it can reasonably prevent, limit, detect, or investigate.

<div class="article-callout">
  <p><strong>Security rule:</strong> Put the control where the unwanted action becomes observable and enforceable. A policy written in a document cannot stop a frame. A switch feature cannot validate a web page's certificate. A firewall rule cannot repair a stolen administrator password.</p>
</div>

<h2 id="domain-map">Domain 4 objective map</h2>

<div class="table-scroll" role="region" aria-label="Network+ Domain 4 objective map" tabindex="0">
  <table class="mobile-card-table domain4-objective-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main topic</th>
        <th scope="col">Decision to make</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Objective">4.1</td>
        <td data-label="Main topic">Basic network security concepts</td>
        <td data-label="Decision to make">Which identity, encryption, physical, compliance, or segmentation concept applies to the stated asset and trust boundary?</td>
      </tr>
      <tr>
        <td data-label="Objective">4.2</td>
        <td data-label="Main topic">Attacks and network impact</td>
        <td data-label="Decision to make">Which attack best explains the changed forwarding, address, name-resolution, wireless, user, or availability behavior?</td>
      </tr>
      <tr>
        <td data-label="Objective">4.3</td>
        <td data-label="Main topic">Security features and defenses</td>
        <td data-label="Decision to make">Which hardening step, access-control feature, key process, rule, or security zone blocks or limits the described action?</td>
      </tr>
    </tbody>
  </table>
</div>

The three objectives form a practical sequence. Objective 4.1 supplies the security model. Objective 4.2 shows what can go wrong. Objective 4.3 asks you to place a control against that path. Keep moving between them instead of studying three unrelated lists.

<h2 id="security-decisions">Make security decisions from the traffic path</h2>

Begin with the normal path. A managed laptop connects to a switchport, authenticates through 802.1X, receives an address from an approved DHCP service, resolves a name through an approved DNS resolver, crosses a firewall between zones, and establishes an encrypted application session. Administrative changes come through a restricted management path using an individual account and centralized authorization.

An attacker or failure changes one of those steps:

- A rogue DHCP server supplies the wrong gateway or DNS resolver.
- ARP spoofing changes the local mapping between an IP address and a MAC address.
- DNS poisoning changes the address returned for a name.
- An evil twin persuades a wireless client to join the wrong access point.
- A stolen administrator credential turns an approved management protocol into an unauthorized session.
- A DDoS attack overwhelms a service or its upstream capacity even though the configuration is otherwise correct.

The best control usually sits close to the changed behavior. DHCP snooping belongs on switches that can distinguish trusted DHCP paths from access ports. Certificate validation belongs at the endpoint establishing the protected session. ACLs and firewalls belong at Layer 3 and Layer 4 boundaries. Identity-based admission belongs at the network edge before broad access is granted.

<h2 id="encryption">Separate encryption in transit from encryption at rest</h2>

**Data in transit** is moving between systems or components. TLS-protected HTTPS, SSH, IPsec, and protected wireless sessions are examples. The security question is whether the endpoints authenticate appropriately, negotiate an approved protocol and algorithm, protect keys, and reject invalid or untrusted peers.

**Data at rest** is stored on a drive, database, backup, mobile device, or other persistent medium. Full-disk encryption can protect a stolen laptop while database or file-level encryption may protect selected information from broader storage access. Backups need the same attention because a copied backup can contain the information an attacker wanted from the production system.

Encryption supports confidentiality, but it does not automatically supply every part of the CIA triad. A server can encrypt traffic and still be unavailable. An authorized user can alter encrypted data after authentication. A valid encrypted session can carry malware or a destructive command. Match the control to the stated requirement instead of treating encryption as a general-purpose shield.

<h3>What encryption does not prove by itself</h3>

A padlock icon shows that a protected session was established, not that the remote service is honest, correctly configured, free of malware, or authorized for the requested business action. Trust depends on certificate validation, identity, policy, endpoint condition, and the application itself.

A VPN protects traffic across an untrusted path, but it also extends access. The VPN user or site must still be authenticated, authorized, segmented, monitored, and limited to the required resources. Encryption can hide malicious traffic from devices that lack an inspection point, so placement and visibility matter.

<h2 id="certificates-pki">Use certificates and PKI for scalable trust</h2>

A digital certificate binds an identity or name to a public key and carries information such as issuer, subject, validity period, permitted uses, and signatures. Public key infrastructure supplies the policies, certificate authorities, registration processes, trust stores, issuance, renewal, revocation, and validation that make certificates manageable at scale.

A simplified TLS trust decision looks like this:

1. The server presents a certificate and the certificates needed to build a trust chain.
2. The client checks whether the requested hostname matches the certificate.
3. The client checks dates, signatures, permitted use, and whether the chain reaches a trusted root.
4. The endpoints establish session keys and protect the application traffic.

A certificate warning can come from an expired certificate, a hostname mismatch, an untrusted issuer, a missing intermediate certificate, a revoked certificate, or a client clock that makes the dates appear invalid. Clicking through the warning removes the protection that the validation step was supposed to provide.

<h3>Publicly trusted and private PKI</h3>

Public services usually need certificates that common client trust stores recognize. Internal services can use a private certificate authority when managed endpoints trust that authority and the organization can operate issuance, renewal, revocation, backup, and recovery correctly. Private PKI is useful, but it creates an operational responsibility rather than free trust.

<h3>Self-signed certificates</h3>

A self-signed certificate signs itself rather than chaining to a separately trusted authority. It can still protect traffic from passive observation after the client accepts the key, but the client needs a safe way to know that the certificate belongs to the intended system. Blindly accepting an unfamiliar self-signed certificate during a possible on-path attack defeats that identity check.

Self-signed certificates are common on newly installed appliances and labs. A production decision may be to replace them with certificates issued by an approved public or private PKI, especially when many administrators or automated clients must validate the service consistently.

<h3>Key management is part of certificate security</h3>

Protect private keys from unauthorized use and extraction. Define who can request, approve, install, rotate, revoke, recover, and destroy keys. Monitor expiration before a service outage. Back up keys only when recovery requirements justify it, and protect those copies at least as strongly as the originals.

<h2 id="identity-access">Distinguish authentication, authorization, and identity services</h2>

**Authentication** verifies the claimed identity. **Authorization** decides what that identity may do. **Accounting** records activity, time, usage, or commands. The three functions are often grouped as authentication, authorization, and accounting (AAA), but a scenario may ask for one specific decision.

A valid login does not imply administrative access. A user can authenticate successfully and still be denied a protected VLAN, device command, file, or application because authorization policy does not permit it.

<h3>MFA and SSO solve different problems</h3>

Multifactor authentication combines factors from different categories, such as something known, something possessed, or something inherent. Two passwords are two examples of the same factor type, not MFA.

Single sign-on allows one authentication event or identity session to support access to multiple connected services. SSO improves usability and can centralize policy, but it also raises the importance of protecting the identity provider and session. SSO does not necessarily mean MFA. An environment may use both.

Time-based authentication commonly generates a short-lived code from a shared secret and the current time. Clock drift can cause valid users to fail, which connects this security topic to the time-service controls in Domain 3.

The table compares Remote Authentication Dial-In User Service (RADIUS), Terminal Access Controller Access-Control System Plus (TACACS+), Lightweight Directory Access Protocol (LDAP), Security Assertion Markup Language (SAML), and role-based access control (RBAC). Each term belongs to a different part of the identity or administration workflow.

<div class="table-scroll" role="region" aria-label="Network identity and access services" tabindex="0">
  <table class="mobile-card-table domain4-identity-table">
    <thead>
      <tr>
        <th scope="col">Service or concept</th>
        <th scope="col">Common network use</th>
        <th scope="col">Key distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Service"><strong>RADIUS</strong></td>
        <td data-label="Common use">Centralized network access for wireless, VPN, and 802.1X deployments</td>
        <td data-label="Key distinction">Returns authentication results and authorization attributes; accounting is commonly handled through a related RADIUS service.</td>
      </tr>
      <tr>
        <td data-label="Service"><strong>TACACS+</strong></td>
        <td data-label="Common use">Centralized administration of routers, switches, firewalls, and other network devices</td>
        <td data-label="Key distinction">Supports separate authentication, authorization, and accounting decisions, including command-level administration in many deployments.</td>
      </tr>
      <tr>
        <td data-label="Service"><strong>LDAP</strong></td>
        <td data-label="Common use">Directory queries for users, groups, devices, and attributes</td>
        <td data-label="Key distinction">A directory protocol can support identity workflows without serving as a network admission method or a complete SSO design.</td>
      </tr>
      <tr>
        <td data-label="Service"><strong>SAML</strong></td>
        <td data-label="Common use">Federated identity assertions between an identity provider and a relying service</td>
        <td data-label="Key distinction">Common in browser-based federation; it carries assertions rather than acting like a switchport authentication protocol.</td>
      </tr>
      <tr>
        <td data-label="Service"><strong>RBAC</strong></td>
        <td data-label="Common use">Permissions assigned through job or functional roles</td>
        <td data-label="Key distinction">The role should reflect required duties and least privilege rather than convenience or seniority alone.</td>
      </tr>
      <tr>
        <td data-label="Service"><strong>Geofencing</strong></td>
        <td data-label="Common use">Allow, deny, or challenge access based partly on location</td>
        <td data-label="Key distinction">Location is a policy signal, not strong proof of identity, and inaccurate or manipulated location data must be considered.</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>RADIUS and TACACS+ are not interchangeable labels</h3>

RADIUS commonly appears when an endpoint or user is trying to join a network through Wi-Fi, VPN, or 802.1X. TACACS+ commonly appears when an administrator is logging into network infrastructure and the organization wants centralized command authorization and accounting.

The exact protocol security depends on deployment. Classic RADIUS and TACACS+ have limitations that should not be described as modern end-to-end encryption of the entire exchange. Protected transports and secure network placement may be required. For Network+ questions, start with the use case: network admission points toward RADIUS; network-device administration often points toward TACACS+.

<h3>Apply least privilege</h3>

Least privilege grants only the access needed for the approved task and duration. A help-desk role may view interface status and bounce an access port without changing routing policy. A monitoring account may read counters without modifying configuration. An automation identity may manage one device group through an API rather than receive unrestricted interactive access.

Use individual accounts where accountability matters. Shared administrator accounts hide who performed a change and make credential rotation harder. Emergency access accounts can exist, but they need strong protection, monitoring, and review after use.

<h2 id="physical-deception">Combine physical and deception controls with logical controls</h2>

Cameras and locks address physical access in different ways. A lock is primarily preventive because it restricts entry. A camera is primarily detective because it records or reveals activity, though its visible presence can also discourage some behavior. Neither replaces access logs, visitor procedures, rack locks, port controls, or logical authentication.

Physical compromise can bypass carefully designed logical controls. An attacker with access to an unlocked network closet may connect a rogue device, reset equipment, steal a configuration, attach a packet-capture device, or interrupt power and cabling.

<h3>Honeypots and honeynets</h3>

A **honeypot** is a decoy system or service intended to attract and observe suspicious activity. A **honeynet** is a broader decoy network containing multiple systems or services. Their value comes from controlled observation because legitimate users should have little reason to interact with them.

Deception technology needs isolation and monitoring. A compromised decoy must not become a convenient path into production or a launch point toward other systems. The data can support detection and investigation, but a honeypot does not patch vulnerable production servers or block an attack by itself.

<h2 id="terminology-compliance">Use security terminology precisely</h2>

<div class="table-scroll" role="region" aria-label="Network security terminology" tabindex="0">
  <table class="mobile-card-table domain4-terminology-table">
    <thead>
      <tr>
        <th scope="col">Term</th>
        <th scope="col">Meaning</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Term"><strong>Asset</strong></td>
        <td data-label="Meaning">Something the organization values and needs to protect</td>
        <td data-label="Example">A routing platform, customer database, private key, or service availability</td>
      </tr>
      <tr>
        <td data-label="Term"><strong>Threat</strong></td>
        <td data-label="Meaning">A circumstance or actor capable of causing harm</td>
        <td data-label="Example">A malicious insider, botnet, fire, or stolen device</td>
      </tr>
      <tr>
        <td data-label="Term"><strong>Vulnerability</strong></td>
        <td data-label="Meaning">A weakness that could be used or triggered</td>
        <td data-label="Example">Default credentials, an exposed service, or a misconfigured trunk</td>
      </tr>
      <tr>
        <td data-label="Term"><strong>Exploit</strong></td>
        <td data-label="Meaning">A method or action that uses a vulnerability</td>
        <td data-label="Example">A crafted request, stolen credential, or VLAN-hopping technique</td>
      </tr>
      <tr>
        <td data-label="Term"><strong>Risk</strong></td>
        <td data-label="Meaning">The potential effect of uncertainty or harm, considered with likelihood and impact</td>
        <td data-label="Example">The chance and business effect of an exposed management interface being compromised</td>
      </tr>
    </tbody>
  </table>
</div>

The terms describe relationships. A threat actor may use an exploit against a vulnerability in an asset, creating risk to confidentiality, integrity, or availability.

<h3>Confidentiality, integrity, and availability (CIA) triad</h3>

- **Confidentiality** limits information disclosure to authorized parties.
- **Integrity** protects information and systems from unauthorized or undetected change.
- **Availability** keeps systems and information accessible when authorized users need them.

A DDoS attack primarily targets availability. An on-path attacker who reads traffic threatens confidentiality. A rogue DHCP or DNS service can threaten integrity by supplying false network information and may then affect availability or confidentiality.

<h3>Audits, data locality, PCI DSS, and GDPR</h3>

An audit compares evidence against stated requirements, policies, standards, or regulations. The evidence may include configurations, logs, access reviews, diagrams, change records, vulnerability results, training records, and control tests.

**Data locality** concerns where data is stored, processed, transmitted, or otherwise handled. Architecture decisions may be constrained by region, jurisdiction, contract, or organizational policy. A cloud service's global reach does not remove those requirements.

**Payment Card Industry Data Security Standard (PCI DSS)** applies to environments that store, process, or transmit payment account data and to systems that can affect the security of that environment. **General Data Protection Regulation (GDPR)** establishes data-protection requirements involving personal data in its scope. Network+ expects recognition of the names and operational implications, not legal interpretation. Real compliance decisions require the applicable current text and qualified organizational guidance.

<h2 id="segmentation">Use segmentation to reduce unnecessary trust</h2>

Segmentation separates systems by role, risk, function, ownership, or required communication. VLANs create logical Layer 2 boundaries. Routers, Layer 3 switches, firewalls, ACLs, and security policies control traffic between segments. Microsegmentation can apply finer policy around workloads or applications, though the N10-009 objective focuses on the practical need to separate distinct device groups.

The examples include Internet of Things (IoT), Industrial Internet of Things (IIoT), supervisory control and data acquisition (SCADA), industrial control systems (ICS), operational technology (OT), and bring your own device (BYOD) networks. The expansion identifies the device group; the policy decision comes from its risk and required communication.

<div class="table-scroll" role="region" aria-label="Network segmentation examples" tabindex="0">
  <table class="mobile-card-table domain4-segmentation-table">
    <thead>
      <tr>
        <th scope="col">Segment</th>
        <th scope="col">Why separate it</th>
        <th scope="col">Typical policy direction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Segment"><strong>IoT and IIoT</strong></td>
        <td data-label="Why separate">Devices may have limited update support, specialized protocols, weak interfaces, or long replacement cycles.</td>
        <td data-label="Policy direction">Allow required controllers, brokers, DNS, time, and update paths; deny broad access to user and server networks.</td>
      </tr>
      <tr>
        <td data-label="Segment"><strong>SCADA, ICS, and OT</strong></td>
        <td data-label="Why separate">Availability and safety can be more important than ordinary office convenience, and legacy protocols may assume trusted networks.</td>
        <td data-label="Policy direction">Use tightly controlled conduits, approved jump paths, monitoring, and minimal communication with IT and external networks.</td>
      </tr>
      <tr>
        <td data-label="Segment"><strong>Guest</strong></td>
        <td data-label="Why separate">Visitors need internet access without access to internal systems.</td>
        <td data-label="Policy direction">Permit required internet services and captive-portal functions; deny internal address space and management networks.</td>
      </tr>
      <tr>
        <td data-label="Segment"><strong>BYOD</strong></td>
        <td data-label="Why separate">Personally owned devices may not meet the same management, patching, inspection, and data-protection controls as corporate endpoints.</td>
        <td data-label="Policy direction">Use identity and posture policy, limited application access, separate addressing, and stronger monitoring.</td>
      </tr>
      <tr>
        <td data-label="Segment"><strong>Management</strong></td>
        <td data-label="Why separate">Administrative interfaces can change the network and should not be reachable from ordinary user segments.</td>
        <td data-label="Policy direction">Allow approved administrators or jump hosts through protected management protocols; deny general user access.</td>
      </tr>
    </tbody>
  </table>
</div>

Segmentation without enforcement is only an addressing plan. If a guest VLAN can route freely to management interfaces, the names of the VLANs do not create security. Verify the firewall rules, ACLs, routing, wireless client isolation, and management-source restrictions that enforce the design.

<h3>Segmentation supports zero trust but does not equal zero trust</h3>

Zero trust removes implicit trust based only on network location or asset ownership. Authentication and authorization are evaluated before access to a resource, and policy can consider user, device, service, context, and risk. Segmentation can limit paths and reduce exposure, but placing a device on an internal VLAN should not automatically grant broad access.

<h2 id="network-attacks">Recognize the network effect of an attack</h2>

The exam may name the attack, describe its behavior, or show a symptom. Focus on what information or forwarding decision became false, overloaded, or unauthorized.

<div class="table-scroll" role="region" aria-label="Network attacks, effects, and evidence" tabindex="0">
  <table class="mobile-card-table domain4-attack-table">
    <thead>
      <tr>
        <th scope="col">Attack</th>
        <th scope="col">What changes</th>
        <th scope="col">Evidence or impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Attack"><strong>DoS or DDoS</strong></td>
        <td data-label="What changes">Capacity, connection state, processing, or another finite resource is exhausted.</td>
        <td data-label="Evidence or impact">High traffic or requests, resource saturation, increased latency, failed sessions, and service unavailability</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>VLAN hopping</strong></td>
        <td data-label="What changes">An attacker reaches traffic or a VLAN outside the intended access-port boundary.</td>
        <td data-label="Evidence or impact">Unexpected trunk negotiation, double-tagged traffic conditions, or access to an unauthorized VLAN</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>MAC flooding</strong></td>
        <td data-label="What changes">The switch forwarding table is filled or disrupted with many source MAC addresses.</td>
        <td data-label="Evidence or impact">Rapid MAC-table churn, many learned addresses on one port, resource pressure, and possible abnormal flooding behavior</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>ARP poisoning or spoofing</strong></td>
        <td data-label="What changes">A host accepts a false IPv4-to-MAC mapping on the local segment.</td>
        <td data-label="Evidence or impact">Gateway IP mapped to an unexpected MAC, duplicate ARP claims, intercepted traffic, or local loss of connectivity</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>DNS poisoning or spoofing</strong></td>
        <td data-label="What changes">A client or resolver accepts false name-resolution information.</td>
        <td data-label="Evidence or impact">Unexpected addresses for known names, inconsistent resolver answers, redirected sessions, or certificate mismatch warnings</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>Rogue DHCP</strong></td>
        <td data-label="What changes">An unauthorized server supplies addresses, gateways, DNS servers, or other options.</td>
        <td data-label="Evidence or impact">Clients receive settings from the wrong server, conflicting leases, incorrect gateway or DNS, and intermittent location-based failures</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>Rogue AP or evil twin</strong></td>
        <td data-label="What changes">Clients join an unauthorized or deceptive wireless path.</td>
        <td data-label="Evidence or impact">Unexpected BSSID, duplicate SSID, unusual certificate prompt, weaker security, or traffic leaving through an unknown uplink</td>
      </tr>
      <tr>
        <td data-label="Attack"><strong>On-path attack</strong></td>
        <td data-label="What changes">The attacker gains a position between communicating parties and can observe or alter traffic.</td>
        <td data-label="Evidence or impact">Certificate warnings, changed routes or mappings, session interception, modified data, or unexplained proxy behavior</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>DoS and DDoS</h3>

A denial-of-service attack can come from one source or one attack path. A distributed denial-of-service attack uses multiple sources, commonly a botnet or reflected traffic. Distribution makes source blocking and capacity defense harder.

Volume is only one method. Attacks can exhaust connection tables, application workers, CPU, memory, or a protocol-specific resource. The answer should fit the symptom. A large upstream flood may require provider or DDoS-scrubbing assistance, while a vulnerable service that consumes CPU on a small request may require patching, filtering, rate limits, or application changes.

Reflection and amplification use third-party services to send larger responses toward a spoofed victim address. Ingress filtering, restricting exposed UDP services, rate limiting, and provider coordination can reduce the problem. A local ACL may help with a narrow source or service, but it cannot recover bandwidth already saturated before traffic reaches the device.

<h2 id="layer2-attacks">Connect Layer 2 attacks to switch controls</h2>

<h3>VLAN hopping</h3>

VLAN hopping describes methods that cross an intended VLAN boundary through switching behavior or misconfiguration. Two commonly discussed paths are switch spoofing and double tagging.

An access port should not dynamically become a trunk because an untrusted endpoint asks. Configure the intended mode, limit allowed VLANs on trunks, use an unused native VLAN where the design calls for it, avoid placing user traffic on the native VLAN, and disable unused ports. The exact platform commands differ, but the decision is consistent: remove unneeded trunk negotiation and limit the trunk's scope.

Double-tagging depends on native-VLAN handling and the attacker's relationship to the first switch. The inner tag can remain after the outer native-VLAN tag is removed. It is generally one-directional and constrained by topology, so do not describe it as magical access to every VLAN.

<h3>MAC flooding</h3>

A switch learns source MAC addresses and associates them with ports. An attacker can send frames with many fabricated source addresses to pressure or fill the forwarding table. The historical description says the switch may begin flooding unknown unicast frames more broadly, but modern behavior varies by platform and resource protection.

Port security can limit the number or identity of MAC addresses learned on an access port and define what happens after a violation. Monitoring should also detect unusual MAC churn or many addresses appearing on a user-facing port. Port security does not authenticate a person, and a permitted MAC address can still be copied.

<h3>ARP poisoning and spoofing</h3>

ARP maps local IPv4 addresses to MAC addresses. A false ARP reply can tell a client that the attacker's MAC belongs to the default gateway, or tell the gateway that the attacker's MAC belongs to a victim. If forwarding continues through the attacker, the position can support an on-path attack. If it does not, connectivity may fail.

Dynamic ARP inspection can validate ARP messages against trusted bindings, often learned through DHCP snooping. Static ARP entries can help in narrow cases but do not scale well. Segmentation reduces the size of the local broadcast domain and therefore the number of systems directly exposed to local ARP manipulation.

<h2 id="name-address-attacks">Separate DNS, DHCP, and on-path attacks</h2>

DNS poisoning and spoofing can produce the same user symptom as a compromised website: the name resolves to an attacker's address. Check which resolver answered, the returned record, TTL, DNSSEC validation where used, local hosts-file entries, and whether multiple trusted resolvers agree. A certificate warning after redirection can be an important clue because the attacker's server may not possess a certificate valid for the requested name.

Rogue DHCP changes network configuration before the application request begins. The client may receive an attacker-controlled gateway or DNS resolver, enabling later interception or redirection. The clue is in the lease: DHCP server identifier, assigned gateway, DNS settings, scope, and timing.

DHCP snooping marks trusted ports for legitimate server replies and blocks unauthorized replies from access ports. It can also build binding information used by other controls. Configure the trusted direction carefully. Marking every uplink and access port as trusted removes the protection.

An on-path attack describes the attacker's position, not one single method. ARP spoofing, rogue DHCP, DNS manipulation, malicious wireless, compromised routing, or a deceptive proxy can help create that position. The defense follows the method plus endpoint validation and encryption.

<h2 id="wireless-human-malware">Recognize wireless, social, and malware paths</h2>

<h3>Rogue access point and evil twin</h3>

A rogue AP is an unauthorized wireless access point. It might be connected by an employee for convenience, installed by an attacker, or created through a misconfigured hotspot. An evil twin deliberately imitates a trusted wireless network to attract clients, often using the same or similar SSID.

The SSID is a name, not proof of identity. Enterprise wireless clients should validate the authentication server or certificate according to policy. Wireless monitoring can identify unexpected BSSIDs, channels, security settings, and signal locations. Wired controls can detect or block unauthorized AP connections. User training helps prevent acceptance of strange certificate prompts or captive portals.

<h3>Social engineering</h3>

- **Phishing** uses deceptive messages, pages, or attachments to obtain information, credentials, payment, or code execution.
- **Dumpster diving** searches discarded material or equipment for useful information.
- **Shoulder surfing** observes screens, keyboards, badges, or documents directly.
- **Tailgating** follows an authorized person into a restricted area without separate authorization.

Technical controls and physical procedures work together. MFA can reduce the value of a stolen password, but a sophisticated phish may target the second factor or session. Privacy screens and workstation placement help with shoulder surfing. Secure disposal helps with dumpster diving. Badges and access controls help only when people do not hold the door for unverified visitors.

<h3>Malware</h3>

Malware is a broad category that includes code designed for unauthorized access, disruption, theft, surveillance, persistence, or extortion. Network symptoms can include command-and-control traffic, scanning, unexpected DNS queries, unusual outbound volume, lateral movement, disabled security services, or encryption of shared data.

Network controls can limit communication and spread, but endpoint prevention, detection, patching, application controls, backups, identity protection, and incident response remain important. Blocking one destination does not prove the infected endpoint is clean.

<h2 id="hardening-nac">Harden devices and control admission</h2>

Device hardening removes unnecessary attack paths and reduces the damage available through required ones. Start with a current inventory and approved baseline, then apply controls such as:

- Disable unused physical ports, logical interfaces, management protocols, discovery services, and application services.
- Change default passwords and remove default or unused accounts.
- Use individual administrative identities, MFA where supported, least privilege, and centralized AAA.
- Restrict management access to approved sources and protected protocols such as SSH and HTTPS.
- Patch operating systems and firmware through change control.
- Protect configuration backups, keys, logs, and recovery access.
- Set time correctly so authentication, certificates, logs, and investigations agree.
- Monitor configuration drift, failed logins, privilege use, new services, and unexpected interfaces.

A disabled switchport is useful when no device should connect there. It does not solve unauthorized access on a port that must remain active. That is where admission controls matter.

<div class="table-scroll" role="region" aria-label="Network access control features" tabindex="0">
  <table class="mobile-card-table domain4-nac-table">
    <thead>
      <tr>
        <th scope="col">Control</th>
        <th scope="col">What it decides</th>
        <th scope="col">Important limitation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Control"><strong>Port security</strong></td>
        <td data-label="What it decides">Which or how many MAC addresses a switchport may learn, plus the response to a violation</td>
        <td data-label="Limitation">Controls Layer 2 identity on one port; it does not prove who the user is.</td>
      </tr>
      <tr>
        <td data-label="Control"><strong>802.1X</strong></td>
        <td data-label="What it decides">Whether a supplicant receives network access after an authenticator consults an authentication service</td>
        <td data-label="Limitation">Requires compatible clients, edge devices, identity infrastructure, certificates or credentials, and a failure policy.</td>
      </tr>
      <tr>
        <td data-label="Control"><strong>MAC filtering</strong></td>
        <td data-label="What it decides">Whether a listed MAC address is allowed or denied</td>
        <td data-label="Limitation">MAC addresses are observable and spoofable, so filtering is weak as a standalone identity control.</td>
      </tr>
      <tr>
        <td data-label="Control"><strong>NAC posture policy</strong></td>
        <td data-label="What it decides">Whether identity and device condition meet policy for a role, VLAN, or access level</td>
        <td data-label="Limitation">Posture signals, remediation paths, exceptions, guest access, and unavailable identity services need deliberate design.</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Understand the 802.1X roles</h3>

The **supplicant** is the endpoint requesting access. The **authenticator** is the switch or access point controlling the edge. The **authentication server** commonly uses RADIUS to evaluate credentials or certificates and return an access decision or attributes.

A failed 802.1X exchange may leave the port unauthorized, place the endpoint in a guest or remediation role, or allow a fallback method according to policy. The secure answer is not automatically "fail open" or "fail closed." Availability, risk, device type, emergency access, and the stated requirement matter.

<h2 id="keys-rules-zones">Manage keys, rules, and security zones</h2>

<h3>Key management</h3>

Keys must remain protected throughout generation, distribution, storage, use, rotation, recovery, revocation, and destruction. The strongest algorithm does not help if private keys are copied from an open file share or shared in a ticket.

Use approved key lengths and algorithms, separate duties where appropriate, limit key access, record ownership, monitor certificate and key expiration, and rotate credentials after compromise or personnel changes. Pre-shared keys become difficult to attribute and rotate when many devices or people share them.

<h3>ACLs, URL filtering, and content filtering</h3>

<div class="table-scroll" role="region" aria-label="Security rules and filtering controls" tabindex="0">
  <table class="mobile-card-table domain4-rules-table">
    <thead>
      <tr>
        <th scope="col">Control</th>
        <th scope="col">Best question</th>
        <th scope="col">Useful distinction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Control"><strong>ACL</strong></td>
        <td data-label="Best question">Should this source, destination, protocol, or port be permitted across this interface or boundary?</td>
        <td data-label="Useful distinction">Usually evaluates network and transport information rather than the meaning of an entire web page or file.</td>
      </tr>
      <tr>
        <td data-label="Control"><strong>URL filtering</strong></td>
        <td data-label="Best question">Should users be allowed to request this site, category, hostname, or URL pattern?</td>
        <td data-label="Useful distinction">Works with requested destinations and categories; encrypted traffic affects what an intermediary can observe.</td>
      </tr>
      <tr>
        <td data-label="Control"><strong>Content filtering</strong></td>
        <td data-label="Best question">Should this data, file type, message, pattern, or content category pass?</td>
        <td data-label="Useful distinction">Examines content or metadata at a higher layer and may require proxying, decryption, or endpoint integration.</td>
      </tr>
    </tbody>
  </table>
</div>

ACL order matters on platforms that process rules from top to bottom. A broad permit placed before a narrow deny can make the deny ineffective. Identify source, destination, protocol, port, direction, and state, then test required and prohibited traffic after the change.

<h3>Trusted, untrusted, and screened zones</h3>

A **trusted zone** has a higher level of assumed control, but the name should not grant unlimited access. An **untrusted zone** includes networks such as the public internet where the organization does not control the endpoints or traffic. Policy between zones should permit the minimum required flows.

A **screened subnet** places public-facing or externally reachable services in a separate security zone, often called a DMZ. External clients may reach the published service, while direct access from that service to internal systems remains tightly limited. Management should use a protected administrative path rather than the same public interface.

A screened subnet does not make the server safe by location alone. The service still needs hardening, patching, monitoring, restricted outbound access, protected secrets, backups, and application security.

<h2 id="security-scenarios">Work through security scenarios</h2>

<h3>Scenario 1: Clients receive the wrong gateway</h3>

Some users receive the normal address range but a different default gateway and DNS server. The problem appears only on one floor and changes after clients renew their leases.

Inspect the DHCP server identifier and switch path. A rogue DHCP service on an access port can answer clients before the approved server. DHCP snooping should allow server replies only from trusted directions, and the unauthorized device should be removed and investigated. Replacing the approved DHCP scope does not address the competing server.

<h3>Scenario 2: A contractor needs one internal application</h3>

A contractor uses a personally owned device and needs access to one web application for two weeks. The device should not reach management, server, or user networks.

Use identity-based access, MFA, a limited role, and a path that exposes only the required application, such as an approved clientless gateway or tightly controlled remote-access policy. Place BYOD in a restricted segment and log access. Broad VPN access followed by a reminder to avoid other systems is not least privilege.

<h3>Scenario 3: A switch administrator should run only support commands</h3>

Help-desk staff must view interface state and reset access ports, but they must not change routing, trunks, or security policy.

Centralized device administration with TACACS+ and command authorization can map the support role to approved actions and record activity. A shared local administrator password provides neither least privilege nor individual accountability.

<h3>Scenario 4: Users see a certificate warning on a familiar site</h3>

DNS returns an unexpected address, and users receive a hostname mismatch warning. Ignoring the warning loads a page that resembles the normal sign-in screen.

Stop the session. Verify the resolver, returned records, certificate subject, issuer, and path. DNS manipulation or an on-path redirection can send users to an attacker-controlled server that lacks a valid certificate for the requested name. Installing the unfamiliar certificate as trusted would hide the evidence and increase exposure.

<h3>Scenario 5: A public web server needs an internal database</h3>

Internet users need HTTPS access to a web server. The web server needs one database connection to an internal service. It does not need general access to user devices, management interfaces, or other servers.

Place the web service in a screened subnet. Permit inbound HTTPS from the untrusted zone to the web service, permit only the required database flow toward the specific internal destination, and restrict management to a protected administrative path. Limit unnecessary outbound traffic and monitor both permitted paths.

<h3>Scenario 6: One access port learns hundreds of MAC addresses</h3>

A user-facing switchport rapidly learns changing MAC addresses, and forwarding-table usage increases.

Investigate for MAC flooding, an unauthorized downstream switch, a loop, virtualization, or another legitimate multi-device use before choosing the response. On a normal single-device access port, port-security limits and violation handling can contain the behavior. Disabling the entire switch may restore table capacity, but it creates a larger outage and removes evidence from unaffected ports.

<h3>Scenario 7: A guest network can reach printer and management addresses</h3>

The guest SSID uses a separate VLAN, but guests can still open printer pages and a switch management interface.

The VLAN created a broadcast boundary, not sufficient policy enforcement. Add or correct firewall and ACL rules between the guest, internal, and management zones. Verify both allowed internet access and denied internal destinations. Renaming the SSID or hiding it does not enforce segmentation.

<h2 id="exam-traps">Common Network+ Domain 4 traps</h2>

<h3>Calling SSO multifactor authentication</h3>

SSO reduces repeated sign-ins. MFA combines different factor types. They can be used together, but one does not imply the other.

<h3>Using authorization to describe login verification</h3>

Authentication verifies identity. Authorization evaluates permissions after or alongside that identity decision.

<h3>Treating LDAP as a replacement word for every identity service</h3>

LDAP accesses directory information. RADIUS commonly supports network access, TACACS+ commonly supports device administration, and SAML commonly supports federation. Follow the use case.

<h3>Assuming a self-signed certificate provides no encryption</h3>

A self-signed certificate can support an encrypted session. The main problem is how the client validates identity and establishes trust safely.

<h3>Treating the padlock as proof that a site is safe</h3>

TLS protects the session to the certificate's validated identity. A malicious site can obtain a valid certificate for its own name.

<h3>Using a VLAN name as evidence of segmentation</h3>

The enforcement comes from routing, ACLs, firewalls, wireless policy, and management restrictions. Verify the path between zones.

<h3>Choosing MAC filtering when the scenario requires user identity</h3>

MAC addresses can be observed and copied. 802.1X with centralized authentication better fits identity-based network admission.

<h3>Choosing port security for a rogue DHCP server without considering DHCP snooping</h3>

Port security can limit MAC behavior, but DHCP snooping directly controls which ports may send DHCP server responses.

<h3>Confusing rogue AP and evil twin</h3>

A rogue AP is unauthorized. An evil twin is a deceptive AP designed to imitate a trusted network. An evil twin is rogue, but a convenience AP installed by an employee may not imitate an existing SSID.

<h3>Confusing ARP spoofing and DNS spoofing</h3>

ARP changes a local IP-to-MAC mapping. DNS changes name-to-address information. Both can redirect traffic, but the evidence and enforcement points differ.

<h3>Calling every interception an ARP attack</h3>

An on-path position can come from wireless deception, routing compromise, rogue DHCP, DNS manipulation, proxy configuration, or physical insertion. ARP spoofing is one path on a local IPv4 segment.

<h3>Applying a local firewall rule to an upstream DDoS bottleneck</h3>

A downstream device cannot restore capacity already exhausted before traffic reaches it. Provider coordination, scrubbing, rate controls, architecture, and upstream filtering may be required.

<h3>Using URL filtering to block a transport port</h3>

An ACL or firewall rule fits source, destination, protocol, and port decisions. URL filtering works with requested web destinations or categories.

<h3>Assuming a screened subnet is trusted</h3>

A public-facing service remains exposed. The screened subnet limits paths and separates risk; it does not convert the server into an internal trusted endpoint.

<h3>Forgetting key rotation and expiration</h3>

Keys and certificates have lifecycles. A secure deployment needs ownership, renewal, revocation, rotation, backup policy, and monitoring before expiration creates an outage.

<h2 id="rapid-review">Rapid review checklist</h2>

You are ready to move beyond Domain 4 review when you can:

- Distinguish encryption in transit from encryption at rest and explain what encryption does not prove.
- Describe certificate trust chains, hostname validation, expiration, private PKI, and self-signed certificate risks.
- Separate authentication, authorization, accounting, MFA, SSO, RBAC, and geofencing.
- Match RADIUS, TACACS+, LDAP, and SAML to their common network roles.
- Explain least privilege and why individual administrator accounts improve accountability.
- Classify locks, cameras, honeypots, and honeynets by their practical security role.
- Connect assets, threats, vulnerabilities, exploits, and risk without swapping the terms.
- Apply confidentiality, integrity, and availability to a described impact.
- Recognize the operational purpose of audits, data locality, PCI DSS, and GDPR.
- Design separate policy for IoT, IIoT, SCADA, ICS, OT, guest, BYOD, and management segments.
- Explain why segmentation requires enforcement between zones.
- Identify DoS, DDoS, VLAN hopping, MAC flooding, ARP poisoning, DNS poisoning, rogue DHCP, rogue AP, evil twin, and on-path behavior from symptoms.
- Distinguish phishing, dumpster diving, shoulder surfing, tailgating, and malware paths.
- Harden devices by removing unused access, replacing defaults, restricting management, maintaining software, and monitoring drift.
- Choose port security, 802.1X, MAC filtering, or broader NAC policy from the stated admission requirement.
- Identify the supplicant, authenticator, and authentication server in an 802.1X flow.
- Explain why key generation, distribution, storage, rotation, revocation, and destruction all matter.
- Choose an ACL, URL filter, or content filter according to what must be evaluated.
- Distinguish trusted, untrusted, and screened zones and define the minimum required flows between them.

After reviewing, take a [Network+ N10-009 practice test](/network-plus/n10-009/practice-test/). For each missed security question, identify the exact control point. Was the false information learned through ARP, DHCP, DNS, wireless, or identity? Was the decision about admission, authorization, filtering, segmentation, trust, or availability? That classification usually eliminates several attractive but misplaced answers.

<h2 id="official-references">Official references</h2>

- [CompTIA Network+ certification page](https://www.comptia.org/en-us/certifications/network/)
- [CompTIA Network+ N10-009 exam objectives](https://lecbyo.files.cmp.optimizely.com/download/35a7403ab73211ef9dcda6f347fbf652)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-41 Rev. 1: Guidelines on Firewalls and Firewall Policy](https://csrc.nist.gov/pubs/sp/800/41/r1/final)
- [NIST SP 800-153: Guidelines for Securing Wireless Local Area Networks](https://csrc.nist.gov/pubs/sp/800/153/final)
- [NIST SP 800-63-4: Digital Identity Guidelines](https://csrc.nist.gov/pubs/sp/800/63/4/final)
- [RFC 2865: Remote Authentication Dial In User Service](https://www.rfc-editor.org/rfc/rfc2865)
- [RFC 8907: The TACACS+ Protocol](https://www.rfc-editor.org/rfc/rfc8907)
- [PCI Security Standards Council document library](https://www.pcisecuritystandards.org/document_library/?class=pcidss&doc=pci_dss)
