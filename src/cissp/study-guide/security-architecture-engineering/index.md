---
layout: layouts/article.njk
title: "CISSP Domain 3: Security Architecture and Engineering"
description: Study CISSP Domain 3 with practical guidance on secure design principles, security models, system capabilities, architecture weaknesses, cryptography, facilities, and lifecycle engineering.
permalink: /cissp/study-guide/security-architecture-engineering/
ogType: article
printable: true
printTitle: "CISSP Domain 3: Security Architecture and Engineering"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 3
eyebrow: CISSP Domain 3 guide
lede: Connect secure design principles, system capabilities, cryptography, physical protections, and lifecycle decisions to the requirements and risks they must address.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Security Architecture and Engineering
    url: /cissp/study-guide/security-architecture-engineering/
toc:
  - id: domain-map
    label: Domain 3 map
  - id: decision-order
    label: Decision order
  - id: secure-design
    label: Secure design principles
  - id: security-models
    label: Security models
  - id: control-selection
    label: Control selection
  - id: system-capabilities
    label: System capabilities
  - id: architecture-vulnerabilities
    label: Architecture vulnerabilities
  - id: cryptography
    label: Cryptographic solutions
  - id: cryptanalysis
    label: Cryptanalytic attacks
  - id: facility-design
    label: Facility design
  - id: facility-controls
    label: Facility controls
  - id: system-lifecycle
    label: System lifecycle
  - id: ai-architecture
    label: AI architecture
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 3
  - Security Architecture and Engineering
  - secure design principles
  - security models
  - cryptography
  - physical security
  - system lifecycle
  - zero trust
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Review the governance, risk, threat-modeling, supplier, and policy decisions that establish architecture requirements.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Connect classification, ownership, lifecycle, retention, and protection requirements to architecture and engineering choices.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Connect governance, asset requirements, architecture, and cryptography to network design, segmentation, infrastructure, and secure channels.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Connect trusted system design, cryptography, and architecture to identity, authentication, authorization, and privileged access.
  - title: "CISSP Domain 6: Security Assessment and Testing"
    url: /cissp/study-guide/security-assessment-testing/
    description: Verify architecture assumptions, control implementation, cryptography, facilities, and lifecycle requirements through planned assessment and testing.
  - title: "CISSP Domain 7: Security Operations"
    url: /cissp/study-guide/security-operations/
    description: Apply investigations, logging, monitoring, incident response, configuration, patching, recovery, continuity, physical safeguards, and personnel safety.
  - title: "CISSP Domain 8: Software Development Security"
    url: /cissp/study-guide/software-development-security/
    description: Carry secure design principles, threat models, cryptography, architecture requirements, and lifecycle controls into software development.
  - title: "Security+ Domain 3: Security Architecture"
    url: /security-plus/sy0-701/study-guide/security-architecture/
    description: Refresh resilience, cloud, virtualization, data protection, and architecture concepts at the foundational level.
  - title: Hashing, Encryption, and Encoding Quick Reference
    url: /security-plus/quick-review/hashing-encryption-encoding/
    description: Compare foundational cryptographic and data-transformation methods before reviewing CISSP-level design decisions.
---
Domain 3 accounts for 13 percent of the current CISSP exam outline. It asks how trustworthy systems are designed, built, operated, and retired. The domain ranges from abstract security models to cryptography, cloud and industrial architectures, physical facilities, environmental protections, and the information-system lifecycle.

The breadth can make Domain 3 feel like a collection of unrelated facts. A better approach is to follow one question through every topic: **what requirement must the design satisfy, which assumptions does the solution make, and what happens when a component, person, supplier, or control fails?**

Architecture is not a diagram created after products are chosen. It is the set of structures, interfaces, trust boundaries, responsibilities, constraints, and design decisions that allow a system to meet business and security requirements over time.

<h2 id="domain-map">1. Domain 3 map</h2>

The official outline divides Security Architecture and Engineering into ten objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 3 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>3.1</td><td>Secure engineering principles</td><td>Which design principles reduce exposure, limit trust, protect privacy, and keep failures controlled?</td></tr>
      <tr><td>3.2</td><td>Security models</td><td>Which property does the model protect, what information flow does it permit, and what assumptions does it make?</td></tr>
      <tr><td>3.3</td><td>Control selection</td><td>Which controls satisfy the stated system requirements, risk decisions, and assurance needs?</td></tr>
      <tr><td>3.4</td><td>System security capabilities</td><td>Which hardware, firmware, operating-system, and cryptographic features create or strengthen trust?</td></tr>
      <tr><td>3.5</td><td>Architecture vulnerabilities</td><td>Where can each architecture fail, and which mitigations fit its design, operating environment, and dependencies?</td></tr>
      <tr><td>3.6</td><td>Cryptographic solutions</td><td>Which method, algorithm, key process, and trust model provide the required protection?</td></tr>
      <tr><td>3.7</td><td>Cryptanalytic attacks</td><td>Is the weakness in the mathematics, protocol, implementation, key handling, endpoint, or surrounding process?</td></tr>
      <tr><td>3.8</td><td>Facility design principles</td><td>How should location, layout, access, visibility, utilities, safety, and resilience shape the site?</td></tr>
      <tr><td>3.9</td><td>Facility controls</td><td>Which layered physical and environmental controls protect people, equipment, media, evidence, and operations?</td></tr>
      <tr><td>3.10</td><td>Information-system lifecycle</td><td>How are security requirements traced from stakeholder need through design, verification, operation, and retirement?</td></tr>
    </tbody>
  </table>
</div>

These objectives reinforce one another. Security models describe desired properties. Requirements translate business and risk decisions into outcomes the system must achieve. Architecture allocates those outcomes to people, processes, hardware, software, facilities, and suppliers. Engineering verifies that the implemented system still satisfies them.

<h2 id="decision-order">2. Use the right decision order</h2>

