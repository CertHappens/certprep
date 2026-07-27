# SEC-701 Batch 010 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-010`
- Questions: 25
- IDs: `SEC701-0000201` through `SEC701-0000225`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Approval date: `2026-07-27`
- Approved production questions after Batch 010: 225
- Draft questions remaining: 0
- Domain allocation: 3 / 6 / 4 / 7 / 5
- Difficulty distribution: easy = 6, medium = 13, hard = 6
- Question types: single_choice = 9, multi_select = 6, best_available = 10
- Final cumulative correct-key inclusion: A = 58, B = 58, C = 58, D = 58
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity stem conflicts: none

This batch implements the expanded Security+ writing standard by adding a substantial number of multi-select and best-available questions. Several best-available scenarios intentionally include a plausible secondary control or response, with the scenario constraints establishing the stronger choice.

## Domain coverage

| Domain | Before | Added | Total | Total share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 24 | 3 | 27 | 12.0% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 44 | 6 | 50 | 22.2% | 22% |
| 3.0 Security Architecture | 36 | 4 | 40 | 17.8% | 18% |
| 4.0 Security Operations | 56 | 7 | 63 | 28.0% | 28% |
| 5.0 Security Program Management and Oversight | 40 | 5 | 45 | 20.0% | 20% |

## Question-by-question review

### SEC701-0000201 · Objective 1.1 · multi_select · medium

**Topic:** Preventive controls

**Instruction:** Select TWO answers.

A company is reviewing controls by their primary function. Which TWO controls are primarily preventive?

- **A.** Application allowlisting that blocks unapproved executables
- **B.** A badge-controlled turnstile that blocks unauthorized entry
- **C.** A SIEM alert that reports a suspicious sign-in
- **D.** Restoring an altered configuration from a protected backup

**Stored correct answer(s):** A|B

**Why correct:** Application allowlisting and a badge-controlled turnstile are intended to stop unauthorized software execution and physical entry before they occur.

**Choice explanations:**

- A: Allowlisting prevents execution unless software is explicitly permitted.
- B: The turnstile is a physical barrier that prevents entry without authorization.
- C: A SIEM alert is primarily detective because it reports activity.
- D: Restoring a configuration is corrective because it repairs an affected state.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000202 · Objective 1.2 · best_available · hard

**Topic:** Dual control for key operations

**Instruction:** Choose the BEST response.

An organization stores a root signing key in a hardware security module. No single administrator should be able to export or activate the key alone. Which control best satisfies the requirement?

- **A.** Require one administrator to document each key operation after completion
- **B.** Assign key administration to a role that is reviewed annually
- **C.** Require an M-of-N dual-control process in which multiple authorized custodians must participate in the sensitive operation
- **D.** Store a recovery copy of the key in the same administrator's password vault

**Stored correct answer(s):** C

**Why correct:** An M-of-N dual-control design requires multiple trusted participants to complete the sensitive key operation, preventing unilateral use by one administrator.

**Choice explanations:**

- A: After-the-fact documentation improves accountability but does not stop one person from acting alone.
- B: Role assignment and access review are useful, but one role holder could still perform the operation independently.
- C: Dual control directly enforces the requirement that multiple custodians participate before the HSM operation can proceed.
- D: A recovery copy controlled by the same person defeats the separation the requirement is intended to create.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-57P1R5|SRC-NIST-SP800-53R5`

### SEC701-0000203 · Objective 1.4 · single_choice · easy

**Topic:** Digital signatures

**Instruction:** Choose one answer.

A sender digitally signs a document but does not encrypt it. What protection does the signature primarily provide?

- **A.** Confidentiality of the document contents
- **B.** Availability if the storage system fails
- **C.** Anonymous access to the document
- **D.** Integrity and evidence of the signing identity

**Stored correct answer(s):** D

**Why correct:** A digital signature supports integrity and origin authentication. It does not conceal the document unless encryption is also used.

**Choice explanations:**

- A: Confidentiality requires encryption or another access-control mechanism.
- B: A signature does not keep the document available during a storage outage.
- C: A signature links the document to a signing identity rather than providing anonymity.
- D: Signature verification can detect modification and validate the signing key.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-FIPS186-5`

