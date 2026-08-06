---
layout: layouts/article.njk
title: Security Models and Design Principles Quick Reference for CISSP
description: Compare Bell-LaPadula, Biba, Clark-Wilson, Brewer-Nash, lattice, state-machine, and noninterference models with secure design principles and zero trust.
permalink: /cissp/quick-review/security-models-design-principles/
ogType: article
printable: true
printTitle: Security Models and Design Principles Quick Reference for CISSP
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Quick Review
eyebrow: CISSP quick review
lede: Identify the security property first, then choose the model or design principle that protects it.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Quick Review
    url: /cissp/quick-review/
  - label: Models and Design
    url: /cissp/quick-review/security-models-design-principles/
toc:
  - id: decision-first
    label: Start with the goal
  - id: confidentiality-models
    label: Confidentiality models
  - id: integrity-models
    label: Integrity models
  - id: other-models
    label: Other security models
  - id: design-principles
    label: Design principles
  - id: reference-monitor
    label: Reference monitor
  - id: zero-trust
    label: Zero trust
  - id: scenarios
    label: Scenario comparisons
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: official-references
    label: Official references
keywords:
  - CISSP security models
  - Bell-LaPadula
  - Biba integrity model
  - Clark-Wilson
  - Brewer-Nash
  - CISSP secure design principles
relatedLinks:
  - title: CISSP Quick Review Guides
    url: /cissp/quick-review/
    description: Browse all focused CISSP comparisons and return to the quick-review hub.
  - title: "Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Continue with secure engineering, architecture weaknesses, cryptography, facilities, and lifecycle assurance.
  - title: "Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Apply access models, policy enforcement, identity lifecycle, authentication, and privileged-access decisions.
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain study roadmap and CISSP decision lens.
---

Security models describe rules a system can use to protect information or enforce a security property. Design principles guide how a trustworthy system should be structured and operated.

Do not memorize a model name without its purpose. First ask whether the scenario is mainly protecting confidentiality, integrity, conflicts of interest, controlled transactions, or a broader system property.

<h2 id="decision-first">Start with the security goal</h2>

<div class="table-scroll" role="region" aria-label="Security model decision starter" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Main concern</th><th scope="col">Likely model or principle</th></tr></thead>
  <tbody>
    <tr><td data-label="Main concern">Prevent information from moving to a lower classification</td><td data-label="Likely model or principle">Bell-LaPadula</td></tr>
    <tr><td data-label="Main concern">Prevent untrusted information from corrupting higher-integrity data</td><td data-label="Likely model or principle">Biba</td></tr>
    <tr><td data-label="Main concern">Protect business records through approved transactions and separated roles</td><td data-label="Likely model or principle">Clark-Wilson</td></tr>
    <tr><td data-label="Main concern">Prevent a consultant from accessing competing clients' confidential information</td><td data-label="Likely model or principle">Brewer-Nash</td></tr>
    <tr><td data-label="Main concern">Require every access request to be checked by a small trusted mechanism</td><td data-label="Likely model or principle">Reference monitor and complete mediation</td></tr>
    <tr><td data-label="Main concern">Remove implicit trust based on location</td><td data-label="Likely model or principle">Zero trust</td></tr>
  </tbody>
</table>
</div>

<h2 id="confidentiality-models">Confidentiality models</h2>

### Bell-LaPadula

The **Bell-LaPadula model** protects confidentiality by controlling how information moves among classification levels.

- **No read up:** A subject cannot read information above the subject's clearance.
- **No write down:** A subject cannot write information to a lower classification.

The model is concerned with preventing unauthorized disclosure. It does not primarily protect the correctness of data.

<div class="article-callout">
  <p><strong>Memory clue:</strong> Bell-LaPadula protects secrets. Information should not flow down to a less trusted level.</p>
</div>

### Lattice-based access control

A **lattice model** uses ordered security labels and rules for comparing them. Access can depend on classification, compartments, categories, or other attributes represented in the labels.

Bell-LaPadula can be implemented with a lattice, but lattice-based access control is the broader method of ordering and comparing labels.

<h2 id="integrity-models">Integrity models</h2>

### Biba

