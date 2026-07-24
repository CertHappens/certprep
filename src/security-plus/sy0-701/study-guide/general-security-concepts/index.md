---
layout: layouts/article.njk
title: "Security+ SY0-701 Domain 1: General Security Concepts"
description: Study Security+ SY0-701 Domain 1 with clear comparisons of security controls, zero trust, change management, cryptography, PKI, and certificates.
permalink: /security-plus/sy0-701/study-guide/general-security-concepts/
ogType: article
printable: true
printTitle: "Security+ SY0-701 Domain 1: General Security Concepts"
author: certHappens
datePublished: 2026-07-23
articleSection: Security+ SY0-701 Domain 1
eyebrow: Security+ Domain 1 guide
lede: Learn how the core security ideas fit together, where exam questions draw the line, and which clues point to the strongest answer.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
  - label: General Security Concepts
    url: /security-plus/sy0-701/study-guide/general-security-concepts/
toc:
  - id: domain-map
    label: Domain 1 map
  - id: security-controls
    label: Security controls
  - id: core-concepts
    label: Core security concepts
  - id: zero-trust-physical-deception
    label: Zero trust, physical security, and deception
  - id: change-management
    label: Change management
  - id: cryptography-pki
    label: Cryptography and PKI
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 Domain 1
  - General Security Concepts
  - security controls
  - zero trust
  - cryptography
  - PKI
relatedLinks:
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Return to the full exam roadmap, domain priorities, and study plan.
  - title: "Domain 2: Threats, Vulnerabilities, and Mitigations"
    url: /security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/
    description: Continue with threat actors, attack surfaces, vulnerabilities, indicators, and mitigations.
  - title: Take a randomized SY0-701 practice test
    url: /security-plus/sy0-701/practice-test/
    description: Apply these concepts in 10, 20, 30, or 50-question sessions.
  - title: Security+ resource hub
    url: /security-plus/
    description: Find the current practice and study resources in one place.
---
Domain 1 accounts for 12 percent of the SY0-701 exam, but its ideas appear far beyond the questions labeled General Security Concepts. A scenario about an incident, cloud design, access review, or vendor change may still depend on confidentiality, least privilege, control selection, or certificate trust.

The most useful way to study this domain is through comparisons. Know what each concept protects, what evidence it provides, and which nearby term solves a different problem.

<h2 id="domain-map">Domain 1 map</h2>

The official objectives organize General Security Concepts into four areas:

<div class="table-scroll" role="region" aria-label="Security+ SY0-701 Domain 1 objective map" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main focus</th>
        <th scope="col">Questions to ask</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1.1</td>
        <td>Security control categories and functions</td>
        <td>What kind of control is this, and what job does it perform?</td>
      </tr>
      <tr>
        <td>1.2</td>
        <td>Fundamental security concepts</td>
        <td>Which security goal, access decision, trust model, or physical protection fits?</td>
      </tr>
      <tr>
        <td>1.3</td>
        <td>Change management</td>
        <td>Who approves the change, what might break, and how will the organization recover?</td>
      </tr>
      <tr>
        <td>1.4</td>
        <td>Cryptographic solutions</td>
        <td>Does the scenario need confidentiality, integrity, authenticity, key protection, or trust validation?</td>
      </tr>
    </tbody>
  </table>
</div>

Keep those questions in mind while reviewing the details. They are often more useful than memorizing a long list in isolation.

<h2 id="security-controls">Security control categories and functions</h2>

A control can be classified by **category**, which describes how it is implemented, and by **function**, which describes what it is intended to do. Exam questions may ask for either one.

<h3>Control categories</h3>