### SEC701-0000204 · Objective 2.1 · multi_select · medium

**Topic:** Malicious insider indicators

**Instruction:** Select TWO answers.

Investigators are deciding whether a data theft was more likely performed by a malicious insider than by an external attacker. Which TWO facts most strongly support the insider assessment?

- **A.** The attacker connected through a commercially available VPN service
- **B.** The attacker sent generic phishing messages to public email addresses
- **C.** The files were accessed through an employee's valid assigned account
- **D.** The activity targeted unpublished project names and internal storage paths known mainly to the project team

**Stored correct answer(s):** C|D

**Why correct:** Use of legitimate assigned access and detailed knowledge of internal project names and storage paths strongly support an insider hypothesis.

**Choice explanations:**

- A: Commercial VPN use can be associated with many external and internal actors.
- B: Generic phishing is commonly used by external attackers and does not indicate trusted access.
- C: Use of an employee's assigned access is consistent with insider activity, although credential theft must still be considered.
- D: Knowledge of unpublished internal naming and locations supports direct organizational familiarity.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-INSIDER-THREAT`

### SEC701-0000205 · Objective 2.1 · best_available · easy

**Topic:** Competitor motivation

**Instruction:** Choose the BEST answer.

Investigators determine that contractors working for a rival manufacturer stole prototype designs so the rival could release a competing product sooner. Which threat actor best fits the evidence?

- **A.** A competitor seeking commercial advantage
- **B.** A hacktivist seeking ideological change
- **C.** An unskilled attacker seeking recognition
- **D.** An insider acting only through accidental error

**Stored correct answer(s):** A

**Why correct:** The theft directly benefits a rival business by accelerating its competing product, which is a competitor-driven commercial motive.

**Choice explanations:**

- A: The actor and motive align with corporate competition and market advantage.
- B: Hacktivism is driven by political, social, or ideological objectives.
- C: The operation has a focused commercial purpose rather than notoriety.
- D: The contractors acted intentionally rather than through an accidental mistake.

**Sources:** `SRC-COMPTIA-SY0701-V6`

### SEC701-0000206 · Objective 2.2 · best_available · hard

**Topic:** Software supply-chain compromise

**Instruction:** Choose the BEST answer.

Attackers compromise a software vendor's build environment and insert malicious code into an update distributed through the vendor's normal update service to many customers. Which attack vector best describes the intrusion?

- **A.** A watering-hole attack
- **B.** A software supply-chain attack
- **C.** Credential stuffing
- **D.** Removable-media baiting

**Stored correct answer(s):** B

**Why correct:** The attackers compromise a trusted software production and distribution process so customers receive malicious code through the legitimate supply chain.

**Choice explanations:**

- A: A watering-hole attack compromises a website that intended victims are likely to visit. Here, the compromised mechanism is the vendor's build and update process.
- B: The malicious update is introduced through a trusted supplier and distributed to downstream customers.
- C: Credential stuffing reuses stolen username-and-password pairs.
- D: Removable-media baiting relies on devices such as planted USB drives.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1`

### SEC701-0000207 · Objective 2.3 · single_choice · medium

**Topic:** Broken object-level authorization

**Instruction:** Choose one answer.

An API request for /accounts/145 returns an authenticated user's account. Changing the identifier to /accounts/146 returns another customer's account because the API verifies authentication but not access to the requested object. Which vulnerability is present?

- **A.** Cross-site request forgery
- **B.** Integer overflow
- **C.** Broken object-level authorization
- **D.** DNS cache poisoning

**Stored correct answer(s):** C

**Why correct:** The API accepts an object identifier without verifying that the authenticated user is authorized to access that particular object.

