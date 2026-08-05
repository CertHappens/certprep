---
layout: layouts/article.njk
title: CISSP Study Guide
description: Organize CISSP preparation across all eight domains with a practical roadmap for risk, governance, architecture, operations, and senior-level security decisions.
permalink: /cissp/study-guide/
ogType: article
printable: true
printTitle: CISSP Study Guide
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Study Guide
eyebrow: CISSP study guide
lede: Build a study plan around the eight official domains, then practice connecting technical choices to organizational risk, responsibilities, and business outcomes.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
toc:
  - id: exam-snapshot
    label: Exam snapshot
  - id: how-to-use
    label: How to use this guide
  - id: decision-lens
    label: CISSP decision lens
  - id: domains
    label: Eight domains
  - id: study-plan
    label: Study plan
  - id: review-habits
    label: Review habits
  - id: official-references
    label: Official references
keywords:
  - CISSP study guide
  - CISSP domains
  - Security and Risk Management
  - Asset Security
  - Security Architecture and Engineering
  - Security Operations
relatedLinks:
  - title: CISSP Certification Overview
    url: /cissp/
    description: Review the exam format, experience path, maintenance requirements, and candidate perspective.
  - title: "Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Build the ethics, governance, legal, continuity, personnel, risk, supply-chain, and awareness foundation.
  - title: "Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Follow information and other assets through classification, handling, ownership, retention, protection, and destruction.
  - title: "Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Connect secure design principles, models, system capabilities, cryptography, facilities, and lifecycle engineering.
  - title: "Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Connect network models, segmentation, secure protocols, infrastructure, monitoring, and protected communication channels.
  - title: "Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Follow identity proofing, authentication, authorization, federation, provisioning, privileged access, and account removal.
  - title: "Domain 6: Security Assessment and Testing"
    url: /cissp/study-guide/security-assessment-testing/
    description: Plan assessments, test controls, evaluate evidence, report findings, and follow remediation, exceptions, and audits.
  - title: "Domain 7: Security Operations"
    url: /cissp/study-guide/security-operations/
    description: Operate investigations, monitoring, incident response, configuration, patching, recovery, continuity, physical safeguards, and personnel safety.
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Refresh security controls, architecture, operations, threats, and governance concepts at the foundational level.
  - title: Network+ N10-009 Study Guide
    url: /network-plus/n10-009/study-guide/
    description: Review network architecture, services, security, and operations used across several CISSP domains.
---
The Certified Information Systems Security Professional (CISSP) exam covers security across an organization rather than inside one product, team, or technical specialty. A candidate may need to recognize a protocol or control, but the stronger answer often depends on who owns the decision, which requirement applies, how risk is evaluated, and what should happen before implementation.

The current ISC2 exam outline took effect April 15, 2024. It contains eight domains and gives the greatest average weight to Security and Risk Management. The breadth means most experienced candidates begin with both strengths and blind spots. A security operations specialist may need more software-development depth. An auditor may need more architecture and cryptography. A network engineer may need more governance, privacy, and personnel-security context.

Use the official outline as the coverage checklist. Use this guide to organize the work, connect nearby concepts, and keep technical facts attached to the decisions they support.

<h2 id="exam-snapshot">CISSP exam snapshot</h2>

The official ISC2 outline describes the English CISSP exam as computerized adaptive testing (CAT):

<div class="exam-facts">
  <dl>
    <div>
      <dt>Exam time</dt>
      <dd>3 hours</dd>
    </div>
    <div>
      <dt>Number of items</dt>
      <dd>100 to 150</dd>
    </div>
    <div>
      <dt>Item format</dt>
      <dd>Multiple choice and advanced item types</dd>
    </div>
    <div>
      <dt>Passing grade</dt>
      <dd>700 out of 1000 points</dd>
    </div>
  </dl>
</div>

Computerized adaptive testing adjusts item selection based on the candidate's responses while maintaining the domain weighting required by the exam outline. A candidate cannot return to an earlier item after submitting an answer. That makes careful reading important, but repeatedly second-guessing every question can waste time and attention.

