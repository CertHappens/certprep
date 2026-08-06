---
layout: layouts/article.njk
title: Governance, Risk, and Policy Decisions Quick Reference for CISSP
description: Compare governance roles, risk appetite and tolerance, due care and diligence, risk responses, policy hierarchy, control choices, and decision order for CISSP.
permalink: /cissp/quick-review/governance-risk-policy-decisions/
ogType: article
printable: true
printTitle: Governance, Risk, and Policy Decisions Quick Reference for CISSP
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Quick Review
eyebrow: CISSP quick review
lede: Identify who owns the decision, what requirement applies, and how much loss or disruption is acceptable before choosing a control or treatment.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Quick Review
    url: /cissp/quick-review/
  - label: Governance and Risk
    url: /cissp/quick-review/governance-risk-policy-decisions/
toc:
  - id: decision-order
    label: Decision order
  - id: risk-language
    label: Risk language
  - id: appetite-tolerance
    label: Appetite and tolerance
  - id: risk-responses
    label: Risk responses
  - id: care-diligence
    label: Care and diligence
  - id: policy-hierarchy
    label: Policy hierarchy
  - id: roles
    label: Governance roles
  - id: control-decisions
    label: Control decisions
  - id: scenarios
    label: Scenario comparisons
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: official-references
    label: Official references
keywords:
  - CISSP governance
  - CISSP risk appetite
  - CISSP risk tolerance
  - due care and due diligence
  - policy standards procedures guidelines baselines
relatedLinks:
  - title: CISSP Quick Review Guides
    url: /cissp/quick-review/
    description: Browse all focused CISSP comparisons and return to the quick-review hub.
  - title: "Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Continue with ethics, governance, law, policy, continuity, personnel security, threat modeling, supply chains, and awareness.
  - title: "Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Apply ownership, classification, handling, retention, and lifecycle decisions to information and other assets.
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain study roadmap and CISSP decision lens.
---

CISSP governance questions are easier when you do not begin with a product. Begin with authority, requirements, business impact, and the decision the organization needs to make.

A technically effective control can still be the wrong answer when it is unauthorized, does not satisfy the governing requirement, exceeds the organization's acceptable disruption, or skips a required assessment and approval step.

<h2 id="decision-order">Use a governance-first decision order</h2>

1. **Identify the objective or asset.** What business process, information, service, person, or obligation needs protection?
2. **Identify the accountable role.** Who owns the outcome, accepts the remaining exposure, or authorizes the action?
3. **Confirm requirements.** Review law, regulation, contract, policy, classification, architecture, and business commitments.
4. **Describe possible harm.** What loss, injury, disruption, disclosure, corruption, misuse, or missed objective could occur?
5. **Assess the exposure.** Consider likelihood, impact, existing safeguards, uncertainty, and dependencies.
6. **Choose a response.** Avoid, reduce, transfer, share, or accept the exposure under the organization's process.
7. **Select and implement controls.** Choose safeguards that fit the requirement, architecture, cost, usability, and lifecycle.
8. **Document approval and remaining exposure.** The correct owner should understand and accept what remains.
9. **Monitor and improve.** Reassess after incidents, changes, audit findings, supplier events, and shifts in business priorities.

<div class="article-callout">
  <p><strong>CISSP clue:</strong> When an answer jumps directly to implementation, check whether ownership, requirements, assessment, or approval should happen first.</p>
</div>

<h2 id="risk-language">Translate risk language into plain decisions</h2>

<div class="table-scroll" role="region" aria-label="Plain-language risk terms" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Term</th><th scope="col">Plain meaning</th><th scope="col">Question to ask</th></tr></thead>
  <tbody>
    <tr><td data-label="Term"><strong>Asset</strong></td><td data-label="Plain meaning">Something the organization values.</td><td data-label="Question to ask">What could be lost, harmed, exposed, interrupted, or misused?</td></tr>
    <tr><td data-label="Term"><strong>Threat</strong></td><td data-label="Plain meaning">A person, event, condition, or process that could cause harm.</td><td data-label="Question to ask">What could go wrong?</td></tr>
    <tr><td data-label="Term"><strong>Vulnerability</strong></td><td data-label="Plain meaning">A weakness that could be used or triggered.</td><td data-label="Question to ask">What makes the harm possible?</td></tr>
    <tr><td data-label="Term"><strong>Likelihood</strong></td><td data-label="Plain meaning">How probable the harmful event is within the stated conditions and time.</td><td data-label="Question to ask">How likely is this to happen?</td></tr>
    <tr><td data-label="Term"><strong>Impact</strong></td><td data-label="Plain meaning">The size and kind of harm if the event occurs.</td><td data-label="Question to ask">What would the consequences be?</td></tr>
    <tr><td data-label="Term"><strong>Inherent risk</strong></td><td data-label="Plain meaning">The exposure before considering safeguards.</td><td data-label="Question to ask">How serious is the situation without controls?</td></tr>
    <tr><td data-label="Term"><strong>Residual risk</strong></td><td data-label="Plain meaning">The exposure that remains after safeguards are applied.</td><td data-label="Question to ask">What can still go wrong after the controls?</td></tr>
  </tbody>
