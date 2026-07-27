# SEC-701 Batch 009 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-009`
- Questions: 26
- IDs: `SEC701-0000175` through `SEC701-0000200`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Approval date: `2026-07-26`
- Approved production questions after Batch 009: 200
- Draft questions remaining: 0
- Domain allocation: 3 / 6 / 5 / 7 / 5
- Difficulty distribution: easy = 7, medium = 13, hard = 6
- Stored correct-answer distribution: A = 6, B = 6, C = 7, D = 7
- Final cumulative answer distribution: A = 50, B = 50, C = 50, D = 50
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity stem conflicts: none

The 26-question size was selected because it reaches the 200-question goal while allowing exact alignment with the official domain weights. The answer positions were also selected to produce a perfectly balanced cumulative distribution.

## Final domain coverage

| Domain | Before | Added | Final total | Final share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 21 | 3 | 24 | 12.0% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 38 | 6 | 44 | 22.0% | 22% |
| 3.0 Security Architecture | 31 | 5 | 36 | 18.0% | 18% |
| 4.0 Security Operations | 49 | 7 | 56 | 28.0% | 28% |
| 5.0 Security Program Management and Oversight | 35 | 5 | 40 | 20.0% | 20% |

## Question-by-question review

### SEC701-0000175 · Objective 1.1 · Easy · Direct

**Topic:** Corrective technical controls

After a file-integrity agent detects an unauthorized configuration change, it automatically restores the approved file from a protected copy. How should the automatic restoration action be classified?

- **A.** Managerial directive control
- **B.** Physical deterrent control
- **C.** Technical corrective control
- **D.** Operational detective control

**Stored correct answer:** C

**Why it is correct:** The restoration is performed by technology and corrects an unauthorized change by returning the file to its approved state.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000176 · Objective 1.2 · Medium · Scenario

**Topic:** Separation of duties

One administrator requests a firewall change, a different manager approves it, and another administrator implements it. Which fundamental security concept is most directly demonstrated?

- **A.** Separation of duties
- **B.** Data minimization
- **C.** Non-repudiation
- **D.** Obfuscation

**Stored correct answer:** A

**Why it is correct:** Separation of duties divides a sensitive process among multiple people so one individual cannot request, approve, and implement the change alone.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000177 · Objective 1.3 · Medium · Scenario

**Topic:** Change freezes

An online retailer permits only approved emergency changes during its highest-volume sales week. Routine feature and infrastructure changes are scheduled after the event. What is the primary security and operational purpose of this change freeze?

- **A.** To eliminate the need for configuration records
- **B.** To let administrators bypass testing when demand is high
- **C.** To prevent security teams from monitoring production systems
- **D.** To reduce the chance that nonessential changes introduce instability or weaken controls during a critical business period

**Stored correct answer:** D

**Why it is correct:** A change freeze limits avoidable production risk when availability and predictability are especially important, while still allowing controlled emergency work.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-128`

### SEC701-0000178 · Objective 2.1 · Easy · Scenario

**Topic:** Shadow IT

A business team begins storing customer files in an unapproved SaaS platform without involving security, procurement, or IT. Which threat-actor category best describes the source of this risk?

- **A.** Nation-state actor
- **B.** Shadow IT
- **C.** Organized crime
- **D.** Hacktivist

**Stored correct answer:** B

**Why it is correct:** Shadow IT occurs when employees or business units use technology outside approved organizational processes, creating unmanaged security and compliance risk.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000179 · Objective 2.2 · Medium · Scenario

**Topic:** Open service ports

A vendor enables a remote-management service on a public IP address and leaves its management port reachable from the Internet. An attacker finds the service through scanning and exploits it. Which attack surface most directly enabled the intrusion?

- **A.** A printed network diagram stored in a locked cabinet
- **B.** An encrypted backup stored offline
- **C.** An exposed open service port
- **D.** A disabled local account

**Stored correct answer:** C

**Why it is correct:** The reachable management service created a discoverable network entry point that the attacker could scan and target.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-41R1`

### SEC701-0000180 · Objective 2.3 · Hard · Scenario

**Topic:** Integer overflow

An application multiplies an untrusted item count by an item size using a fixed-width unsigned integer. A very large count causes the result to wrap to a small value, so the application allocates less memory than later code expects. Which vulnerability occurs first?

- **A.** Cross-site request forgery
- **B.** Directory traversal
- **C.** Session fixation
- **D.** Integer overflow or wraparound

**Stored correct answer:** D

**Why it is correct:** The arithmetic result exceeds the integer's representable range and wraps to an unexpected smaller value. That incorrect calculation can then lead to an undersized allocation and memory corruption.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-MITRE-CWE190`

### SEC701-0000181 · Objective 2.4 · Hard · Scenario

