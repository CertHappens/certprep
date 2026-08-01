# SEC-701 Batch 011 Stimulus Question Review

## Batch summary

- Batch ID: `SEC701-BATCH-011`
- Questions: 25
- IDs: `SEC701-0000226` through `SEC701-0000250`
- Status: `approved`
- Approval date: `2026-08-01`
- Approved production questions after Batch 011: 250
- Draft questions remaining: 0
- Stimulus-backed questions in Batch 011: 25 of 25
- Stimulus forms: table = 18, preformatted = 7
- Domain allocation: 3 / 5 / 5 / 7 / 5
- Difficulty distribution: easy = 5, medium = 14, hard = 6
- Question types: single_choice = 9, multi_select = 7, best_available = 9
- Correct-key inclusion: A = 8, B = 8, C = 8, D = 8
- Cumulative correct-key inclusion: A = 66, B = 66, C = 66, D = 66
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate choices: none
- High-similarity stem conflicts: none
- Severe correct-answer length clues in this batch: none

Every new question requires the learner to interpret a log, configuration fragment, command-style output, or evidence table before selecting an answer.

## Final domain coverage

| Domain | Before | Added | Final | Share | Target |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 27 | 3 | 30 | 12.0% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 50 | 5 | 55 | 22.0% | 22% |
| 3.0 Security Architecture | 40 | 5 | 45 | 18.0% | 18% |
| 4.0 Security Operations | 63 | 7 | 70 | 28.0% | 28% |
| 5.0 Security Program Management and Oversight | 45 | 5 | 50 | 20.0% | 20% |

## Question review

### SEC701-0000226 · Objective 1.1 · multi_select · medium

**Stimulus:** Control evidence (`table`)

**Instruction:** Select TWO answers.

Review the control evidence. Which TWO controls are primarily detective?

- **A.** The SIEM correlation alert for unusual sign-in activity
- **B.** The entrance-camera monitoring reviewed by security staff
- **C.** The application allowlist that blocks unapproved software
- **D.** The protected backup used to restore encrypted files

**Correct:** A|B

**Explanation:** The SIEM alert and reviewed camera footage identify or report activity. The allowlist is preventive, while backup restoration is corrective.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000227 · Objective 1.3 · best_available · medium

**Stimulus:** Change record CHG-2047 (`table`)

**Instruction:** Choose the BEST response.

Review the change record. What should the change owner do next?

- **A.** Continue the remaining rollout because the change was previously approved
- **B.** Update the approved baseline so it matches the current failed state
- **C.** Initiate rollback, record the result, and investigate before rescheduling
- **D.** Disable service monitoring until the implementation window closes

**Correct:** C

**Explanation:** The failed validation and service errors meet the rollback condition. The owner should restore the known state, preserve the change record, and determine the cause before another attempt.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-128`

### SEC701-0000228 · Objective 1.4 · single_choice · easy

**Stimulus:** TLS certificate diagnostic (`preformatted`, command_output)

**Instruction:** Choose one answer.

A browser rejects the certificate shown in the diagnostic output. What is the immediate cause?

- **A.** The certificate uses a subject name that differs from the requested host
- **B.** The certificate lacks a public key
- **C.** The certificate was issued before the current time
- **D.** The certificate has passed its expiration time

**Correct:** D

**Explanation:** The current time is later than the certificate's notAfter value, and the diagnostic explicitly reports an expiration error.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-RFC8446|SRC-NIST-SP800-57P1R5`

### SEC701-0000229 · Objective 2.1 · best_available · medium

**Stimulus:** Investigation summary (`table`)

**Instruction:** Choose the BEST answer.

Which threat actor is most strongly supported by the investigation evidence?

- **A.** A malicious insider using legitimate access and internal knowledge
- **B.** A nation-state actor exploiting an Internet-facing service
- **C.** An unskilled attacker scanning random public systems
- **D.** A hacktivist attempting to publicize an ideological cause

**Correct:** A

**Explanation:** The activity used a valid assigned account, focused on a project the employee knew, and followed a termination notice. Those facts strongly support intentional insider misuse.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-INSIDER-THREAT`

### SEC701-0000230 · Objective 2.2 · single_choice · easy

**Stimulus:** Received email (`preformatted`, plain_text)

**Instruction:** Choose one answer.

Which attack technique is most clearly demonstrated by the message?

- **A.** A watering-hole attack against a trusted website
- **B.** Typosquatting
- **C.** Password spraying across employee accounts
- **D.** Removable-media baiting with planted devices

**Correct:** B

**Explanation:** The sender and link use a domain that visually resembles the legitimate company domain but substitutes a character, which is typosquatting.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-PHISHING`

