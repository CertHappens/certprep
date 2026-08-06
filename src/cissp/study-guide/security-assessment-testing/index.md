---
layout: layouts/article.njk
title: "CISSP Domain 6: Security Assessment and Testing"
description: Study CISSP Domain 6 with plain-language guidance on assessment strategy, control testing, vulnerability assessment, penetration testing, process data, reporting, remediation, exceptions, audits, and AI red teaming.
permalink: /cissp/study-guide/security-assessment-testing/
ogType: article
printable: true
printTitle: "CISSP Domain 6: Security Assessment and Testing"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 6
eyebrow: CISSP Domain 6 guide
lede: Plan assessments around a clear purpose, collect evidence that can support a decision, test controls safely, report what the results mean, and follow findings through remediation or approved exception.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Security Assessment and Testing
    url: /cissp/study-guide/security-assessment-testing/
toc:
  - id: domain-map
    label: Domain 6 map
  - id: decision-order
    label: Decision order
  - id: strategy-scope
    label: Strategy and scope
  - id: independence-evidence
    label: Independence and evidence
  - id: vulnerability-assessment
    label: Vulnerability assessment
  - id: penetration-teams
    label: Penetration and team exercises
  - id: logs-synthetic-benchmarks
    label: Logs and synthetic tests
  - id: code-misuse-interfaces
    label: Code and interface testing
  - id: breach-compliance
    label: Breach simulation and compliance
  - id: process-data
    label: Security process data
  - id: metrics-indicators
    label: Metrics and indicators
  - id: analyze-output
    label: Analyze test output
  - id: reporting
    label: Reporting
  - id: remediation-exceptions
    label: Remediation and exceptions
  - id: audits
    label: Security audits
  - id: ai-testing
    label: AI assessment and testing
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 6
  - Security Assessment and Testing
  - vulnerability assessment
  - penetration testing
  - security control testing
  - security audits
  - assessment reporting
  - AI red teaming
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Connect assessment authority, criteria, risk decisions, governance, and exception approval to the testing process.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Use classification, ownership, handling, and retention requirements to decide what evidence and protection an assessment needs.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Connect architecture assumptions, design requirements, control selection, and verification to assessment results.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Apply testing to network architecture, secure protocols, segmentation, monitoring, remote access, and third-party connections.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Test identity proofing, authentication, authorization, privileged access, account reviews, and service-account controls.
  - title: "CISSP Domain 7: Security Operations"
    url: /cissp/study-guide/security-operations/
    description: Apply investigations, logging, monitoring, incident response, configuration, patching, recovery, continuity, physical safeguards, and personnel safety.
  - title: "CISSP Domain 8: Software Development Security"
    url: /cissp/study-guide/software-development-security/
    description: Apply code review, application testing, evidence, reporting, remediation, exceptions, and retesting throughout software delivery.
  - title: Security+ Security Operations Guide
    url: /security-plus/sy0-701/study-guide/security-operations/
    description: Refresh vulnerability management, monitoring, incident response, and operational evidence before applying the CISSP perspective.
---
Domain 6 accounts for 12 percent of the current CISSP exam outline. It asks whether an organization can **plan a useful assessment, test controls safely, collect trustworthy evidence, explain the results, and make sure findings lead to action**.

A scan result, penetration-test finding, audit observation, or dashboard number has little value by itself. The organization needs to know what requirement was tested, what was inside and outside the scope, how reliable the evidence is, who owns the finding, and what happens next.

The strongest answer usually begins with purpose and authority. Choose the assessment method only after the objective, criteria, scope, system impact, evidence needs, and reporting audience are clear.

<h2 id="domain-map">1. Map the Domain 6 objectives</h2>