**Topic:** Rootkit indicators

A host-based scanner reports a suspicious kernel driver, but ordinary system utilities cannot see the driver, several related processes, or files that a forensic memory image confirms are present. Which malicious activity is most consistent with the evidence?

- **A.** A rootkit hiding system artifacts
- **B.** Password spraying
- **C.** A domain generation algorithm
- **D.** Business email compromise

**Stored correct answer:** A

**Why it is correct:** Rootkits alter or subvert low-level system behavior to conceal drivers, processes, files, or connections while maintaining privileged persistence.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-86|SRC-NIST-SP800-61R3`

### SEC701-0000182 · Objective 2.5 · Medium · Scenario

**Topic:** Authentication rate limiting

An Internet-facing sign-in service permits rapid repeated password attempts without delay. Which mitigation best reduces automated guessing while limiting the risk that an attacker can easily lock out every account?

- **A.** Display usernames in the error message
- **B.** Use progressive rate limiting and risk-based challenges, with carefully designed temporary lockouts and monitoring
- **C.** Allow more attempts from addresses that fail authentication frequently
- **D.** Disable authentication logging to improve sign-in speed

**Stored correct answer:** B

**Why it is correct:** Progressive throttling increases attacker cost without relying only on a simple permanent account lockout that can be abused for denial of service.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-BRUTE-FORCE|SRC-NIST-SP800-63B-4`

### SEC701-0000183 · Objective 2.5 · Medium · Scenario

**Topic:** Phishing-resistant authentication

Attackers use a reverse-proxy phishing site to relay passwords and one-time codes to a legitimate service in real time. Which mitigation most directly reduces the success of this technique?

- **A.** Require users to change passwords every week
- **B.** Send the same one-time code through both email and SMS
- **C.** Use phishing-resistant authenticators such as FIDO security keys or appropriately configured passkeys
- **D.** Remove the domain name from the browser address bar

**Stored correct answer:** C

**Why it is correct:** Phishing-resistant authenticators bind authentication to the legitimate verifier or origin, so a relay site cannot reuse the authentication response for a different site.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-63B-4`

### SEC701-0000184 · Objective 3.1 · Medium · Scenario

**Topic:** Platform as a service responsibility

A company deploys an application to a platform-as-a-service environment. The provider manages the physical infrastructure, operating system, and application runtime. Which responsibility most clearly remains with the customer?

- **A.** Replacing failed storage hardware in the provider's data center
- **B.** Patching the provider-managed host operating system
- **C.** Maintaining the provider's physical access-control system
- **D.** Securing the deployed application code, data, identities, configuration, and application secrets

**Stored correct answer:** D

**Why it is correct:** In PaaS, the provider manages the underlying platform, while the customer retains responsibility for the deployed application, its data, identities, settings, and secrets.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-145|SRC-NIST-SP800-144`

### SEC701-0000185 · Objective 3.2 · Easy · Scenario

**Topic:** Guest wireless isolation

Visitors need wireless Internet access but should not reach internal systems or communicate directly with other visitor devices. Which design best meets the requirement?

- **A.** Place guests on a separate VLAN with firewall rules allowing Internet access only, and enable wireless client isolation
- **B.** Use the employee VLAN and rely on visitors to avoid internal addresses
- **C.** Bridge the guest network directly to the server-management subnet
- **D.** Disable wireless encryption so onboarding is faster

**Stored correct answer:** A

**Why it is correct:** A separate network and firewall boundary protect internal resources, while client isolation reduces direct attacks between guest devices.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-153|SRC-NIST-SP800-41R1`

### SEC701-0000186 · Objective 3.3 · Hard · Scenario

**Topic:** Cryptographic erasure

An organization stores encrypted cloud objects on media it cannot physically sanitize. Each object set is protected by a unique organization-controlled encryption key. At the end of the retention period, which action can make the encrypted data infeasible to recover without rewriting the provider's media?

- **A.** Rename the cloud objects and remove them from the application index
- **B.** Securely destroy every accessible copy of the applicable encryption key and verify completion of the key-destruction process
- **C.** Compress the encrypted objects into a smaller archive
- **D.** Move the objects to a different folder in the same account

**Stored correct answer:** B

**Why it is correct:** Cryptographic erasure makes ciphertext inaccessible by securely destroying the encryption keys needed for recovery, provided the keys were properly controlled and no usable copies remain.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-88R2|SRC-NIST-SP800-57P1R5`

### SEC701-0000187 · Objective 3.3 · Medium · Scenario

**Topic:** Data classification labels

A company wants email, storage, and collaboration systems to apply different encryption, sharing, retention, and monitoring rules according to data sensitivity. Which foundation is most important for applying those controls consistently?

