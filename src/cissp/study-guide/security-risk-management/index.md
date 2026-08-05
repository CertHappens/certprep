---
layout: layouts/article.njk
title: "CISSP Domain 1: Security and Risk Management"
description: Study CISSP Domain 1 with practical guidance on ethics, governance, law, policy, continuity, personnel security, risk, threat modeling, supply chains, and security learning programs.
permalink: /cissp/study-guide/security-risk-management/
ogType: article
printable: true
printTitle: "CISSP Domain 1: Security and Risk Management"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 1
eyebrow: CISSP Domain 1 guide
lede: Connect ethics, governance, legal duties, business continuity, personnel decisions, risk, suppliers, and learning programs to the people accountable for each outcome.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Security and Risk Management
    url: /cissp/study-guide/security-risk-management/
toc:
  - id: domain-map
    label: Domain 1 map
  - id: decision-order
    label: Decision order
  - id: ethics-principles
    label: Ethics and principles
  - id: governance
    label: Governance
  - id: legal-investigations
    label: Law and investigations
  - id: policy
    label: Policy hierarchy
  - id: business-continuity
    label: Business continuity
  - id: personnel-security
    label: Personnel security
  - id: risk-management
    label: Risk management
  - id: threat-modeling
    label: Threat modeling
  - id: supply-chain
    label: Supply-chain risk
  - id: awareness
    label: Awareness and training
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 1
  - Security and Risk Management
  - security governance
  - risk assessment
  - business continuity
  - supply chain risk management
  - security awareness
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: CISSP Certification Overview
    url: /cissp/
    description: Review exam format, experience requirements, maintenance obligations, and candidate fit.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Follow information and other assets through classification, handling, ownership, retention, protection, and destruction.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Apply governance, risk, privacy, threat-modeling, and supplier requirements to secure system and facility design.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Connect governance, asset requirements, architecture, and cryptography to network design, segmentation, infrastructure, and secure channels.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Apply governance, personnel security, policy, and risk decisions to identity proofing, authentication, authorization, and access reviews.
  - title: "Security+ Domain 5: Program Management and Oversight"
    url: /security-plus/sy0-701/study-guide/security-program-management-oversight/
    description: Refresh foundational governance, risk, third-party, compliance, audit, and awareness concepts.
  - title: Recovery Metrics Quick Reference
    url: /security-plus/quick-review/recovery-metrics/
    description: Compare recovery time, recovery point, repair, and failure measurements used in continuity decisions.
---
Domain 1 accounts for 16 percent of the current CISSP exam outline, the largest average weight of the eight domains. It establishes how an organization decides what security should accomplish, who is accountable, which obligations apply, how risk is evaluated, and how people are prepared to follow the program.

The domain reaches far beyond a risk register. A scenario may begin with a supplier, employee, policy, investigation, privacy requirement, business process, or artificial intelligence service. Follow the chain of authority and evidence: identify the requirement, determine ownership, assess the risk, choose a treatment, document the decision, implement controls, and monitor the result.

<h2 id="domain-map">Domain 1 map</h2>

The official outline divides Security and Risk Management into twelve objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 1 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>1.1</td><td>Professional ethics</td><td>Which action protects the public, serves the principal responsibly, and preserves professional integrity?</td></tr>
      <tr><td>1.2</td><td>Security concepts</td><td>Which security property or assurance goal is required?</td></tr>
      <tr><td>1.3</td><td>Governance</td><td>How does security align with strategy, authority, accountability, frameworks, due care, and due diligence?</td></tr>
      <tr><td>1.4</td><td>Legal, regulatory, and compliance issues</td><td>Which jurisdiction, contract, standard, privacy duty, license, or regulatory obligation applies?</td></tr>
      <tr><td>1.5</td><td>Investigation requirements</td><td>What authority, process, evidence standard, and reporting path fit the investigation?</td></tr>
      <tr><td>1.6</td><td>Policy hierarchy</td><td>Which document sets direction, mandatory requirements, repeatable steps, or recommended practice?</td></tr>
      <tr><td>1.7</td><td>Business continuity</td><td>Which business processes, dependencies, impacts, recovery needs, and resilience priorities matter?</td></tr>
      <tr><td>1.8</td><td>Personnel security</td><td>What controls belong before, during, and after employment or third-party access?</td></tr>
      <tr><td>1.9</td><td>Risk management</td><td>How is risk identified, analyzed, prioritized, treated, assigned, monitored, and reported?</td></tr>
      <tr><td>1.10</td><td>Threat modeling</td><td>Which assets, trust boundaries, threats, attack paths, and mitigations should be examined?</td></tr>
      <tr><td>1.11</td><td>Supply-chain risk</td><td>How will the organization assess suppliers, define requirements, monitor dependencies, and prepare alternatives?</td></tr>
      <tr><td>1.12</td><td>Awareness, education, and training</td><td>Which audience, behavior, skill, delivery method, and measure of effectiveness fit the need?</td></tr>
    </tbody>
  </table>
