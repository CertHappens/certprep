---
layout: layouts/article.njk
title: "CISSP Domain 7: Security Operations"
description: Study CISSP Domain 7 with plain-language guidance on investigations, logging and monitoring, configuration and change management, incident response, detection, patching, recovery, disaster recovery, physical security, personnel safety, and AI-assisted operations.
permalink: /cissp/study-guide/security-operations/
ogType: article
printable: true
printTitle: "CISSP Domain 7: Security Operations"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 7
eyebrow: CISSP Domain 7 guide
lede: Operate security controls consistently, detect and investigate suspicious activity, manage incidents and changes, restore services after disruption, and protect the people who carry out the work.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Security Operations
    url: /cissp/study-guide/security-operations/
toc:
  - id: domain-map
    label: Domain 7 map
  - id: decision-order
    label: Decision order
  - id: investigations
    label: Investigations and evidence
  - id: logging-monitoring
    label: Logging and monitoring
  - id: intelligence-hunting
    label: Intelligence and hunting
  - id: configuration-management
    label: Configuration management
  - id: operations-foundations
    label: Operations foundations
  - id: resource-protection
    label: Resource protection
  - id: incident-management
    label: Incident management
  - id: detection-prevention
    label: Detection and prevention
  - id: patch-vulnerability
    label: Patch and vulnerability management
  - id: change-management
    label: Change management
  - id: recovery-strategies
    label: Recovery strategies
  - id: disaster-recovery
    label: Disaster recovery
  - id: recovery-testing
    label: Recovery testing
  - id: business-continuity
    label: Business continuity
  - id: physical-security
    label: Physical security
  - id: personnel-safety
    label: Personnel safety
  - id: ai-operations
    label: AI in security operations
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 7
  - Security Operations
  - incident response
  - digital forensics
  - SIEM
  - configuration management
  - patch management
  - disaster recovery
  - business continuity
  - physical security
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Connect operational decisions to governance, authority, policy, legal duties, continuity requirements, and accepted limits.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Apply classification, ownership, handling, retention, media protection, and destruction requirements during operations and investigations.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Relate operational resilience, physical safeguards, cryptography, system capabilities, and lifecycle decisions to daily security work.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Connect monitoring, detection, segmentation, secure channels, remote access, and network infrastructure to operational response.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Apply least privilege, privileged account management, service-account controls, access review, and authentication evidence.
  - title: "CISSP Domain 6: Security Assessment and Testing"
    url: /cissp/study-guide/security-assessment-testing/
    description: Use assessment findings, control evidence, audits, metrics, and retesting to improve security operations.
  - title: "CISSP Domain 8: Software Development Security"
    url: /cissp/study-guide/software-development-security/
    description: Connect software releases to logging, monitoring, patching, incident response, change control, recovery, and retirement.
  - title: Security+ Security Operations Guide
    url: /security-plus/sy0-701/study-guide/security-operations/
    description: Refresh operational controls, vulnerability management, monitoring, incident response, and recovery concepts before applying the CISSP perspective.
---
Domain 7 accounts for 13 percent of the current CISSP exam outline. It asks whether an organization can **operate security reliably, notice meaningful changes, investigate what happened, respond without causing unnecessary harm, recover important services, and improve after the event**.

Security operations is not limited to a Security Operations Center (SOC). It includes administrators, incident responders, facilities teams, legal and privacy staff, business owners, service providers, continuity planners, and leaders who authorize difficult decisions.

The strongest answer usually protects people and critical services first, follows approved authority and evidence-handling rules, and preserves enough information to understand what happened. A fast action that destroys evidence, creates a safety problem, or interrupts a vital service can be worse than a slower controlled response.

<h2 id="domain-map">1. Map the Domain 7 objectives</h2>

The official outline divides Security Operations into fifteen objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 7 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Plain question</th></tr>
    </thead>
    <tbody>
      <tr><td>7.1</td><td>Investigations</td><td>Can the organization collect, protect, analyze, and report evidence in a way that supports the purpose of the investigation?</td></tr>
      <tr><td>7.2</td><td>Logging and monitoring</td><td>Can the organization record useful events, detect meaningful activity, tune alerts, and retain the information needed for response?</td></tr>
      <tr><td>7.3</td><td>Configuration management</td><td>Can systems be provisioned from approved baselines and kept from drifting into unknown or insecure states?</td></tr>
      <tr><td>7.4</td><td>Operations foundations</td><td>Are authority, duties, privileged access, staffing, and service expectations controlled?</td></tr>
      <tr><td>7.5</td><td>Resource protection</td><td>Are media and data protected during storage, movement, use, reuse, and disposal?</td></tr>
      <tr><td>7.6</td><td>Incident management</td><td>Can the organization detect, respond, limit harm, report, recover, correct causes, and learn?</td></tr>
      <tr><td>7.7</td><td>Detection and prevention</td><td>Are protective and detective systems selected, tuned, monitored, and maintained for the environment?</td></tr>
      <tr><td>7.8</td><td>Patch and vulnerability management</td><td>Can weaknesses be found, prioritized, corrected, verified, and tracked when immediate correction is not possible?</td></tr>
      <tr><td>7.9</td><td>Change management</td><td>Can changes be authorized, tested, documented, implemented, observed, and reversed safely?</td></tr>
      <tr><td>7.10</td><td>Recovery strategies</td><td>Do backup, alternate-site, capacity, resilience, and availability choices meet recovery needs?</td></tr>
      <tr><td>7.11</td><td>Disaster recovery processes</td><td>Can people coordinate response, communications, assessment, restoration, training, and improvement after a major disruption?</td></tr>
      <tr><td>7.12</td><td>Disaster recovery testing</td><td>Can the organization prove that plans, people, systems, suppliers, and communications work together?</td></tr>
      <tr><td>7.13</td><td>Business continuity</td><td>Can priority business activities continue or resume within acceptable limits?</td></tr>
      <tr><td>7.14</td><td>Physical security</td><td>Are perimeter and internal safeguards designed as layers around people, equipment, media, and facilities?</td></tr>
      <tr><td>7.15</td><td>Personnel safety</td><td>Do security decisions protect people during travel, emergencies, threats, duress, and social-engineering pressure?</td></tr>
    </tbody>
  </table>