The official outline divides Security Assessment and Testing into five objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 6 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>6.1</td><td>Assessment, test, and audit strategy</td><td>What decision must the work support, who should perform it, where will it occur, and which criteria define success?</td></tr>
      <tr><td>6.2</td><td>Security control testing</td><td>Which method can show whether the control exists, works as intended, and produces the expected result?</td></tr>
      <tr><td>6.3</td><td>Security process data</td><td>Which technical and administrative records show whether security work is happening consistently?</td></tr>
      <tr><td>6.4</td><td>Analysis and reporting</td><td>What do the results mean, which actions have priority, and how will remediation, exceptions, and disclosure be handled?</td></tr>
      <tr><td>6.5</td><td>Security audits</td><td>Which criteria, evidence, independence, location, and reporting obligations apply to the audit?</td></tr>
    </tbody>
  </table>
</div>

These objectives form one evidence cycle: define the purpose, select the method, collect results, analyze what they mean, report them to the correct audience, and verify that the response was completed.

<h2 id="decision-order">2. Use the right decision order</h2>

Do not begin with a preferred tool. A vulnerability scanner, penetration-testing platform, compliance checklist, or audit template can support the work, but none of them defines the reason for the assessment.

A practical decision sequence is:

1. **Identify the decision.** Determine whether leadership needs assurance, a system owner needs a control check, engineers need a weakness confirmed, or an auditor needs evidence against stated criteria.
2. **Identify authority and ownership.** Confirm who authorizes the work, who owns the system and data, who can accept possible disruption, and who receives the results.
3. **Define the criteria.** State the policy, contract, regulation, standard, baseline, control objective, architecture requirement, or test expectation used to judge the evidence.
4. **Set the scope and boundaries.** List systems, interfaces, locations, accounts, suppliers, data, time periods, and exclusions.
5. **Choose the method and assessor.** Match the technique, independence, competence, and access level to the purpose.
6. **Plan safety and communication.** Define rules of engagement, test windows, backups, stop conditions, escalation paths, data handling, and emergency contacts.
7. **Collect and protect evidence.** Preserve enough context to support the result without exposing more sensitive information than necessary.
8. **Analyze limitations and impact.** Validate findings, explain uncertainty, connect weaknesses to assets and business effects, and distinguish severity from response priority.
9. **Assign action and accountability.** Name the owner, treatment, due date, approval path, and retest requirement.
10. **Close the loop.** Verify remediation, document an approved exception, or escalate an overdue or unacceptable condition.

When a question asks what should happen **first**, establish the purpose, authority, and scope before selecting a test. When it asks for the **best evidence**, choose information that directly supports the stated control objective and can be traced to a reliable source.

<h2 id="strategy-scope">3. Design an assessment strategy around its purpose and scope</h2>

The words assessment, test, audit, and monitoring are related, but they do not mean the same thing.

<div class="table-scroll" role="region" aria-label="Assessment test audit and monitoring comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Activity</th><th scope="col">Plain purpose</th><th scope="col">Typical output</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Activity">Assessment</td><td data-label="Plain purpose">Collects and evaluates evidence to determine whether requirements or control objectives are being met.</td><td data-label="Typical output">Findings, strengths, weaknesses, confidence, limitations, and recommended actions.</td></tr>
      <tr><td data-label="Activity">Test</td><td data-label="Plain purpose">Exercises a control, process, component, or system behavior to observe what actually happens.</td><td data-label="Typical output">Measured results, pass or fail conditions, defects, unexpected behavior, and supporting evidence.</td></tr>
      <tr><td data-label="Activity">Audit</td><td data-label="Plain purpose">Examines evidence against defined criteria and usually requires documented independence, methods, and formal reporting.</td><td data-label="Typical output">Audit observations, conclusions, nonconformities, management responses, and follow-up requirements.</td></tr>
      <tr><td data-label="Activity">Continuous monitoring</td><td data-label="Plain purpose">Collects information over time so the organization can see changes in assets, threats, weaknesses, and control performance.</td><td data-label="Typical output">Trends, alerts, indicators, dashboards, and evidence for ongoing decisions.</td></tr>
    </tbody>
  </table>
</div>