- **A.** A single public label for every record
- **B.** A list of employee browser preferences
- **C.** A defined classification and labeling scheme with ownership and handling requirements for each classification
- **D.** A policy that lets each user invent personal labels without guidance

**Stored correct answer:** C

**Why it is correct:** Consistent classifications and labels connect data sensitivity to defined handling rules that technical systems can recognize and enforce.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5|SRC-NIST-PRIVACY-FRAMEWORK`

### SEC701-0000188 · Objective 3.4 · Medium · Scenario

**Topic:** Snapshots and independent backups

A ransomware actor compromises a virtualization administrator account and encrypts virtual machines along with snapshots stored in the same environment. Which resilience improvement most directly addresses this failure?

- **A.** Create snapshots more frequently under the same administrator account
- **B.** Increase the virtual machines' CPU allocations
- **C.** Store additional snapshot names in a spreadsheet
- **D.** Maintain tested backups in a separately controlled location with immutable or offline protection and independent credentials

**Stored correct answer:** D

**Why it is correct:** Snapshots in the same control plane can share the compromise. Independently controlled protected backups provide a recovery path when production and local snapshots are affected together.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-34R1|SRC-NIST-SP800-53R5`

### SEC701-0000189 · Objective 4.1 · Hard · Scenario

**Topic:** Container image admission control

A Kubernetes environment should reject container images that were altered after the approved build or that came from an untrusted registry. Which control best enforces this requirement before a workload starts?

- **A.** Use an admission policy that verifies image signatures and approved registry provenance before allowing deployment
- **B.** Permit any image if the requested container name looks familiar
- **C.** Scan only the worker node's disk after the container exits
- **D.** Disable registry authentication to simplify image retrieval

**Stored correct answer:** A

**Why it is correct:** Admission-time signature and provenance verification blocks untrusted or tampered images before they execute in the cluster.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-190|SRC-NIST-SP800-53R5`

### SEC701-0000190 · Objective 4.2 · Easy · Scenario

**Topic:** Software inventory and authorization

Asset discovery finds an unapproved remote-access tool installed on several employee laptops. Which asset-management response is most appropriate?

- **A.** Remove the laptops from inventory so the finding no longer appears
- **B.** Identify the software, owner, business justification, approval and license status, then remove or formally authorize and manage it
- **C.** Allow the tool because it was installed by an employee
- **D.** Disable software inventory scans on the affected laptops

**Stored correct answer:** B

**Why it is correct:** Software asset management requires visibility, ownership, authorization, licensing, and lifecycle decisions. Unapproved software should be removed or brought under formal control.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000191 · Objective 4.4 · Medium · Scenario

**Topic:** Log normalization

A SIEM receives source-address data as src_ip from one product, clientAddress from another, and source from a third. Which processing step lets correlation rules treat these fields as the same type of information?

- **A.** Log deletion
- **B.** Packet fragmentation
- **C.** Log normalization into a common schema
- **D.** Data compression without field mapping

**Stored correct answer:** C

**Why it is correct:** Normalization maps vendor-specific fields and formats to a consistent schema so searches, dashboards, and correlation rules can operate across sources.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92`

### SEC701-0000192 · Objective 4.5 · Medium · Scenario

**Topic:** Cloud access security brokers

An organization wants visibility into sanctioned and unsanctioned SaaS use, control external sharing, apply data-loss rules to cloud applications, and enforce access policy based on user and device context. Which capability best matches the requirement?

- **A.** A local disk defragmenter
- **B.** A network time server
- **C.** A certificate revocation list
- **D.** A cloud access security broker

**Stored correct answer:** D

**Why it is correct:** A CASB provides visibility and policy enforcement between users and cloud services, including application discovery, access controls, sharing restrictions, and data protection.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-144|SRC-NIST-SP800-207`

### SEC701-0000193 · Objective 4.6 · Hard · Scenario

**Topic:** Automated identity deprovisioning

When HR records an employee's termination, the organization wants connected cloud services to disable the user's account and remove group memberships without administrators manually updating each service. Which standard is designed for this cross-domain identity lifecycle task?

- **A.** SCIM
- **B.** SNMP
- **C.** IPsec
- **D.** OCSP

**Stored correct answer:** A

**Why it is correct:** SCIM provides a standardized HTTP-based method to create, update, disable, and manage users and groups across enterprise and cloud services.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-RFC7644|SRC-NIST-SP800-53R5`

### SEC701-0000194 · Objective 4.7 · Medium · Scenario

**Topic:** Automation change control

An analyst edits a production response playbook directly, and a small logic error disables accounts outside the intended incident scope. Which process improvement most directly reduces the chance of a similar automation failure?