</div>

One scenario can touch several objectives. Acquiring an artificial intelligence service may involve ethics, privacy, contracts, supplier due diligence, risk assessment, data governance, continuity planning, security requirements, and role-based learning. The objective numbers help organize study, but the real decision crosses organizational boundaries.

<h2 id="decision-order">Use the right decision order</h2>

CISSP questions often reward process and authority. A technical control may be useful, but it can still be the wrong first action.

A practical decision sequence is:

1. **Identify the business objective and affected stakeholders.** Clarify the service, mission, people, data, safety, and obligations at risk.
2. **Determine authority and ownership.** Identify the business owner, risk owner, data owner, system owner, or other accountable role.
3. **Confirm requirements.** Review law, regulation, contract, policy, classification, architecture, and risk appetite.
4. **Assess the risk.** Describe threats, vulnerabilities, likelihood, impact, existing controls, uncertainty, and dependencies.
5. **Present treatment options.** Compare avoidance, mitigation, transfer, and acceptance with cost, feasibility, and residual risk.
6. **Obtain approval at the proper level.** Security staff provide analysis and recommendations. The accountable owner makes the business-risk decision.
7. **Implement and document controls.** Assign responsibilities, define measurable requirements, and retain evidence.
8. **Monitor and improve.** Reassess after changes, incidents, new threats, supplier events, audit findings, and changes in business priorities.

A question may begin at any point in this sequence. Read for what has already happened. If requirements and risk have been assessed, returning to the first step may be unnecessary. If the organization has not identified the affected data or owner, selecting a product is premature.

<h2 id="ethics-principles">Professional ethics and security principles</h2>

<h3>Ethical duties guide technical authority</h3>

Security professionals can access sensitive information, interrupt services, investigate people, influence risk decisions, and recommend expensive controls. Ethical obligations help keep that authority aligned with public safety, lawful behavior, honest service, and the health of the profession.

The ISC2 ethics framework places duties toward society and the common good above narrower interests. It also expects professionals to act honorably, provide competent service to those they represent, and support the profession. When duties appear to conflict, do not quietly choose the option that is easiest for the employer or the security team. Identify the stakeholders, applicable duties, potential harm, authority, and escalation path.

Examples:

- A manager asks an analyst to hide a material finding from a customer. The analyst should preserve integrity, follow reporting obligations, and use an appropriate escalation path.
- An investigation exposes unrelated personal information. The team should limit collection and access to what the authorized purpose requires.
- A penetration tester discovers a serious issue outside the agreed scope. The tester should preserve evidence and follow the rules of engagement rather than expanding activity without authorization.
- A security control creates a safety hazard. Protecting systems does not justify ignoring the risk to people.

<h3>Confidentiality, integrity, availability, authenticity, and nonrepudiation</h3>

The current outline names five pillars of information security:

<div class="table-scroll" role="region" aria-label="Five information security pillars" tabindex="0">
  <table>
    <thead><tr><th scope="col">Property</th><th scope="col">Purpose</th><th scope="col">Example evidence</th></tr></thead>
    <tbody>
      <tr><td>Confidentiality</td><td>Prevents unauthorized disclosure.</td><td>Access controls, encryption, data masking, and restricted distribution.</td></tr>
      <tr><td>Integrity</td><td>Protects accuracy, completeness, and authorized change.</td><td>Hashes, digital signatures, change controls, validation, and reconciliation.</td></tr>
      <tr><td>Availability</td><td>Keeps information and services accessible when required.</td><td>Redundancy, capacity, backups, failover, maintenance, and recovery testing.</td></tr>
      <tr><td>Authenticity</td><td>Provides confidence that an identity, message, system, or object is genuine.</td><td>Identity proofing, certificates, signed code, and trusted provenance.</td></tr>
      <tr><td>Nonrepudiation</td><td>Supports proof that an action or communication occurred and is attributable to a party.</td><td>Digital signatures, protected logs, timestamps, and controlled audit trails.</td></tr>
    </tbody>
  </table>
</div>

A control can support several properties. A digital signature can provide integrity, authenticity, and evidence useful for nonrepudiation. It does not provide confidentiality unless the content is also encrypted.

<h2 id="governance">Security governance</h2>

Governance establishes direction, accountability, oversight, and alignment with organizational objectives. Management plans and executes work within that direction. The terms overlap in conversation, but the distinction matters on the exam.

<h3>Governance and management</h3>