The strategy should define:

- The business and security purpose
- The control objectives and success criteria
- Systems, locations, interfaces, identities, suppliers, and data in scope
- Explicit exclusions and assumptions
- Whether the work is internal, external, or third-party
- Whether it occurs on premises, in cloud services, or across a hybrid environment
- Required assessor skills and independence
- Methods, tools, accounts, and access levels
- Rules of engagement and prohibited actions
- Test windows, backups, stop conditions, and restoration plans
- Evidence collection, storage, retention, and destruction
- Communication and escalation paths
- Reporting audiences, classification, and distribution
- Remediation, exception, and retest expectations

**Internal work** is performed within the organization's control. It can provide speed, context, and frequent feedback. It may also face conflicts if the assessor designed or operates the control being reviewed.

**External work** is performed from outside the organization or outside the tested system's normal trust boundary. An external perspective can reveal exposed services, supplier paths, and assumptions that internal testing misses.

**Third-party work** is performed by another organization. A third party may provide specialized skill or greater independence, but the contract still needs clear scope, evidence handling, confidentiality, competence, liability, and reporting requirements.

Location changes the evidence. On-premises systems may allow direct observation and physical access. Cloud and managed services may limit testing methods, expose only provider reports, or require approval under the provider's testing policy. Hybrid assessments must follow identities, data, and dependencies across those boundaries.

<h2 id="independence-evidence">4. Match independence and evidence quality to the decision</h2>

**Independence** means the assessor can reach and report a conclusion without improper pressure from the people responsible for the work being examined. It does not always require an outside company. An internal audit or assessment team can be independent when reporting lines, authority, objectivity, and conflicts are managed.

A third party is not automatically independent. A supplier assessing its own service, a consultant reviewing a design it created, or a tester paid only when a target result is reached may have a conflict that needs disclosure and control.

Assessor **competence** also matters. Independence without the required technical, legal, audit, privacy, cloud, or operational knowledge can produce weak conclusions.

Useful evidence is:

- **Relevant:** It directly supports the control objective or requirement being examined.
- **Reliable:** Its source, collection method, and integrity make it reasonable to trust.
- **Sufficient:** There is enough evidence to support the conclusion without relying on one convenient example.
- **Traceable:** Another reviewer can connect the conclusion to the source, time, system, method, and scope.
- **Repeatable where practical:** A qualified person using the same method can obtain a comparable result.
- **Protected:** Sensitive logs, credentials, screenshots, code, records, and exploit details are handled according to classification and need to know.

Evidence may come from examination, interview, observation, or testing. A policy proves that a requirement was written. It does not prove that the control was implemented. A screenshot shows one state at one time. It may not prove that the state is complete, current, or consistently enforced.

**Sampling** examines part of a larger population. It can reduce effort, but the sample must match the question being asked. A convenient sample of successful records can hide failed transactions, inactive accounts, remote locations, privileged users, or unusual time periods. Document the population, selection method, sample size, and limitations.

Production testing requires special care. Use authorized windows, known contacts, backups, stop conditions, and recovery plans. A technically useful test is not acceptable if it creates uncontrolled harm, violates a provider policy, exposes protected data, or exceeds the approved rules of engagement.

<h2 id="vulnerability-assessment">5. Use vulnerability assessments to find and prioritize likely weaknesses</h2>

A **vulnerability assessment** looks for conditions that could be exploited or that fail to meet a security requirement. Its purpose is to identify and prioritize likely weaknesses, not necessarily to prove that each weakness can be used in a real attack.

Common inputs include:

- Asset and software inventories
- Authenticated and unauthenticated scans
- Configuration and compliance checks
- Missing-patch and unsupported-product data
- Cloud, container, and application findings
- Supplier advisories and threat intelligence
- Architecture and exposure information
- Previous findings and accepted exceptions