**Choice explanations:**

- A: CSRF causes a victim's browser to submit an unwanted authenticated request.
- B: An integer overflow involves arithmetic exceeding a numeric range.
- C: The missing per-object authorization check is the defining BOLA condition.
- D: DNS cache poisoning inserts false name-resolution data into a resolver cache.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-OWASP-API1-BOLA`

### SEC701-0000208 · Objective 2.4 · multi_select · medium

**Topic:** DNS tunneling indicators

**Instruction:** Select TWO answers.

A security analyst suspects an endpoint is using DNS tunneling for command and control or data transfer. Which TWO observations most strongly support that hypothesis?

- **A.** Large numbers of long, high-entropy subdomain labels sent to one external domain
- **B.** The default gateway's MAC address changes after a switch replacement
- **C.** Unusually long and frequent TXT queries with encoded-looking content
- **D.** Several users mistype their passwords after a scheduled password change

**Stored correct answer(s):** A|C

**Why correct:** High-entropy subdomains and repeated long TXT queries can carry encoded data through DNS, making them strong tunneling indicators.

**Choice explanations:**

- A: Encoded data is often placed in generated subdomain labels for tunneling.
- B: A gateway MAC change may relate to network maintenance or ARP behavior, not DNS tunneling.
- C: TXT records can carry relatively large encoded payloads and are commonly reviewed during DNS-tunneling investigations.
- D: Password errors do not indicate data transfer through DNS.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-MITRE-T1071-004|SRC-NIST-SP800-92`

### SEC701-0000209 · Objective 2.5 · best_available · hard

**Topic:** Third-party remote access

**Instruction:** Choose the BEST response.

A vendor technician needs access to one internal management application for two weeks. The organization wants strong identity verification, device posture checks, time-limited access, and no general network visibility. Which approach best meets the requirement?

- **A.** Provide a traditional full-network VPN and rely on endpoint detection software to identify misuse
- **B.** Provide identity-aware, application-specific access with device posture requirements and an automatic expiration date
- **C.** Create a shared administrator account and restrict use through policy
- **D.** Allow access from the vendor's public IP address without user authentication

**Stored correct answer(s):** B

**Why correct:** Application-specific, identity-aware access provides the needed resource without exposing the broader network and can enforce device and time conditions.

**Choice explanations:**

- A: A full-network VPN plus endpoint monitoring is plausible, but it grants broader connectivity than the technician requires.
- B: The approach directly applies least privilege, device trust, strong identity, and time-bound access.
- C: A shared account weakens attribution, revocation, and accountability.
- D: An IP address alone is not a sufficient user identity or authorization control.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-207|SRC-NIST-SP800-46R2`

### SEC701-0000210 · Objective 3.1 · best_available · medium

**Topic:** Infrastructure as a service

**Instruction:** Choose the BEST answer.

A company wants cloud scalability but must retain control of the guest operating system, installed security agents, host firewall, and application runtime. The provider may manage physical facilities, hardware, and the virtualization layer. Which service model best fits?

- **A.** Software as a service
- **B.** Platform as a service
- **C.** Infrastructure as a service
- **D.** A fully managed business application

**Stored correct answer(s):** C

**Why correct:** IaaS gives the customer control of guest operating systems and deployed software while the provider manages the underlying physical and virtual infrastructure.

**Choice explanations:**

- A: SaaS provides a completed application and gives the customer much less control over the operating system and runtime.
- B: PaaS normally leaves the runtime and operating-system platform under provider management.
- C: IaaS aligns with the requirement for customer-managed guests, agents, firewalls, and application components.
- D: A fully managed application is effectively a SaaS-style model and does not provide the requested system control.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-145|SRC-NIST-SP800-144`

### SEC701-0000211 · Objective 3.2 · single_choice · easy

**Topic:** Port-based network access control

**Instruction:** Choose one answer.

