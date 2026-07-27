---
layout: layouts/article.njk
title: Security Controls Quick Reference for Security+ SY0-701
description: Compare technical, managerial, operational, and physical security controls with preventive, deterrent, detective, corrective, compensating, and directive functions.
permalink: /security-plus/quick-review/security-controls/
ogType: article
printable: true
printTitle: Security Controls Quick Reference for Security+ SY0-701
author: certHappens
datePublished: 2026-07-24
dateModified: 2026-07-27
articleSection: Security+ SY0-701 Quick Review
eyebrow: Security+ quick review
lede: Classify a control by how it is implemented and by the job it performs, then use the scenario to decide which label matters.
breadcrumbs:
  - label: Home
    url: /
  - label: Security+
    url: /security-plus/
  - label: Quick Review
    url: /security-plus/quick-review/
  - label: Security Controls
    url: /security-plus/quick-review/security-controls/
toc:
  - id: two-labels
    label: The two-label model
  - id: control-categories
    label: Control categories
  - id: control-functions
    label: Control functions
  - id: classify-scenario
    label: Classify the scenario
  - id: exam-traps
    label: Common exam traps
  - id: rapid-review
    label: Rapid review grid
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CompTIA Security+
  - SY0-701 security controls
  - security control categories
  - preventive controls
  - detective controls
  - compensating controls
relatedLinks:
  - title: "Security+ Quick Review Guides"
    url: /security-plus/quick-review/
    description: Browse all focused comparisons and return to the quick-review hub.
  - title: "Domain 1: General Security Concepts"
    url: /security-plus/sy0-701/study-guide/general-security-concepts/
    description: Continue with zero trust, change management, cryptography, PKI, and the rest of Domain 1.
  - title: "Security+ acronyms and terms"
    url: /security-plus/acronyms/
    description: Search Security+ abbreviations and related terms with plain-English explanations.
  - title: "Take a randomized SY0-701 practice test"
    url: /security-plus/sy0-701/practice-test/
    description: Apply these distinctions in a fresh 10, 20, 30, or 50-question session.
  - title: "Security+ resource hub"
    url: /security-plus/
    description: Find the current practice tests, study guides, and quick-review resources.
---

Security controls are easier to classify when you answer two separate questions:

1. **How is the control implemented?** That identifies its category.
2. **What is the control intended to accomplish?** That identifies its function.

A firewall rule that blocks prohibited traffic is a **technical** control because software enforces it. Its function is **preventive** because it stops the traffic before it reaches the protected service.

The same control may serve more than one function. A visible camera may discourage an attempt, while its recording helps investigators detect what happened. Use the purpose emphasized by the scenario instead of assigning every control one permanent label.

<h2 id="two-labels">The two-label model</h2>

Security+ objective 1.1 separates controls into implementation categories and security functions.

<div class="table-scroll" role="region" aria-label="Security control classification model" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Question</th>
      <th scope="col">Possible answers</th>
      <th scope="col">What to inspect</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>How is it implemented?</strong></td>
      <td>Technical, managerial, operational, physical</td>
      <td>Technology, governance, a work process, or a facility protection</td>
    </tr>
    <tr>
      <td><strong>What job does it perform?</strong></td>
      <td>Preventive, deterrent, detective, corrective, compensating, directive</td>
      <td>Whether it stops, discourages, discovers, repairs, substitutes, or instructs</td>
    </tr>
  </tbody>
</table>
</div>

When an answer choice mixes a category with a function, slow down and check what the question actually requested. “Technical” and “detective” can both describe the same intrusion detection system, but they answer different questions.

<h2 id="control-categories">Control categories</h2>

### Technical controls

Technical controls use hardware, software, or system configuration to enforce or support security.

Common examples include:

- Firewalls and access control lists
- Multifactor authentication
- Endpoint protection
- Encryption
- Intrusion detection and prevention systems
- Network segmentation
- Logging and monitoring platforms
- Automated account lockout

**Scenario clue:** A device, application, service, or configuration is making the security decision.

### Managerial controls

Managerial controls establish direction, oversight, planning, and risk decisions. They are sometimes called administrative controls in other frameworks.

Common examples include:

- Security policies and standards
- Risk assessments
- Compliance reviews
- Security plans
- Vendor requirements
- Governance committees
- Audit programs
- Defined roles and responsibilities

**Scenario clue:** Leadership, governance, risk ownership, policy, or oversight is the focus.

### Operational controls

Operational controls depend on people and repeatable processes used during security work.

Common examples include:

- Security awareness activities
- Account and access reviews
- Incident response procedures
- Backup operations
- Media handling
- Change implementation
- Vulnerability remediation work
- Security patrols and routine inspections

**Scenario clue:** A person or team is carrying out a security process.

### Physical controls

Physical controls protect facilities, equipment, and physical access.

Common examples include:

- Locks and doors
- Fences and gates
- Bollards
- Security guards
- Lighting
- Cameras
- Access control vestibules
- Motion, pressure, infrared, microwave, and ultrasonic sensors