### SEC701-0000231 · Objective 2.3 · single_choice · medium

**Stimulus:** Web application log (`preformatted`, log)

**Instruction:** Choose one answer.

Which vulnerability is most consistent with the request and application response?

- **A.** Stored cross-site scripting
- **B.** Server-side request forgery
- **C.** SQL injection
- **D.** Directory traversal

**Correct:** C

**Explanation:** The search parameter contains database query syntax, and the application returns a database syntax error. This is consistent with unsafe construction of a SQL query from untrusted input.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-OWASP-SQLI`

### SEC701-0000232 · Objective 2.4 · multi_select · medium

**Stimulus:** Authentication summary (`table`)

**Instruction:** Select TWO answers.

Which TWO observations most strongly indicate password spraying rather than repeated brute-force attempts against one account?

- **A.** One source attempts authentication against many different accounts
- **B.** Hundreds of rapid attempts target the same account
- **C.** Each account receives only one or a few attempts during the interval
- **D.** Successful logins originate from each user's usual device

**Correct:** A|C

**Explanation:** Password spraying distributes a small number of password attempts across many accounts to reduce the likelihood of per-account lockout.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-BRUTE-FORCE`

### SEC701-0000233 · Objective 2.5 · best_available · hard

**Stimulus:** DNS and firewall evidence (`preformatted`, log)

**Instruction:** Choose the BEST mitigation.

The DNS evidence is confirmed as command-and-control traffic. Which mitigation most directly blocks the observed channel while preserving normal name resolution?

- **A.** Disable full-disk encryption on the affected endpoint
- **B.** Rate-limit all outbound HTTPS traffic from the user network
- **C.** Increase retention for successful authentication events
- **D.** Block direct external DNS and require monitored enterprise resolvers

**Correct:** D

**Explanation:** The host is bypassing enterprise DNS and sending suspicious encoded queries directly outside. Requiring controlled resolvers blocks that path and enables DNS filtering and monitoring.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-MITRE-T1071-004|SRC-NIST-SP800-41R1`

### SEC701-0000234 · Objective 3.1 · multi_select · medium

**Stimulus:** Cloud service responsibility summary (`table`)

**Instruction:** Select TWO answers.

Based on the service model shown, which TWO activities remain the customer's responsibility?

- **A.** Patching and hardening the guest operating system
- **B.** Replacing failed physical storage in the provider facility
- **C.** Securing the provider's hypervisor management plane
- **D.** Configuring the workload's network security rules

**Correct:** A|D

**Explanation:** In infrastructure as a service, the provider manages physical infrastructure and the virtualization layer, while the customer manages guest systems and workload-level configuration.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-145|SRC-NIST-SP800-144`

### SEC701-0000235 · Objective 3.2 · best_available · hard

**Stimulus:** Firewall rules for the management subnet (`table`)

**Instruction:** Choose the BEST change.

Which firewall and access change best reduces the exposure while preserving authorized administration?

- **A.** Keep the public RDP rule and add longer authentication-log retention
- **B.** Remove public RDP and require administration through a hardened jump path
- **C.** Allow public RDP only outside normal business hours
- **D.** Move the public RDP rule below the application HTTPS rule

**Correct:** B

**Explanation:** Removing direct public management access and using a controlled jump path reduces attack surface and centralizes strong authentication and monitoring.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-41R1|SRC-NIST-SP800-207`

### SEC701-0000236 · Objective 3.3 · single_choice · medium

**Stimulus:** Data protection event (`table`)

**Instruction:** Choose one answer.

Why did the data protection system block the upload?

- **A.** The file was larger than the permitted email attachment size
- **B.** The destination used an expired public certificate
- **C.** Restricted data was being sent to an unapproved personal service
- **D.** The workstation lacked enough free disk space

**Correct:** C

**Explanation:** The evidence shows a Restricted classification, an unapproved personal-cloud destination, and a DLP rule that prohibits that transfer.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5|SRC-NIST-PRIVACY-FRAMEWORK`

### SEC701-0000237 · Objective 3.4 · single_choice · medium

**Stimulus:** Recovery options (`table`)

**Instruction:** Choose one answer.

The service requires an RTO of 60 minutes or less and an RPO of 15 minutes or less. Which option meets both requirements?

- **A.** Option A
- **B.** Option B
- **C.** Option C
- **D.** Option D

**Correct:** D