Which technology authenticates a user or device before a wired switch port or wireless connection receives normal network access?

- **A.** IEEE 802.1X
- **B.** Network address translation
- **C.** DNSSEC
- **D.** Full-disk encryption

**Stored correct answer(s):** A

**Why correct:** IEEE 802.1X provides port-based network access control using a supplicant, an authenticator, and an authentication server.

**Choice explanations:**

- A: 802.1X controls network admission before normal access is granted.
- B: NAT translates network addresses and does not authenticate endpoints.
- C: DNSSEC protects DNS data authenticity and integrity.
- D: Full-disk encryption protects stored data rather than network admission.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-153|SRC-NIST-SP800-53R5`

### SEC701-0000212 · Objective 3.3 · multi_select · medium

**Topic:** Protecting data in transit

**Instruction:** Select TWO answers.

Which TWO technologies are primarily used to protect data in transit across untrusted networks?

- **A.** Full-disk encryption on an endpoint
- **B.** TLS protecting an application session
- **C.** Data masking in a nonproduction database
- **D.** An IPsec tunnel between network gateways

**Stored correct answer(s):** B|D

**Why correct:** TLS protects application sessions, while IPsec can protect IP traffic across a network tunnel. Both address data in transit.

**Choice explanations:**

- A: Full-disk encryption primarily protects data at rest on the endpoint.
- B: TLS provides confidentiality and integrity for application-layer communications.
- C: Masking obscures stored field values and is not a transport protocol.
- D: IPsec can authenticate and encrypt network-layer traffic between gateways.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-RFC8446|SRC-NIST-SP800-77R1`

### SEC701-0000213 · Objective 3.4 · best_available · medium

**Topic:** Near-zero recovery objectives

**Instruction:** Choose the BEST architecture.

A transaction service requires recovery within 30 seconds after a site failure and cannot lose committed transactions. Which design best supports both requirements?

- **A.** A weekly full backup stored offsite
- **B.** A cold site with hardware delivery contracts
- **C.** A warm standby using asynchronous replication every 15 minutes
- **D.** An active-active design across independent locations with synchronous transaction replication and automated traffic failover

**Stored correct answer(s):** D

**Why correct:** Active-active processing with synchronous replication and automatic failover best supports a very short RTO and no loss of committed transactions.

**Choice explanations:**

- A: A weekly backup would permit substantial data loss and lengthy restoration.
- B: A cold site cannot meet a 30-second recovery requirement.
- C: A warm standby is plausible for rapid recovery, but 15-minute asynchronous replication does not meet the no-data-loss requirement.
- D: The sites are already active, committed transactions are synchronized, and traffic can fail over automatically.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-34R1|SRC-NIST-GLOSSARY-RPO-RTO`

### SEC701-0000214 · Objective 4.3 · best_available · hard

**Topic:** Risk-based vulnerability prioritization

**Instruction:** Choose the BEST response.

A scanner finds a CVSS 9.8 vulnerability on an isolated lab server with no sensitive data and strong compensating controls. It also finds a CVSS 7.5 vulnerability on a public identity gateway, and reliable threat intelligence shows active exploitation. Which finding should be remediated first?

- **A.** The identity gateway finding, because exposure, active exploitation, business criticality, and potential impact outweigh the lower base score
- **B.** The lab finding, because the highest CVSS score should determine priority alone
- **C.** Neither finding until the next annual audit
- **D.** Whichever finding was discovered first, regardless of context

**Stored correct answer(s):** A

**Why correct:** Vulnerability priority should incorporate exploit activity, exposure, asset criticality, and impact rather than relying on the base severity score alone.

**Choice explanations:**

- A: The public critical identity service and active exploitation create the more urgent contextual risk.
- B: The lab vulnerability is severe and still requires treatment, but the compensating controls and isolation reduce its immediate risk.
- C: Known exploitable weaknesses should not wait for an unrelated annual event.
- D: Discovery order is not a defensible substitute for risk-based prioritization.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-40R4|SRC-NIST-SP800-30R1`

