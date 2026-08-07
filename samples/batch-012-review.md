# SEC-701 Batch 012 Structured-Response Review

- Batch ID: `SEC701-BATCH-012`
- Date: `2026-08-07`
- New approved questions: 24
- IDs: `SEC701-0000251` through `SEC701-0000274`
- Draft questions: 0
- Production questions after batch: 274
- Matching: 6
- Classification: 6
- Ordering: 6
- Selectable evidence lines: 6
- Difficulty: easy 6 / medium 12 / hard 6

## Structured-response design

All 24 questions use the repository structured-response contract. Matching and classification store their mappings in `responses.json`; ordering stores the complete authored order there; selectable evidence-line questions use `responses.json` plus a preformatted entry in `stimuli.json`. A-D choice fields remain blank for every question.

Classification intentionally reuses categories where appropriate. One-to-one matching uses each option exactly once. Ordering questions use constrained processes or sequences to avoid multiple defensible orders. Line-selection questions require the exact authored evidence set.

## Domain allocation

| Domain | Before | Added | After | After share | Official |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 30 | 3 | 33 | 12.04% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 55 | 5 | 60 | 21.90% | 22% |
| 3.0 Security Architecture | 45 | 4 | 49 | 17.88% | 18% |
| 4.0 Security Operations | 70 | 7 | 77 | 28.10% | 28% |
| 5.0 Security Program Management and Oversight | 50 | 5 | 55 | 20.07% | 20% |

## Question inventory

### SEC701-0000251 · matching · Objective 1.1 · easy

**Topic:** Security control functions

**Instruction:** Match each control example to its primary function.

A security analyst is reviewing how four controls primarily affect an event.

**Overall explanation:** Each control is categorized by its main purpose: stopping an event, discovering it, repairing its effects, or discouraging it.

**Options:** Preventive; Detective; Corrective; Deterrent

- Application allowlisting blocks an unapproved executable before it starts. → **Preventive**. The control stops unauthorized software execution before the event occurs.
- A monitoring rule alerts on an unexpected privileged sign-in. → **Detective**. The alert identifies activity that has occurred or is occurring.
- A system restores a protected known-good configuration after an unauthorized change. → **Corrective**. The restoration repairs the affected state after the change.
- A sign states that access is monitored and unauthorized entry may be prosecuted. → **Deterrent**. The warning is intended to discourage an attempted violation.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000252 · classification · Objective 1.2 · medium

**Topic:** Authentication authorization and accounting

**Instruction:** Classify each action by its primary AAA function. Categories may be used more than once.

A team is mapping identity and access activities to authentication, authorization, and accounting.

**Overall explanation:** Authentication verifies identity, authorization determines permitted actions, and accounting records activity for accountability.

**Options:** Authentication; Authorization; Accounting

- Verify a user with a registered passkey before sign-in. → **Authentication**. The passkey is used to verify the identity claiming the account.
- Permit the Finance Approver role to release payments up to its assigned limit. → **Authorization**. The role and limit determine what an authenticated user is permitted to do.
- Record which administrator changed a firewall rule and when the change occurred. → **Accounting**. The audit record creates a history of accountable actions.
- Validate a user certificate from a smart card during login. → **Authentication**. Certificate validation contributes to verifying the user identity.
- Block a Sales role from opening employee medical-benefit records. → **Authorization**. The access decision restricts what the authenticated role may read.
- Write timestamped records of privileged API changes to the audit system. → **Accounting**. The records support accountability and later review of privileged actions.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000253 · ordering · Objective 1.3 · medium

**Topic:** Planned change workflow

**Instruction:** Place the change actions in the correct order from first to last.

A planned firewall change follows a controlled workflow: impact is assessed before approval, approved changes are tested before production, and production changes are validated and documented after implementation.

**Overall explanation:** A controlled change moves from impact analysis to authorization, testing, implementation, and post-change validation and documentation.