An **authenticated scan** uses approved credentials or an agent to inspect internal configuration, software, permissions, and patch state. It usually sees more than an unauthenticated scan. An **unauthenticated scan** shows what a user or attacker can observe without trusted access. Both perspectives can be useful.

**Active testing** sends traffic or requests to the target. It can provide direct evidence but may affect performance or state. **Passive testing** observes existing traffic, logs, or configuration data without probing the target. It reduces disruption but may miss conditions that do not appear in the observed activity.

Scanner output needs validation:

- A **false positive** reports a weakness that is not actually present or exploitable under the stated conditions.
- A **false negative** fails to report a weakness that is present.
- A duplicate finding may describe the same root cause on several assets.
- A technically severe weakness may have lower response priority if the asset is isolated, while a moderate weakness on an exposed critical service may require faster action.

Prioritization should consider asset importance, exposure, exploitability, available attack paths, active exploitation, control layers, business impact, legal duties, and remediation effort. A scanner score is an input, not the entire decision.

<h2 id="penetration-teams">6. Use penetration testing and team exercises to show attack paths and defensive performance</h2>

A **penetration test** is an authorized attempt to exploit selected weaknesses within agreed boundaries. It can show whether separate findings combine into a practical attack path and what impact successful exploitation could have.

The rules of engagement should define:

- Authorized targets, identities, locations, and time periods
- Allowed and prohibited techniques
- Whether social engineering, physical access, persistence, or data access is permitted
- Data that may be viewed, copied, changed, or simulated
- Safety limits and stop conditions
- Communication, escalation, and emergency contacts
- Evidence handling and cleanup
- Reporting and retest expectations

Knowledge levels are often described as:

- **Black-box testing:** The tester begins with little or no internal information.
- **Gray-box testing:** The tester receives limited knowledge or access, such as an ordinary user account.
- **White-box testing:** The tester receives detailed architecture, code, credentials, or configuration information.

These approaches answer different questions. Black-box testing can show what an outsider discovers. White-box testing can provide deeper coverage with less time spent guessing. One is not automatically more realistic or more valuable than the others.

Team exercises have different purposes:

- A **red team** is authorized to act like an adversary and pursue defined objectives across technology, people, and processes.
- A **blue team** detects, investigates, contains, and responds to the simulated activity.
- A **purple team** brings offensive and defensive participants together to share techniques, improve detections, and verify defensive changes.

A red-team exercise is broader than a vulnerability scan and may be broader than a penetration test. Its value comes from showing how the organization detects and responds to a realistic objective, not from collecting the largest number of findings.

<h2 id="logs-synthetic-benchmarks">7. Review logs and use synthetic transactions and benchmarks</h2>

A **log review** examines recorded activity to determine whether events were captured, protected, retained, correlated, and acted upon. Useful review questions include:

- Are important systems, identities, applications, and cloud services sending the required events?
- Are clocks synchronized well enough to reconstruct activity?
- Are event fields complete and understandable?
- Can administrators or attackers alter the records without detection?
- Are alerts tied to response procedures and named owners?
- Are retention and access rules appropriate for investigations, privacy, contracts, and operations?
- Are high-volume or noisy sources hiding important activity?

A **synthetic transaction** is a scripted action that imitates a real user or system workflow. For example, a monitoring service may sign in, submit a harmless request, query a database, and confirm that the expected response arrives. This can test availability, performance, authentication, authorization, logging, and end-to-end dependencies without waiting for a real user to report a failure.

A **benchmark** is a known point of comparison. It may be a secure configuration baseline, performance target, expected response time, control objective, or industry requirement. A benchmark makes the result easier to interpret, but the organization must confirm that the benchmark fits the system, purpose, and environment.

A system can meet a benchmark and still be insecure if important threats or business requirements are outside the benchmark. It can also differ from a benchmark for a valid reason. Document approved tailoring and exceptions rather than silently treating every difference as either harmless or a failure.

<h2 id="code-misuse-interfaces">8. Test code, misuse paths, coverage, and interfaces</h2>