### SEC701-0000215 · Objective 4.4 · single_choice · easy

**Topic:** Security orchestration automation and response

**Instruction:** Choose one answer.

Which platform is designed to enrich alerts, open cases, coordinate response playbooks, and automate actions across multiple security tools?

- **A.** A certificate authority
- **B.** A SOAR platform
- **C.** A recursive DNS resolver
- **D.** A disk-encryption utility

**Stored correct answer(s):** B

**Why correct:** SOAR platforms integrate security tools, enrich alerts, manage cases, and coordinate automated or analyst-approved response playbooks.

**Choice explanations:**

- A: A certificate authority issues and manages digital certificates.
- B: SOAR combines orchestration, automation, and response workflow management.
- C: A recursive resolver performs DNS lookups.
- D: Disk encryption protects stored data and does not coordinate security workflows.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-61R3|SRC-NIST-SP800-137`

### SEC701-0000216 · Objective 4.5 · multi_select · medium

**Topic:** Enterprise phishing defenses

**Instruction:** Select TWO answers.

An organization wants enterprise controls that most directly reduce both delivery of credential-phishing messages and successful account takeover when a phishing page is reached. Which TWO controls best address those goals?

- **A.** A secure email gateway that analyzes links, attachments, reputation, and message-authentication results
- **B.** Full-disk encryption on employee laptops
- **C.** Longer retention for building access-control logs
- **D.** Phishing-resistant authentication for user accounts

**Stored correct answer(s):** A|D

**Why correct:** The email gateway reduces malicious-message delivery, while phishing-resistant authentication reduces the chance that a deceptive site can complete account takeover.

**Choice explanations:**

- A: The gateway directly filters and analyzes inbound email threats.
- B: Disk encryption protects stored data but does not block phishing messages or credential relay.
- C: Physical-access log retention does not directly address email phishing.
- D: Phishing-resistant authenticators are designed to resist verifier impersonation and credential relay.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-PHISHING|SRC-NIST-SP800-63B-4`

### SEC701-0000217 · Objective 4.6 · best_available · medium

**Topic:** Context-aware authorization

**Instruction:** Choose the BEST access-control model.

Employees and contractors may share the same application role, but contractor access must also depend on the assigned project, a compliant managed device, approved hours, and the contract end date. Which model best expresses the policy?

- **A.** Discretionary access control
- **B.** Role-based access control alone
- **C.** Attribute-based access control
- **D.** A shared account protected by a strong password

**Stored correct answer(s):** C

**Why correct:** ABAC evaluates subject, resource, device, environmental, and time attributes to make a contextual authorization decision.

**Choice explanations:**

- A: DAC lets an owner grant permissions but does not naturally express all of the required contextual conditions.
- B: RBAC is plausible because the users share a role, but role membership alone cannot express project, device, time, and contract attributes.
- C: ABAC directly models the multiple conditions in the policy.
- D: A shared account removes individual accountability and cannot enforce the stated contextual restrictions.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5|SRC-NIST-SP800-207`

### SEC701-0000218 · Objective 4.7 · single_choice · medium

**Topic:** Security orchestration

**Instruction:** Choose one answer.

A response workflow coordinates an EDR platform, identity provider, firewall, and ticketing system so that each tool performs a different step in the same incident process. Which concept is most directly demonstrated?

- **A.** Data masking
- **B.** Orchestration
- **C.** Cryptographic erasure
- **D.** Tokenization

**Stored correct answer(s):** B

**Why correct:** Orchestration coordinates actions and information across multiple tools and systems as part of one workflow.

**Choice explanations:**

- A: Data masking obscures sensitive values.
- B: The workflow coordinates several independent security platforms.
- C: Cryptographic erasure destroys access to encrypted data by destroying keys.
- D: Tokenization replaces sensitive values with surrogate tokens.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-61R3`