1. **Assess the security and operational impact of the proposed rule change.** Impact analysis identifies affected services, risks, dependencies, and rollback needs before authorization.
2. **Obtain authorization from the designated change approver.** The assessed change must be authorized before the approved work proceeds.
3. **Test the approved rule change in the designated nonproduction environment.** Testing checks the intended behavior before the production system is changed.
4. **Implement the approved and tested rule change in production.** Production implementation follows approval and testing.
5. **Validate the result and update the change and configuration records.** Post-change validation confirms the outcome and records the resulting production state.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-128`

### SEC701-0000254 · matching · Objective 2.4 · medium

**Topic:** Malicious activity indicators

**Instruction:** Match each observation to the attack or malicious technique it most strongly indicates.

An analyst is triaging four unrelated observations from authentication, DNS, web, and endpoint evidence.

**Overall explanation:** The observations map to password spraying, DNS tunneling, typosquatting, and rootkit behavior based on the distinctive evidence in each case.

**Options:** Password spraying; DNS tunneling; Typosquatting; Rootkit

- One external source tries the same password once against many employee accounts. → **Password spraying**. Password spraying spreads a small number of password guesses across many accounts to avoid per-account lockouts.
- A host sends frequent DNS queries containing long, high-entropy subdomain labels. → **DNS tunneling**. Encoded or high-entropy labels can carry command-and-control or exfiltration data through DNS.
- A payroll sign-in link uses a domain that differs from the company domain by one character. → **Typosquatting**. Typosquatting uses lookalike or misspelled domains to deceive users.
- A memory image shows a privileged process that normal operating-system tools do not display. → **Rootkit**. Rootkits can conceal processes, drivers, files, or other artifacts from normal system tools.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-BRUTE-FORCE|SRC-MITRE-T1071-004|SRC-NIST-SP800-86`

### SEC701-0000255 · classification · Objective 2.3 · hard

**Topic:** Vulnerability categories

**Instruction:** Classify each finding by its primary vulnerability category. Categories may be used more than once.

A vulnerability review combines application findings, configuration errors, and supplier-related weaknesses.

**Overall explanation:** Application weaknesses arise in software logic, misconfigurations result from unsafe settings, and supply-chain weaknesses enter through trusted dependencies or supplier processes.

**Options:** Application vulnerability; Security misconfiguration; Supply-chain weakness

- An API verifies sign-in but does not verify that the user may access the requested customer record. → **Application vulnerability**. The missing per-object authorization check is an application-logic weakness.
- A cloud storage bucket containing internal reports is configured for public read access. → **Security misconfiguration**. The unsafe access setting exposes data because of configuration rather than application logic.
- A trusted vendor build pipeline is compromised and distributes a modified signed update to customers. → **Supply-chain weakness**. The weakness enters through a trusted supplier development and distribution process.
- A web application concatenates untrusted input directly into a database query. → **Application vulnerability**. Unsafe query construction is an application weakness that can enable injection.
- A newly deployed appliance still uses the vendor default administrator password. → **Security misconfiguration**. Leaving a default credential in place is an insecure configuration state.
- A dependency package is pulled automatically after the package publisher account is compromised. → **Supply-chain weakness**. A compromised upstream package source introduces risk through the software supply chain.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-OWASP-SQLI|SRC-OWASP-API1-BOLA|SRC-NIST-SP800-161R1`

### SEC701-0000256 · ordering · Objective 2.2 · easy

**Topic:** Credential phishing progression

**Instruction:** Place the attack actions in the order they would occur from preparation through account access.

An attacker uses a lookalike sign-in site to steal a user password and then signs in to the real service.

**Overall explanation:** The attack requires preparation of the deceptive site, delivery of the lure, credential capture, credential use, and successful account access in that sequence.

1. **Register or prepare the lookalike sign-in site.** The deceptive destination must exist before victims can be sent to it.
2. **Send the user a message containing the deceptive sign-in link.** The lure directs the user to the attacker-controlled site.
3. **Capture the credentials the user submits to the lookalike page.** The attacker obtains the password only after the victim enters it.
4. **Submit the stolen credentials to the legitimate service.** The captured credentials are then used against the real authentication service.
5. **Establish an authenticated session to the victim account.** Account access follows successful use of the stolen credentials.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-PHISHING`

### SEC701-0000257 · line_select · Objective 2.4 · medium

**Topic:** Password spraying evidence

**Instruction:** Select exactly FOUR lines that together show the password-spraying pattern.

Which authentication events form the strongest pattern of one source trying a password across several different accounts?

**Overall explanation:** Lines 1, 3, 5, and 6 show the same external source making a single failed attempt against four different accounts within seconds, which is characteristic of password spraying.