**Scenario clue:** The control affects entry, movement, facilities, equipment, or the physical environment.

A single security program often uses all four categories. A written visitor policy is managerial. Reception staff following the check-in procedure are operational. An electronic system validating a badge is technical. The locked entrance and barriers are physical.

<h2 id="control-functions">Control functions</h2>

<div class="table-scroll" role="region" aria-label="Security control functions" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Function</th>
      <th scope="col">Main purpose</th>
      <th scope="col">Useful question</th>
      <th scope="col">Common examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Preventive</strong></td>
      <td>Stops or blocks an unwanted action</td>
      <td>Does it keep the event from succeeding?</td>
      <td>Firewall deny rule, least privilege, multifactor authentication, locked door</td>
    </tr>
    <tr>
      <td><strong>Deterrent</strong></td>
      <td>Discourages someone from attempting the action</td>
      <td>Does it make the attempt seem risky or unattractive?</td>
      <td>Visible guards, surveillance signs, warning banners, prominent cameras</td>
    </tr>
    <tr>
      <td><strong>Detective</strong></td>
      <td>Finds, records, or reports activity</td>
      <td>Does it reveal that something occurred or is occurring?</td>
      <td>IDS alert, log review, audit trail, camera recording</td>
    </tr>
    <tr>
      <td><strong>Corrective</strong></td>
      <td>Limits damage or restores a secure state after a problem</td>
      <td>Does it repair, contain, or recover?</td>
      <td>Reimaging a compromised device, restoring a backup, revoking exposed credentials</td>
    </tr>
    <tr>
      <td><strong>Compensating</strong></td>
      <td>Supplies alternate protection when the preferred control cannot be used</td>
      <td>Is this a substitute for an unavailable requirement?</td>
      <td>Segmenting a legacy system that cannot support MFA, adding manual approval when automation is unavailable</td>
    </tr>
    <tr>
      <td><strong>Directive</strong></td>
      <td>Establishes required behavior or tells people what to do</td>
      <td>Does it state an instruction, rule, or expected action?</td>
      <td>Policy, procedure, mandatory standard, posted instruction</td>
    </tr>
  </tbody>
</table>
</div>

### Preventive versus deterrent

A preventive control attempts to stop the event. A deterrent control tries to reduce the chance that someone will attempt it.

A locked server-room door is preventive when it blocks entry. A visible sign announcing surveillance is deterrent when it is meant to discourage trespassing. Deterrence can be useful, but it does not guarantee that the action cannot occur.

### Detective versus corrective

A detective control reveals the problem. A corrective control responds to the problem or restores the environment.

An alert showing malware execution is detective. Isolating the affected device, removing the malware, and restoring a known-good image are corrective actions.

### Compensating versus corrective

These terms are easy to confuse because both respond to a limitation or problem.

- **Corrective** addresses damage, a weakness, or an insecure condition.
- **Compensating** replaces a preferred control that cannot be implemented.

Network isolation around an old device that cannot support modern authentication is compensating. Rebuilding that device after compromise is corrective.

### Directive versus deterrent

A directive control tells people what is required. A deterrent control tries to discourage misconduct.

A policy that requires visitors to wear badges is directive. A sign warning that an area is monitored may be deterrent. Some controls can support both purposes, so use the outcome described in the question.

<h2 id="classify-scenario">Classify the scenario</h2>

The wording around a control often matters more than the name of the control.

<div class="table-scroll" role="region" aria-label="Security control scenario classifications" tabindex="0">
<table class="scenario-classification-table">
  <thead>
    <tr>
      <th scope="col">Scenario</th>
      <th scope="col">Category</th>
      <th scope="col">Function</th>
      <th scope="col">Why</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A remote-access service requires a password and security key before connecting.</td>
      <td>Technical</td>
      <td>Preventive</td>
      <td>The service enforces the requirement before access is granted.</td>
    </tr>
    <tr>
      <td>A SIEM alerts on repeated failed logins from many locations.</td>
      <td>Technical</td>
      <td>Detective</td>
      <td>The platform identifies and reports suspicious activity.</td>
    </tr>
    <tr>
      <td>A highly visible guard is stationed near the entrance to discourage trespassing.</td>
      <td>Physical</td>
      <td>Deterrent</td>
      <td>The stated goal is to discourage the attempt.</td>
    </tr>
    <tr>
      <td>A guard checks identification and refuses entry to an unauthorized visitor.</td>
      <td>Physical</td>
      <td>Preventive</td>
      <td>The guard blocks unauthorized physical access.</td>
    </tr>
    <tr>
      <td>A policy requires managers to review privileged access every quarter.</td>
      <td>Managerial</td>
      <td>Directive</td>
      <td>The policy establishes a required action.</td>
    </tr>
    <tr>
      <td>Administrators perform the quarterly review and identify stale accounts.</td>
      <td>Operational</td>
      <td>Detective</td>
      <td>People carry out the process and discover inappropriate access.</td>
    </tr>
    <tr>
      <td>The administrators disable the stale accounts found during the review.</td>
      <td>Operational</td>
      <td>Corrective</td>
      <td>The team removes the insecure access after finding it.</td>
    </tr>
    <tr>
      <td>A legacy controller cannot use MFA, so it is isolated on a tightly restricted network segment.</td>
      <td>Technical</td>
      <td>Compensating</td>
      <td>Segmentation provides alternate protection for a missing preferred control.</td>
    </tr>
    <tr>
      <td>An incident responder restores a compromised workstation from a known-good image.</td>
      <td>Operational</td>
      <td>Corrective</td>
      <td>A person follows the recovery process to restore a secure state.</td>
    </tr>
    <tr>
      <td>A login screen displays required-use rules that users must acknowledge.</td>
      <td>Technical</td>
      <td>Directive</td>
      <td>The system presents mandatory instructions before use.</td>
    </tr>
  </tbody>