<div class="table-scroll" role="region" aria-label="Governance and management comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Area</th><th scope="col">Governance focus</th><th scope="col">Management focus</th></tr></thead>
    <tbody>
      <tr><td>Direction</td><td>Sets priorities, principles, risk expectations, and accountability.</td><td>Turns direction into plans, projects, controls, and daily operations.</td></tr>
      <tr><td>Authority</td><td>Assigns decision rights and oversight responsibilities.</td><td>Uses delegated authority to execute and coordinate work.</td></tr>
      <tr><td>Measurement</td><td>Reviews whether outcomes support organizational objectives.</td><td>Tracks performance, resources, schedules, findings, and corrective actions.</td></tr>
      <tr><td>Risk</td><td>Defines appetite and oversight expectations.</td><td>Assesses, treats, monitors, and reports risk within that direction.</td></tr>
    </tbody>
  </table>
</div>

<h3>Roles and responsibilities</h3>

Titles vary, so focus on the responsibility:

<div class="table-scroll" role="region" aria-label="Security governance roles" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">Role</th><th scope="col">Typical responsibility</th></tr></thead>
    <tbody>
      <tr><td data-label="Role">Board or governing body</td><td data-label="Typical responsibility">Provides oversight, approves direction, and holds leadership accountable for material organizational risk.</td></tr>
      <tr><td data-label="Role">Senior management</td><td data-label="Typical responsibility">Translates direction into organizational priorities, resources, accountability, and risk decisions.</td></tr>
      <tr><td data-label="Role">Security leadership</td><td data-label="Typical responsibility">Advises leadership, coordinates the security program, reports risk, and manages security capabilities.</td></tr>
      <tr><td data-label="Role">Business or mission owner</td><td data-label="Typical responsibility">Owns the business outcome and accepts risk within delegated authority.</td></tr>
      <tr><td data-label="Role">System owner</td><td data-label="Typical responsibility">Ensures a system meets business and security requirements across its lifecycle.</td></tr>
      <tr><td data-label="Role">Data owner</td><td data-label="Typical responsibility">Defines classification, access, handling, retention, and protection requirements for information.</td></tr>
      <tr><td data-label="Role">Custodian</td><td data-label="Typical responsibility">Implements and operates controls according to the owner's requirements.</td></tr>
      <tr><td data-label="Role">Control owner</td><td data-label="Typical responsibility">Maintains a control, its evidence, and its operating effectiveness.</td></tr>
      <tr><td data-label="Role">Risk owner</td><td data-label="Typical responsibility">Has authority and accountability for a specific risk and its treatment.</td></tr>
      <tr><td data-label="Role">Assessor or auditor</td><td data-label="Typical responsibility">Evaluates requirements, controls, evidence, and results with the required degree of independence.</td></tr>
    </tbody>
  </table>
</div>

A chief information security officer can advise that a risk should be accepted. The person with the appropriate business authority accepts it. A custodian can configure access controls. The data owner defines who should have access.

<h3>Security frameworks and architectures</h3>

The outline names several examples. They solve different problems:

<div class="table-scroll" role="region" aria-label="Security framework purposes" tabindex="0">
  <table>
    <thead><tr><th scope="col">Framework or approach</th><th scope="col">Useful purpose</th></tr></thead>
    <tbody>
      <tr><td>NIST Cybersecurity Framework</td><td>Organizes cybersecurity outcomes and supports communication about current and target risk-management practices.</td></tr>
      <tr><td>NIST Risk Management Framework</td><td>Provides a lifecycle process for preparing, categorizing, selecting, implementing, assessing, authorizing, and monitoring controls.</td></tr>
      <tr><td>ISO/IEC 27001 family</td><td>Supports an information security management system with risk-based requirements and continual improvement.</td></tr>
      <tr><td>COBIT</td><td>Supports governance and management of enterprise information and technology.</td></tr>
      <tr><td>SABSA</td><td>Connects business requirements to layered security architecture.</td></tr>
      <tr><td>PCI DSS</td><td>Defines contractual industry requirements for protecting payment-card account data.</td></tr>
      <tr><td>FedRAMP</td><td>Provides a standardized U.S. federal approach to assessing, authorizing, and continuously monitoring cloud services.</td></tr>
    </tbody>
  </table>
</div>

Do not assume that selecting a framework completes governance. The organization still needs scope, ownership, tailored requirements, implementation, evidence, review, and improvement.

<h3>Due care and due diligence</h3>

**Due care** is the responsibility to take reasonable and appropriate steps to protect people, assets, and interests from foreseeable harm. It is demonstrated through the safeguards and decisions an organization actually puts into practice.

**Due diligence** is the ongoing process of investigating, verifying, monitoring, and documenting whether those safeguards remain appropriate and effective. It is demonstrated through assessments, reviews, testing, supplier checks, and corrective actions.

Buying a security tool can demonstrate neither by itself. The organization must select an appropriate control, configure it, operate it, monitor it, respond to findings, and adjust it as conditions change.

<h2 id="legal-investigations">Legal, regulatory, compliance, and investigation requirements</h2>