</div>

The objectives overlap. Logs support investigations. Configuration and change management reduce incidents. Asset classification affects evidence and media handling. Recovery testing often exposes missing dependencies, unclear authority, weak communications, and unverified backups.

<h2 id="decision-order">2. Use the right operational decision order</h2>

Operational questions often create urgency. Slow down enough to identify what must be protected and who has authority.

A practical order is:

1. **Protect life and safety.** Do not preserve a server, room, or piece of evidence at the expense of a person.
2. **Confirm authority and activate the correct plan.** Determine who can declare an incident or disaster, isolate a system, contact law enforcement, notify a regulator, or approve a service interruption.
3. **Understand the affected service and assets.** Identify critical processes, data, identities, dependencies, suppliers, and safety consequences.
4. **Preserve useful evidence.** Record the current state, collect volatile information when appropriate, protect logs, document actions, and maintain custody records.
5. **Limit immediate harm.** Contain or mitigate the event using the least disruptive action that meets the need.
6. **Communicate through approved channels.** Provide accurate information to the people who must act while protecting sensitive investigative details.
7. **Restore priority services.** Use tested recovery procedures, clean sources, verified configurations, and business priorities.
8. **Correct the cause and remaining weaknesses.** Patch, reconfigure, remove persistence, improve controls, or document an authorized exception.
9. **Verify and monitor.** Confirm that services and controls work and that suspicious activity has not returned.
10. **Learn and improve.** Update plans, architecture, training, contracts, monitoring, and recovery assumptions.

The order can overlap during a real event. The exam is usually testing whether the candidate recognizes the governing priority. Safety comes before equipment. Authority and scope come before destructive action. Evidence should be preserved before it is altered when doing so does not create greater harm.

<h2 id="investigations">3. Conduct investigations with purpose, authority, and protected evidence</h2>

An **investigation** is a structured effort to determine what happened, how it happened, who or what was involved, and what the organization should do next. The method depends on the purpose.

<div class="table-scroll" role="region" aria-label="Investigation type comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Investigation</th><th scope="col">Main purpose</th><th scope="col">Important concern</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Investigation">Operational</td><td data-label="Main purpose">Restore service, understand a failure, or correct a technical problem.</td><td data-label="Important concern">Move quickly enough to limit disruption while recording changes that affect later analysis.</td></tr>
      <tr><td data-label="Investigation">Administrative</td><td data-label="Main purpose">Determine whether policy, employment, or internal rules were violated.</td><td data-label="Important concern">Follow human-resources, privacy, labor, and organizational procedures.</td></tr>
      <tr><td data-label="Investigation">Civil</td><td data-label="Main purpose">Support a dispute between people or organizations where money, duties, or damages may be at issue.</td><td data-label="Important concern">Preserve relevant information and follow legal hold and discovery requirements.</td></tr>
      <tr><td data-label="Investigation">Criminal</td><td data-label="Main purpose">Support possible prosecution for a violation of criminal law.</td><td data-label="Important concern">Coordinate with legal counsel and law enforcement and follow the required search, seizure, evidence, and jurisdiction rules.</td></tr>
      <tr><td data-label="Investigation">Regulatory or contractual</td><td data-label="Main purpose">Determine whether a law, regulation, standard, contract, or reporting duty was violated.</td><td data-label="Important concern">Use the governing criteria, deadlines, evidence requirements, and notification path.</td></tr>
    </tbody>
  </table>
</div>

Do not assume the security team can perform every action on its own. Legal counsel, privacy, human resources, compliance, law enforcement, insurers, suppliers, and executive leadership may need to direct or approve parts of the work.

<h3>Evidence collection and handling</h3>

**Evidence** is information used to support a conclusion. Useful evidence should be relevant to the question, reliable enough for the purpose, protected from unauthorized change, and documented so another qualified person can understand where it came from.

A sound process includes:

- Identify the authority, purpose, scope, and expected use of the evidence.
- Protect the scene, system, account, cloud resource, device, or records from unnecessary change.
- Record who collected the item, when, where, how, and with which tools or commands.
- Collect volatile information before less time-sensitive information when appropriate.
- Use validated tools and repeatable methods.
- Create forensic images or logical collections when the investigation requires them.
- Calculate and record cryptographic hashes to help show that acquired data did not change.
- Store originals securely and perform analysis on working copies when practical.
- Control access, transfer, retention, disclosure, and destruction.
- Record every handoff and important action.

A **chain of custody** is the record of who possessed or controlled evidence from collection through final disposition. It does not prove that every conclusion is correct. It helps show that the evidence was identified, transferred, protected, and accounted for.

<h3>Order of volatility</h3>

Some information disappears quickly. Memory contents, running processes, network connections, temporary credentials, and active sessions may be lost when a system is powered off. Disk files and archived records usually persist longer.

The **order of volatility** is the priority for collecting information based on how quickly it may disappear. The exact order depends on the system, investigation, authority, safety, and available expertise. Do not mechanically collect volatile data if doing so would spread malware, destroy other evidence, violate authority, or create unacceptable operational harm.