<div class="article-callout">
  <p><strong>Confirm current exam rules with ISC2.</strong> Delivery details, policies, and certification requirements can change. Check the official outline and registration guidance before scheduling the exam.</p>
</div>

<h2 id="how-to-use">How to use this guide</h2>

A productive CISSP study cycle has four parts:

1. **Map the outline to your experience.** Mark each objective as familiar, partly familiar, or unfamiliar. Distinguish direct work experience from topics you have only read about.
2. **Build the decision context.** Learn the business purpose, accountable role, lifecycle stage, and risk consideration around each control or process.
3. **Practice distinctions.** Compare terms that appear reasonable together, such as due care and due diligence, data owner and custodian, business continuity and disaster recovery, or risk appetite and risk tolerance.
4. **Review the strongest distractor.** When you miss a question, identify why the wrong choice looked plausible and which clue made another answer better.

Do not study each domain as an isolated container. Security and Risk Management influences architecture, access control, operations, testing, and software development. Asset classification affects encryption, identity, retention, monitoring, and disposal. Business continuity depends on architecture, suppliers, operations, and tested recovery procedures.

<h3>Choose the resource that matches the weakness</h3>

<div class="table-scroll" role="region" aria-label="CISSP resource chooser" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Need</th>
        <th scope="col">Best starting point</th>
        <th scope="col">Use it for</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td data-label="Need">Complete exam organization</td>
        <td data-label="Best starting point"><a href="#domains">Eight-domain roadmap</a></td>
        <td data-label="Use it for">Identifying the domain and study priority behind a broad weakness.</td>
      </tr>
      <tr>
        <td data-label="Need">Governance and risk foundation</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/security-risk-management/">Domain 1 guide</a></td>
        <td data-label="Use it for">Ethics, legal duties, policy, continuity, personnel security, risk, supply chains, and awareness.</td>
      </tr>
      <tr>
        <td data-label="Need">Classification and data lifecycle</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/asset-security/">Domain 2 guide</a></td>
        <td data-label="Use it for">Classification, ownership, handling, data roles, retention, sanitization, and protection controls.</td>
      </tr>
      <tr>
        <td data-label="Need">Network architecture and protected communications</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/communication-network-security/">Domain 4 guide</a></td>
        <td data-label="Use it for">Models, secure protocols, segmentation, network components, monitoring, remote access, and third-party connectivity.</td>
      </tr>
      <tr>
        <td data-label="Need">Identity, authentication, and access decisions</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/identity-access-management/">Domain 5 guide</a></td>
        <td data-label="Use it for">Identity proofing, authentication, federation, authorization models, provisioning, privileged access, and service accounts.</td>
      </tr>
      <tr>
        <td data-label="Need">Assessment evidence and control testing</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/security-assessment-testing/">Domain 6 guide</a></td>
        <td data-label="Use it for">Assessment strategy, vulnerability and penetration testing, process data, metrics, reporting, remediation, exceptions, and audits.</td>
      </tr>
      <tr>
        <td data-label="Need">Security operations, incident response, and recovery</td>
        <td data-label="Best starting point"><a href="/cissp/study-guide/security-operations/">Domain 7 guide</a></td>
        <td data-label="Use it for">Investigations, logging, monitoring, configuration, incidents, detection, patching, recovery, continuity, physical security, and personnel safety.</td>
      </tr>
      <tr>
        <td data-label="Need">Security controls and operations refresher</td>
        <td data-label="Best starting point"><a href="/security-plus/sy0-701/study-guide/">Security+ study guide</a></td>
        <td data-label="Use it for">Rebuilding technical vocabulary before applying the broader CISSP perspective.</td>
      </tr>
      <tr>
        <td data-label="Need">Network foundation</td>
        <td data-label="Best starting point"><a href="/network-plus/n10-009/study-guide/">Network+ study guide</a></td>
        <td data-label="Use it for">Refreshing architecture, segmentation, services, protocols, and operational evidence.</td>
      </tr>
      <tr>
        <td data-label="Need">Official scope</td>
        <td data-label="Best starting point"><a href="https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline">ISC2 exam outline</a></td>
        <td data-label="Use it for">Checking every task and subtask that may appear on the exam.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="decision-lens">The CISSP decision lens</h2>