CISSP questions often name a technology before the scenario has established what the system must protect. A Trusted Platform Module, Hardware Security Module, firewall, encryption algorithm, or biometric reader can be useful, but none is automatically the right starting point.

A practical architecture sequence is:

1. **Identify stakeholders, mission, assets, and obligations.** Determine who depends on the system, what outcomes matter, and which legal, regulatory, contractual, safety, privacy, and business requirements apply.
2. **Define security objectives and unacceptable outcomes.** State the required confidentiality, integrity, availability, authenticity, accountability, privacy, resilience, and safety properties.
3. **Understand threats and operating assumptions.** Identify trust boundaries, likely adversaries, environmental conditions, supplier dependencies, failure modes, and limits on staffing, time, cost, and performance.
4. **Express measurable system requirements.** Requirements should describe what the system must accomplish without prematurely locking the organization into one product.
5. **Choose architecture and design principles.** Reduce attack surface, isolate functions, limit privileges, control information flows, and plan for failure and recovery.
6. **Select controls and allocate responsibilities.** Assign requirements to technical, physical, administrative, and supplier controls. Make shared responsibilities explicit.
7. **Implement with trustworthy components and processes.** Protect development, integration, configuration, secrets, dependencies, and deployment paths.
8. **Verify and validate.** Verify that the implementation matches specifications. Validate that the resulting system satisfies stakeholder needs in the real environment.
9. **Monitor, maintain, and reassess.** Architecture must adapt to new threats, requirements, uses, dependencies, vulnerabilities, and business priorities.
10. **Retire securely.** Preserve required records, transfer or destroy data, revoke trust, remove access, sanitize assets, and update inventories and dependencies.

A question asking for the **best architecture** usually requires a requirement and risk analysis before product selection. A question asking for the **next action** depends on what the scenario has already completed.

<h2 id="secure-design">3. Apply secure design principles</h2>

Secure design principles reduce the number of ways a system can fail and limit the damage when failure occurs. They should influence architecture before implementation, then remain visible in code, configuration, operations, monitoring, and retirement.

<h3>Threat modeling</h3>

Threat modeling identifies what must be protected, how the system is structured, where trust changes, what can go wrong, and which mitigations are appropriate. It is most valuable when started early and revisited as the design changes.

A useful threat model includes:

- Assets, business processes, and security objectives
- Data flows, entry points, identities, interfaces, and trust boundaries
- External services, suppliers, libraries, platforms, and administrative paths
- Threat actors, capabilities, motivations, and likely misuse cases
- Failure conditions, abuse paths, privacy harms, and safety consequences
- Existing and proposed controls, residual risks, and accountable owners

The output should inform requirements and design decisions. A diagram with no decisions, owners, or follow-up is not a completed threat model.

<h3>Least privilege and segregation of duties</h3>

**Least privilege** gives a person, service, device, or process only the permissions needed for its approved task, for only as long as needed. It limits accidental damage, misuse, and the reach of a compromised identity.

**Segregation of Duties (SoD)** divides a sensitive process so one person or role cannot complete an incompatible set of actions alone. It reduces fraud, error, concealment, and unilateral misuse.

Least privilege narrows authority. Segregation of duties separates authority. A payment administrator may have only the permissions needed to enter a transaction, while a different role must approve it.

<h3>Defense in depth</h3>

**Defense in depth** uses independent or complementary safeguards so the failure of one does not immediately expose the asset. Layers may include identity controls, segmentation, endpoint protections, application checks, encryption, monitoring, physical restrictions, backup, and recovery.

More layers do not automatically create better security. Controls that share the same dependency, administrator, identity provider, configuration error, or failure mode may fail together. Architecture should seek diversity where it meaningfully reduces correlated failure.

<h3>Secure defaults and fail securely</h3>

A **secure default** begins in the safer state until an authorized decision enables additional access or functionality. Examples include disabled services, denied access, private storage, strong authentication, and minimum permissions.

To **fail securely**, a system should preserve required protection when an error, outage, timeout, crash, or dependency failure occurs. The safe response depends on the mission. A failed access-control check may deny access, while a life-safety door may need a carefully designed emergency release. The requirement must balance security, safety, and availability rather than applying “fail closed” mechanically.

<h3>Keep it simple and small</h3>

Complexity creates more code, configuration, interfaces, dependencies, states, and assumptions to understand and defend. A smaller trusted computing base is easier to review, test, patch, and monitor.

Simplicity does not mean ignoring difficult requirements. It means avoiding unnecessary mechanisms and making the important ones understandable. A clever design that only one person can operate safely creates operational and succession risk.

<h3>Zero trust and trust but verify</h3>

**Zero trust** removes implicit trust based solely on network location, device ownership, or prior access. Access decisions consider identity, device, resource, context, policy, and current risk, then enforce least privilege and continuous evaluation where practical.

“Trust but verify” permits an initial trust relationship but checks whether the subject continues to satisfy expectations. Zero trust begins with no implicit trust and requires explicit authorization. Both depend on evidence, but the starting assumption differs.

Zero trust is an architecture and operating model, not one product. It requires accurate identity, asset, policy, telemetry, and enforcement information.

<h3>Privacy by design</h3>

**Privacy by design** incorporates privacy requirements into the system from the beginning. It asks whether data should be collected at all, how much is necessary, who may use it, how long it remains, how choices and rights are supported, and how unintended inference or secondary use is limited.

Encryption can protect data from unauthorized disclosure, but it does not make unnecessary collection, excessive retention, or inappropriate use acceptable.

<h3>Shared responsibility</h3>

A shared-responsibility model divides security duties among an organization, service provider, customer, supplier, and sometimes additional parties. The division changes by service and deployment model.

The organization should document who configures identities, protects data, patches components, monitors activity, responds to incidents, maintains evidence, manages keys, and proves compliance. A control with no clearly assigned owner is likely to be missed or duplicated.

<h3>Secure Access Service Edge</h3>