**Correct evidence lines:** 1, 3, 5, 6

```text
* 1: 09:14:01 FAIL user=adavis src=198.51.100.77 reason=bad_password
  2: 09:14:02 FAIL user=adavis src=203.0.113.18 reason=bad_password
* 3: 09:14:03 FAIL user=bchen src=198.51.100.77 reason=bad_password
  4: 09:14:04 SUCCESS user=svc_backup src=10.20.4.12 method=certificate
* 5: 09:14:05 FAIL user=cmorris src=198.51.100.77 reason=bad_password
* 6: 09:14:07 FAIL user=dpatel src=198.51.100.77 reason=bad_password
  7: 09:14:09 FAIL user=dpatel src=192.0.2.55 reason=bad_password
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-BRUTE-FORCE|SRC-NIST-SP800-92`

### SEC701-0000258 · line_select · Objective 2.4 · hard

**Topic:** Directory traversal evidence

**Instruction:** Select exactly TWO lines that contain directory-traversal attempts.

A web server blocks several suspicious requests. Which log entries most directly show attempts to escape the intended download directory?

**Overall explanation:** Lines 4 and 5 contain parent-directory traversal sequences, one in plain form and one URL-encoded, targeting operating-system files outside the intended download directory.

**Correct evidence lines:** 4, 5

```text
  1: 10:22:11 GET /index.html status=200 src=203.0.113.21
  2: 10:22:14 GET /images/logo.png status=200 src=203.0.113.21
  3: 10:22:19 GET /download?file=report.pdf status=200 src=198.51.100.44
* 4: 10:22:25 GET /download?file=../../../../etc/passwd status=403 src=198.51.100.88
* 5: 10:22:27 GET /download?file=..%2f..%2f..%2fetc%2fshadow status=403 src=198.51.100.88
  6: 10:22:31 GET /api/status status=200 src=192.0.2.19
  7: 10:22:42 POST /login status=401 src=203.0.113.50
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-MITRE-CWE22|SRC-NIST-SP800-92`

### SEC701-0000259 · matching · Objective 3.1 · easy

**Topic:** Cloud delivery models

**Instruction:** Match each requirement to the cloud delivery approach that best fits it.

A cloud architect is selecting different cloud delivery approaches for four workloads.

**Overall explanation:** The selected approach changes which platform layers the customer operates directly and how the workload is delivered.

**Options:** Infrastructure as a service; Platform as a service; Software as a service; Serverless computing

- The customer must manage the guest operating system, host firewall, and installed agents. → **Infrastructure as a service**. IaaS leaves guest operating systems and deployed software under customer control.
- Developers deploy application code while the provider manages the operating system and application runtime. → **Platform as a service**. PaaS provides the managed platform while customers deploy and secure their application code and data.
- Users consume a finished business application through a browser without managing its platform. → **Software as a service**. SaaS delivers the completed application as the provider-managed service.
- A short event-driven function runs on demand without the customer maintaining servers. → **Serverless computing**. Serverless execution abstracts server operation while the customer supplies the function code and configuration.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-145|SRC-NIST-SP800-144`

### SEC701-0000260 · classification · Objective 3.3 · medium

**Topic:** Data states

**Instruction:** Classify each example by the primary data state being protected. Categories may be used more than once.

A data-protection review covers stored records, network transfers, and information actively being processed.

**Overall explanation:** Data at rest is stored, data in transit is moving across a communication path, and data in use is actively processed in memory or by an application.

**Options:** Data at rest; Data in transit; Data in use

- An encrypted payroll file stored on an endpoint SSD. → **Data at rest**. The file is stored on persistent media and is therefore at rest.
- An API request protected by TLS while crossing the Internet. → **Data in transit**. The request is moving between systems over a network.
- A customer record decrypted in application memory while a calculation is performed. → **Data in use**. The record is actively being processed in memory.
- An encrypted database backup stored on offline media. → **Data at rest**. The backup is stored rather than being transmitted or processed.
- Replication traffic protected by IPsec between two sites. → **Data in transit**. The replication data is moving through a protected network tunnel.
- Decrypted transaction values loaded into memory for an analytics job. → **Data in use**. The values are actively processed by the analytics workload.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-RFC8446|SRC-NIST-SP800-77R1|SRC-NIST-SP800-53R5`