<h3>Digital forensic artifacts</h3>

An **artifact** is a piece of information left by activity on a system or network. Examples include:

- Memory contents and running processes
- Authentication, application, operating-system, and cloud audit logs
- File metadata, deleted records, registry data, browser history, and temporary files
- Network flows, packet captures, firewall events, and DNS records
- Email headers, messages, attachments, and collaboration records
- Mobile-device data, location records, application stores, and synchronization records
- Virtual-machine snapshots, container logs, orchestration records, and serverless events
- Identity-provider, endpoint-detection, and privileged-access records
- AI prompts, outputs, model versions, retrieval sources, tool calls, and agent actions

The presence of an artifact does not automatically prove intent, identity, or cause. Investigators correlate several sources, account for time differences and missing data, and explain alternative interpretations.

<h3>Reporting and documentation</h3>

Investigation notes should distinguish observed facts from assumptions and conclusions. Record timestamps, time zones, commands, tools, versions, sources, errors, gaps, and actions that may have changed the environment.

A useful report states:

- Purpose, authority, scope, and audience
- Systems, accounts, locations, and time period
- Methods and evidence sources
- Timeline of important events
- Findings and supporting evidence
- Confidence, limitations, and missing information
- Business, legal, privacy, safety, and operational effects
- Actions taken and remaining work
- Handling, retention, and distribution requirements

Do not claim that one log entry or tool result proves more than it supports.

<h2 id="logging-monitoring">4. Build logging and monitoring that supports decisions</h2>

A **log** is a record of an event. **Log management** is the process for generating, transmitting, storing, accessing, protecting, using, retaining, and disposing of those records.

Logging is useful only when the organization can answer practical questions:

- Which events must be recorded?
- Which assets and identities are important enough to monitor closely?
- Are clocks synchronized?
- Can records be linked across systems?
- Who can read, change, or delete logs?
- How long are logs retained, and why?
- Can responders retrieve them quickly during an incident?
- Are privacy, legal, and contractual limits respected?
- Are alerts tuned to produce action rather than noise?

<h3>Security Information and Event Management</h3>

A **Security Information and Event Management (SIEM)** platform collects and analyzes security records from many sources. It can normalize formats, correlate related events, search historical data, create alerts, support dashboards, and retain evidence.

A SIEM does not create useful visibility by itself. It needs complete data sources, correct parsing, synchronized time, tested detection rules, controlled access, sufficient storage, and ongoing tuning.

A **Security Orchestration, Automation and Response (SOAR)** platform connects tools and automates parts of a response workflow. It may enrich an alert, gather context, open a ticket, isolate a device, disable an account, or notify a responder. Automation should use approved limits, human review for high-impact actions, error handling, and records of what it did.

<h3>Continuous monitoring and tuning</h3>

**Continuous monitoring** means collecting and reviewing security information often enough to support current decisions. It does not mean that every event receives immediate human attention.

Tuning includes:

- Removing or suppressing known harmless events without hiding meaningful patterns
- Adjusting thresholds and time windows
- Adding asset, identity, vulnerability, and business context
- Testing detection rules with known scenarios
- Measuring false positives and false negatives
- Retiring rules for systems that no longer exist
- Reviewing data sources after architecture or service changes
- Checking that alerts reach an accountable person

**Alert fatigue** occurs when people receive so many low-value alerts that important activity is missed or delayed. The solution is not to silence everything. Improve data quality, correlation, prioritization, automation, staffing, and rule design.

<h3>Egress monitoring</h3>

**Egress monitoring** watches traffic leaving an environment. It can help detect data theft, command-and-control communication, unauthorized cloud storage, tunneling, malware callbacks, and policy violations.

Outbound traffic should be evaluated with destination, volume, protocol, identity, data classification, timing, and expected business behavior. A large transfer may be normal for a backup system and suspicious for a user workstation.

<h3>User and Entity Behavior Analytics</h3>

**User and Entity Behavior Analytics (UEBA)** looks for activity that differs from an established pattern for a user, device, account, application, or other entity. Examples include unusual login times, impossible travel, new data access, rapid privilege use, or a service account acting interactively.

An anomaly is not the same as an attack. The system needs context, validation, privacy controls, explainable reasoning, and a path for correcting inaccurate baselines.

<h2 id="intelligence-hunting">5. Use threat intelligence and hunting to improve detection</h2>

**Threat intelligence** is analyzed information about possible attackers, capabilities, targets, methods, or indicators that can support a decision. A feed of addresses or file hashes is data. It becomes useful intelligence when the organization knows the source, reliability, relevance, age, context, and action it should trigger.

Common intelligence forms include:

- **Strategic:** Broad trends and implications for leaders and business planning
- **Operational:** Information about campaigns, actors, targets, and likely activity
- **Tactical:** Adversary behaviors, techniques, and procedures used to improve defenses
- **Technical:** Indicators such as addresses, domains, certificates, hashes, and signatures

Evaluate intelligence before using it. Old or low-confidence indicators can block legitimate services or create unnecessary alerts.

**Threat hunting** is a planned search for suspicious activity that existing alerts may not have identified. A hunt begins with a question or hypothesis, such as whether compromised credentials were used to access cloud storage or whether a known technique appears in endpoint records.

A useful hunt:

1. Defines the question and required data.
2. Searches across relevant sources.
3. Validates findings and alternative explanations.
4. Escalates confirmed activity through incident procedures.
5. Converts useful discoveries into improved detections, logging, architecture, or training.

Hunting does not replace normal monitoring. It helps find gaps and improve it.

<h2 id="configuration-management">6. Keep systems in known and approved configurations</h2>