### SEC701-0000219 · Objective 4.8 · best_available · hard

**Topic:** Safety-aware incident containment

**Instruction:** Choose the BEST immediate response.

A critical medical device shows signs of malware communication. The device is actively supporting patient care, and an immediate shutdown could create a safety risk. What should the response team do first?

- **A.** Coordinate with clinical and engineering staff to contain the device's network communication while preserving its required safe function and evidence
- **B.** Immediately reimage the device without consulting the clinical team
- **C.** Leave the device fully connected until the next maintenance cycle
- **D.** Delete all logs to prevent sensitive medical information from being exposed

**Stored correct answer(s):** A

**Why correct:** The immediate priority is controlled containment that reduces malicious communication while accounting for patient safety, operations, and evidence needs.

**Choice explanations:**

- A: This response balances containment with safety and prepares for later eradication and recovery.
- B: Reimaging may ultimately be appropriate, but doing it immediately could interrupt care, destroy evidence, and bypass safety coordination.
- C: Leaving the device fully connected permits continued spread or command activity.
- D: Deleting logs destroys evidence and does not safely contain the device.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-61R3|SRC-NIST-SP800-82R3`

### SEC701-0000220 · Objective 4.9 · single_choice · medium

**Topic:** Web proxy investigation logs

**Instruction:** Choose one answer.

An investigator suspects a user account uploaded a large archive to an unauthorized cloud-storage site over HTTPS. Which data source is most likely to identify the authenticated user, destination URL or category, timestamp, and transferred byte count?

- **A.** A DHCP scope configuration
- **B.** A certificate revocation list
- **C.** A secure web proxy log
- **D.** A physical badge inventory

**Stored correct answer(s):** C

**Why correct:** A secure web proxy log can associate authenticated users with web destinations, request timing, policy decisions, and data-transfer volume.

**Choice explanations:**

- A: DHCP data can map devices to addresses but does not normally provide URL and upload details.
- B: A revocation list reports certificate trust status.
- C: The proxy log contains the web-session context requested by the investigator.
- D: A badge inventory tracks physical credentials rather than HTTPS activity.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92|SRC-NIST-SP800-41R1`

### SEC701-0000221 · Objective 5.1 · best_available · medium

**Topic:** Key risk indicators

**Instruction:** Choose the BEST metric.

The board wants an indicator that can signal increasing cyber exposure before a major incident occurs. Which metric best serves as a key risk indicator?

- **A.** The number of security policies formatted during the quarter
- **B.** The percentage of critical vulnerabilities that remain past the remediation SLA
- **C.** The number of attendees at the monthly security meeting
- **D.** The number of pages in the incident-response plan

**Stored correct answer(s):** B

**Why correct:** The percentage of overdue critical vulnerabilities reflects accumulating exposure and can warn leadership that risk is increasing.

**Choice explanations:**

- A: Policy formatting is an activity measure and does not directly indicate exposure.
- B: Overdue critical findings are closely tied to the likelihood and impact of compromise, making the metric risk-oriented.
- C: Meeting attendance may measure participation but not whether cyber risk is rising.
- D: Document length does not indicate plan effectiveness or current exposure.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-CSF2|SRC-NIST-IR8286A-R1`

### SEC701-0000222 · Objective 5.2 · multi_select · hard

**Topic:** Annual loss expectancy inputs

**Instruction:** Select THREE answers.

Which THREE values are needed to calculate annual loss expectancy using the standard relationships SLE = asset value × exposure factor and ALE = SLE × annualized rate of occurrence?

- **A.** Risk appetite
- **B.** Asset value
- **C.** Exposure factor
- **D.** Annualized rate of occurrence

**Stored correct answer(s):** B|C|D

**Why correct:** Asset value and exposure factor determine single loss expectancy, and the annualized rate of occurrence converts that loss into annual loss expectancy.

**Choice explanations:**

- A: Risk appetite guides decisions about acceptable risk but is not part of the ALE arithmetic.
- B: Asset value is multiplied by the exposure factor to calculate SLE.
- C: The exposure factor represents the expected percentage of asset value lost in one event.
- D: ARO is multiplied by SLE to calculate ALE.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-RISK-ALE`