- **A.** Give every analyst permission to edit the production playbook
- **B.** Store playbooks in version control, require peer review and testing, and deploy approved versions through a controlled pipeline
- **C.** Remove execution logs so playbooks finish faster
- **D.** Combine unrelated response playbooks into one large script

**Stored correct answer:** B

**Why it is correct:** Version history, peer review, testing, and controlled deployment apply change-management safeguards to high-impact automation.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-128|SRC-NIST-SP800-53R5`

### SEC701-0000195 · Objective 4.8 · Easy · Scenario

**Topic:** Incident detection and analysis

A security alert is confirmed as malicious. The response team determines which systems and data are affected, estimates business impact, assigns a severity, and formally declares an incident. Which incident-response activity is being performed?

- **A.** Recovery
- **B.** Lessons learned
- **C.** Detection and analysis
- **D.** Eradication

**Stored correct answer:** C

**Why it is correct:** Detection and analysis confirms the event, establishes scope and impact, classifies severity, and activates the appropriate response.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-61R3`

### SEC701-0000196 · Objective 5.1 · Medium · Scenario

**Topic:** Security steering committees

Business, legal, finance, technology, and security leaders meet quarterly to review cyber risk metrics, unresolved exceptions, regulatory changes, and funding priorities. Which governance mechanism is most directly described?

- **A.** A packet-capture filter
- **B.** A certificate authority
- **C.** A vulnerability scanner
- **D.** A cross-functional security steering committee

**Stored correct answer:** D

**Why it is correct:** A security steering committee provides cross-functional oversight, aligns security priorities with business objectives, and supports risk and resource decisions.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-CSF2`

### SEC701-0000197 · Objective 5.2 · Easy · Calculation

**Topic:** Single loss expectancy

A server and the business data it supports have an asset value of $500,000. A modeled incident is expected to cause a 20% loss of that value. What is the single loss expectancy?

- **A.** $100,000
- **B.** $20,000
- **C.** $400,000
- **D.** $2,500,000

**Stored correct answer:** A

**Why it is correct:** Single loss expectancy equals asset value multiplied by exposure factor: $500,000 × 0.20 = $100,000.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-RISK-ALE`

### SEC701-0000198 · Objective 5.3 · Medium · Scenario

**Topic:** Vendor risk tiering

A company uses one vendor for ordinary office supplies and another vendor to process regulated customer data and operate a critical authentication service. How should the company allocate third-party due-diligence effort?

- **A.** Perform identical minimal reviews because both organizations are vendors
- **B.** Use risk tiering based on service criticality, data sensitivity, access, and dependency, with deeper assessment and monitoring for the higher-risk vendor
- **C.** Assess only the office-supply vendor because physical products create more risk
- **D.** Skip review when a vendor has a well-known brand name

**Stored correct answer:** B

**Why it is correct:** Risk-based tiering directs more rigorous assessment, contractual controls, and monitoring toward vendors whose failure or compromise would create greater impact.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1`

### SEC701-0000199 · Objective 5.4 · Easy · Scenario

**Topic:** Consent and preference management

A retailer wants to use customer purchase information for optional targeted marketing that is not required to complete the sale. Which practice best supports effective privacy compliance?

- **A.** Treat purchase completion as consent to every future use
- **B.** Hide the marketing use in an unrelated technical document
- **C.** Provide clear notice, obtain and record the applicable customer choice, and provide a practical way to withdraw or change that choice
- **D.** Keep the data indefinitely because the customer once made a purchase

**Stored correct answer:** C

**Why it is correct:** Clear notice, meaningful choice, recorded preferences, and manageable withdrawal support transparent and accountable optional processing.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-PRIVACY-FRAMEWORK`

### SEC701-0000200 · Objective 5.5 · Hard · Comparison

**Topic:** White-box penetration testing

A penetration tester receives source code, architecture diagrams, test accounts, and configuration details so the engagement can examine internal logic and trust relationships in depth. Which testing approach is being used?

- **A.** Black-box testing
- **B.** A vulnerability scan without manual analysis
- **C.** A tabletop continuity exercise
- **D.** White-box testing

**Stored correct answer:** D

**Why it is correct:** White-box testing provides substantial internal knowledge and access so testers can perform deep, targeted analysis of implementation and architecture.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-115`

## Similarity review

- Closest non-duplicate comparison: `SEC701-0000009` and `SEC701-0000197` with similarity score 0.53.
- Closest non-duplicate comparison: `SEC701-0000054` and `SEC701-0000126` with similarity score 0.52.
- Closest non-duplicate comparison: `SEC701-0000018` and `SEC701-0000111` with similarity score 0.51.

## Ongoing review path

The questions may be tested on staging before production deployment. Issues found during testing or through the question-reporting feature can be corrected through versioning or retirement without reusing permanent IDs.