The **Biba model** protects integrity by limiting how information from lower-integrity sources can influence higher-integrity subjects and data.

In the strict form:

- **No read down:** A higher-integrity subject does not read lower-integrity information.
- **No write up:** A lower-integrity subject does not write to higher-integrity data.

<div class="article-callout">
  <p><strong>Memory clue:</strong> Biba protects correctness. Untrusted information should not flow up into trusted data.</p>
</div>

### Clark-Wilson

The **Clark-Wilson model** protects business-data integrity through approved transactions, separated duties, and verification.

Important ideas include:

- **Constrained data items:** Protected data that must be changed only through approved methods
- **Transformation procedures:** Approved programs or transactions that change protected data
- **Integrity verification procedures:** Checks that confirm protected data remains valid
- **Separation of Duties:** Different people or roles perform and approve sensitive steps
- **Well-formed transactions:** Data changes occur through controlled and valid operations

Clark-Wilson fits accounting, payment, inventory, and other business systems where correctness depends on authorized procedures and accountability.

<h2 id="other-models">Other security models</h2>

### Brewer-Nash

The **Brewer-Nash model**, also called the Chinese Wall model, changes access according to a user's prior activity. It prevents conflicts of interest by blocking access to confidential information from competing organizations after the user has entered one side of the conflict.

The access rule is dynamic. What a person may access later depends on what the person accessed earlier.

### State-machine model

A **state-machine model** describes a system as a set of states and allowed transitions. The system is secure when it begins in a secure state and every permitted transition leads to another secure state.

This model is useful for reasoning about whether a design can enter an unsafe condition through a sequence of allowed actions.

### Information-flow model

An **information-flow model** controls where information may move. It can address confidentiality, integrity, or both by restricting flows among subjects, objects, labels, processes, or domains.

### Noninterference model

A **noninterference model** aims to prevent activity in one security domain from revealing or changing information in another domain in an unauthorized way. A lower-level observer should not be able to learn about higher-level actions through visible system behavior.

<h2 id="design-principles">Secure design principles</h2>

<div class="table-scroll" role="region" aria-label="Secure design principles" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Principle</th><th scope="col">Plain meaning</th><th scope="col">Example</th></tr></thead>
  <tbody>
    <tr><td data-label="Principle"><strong>Least privilege</strong></td><td data-label="Plain meaning">Give only the access needed for the task and only for as long as needed.</td><td data-label="Example">Temporary administrative access for one approved change.</td></tr>
    <tr><td data-label="Principle"><strong>Separation of Duties</strong></td><td data-label="Plain meaning">Divide sensitive work so one person cannot complete the entire high-impact process alone.</td><td data-label="Example">One person requests a payment and another approves it.</td></tr>
    <tr><td data-label="Principle"><strong>Defense in depth</strong></td><td data-label="Plain meaning">Use several safeguards so one failure does not expose the asset by itself.</td><td data-label="Example">Identity controls, segmentation, endpoint protection, logging, and backups.</td></tr>
    <tr><td data-label="Principle"><strong>Fail securely</strong></td><td data-label="Plain meaning">When a component fails, the default result should deny unsafe access or preserve protection.</td><td data-label="Example">An authorization service failure does not silently grant access.</td></tr>
    <tr><td data-label="Principle"><strong>Complete mediation</strong></td><td data-label="Plain meaning">Check every access request instead of assuming earlier approval remains valid.</td><td data-label="Example">Reevaluate authorization when a session requests a protected action.</td></tr>
    <tr><td data-label="Principle"><strong>Economy of mechanism</strong></td><td data-label="Plain meaning">Keep trusted security mechanisms as small and simple as practical.</td><td data-label="Example">A narrow authorization component is easier to review than many scattered checks.</td></tr>
    <tr><td data-label="Principle"><strong>Open design</strong></td><td data-label="Plain meaning">Security should depend on protected keys and credentials, not on hiding how the design works.</td><td data-label="Example">A published cryptographic design remains secure because the key is protected.</td></tr>
    <tr><td data-label="Principle"><strong>Least common mechanism</strong></td><td data-label="Plain meaning">Reduce shared components and resources that create unintended paths between users or domains.</td><td data-label="Example">Separate tenant data and administrative paths.</td></tr>
    <tr><td data-label="Principle"><strong>Psychological acceptability</strong></td><td data-label="Plain meaning">Make secure behavior understandable and practical enough that people can follow it correctly.</td><td data-label="Example">Clear authentication prompts and recovery steps that do not encourage workarounds.</td></tr>
  </tbody>