CISSP questions commonly present several actions that could help. The task is to choose the action that best fits the stated role, authority, sequence, and risk context.

Use these questions to evaluate the choices:

1. **What outcome is the organization protecting?** Consider people, mission, legal duties, services, data, reputation, and financial stability.
2. **Who has authority?** A security professional may recommend and implement controls, while a business owner or senior leader accepts business risk.
3. **What requirement governs the decision?** Look for policy, law, regulation, contract, standard, risk appetite, or architecture requirements.
4. **What should happen first?** Requirements, classification, assessment, ownership, and approval often precede technical implementation.
5. **What is the least disruptive action that meets the requirement?** A stronger control is not automatically the better control when it prevents the business process from functioning.
6. **How will the organization know the control works?** Favor measurable requirements, documented evidence, testing, monitoring, and review.
7. **What happens across the lifecycle?** Consider acquisition, deployment, operation, change, incident response, recovery, retention, and disposal.

<h3>Common perspective shifts</h3>

<div class="table-scroll" role="region" aria-label="CISSP perspective shifts" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Scenario clue</th><th scope="col">Useful perspective</th></tr>
    </thead>
    <tbody>
      <tr><td>A control is technically effective but expensive or disruptive.</td><td>Compare the risk reduction with business impact, obligations, alternatives, and risk appetite.</td></tr>
      <tr><td>A serious finding needs a decision.</td><td>Provide the risk owner with clear impact, likelihood, options, and residual risk.</td></tr>
      <tr><td>A new system is being designed.</td><td>Define requirements and trust boundaries early instead of adding controls after deployment.</td></tr>
      <tr><td>A supplier provides a critical service.</td><td>Address due diligence, contract requirements, monitoring, concentration risk, recovery, and exit planning.</td></tr>
      <tr><td>An incident creates legal or regulatory exposure.</td><td>Preserve evidence, follow approved procedures, involve appropriate stakeholders, and respect reporting duties.</td></tr>
      <tr><td>A policy exists but behavior has not changed.</td><td>Check communication, acknowledgement, role-based learning, enforcement, measurement, and leadership support.</td></tr>
    </tbody>
  </table>
</div>

<h2 id="domains">The eight CISSP domains</h2>

The domain weights are averages. Computerized adaptive testing still constructs each exam in accordance with the official weighting, but a candidate should not expect questions to arrive in domain order.

<div class="table-scroll" role="region" aria-label="CISSP domains, weights, and study priorities" tabindex="0">
  <table class="table--compact-second-column">
    <thead>
      <tr>
        <th scope="col">Domain</th>
        <th scope="col">Weight</th>
        <th scope="col">Study priority</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><a href="#domain-1">1. Security and Risk Management</a></td>
        <td>16%</td>
        <td>Build the governance, ethics, legal, continuity, personnel, risk, supplier, and awareness foundation used across the exam.</td>
      </tr>
      <tr>
        <td><a href="#domain-2">2. Asset Security</a></td>
        <td>10%</td>
        <td>Connect classification and ownership to handling, privacy, retention, protection, and destruction decisions.</td>
      </tr>
      <tr>
        <td><a href="#domain-3">3. Security Architecture and Engineering</a></td>
        <td>13%</td>
        <td>Understand secure design principles, models, cryptography, system types, physical design, and lifecycle engineering.</td>
      </tr>
      <tr>
        <td><a href="#domain-4">4. Communication and Network Security</a></td>
        <td>13%</td>
        <td>Apply secure architecture, segmentation, protocols, transmission, remote access, and network operations concepts.</td>
      </tr>
      <tr>
        <td><a href="#domain-5">5. Identity and Access Management</a></td>
        <td>13%</td>
        <td>Manage identities, authentication, authorization, federation, access models, provisioning, review, and deprovisioning.</td>
      </tr>
      <tr>
        <td><a href="#domain-6">6. Security Assessment and Testing</a></td>
        <td>12%</td>
        <td>Choose assessment strategies, collect evidence, test controls, interpret results, report findings, and support audits.</td>
      </tr>
      <tr>
        <td><a href="#domain-7">7. Security Operations</a></td>
        <td>13%</td>
        <td>Connect investigations, monitoring, incidents, vulnerability management, change, resilience, recovery, and personnel safety.</td>
      </tr>
      <tr>
        <td><a href="#domain-8">8. Software Development Security</a></td>
        <td>10%</td>
        <td>Integrate security into development, acquisition, testing, coding, deployment, maintenance, and software supply chains.</td>
      </tr>
    </tbody>
  </table>