**Configuration management** controls how systems are initially set up, changed, monitored, and retired so the organization knows what should exist and can identify unauthorized or harmful differences.

A **baseline** is the approved starting configuration for a system or class of systems. It may define operating-system settings, installed software, services, accounts, network rules, logging, encryption, and required agents.

A configuration-management process includes:

- Accurate inventory and ownership
- Approved secure baselines
- Repeatable provisioning
- Version control for configuration files and infrastructure code
- Testing and approval of changes
- Automated comparison against the baseline
- Detection and correction of drift
- Documentation of approved exceptions
- Backup and protection of configuration data
- Controlled retirement and removal

**Configuration drift** is the difference that develops between the approved state and the actual state. Drift may result from emergency fixes, manual changes, failed automation, supplier updates, or unauthorized activity.

Automation can improve consistency, but a bad template can spread a weakness quickly. Protect automation accounts, source repositories, signing keys, pipelines, secrets, and approval rules. Test before broad deployment and keep a rollback path.

Provisioning and configuration management are related but different. Provisioning creates or assigns the resource. Configuration management keeps it in the approved state throughout its lifecycle.

<h2 id="operations-foundations">7. Apply foundational security operations concepts</h2>

Daily operations depend on controlled authority and clear responsibility.

### Need-to-know and least privilege

**Need-to-know** limits information access to people or systems that require it for an approved purpose. **Least privilege** limits permissions to the minimum needed to perform an authorized task.

A person may have a valid role but still lack a need to see one investigation, customer record, or business plan. Access should be limited by purpose, time, system, data, and action.

### Separation of duties and responsibilities

**Separation of Duties (SoD)** divides sensitive work so one person cannot complete a high-impact process alone. Examples include separating request from approval, development from production deployment, payment creation from payment release, and evidence collection from final audit approval.

SoD reduces fraud, error, and hidden misuse. It also requires clear handoffs and coverage when staff are absent.

### Privileged account management

Privileged accounts can change security settings, access sensitive data, create identities, alter logs, or disrupt services. Controls should include:

- Individual accountability rather than shared administrative accounts
- Separate normal and privileged identities
- Strong and phishing-resistant authentication where possible
- Just-in-time or time-limited elevation
- Approval and purpose records
- Session recording or command logging where appropriate
- Credential rotation and protected secrets
- Monitoring, review, and prompt removal
- Emergency access with strong after-the-fact review

### Job rotation and mandatory leave

**Job rotation** moves people through responsibilities to reduce dependence on one person, improve cross-training, and expose unusual processes. **Mandatory leave** requires a person to be away from duties for a period so concealed activity may become visible when someone else performs the work.

These controls can help detect fraud but do not replace technical monitoring, access review, or supervision.

### Service-level agreements

A **Service-Level Agreement (SLA)** states measurable service commitments between parties. Security-related terms may cover availability, response time, recovery, logging, patching, notification, evidence access, and escalation.

An SLA does not create capability. The organization should monitor performance, define remedies and escalation, and understand dependencies and exclusions.

<h2 id="resource-protection">8. Protect media and information during operations</h2>

Resource protection applies the classification and handling rules from Domain 2 during daily work.

**Media** includes any physical or logical location that stores information, such as drives, tapes, removable devices, mobile equipment, cloud storage, printed records, and backups.

A media-management process should cover:

- Inventory and ownership
- Classification and labeling
- Authorized use and access
- Encryption and key protection
- Storage and environmental protection
- Transport and tracking
- Copying and export controls
- Reuse and sanitization
- Retention and legal holds
- Destruction and proof of destruction

Protect **data at rest** while it is stored and **data in transit** while it moves between systems or locations. Encryption helps, but access control, integrity, availability, key management, logging, and physical protection still matter.

Do not use production data in lower environments without an approved need and protection. Masking, tokenization, synthetic data, and controlled subsets can reduce unnecessary exposure.

Backups are media too. They need classification, encryption, access control, retention, monitoring, restoration testing, and secure disposal.

<h2 id="incident-management">9. Conduct incident management from detection through improvement</h2>

An **incident** is an event that threatens or harms information, systems, services, people, or organizational objectives and requires a coordinated response.

Current NIST guidance treats incident response as part of the broader cybersecurity program rather than an isolated sequence. Governance, identification, and protection prepare the organization. Detection, response, and recovery handle the event and improve the program afterward.

The CISSP outline emphasizes these operational activities:

### Detection

Determine whether observed activity may require incident handling. Validate the alert, identify affected assets and identities, collect context, and assign an initial priority.

### Response

Activate the correct team and procedures. Establish leadership, roles, communications, legal and privacy support, evidence handling, and decision authority.

### Mitigation

Reduce immediate loss, harm, or disruption. This may include isolating a device, blocking a connection, disabling a credential, limiting a service, or applying a temporary control.

### Reporting

Provide accurate, timely information to internal and external stakeholders. Reporting may involve leadership, customers, insurers, regulators, law enforcement, suppliers, and affected people. Follow approved thresholds and legal duties.

### Recovery

Restore priority services and data using trusted sources and verified configurations. Monitor closely for recurrence or hidden persistence.

### Remediation

Correct the underlying weakness or condition. Remove malicious access, patch vulnerabilities, change architecture, improve identity controls, or fix a broken process.

### Lessons learned

Review what happened, what worked, what failed, what information was missing, and which changes are needed. Assign owners and due dates. A meeting without tracked action does not create improvement.

<h3>Containment, eradication, and recovery</h3>

Many incident-response methods use the terms containment, eradication, and recovery:

- **Containment** limits spread and immediate impact.
- **Eradication** removes the cause, malicious presence, or persistence.
- **Recovery** returns systems and services to an approved operational state.

Do not rush from containment directly to normal service without understanding persistence, credentials, dependencies, and the clean source used for restoration.

<h3>Incident severity and priority</h3>

Severity and priority are related but not identical.

**Severity** describes possible or actual harm. **Priority** determines how urgently the organization acts after considering safety, critical services, scope, active exploitation, data sensitivity, legal deadlines, available controls, and recovery options.

A technically severe issue on an isolated lab system may have lower immediate priority than a smaller issue affecting emergency communications or regulated customer data.

<h2 id="detection-prevention">10. Operate and maintain detection and preventive measures</h2>

Security products require ownership, configuration, tuning, monitoring, testing, updates, and lifecycle planning. Installing a tool is the beginning of operations, not the end.

### Firewalls

A **network firewall** controls traffic between network boundaries. A **Web Application Firewall (WAF)** examines web requests and responses for application-layer attacks. A **next-generation firewall** may add application awareness, identity context, intrusion prevention, decryption, and threat intelligence.

Rules should have owners, purposes, review dates, logging, and removal criteria. Broad temporary rules often become permanent exposure.

### IDS and IPS

An **Intrusion Detection System (IDS)** identifies suspicious activity and alerts. An **Intrusion Prevention System (IPS)** can also block or alter traffic. Prevention can reduce harm faster, but false positives may interrupt legitimate services.

Test signatures, behavior rules, placement, performance, encrypted-traffic visibility, bypass conditions, and failure modes.

### Allowlists and blocklists

An **allowlist** permits only approved items. A **blocklist** denies known unwanted items while allowing other activity. The official outline uses the older terms whitelist and blacklist, but allowlist and blocklist describe the function more directly.

Allowlists can provide stronger restriction but require accurate maintenance. Blocklists are easier to start but cannot identify every unknown threat.

### Sandboxing

A **sandbox** runs suspicious code or content in an isolated environment so behavior can be observed with less danger to production systems. Skilled malware may detect the sandbox, delay activity, or require conditions that the test environment does not reproduce.

### Honeypots and honeynets

A **honeypot** is a decoy system or service designed to attract and observe suspicious activity. A **honeynet** is a network of decoys. They can provide early warning and intelligence, but they must be isolated, monitored, legally reviewed, and prevented from becoming a launch point for attacks.

### Anti-malware and endpoint protection

Modern endpoint tools may combine signatures, behavior monitoring, application control, exploit prevention, isolation, and Endpoint Detection and Response (EDR). Coverage, policy, sensor health, exclusions, tamper protection, and response authority must be monitored.

### Third-party security services

A Managed Security Service Provider (MSSP), Managed Detection and Response provider, cloud provider, or other supplier can operate security capabilities. Contracts should define scope, access, data handling, staffing, escalation, evidence, notification, recovery, audit rights, and exit support.

Outsourcing the work does not transfer the organization’s accountability.

<h2 id="patch-vulnerability">11. Implement patch and vulnerability management as a lifecycle</h2>

**Vulnerability management** finds, evaluates, prioritizes, treats, and tracks weaknesses. **Patch management** identifies, acquires, tests, installs, and verifies vendor fixes and updates. Patching is one treatment within the larger vulnerability-management process.

A practical lifecycle is:

1. Maintain an accurate inventory of assets, software, versions, owners, exposure, and dependencies.
2. Gather vulnerabilities from scans, vendors, researchers, intelligence, incidents, testing, and supplier notices.
3. Validate the affected product and configuration.
4. Prioritize using exploitability, known active exploitation, exposure, asset importance, data sensitivity, safety, business impact, compensating controls, and available fixes.
5. Select treatment: patch, upgrade, reconfigure, isolate, remove, replace, monitor, or accept through authorized exception.
6. Test the change and rollback procedure.
7. Schedule and communicate deployment based on urgency and operational constraints.
8. Install the change through controlled methods.
9. Verify successful installation and expected system behavior.
10. Rescan or retest and monitor for problems.
11. Record exceptions, owners, expiration dates, and remaining exposure.
12. Measure overdue work and recurring root causes.

Do not prioritize only by a numeric severity score. CISA’s Known Exploited Vulnerabilities catalog is one input that shows evidence of active exploitation. Internet exposure, privilege required, exploit maturity, criticality, and compensating controls also matter.

Emergency patching may shorten normal testing and approval, but it should not eliminate ownership, documentation, monitoring, verification, or rollback planning.

When a patch is unavailable or too disruptive, use temporary controls such as isolation, disabled features, application rules, stronger monitoring, or restricted access. Temporary controls need review and an end condition.

<h2 id="change-management">12. Use change management to control operational risk</h2>

**Change management** is the process for requesting, evaluating, approving, testing, implementing, observing, documenting, and closing changes. Its purpose is not to stop change. It helps the organization make changes without creating avoidable outages, security gaps, or unknown states.

A standard change record should include:

- Business and technical reason
- Affected assets, services, data, and dependencies
- Security, privacy, safety, and compliance impact
- Requester, owner, approver, and implementer
- Test results and acceptance criteria
- Implementation plan and maintenance window
- Communication plan
- Monitoring and validation steps
- Rollback or backout plan
- Evidence and documentation updates
- Final outcome and lessons

A **standard change** is low risk, repeatable, and preauthorized under defined conditions. A **normal change** follows the regular review and approval process. An **emergency change** uses an accelerated path because waiting would create greater harm.

Emergency does not mean undocumented. Record the reason, authority, actions, results, and retrospective review.

Configuration management describes the approved state. Change management controls how that state is altered. Both are needed.