**Secure Access Service Edge (SASE)** delivers networking and security controls through cloud services so users and branch locations can receive consistent protection wherever they connect. Common elements can include software-defined wide-area networking, secure web gateway, cloud access security broker, firewall capabilities, and zero-trust network access.

The architectural question is not whether every named component is present. It is whether identity, traffic, policy, enforcement, availability, logging, privacy, and provider dependencies are addressed consistently.

<h2 id="security-models">4. Understand security models</h2>

Security models provide a formal or conceptual way to describe allowable states and information flows. They help architects reason about policy, but a model protects only the property it was designed to address.

<div class="table-scroll" role="region" aria-label="Security model comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Model</th><th scope="col">Primary concern</th><th scope="col">Key idea</th></tr></thead>
    <tbody>
      <tr><td>Bell-LaPadula</td><td>Confidentiality</td><td>Prevents information from flowing from a higher confidentiality level to an unauthorized lower level.</td></tr>
      <tr><td>Biba</td><td>Integrity</td><td>Prevents lower-integrity information from contaminating higher-integrity subjects or objects.</td></tr>
      <tr><td>Clark-Wilson</td><td>Commercial integrity</td><td>Uses well-formed transactions, authorized transformation procedures, separation of duties, and auditing.</td></tr>
      <tr><td>Brewer-Nash</td><td>Conflict of interest</td><td>Changes access according to prior activity so one party cannot improperly use competing clients' confidential information.</td></tr>
      <tr><td>State machine</td><td>Valid system states</td><td>Requires the system to begin securely and permit only transitions that preserve the security policy.</td></tr>
      <tr><td>Information-flow model</td><td>Permitted movement</td><td>Examines how information may move between subjects, objects, levels, domains, or compartments.</td></tr>
      <tr><td>Noninterference</td><td>Separation</td><td>Actions in one security domain should not reveal or influence protected information in another domain.</td></tr>
      <tr><td>Lattice-based model</td><td>Ordered labels</td><td>Uses security labels and dominance relationships to determine permitted information flows.</td></tr>
    </tbody>
  </table>
</div>

<h3>Bell-LaPadula and the star property</h3>

Bell-LaPadula focuses on confidentiality. Its simple security property is commonly summarized as **no read up**: a subject should not read information above its authorization. Its star property is commonly summarized as **no write down**: a subject should not move higher-level information into a lower-level object.

The model does not by itself solve integrity, availability, covert channels, poor classification, or trusted-user misuse. It assumes the labels and policy are correct.

<h3>Biba reverses the direction for integrity</h3>

Biba focuses on integrity. Its common summaries are **no read down** and **no write up**. A high-integrity subject should not rely on lower-integrity information, and a lower-integrity subject should not modify a higher-integrity object.

The direction can be confusing because confidentiality and integrity protect different properties. Ask whether the scenario is preventing secret information from leaking or preventing untrusted information from contaminating trusted information.

<h3>Clark-Wilson protects business transactions</h3>

Clark-Wilson uses constrained data items, transformation procedures, integrity verification, separation of duties, and audit records. A user does not directly modify protected data. The user invokes an authorized procedure that performs a valid transformation.

This approach fits commercial systems where the organization cares about authorized, complete, consistent, and auditable transactions.

<h3>Brewer-Nash changes access after a conflict appears</h3>

The Brewer-Nash model, also called the Chinese Wall model, addresses conflicts of interest. Access may be allowed initially, then restricted after a user accesses confidential information belonging to one organization in a conflict class.

The model is dynamic because prior access influences future permissions.

<h2 id="control-selection">5. Select controls from system requirements</h2>

Controls should trace to requirements, threats, risks, obligations, and architecture decisions. Selecting a familiar control first and inventing a requirement later reverses the process.

<h3>Functional requirements and assurance requirements</h3>

A **functional requirement** states what the system or control must do, such as enforce multifactor authentication, encrypt stored records, prevent unapproved code execution, or retain audit events for a defined period.

An **assurance requirement** says how much evidence is needed before the organization can trust that a control was built correctly and still works. That evidence may come from testing, code review, formal analysis, certification, supplier records, monitoring, or repeated assessments.

A feature can exist with weak assurance. An encryption option that is disabled, incorrectly configured, poorly implemented, or dependent on exposed keys does not provide the intended protection.

<h3>Allocate controls across the system</h3>

A requirement may be satisfied by several coordinated controls:

- Technical controls in hardware, firmware, operating systems, applications, networks, and cloud platforms
- Physical controls in facilities, equipment locations, media storage, utilities, and environmental systems
- Administrative controls in policy, roles, contracts, training, review, and change management
- Supplier controls in agreements, service design, attestations, incident coordination, and exit planning

Architecture should identify dependencies and common failure modes. Two controls that depend on the same identity provider or management plane may not provide true independence.

<h3>Prefer requirements that can be tested</h3>

“Use strong security” cannot be verified. A useful requirement states the protected asset, required outcome, applicable conditions, responsible component, and evidence of success.

For example, instead of “encrypt sensitive data,” define which classifications require encryption, where the data exists, which interfaces and backups are included, who controls keys, what algorithms and modes are approved, how rotation and recovery work, and how compliance is verified.

<h2 id="system-capabilities">6. Understand system security capabilities</h2>

Security capabilities create boundaries, protect secrets, establish platform integrity, and provide evidence. They must be enabled, configured, maintained, and integrated into the architecture.

<h3>Memory and process protection</h3>

Memory protection prevents one process from improperly reading or modifying another process or the operating system. Mechanisms include address-space isolation, privilege levels, execution protections, randomization, and controlled transitions between user and kernel functions.

These mechanisms reduce risk but do not make vulnerable software safe. A privileged process, kernel flaw, exposed secret, unsafe driver, or misconfiguration can still bypass the intended boundary.

<h3>Trusted Platform Module and measured boot</h3>

A **Trusted Platform Module (TPM)** is a protected hardware or firmware component that stores cryptographic keys and records information about how a device started. It can help prove the device's identity, protect disk-encryption keys, and support secure boot.