CISSP is global, and legal requirements vary by jurisdiction. The exam expects candidates to recognize the type of obligation and the need for qualified legal guidance, not to practice law from memory.

<h3>Sources of requirements</h3>

<div class="table-scroll" role="region" aria-label="Sources of security requirements" tabindex="0">
  <table>
    <thead><tr><th scope="col">Source</th><th scope="col">How it applies</th><th scope="col">Example question</th></tr></thead>
    <tbody>
      <tr><td>Law</td><td>Created by a legislative authority and enforced within its jurisdiction.</td><td>Which legal duty applies to a breach, surveillance activity, or protected information?</td></tr>
      <tr><td>Regulation</td><td>Detailed requirements issued under legal authority by a regulator.</td><td>Which evidence, control, or notification is required by the regulator?</td></tr>
      <tr><td>Contract</td><td>Creates obligations among parties, including security, privacy, audit, notification, and service requirements.</td><td>Which requirement should be written into the agreement before service begins?</td></tr>
      <tr><td>Industry standard</td><td>May be voluntary, contractually required, or tied to participation in an industry ecosystem.</td><td>What proof is needed to demonstrate conformity or maintain eligibility?</td></tr>
      <tr><td>Policy</td><td>Creates an internal organizational requirement within the authority that approved it.</td><td>Which employee, system, or supplier action violates the organization's stated rule?</td></tr>
    </tbody>
  </table>
</div>

Important issue areas include cybercrime, breach obligations, privacy, intellectual property, licensing, import and export restrictions, contractual commitments, and transborder data flows. A data transfer can be lawful in one location and restricted in another. A software license can limit copying, reverse engineering, geography, or usage. A breach can trigger several contractual and regulatory timelines.

The appropriate response is usually to identify the issue early, preserve facts, follow approved procedures, and involve legal, privacy, compliance, human resources, law enforcement, regulators, or other stakeholders as required.

<h3>Investigation types</h3>

<div class="table-scroll" role="region" aria-label="Investigation type comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Investigation</th><th scope="col">Typical purpose</th><th scope="col">Important considerations</th></tr></thead>
    <tbody>
      <tr><td>Administrative</td><td>Examines policy, workplace, or organizational misconduct.</td><td>Employment rules, privacy, human resources, internal authority, consistency, and documentation.</td></tr>
      <tr><td>Criminal</td><td>Supports potential prosecution for an alleged crime.</td><td>Lawful authority, evidence handling, chain of custody, legal standards, and coordination with law enforcement.</td></tr>
      <tr><td>Civil</td><td>Supports disputes among private parties or claims for remedies.</td><td>Preservation duties, discovery, legal holds, relevance, and counsel direction.</td></tr>
      <tr><td>Regulatory</td><td>Determines compliance with requirements enforced by a regulator.</td><td>Jurisdiction, reporting duties, required evidence, cooperation, and remediation.</td></tr>
      <tr><td>Industry or contractual</td><td>Determines conformity with a standard, agreement, or participation requirement.</td><td>Scope, assessor independence, evidence, reporting, contractual remedies, and follow-up.</td></tr>
    </tbody>
  </table>
</div>

Do not begin an investigation by collecting everything available. Confirm authority, scope, purpose, preservation requirements, privacy limits, and the people who should direct the work. Excessive collection can create legal, privacy, operational, and evidence-handling problems.

<h2 id="policy">Policy, standards, procedures, guidelines, and baselines</h2>

Governance documents differ by purpose and authority:

<div class="table-scroll" role="region" aria-label="Security document hierarchy" tabindex="0">
  <table>
    <thead><tr><th scope="col">Document</th><th scope="col">Purpose</th><th scope="col">Example</th></tr></thead>
    <tbody>
      <tr><td>Policy</td><td>States management direction and required outcomes.</td><td>Sensitive information must be classified and protected according to business and legal requirements.</td></tr>
      <tr><td>Standard</td><td>Defines a mandatory, measurable requirement that supports policy.</td><td>Administrative access must use phishing-resistant multifactor authentication.</td></tr>
      <tr><td>Procedure</td><td>Lists the approved steps for completing a repeatable task.</td><td>Disable accounts, recover devices, transfer ownership, and record approval during termination.</td></tr>
      <tr><td>Guideline</td><td>Provides recommended practice when flexibility and judgment are appropriate.</td><td>Prefer approved collaboration tools when sharing large internal files.</td></tr>
      <tr><td>Baseline</td><td>Defines a minimum configuration or control set for a class of systems or assets.</td><td>All managed laptops receive the approved operating-system hardening baseline.</td></tr>
    </tbody>
  </table>
</div>

A policy should remain stable enough to guide decisions through routine technology changes. Standards, baselines, and procedures contain more implementation detail and usually change more often.

A useful document lifecycle includes:

- Named ownership
- Stakeholder review
- Approval by the proper authority
- Version control and effective date
- Communication and acknowledgement where appropriate
- Training for affected roles
- Exception handling
- Monitoring and enforcement
- Periodic and event-driven review
- Retirement of obsolete versions

An exception should identify the requirement, scope, business reason, risk, compensating controls, owner, approver, expiration date, and review conditions. A permanent undocumented exception is a control failure disguised as flexibility.

<h2 id="business-continuity">Business continuity requirements</h2>

Business Continuity (BC) keeps priority business functions operating through disruption. Disaster Recovery (DR) restores technology and facilities needed to support those functions. Disaster recovery is part of the broader continuity effort.

<h3>Business impact analysis</h3>

A Business Impact Analysis (BIA) identifies priority processes, the effects of disruption, recovery needs, and dependencies. It should begin with business functions rather than the inventory of servers.

Questions include:

- Which services must continue or resume first?
- How does impact increase over time?
- Which people, facilities, information, systems, suppliers, utilities, and communications are required?
- Which manual workarounds are possible, and for how long?
- Which legal, contractual, safety, or customer obligations apply?
- What capacity is required during recovery?

<h3>Continuity and recovery measurements</h3>

<div class="table-scroll" role="region" aria-label="Continuity and recovery measurements" tabindex="0">
  <table>
    <thead><tr><th scope="col">Measure</th><th scope="col">Meaning</th><th scope="col">Question it answers</th></tr></thead>
    <tbody>
      <tr><td>Maximum tolerable downtime</td><td>The longest disruption the organization can tolerate before consequences become unacceptable.</td><td>How long can the business process remain unavailable?</td></tr>
      <tr><td>Recovery Time Objective (RTO)</td><td>The targeted time to restore a service or capability after disruption.</td><td>How quickly should this be restored?</td></tr>
      <tr><td>Recovery Point Objective (RPO)</td><td>The maximum acceptable amount of data loss measured in time.</td><td>How far back may the recovered data be?</td></tr>
      <tr><td>Work Recovery Time</td><td>The time needed after technology restoration to validate, reconcile, and resume the business process.</td><td>How long will the business need after systems return?</td></tr>
    </tbody>
  </table>
</div>

The RTO plus the work recovery time should fit inside the maximum tolerable downtime. An RPO does not describe how quickly a system returns. It describes acceptable data loss.

Use the [Recovery Metrics Quick Reference](/security-plus/quick-review/recovery-metrics/) for focused comparisons among RTO, RPO, Mean Time to Repair (MTTR), and Mean Time Between Failures (MTBF).

<h3>External dependencies</h3>

A recovery plan fails when it restores the application but ignores identity services, telecommunications, power, cloud regions, suppliers, payment processors, certificate services, staffing, or physical access.

Document dependencies and recovery assumptions. Confirm that a supplier's commitment supports the organization's objective. A four-hour internal RTO is not credible when the only provider contract promises restoration within two business days.

<h2 id="personnel-security">Personnel security</h2>

Personnel security manages risk before access is granted, while responsibilities change, and when the relationship ends. It applies to employees, contractors, consultants, vendors, temporary workers, and other third parties.

<h3>Before access</h3>

- Define role requirements and conflicts of interest.
- Perform screening that is lawful, proportionate, and relevant to the role.
- Use employment, confidentiality, acceptable-use, intellectual-property, and conduct agreements as appropriate.
- Establish the sponsor, manager, owner, duration, and scope of third-party access.
- Complete required training and acknowledgement before sensitive access is activated.

<h3>During employment or engagement</h3>

- Apply least privilege and need to know.
- Separate incompatible duties.
- Review access after transfers, promotions, extended leave, and role changes.
- Use job rotation and mandatory leave where they help expose concealed activity or reduce dependency on one person.
- Monitor privileged activity according to policy and law.
- Provide role-based training and clear reporting channels.
- Enforce policy consistently and document exceptions.

<h3>Termination and offboarding</h3>

Termination planning should be coordinated and timed according to risk. Common actions include:

- Disable physical and logical access.
- Revoke sessions, credentials, tokens, keys, certificates, and remote access.
- Recover devices, badges, documents, and other assets.
- Transfer data, records, approvals, and ownership.
- Preserve information subject to retention or legal hold.
- Remind the departing person of continuing obligations.
- Notify affected teams and suppliers.
- Review unusual activity when risk warrants it.

Friendly departures still require complete offboarding. Hostile departures may require tighter timing, monitoring, escort, and coordination, but actions should remain lawful and approved.

<h2 id="risk-management">Risk management</h2>

Risk management gives decision-makers a structured way to compare uncertainty, potential harm, business value, and available treatments.

<h3>Core terms</h3>