<h2 id="recovery-strategies">13. Implement recovery strategies that match business needs</h2>

Recovery strategy should follow Business Impact Analysis results, recovery objectives, architecture, dependencies, staffing, supplier capability, and cost.

### Backup storage strategies

- **Onsite:** Fast access but may be affected by the same physical event as production.
- **Offsite:** Separates copies from the primary location but may increase retrieval time.
- **Cloud storage:** Can provide geographic separation and flexible capacity, but requires identity, encryption, key, network, provider, cost, and deletion controls.
- **Offline or isolated copies:** Reduce exposure to ransomware and destructive administrative access.
- **Immutable copies:** Prevent normal alteration or deletion for a defined period.

The backup method matters less than verified recoverability. Track job success, protected credentials, retention, integrity, restore time, application consistency, and regular test results.

### Recovery sites

<div class="table-scroll" role="region" aria-label="Recovery site comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Site</th><th scope="col">Plain description</th><th scope="col">Tradeoff</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Site">Cold site</td><td data-label="Plain description">Provides space and basic facilities but little or no ready computing equipment.</td><td data-label="Tradeoff">Lower ongoing cost, longer recovery time, and more setup work.</td></tr>
      <tr><td data-label="Site">Warm site</td><td data-label="Plain description">Provides some systems, connectivity, and preparation but still needs data and configuration work.</td><td data-label="Tradeoff">Middle cost and recovery time.</td></tr>
      <tr><td data-label="Site">Hot site</td><td data-label="Plain description">Maintains ready infrastructure and current or near-current data for rapid activation.</td><td data-label="Tradeoff">Higher cost and faster recovery.</td></tr>
      <tr><td data-label="Site">Reciprocal agreement</td><td data-label="Plain description">Two organizations agree to support each other during disruption.</td><td data-label="Tradeoff">Low direct cost but uncertain capacity, compatibility, priority, and enforceability during a shared event.</td></tr>
      <tr><td data-label="Site">Mobile or modular site</td><td data-label="Plain description">Portable facilities or equipment are delivered to a usable location.</td><td data-label="Tradeoff">Flexible but dependent on transport, setup, utilities, contracts, and availability.</td></tr>
    </tbody>
  </table>
</div>

A **resource-capacity agreement** reserves computing, network, facility, or service capacity for recovery. Confirm whether the capacity is dedicated, shared, guaranteed, tested, and sufficient during a regional event.

### Multiple processing sites

Active-active designs process work at more than one location. Active-passive designs keep alternate capacity ready or partially ready. Multiple sites improve resilience only when they avoid shared dependencies and can operate with the required data consistency, identity services, network paths, suppliers, and staff.

### Resilience, availability, fault tolerance, and QoS

- **Resilience** is the ability to continue or recover when disruption occurs.
- **High availability** reduces service interruption through redundancy and rapid failover.
- **Fault tolerance** allows a system to continue operating when a component fails.
- **Quality of Service (QoS)** gives selected traffic preferred treatment when capacity is limited.

Redundancy is not useful when both copies depend on the same power, network, identity provider, administrator, region, or software defect.

<h2 id="disaster-recovery">14. Implement disaster recovery processes</h2>

**Disaster recovery** restores information systems and technology services after a major disruption. **Business continuity** keeps priority business activities operating or resumes them within acceptable limits. Disaster recovery supports business continuity, but they are not the same plan.

A disaster-recovery process includes:

### Response

Recognize the disruption, protect people, stabilize conditions, activate the plan, establish leadership, and coordinate with incident, emergency, facilities, supplier, and continuity teams.

### Personnel

Define primary and alternate roles, contact methods, decision authority, travel and access needs, workload limits, and succession. Plans should not depend on one unavailable expert.

### Communications

Use approved primary and alternate channels. Define audiences, message approval, update frequency, escalation, and methods for staff, customers, suppliers, regulators, emergency services, and leadership.

### Assessment

Determine damage, available capability, affected dependencies, data condition, safety, expected duration, and which recovery strategy is appropriate.

### Restoration

Recover systems in business-priority order. Use trusted backups, approved configurations, verified identities, tested dependencies, and acceptance criteria. Validate data and security controls before declaring success.

### Training and awareness

People need role-specific instruction before a crisis. Training should cover plan access, authority, communications, manual workarounds, safety, evidence, and supplier coordination.

### Lessons learned

After the event, update assumptions, inventories, contact lists, architecture, contracts, procedures, training, monitoring, and recovery tests. Track corrective actions to completion.

<h2 id="recovery-testing">15. Test disaster recovery plans at increasing levels of impact</h2>

A plan that has never been exercised is an assumption. Testing should begin with low-risk methods and progress based on criticality, maturity, and acceptable disruption.

<div class="table-scroll" role="region" aria-label="Disaster recovery test comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Test</th><th scope="col">What happens</th><th scope="col">Risk and evidence</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Test">Read-through or checklist</td><td data-label="What happens">Participants review the written plan for missing, outdated, or unclear information.</td><td data-label="Risk and evidence">Low disruption; confirms documentation quality but not real performance.</td></tr>
      <tr><td data-label="Test">Tabletop</td><td data-label="What happens">Participants discuss their decisions and actions for a scenario.</td><td data-label="Risk and evidence">Low disruption; exposes authority, coordination, and communication gaps.</td></tr>
      <tr><td data-label="Test">Walkthrough</td><td data-label="What happens">Participants step through procedures, locations, equipment, and handoffs more directly.</td><td data-label="Risk and evidence">Moderate preparation; confirms access, sequence, and practical details.</td></tr>
      <tr><td data-label="Test">Simulation</td><td data-label="What happens">The organization creates realistic conditions without stopping the primary service.</td><td data-label="Risk and evidence">Tests decisions, tools, timing, and communications with controlled operational risk.</td></tr>
      <tr><td data-label="Test">Parallel</td><td data-label="What happens">Recovery systems process a copy of work while production continues.</td><td data-label="Risk and evidence">Provides strong technical evidence without intentionally stopping the primary environment.</td></tr>
      <tr><td data-label="Test">Full interruption</td><td data-label="What happens">The primary environment is stopped and operations move to the recovery capability.</td><td data-label="Risk and evidence">Provides the strongest end-to-end evidence and the greatest business risk.</td></tr>
    </tbody>
  </table>