**Attestation** is evidence another system can check to determine whether the device is in an approved state.

**Secure boot** checks whether boot components are signed by an approved authority before execution. **Measured boot** records measurements so another party can evaluate what started. One blocks unapproved components; the other creates evidence about the boot path.

<h3>Hardware Security Modules and secure enclaves</h3>

A **Hardware Security Module (HSM)** protects cryptographic keys and performs sensitive operations within a controlled boundary. It is often used for certificate authorities, payment systems, code signing, database encryption, and high-value enterprise keys.

A **Trusted Execution Environment (TEE)** or secure enclave isolates code and data from other software on the same platform. It can reduce exposure during processing, but its security depends on processor design, implementation, attestation, update processes, side-channel resistance, and correct application use.

<h3>Virtualization and isolation</h3>

Hypervisors, containers, namespaces, access controls, and virtual networks create logical boundaries. Isolation is strongest when the architecture minimizes shared privileged components, protects management interfaces, separates tenants and workloads, and monitors movement across boundaries.

A snapshot, template, management plane, image registry, or orchestration account can affect many workloads at once. Centralized control improves consistency but increases the impact of administrative compromise.

<h3>Encryption and decryption capabilities</h3>

Encryption capabilities may exist in processors, storage devices, operating systems, databases, applications, network protocols, cloud services, and dedicated cryptographic modules. The architecture must decide where encryption begins and ends.

Data can be decrypted at an endpoint, application, proxy, gateway, database, or service provider. The location determines which components can see plaintext and which logs, caches, backups, or administrative tools may create additional copies.

<h2 id="architecture-vulnerabilities">7. Assess architecture vulnerabilities</h2>

Different architectures expose different trust boundaries, dependencies, update paths, failure modes, and concentrations of privilege. The same control does not fit every system.

<div class="table-scroll" role="region" aria-label="Architecture vulnerability and mitigation comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Architecture</th><th scope="col">Common concerns</th><th scope="col">Architecture responses</th></tr></thead>
    <tbody>
      <tr><td>Client systems</td><td>Untrusted users, local secrets, phishing, malware, theft, unsafe networks, and inconsistent patching</td><td>Hardened builds, least privilege, endpoint protection, encryption, device health, application control, remote management, and rapid revocation</td></tr>
      <tr><td>Server systems</td><td>Exposed services, privileged accounts, vulnerable dependencies, configuration drift, and high-value data</td><td>Service minimization, segmentation, hardened administration, patching, monitoring, redundancy, backups, and tested recovery</td></tr>
      <tr><td>Database systems</td><td>Injection, excessive privileges, aggregation, inference, exposed backups, and weak administrative separation</td><td>Parameterized access, role separation, encryption, masking, activity monitoring, integrity constraints, controlled exports, and backup protection</td></tr>
      <tr><td>Cryptographic systems</td><td>Weak algorithms, exposed keys, poor randomness, protocol errors, side channels, and failed rotation or recovery</td><td>Approved algorithms, protected key lifecycle, validated modules, protocol review, entropy assurance, monitoring, and migration planning</td></tr>
      <tr><td>Industrial Control Systems</td><td>Safety impact, legacy protocols, long lifecycles, fragile availability, vendor dependence, and limited patch windows</td><td>Safety-aware risk analysis, segmentation, allowlisting, monitored remote access, passive discovery, compensating controls, tested change, and manual fallback</td></tr>
      <tr><td>Cloud systems</td><td>Misconfiguration, exposed identities, public storage, provider dependencies, multitenancy, and unclear responsibility</td><td>Documented shared responsibility, strong identity, policy automation, encryption, logging, region and exit planning, resilient design, and configuration review</td></tr>
      <tr><td>Distributed systems</td><td>Partial failure, inconsistent state, clock and ordering issues, network partitions, and complex trust between nodes</td><td>Defined consistency needs, authenticated communication, fault tolerance, idempotent operations, reconciliation, observability, and safe recovery</td></tr>
      <tr><td>Internet of Things (IoT)</td><td>Weak credentials, limited updates, physical exposure, insecure protocols, data collection, and long unattended use</td><td>Unique identity, secure onboarding, signed updates, network isolation, data minimization, lifecycle support, and physical tamper considerations</td></tr>
      <tr><td>Microservices and Application Programming Interfaces (APIs)</td><td>Service sprawl, authorization gaps, exposed interfaces, dependency chains, secrets, and inconsistent policy</td><td>Strong service identity, schema and input validation, least privilege, gateways where useful, rate limits, tracing, secret management, and dependency controls</td></tr>
      <tr><td>Containers</td><td>Unsafe images, excessive privileges, shared kernels, exposed orchestration, secret leakage, and rapid configuration drift</td><td>Minimal signed images, scanning, runtime restrictions, namespace isolation, protected registries, secret management, policy enforcement, and orchestration hardening</td></tr>
      <tr><td>Serverless</td><td>Event injection, excessive function permissions, dependency risk, short-lived visibility, and provider lock-in</td><td>Narrow roles, event validation, dependency review, protected secrets, centralized logs, concurrency controls, and tested failure handling</td></tr>
      <tr><td>Embedded systems</td><td>Limited memory, hard-coded secrets, physical access, proprietary firmware, long lifecycles, and difficult updates</td><td>Secure boot, signed firmware, protected debug interfaces, unique keys, update planning, tamper resistance, and support commitments</td></tr>
      <tr><td>High-Performance Computing</td><td>Large datasets, specialized networks, shared schedulers, powerful nodes, research openness, and performance pressure</td><td>Workload isolation, strong scheduler controls, protected management planes, data segmentation, secure high-speed transfer, and risk-based monitoring</td></tr>
      <tr><td>Edge computing</td><td>Remote placement, intermittent connectivity, physical exposure, local data processing, and fleet-management complexity</td><td>Device identity, secure updates, local policy, encryption, remote attestation, resilient offline behavior, and centralized inventory and monitoring</td></tr>
      <tr><td>Virtualized systems</td><td>Hypervisor compromise, virtual machine (VM) escape, management-plane concentration, snapshot exposure, and resource contention</td><td>Hypervisor hardening, administrative separation, secure templates, protected snapshots, network isolation, monitoring, patching, and capacity controls</td></tr>
    </tbody>
  </table>