<div class="table-scroll" role="region" aria-label="Risk management core terms" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">Term</th><th scope="col">Meaning</th></tr></thead>
    <tbody>
      <tr><td data-label="Term">Asset</td><td data-label="Meaning">Something the organization values, including people, information, systems, services, facilities, reputation, and mission outcomes.</td></tr>
      <tr><td data-label="Term">Threat</td><td data-label="Meaning">A circumstance or event with the potential to cause harm.</td></tr>
      <tr><td data-label="Term">Vulnerability</td><td data-label="Meaning">A weakness or condition that can be exploited or triggered.</td></tr>
      <tr><td data-label="Term">Likelihood</td><td data-label="Meaning">The chance that the relevant threat event will occur and produce harm.</td></tr>
      <tr><td data-label="Term">Impact</td><td data-label="Meaning">The consequence to operations, assets, people, other organizations, or society.</td></tr>
      <tr><td data-label="Term">Inherent risk</td><td data-label="Meaning">Risk before considering the effect of controls.</td></tr>
      <tr><td data-label="Term">Residual risk</td><td data-label="Meaning">Risk remaining after controls and other treatments are considered.</td></tr>
      <tr><td data-label="Term">Risk appetite</td><td data-label="Meaning">The amount of possible loss, harm, disruption, or uncertainty an organization is willing to accept while pursuing its goals.</td></tr>
      <tr><td data-label="Term">Risk tolerance</td><td data-label="Meaning">The limit for how much loss, harm, delay, or disruption is acceptable in one area. For example, an organization may accept some downtime but set a maximum of two hours.</td></tr>
      <tr><td data-label="Term">Risk capacity</td><td data-label="Meaning">The maximum risk the organization can absorb without threatening its viability or obligations.</td></tr>
    </tbody>
  </table>
</div>

Risk appetite sets the broad boundary. Risk tolerance turns that boundary into measurable limits.

<h3>Qualitative and quantitative analysis</h3>

**Qualitative analysis** uses ordered categories such as low, medium, and high. It is practical when reliable numeric data is limited and supports prioritization across many risks. The rating criteria should be defined so different assessors do not apply the labels arbitrarily.

**Quantitative analysis** uses numeric estimates. Common formulas include:

- Single Loss Expectancy (SLE) = Asset Value (AV) × Exposure Factor (EF)
- Annualized Loss Expectancy (ALE) = SLE × Annualized Rate of Occurrence (ARO)

Suppose an event would create an estimated $200,000 loss and is expected once every five years. The ARO is 0.2, producing an ALE of $40,000. The result can help compare treatment costs, but it remains an estimate. Uncertain assumptions should be recorded and tested rather than hidden behind precise-looking numbers.

<h3>Risk responses</h3>

<div class="table-scroll" role="region" aria-label="Risk response comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Response</th><th scope="col">Meaning</th><th scope="col">Example</th></tr></thead>
    <tbody>
      <tr><td>Avoid</td><td>Stop or change the activity that creates the risk.</td><td>Do not collect information that the business does not need.</td></tr>
      <tr><td>Mitigate</td><td>Reduce likelihood, impact, or both through controls.</td><td>Add strong authentication, segmentation, monitoring, and tested recovery.</td></tr>
      <tr><td>Transfer or share</td><td>Shift some financial or operational consequence to another party.</td><td>Use insurance or contractual allocation while retaining accountability for unmanaged residual risk.</td></tr>
      <tr><td>Accept</td><td>Retain the risk through an informed, authorized decision.</td><td>A risk owner approves documented residual risk within delegated authority and review conditions.</td></tr>
    </tbody>
  </table>
</div>

Transfer does not remove all risk. Insurance may cover some financial losses but not safety, regulatory action, reputation, lost customers, or operational disruption. Outsourcing a service does not outsource accountability.

<h3>Control categories and functions</h3>

Controls may be described by how they are implemented:

- **Administrative or managerial:** policy, governance, risk assessment, training, contracts, and review.
- **Technical or logical:** access control, encryption, monitoring, filtering, and system-enforced restrictions.
- **Physical:** barriers, locks, guards, environmental systems, and facility controls.

They may also be described by function:

- Preventive
- Deterrent
- Detective
- Corrective
- Recovery
- Compensating
- Directive

One control can have several functions. A visible camera can deter activity and produce detective evidence. A backup supports recovery. A temporary manual review can compensate for an unavailable automated control.

<h3>Assessment, monitoring, reporting, and improvement</h3>

A risk process should continue after the initial decision:

- Assess whether controls are designed and operating as intended.
- Monitor changes in threats, vulnerabilities, business processes, suppliers, and technology.
- Report information at a level suited to the audience.
- Track treatment owners, deadlines, exceptions, and residual risk.
- Reassess after incidents, major changes, acquisitions, and regulatory changes.
- Measure maturity and improve the process, not only individual controls.

Executives need concise exposure, trend, decision, and accountability information. Control operators need detailed failures, thresholds, and corrective actions. Sending the same dashboard to every audience usually serves none of them well.