</table>
</div>

Uncertainty matters. A precise-looking score does not remove incomplete inventories, changing threats, supplier dependencies, human behavior, or assumptions in the method.

<h2 id="appetite-tolerance">Separate risk appetite from risk tolerance</h2>

**Risk appetite** is the amount of possible loss, harm, disruption, or uncertainty an organization is willing to accept while pursuing its goals.

**Risk tolerance** is the limit for how much loss, harm, delay, or disruption is acceptable in one area. For example, an organization may accept some downtime but set a maximum of two hours.

Risk appetite sets the broad boundary. Risk tolerance turns that boundary into measurable limits.

<div class="table-scroll" role="region" aria-label="Risk appetite and tolerance comparison" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Question</th><th scope="col">Better fit</th></tr></thead>
  <tbody>
    <tr><td data-label="Question">How much uncertainty is the organization generally willing to accept while expanding into a new market?</td><td data-label="Better fit">Risk appetite</td></tr>
    <tr><td data-label="Question">What is the maximum acceptable outage for the payment system?</td><td data-label="Better fit">Risk tolerance</td></tr>
    <tr><td data-label="Question">Who may approve an exception beyond the stated limit?</td><td data-label="Better fit">Governance and escalation, not a new tolerance invented by the technical team</td></tr>
  </tbody>
</table>
</div>

<h2 id="risk-responses">Match the response to the decision</h2>

<div class="table-scroll" role="region" aria-label="Risk response choices" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Response</th><th scope="col">What it means</th><th scope="col">Example</th></tr></thead>
  <tbody>
    <tr><td data-label="Response"><strong>Avoid</strong></td><td data-label="What it means">Stop the activity that creates the exposure.</td><td data-label="Example">Do not collect a category of personal data that is not needed.</td></tr>
    <tr><td data-label="Response"><strong>Reduce or mitigate</strong></td><td data-label="What it means">Lower the likelihood or impact with safeguards.</td><td data-label="Example">Add phishing-resistant authentication and stronger recovery controls.</td></tr>
    <tr><td data-label="Response"><strong>Transfer</strong></td><td data-label="What it means">Shift some financial or operational consequence to another party.</td><td data-label="Example">Use insurance or a contract with defined liability and service commitments.</td></tr>
    <tr><td data-label="Response"><strong>Share</strong></td><td data-label="What it means">Divide responsibility or consequences among parties.</td><td data-label="Example">Use a joint service arrangement with documented responsibilities.</td></tr>
    <tr><td data-label="Response"><strong>Accept</strong></td><td data-label="What it means">Proceed while knowingly retaining the remaining exposure.</td><td data-label="Example">An authorized owner accepts a low-impact issue until a planned replacement.</td></tr>
  </tbody>
</table>
</div>

Transferring a financial consequence does not transfer accountability for legal duties, customer trust, safety, or the organization's own decisions. Acceptance also requires the correct authority, documentation, review date, and monitoring.

<h2 id="care-diligence">Separate due care from due diligence</h2>

**Due care** is the responsibility to take reasonable and appropriate steps to protect people, assets, and interests from foreseeable harm. It is demonstrated through the safeguards and decisions an organization actually puts into practice.

**Due diligence** is the ongoing process of investigating, verifying, monitoring, and documenting whether those safeguards remain appropriate and effective. It is demonstrated through assessments, reviews, testing, supplier checks, and corrective actions.

Due care is the protective action. Due diligence is the continuing work used to confirm and maintain that protection.

<h2 id="policy-hierarchy">Use the policy hierarchy correctly</h2>

<div class="table-scroll" role="region" aria-label="Policy hierarchy" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Document</th><th scope="col">Purpose</th><th scope="col">Typical wording</th></tr></thead>
  <tbody>
    <tr><td data-label="Document"><strong>Policy</strong></td><td data-label="Purpose">States management direction and the required outcome.</td><td data-label="Typical wording">The organization protects sensitive information according to classification and legal requirements.</td></tr>
    <tr><td data-label="Document"><strong>Standard</strong></td><td data-label="Purpose">Sets a mandatory and measurable requirement that supports policy.</td><td data-label="Typical wording">Administrative access must use phishing-resistant multifactor authentication.</td></tr>
    <tr><td data-label="Document"><strong>Procedure</strong></td><td data-label="Purpose">Explains the approved steps for completing a task.</td><td data-label="Typical wording">Open the access request, obtain owner approval, provision the role, and record the evidence.</td></tr>
    <tr><td data-label="Document"><strong>Guideline</strong></td><td data-label="Purpose">Provides recommended advice when judgment is allowed.</td><td data-label="Typical wording">Prefer a managed device for access to sensitive services.</td></tr>
    <tr><td data-label="Document"><strong>Baseline</strong></td><td data-label="Purpose">Defines the minimum approved configuration or control set for a class of assets.</td><td data-label="Typical wording">All managed servers use the approved logging, encryption, patching, and account settings.</td></tr>
  </tbody>
</table>
</div>

Policies should remain stable enough to guide decisions through ordinary technology changes. Standards, baselines, and procedures contain more implementation detail and usually change more often.