**Code review and testing** examine whether software implements security requirements and avoids weaknesses. Manual review can understand business logic and design intent. Automated analysis can inspect larger amounts of code consistently. Dynamic testing can show how the running application responds. No single method provides complete coverage.

A **misuse case** describes how a user, attacker, service, or automated process could abuse a feature or take an unintended path. It asks what should be prevented, detected, limited, or recorded when someone uses the system incorrectly or maliciously.

Examples include:

- Reusing a password-reset link
- Changing an object identifier to reach another user's record
- Submitting values outside the expected range
- Calling steps in the wrong order
- Using an approved feature to extract too much information
- Bypassing a user interface and calling the application programming interface directly
- Asking an automated agent to perform an action outside the user's authority

**Coverage analysis** asks what the testing actually reached. Coverage may refer to requirements, controls, code paths, functions, interfaces, assets, threats, attack techniques, roles, locations, or configurations. A high test count does not prove broad coverage if the tests repeat the same path.

Interface testing examines boundaries where assumptions often fail:

- **User interface:** Input handling, error messages, session behavior, workflow, and access decisions
- **Network interface:** Protocol handling, exposed services, filtering, encryption, failure behavior, and malformed traffic
- **Application programming interface:** Authentication, authorization, object access, rate limits, input validation, versioning, and error handling

Test both normal and negative conditions. Confirm what happens when required data is missing, permissions are insufficient, dependencies fail, input is malformed, traffic is delayed, or the same request is repeated.

<h2 id="breach-compliance">9. Distinguish breach and attack simulation from compliance checks</h2>

A **breach and attack simulation (BAS)** platform safely runs selected attack behaviors to test whether preventive and detective controls respond as expected. It can provide repeatable checks across endpoints, networks, email, cloud services, and security monitoring.

BAS is not the same as a full red-team exercise. Automation can repeat known techniques and verify controls frequently. A human red team can adapt, combine unexpected paths, exploit organizational behavior, and pursue a broader objective.

A **compliance check** compares evidence with a stated requirement, such as a policy, contract, regulation, secure baseline, or control framework. Compliance matters, but it does not prove that every relevant threat is controlled or that the system will resist a skilled attacker.

Keep the distinction clear:

- Compliance asks whether defined requirements were met.
- Security testing asks what the system or control actually does under selected conditions.
- Assurance depends on the quality, scope, independence, and limits of the evidence.

A requirement may also be outdated, incomplete, or poorly tailored. Report the compliance result accurately, then identify additional security concerns through the appropriate governance path.

<h2 id="process-data">10. Collect technical and administrative security process data</h2>

Control testing examines more than devices and software. Administrative records can show whether security processes are approved, repeatable, reviewed, and completed.

Domain 6 specifically includes:

### Account management

Review account requests, approvals, provisioning, role changes, access reviews, privileged elevation, inactivity, termination, service-account ownership, and removal. A directory export alone does not prove that each account was approved or still needed.

### Management review and approval

Look for evidence that the correct owner reviewed the information, understood the decision, and approved or rejected it. A checkbox from an uninformed reviewer provides weak assurance.

### Key performance and risk indicators

Use measures that connect to a decision. Count data can be useful, but it needs a target, trend, owner, and context.

### Backup verification data

A successful backup job shows that data was copied. It does not prove that the correct data can be restored within required time and data-loss limits. Review restoration tests, integrity checks, failure handling, protected copies, and coverage of critical dependencies.

### Training and awareness

Completion rates show participation. They do not prove that behavior changed. Use phishing exercises, incident reports, observation, surveys, knowledge checks, and trend data carefully, while avoiding measures that encourage hiding mistakes.

### Disaster recovery and business continuity

Review plans, contact information, dependencies, recovery priorities, exercise results, restoration evidence, communications, lessons learned, and corrective actions. A plan that has not been exercised provides limited confidence.

<h2 id="metrics-indicators">11. Use metrics and indicators that support decisions</h2>