</div>

<h3 id="domain-1">Domain 1: Security and Risk Management</h3>

Domain 1 establishes how security decisions are governed and justified. It covers professional ethics, security principles, organizational governance, legal and regulatory obligations, investigations, policy, business continuity, personnel security, risk management, threat modeling, supply-chain risk, and security learning programs.

Start with the detailed [Security and Risk Management guide](/cissp/study-guide/security-risk-management/). The vocabulary in this domain appears throughout the other seven domains, especially ownership, due care, due diligence, risk response, policy hierarchy, resilience, and control assessment.

<h3 id="domain-2">Domain 2: Asset Security</h3>

Asset Security follows information and other assets through classification, ownership, handling, storage, retention, protection, and destruction. Study the roles of owner, controller, custodian, processor, user, and data subject. Connect each role to authority and responsibility rather than memorizing titles without context.

A classification label matters because it drives handling requirements. Those requirements influence access control, encryption, monitoring, backup, retention, transmission, and disposal. Use the detailed [Asset Security guide](/cissp/study-guide/asset-security/) to connect the six official objectives to practical lifecycle decisions.

<h3 id="domain-3">Domain 3: Security Architecture and Engineering</h3>

This domain combines abstract security models with practical engineering decisions. Topics include secure design principles, system security capabilities, architecture weaknesses, cryptography, physical security, and the information-system lifecycle.

Learn what a model or principle protects, which assumption it makes, and where it fits. A name alone is rarely enough. For cryptography, connect algorithm selection to confidentiality, integrity, authentication, nonrepudiation, key management, performance, and lifecycle risk. Use the detailed [Security Architecture and Engineering guide](/cissp/study-guide/security-architecture-engineering/) to connect all ten official objectives.

<h3 id="domain-4">Domain 4: Communication and Network Security</h3>

Communication and Network Security covers secure network design, traffic flow, segmentation, protocols, transmission media, wireless and mobile networking, remote access, network components, and third-party connectivity.

Technical recognition remains important, but CISSP adds architecture and governance questions. A secure connection must fit the trust boundary, performance need, availability requirement, management model, and monitoring strategy. Use the detailed [Communication and Network Security guide](/cissp/study-guide/communication-network-security/) to connect all three official objectives.

<h3 id="domain-5">Domain 5: Identity and Access Management</h3>

Identity and Access Management (IAM) covers people, devices, services, credentials, sessions, federation, access-control models, provisioning, review, and removal. Follow the identity lifecycle from registration and proofing through authorization, monitoring, changes, and deprovisioning.

Separate identification, authentication, authorization, and accounting. Then connect each step to governance principles such as least privilege, need to know, separation of duties, and periodic review. Use the detailed [Identity and Access Management guide](/cissp/study-guide/identity-access-management/) to connect all six official objectives.

<h3 id="domain-6">Domain 6: Security Assessment and Testing</h3>

This domain asks how an organization selects, performs, and evaluates assessments. Study testing strategies, vulnerability assessments, penetration testing, code review, control testing, process data, audits, analysis, remediation, exceptions, and reporting.

The method should match the purpose and authority. An audit, vulnerability assessment, penetration test, and red-team exercise can all reveal weaknesses, but they differ in scope, independence, depth, rules of engagement, and expected output.

Use the detailed [Security Assessment and Testing guide](/cissp/study-guide/security-assessment-testing/) to connect the five official objectives to planning, evidence, control testing, reporting, remediation, exceptions, and audits.