### SEC701-0000261 · ordering · Objective 3.4 · medium

**Topic:** Warm-site recovery sequence

**Instruction:** Place the recovery actions in the order used by the stated warm-site runbook.

A warm-site runbook declares the primary site unavailable before activating alternate resources, restores approved data before application validation, and redirects users only after validation succeeds.

**Overall explanation:** The runbook moves from declaration to alternate-site activation, data restoration, service validation, and user redirection.

1. **Declare the primary site unavailable and activate the recovery plan.** The recovery process begins after the incident meets the criteria for declaring the primary site unavailable.
2. **Activate the required compute, network, and access services at the warm site.** The alternate environment must be ready before application data and services are restored.
3. **Restore or synchronize the approved recovery data to the alternate environment.** The applications need the required recovery data before functional validation.
4. **Validate the critical application and security controls at the warm site.** Testing verifies that the recovered service and protections operate correctly before users are redirected.
5. **Redirect user and application traffic to the validated warm-site service.** Traffic moves only after the alternate service has been validated.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-34R1`

### SEC701-0000262 · line_select · Objective 3.2 · hard

**Topic:** Management interface hardening

**Instruction:** Select exactly TWO lines that most directly weaken management-interface security.

A network appliance is intended to permit secure administration only from trusted management networks. Which configuration lines should be corrected first?

**Overall explanation:** Line 2 permits management from any source, and line 4 enables the web administration interface over unencrypted HTTP.

**Correct evidence lines:** 2, 4

```text
  1: management_protocol = ssh
* 2: management_source = 0.0.0.0/0
  3: admin_mfa = required
* 4: web_admin_protocol = http
  5: web_admin_source = 10.20.0.0/16
  6: snmp_version = 3
  7: logging = remote
  8: session_timeout_minutes = 10
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-41R1|SRC-NIST-SP800-53R5`

### SEC701-0000263 · matching · Objective 4.4 · medium

**Topic:** Security monitoring tools

**Instruction:** Match each observation to the security tool most likely to produce it.

A SOC analyst is reviewing evidence collected from endpoint, network, correlation, and data-protection systems.

**Overall explanation:** EDR provides endpoint process telemetry, an IDS or IPS analyzes network attack patterns, a SIEM correlates events across sources, and DLP detects or blocks sensitive-data movement.

**Options:** EDR; IDS or IPS; SIEM; DLP

- A process tree shows a document reader spawning a script interpreter on one laptop. → **EDR**. Endpoint detection and response tools collect process and host activity from endpoints.
- A network alert identifies an exploit signature in traffic crossing a monitored segment. → **IDS or IPS**. IDS and IPS technologies inspect network traffic for suspicious or known attack patterns.
- An alert combines identity, endpoint, and firewall events into one correlated incident. → **SIEM**. A SIEM aggregates and correlates events from multiple security sources.
- An outbound upload is blocked because the file contains regulated identifiers. → **DLP**. DLP identifies sensitive information and can enforce rules that restrict its movement.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92|SRC-NIST-SP800-94|SRC-NIST-SP800-137`

### SEC701-0000264 · matching · Objective 4.6 · hard

**Topic:** Identity federation and access technologies

**Instruction:** Match each identity or access technology to the use case it most directly supports.

An identity team is selecting standards and controls for federation, delegated access, directory lookup, and phishing-resistant authentication.

**Overall explanation:** SAML exchanges federation assertions, OAuth supports delegated authorization, LDAP accesses directory information, and phishing-resistant authenticators reduce verifier-impersonation risk.

**Options:** SAML; OAuth; LDAP; Phishing-resistant authenticator