A **Key Performance Indicator (KPI)** shows how well a process or control is meeting a stated target. Examples include the percentage of critical patches completed within the approved time, the percentage of privileged accounts reviewed on schedule, or the time needed to restore a service during an exercise.

A **Key Risk Indicator (KRI)** signals that possible loss, harm, delay, or disruption may be increasing. Examples include growing numbers of unsupported systems, repeated backup failures, rising privileged-access exceptions, or a larger share of critical suppliers without current assessments.

A useful summary is:

> KPIs show whether the work is meeting its target. KRIs warn that exposure to harm may be increasing.

Indicators may be:

- **Leading:** Show conditions that may predict a future problem, such as overdue patches or declining backup success.
- **Lagging:** Show an event or result that already happened, such as incidents, outages, or confirmed data loss.

Good measures are tied to an owner, purpose, target, data source, collection method, review frequency, and action threshold. They should be difficult to manipulate and should not reward the wrong behavior.

Examples of misleading measures include:

- Counting closed findings without checking whether the weakness was actually fixed
- Rewarding low incident numbers when staff may be discouraged from reporting
- Reporting average patch time while a small group of critical systems remains overdue
- Counting training completion without measuring understanding or behavior
- Showing scanner findings without asset context or validation

Use trends and distributions rather than one isolated number. Explain missing data, changes in collection methods, and known limitations.

<h2 id="analyze-output">12. Analyze test output before assigning meaning</h2>

Raw output needs context and validation. Before assigning severity or recommending action:

1. Confirm that the finding belongs to the correct asset, version, environment, identity, and time period.
2. Validate the evidence and remove false positives, duplicates, and obsolete results.
3. Determine the affected requirement, control objective, trust boundary, and business process.
4. Consider exploitation conditions, exposure, existing control layers, and possible impact.
5. Look for a shared root cause, such as weak configuration management, unclear ownership, incomplete inventory, or a faulty deployment process.
6. Distinguish technical severity from organizational priority.
7. Record assumptions, uncertainty, and areas the assessment did not cover.

**Severity** describes the potential effect and technical characteristics of a weakness. **Priority** describes when the organization should act after considering severity, asset importance, exposure, active threats, legal duties, dependencies, compensating controls, and operational constraints.

A single finding may be less important than a repeated pattern. Ten systems with the same insecure setting may point to a broken baseline or deployment process. Fixing only the ten visible instances leaves the source of the problem in place.

Do not hide limitations. A report should state whether testing was authenticated, whether production disruption limited techniques, whether a cloud provider restricted access, whether the sample was small, or whether some logs were missing.

<h2 id="reporting">13. Report results for the people who must act</h2>

A report should help the audience make a decision. Executives, system owners, engineers, auditors, legal counsel, and suppliers may need different detail, but the underlying evidence and conclusions should remain consistent.

A useful report includes:

- Purpose, authority, and audience
- Scope, exclusions, assumptions, and time period
- Criteria and control objectives
- Methods, tools, access level, and assessor independence
- Safety limits and other testing constraints
- Executive summary in business language
- Findings with evidence and affected assets
- Possible business, legal, privacy, safety, and operational effects
- Severity, priority, and rationale
- Recommended treatment and responsible owner
- Target dates, dependencies, and retest requirements
- Approved exceptions and remaining exposure
- Assessment limitations and confidence
- Distribution, classification, retention, and handling requirements

A finding should explain the condition, expected requirement, evidence, possible effect, and recommended next action. Avoid copying raw scanner text without context.

Use precise language. State what the evidence supports rather than claiming that a limited assessment proved the entire environment is secure. A clean test result means the selected methods did not find a problem within the tested scope and time. It does not prove that no problem exists.

<h2 id="remediation-exceptions">14. Track remediation, exceptions, and ethical disclosure</h2>

**Remediation** removes or corrects the cause of a weakness. **Mitigation** reduces the likelihood or effect when immediate full correction is not practical. Both need an owner, due date, verification method, and understanding of remaining exposure.