### SEC701-0000223 · Objective 5.3 · single_choice · easy

**Topic:** Right-to-audit clauses

**Instruction:** Choose one answer.

Which contract provision gives a customer the ability to examine a vendor's relevant controls or obtain agreed independent assessment evidence?

- **A.** A right-to-audit clause
- **B.** A force majeure clause
- **C.** A marketing exclusivity clause
- **D.** A product discount schedule

**Stored correct answer(s):** A

**Why correct:** A right-to-audit clause establishes the customer's ability to verify agreed security and compliance obligations through audits or specified evidence.

**Choice explanations:**

- A: The clause provides an explicit verification mechanism for vendor controls.
- B: Force majeure addresses exceptional events affecting contractual performance.
- C: Marketing exclusivity controls promotional or sales relationships.
- D: A discount schedule defines pricing rather than assurance rights.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1`

### SEC701-0000224 · Objective 5.5 · single_choice · medium

**Topic:** Evidence of operating effectiveness

**Instruction:** Choose one answer.

An auditor is evaluating whether a privileged-access review control operated effectively throughout the previous six months. Which evidence is most useful?

- **A.** A policy stating that privileged access should be reviewed
- **B.** A diagram showing where the identity system is hosted
- **C.** A vendor brochure describing access-governance features
- **D.** A representative sample of completed review records, approvals, exceptions, and remediation evidence from across the six-month period

**Stored correct answer(s):** D

**Why correct:** Operating effectiveness requires evidence that the control was repeatedly performed, reviewed, and followed up during the period under assessment.

**Choice explanations:**

- A: The policy supports control design but does not show that reviews actually occurred.
- B: The hosting diagram provides architecture context but not evidence of review execution.
- C: A product brochure describes capability rather than the organization's actual control operation.
- D: Sampled records across the period demonstrate performance, approval, exceptions, and corrective follow-up.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-115|SRC-NIST-SP800-53R5`

### SEC701-0000225 · Objective 5.6 · single_choice · easy

**Topic:** Lost badge reporting

**Instruction:** Choose one answer.

An employee discovers that a building access badge is missing. What should the employee do first?

- **A.** Wait several days in case the badge appears
- **B.** Borrow a coworker's badge and avoid reporting the loss
- **C.** Post the badge number publicly so others can help search
- **D.** Report the loss through the approved process so the badge can be deactivated and replacement procedures can begin

**Stored correct answer(s):** D

**Why correct:** Prompt reporting allows the organization to revoke the missing credential and reduce the period in which it could be misused.

**Choice explanations:**

- A: Waiting extends the exposure window if someone else has the badge.
- B: Sharing another badge violates accountability and does not address the missing credential.
- C: Publishing the badge number may provide useful information to an attacker.
- D: Immediate reporting supports deactivation, investigation, and controlled replacement.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

## Similarity review

- Closest non-duplicate comparison: `SEC701-0000052` and `SEC701-0000223` with similarity score 0.68.
- Closest non-duplicate comparison: `SEC701-0000129` and `SEC701-0000205` with similarity score 0.55.
- Closest non-duplicate comparison: `SEC701-0000009` and `SEC701-0000197` with similarity score 0.53.
- Closest non-duplicate comparison: `SEC701-0000054` and `SEC701-0000126` with similarity score 0.52.
- Closest non-duplicate comparison: `SEC701-0000018` and `SEC701-0000111` with similarity score 0.51.

## Ongoing review path

Questions may be exercised on staging before production deployment. Issues found through testing or the question-reporting feature can be corrected through versioning or retirement without reusing permanent IDs.