</table>
</div>

### One control, several possible functions

**Camera**

- Deterrent when its visibility is meant to discourage an attempt
- Detective when someone monitors the feed or reviews the recording

**Security guard**

- Deterrent through visible presence
- Preventive when blocking unauthorized entry
- Detective when observing and reporting suspicious behavior

**Account lockout**

- Preventive when it stops continued password guessing
- Detective only when the associated alert or review reveals the attack

**Patching**

- Corrective when it remediates an identified vulnerability
- Preventive after deployment because the vulnerability can no longer be exploited in the same way

Questions usually provide enough context to select the function being tested. Read the verb and the intended outcome.

<h2 id="exam-traps">Common exam traps</h2>

### Answering with a category when the question asks for a function

Technical, managerial, operational, and physical describe implementation. Preventive, deterrent, detective, corrective, compensating, and directive describe purpose.

Circle the requested dimension before comparing the answers.

### Classifying a control by its name alone

A camera is not automatically detective. A guard is not automatically preventive. The scenario determines whether the control is discouraging, blocking, discovering, or responding.

### Treating a compensating control as a weaker corrective control

A compensating control is an alternate safeguard selected because the preferred control is unavailable or impractical. It should still reduce the relevant risk to an acceptable level.

### Assuming detection also stops the event

An IDS can identify suspicious traffic without blocking it. An IPS can detect and take preventive action. Pay attention to whether the control only alerts or also enforces.

### Confusing a required rule with a warning

A directive says what must be done. A deterrent makes misconduct less appealing. A message can serve either purpose, but the question will normally emphasize one.

### Ignoring the people and process layer

Technology may generate an alert, but analysts triaging it are performing an operational control. A policy may require access reviews, but the employees conducting the review are carrying out an operational process.

<h2 id="rapid-review">Rapid review grid</h2>

<div class="table-scroll" role="region" aria-label="Security controls rapid review" tabindex="0">
<table>
  <thead>
    <tr>
      <th scope="col">Label</th>
      <th scope="col">Fast memory cue</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Technical</td><td>Technology enforces or supports security</td></tr>
    <tr><td>Managerial</td><td>Governance, risk, policy, and oversight</td></tr>
    <tr><td>Operational</td><td>People perform a repeatable security process</td></tr>
    <tr><td>Physical</td><td>Facilities, equipment, and physical access</td></tr>
    <tr><td>Preventive</td><td>Stop</td></tr>
    <tr><td>Deterrent</td><td>Discourage</td></tr>
    <tr><td>Detective</td><td>Discover</td></tr>
    <tr><td>Corrective</td><td>Contain, repair, or recover</td></tr>
    <tr><td>Compensating</td><td>Substitute</td></tr>
    <tr><td>Directive</td><td>Instruct</td></tr>
  </tbody>
</table>
</div>

A useful exam shortcut is to build the classification in one sentence:

> This is a **[category]** control because of how it is implemented, and it is **[function]** because of the result described.

For example: “This is a technical control because the identity platform enforces it, and it is preventive because access is blocked until MFA succeeds.”

<h2 id="review-checklist">Review checklist</h2>

Before moving on, confirm that you can:

- Name the four control categories and explain what separates them.
- Name the six control functions without mixing them with the categories.
- Classify one control using both a category and a function.
- Explain why a camera or guard can serve different functions.
- Separate preventive controls from deterrent controls.
- Separate detective controls from corrective controls.
- Recognize a compensating control as an alternate safeguard.
- Distinguish a directive requirement from a deterrent warning.
- Use the scenario’s purpose and timing instead of relying only on the control’s name.

For the broader Domain 1 material, continue with the [General Security Concepts guide](/security-plus/sy0-701/study-guide/general-security-concepts/).

<h2 id="official-references">Official references</h2>

Security control categories and functions appear in CompTIA Security+ SY0-701 objective 1.1. Use the official objectives as the authoritative checklist for the exam version.

- [CompTIA Security+ certification page](https://www.comptia.org/certifications/security)
- [CompTIA Security+ SY0-701 exam objectives PDF](https://www.comptia.jp/pdf/CompTIA%20Security%2B%20SY0-701%20Exam%20Objectives.pdf)