<h2 id="threat-modeling">Threat modeling</h2>

Threat modeling examines how a system or process could be harmed before or during its lifecycle. It turns vague concern into structured analysis.

A useful process:

1. Define the system, business purpose, assumptions, and scope.
2. Identify assets, sensitive operations, users, components, data flows, and dependencies.
3. Mark trust boundaries and entry points.
4. Identify threat actors, capabilities, motivations, and relevant threat events.
5. Examine weaknesses, misuse cases, attack paths, and failure conditions.
6. Estimate risk and prioritize scenarios.
7. Select design changes and controls.
8. Record assumptions and unresolved risks.
9. Revisit the model after design, architecture, supplier, or threat changes.

Methods such as STRIDE, attack trees, misuse cases, and process-focused approaches provide prompts. The method is a tool, not the outcome. A colorful diagram that never changes requirements or design has not reduced risk.

Threat modeling belongs early in design, but it should not stop there. New integrations, cloud services, artificial intelligence features, privilege changes, and supplier components can create new trust boundaries and attack paths.

<h2 id="supply-chain">Supply Chain Risk Management</h2>

Supply Chain Risk Management (SCRM) addresses risks introduced through suppliers, products, services, components, development processes, support channels, and dependencies.

Threats include:

- Counterfeit or tampered components
- Malicious implants or unauthorized functionality
- Vulnerable development and build processes
- Compromised updates or distribution channels
- Unsupported products and hidden dependencies
- Excessive supplier access
- Weak subcontractors or fourth parties
- Service concentration and geographic dependency
- Financial failure, acquisition, or loss of key personnel
- Poor incident notification and recovery capability

<h3>Supplier lifecycle controls</h3>

<div class="table-scroll" role="region" aria-label="Supplier lifecycle controls" tabindex="0">
  <table>
    <thead><tr><th scope="col">Stage</th><th scope="col">Security work</th></tr></thead>
    <tbody>
      <tr><td>Planning</td><td>Define business need, criticality, data, access, resilience, legal duties, and exit requirements.</td></tr>
      <tr><td>Due diligence</td><td>Assess governance, controls, incidents, financial stability, development practices, dependencies, and evidence.</td></tr>
      <tr><td>Contracting</td><td>Set minimum requirements, service levels, audit rights, notification, data handling, support, recovery, change, and termination terms.</td></tr>
      <tr><td>Onboarding</td><td>Approve access, integrations, data flows, ownership, monitoring, and contacts.</td></tr>
      <tr><td>Operation</td><td>Monitor performance, control evidence, incidents, vulnerabilities, changes, subcontractors, and risk indicators.</td></tr>
      <tr><td>Offboarding</td><td>Revoke access, return or destroy data, transfer services, preserve required records, and verify completion.</td></tr>
    </tbody>
  </table>
</div>

A Software Bill of Materials (SBOM) can improve visibility into software components. It does not prove that the components are secure, authentic, supported, correctly configured, or monitored. Use it as evidence within a broader supplier and vulnerability-management process.

Hardware roots of trust, physically unclonable functions, signed updates, provenance records, and controlled distribution can reduce tampering and counterfeit risk. Their value depends on implementation, verification, key management, and lifecycle support.

<h3>Artificial intelligence suppliers</h3>

Artificial intelligence services can introduce opaque data sources, model dependencies, external processing, rapidly changing features, and non-human identities. Domain 1 treats these as governance, risk, privacy, supplier, ethics, and awareness concerns rather than as a separate island.

Ask:

- Which data is collected, retained, used for training, or shared with subprocessors?
- Who owns inputs, outputs, models, and derived information?
- How are bias, unsafe output, confidentiality, integrity, and availability risks assessed?
- Which human approvals remain necessary?
- How are model changes, incidents, and service degradation reported?
- Can the organization export data and continue the process if the provider fails?
- Which employees need guidance on acceptable use, sensitive data, verification, and accountability?

<h2 id="awareness">Security awareness, education, and training</h2>

A learning program should change behavior and improve capability. Completion rates alone show that people clicked through material. They do not show that employees recognize, avoid, report, or recover from security events.

<h3>Awareness, training, and education</h3>

<div class="table-scroll" role="region" aria-label="Awareness, training, and education comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Activity</th><th scope="col">Purpose</th><th scope="col">Example</th></tr></thead>
    <tbody>
      <tr><td>Awareness</td><td>Keeps security concerns visible and influences everyday behavior.</td><td>Short reminders, campaign messages, posters, brief videos, and incident lessons.</td></tr>
      <tr><td>Training</td><td>Builds the knowledge and skill needed to perform a role or task.</td><td>Secure administration, incident handling, privacy procedures, or supplier-review training.</td></tr>
      <tr><td>Education</td><td>Develops broader understanding that supports judgment across new situations.</td><td>Formal courses, degree programs, professional study, and deeper conceptual learning.</td></tr>
    </tbody>
  </table>