- Send a signed identity assertion from an identity provider to a service provider for browser SSO. → **SAML**. SAML is designed to exchange authentication and attribute assertions between identity and service providers.
- Let a user authorize an application to access a limited API scope without giving the application the user password. → **OAuth**. OAuth supports delegated authorization through scoped access tokens.
- Query a centralized directory for user and group attributes. → **LDAP**. LDAP is commonly used to access and manage directory information.
- Require an authenticator designed to resist credential replay through a fake sign-in site. → **Phishing-resistant authenticator**. Phishing-resistant authenticators bind authentication to the legitimate verifier or origin.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-OASIS-SAML2|SRC-RFC6749|SRC-NIST-SP800-63B-4|SRC-NIST-SP800-53R5`

### SEC701-0000265 · classification · Objective 4.3 · medium

**Topic:** Vulnerability management activities

**Instruction:** Classify each activity by its primary vulnerability-management stage. Categories may be used more than once.

A security team is reviewing activities from discovery through confirmation that a weakness has been corrected.

**Overall explanation:** Identification finds weaknesses, prioritization determines treatment order, remediation changes the vulnerable state, and validation confirms the treatment worked.

**Options:** Identification; Prioritization; Remediation; Validation

- A credentialed scanner discovers that a server is missing a security update. → **Identification**. The scan identifies a potential vulnerability.
- Threat intelligence shows active exploitation of a public-facing vulnerability on a critical system. → **Prioritization**. Exploit activity, exposure, and asset importance influence treatment priority.
- Administrators deploy the vendor security update to the affected servers. → **Remediation**. Applying the update changes the vulnerable state and is a remediation action.
- The team rescans the servers after deployment to confirm the finding is gone. → **Validation**. The rescan checks whether remediation successfully removed the vulnerability.
- A penetration tester discovers an authorization flaw that the automated scanner missed. → **Identification**. The manual test identifies an additional weakness.
- The team raises a finding because the affected asset processes regulated customer data. → **Prioritization**. Asset sensitivity changes the relative urgency of treatment.
- A firewall rule blocks the exposed vulnerable service until the permanent fix is ready. → **Remediation**. The compensating change reduces exposure and is a remediation or mitigation action.
- Testing confirms that the temporary block prevents access from untrusted networks. → **Validation**. The test verifies that the applied control has the intended effect.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-40R4|SRC-NIST-SP800-30R1`

### SEC701-0000266 · classification · Objective 4.9 · hard

**Topic:** Investigation data sources

**Instruction:** Classify each evidence item by the source that would most directly produce it. Categories may be used more than once.

An investigator is organizing identity, network, endpoint, and cloud evidence collected during an incident.

**Overall explanation:** Different data sources answer different investigative questions about identities, network activity, endpoint processes, and cloud control-plane changes.

**Options:** Identity or authentication log; Network or proxy log; Endpoint telemetry; Cloud control-plane audit log