</div>

<h3>Industrial systems require safety-aware decisions</h3>

An Industrial Control System (ICS) can control physical processes. A change that improves confidentiality but interrupts production, disables a safety function, or causes unstable behavior may create greater harm than the original cyber risk.

Use consequence-based analysis. Coordinate with engineering and safety teams, test changes in representative environments, protect remote access, and preserve safe manual or degraded modes where required.

<h3>Cloud service models change responsibility</h3>

Infrastructure as a Service, Platform as a Service, and Software as a Service shift different responsibilities to the provider, but the customer remains accountable for understanding the division. Identity, data, configuration, workload, logging, encryption, incident response, and compliance duties vary by service.

Provider-managed does not mean risk-free. The organization still evaluates service design, evidence, concentration, jurisdiction, availability, portability, and exit requirements.

<h3>Management planes deserve stronger protection</h3>

Cloud consoles, hypervisor managers, container orchestrators, image registries, automation pipelines, remote-management platforms, and certificate authorities can change many systems at once. Protect them with dedicated administration, strong authentication, least privilege, network restrictions, monitoring, recovery plans, and independent evidence.

<h2 id="cryptography">8. Select cryptographic solutions</h2>

Cryptography can protect confidentiality, integrity, authenticity, and nonrepudiation, but only when the complete system handles algorithms, protocols, keys, identities, endpoints, and lifecycle decisions correctly.

<h3>Choose the method for the required outcome</h3>

<div class="table-scroll" role="region" aria-label="Cryptographic method comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Method</th><th scope="col">Primary use</th><th scope="col">Important limitation</th></tr></thead>
    <tbody>
      <tr><td>Symmetric encryption</td><td>Efficient confidentiality for data and communications using a shared secret key</td><td>Secure key distribution and separation become difficult as participants and uses increase</td></tr>
      <tr><td>Asymmetric encryption or key establishment</td><td>Protecting or establishing secrets without a pre-shared symmetric key</td><td>Slower operations, certificate or trust requirements, and algorithm-transition concerns</td></tr>
      <tr><td>Cryptographic hash</td><td>Creating a fixed-length digest used for integrity checks and other constructions</td><td>A hash alone does not prove who created the data and does not hide the original data</td></tr>
      <tr><td>Message Authentication Code</td><td>Integrity and source authentication among parties that share a secret</td><td>Any holder of the shared key may be able to create a valid code</td></tr>
      <tr><td>Digital signature</td><td>Integrity, origin authentication, and support for nonrepudiation using a private signing key</td><td>Trust depends on key control, identity binding, validation, timestamps, and surrounding process</td></tr>
      <tr><td>Authenticated encryption</td><td>Confidentiality and integrity in one coordinated construction</td><td>Nonce, mode, key, and implementation errors can still defeat protection</td></tr>
    </tbody>
  </table>
</div>

<h3>Manage the complete key lifecycle</h3>

A cryptographic key lifecycle includes:

1. Generation with approved algorithms and sufficient entropy
2. Registration, ownership, and association with an identity or purpose
3. Distribution or establishment through an authenticated process
4. Storage and use within an appropriate protected boundary
5. Rotation, renewal, and version management
6. Backup, escrow, or recovery when the business requirement justifies it
7. Revocation or suspension after compromise, role change, expiration, or policy violation
8. Archival when old keys are needed to verify signatures or decrypt retained data
9. Secure destruction when no legitimate need remains

Key recovery and key escrow can support availability, but they add sensitive copies and trusted roles. Signing keys may require different recovery rules from encryption keys because another party's ability to reproduce a signature can undermine accountability.

<h3>Public Key Infrastructure</h3>

A **Public Key Infrastructure (PKI)** manages digital certificates and the trust relationships that bind public keys to identities, systems, services, or roles. Components can include certificate authorities, registration authorities, repositories, validation services, policies, hardware security modules, and operational procedures.

Certificate validation should consider the trust chain, intended use, identity, validity period, revocation information, algorithm, key size, hostname or subject, and policy requirements. A valid signature does not prove that the certificate was issued to the intended party or used for the intended purpose.

<h3>Algorithm selection and cryptographic agility</h3>

Algorithm selection considers protection goal, data lifetime, performance, platform support, interoperability, regulatory requirements, implementation maturity, key size, mode of operation, and known weaknesses.

**Cryptographic agility** means being able to find and replace outdated encryption, signing methods, certificates, protocols, and keys without rebuilding the entire system. This requires an accurate inventory and a migration plan because encrypted data and digital signatures may remain in use for many years.

<h3>Quantum considerations</h3>

Quantum computing creates different concerns for symmetric and public-key systems. Organizations should identify long-lived sensitive data, public-key dependencies, embedded or difficult-to-update systems, and external interoperability requirements, then plan a controlled migration.

NIST has standardized post-quantum mechanisms for key establishment and digital signatures. Adoption still requires implementation review, interoperability testing, key and certificate lifecycle changes, performance analysis, and cryptographic agility. **Quantum Key Distribution (QKD)** is a specialized method for establishing keys over supported physical channels. It does not replace authentication, endpoint security, access control, or ordinary key governance.

<h2 id="cryptanalysis">9. Understand cryptanalytic attacks</h2>

A cryptographic failure may come from the algorithm, protocol, implementation, key process, endpoint, or surrounding identity system. Attack names are less useful than identifying which layer is being exploited.