**Explanation:** Option D has a five-minute RTO and a zero-minute RPO, so it satisfies both maximum limits.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-34R1|SRC-NIST-GLOSSARY-RPO-RTO`

### SEC701-0000238 · Objective 3.2 · best_available · medium

**Stimulus:** Conditional access decision (`preformatted`, log)

**Instruction:** Choose the BEST response.

The user has a valid identity and completed MFA, but access was denied. What should the administrator do?

- **A.** Remediate the device posture and let policy reevaluate the request
- **B.** Bypass the posture requirement because MFA already succeeded
- **C.** Add the device to a permanent exception without an owner or end date
- **D.** Disable access logging so the next request is processed faster

**Correct:** A

**Explanation:** The decision log shows the device fails required management and encryption conditions. Correcting those conditions preserves the contextual access policy.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-207|SRC-NIST-SP800-53R5`

### SEC701-0000239 · Objective 4.1 · single_choice · medium

**Stimulus:** Current SSH server settings (`preformatted`, configuration)

**Instruction:** Choose one answer.

Which configuration change most directly reduces password-guessing risk while retaining approved administrator access?

- **A.** Enable direct root login for the server-admins group
- **B.** Disable password authentication after validating keys
- **C.** Increase the permitted failed attempts before disconnecting
- **D.** Disable public-key authentication and keep passwords

**Correct:** B

**Explanation:** The server already supports public-key authentication. Disabling password authentication after validating keys removes the password-guessing path while preserving approved access.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-RFC4253|SRC-NIST-SP800-53R5`

### SEC701-0000240 · Objective 4.2 · multi_select · easy

**Stimulus:** Asset inventory extract (`table`)

**Instruction:** Select TWO answers.

Which TWO inventory findings require the most direct asset-management follow-up?

- **A.** Remove the active supported laptop because it has an assigned owner
- **B.** Assign an accountable owner to the database server
- **C.** Create a remediation or retirement plan for the unsupported server
- **D.** Classify the spare monitor as regulated customer data

**Correct:** B|C

**Explanation:** The database server lacks accountability, and the unsupported server has an unresolved lifecycle risk. Both require asset-management action.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-53R5`

### SEC701-0000241 · Objective 4.3 · best_available · hard

**Stimulus:** Vulnerability findings (`table`)

**Instruction:** Choose the BEST answer.

Which vulnerability should be remediated first?

- **A.** The actively exploited vulnerability on the public identity gateway
- **B.** The higher-CVSS vulnerability on the isolated development server
- **C.** The printer vulnerability because it was discovered first
- **D.** The user-laptop vulnerability because laptops are more numerous

**Correct:** A

**Explanation:** Active exploitation, public exposure, identity-system criticality, and potential business impact make the gateway finding the most urgent.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-40R4|SRC-NIST-SP800-30R1`

### SEC701-0000242 · Objective 4.4 · single_choice · medium

**Stimulus:** User sign-in events (`table`)

**Instruction:** Choose one answer.

Which SIEM analytic most directly addresses the activity shown?

- **A.** Detect a host that exceeds its disk-capacity threshold
- **B.** Detect a certificate approaching expiration
- **C.** Detect geographically impossible travel between user sign-ins
- **D.** Detect a switch port with increasing physical errors

**Correct:** C

**Explanation:** The same account appears in geographically distant locations only six minutes apart, which is an impossible-travel identity anomaly.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-92|SRC-NIST-SP800-137`

### SEC701-0000243 · Objective 4.5 · multi_select · hard

**Stimulus:** Current controls and observed gap (`table`)

**Instruction:** Select TWO answers.

Which TWO capabilities most directly reduce the unauthorized cloud-upload risk shown?

- **A.** Longer retention for internal DNS logs
- **B.** A CASB that controls access and sharing for cloud services
- **C.** Full-disk encryption on the employee workstation
- **D.** DLP inspection that identifies and blocks sensitive content

**Correct:** B|D

**Explanation:** A CASB governs cloud-service use and sharing, while DLP identifies sensitive content and can block prohibited transfers. Together they address the observed exfiltration path.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-144|SRC-NIST-SP800-53R5`

### SEC701-0000244 · Objective 4.8 · best_available · hard

**Stimulus:** Cloud account incident timeline (`preformatted`, log)

**Instruction:** Choose the BEST immediate response.

The user confirms that the OAuth consent and forwarding rule were unauthorized. What should the response team do first?

- **A.** Delete the mailbox audit records to protect message privacy
- **B.** Revoke sessions and consent, disable the malicious rule, and preserve evidence
- **C.** Wait for another suspicious sign-in before changing the account
- **D.** Reset only the user's workstation password and leave cloud sessions active

**Correct:** B

**Explanation:** The account and delegated cloud access must be contained immediately. Revoking sessions and consent and removing the forwarding rule stops continued access while preserving evidence for investigation.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-61R3|SRC-NIST-SP800-63C-4`