- Successful sign-in with the username, MFA result, source address, and timestamp. → **Identity or authentication log**. Authentication systems directly record identity and sign-in events.
- A DNS query from an internal host to a newly observed external domain. → **Network or proxy log**. DNS and network monitoring provide evidence about host communications.
- A document reader spawns a script interpreter with a suspicious command line. → **Endpoint telemetry**. Endpoint telemetry records process creation and command-line activity.
- An administrator changes a cloud storage bucket policy to allow public access. → **Cloud control-plane audit log**. Cloud control-plane audit logs record administrative resource changes.
- Repeated failed sign-ins for one account from several source addresses. → **Identity or authentication log**. The identity system is the direct source for authentication outcomes.
- A proxy records a large HTTPS upload to an unsanctioned file-sharing domain. → **Network or proxy log**. Web proxy data records destination, user or device context, and transfer details.
- An endpoint sensor quarantines a file and records its hash and parent process. → **Endpoint telemetry**. Endpoint security telemetry records file and process activity on the host.
- A cloud administrator grants a new privileged role to a service identity. → **Cloud control-plane audit log**. The cloud audit trail records identity and policy changes made through the control plane.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92|SRC-NIST-SP800-86|SRC-NIST-SP800-137`

### SEC701-0000267 · ordering · Objective 4.8 · easy

**Topic:** Incident response phases

**Instruction:** Place the incident response phases in their typical sequence from preparation through improvement.

Arrange the major response phases so that the organization prepares before incidents, limits damage before removing the cause, and reviews lessons after service recovery.

**Overall explanation:** A common response sequence is preparation, detection and analysis, containment, eradication, recovery, and lessons learned.

1. **Preparation** Preparation establishes the people, tools, communications, and procedures needed before an incident.
2. **Detection and analysis** Detection and analysis determine whether an event is an incident and establish scope and impact.
3. **Containment** Containment limits additional damage and spread before the threat is removed.
4. **Eradication** Eradication removes malicious code, persistence, and exploited weaknesses after containment.
5. **Recovery** Recovery restores and validates normal operations after the threat has been removed.
6. **Lessons learned and improvement** Post-incident review identifies improvements to controls, procedures, and training.

**Sources:** `SRC-COMPTIA-SY0701-V6`

### SEC701-0000268 · ordering · Objective 4.6 · medium

**Topic:** Time-limited privileged access

**Instruction:** Place the privileged-access actions in the correct order from request through automatic removal.

Engineers receive database administrator rights only for approved maintenance windows through the privileged access management system.

**Overall explanation:** A controlled privileged-access workflow requests and approves the need, grants time-limited access, records its use, and removes the privilege when the approved window ends.

1. **Submit the privileged-access request with the maintenance purpose and time window.** The workflow begins with a documented business need and requested duration.
2. **Obtain approval from the designated privileged-access owner.** Authorization is required before elevated rights are granted.
3. **Have PAM grant the approved administrator role for the limited window.** PAM activates only the privilege authorized for the approved period.
4. **Perform the maintenance while the privileged session is logged or recorded.** The approved access is used with accountability during the maintenance activity.
5. **Automatically remove the elevated role when the approved window expires.** Automatic removal prevents the temporary privilege from becoming standing access.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000269 · line_select · Objective 4.9 · medium

**Topic:** Impossible travel investigation

**Instruction:** Select exactly TWO lines that create the strongest impossible-travel signal for the same account.

Which authentication events should the analyst correlate first when investigating the location-anomaly alert?

**Overall explanation:** Lines 1 and 2 show successful sign-ins for the same account from Orlando and Frankfurt only five minutes apart, creating the strongest impossible-travel signal in the evidence.

**Correct evidence lines:** 1, 2

```text
* 1: 13:02:11 SUCCESS user=jlee city=Orlando country=US src=198.51.100.21 mfa=passkey
* 2: 13:07:18 SUCCESS user=jlee city=Frankfurt country=DE src=203.0.113.70 mfa=push
  3: 13:09:02 SUCCESS user=mking city=Orlando country=US src=198.51.100.33 mfa=passkey
  4: 13:40:10 FAIL user=jlee city=Frankfurt country=DE src=203.0.113.70 reason=bad_password
  5: 15:10:55 SUCCESS user=jlee city=Orlando country=US src=198.51.100.21 mfa=passkey
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92|SRC-NIST-SP800-137`

### SEC701-0000270 · matching · Objective 5.1 · easy

**Topic:** Governance document types

**Instruction:** Match each governance document type to the description that best fits it.

A governance review compares organization-wide direction with mandatory specifications, repeatable instructions, and recommended practices.

**Overall explanation:** Policies set management direction, standards define mandatory requirements, procedures provide repeatable steps, and guidelines recommend practices that allow judgment.

**Options:** Policy; Standard; Procedure; Guideline

- States management direction that sensitive company data must be protected. → **Policy**. A policy establishes high-level management intent and expectations.
- Requires approved encryption algorithms and minimum key sizes for protected data. → **Standard**. A standard defines specific mandatory requirements used to implement policy.
- Lists the steps the service desk follows to create and verify a new employee account. → **Procedure**. A procedure provides repeatable step-by-step instructions for performing an activity.
- Recommends safer practices employees should consider when using networks while traveling. → **Guideline**. A guideline provides recommended practices and allows situational judgment.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-CSF2|SRC-NIST-SP800-53R5`

### SEC701-0000271 · classification · Objective 5.2 · medium

**Topic:** Risk treatment strategies

**Instruction:** Classify each decision by its primary risk treatment strategy. Categories may be used more than once.

A risk committee is reviewing different decisions for reducing, shifting, eliminating, or knowingly retaining risk.

**Overall explanation:** Avoidance removes the risky activity, transfer shifts part of the financial or contractual impact, mitigation reduces likelihood or impact, and acceptance knowingly retains the remaining risk.

**Options:** Avoid; Transfer; Mitigate; Accept