<div class="table-scroll" role="region" aria-label="Cryptanalytic attack comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Attack</th><th scope="col">Attacker capability</th><th scope="col">Main concern</th></tr></thead>
    <tbody>
      <tr><td>Brute force</td><td>Tries many possible keys, passwords, or values</td><td>Key space, password strength, rate limits, work factors, hardware, and time</td></tr>
      <tr><td>Ciphertext-only</td><td>Observes encrypted data</td><td>Weak algorithms, patterns, repeated values, metadata, or implementation leakage</td></tr>
      <tr><td>Known-plaintext</td><td>Knows some plaintext and its matching ciphertext</td><td>Whether the relationship reveals keys or other protected content</td></tr>
      <tr><td>Chosen-plaintext</td><td>Can request encryption of selected plaintext</td><td>How the system responds to controlled input and whether patterns reveal information</td></tr>
      <tr><td>Chosen-ciphertext</td><td>Can submit selected ciphertext for processing or decryption behavior</td><td>Error messages, padding behavior, timing, and protocol-oracle weaknesses</td></tr>
      <tr><td>Frequency analysis</td><td>Studies symbol or pattern frequency</td><td>Especially relevant to simple substitution or deterministic patterns</td></tr>
      <tr><td>Side-channel</td><td>Observes physical or operational effects</td><td>Timing, power, electromagnetic emissions, sound, cache behavior, or other leakage</td></tr>
      <tr><td>Fault injection</td><td>Induces errors through voltage, clock, heat, radiation, or malformed input</td><td>Whether faulty results reveal secrets or bypass checks</td></tr>
      <tr><td>Man-in-the-Middle</td><td>Intercepts and may alter communication</td><td>Weak endpoint authentication, certificate validation, key exchange, or channel binding</td></tr>
      <tr><td>Pass the hash</td><td>Uses a captured password hash as an authentication credential</td><td>Credential reuse, protocol design, endpoint compromise, and administrative privilege</td></tr>
      <tr><td>Kerberos exploitation</td><td>Targets tickets, service accounts, keys, delegation, or time and trust configuration</td><td>Identity-system design and key hygiene rather than breaking strong cryptography directly</td></tr>
      <tr><td>Ransomware</td><td>Uses encryption or disruption against the victim</td><td>Endpoint compromise, privilege, lateral movement, backup protection, recovery, and extortion</td></tr>
    </tbody>
  </table>
</div>

<h3>Implementation attacks bypass the mathematics</h3>

A strong algorithm can fail through predictable randomness, reused nonces, exposed keys, unsafe modes, missing authentication, detailed error messages, insecure libraries, poor certificate validation, or side-channel leakage.

When a scenario presents a cryptographic weakness, ask whether changing the algorithm alone addresses the cause. If the problem is key storage, endpoint compromise, or protocol validation, a newer cipher may leave the weakness intact.

<h3>Ransomware is not cryptanalysis</h3>

Ransomware often uses legitimate encryption against the victim's data. The defense is not “use stronger encryption.” It includes identity protection, segmentation, endpoint controls, monitoring, protected backups, restoration testing, incident response, and business resilience.

<h2 id="facility-design">10. Apply security principles to facility design</h2>

Facility security begins before selecting locks, cameras, or guards. Location and layout decisions can either reduce exposure or make every later control more difficult.

<h3>Start with site selection and risk</h3>

Consider:

- Natural hazards such as flood, wildfire, earthquake, storm, extreme heat, and water scarcity
- Human-made hazards such as crime, civil unrest, industrial accidents, hazardous neighbors, transportation routes, and political instability
- Availability of power, water, telecommunications, emergency services, transportation, and skilled staff
- Legal jurisdiction, privacy obligations, data-location requirements, and government access risk
- Visibility, signage, adjacency, public access, and distance from high-profile targets
- Supplier concentration and whether supposedly redundant utilities share the same upstream path

A low-cost site can create long-term risk if it depends on one power feed, one carrier route, one access road, or one regional hazard zone.

<h3>Use layered zones</h3>

Physical design should create progressively stronger zones from public areas to controlled offices, restricted work areas, server rooms, evidence storage, and critical infrastructure. Each transition should have an approved purpose, access rule, monitoring method, and emergency procedure.

Avoid placing highly sensitive spaces against public walls, accessible roofs, shared utility areas, loading docks, or uncontrolled ceilings and floors when the risk warrants stronger separation.

<h3>Support safety and emergency response</h3>

Security controls must allow safe evacuation, emergency access, fire response, and life-safety operation. Doors, turnstiles, mantraps, alarms, and power-loss behavior require coordination with building codes and emergency plans.

A physical control that traps occupants or blocks responders is not an acceptable security improvement.

<h2 id="facility-controls">11. Design site and facility controls</h2>

Physical and environmental controls protect people first, then equipment, information, evidence, and operations. The correct design depends on threats, mission, occupancy, location, safety requirements, and recovery objectives.

<h3>Wiring closets and distribution facilities</h3>

Wiring closets and intermediate distribution facilities contain network and communications equipment that can provide broad access if compromised. Protect them with controlled access, inventory, locked racks where appropriate, environmental monitoring, fire detection, cable management, and separation from public or shared utility spaces.

Do not treat cabling as harmless infrastructure. Unprotected patch panels, fiber, copper, and management ports can permit interception, disruption, or unauthorized network access.

<h3>Server rooms and data centers</h3>

Server rooms and data centers may require:

- Layered access with identity, authorization, logging, and periodic review
- Visitor approval, escort, time limits, and badge control
- Cameras positioned for accountability without exposing sensitive screens or credentials
- Locked racks, protected consoles, and secure media handling
- Redundant power, network paths, cooling, and environmental monitoring
- Fire detection and suppression appropriate to occupants, equipment, and local requirements
- Water detection, drainage planning, and protection from overhead plumbing
- Inventory, maintenance control, and documented emergency shutdown procedures

Redundancy should avoid common failure. Two power supplies connected to the same upstream circuit do not provide meaningful resilience.