</table>
</div>

<h2 id="reference-monitor">Reference monitor and trusted components</h2>

A **reference monitor** is the concept of a mechanism that checks access between subjects and objects. It should be:

- **Always invoked:** Every relevant access request is checked.
- **Tamper resistant:** Untrusted users and processes cannot change or bypass it.
- **Small enough to evaluate:** Its design and implementation can be analyzed and tested.

The **security kernel** is the part of a system that implements the reference-monitor concept. The **Trusted Computing Base (TCB)** is the collection of hardware, software, firmware, and controls that must work correctly for the system's security policy to hold.

A smaller TCB is usually easier to understand, protect, test, and maintain.

<h2 id="zero-trust">Zero trust is an architecture principle, not one product</h2>

**Zero trust** means the system does not grant implicit trust because a user or device is inside a network, owned by the organization, or previously authenticated.

A zero-trust design commonly emphasizes:

- Explicit identity and device checks
- Least-privilege access
- Resource-specific policy
- Repeated evaluation of context and session conditions
- Segmentation and reduced trust zones
- Monitoring, logging, and rapid revocation

Zero trust does not mean trusting nobody in every business sense. It means access decisions should be based on verified identity, device, policy, and context rather than location alone.

<h2 id="scenarios">Scenario comparisons</h2>

### A classified document must not be copied to a lower classification

Bell-LaPadula fits because the problem is unauthorized disclosure through downward information flow.

### A low-integrity data feed must not update trusted financial records directly

Biba fits the integrity concern. Clark-Wilson may also fit when updates must occur through approved transactions and separated roles.

### A consulting employee accesses one bank's confidential records

Brewer-Nash can block later access to a competing bank's confidential information because the conflict depends on prior access.

### A system checks authorization only when the user first signs in

Complete mediation is missing. Sensitive actions should be checked when the access occurs, not assumed safe forever because of an earlier login.

### A control failure causes the system to grant access

The design does not fail securely. A failure should preserve protection or deny the unsafe operation.

<h2 id="exam-traps">Common exam traps</h2>

- Choosing Bell-LaPadula for an integrity problem.
- Reversing Biba's strict read and write rules.
- Treating Clark-Wilson as a classification model instead of a transaction and integrity model.
- Treating Brewer-Nash as static role-based access.
- Assuming defense in depth means duplicating the same control without considering different failure modes.
- Calling a hidden design secure because attackers do not know how it works.
- Treating zero trust as a single firewall, VPN, or identity product.
- Forgetting that the reference monitor is a concept and the security kernel is an implementation mechanism.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of CISSP security models" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Need</th><th scope="col">Best match</th></tr></thead>
  <tbody>
    <tr><td data-label="Need">Protect confidentiality across classification levels</td><td data-label="Best match">Bell-LaPadula</td></tr>
    <tr><td data-label="Need">Protect integrity across trust levels</td><td data-label="Best match">Biba</td></tr>
    <tr><td data-label="Need">Protect business records through approved transactions</td><td data-label="Best match">Clark-Wilson</td></tr>
    <tr><td data-label="Need">Prevent conflicts of interest based on prior access</td><td data-label="Best match">Brewer-Nash</td></tr>
    <tr><td data-label="Need">Keep every transition inside secure states</td><td data-label="Best match">State-machine model</td></tr>
    <tr><td data-label="Need">Check every access through a protected mechanism</td><td data-label="Best match">Reference monitor and complete mediation</td></tr>
    <tr><td data-label="Need">Remove implicit trust based on network location</td><td data-label="Best match">Zero trust</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-160 Volume 1 Revision 1: Engineering Trustworthy Secure Systems](https://csrc.nist.gov/pubs/sp/800/160/v1/r1/final)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