<h2 id="roles">Match authority to the role</h2>

<div class="table-scroll" role="region" aria-label="Common CISSP governance roles" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Role</th><th scope="col">Typical responsibility</th></tr></thead>
  <tbody>
    <tr><td data-label="Role"><strong>Senior management</strong></td><td data-label="Typical responsibility">Sets direction, provides resources, assigns accountability, and accepts major organizational exposure.</td></tr>
    <tr><td data-label="Role"><strong>Risk owner</strong></td><td data-label="Typical responsibility">Understands a specific exposure and authorizes its treatment or acceptance under the governance process.</td></tr>
    <tr><td data-label="Role"><strong>Data owner</strong></td><td data-label="Typical responsibility">Determines classification, acceptable use, access requirements, and protection expectations for information.</td></tr>
    <tr><td data-label="Role"><strong>System owner</strong></td><td data-label="Typical responsibility">Is accountable for the system's operation, protection, support, and lifecycle decisions.</td></tr>
    <tr><td data-label="Role"><strong>Custodian</strong></td><td data-label="Typical responsibility">Implements and operates safeguards according to owner requirements.</td></tr>
    <tr><td data-label="Role"><strong>User</strong></td><td data-label="Typical responsibility">Uses assets according to approved purpose, training, policy, and access.</td></tr>
    <tr><td data-label="Role"><strong>Assessor or auditor</strong></td><td data-label="Typical responsibility">Evaluates requirements, controls, evidence, and results with the required independence.</td></tr>
  </tbody>
</table>
</div>

Technical staff can recommend, implement, and operate controls. They should not silently accept exposure for an owner or override a policy exception process because a workaround is convenient.

<h2 id="control-decisions">Choose controls after the requirement is clear</h2>

A control should fit:

- The asset and business objective
- Law, regulation, contract, policy, and classification
- The threat and weakness being addressed
- The acceptable loss, downtime, delay, and uncertainty
- Architecture and trust boundaries
- Cost, usability, staffing, and lifecycle support
- Evidence, monitoring, and review requirements

A compensating control is an approved alternative used when the normal requirement cannot be met. It should address the same purpose closely enough, be documented, have an owner, and be reviewed. It is not simply a weaker control chosen because it is easier.

<h2 id="scenarios">Scenario comparisons</h2>

### A vulnerability scan finds an issue on a critical system

The first governance question is not automatically which product to install. Confirm ownership, business impact, exploitation context, existing safeguards, change constraints, and who can authorize treatment or temporary acceptance.

### A supplier promises to meet the organization's recovery target

Verify the commitment in the contract, architecture, testing evidence, dependencies, and escalation process. A statement in sales material is not enough.

### A team wants an exception to a mandatory standard

Use the documented exception process. Identify the requirement, reason, duration, owner, compensating safeguards, remaining exposure, approval authority, monitoring, and expiration date.

### A manager asks security to accept a high-impact issue

Confirm that the manager is the authorized owner for that exposure. Security can explain and document the issue, but acceptance belongs to the role given that authority.

<h2 id="exam-traps">Common exam traps</h2>

- Choosing a product before identifying the requirement and owner.
- Treating risk appetite and risk tolerance as the same level of decision.
- Defining risk acceptance as doing nothing without approval or monitoring.
- Assuming insurance transfers legal or reputational accountability.
- Confusing a policy with the detailed procedure used to implement it.
- Treating a guideline as mandatory or a standard as optional.
- Allowing an administrator to accept exposure owned by the business.
- Calling any alternative control compensating without checking whether it meets the original purpose.
- Treating due diligence as a one-time review.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Rapid review of CISSP governance decisions" tabindex="0">
<table class="mobile-card-table">
  <thead><tr><th scope="col">Decision</th><th scope="col">Best clue</th></tr></thead>
  <tbody>
    <tr><td data-label="Decision">Set the broad amount of uncertainty the organization accepts</td><td data-label="Best clue">Risk appetite</td></tr>
    <tr><td data-label="Decision">Set a measurable limit for one service or objective</td><td data-label="Best clue">Risk tolerance</td></tr>
    <tr><td data-label="Decision">Take reasonable protective action</td><td data-label="Best clue">Due care</td></tr>
    <tr><td data-label="Decision">Continue verifying that safeguards remain suitable</td><td data-label="Best clue">Due diligence</td></tr>
    <tr><td data-label="Decision">State mandatory management direction</td><td data-label="Best clue">Policy</td></tr>
    <tr><td data-label="Decision">Set a measurable mandatory requirement</td><td data-label="Best clue">Standard</td></tr>
    <tr><td data-label="Decision">Describe the steps to perform a task</td><td data-label="Best clue">Procedure</td></tr>
    <tr><td data-label="Decision">Retain remaining exposure knowingly</td><td data-label="Best clue">Acceptance by the authorized owner</td></tr>
  </tbody>
</table>
</div>

<h2 id="official-references">Official references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [ISC2 ethics guidance](https://www.isc2.org/Ethics)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final)
- [NIST SP 800-37 Rev. 2: Risk Management Framework](https://csrc.nist.gov/pubs/sp/800/37/r2/final)