<h3>Media and evidence storage</h3>

Media storage should reflect classification, retention, environmental sensitivity, access, inventory, and recovery needs. Offsite copies should be far enough away to avoid the same regional event while remaining accessible within recovery requirements.

Evidence storage requires controlled custody, tamper indication, documentation, access logs, preservation conditions, and clear transfer procedures. The purpose is not merely to keep an item locked away, but to support integrity and admissibility.

<h3>Restricted and work areas</h3>

Restricted areas may use badges, biometrics, guards, locks, alarms, cameras, mantraps, visitor controls, and anti-tailgating measures. Work areas may also require clean-desk practices, privacy screens, secure printing, acoustic protection, locked storage, and controlled photography or portable devices.

Tailgating occurs when an unauthorized person follows an authorized person through an access point without proper verification. Awareness, access design, guards, and social norms all influence the risk.

<h3>Utilities and HVAC</h3>

Heating, Ventilation, and Air Conditioning (HVAC) maintains safe temperature, humidity, airflow, and equipment operation. Systems may require redundancy, monitoring, maintenance access control, spare capacity, and separation from ordinary building controls.

Utility spaces can create physical paths into restricted areas. Ducts, raised floors, suspended ceilings, drains, pipes, and maintenance corridors should be considered in the security boundary.

<h3>Fire protection</h3>

Fire protection combines prevention, detection, notification, suppression, compartmentation, evacuation, and recovery. Controls should match the hazard, occupancy, equipment, local code, and environmental considerations.

Common detector types respond to heat, smoke, flame, or combinations of signals. Suppression may use water, pre-action systems, clean agents, or other methods appropriate to the environment. Life safety takes priority over equipment preservation.

<h3>Power protection</h3>

Power design can include surge protection, grounding, Uninterruptible Power Supplies (UPS), generators, redundant feeds, fuel arrangements, load testing, maintenance, and orderly shutdown.

A UPS provides short-term power and power conditioning. A generator supports longer outages but takes time to start and depends on fuel, maintenance, ventilation, transfer equipment, and load capacity. Test the complete chain rather than assuming each component works because it exists.

<h2 id="system-lifecycle">12. Manage the information-system lifecycle</h2>

Security engineering continues from initial stakeholder need through retirement. Decisions made early often determine whether later controls are practical, affordable, and effective.

<div class="table-scroll" role="region" aria-label="Information system lifecycle security activities" tabindex="0">
  <table>
    <thead><tr><th scope="col">Lifecycle stage</th><th scope="col">Security focus</th></tr></thead>
    <tbody>
      <tr><td>Stakeholder needs and requirements</td><td>Identify mission, users, assets, obligations, risk tolerance, operating environment, safety, privacy, and acceptable outcomes.</td></tr>
      <tr><td>Requirements analysis</td><td>Resolve conflicts, define measurable security requirements, identify assumptions, and establish traceability and acceptance criteria.</td></tr>
      <tr><td>Architectural design</td><td>Define trust boundaries, interfaces, components, data flows, control allocation, resilience, dependencies, and shared responsibilities.</td></tr>
      <tr><td>Development and implementation</td><td>Use trustworthy tools, secure coding and configuration, protected secrets, controlled dependencies, reviews, and reproducible builds.</td></tr>
      <tr><td>Integration</td><td>Verify interfaces, inherited controls, identity and trust relationships, error handling, logging, and behavior across components.</td></tr>
      <tr><td>Verification and validation</td><td>Verify that implementation matches specifications and validate that the complete system satisfies stakeholder needs in its intended environment.</td></tr>
      <tr><td>Transition and deployment</td><td>Approve readiness, migrate data, establish monitoring, train operators, protect rollback paths, and confirm support and incident procedures.</td></tr>
      <tr><td>Operations and maintenance</td><td>Monitor, patch, assess, manage configuration and change, review risk, respond to incidents, test recovery, and track component support.</td></tr>
      <tr><td>Retirement and disposal</td><td>Transfer or destroy data, revoke credentials and certificates, terminate services, sanitize assets, preserve records, and update inventories and dependencies.</td></tr>
    </tbody>
  </table>
</div>

<h3>Verification and validation answer different questions</h3>

**Verification** asks whether the system was built according to specifications and design. **Validation** asks whether the resulting system satisfies stakeholder needs and works acceptably in the intended environment.

A component can pass its specification and still fail the mission because the requirement was incomplete, the environment changed, the integration is unsafe, or users cannot operate it correctly.

<h3>Maintain requirements traceability</h3>

Traceability connects stakeholder needs to system requirements, architecture decisions, controls, implementation evidence, tests, risks, and operational monitoring. It helps the organization understand why a control exists and what must be reconsidered when the system changes.

Without traceability, teams may remove a control as “unused,” keep an obsolete control that no longer addresses the risk, or fail to test a requirement after a redesign.

<h3>Retirement is an engineering stage</h3>

Retirement includes more than shutting down a server. Identify data, backups, logs, certificates, domain names, accounts, integrations, supplier contracts, licenses, monitoring rules, dependencies, and physical assets. Transfer what must remain, destroy what no longer should, and verify that trust paths and access have been removed.

A forgotten Application Programming Interface (API) key, certificate, cloud snapshot, Domain Name System (DNS) record, or support account can leave a retired system connected to the organization.

<h2 id="ai-architecture">13. Apply architecture principles to AI systems</h2>

AI systems add high-value models, large datasets, specialized compute, complex supply chains, probabilistic behavior, and new input and output risks. They still require ordinary security engineering fundamentals.

<h3>Protect the complete AI system</h3>

The architecture may include training data, preprocessing, model code, weights, embeddings, vector databases, prompts, retrieval sources, plugins, APIs, orchestration, compute clusters, endpoints, logs, evaluation data, and human review.

Protecting only the model file leaves many paths for data poisoning, unauthorized extraction, prompt injection, unsafe tool use, privacy leakage, output manipulation, and supply-chain compromise.