</div>

A test plan should define objectives, scope, success criteria, safety limits, participants, observers, communications, data protection, stop conditions, and cleanup.

Measure more than whether systems started. Check:

- Recovery Time Objective and Recovery Point Objective results
- Data integrity and application consistency
- Identity, network, certificate, DNS, supplier, and licensing dependencies
- Security monitoring and logging in the recovery environment
- Staff and customer communications
- Manual procedures and backlog handling
- Regulatory and contractual obligations
- Return to normal operations

Every test should produce findings, owners, due dates, and a retest plan where needed.

<h2 id="business-continuity">16. Participate in business continuity planning and exercises</h2>

Business continuity begins with the organization’s mission and priority activities, not with a list of servers.

A Business Impact Analysis identifies:

- Priority processes and services
- Maximum acceptable disruption
- Recovery time and data-loss limits
- People, facilities, systems, data, suppliers, and communications required
- Manual workarounds and minimum staffing
- Safety, legal, financial, customer, and reputation effects
- Dependencies and recovery sequence

Continuity exercises should include business leaders, not only technology staff. A system may be restored while the business remains unable to operate because a supplier, building, identity service, payment path, approval role, or communication channel is unavailable.

Security operations contributes by maintaining current inventories, dependencies, contact information, alternate access, monitoring, recovery evidence, and incident coordination.

<h2 id="physical-security">17. Implement and manage layered physical security</h2>

Physical security uses layers to deter, detect, delay, respond to, and recover from unauthorized physical access or environmental harm.

### Perimeter controls

Examples include site selection, fencing, lighting, gates, barriers, guards, cameras, signs, vehicle controls, landscaping, and controlled entrances.

A control should match the threat and environment. Bright lighting may improve visibility in one location and create glare or concealment in another. Cameras record only what they can see and require monitoring, retention, time synchronization, maintenance, and privacy controls.

### Internal controls

Examples include badges, biometric readers, turnstiles, mantraps, visitor escorts, locked rooms, cages, cabinets, alarms, sensors, secure work areas, clean desks, protected wiring, and environmental monitoring.

Prevent **tailgating**, where an unauthorized person follows an authorized person through a controlled entrance. Train staff to challenge or report unusual access without creating personal danger.

### Layering and response

A locked door alone does not provide complete physical security. Combine deterrence, access control, detection, delay, response, and records. Consider emergency egress, accessibility, fire codes, life safety, power, water, temperature, smoke, and natural hazards.

Physical access often creates logical access. A person with direct access to equipment may remove media, connect devices, reset systems, capture network traffic, or bypass normal authentication.

<h2 id="personnel-safety">18. Address personnel safety and security concerns</h2>

People come before data, equipment, and evidence.

### Travel security

Travel guidance may include:

- Threat and location briefings
- Minimum required data and equipment
- Loaner devices and temporary accounts
- Encryption, updates, and remote-wipe capability
- Avoidance of untrusted charging, storage, and networks
- Secure transport and storage
- Border, customs, and legal considerations
- Check-in and emergency contacts
- Reporting lost devices, unusual requests, or suspected compromise

### Insider threat and social media

An insider threat can involve malicious action, negligence, coercion, or a compromised account. Programs should combine access controls, behavior indicators, reporting paths, privacy, legal review, human resources, and support for people in distress.

Social media may expose roles, travel, technology, suppliers, building details, personal relationships, or recovery activities. Awareness should focus on practical decisions rather than demanding unrealistic secrecy.

### Authentication fatigue

**Multi-factor authentication fatigue** is repeated prompting intended to pressure a person into approving an unauthorized request. Reduce it with number matching, phishing-resistant authentication, rate limits, context, user reporting, and rapid response to unexpected prompts.

### Emergency management and duress

Emergency plans should cover evacuation, shelter, accountability, medical support, emergency services, communications, and safe return. Security controls must allow emergency exit.

**Duress** is pressure or threat used to force a person to act. Procedures may include discreet alarms, code words, check-in methods, trained responders, and instructions that do not encourage people to resist when doing so increases danger.

<h2 id="ai-operations">19. Operate AI-assisted security and monitor AI systems in production</h2>

AI and machine learning can help correlate events, summarize alerts, enrich cases, identify patterns, prioritize work, and automate response steps. These capabilities can reduce repetitive effort, but they can also amplify bad data or an incorrect decision.

Controls for AI-assisted operations include:

- Approved data sources and access limits
- Protection of prompts, cases, logs, customer data, and credentials
- Version, model, configuration, and tool records
- Human review for high-impact actions
- Testing for false positives, false negatives, bias, and unsafe recommendations
- Explainable evidence for important conclusions
- Limits on tool use and automated containment
- Monitoring for prompt injection and manipulated context
- Rollback and manual fallback
- Records of automated actions and approvals

**Model drift** is a decline or change in model behavior as real-world data, threats, users, or environments change. Monitor performance, error rates, distributions, and outcomes over time. Retraining or replacing a model is a controlled change and should be tested like other operational changes.