<div class="table-scroll" role="region" aria-label="Security control categories and examples" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Category</th>
        <th scope="col">What it usually involves</th>
        <th scope="col">Examples</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Technical</strong></td>
        <td>Technology that enforces or supports security</td>
        <td>Firewall rules, multifactor authentication, endpoint detection, access control lists</td>
      </tr>
      <tr>
        <td><strong>Managerial</strong></td>
        <td>Governance, planning, risk decisions, and oversight</td>
        <td>Risk assessments, security policies, audits, compliance reviews</td>
      </tr>
      <tr>
        <td><strong>Operational</strong></td>
        <td>People and processes used during routine security work</td>
        <td>Security awareness, account reviews, incident procedures, backup operations</td>
      </tr>
      <tr>
        <td><strong>Physical</strong></td>
        <td>Protection of facilities, equipment, and physical access</td>
        <td>Locks, fences, bollards, guards, lighting, cameras</td>
      </tr>
    </tbody>
  </table>
</div>

The category depends on the implementation being described. A written access policy is managerial. An administrator following the account-review procedure is operational. The identity platform enforcing the approved access is technical.

<h3>Control functions</h3>

<div class="table-scroll" role="region" aria-label="Security control functions and examples" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Function</th>
        <th scope="col">Purpose</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Preventive</strong></td>
        <td>Stops or blocks an unwanted action</td>
        <td>A locked server-room door</td>
      </tr>
      <tr>
        <td><strong>Deterrent</strong></td>
        <td>Discourages an attempt</td>
        <td>Visible surveillance signs and cameras</td>
      </tr>
      <tr>
        <td><strong>Detective</strong></td>
        <td>Finds or records activity</td>
        <td>An intrusion-detection alert</td>
      </tr>
      <tr>
        <td><strong>Corrective</strong></td>
        <td>Restores a secure state or limits damage after an event</td>
        <td>Reimaging a compromised workstation</td>
      </tr>
      <tr>
        <td><strong>Compensating</strong></td>
        <td>Provides alternate protection when the preferred control is unavailable</td>
        <td>Network isolation around a legacy system that cannot support modern authentication</td>
      </tr>
      <tr>
        <td><strong>Directive</strong></td>
        <td>Tells people what behavior or action is required</td>
        <td>A policy requiring visitors to wear badges</td>
      </tr>
    </tbody>
  </table>
</div>

A single control may serve more than one function. A security guard can deter trespass, prevent unauthorized entry, and detect suspicious behavior. The scenario usually reveals the function the question wants. If the camera recording helps investigators discover an event, the emphasis is detective. If the camera is highly visible and intended to discourage an attempt, deterrence is the better fit.

<div class="article-callout">
  <p><strong>Exam clue:</strong> When two answers name the same control, read the stated purpose. The category may remain the same while the function changes with the scenario.</p>
</div>

<h2 id="core-concepts">Core security concepts</h2>

<h3>Confidentiality, integrity, and availability</h3>

The CIA triad describes three central security goals:

- **Confidentiality** limits information to authorized people, systems, and processes. Encryption, access controls, and data classification commonly support it.
- **Integrity** protects accuracy and guards against unauthorized or undetected change. Hashes, digital signatures, version control, and controlled write access can support it.
- **Availability** keeps systems and data accessible when authorized users need them. Redundancy, backups, capacity planning, and resilient design support it.

Ask what harm the scenario is trying to prevent. Disclosure points toward confidentiality. Unauthorized modification points toward integrity. An outage or exhausted service points toward availability.

Controls often support more than one goal. Multifactor authentication can reduce unauthorized disclosure and modification. Backups can restore availability and recover known-good data after corruption. Choose the goal emphasized by the facts in the question.

<h3>Non-repudiation</h3>

Non-repudiation provides evidence that supports attributing an action or message to a specific party. Digital signatures are the usual exam example because the signer uses a private key and others can verify the result with the corresponding public key.

Reliable non-repudiation depends on the surrounding process. Private keys must be protected, identities must be validated, and records must retain integrity. A username in an ordinary editable log offers weaker evidence than a protected signing process tied to a verified identity.

<h3>Authentication, authorization, and accounting</h3>

AAA separates three access-control activities:

<div class="table-scroll" role="region" aria-label="Authentication authorization and accounting comparison" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Activity</th>
        <th scope="col">Question answered</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Authentication</strong></td>
        <td>Who or what are you?</td>
        <td>A user signs in with a password and security key.</td>
      </tr>
      <tr>
        <td><strong>Authorization</strong></td>
        <td>What are you allowed to do?</td>
        <td>The signed-in user receives read access to one project folder.</td>
      </tr>
      <tr>
        <td><strong>Accounting</strong></td>
        <td>What did you do, and when?</td>
        <td>The system records file access and administrative changes.</td>
      </tr>
    </tbody>
  </table>
</div>

Authentication normally comes before authorization. Accounting records the resulting activity. A user can authenticate successfully and still be denied access because authorization is a separate decision.

Authenticating people may involve passwords, tokens, biometrics, certificates, or combinations of factors. Systems also authenticate to one another through device certificates, service identities, keys, and other machine credentials. Authorization models then translate policy into permissions. A model may base access on roles, attributes, rules, resource ownership, or centrally defined labels.

<h3>Gap analysis</h3>

A gap analysis compares the current state with a required or desired state. The difference becomes the gap that needs remediation.

For example, an organization may compare its existing controls with a security framework, customer contract, or internal baseline. The analysis can reveal missing multifactor authentication, incomplete logging, outdated procedures, or unclear ownership. It identifies the distance between the two states; a remediation plan determines how to close it.

<h2 id="zero-trust-physical-deception">Zero trust, physical security, and deception</h2>

<h3>Zero trust</h3>

Zero trust treats access as an ongoing decision based on identity, device condition, requested resource, policy, and risk. Network location alone does not create trusted status.

Common zero-trust ideas include:

- **Adaptive identity:** Authentication and access requirements respond to risk signals such as location, device posture, behavior, and sensitivity of the resource.
- **Threat scope reduction:** Segmentation and narrow privileges limit how far a compromised identity or device can move.
- **Policy-driven access control:** Central policy evaluates the request and determines whether access should be granted, denied, or restricted.
- **Continuous verification:** A session can be reevaluated when conditions change rather than trusted indefinitely after sign-in.

The architecture is often described through a control plane and a data plane:

<div class="table-scroll" role="region" aria-label="Zero trust control plane and data plane" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Policy engine</strong></td>
        <td>Evaluates policy and signals, then makes the access decision.</td>
      </tr>
      <tr>
        <td><strong>Policy administrator</strong></td>
        <td>Executes the decision by establishing or ending the connection.</td>
      </tr>
      <tr>
        <td><strong>Subject/system</strong></td>
        <td>The user, service, workload, or device requesting access to a protected resource.</td>
      </tr>
      <tr>
        <td><strong>Policy enforcement point</strong></td>
        <td>Allows, blocks, or terminates traffic between the subject and resource.</td>
      </tr>
      <tr>
        <td><strong>Implicit trust zone</strong></td>
        <td>An area where access has traditionally received trust from location or prior admission. Zero trust narrows this assumption and continues to evaluate access.</td>
      </tr>
      <tr>
        <td><strong>Data plane</strong></td>
        <td>Carries the permitted application or service traffic after policy is enforced.</td>
      </tr>
    </tbody>
  </table>
</div>

Zero trust is broader than one product. Identity systems, endpoint posture, segmentation, logging, policy services, and enforcement controls work together.

<h3>Physical security controls</h3>

Physical controls protect people, facilities, and equipment. Learn what each control is designed to stop or detect:

- **Bollards** block vehicles from reaching a building or protected area.
- **Access control vestibules** allow one controlled entry stage before the next door opens.
- **Fencing** establishes a boundary and channels entry toward monitored points.
- **Video surveillance** records activity and may also deter it when visible.
- **Security guards** can verify access, respond to conditions, and apply judgment.
- **Access badges** identify authorized personnel and can integrate with electronic access systems.
- **Lighting** improves visibility and reduces concealed approaches.
- **Sensors** detect conditions such as motion, pressure, sound, or heat.