### SEC701-0000245 · Objective 4.9 · single_choice · easy

**Stimulus:** Available investigation data (`table`)

**Instruction:** Choose one answer.

Which data source best shows which process launched PowerShell and the command line it used?

- **A.** The DHCP lease table
- **B.** The building badge-access log
- **C.** The DNS resolver query log
- **D.** The EDR process tree

**Correct:** D

**Explanation:** An EDR process tree records parent-child process relationships and command-line context, which directly answers how PowerShell was launched.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-86|SRC-NIST-SP800-61R3`

### SEC701-0000246 · Objective 5.1 · multi_select · medium

**Stimulus:** Governance documents (`table`)

**Instruction:** Select TWO answers.

Which TWO documents primarily state mandatory organizational requirements rather than recommendations or ordered task steps?

- **A.** The risk-scoring guideline
- **B.** The server-build procedure
- **C.** The information security policy
- **D.** The encryption standard

**Correct:** C|D

**Explanation:** Policies establish mandatory management direction, and standards define mandatory requirements that support policy. Guidelines recommend, while procedures describe ordered actions.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-CSF2|SRC-NIST-SP800-53R5`

### SEC701-0000247 · Objective 5.2 · best_available · medium

**Stimulus:** Risk estimate (`table`)

**Instruction:** Choose the BEST conclusion.

Using the risk values shown, which conclusion is accurate before considering qualitative benefits or implementation risk?

- **A.** The current ALE is $100,000 and the residual ALE is $40,000
- **B.** The control increases annual expected loss by $30,000
- **C.** The estimated annual loss reduction equals the control's annual cost
- **D.** The control removes all residual risk from the scenario

**Correct:** C

**Explanation:** Current SLE is $400,000 × 25% = $100,000 and current ALE is $50,000. Residual SLE is $40,000 and residual ALE is $20,000. The $30,000 reduction equals the $30,000 annual control cost.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-RISK-ALE|SRC-NIST-SP800-30R1`

### SEC701-0000248 · Objective 5.3 · multi_select · medium

**Stimulus:** Vendor due diligence responses (`table`)

**Instruction:** Select TWO answers.

Which TWO vendor responses require the most direct follow-up before contract approval?

- **A.** The incident-notification commitment lacks a defined reporting deadline
- **B.** Critical subprocessors and their processing locations are not disclosed
- **C.** Encryption evidence identifies protection at rest and in transit
- **D.** The vendor provides results from its annual continuity exercise

**Correct:** A|B

**Explanation:** A vague notification commitment and undisclosed subprocessors leave material response, compliance, location, and dependency questions unresolved.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-161R1|SRC-NIST-SP800-47R1`

### SEC701-0000249 · Objective 5.5 · best_available · hard

**Stimulus:** Available audit evidence (`table`)

**Instruction:** Choose the BEST evidence.

An auditor is testing whether quarterly privileged-access reviews operated effectively throughout the year. Which item provides the strongest evidence?

- **A.** The approved policy requiring privileged-access reviews
- **B.** A diagram showing the identity platform's architecture
- **C.** A vendor description of the platform's review features
- **D.** Completed review samples from each quarter with approvals and follow-up

**Correct:** D

**Explanation:** Completed records from across the assessment period show that the control was performed, approved, and followed up repeatedly, which supports operating effectiveness.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-NIST-SP800-115|SRC-NIST-SP800-53R5`

### SEC701-0000250 · Objective 5.6 · single_choice · easy

**Stimulus:** Phishing simulation results (`table`)

**Instruction:** Choose one answer.

Which department should receive targeted phishing coaching first based on the results?

- **A.** Finance
- **B.** Sales
- **C.** Information technology
- **D.** Human resources

**Correct:** A

**Explanation:** Finance has the highest click rate and a low reporting rate, creating the largest immediate combination of risky interaction and weak reporting behavior.

**Sources:** `SRC-COMPTIA-SY0701-V6|SRC-CISA-PHISHING|SRC-NIST-SP800-53R5`

## Similarity review

- `SEC701-0000224` and `SEC701-0000249`: 0.71
- `SEC701-0000201` and `SEC701-0000226`: 0.69
- `SEC701-0000052` and `SEC701-0000223`: 0.68
- `SEC701-0000240` and `SEC701-0000248`: 0.63
- `SEC701-0000235` and `SEC701-0000239`: 0.58
- `SEC701-0000129` and `SEC701-0000205`: 0.55