Security teams also need to monitor production AI systems for data leakage, model extraction, unusual tool calls, prompt attacks, privilege misuse, poisoned retrieval sources, denial of service, and unexplained changes in behavior.

AI output can support a decision, but it is not unquestionable evidence. Preserve the underlying logs, source records, model and rule versions, and human review needed to explain the action.

<h2 id="exam-traps">20. Avoid common Domain 7 exam traps</h2>

### Preserving equipment before protecting people

Life safety is the first priority. Evidence and availability do not justify avoidable danger.

### Powering off a system before considering volatile evidence

Memory, sessions, processes, and connections may disappear. Consider authority, safety, spread, and evidence needs before altering the system.

### Treating one indicator as proof

A hash, address, anomaly, or alert needs context and validation. It may be stale, shared, spoofed, or benign.

### Collecting logs without a management plan

Logs need time synchronization, protection, retention, access, parsing, review, and an operational purpose.

### Assuming a SIEM automatically detects attacks

The SIEM depends on complete data, working parsers, detection logic, context, tuning, staffing, and response procedures.

### Confusing configuration management with change management

Configuration management defines and monitors the approved state. Change management controls how that state is altered.

### Patching only by numeric severity

Prioritize using active exploitation, exposure, asset importance, data, safety, dependencies, and available controls, not one score alone.

### Making an emergency change without documentation

Emergency work may use a faster approval path, but it still needs authority, records, validation, monitoring, and later review.

### Treating backups as successful because jobs completed

A backup is useful only when protected data can be restored within the required time and loss limits.

### Choosing the most disruptive recovery test first

Use a progression that matches maturity, criticality, and acceptable business risk. A full interruption provides strong evidence but can create real harm.

### Confusing disaster recovery with business continuity

Disaster recovery restores technology. Business continuity keeps priority business activities operating or resumes them within acceptable limits.

### Assuming redundant components have independent failure paths

Two systems may share power, networks, identities, administrators, software defects, suppliers, or regions.

### Blocking every anomaly found by AI

An anomaly is a reason to investigate, not proof of attack. Validate context and keep human accountability for high-impact actions.

<h2 id="review-checklist">21. Review the Domain 7 decisions</h2>

You should be able to explain:

- [ ] Why safety, authority, and service context come before aggressive technical action
- [ ] How operational, administrative, civil, criminal, and regulatory investigations differ
- [ ] What chain of custody records and what it does not prove
- [ ] Why the order of volatility matters
- [ ] How hashes, working copies, validated tools, and documentation protect evidence
- [ ] The difference between a log, log management, a SIEM, and SOAR
- [ ] Why clock synchronization, parsing, retention, access, and tuning affect monitoring
- [ ] What egress monitoring and UEBA can reveal
- [ ] The difference between threat data, threat intelligence, and threat hunting
- [ ] How a baseline and configuration drift support configuration management
- [ ] The differences among need-to-know, least privilege, separation of duties, job rotation, and mandatory leave
- [ ] Why privileged accounts and service commitments require monitoring and review
- [ ] How media and backups should be protected throughout their lifecycle
- [ ] The operational steps from detection through lessons learned
- [ ] The differences among containment, eradication, recovery, mitigation, and remediation
- [ ] How firewalls, IDS, IPS, allowlists, blocklists, sandboxes, honeypots, and endpoint tools differ
- [ ] Why outsourcing monitoring does not transfer accountability
- [ ] The difference between vulnerability management and patch management
- [ ] Why active exploitation and asset context can matter more than a severity score
- [ ] The differences among standard, normal, and emergency changes
- [ ] How cold, warm, hot, reciprocal, and mobile recovery options differ
- [ ] The differences among resilience, high availability, fault tolerance, and QoS
- [ ] The differences among disaster recovery and business continuity
- [ ] What response, personnel, communications, assessment, restoration, training, and lessons learned contribute to disaster recovery
- [ ] How read-through, tabletop, walkthrough, simulation, parallel, and full-interruption tests differ
- [ ] Why recovery tests must include identities, networks, suppliers, monitoring, communications, and return to normal operations
- [ ] How perimeter and internal physical safeguards work as layers
- [ ] Why emergency egress and personnel safety override asset protection
- [ ] How travel, insider threats, social media, authentication fatigue, emergencies, and duress affect personnel security
- [ ] How AI can improve operations while creating data, accuracy, automation, and model-drift concerns

<h2 id="official-references">22. Use official references to confirm scope and methods</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-61 Revision 3: Incident Response Recommendations and Considerations](https://csrc.nist.gov/pubs/sp/800/61/r3/final)
- [NIST SP 800-86: Guide to Integrating Forensic Techniques into Incident Response](https://csrc.nist.gov/pubs/sp/800/86/final)
- [NIST SP 800-92: Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final)
- [NIST SP 800-137: Information Security Continuous Monitoring](https://csrc.nist.gov/pubs/sp/800/137/final)
- [NIST SP 800-128: Guide for Security-Focused Configuration Management](https://csrc.nist.gov/pubs/sp/800/128/upd1/final)
- [NIST SP 800-40 Revision 4: Guide to Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-34 Revision 1: Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final)
- [NIST SP 800-84: Guide to Test, Training, and Exercise Programs](https://csrc.nist.gov/pubs/sp/800/84/final)
- [NIST SP 800-94: Guide to Intrusion Detection and Prevention Systems](https://csrc.nist.gov/pubs/sp/800/94/final)
- [NIST SP 800-88 Revision 2: Guidelines for Media Sanitization](https://csrc.nist.gov/pubs/sp/800/88/r2/final)
- [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
- [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