</div>

<h3>Program lifecycle</h3>

1. Identify audiences, roles, risks, obligations, and desired behaviors.
2. Define measurable learning and performance objectives.
3. Select delivery methods suited to the audience and work environment.
4. Provide onboarding, periodic, event-driven, and role-based content.
5. Give people a simple way to ask questions and report suspicious activity.
6. Measure knowledge, behavior, reporting quality, incidents, and operational outcomes.
7. Improve content based on evidence, new threats, incidents, technology, and feedback.

Methods may include phishing simulations, social-engineering exercises, tabletop scenarios, security champions, coaching, games, targeted reminders, and practical exercises. Simulations should educate rather than humiliate. Metrics should discourage gaming and account for false positives, reporting speed, role differences, and repeated improvement.

Emerging topics require periodic review. Cryptocurrency, blockchain, cloud services, artificial intelligence, deepfakes, collaboration tools, and changing social-engineering methods can create new behaviors and responsibilities. Update the program when the work changes, not only when the annual training date arrives.

<h2 id="exam-traps">Common Domain 1 exam traps</h2>

### Choosing implementation before requirements

A product, encryption method, or monitoring tool may be useful. First identify classification, business need, legal duties, architecture, risk, and ownership.

### Letting the security team accept business risk

Security professionals assess and communicate risk. The authorized business or risk owner accepts residual risk.

### Treating compliance as the complete security goal

Compliance can establish minimum requirements and evidence. The organization still needs to address risks outside the requirement and confirm that controls protect the business outcome.

### Confusing due care with due diligence

Due care is reasonable protective action. Due diligence is the continuing effort to investigate, verify, monitor, and maintain that protection.

### Assuming transfer eliminates accountability

Insurance, outsourcing, and contracts can shift some consequences. The organization retains risks that cannot be transferred and remains accountable for its obligations.

### Starting an investigation without authority or scope

Confirm the purpose, authority, rules, preservation duties, privacy limits, and stakeholders before broad collection or intrusive action.

### Restoring technology without restoring the business process

A server can be online while the business remains unable to operate. Account for people, data reconciliation, suppliers, facilities, identity, communications, and work recovery time.

### Measuring training by completion alone

Completion is an administrative measure. Evaluate behavior, capability, reporting, incidents, and operational outcomes.

<h2 id="review-checklist">Domain 1 review checklist</h2>

You should be able to:

- Explain how professional ethics affects a security decision.
- Distinguish confidentiality, integrity, availability, authenticity, and nonrepudiation.
- Separate governance from management.
- Identify the authority of boards, senior management, business owners, risk owners, data owners, custodians, and assessors.
- Compare due care and due diligence.
- Explain the purpose of major governance and risk frameworks without treating them as interchangeable.
- Distinguish law, regulation, contract, industry requirement, and internal policy.
- Identify the considerations for administrative, criminal, civil, regulatory, and contractual investigations.
- Compare policies, standards, procedures, guidelines, and baselines.
- Explain how a Business Impact Analysis drives continuity and recovery priorities.
- Distinguish maximum tolerable downtime, RTO, RPO, and work recovery time.
- Apply personnel controls before access, during changes, and at termination.
- Distinguish assets, threats, vulnerabilities, likelihood, impact, inherent risk, and residual risk.
- Compare qualitative and quantitative risk analysis.
- Calculate SLE and ALE from provided values and explain their limitations.
- Compare avoidance, mitigation, transfer, and acceptance.
- Classify controls by implementation and function.
- Describe a threat-modeling process and explain why it should be repeated after significant change.
- Apply supplier controls from planning through offboarding.
- Explain what an SBOM can and cannot prove.
- Distinguish awareness, training, and education.
- Choose measures that show behavior and capability rather than attendance alone.

<h2 id="official-references">Official references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [ISC2 ethics guidance](https://www.isc2.org/Ethics)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20)
- [NIST SP 800-30 Rev. 1, Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [NIST SP 800-37 Rev. 2, Risk Management Framework](https://csrc.nist.gov/pubs/sp/800/37/r2/final)
- [NIST SP 800-34 Rev. 1, Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)
- [NIST SP 800-161 Rev. 1, Cybersecurity Supply Chain Risk Management Practices](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final)
- [NIST SP 800-50 Rev. 1, Building a Cybersecurity and Privacy Learning Program](https://csrc.nist.gov/pubs/sp/800/50/r1/final)
- [NIST Artificial Intelligence Risk Management Framework 1.0](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10)

The official ISC2 outline defines the exam objectives. The NIST publications provide detailed, publicly available context for risk assessment, lifecycle governance, continuity, supply-chain risk, learning programs, and artificial intelligence risk. CertHappens is an independent study resource and is not affiliated with or endorsed by ISC2.