A finding is not closed because someone changed a status field. Closure should require evidence that the agreed action was completed and, when appropriate, a retest showing that the control now works.

An **exception** is a documented, approved departure from a requirement. A sound exception includes:

- The requirement and affected assets
- Business reason and accountable owner
- Possible loss, harm, or disruption being accepted
- Compensating or temporary controls
- Approval from the person with authority to accept the condition
- Start and expiration dates
- Review triggers and planned resolution

Exceptions should be time-limited and visible. Repeated renewals may show that the organization is avoiding a needed decision or investment.

**Ethical disclosure** means reporting a discovered weakness through an authorized and responsible path. Follow contracts, laws, rules of engagement, confidentiality duties, and coordinated disclosure procedures. Do not publicly release sensitive details, retain unnecessary data, or continue testing after authority ends.

If a test uncovers immediate danger, active compromise, or data exposure, use the defined escalation path rather than waiting for the final report.

<h2 id="audits">15. Conduct or facilitate security audits</h2>

A security audit examines evidence against defined criteria and communicates a formal conclusion or set of observations. The audit may be:

- **Internal:** Performed within the organization, often by internal audit or another independent function
- **External:** Performed by a regulator, customer, certification body, or outside auditor
- **Third-party focused:** Examines a supplier, provider, partner, or service relationship

The environment may be on premises, in cloud services, or hybrid. Cloud audits often rely on shared-responsibility boundaries, provider reports, contracts, customer-controlled configuration, and evidence from several parties.

Before the audit:

- Confirm objectives, criteria, scope, authority, independence, and competence.
- Identify owners, evidence sources, systems, locations, suppliers, and contacts.
- Protect legal privilege, confidentiality, personal information, and sensitive technical details as required.
- Prepare evidence without altering or manufacturing it to fit the expected result.

During the audit:

- Provide complete, accurate, traceable evidence.
- Explain context and approved tailoring.
- Record requests, samples, interviews, observations, and limitations.
- Escalate disputes through the agreed process rather than hiding evidence.

After the audit:

- Review findings for factual accuracy without pressuring the auditor to weaken valid conclusions.
- Assign management responses, owners, due dates, and corrective actions.
- Track exceptions and overdue items.
- Provide follow-up evidence and support retesting or closure review.

Audit preparation should improve the control environment, not create a temporary display that disappears after the auditor leaves.

<h2 id="ai-testing">16. Assess and test AI systems and AI-assisted security tools</h2>

AI assessment must test more than ordinary software defects. It should examine how the system behaves when inputs are misleading, manipulated, unusual, or designed to extract protected information or capabilities.

**AI red teaming** is structured adversarial testing used to find weaknesses, unsafe behavior, and ways an AI system could be misused. Depending on the system, testing may include:

- Prompt injection and instruction conflicts
- Attempts to bypass policy or tool restrictions
- Model extraction and information leakage
- Evasion and adversarial inputs
- Data or model poisoning
- Unsafe tool use and excessive permissions
- Manipulated retrieval sources
- Sensitive output, memorization, or privacy leakage
- Logic flaws and unreliable decision paths
- Availability and resource-exhaustion conditions
- Changes in behavior across models, versions, and configurations

Define expected behavior and evaluation criteria before testing. Protect prompts, datasets, model details, outputs, credentials, and discovered weaknesses according to their sensitivity.

AI can also assist with vulnerability scanning, log analysis, prioritization, test generation, and evidence review. Automation can increase speed, but the organization still needs to validate the source data, explain important decisions, measure false positives and false negatives, control access, and retain human accountability.

A model-generated recommendation is not evidence by itself. Preserve the underlying records, method, version, prompts or rules where appropriate, and human review needed to support the conclusion.

<h2 id="exam-traps">17. Avoid common Domain 6 exam traps</h2>

### Choosing a tool before defining the objective