Know the sensor clues:

- **Infrared** sensors detect heat or changes in infrared energy.
- **Pressure** sensors detect weight or force on a surface.
- **Microwave** sensors emit energy and detect movement through reflected changes.
- **Ultrasonic** sensors use high-frequency sound and measure reflected movement.

A question about stopping a vehicle calls for a different control from a question about detecting a person after hours. Start with the physical event being addressed.

<h3>Deception and disruption technology</h3>

Deception resources attract or expose suspicious activity without offering real production value:

- A **honeypot** imitates a system or service.
- A **honeynet** provides a group or network of decoy systems.
- A **honeyfile** is a decoy file that should not be accessed during normal work.
- A **honeytoken** is a decoy credential, record, API key, or other data element whose use creates a high-confidence alert.

These controls can improve detection and reveal attacker behavior. They require isolation, monitoring, and careful design so the decoy cannot become a useful path into production.

<h2 id="change-management">Change management and security</h2>

Changes can improve security and still create outages, broken dependencies, logging gaps, or unexpected access. Change management provides a repeatable way to evaluate, approve, test, document, and recover from those changes.

<h3>Business and process requirements</h3>

A sound change process commonly addresses:

- **Approval:** The appropriate authority accepts the change and its risk.
- **Ownership:** One person or team is accountable for planning and execution.
- **Stakeholders:** Affected technical and business groups receive input or notice.
- **Impact analysis:** The team identifies systems, users, data, and services that may be affected.
- **Test results:** Evidence shows how the change behaved before production deployment.
- **Backout plan:** The team has a practical path to restore the prior state.
- **Maintenance window:** Work is scheduled when disruption can be managed.
- **Standard operating procedure:** Repeatable steps reduce improvisation and missed tasks.

The sequence matters. Approval based on incomplete impact information is weak approval. A backout plan written after a failed deployment is incident documentation.

<h3>Technical implications</h3>

A change may affect:

- Allow lists and deny lists
- Restricted activities and permissions
- Planned downtime
- Service or application restarts
- Legacy applications
- Upstream and downstream dependencies

Suppose a firewall rule is tightened to block an exposed service. The security goal is sound, but the change can still break monitoring, an application dependency, or a partner connection. Testing and impact analysis expose those consequences before the maintenance window.

<h3>Documentation and version control</h3>

After implementation, documentation should match the environment. Updating diagrams, policies, procedures, inventories, and support instructions keeps the written record aligned with the deployed change.

Version control records who changed a configuration or document, what changed, and when. It also supports review and rollback. The useful record includes the context behind the decision along with the final file.

<div class="article-callout">
  <p><strong>Exam clue:</strong> When a question asks what should happen before implementation, look for approval, impact analysis, testing, stakeholder coordination, and a backout plan. When it asks what prevents future confusion, documentation and version control become stronger choices.</p>
</div>

<h2 id="cryptography-pki">Cryptography, keys, and PKI</h2>

Cryptographic questions become easier when you identify the security result first. Confidentiality, integrity, authenticity, and trust validation use related tools, but they are not interchangeable.

<h3>Encryption, hashing, signatures, and obfuscation</h3>

<div class="table-scroll" role="region" aria-label="Cryptographic methods and security purposes" tabindex="0">
  <table>
    <thead>
      <tr>
        <th scope="col">Method</th>
        <th scope="col">Primary use</th>
        <th scope="col">Important limit</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Encryption</strong></td>
        <td>Protects confidentiality by transforming plaintext with a key.</td>
        <td>It does not automatically prove who created the data.</td>
      </tr>
      <tr>
        <td><strong>Hashing</strong></td>
        <td>Creates a fixed-length digest used to detect change.</td>
        <td>An ordinary hash is one-way and does not hide data through reversible encryption.</td>
      </tr>
      <tr>
        <td><strong>Digital signature</strong></td>
        <td>Supports integrity, authenticity, and non-repudiation by signing with a private key.</td>
        <td>Signing alone does not keep the message confidential.</td>
      </tr>
      <tr>
        <td><strong>Obfuscation</strong></td>
        <td>Makes code or data harder to understand.</td>
        <td>It raises effort but does not provide the assurance of strong encryption.</td>
      </tr>
    </tbody>
  </table>