- Discontinue an optional Internet-facing service that creates more risk than business value. → **Avoid**. Ending the activity removes the source of that risk.
- Purchase cyber insurance to cover part of the financial impact of a qualifying incident. → **Transfer**. Insurance transfers a defined portion of financial impact to the insurer under the policy terms.
- Require phishing-resistant authentication for administrators to reduce account-compromise likelihood. → **Mitigate**. The control reduces the likelihood or impact of the identified threat.
- Document and approve a low residual risk that falls within the established tolerance. → **Accept**. The organization knowingly retains the remaining risk after review.
- Remove an unnecessary data-collection feature so the organization no longer stores that sensitive field. → **Avoid**. Removing the activity eliminates the associated storage and exposure risk.
- Use a contract that assigns specified financial responsibility to a service provider for defined failures. → **Transfer**. The contract shifts specified consequences to another party, although the organization still retains some risk.
- Segment and closely monitor a legacy system while its replacement is being completed. → **Mitigate**. The temporary controls reduce exposure without eliminating the underlying system risk.
- A risk owner formally accepts a small remaining exposure until the planned replacement date. → **Accept**. The owner acknowledges and retains the residual risk for the approved period.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-30R1|SRC-NIST-CSF2`

### SEC701-0000272 · ordering · Objective 5.3 · hard

**Topic:** Third-party risk lifecycle

**Instruction:** Place the third-party risk activities in the correct lifecycle order from planning through offboarding.

An organization is engaging a provider that will process regulated customer data and operate a critical service.

**Overall explanation:** A controlled vendor lifecycle defines requirements before selection, performs due diligence before contracting and onboarding, monitors the relationship during service, and removes access and handles data at termination.

1. **Define the security, privacy, resilience, and data-handling requirements for the service.** Requirements must be known before the organization can evaluate candidate providers.
2. **Assess the provider and important subcontractors against the defined requirements.** Due diligence evaluates whether the provider can meet the required controls and obligations.
3. **Execute the agreement with required security clauses, service targets, notification terms, and assurance rights.** Contractual obligations should be established before access and regulated processing begin.
4. **Provision only the approved access and data flows needed for the contracted service.** Onboarding implements the least-privilege connection after the relationship is approved and contracted.
5. **Monitor performance, control evidence, incidents, material changes, and supplier risk during the relationship.** Ongoing monitoring addresses changes that occur after the initial assessment.
6. **Revoke access and complete required data return, retention, or verified destruction when the relationship ends.** Termination activities remove access and resolve data obligations at the end of the lifecycle.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1|SRC-NIST-SP800-47R1`

### SEC701-0000273 · line_select · Objective 5.3 · medium

**Topic:** Vendor due diligence evidence

**Instruction:** Select exactly TWO lines that require the most direct follow-up before contract approval.

The provider will process regulated data and host a critical service. Which questionnaire responses reveal the clearest unresolved notification or resilience concerns?

**Overall explanation:** Line 2 lacks a measurable incident-notification deadline, and line 5 places primary and backup copies in the same region, creating a correlated recovery dependency.

**Correct evidence lines:** 2, 5

```text
  1: 1. Encryption: customer data is encrypted at rest and in transit.
* 2: 2. Incident notification: customers are notified as resources permit; no contractual deadline is defined.
  3: 3. Independent assessment: an external control assessment is completed annually.
  4: 4. Subprocessors: a maintained list is provided to customers and material changes are communicated.
* 5: 5. Backups: production data and backup copies are stored in the same cloud region.
  6: 6. Administrator access: MFA is required and privileged activity is logged.
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1|SRC-NIST-SP800-47R1|SRC-NIST-SP800-34R1`

### SEC701-0000274 · line_select · Objective 5.6 · easy

**Topic:** Phishing message indicators

**Instruction:** Select exactly TWO lines that most directly indicate the message may be phishing.

An employee receives the following payroll message. Which lines should cause the employee to verify the request through a trusted channel instead of using the message?

**Overall explanation:** Line 2 sends replies to a different lookalike domain, and line 6 uses a deceptive hostname whose actual destination is not the company payroll domain.

**Correct evidence lines:** 2, 6

```text
  1: From: Payroll Team <payroll@company.example>
* 2: Reply-To: payroll-help@company-pay.example
  3: Subject: Updated direct-deposit portal
  4: Hello,
  5: To avoid a processing delay, review your banking details today:
* 6: https://company-payroll.example.secure-login.example/verify
  7: Contact the service desk through the normal company directory if you have questions.
```

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-PHISHING`