The tool should follow the purpose, criteria, scope, authority, evidence needs, and safety plan.

### Treating vulnerability assessment and penetration testing as the same activity

A vulnerability assessment identifies and prioritizes likely weaknesses. A penetration test attempts authorized exploitation to show an attack path or impact.

### Assuming a third party is automatically independent

Independence depends on reporting lines, conflicts, incentives, authority, and objectivity. Outside employment alone does not remove every conflict.

### Believing a clean scan proves the system is secure

A scan covers selected signatures, checks, access levels, and assets at one time. False negatives, missing inventory, business-logic flaws, and untested paths can remain.

### Treating compliance as complete security assurance

Compliance shows whether stated requirements were met. Relevant threats or design weaknesses may exist outside those requirements.

### Reporting raw findings without business context

The audience needs affected assets, evidence, possible impact, priority, ownership, treatment, and limitations.

### Closing a finding when a ticket is marked complete

Closure requires evidence that the action occurred and, when appropriate, a retest that shows the weakness is corrected.

### Accepting a permanent exception without review

An exception needs an authorized owner, compensating controls, expiration, review triggers, and a plan for the remaining condition.

### Using completion counts as proof of effectiveness

Training, backups, access reviews, and tests can be completed without producing the intended outcome. Measure the result, not only the activity.

### Letting production testing exceed its authority

Follow rules of engagement, provider policies, stop conditions, data limits, and escalation paths even when a more aggressive test might reveal more.

<h2 id="review-checklist">18. Review the Domain 6 decisions</h2>

You should be able to explain:

- [ ] The different purposes of an assessment, test, audit, and continuous monitoring
- [ ] Why purpose, authority, criteria, and scope come before tool selection
- [ ] How internal, external, and third-party work differ
- [ ] Why on-premises, cloud, and hybrid locations change evidence and access
- [ ] How independence, competence, relevance, reliability, sufficiency, and traceability affect assurance
- [ ] Why sampling needs a defined population, selection method, and limitations
- [ ] The difference between authenticated and unauthenticated vulnerability scanning
- [ ] The difference between active and passive testing
- [ ] How false positives and false negatives affect validation
- [ ] The difference between a vulnerability assessment and a penetration test
- [ ] The roles of red, blue, and purple teams
- [ ] How black-box, gray-box, and white-box testing differ
- [ ] What log reviews, synthetic transactions, and benchmarks can show
- [ ] The purposes of code review, misuse cases, coverage analysis, and interface testing
- [ ] The difference between breach and attack simulation and a human red-team exercise
- [ ] Why a compliance check does not prove complete security
- [ ] Which account, approval, backup, training, disaster-recovery, and business-continuity data supports process assessment
- [ ] The difference between a KPI and a KRI
- [ ] The difference between severity and organizational priority
- [ ] What belongs in a useful assessment report
- [ ] The difference between remediation, mitigation, and an approved exception
- [ ] Why closure may require retesting
- [ ] How internal, external, and third-party audits differ
- [ ] How AI red teaming and AI-assisted assessment introduce additional evidence and governance needs

<h2 id="official-references">19. Use official references to confirm scope and methods</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-115: Technical Guide to Information Security Testing and Assessment](https://csrc.nist.gov/pubs/sp/800/115/final)
- [NIST SP 800-53A Revision 5: Assessing Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/a/r5/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-137: Information Security Continuous Monitoring](https://csrc.nist.gov/pubs/sp/800/137/final)
- [NIST SP 800-92: Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
- [NIST SP 800-84: Guide to Test, Training, and Exercise Programs for IT Plans and Capabilities](https://csrc.nist.gov/pubs/sp/800/84/final)
- [NIST SP 800-37 Revision 2: Risk Management Framework](https://csrc.nist.gov/pubs/sp/800/37/r2/final)
- [NIST AI 100-2 E2025: Adversarial Machine Learning](https://csrc.nist.gov/pubs/ai/100/2/e2025/final)