</div>

<h3>Symmetric and asymmetric cryptography</h3>

**Symmetric encryption** uses the same secret key for encryption and decryption. It is efficient for protecting large amounts of data, but the parties need a secure way to share and protect the key.

**Asymmetric cryptography** uses a public and private key pair. Information encrypted for a recipient with the recipient's public key can be decrypted with that recipient's private key. A digital signature reverses the purpose: the signer uses a private key, and others verify the signature with the public key.

Real protocols often combine both approaches. Asymmetric methods authenticate or establish shared key material, while symmetric encryption protects the ongoing session efficiently. **Key exchange** is the process that lets parties establish or share the key material needed for secure communication.

Encryption can be applied at different levels. Full-disk encryption protects an entire storage device, while partition, volume, file, database, and record-level encryption narrow the protected scope. Transport or communication encryption protects data moving between systems. The right level depends on what data must remain protected and when authorized software needs to use it.

Algorithm choice and **key length** both affect security. A longer key is meaningful only within an appropriate algorithm and implementation. Configuration, random-number quality, key storage, and protocol use also matter.

<h3>Obfuscation, steganography, tokenization, and masking</h3>

Obfuscation makes information harder to interpret without claiming the assurance of strong encryption. Related techniques serve different purposes:

- **Steganography** conceals the existence of information by placing it inside another medium, such as data hidden within an image or audio file.
- **Tokenization** replaces sensitive data with a substitute token. A protected mapping or token service connects the token to the original value when authorized.
- **Data masking** hides or alters selected portions of data so it can be displayed or used with reduced exposure, such as showing only the last four digits of an account number.

These methods may reduce exposure or conceal information, but the implementation and threat determine how much protection they provide.

<h3>Salting and key stretching</h3>

A **salt** is unique random data added before hashing a password. It prevents identical passwords from automatically producing identical stored hashes and makes precomputed lookup tables less useful.

**Key stretching** deliberately increases the work required to derive or test a key, often through repeated computation or memory-hard processing. It slows legitimate verification slightly and makes large-scale password guessing more expensive.

The salt does not need to remain secret. Its value comes from uniqueness. The password or derived secret still requires protection.

<h3>Key storage and management</h3>

Protecting the algorithm while exposing private keys would defeat the design. Common key-protection tools include:

- **Trusted Platform Module (TPM):** Hardware-backed key storage and platform measurements tied to a device.
- **Hardware Security Module (HSM):** Dedicated hardware for secure key generation, storage, and cryptographic operations.
- **Key Management System (KMS):** Central service for creating, storing, rotating, authorizing, and auditing keys.
- **Secure enclave:** Isolated execution and storage area that protects sensitive operations from the rest of the system.
- **Key escrow:** Controlled retention of key material so authorized recovery is possible under defined conditions.

Choose based on the scenario. A TPM commonly protects device-bound keys. An HSM is suited to high-value centralized signing or certificate-authority operations. A KMS coordinates lifecycle and access across applications and services.

<h3>PKI and certificate trust</h3>

Public key infrastructure connects identities with public keys through certificates and trust relationships.

A typical certificate process includes:

1. A subject generates or receives a public and private key pair.
2. A certificate signing request (CSR) contains the public key and identifying information.
3. A certificate authority (CA) validates the request according to its process.
4. The CA signs the certificate.
5. Clients validate the certificate chain back to a trusted root.

Important certificate terms:

- **Certificate authority:** Issues and signs certificates.
- **Root of trust:** A trusted root certificate or anchor used to validate a chain.
- **Certificate signing request:** A request containing a public key and certificate details for CA approval.
- **Self-signed certificate:** Signed by its own private key and trusted only when the recipient explicitly accepts it.
- **Third-party certificate:** Issued by an external CA whose root may already be trusted by clients.
- **Wildcard certificate:** Covers multiple hosts at one domain level, such as `*.example.com`.
- **Certificate revocation list (CRL):** A published list of revoked certificate serial numbers.
- **Online Certificate Status Protocol (OCSP):** A request-and-response method for checking certificate status.

A valid signature proves the certificate was signed by the listed issuer. Full trust also depends on the chain, dates, hostname or identity match, allowed key use, and revocation status.

<h3>Blockchain and public ledgers</h3>

A blockchain links records through cryptographic hashes and distributes the ledger according to its design. Changing earlier data can become evident because later links no longer match.

An **open public ledger** allows broad visibility and participation under the rules of the network. Public visibility does not make every record accurate before it is entered. The security properties come from the cryptographic linking, consensus model, validation rules, and distributed copies.

<h2 id="exam-traps">Common Domain 1 exam traps</h2>

<h3>Choosing a control by its name instead of its purpose</h3>

A camera can be detective or deterrent. A guard can be preventive, detective, or deterrent. Use the outcome described in the scenario.

<h3>Confusing authentication with authorization</h3>

Successful sign-in establishes identity. Permission to read, change, or administer a resource is an authorization decision.

<h3>Treating zero trust as a single appliance</h3>

Zero trust is an access model supported by identity, policy, device posture, segmentation, monitoring, and enforcement. A product may provide part of the system.

<h3>Skipping the backout plan</h3>

Testing reduces uncertainty. It does not guarantee every production dependency will behave as expected. A backout plan gives the team a defined recovery path.

<h3>Using encryption when the question asks who signed something</h3>

Encryption protects confidentiality. A digital signature supports integrity and attribution. Some protocols use both, so identify the requested result.

<h3>Assuming a certificate means a site or person is trustworthy in every sense</h3>

A certificate binds a public key to an identity according to the issuer's validation process. It does not evaluate every action, claim, file, or business practice associated with that identity.

<h3>Forgetting key management</h3>

Strong algorithms still depend on protected private keys, controlled access, rotation, backup or escrow where appropriate, and revocation when trust is lost.

<h2 id="review-checklist">Domain 1 review checklist</h2>

Before moving on, check whether you can do the following without relying on answer choices:

- Classify a control as technical, managerial, operational, or physical.
- Identify preventive, deterrent, detective, corrective, compensating, and directive functions from a scenario.
- Apply confidentiality, integrity, and availability to realistic events.
- Separate authentication, authorization, and accounting.
- Explain non-repudiation and the conditions that make the evidence useful.
- Describe a gap analysis and the two states it compares.
- Explain the roles of the zero-trust policy engine, policy administrator, and policy enforcement point.
- Match physical barriers and sensors to the event they address.
- Distinguish honeypots, honeynets, honeyfiles, and honeytokens.
- Put approval, impact analysis, testing, implementation, rollback, and documentation into a defensible change process.
- Compare encryption, hashing, digital signatures, salting, key stretching, and obfuscation.
- Explain when a TPM, HSM, KMS, secure enclave, or key escrow is useful.
- Trace certificate trust from a leaf certificate through an issuing CA to a trusted root.
- Compare CRL and OCSP certificate-status checking.

<div class="article-callout article-callout--action">
  <p><strong>Apply the concepts while they are fresh.</strong> Start a <a href="/security-plus/sy0-701/practice-test/">randomized SY0-701 practice test</a>, flag uncertain answers, and review which clue separated the best choice from the alternatives.</p>
</div>

<h2 id="official-references">Official references</h2>

This guide follows the General Security Concepts topics listed in the official SY0-701 exam objectives. Use the current objectives as the final checklist because exam policies and published materials can change.

- [CompTIA Security+ certification page](https://www.comptia.org/en-us/certifications/security/)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.comptia.jp/pdf/CompTIA%20Security%2B%20SY0-701%20Exam%20Objectives.pdf)