<h3 id="domain-7">Domain 7: Security Operations</h3>

Security Operations covers investigations, evidence, logging, monitoring, configuration, privileged access, incident management, protective technologies, vulnerability management, change, backup, recovery, disaster recovery, business continuity, physical security, and personnel safety.

Sequence matters. Preserve life and safety, follow approved response procedures, protect evidence, contain harm, communicate appropriately, recover services, and use lessons learned to improve controls.

Use the detailed [Security Operations guide](/cissp/study-guide/security-operations/) to connect investigations, monitoring, configuration, incident management, patching, recovery, continuity, physical safeguards, personnel safety, and AI-assisted operations.

<h3 id="domain-8">Domain 8: Software Development Security</h3>

Software Development Security integrates security into development and acquisition. Topics include development methodologies, maturity models, coding practices, application testing, dependencies, repositories, continuous integration and delivery, acquired software, managed services, and cloud services.

The most effective security work begins with requirements and design. Testing near release remains necessary, but it cannot replace secure architecture, trusted dependencies, controlled change, and lifecycle ownership.

<h2 id="study-plan">A practical CISSP study plan</h2>

Use a plan that reflects your own background rather than giving every topic identical time.

<h3>Phase 1: Build the map</h3>

- Read the complete official outline.
- Mark each objective by confidence and direct experience.
- Identify the two domains with the least practical exposure.
- Note concepts that appear in several domains, such as risk, ownership, lifecycle, least privilege, testing, and resilience.

<h3>Phase 2: Strengthen weak domains</h3>

For each weak objective, create a short explanation that answers:

- What problem does this concept solve?
- Who owns or approves the decision?
- Which requirement or risk drives it?
- What evidence shows it is working?
- What lifecycle event could change the answer?

Use small scenarios. A paragraph that explains a supplier outage, a privacy requirement, or an access review is more useful than a page of disconnected definitions.

<h3>Phase 3: Mix the domains</h3>

CISSP scenarios often cross boundaries. Practice following one situation through several domains:

- A cloud service begins with governance and supplier risk.
- Its data requires classification, ownership, and retention.
- Its architecture needs trust boundaries, encryption, and resilience.
- Its users and services require identity controls.
- Its controls need assessment and monitoring.
- Its incidents and changes require operational processes.
- Its integrations and code require software-development security.

<h3>Phase 4: Practice decision quality</h3>

For every question, state the role and goal before reviewing the answers. After answering, explain why the strongest alternative is weaker. Common reasons include:

- It occurs too early or too late in the process.
- It exceeds the person's authority.
- It solves the technical symptom without addressing the governing requirement.
- It ignores evidence, documentation, legal duties, or business impact.
- It treats risk acceptance as a security-team decision rather than a risk-owner decision.
- It selects a control before requirements and classification are understood.

<h2 id="review-habits">Review habits that improve retention</h2>

Use several forms of recall instead of rereading the same chapter:

- Draw a responsibility map for owners, custodians, users, assessors, risk owners, and leadership.
- Compare two similar terms without looking at notes.
- Explain a control to a technical employee, a business owner, and an executive using different levels of detail.
- Build a lifecycle from acquisition through disposal and place the appropriate security decisions at each stage.
- Review missed questions by clue, not only by topic.
- Revisit weak concepts after several days, then again after several weeks.

A high score in one familiar domain should not hide a serious gap elsewhere. The adaptive exam still draws from all eight domains, and the certification represents broad professional judgment.

<h2 id="official-references">Official references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [ISC2 CISSP certification page](https://www.isc2.org/certifications/cissp)
- [ISC2 computerized adaptive testing guidance](https://www.isc2.org/certifications/computerized-adaptive-testing)
- [ISC2 ethics guidance](https://www.isc2.org/Ethics)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20)
- [NIST Risk Management Framework](https://csrc.nist.gov/pubs/sp/800/37/r2/final)

The official outline defines exam scope. The additional references provide durable context for governance, risk, ethics, and lifecycle decisions. CertHappens is an independent study resource and is not affiliated with or endorsed by ISC2.