<h3>Separate control and data paths</h3>

Treat instructions, user content, retrieved content, tool output, and administrative policy as different trust levels. Validate inputs and outputs, constrain tool permissions, isolate sensitive workloads, protect model and prompt changes, and log consequential actions.

A model should not receive broad database, cloud, email, or code-execution permissions merely because a user may request a task. Apply least privilege and explicit authorization to the tools around the model.

<h3>Use shared responsibility explicitly</h3>

Cloud AI services divide responsibility across model provider, platform provider, application developer, data owner, customer administrator, and end user. Document who controls training use, retention, regions, access, model updates, safety settings, logging, incident response, deletion, and evidence.

Secure enclaves and confidential-computing features may reduce exposure during processing, but they do not correct unnecessary data collection, weak authorization, unsafe outputs, or vulnerable application logic.

<h2 id="exam-traps">14. Avoid common Domain 3 exam traps</h2>

<h3>Choosing a product before requirements</h3>

If the scenario has not defined the asset, requirement, threat, owner, or risk, gathering and analyzing those needs usually comes before buying a technology.

<h3>Confusing confidentiality and integrity models</h3>

Bell-LaPadula protects confidentiality. Biba protects integrity. Clark-Wilson protects commercial integrity through authorized transactions and separation of duties. Start with the property the scenario must preserve.

<h3>Treating encryption as complete protection</h3>

Encryption does not replace identity, authorization, key protection, integrity, availability, secure endpoints, retention, monitoring, or recovery. Determine where plaintext exists and who controls the keys.

<h3>Assuming more layers always mean better defense</h3>

Layers that share the same identity provider, management plane, privileged account, configuration, supplier, or physical location may fail together. Look for independence and common-mode failure.

<h3>Ignoring safety and availability in physical or industrial systems</h3>

A control that protects data but creates unsafe operation, blocks evacuation, or causes unacceptable downtime may be wrong. Balance security with life safety and mission requirements.

<h3>Confusing verification with validation</h3>

Verification checks conformance to specification. Validation checks suitability for stakeholder needs and the intended environment.

<h3>Blaming the algorithm for an implementation failure</h3>

A side channel, exposed key, reused nonce, certificate error, weak random number generator, compromised endpoint, or poor protocol may defeat strong cryptography. Fix the actual layer at fault.

<h3>Assuming provider-managed means customer-complete</h3>

Cloud and managed services shift responsibilities. They do not eliminate the customer's duties for data, identity, configuration, access, integration, monitoring, and risk acceptance.

<h2 id="review-checklist">15. Domain 3 review checklist</h2>

Before moving on, make sure you can:

- Apply threat modeling, least privilege, defense in depth, secure defaults, secure failure, segregation of duties, simplicity, zero trust, privacy by design, shared responsibility, and SASE.
- Explain the property protected by Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash, state-machine, information-flow, noninterference, and lattice models.
- Separate functional security requirements from assurance requirements.
- Select and allocate controls based on stakeholder needs, risk, obligations, architecture, and evidence.
- Compare secure boot, measured boot, TPM, HSM, Trusted Execution Environment, memory protection, and virtualization isolation.
- Assess the characteristic weaknesses of client, server, database, cryptographic, industrial, cloud, distributed, IoT, microservice, container, serverless, embedded, high-performance, edge, and virtualized systems.
- Explain symmetric encryption, asymmetric mechanisms, hashing, Message Authentication Codes, digital signatures, authenticated encryption, and PKI at a decision level.
- Follow keys through generation, distribution, storage, use, rotation, recovery, revocation, archival, and destruction.
- Explain cryptographic agility and the purpose of post-quantum migration planning.
- Identify whether a cryptographic attack targets mathematics, protocol, implementation, key handling, endpoint, or identity infrastructure.
- Apply layered facility design to site selection, zones, utilities, HVAC, fire, power, wiring, server rooms, media, evidence, and work areas.
- Distinguish UPS from generator support and recognize common upstream dependencies.
- Trace security from stakeholder needs through requirements, architecture, implementation, integration, verification, validation, deployment, operation, and retirement.
- Distinguish verification from validation.
- Apply ordinary secure design, least privilege, isolation, input validation, shared responsibility, and lifecycle controls to AI systems.
- Choose the correct next action based on what the scenario has already completed.

<h2 id="official-references">16. Official references</h2>

Use these primary sources to confirm scope and study the underlying practices:

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-160 Volume 1: Engineering Trustworthy Secure Systems](https://csrc.nist.gov/pubs/sp/800/160/v1/upd2/final)
- [NIST SP 800-160 Volume 2 Revision 1: Developing Cyber-Resilient Systems](https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls for Information Systems and Organizations](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-57 Part 1 Revision 5: Recommendation for Key Management](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final)
- [NIST FIPS 140-3: Security Requirements for Cryptographic Modules](https://csrc.nist.gov/pubs/fips/140-3/final)
- [NIST FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard](https://csrc.nist.gov/pubs/fips/203/final)
- [NIST FIPS 204: Module-Lattice-Based Digital Signature Standard](https://csrc.nist.gov/pubs/fips/204/final)
- [NIST FIPS 205: Stateless Hash-Based Digital Signature Standard](https://csrc.nist.gov/pubs/fips/205/final)
- [NIST SP 800-82 Revision 3: Guide to Operational Technology Security](https://csrc.nist.gov/pubs/sp/800/82/r3/final)
- [NIST SP 800-190: Application Container Security Guide](https://csrc.nist.gov/pubs/sp/800/190/final)
- [NIST SP 800-204A: Building Secure Microservices-Based Applications Using Service-Mesh Architecture](https://csrc.nist.gov/pubs/sp/800/204/a/final)
- [NIST SP 800-125A Revision 1: Security Recommendations for Server-based Hypervisor Platforms](https://csrc.nist.gov/pubs/sp/800/125/a/r1/final)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
