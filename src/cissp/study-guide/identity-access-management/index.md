---
layout: layouts/article.njk
title: "CISSP Domain 5: Identity and Access Management"
description: Study CISSP Domain 5 with plain-language guidance on identity proofing, authentication, authorization, federation, access-control models, provisioning, privileged access, service accounts, and authentication systems.
permalink: /cissp/study-guide/identity-access-management/
ogType: article
printable: true
printTitle: "CISSP Domain 5: Identity and Access Management"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 5
eyebrow: CISSP Domain 5 guide
lede: Follow an identity from registration through authentication, authorization, review, change, and removal, then apply the same controls to people, devices, services, workloads, and facilities.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Identity and Access Management
    url: /cissp/study-guide/identity-access-management/
toc:
  - id: domain-map
    label: Domain 5 map
  - id: decision-order
    label: Decision order
  - id: identity-access-basics
    label: Identity and access basics
  - id: access-assets
    label: Physical and logical access
  - id: identity-proofing
    label: Registration and proofing
  - id: authentication
    label: Authentication strategy
  - id: sessions-credentials
    label: Sessions and credentials
  - id: federation-sso
    label: Federation and SSO
  - id: authorization-models
    label: Authorization models
  - id: policy-enforcement
    label: Policy enforcement
  - id: identity-lifecycle
    label: Identity lifecycle
  - id: privileged-service-accounts
    label: Privileged and service accounts
  - id: authentication-systems
    label: Authentication systems
  - id: ai-identities
    label: AI and workload identities
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 5
  - Identity and Access Management
  - authentication
  - authorization
  - federation
  - access control models
  - identity lifecycle
  - privileged access management
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Review governance, personnel security, policy, risk, and approval responsibilities that shape access decisions.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Connect classification, ownership, and handling rules to who should receive access and under which conditions.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Connect identity decisions to remote access, network admission, protected administration, and third-party connections.
  - title: "CISSP Domain 6: Security Assessment and Testing"
    url: /cissp/study-guide/security-assessment-testing/
    description: Test identity proofing, authentication, authorization, privileged access, account reviews, and service-account controls.
  - title: "CISSP Domain 7: Security Operations"
    url: /cissp/study-guide/security-operations/
    description: Apply investigations, logging, monitoring, incident response, configuration, patching, recovery, continuity, physical safeguards, and personnel safety.
  - title: Security+ SY0-701 Study Guide
    url: /security-plus/sy0-701/study-guide/
    description: Refresh identity, authentication, authorization, and access-control foundations before applying the broader CISSP perspective.
---
Domain 5 accounts for 13 percent of the current CISSP exam outline. It asks how an organization decides **who or what is requesting access, how that identity is verified, what it may do, and how access changes over time**.

Identity and Access Management (IAM) applies to more than employees signing in to applications. It also covers contractors, customers, administrators, devices, services, application programming interfaces, automation, cloud workloads, suppliers, and physical entry to facilities.

The strongest answer usually follows the complete identity lifecycle. An account that was approved correctly can still become dangerous if it is not reviewed after a transfer, disabled after termination, protected during privileged use, or removed when a service is retired.

<h2 id="domain-map">1. Domain 5 map</h2>

The official outline divides Identity and Access Management into six objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 5 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>5.1</td><td>Physical and logical access</td><td>Which people, devices, or services should reach each asset, and through which approved path?</td></tr>
      <tr><td>5.2</td><td>Identification and authentication strategy</td><td>How will identities be established, verified, grouped, authenticated, and managed during a session?</td></tr>
      <tr><td>5.3</td><td>Federated identity</td><td>How will one organization or service trust identity information supplied by another?</td></tr>
      <tr><td>5.4</td><td>Authorization mechanisms</td><td>Which policy decides what an authenticated identity may do, and where is that decision enforced?</td></tr>
      <tr><td>5.5</td><td>Provisioning lifecycle</td><td>How are accounts created, changed, reviewed, elevated, and removed?</td></tr>
      <tr><td>5.6</td><td>Authentication systems</td><td>Which system or protocol verifies the identity, and how is that system protected and monitored?</td></tr>
    </tbody>
  </table>
</div>

These objectives work as one process. Identity proofing connects an account to a person or entity. Authentication checks that the claimant controls an approved authenticator. Authorization applies policy to the requested action. Accounting records what happened. Lifecycle management keeps the identity, privileges, and evidence current.

<h2 id="decision-order">2. Use the right decision order</h2>

A password, biometric reader, role, or federation protocol is not an IAM strategy by itself. Begin with the asset and business need.

A practical decision sequence is:

1. **Identify the asset and owner.** Determine who is responsible for approving access to the information, system, device, facility, application, or service.
2. **Define the allowed work.** State what the requester needs to do and why. Avoid granting a broad role when a narrower task is enough.
3. **Classify the identity.** Determine whether it represents a person, device, service, workload, supplier, customer, or automated agent.
4. **Establish the identity.** Register the subject, verify required evidence, and create a unique identity record.
5. **Choose authentication strength.** Match authenticators and assurance to the possible harm from impersonation or account takeover.
6. **Apply authorization policy.** Use roles, rules, attributes, labels, ownership, or changing conditions to decide what is allowed.
7. **Enforce the decision.** Ensure the application, gateway, operating system, facility control, or other enforcement point actually blocks disallowed actions.
8. **Protect the session and credentials.** Limit session duration, protect tokens and secrets, and require stronger checks for sensitive changes.
9. **Record meaningful activity.** Log approvals, authentication events, privilege use, policy decisions, and account changes.
10. **Review and remove access.** Recheck access after transfers, contract changes, inactivity, incidents, and termination.

When a question asks for the **first action**, identify the owner, requirement, and subject before choosing technology. When it asks for the **best control**, consider the complete lifecycle rather than only the login screen.

<h2 id="identity-access-basics">3. Separate identity, authentication, authorization, and accounting</h2>

These terms describe different steps:

<div class="table-scroll" role="region" aria-label="Identification authentication authorization and accounting comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Step</th><th scope="col">Plain meaning</th><th scope="col">Example</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Step">Identification</td><td data-label="Plain meaning">The subject states which identity it is using.</td><td data-label="Example">Entering a username or presenting a badge number.</td></tr>
      <tr><td data-label="Step">Authentication</td><td data-label="Plain meaning">The system checks evidence that the claimant controls that identity.</td><td data-label="Example">Verifying a passkey, smart card, password, or device certificate.</td></tr>
      <tr><td data-label="Step">Authorization</td><td data-label="Plain meaning">The system decides what the authenticated identity may do.</td><td data-label="Example">Allowing a payroll analyst to read payroll data but not change access roles.</td></tr>
      <tr><td data-label="Step">Accounting</td><td data-label="Plain meaning">The system records activity for review, investigation, billing, or accountability.</td><td data-label="Example">Recording sign-ins, commands, approvals, and changes.</td></tr>
    </tbody>
  </table>
</div>

**Authentication, Authorization, and Accounting (AAA)** is a common way to group the last three functions. AAA does not establish that the original identity record was trustworthy. Registration and identity proofing happen earlier.

A **subject** requests access. A subject may be a person, process, device, or service. An **object** is the information or resource being accessed. The requested **operation** may be read, write, approve, execute, enter, configure, or another defined action.

<h2 id="access-assets">4. Control physical and logical access to assets</h2>

Access should be tied to the asset's owner, classification, business purpose, and approved method of use.

Domain 5 explicitly includes access to:

- **Information:** files, records, messages, datasets, secrets, models, and intellectual property
- **Systems:** servers, endpoints, cloud platforms, network devices, and industrial systems
- **Devices:** laptops, phones, removable media, sensors, consoles, and specialized equipment
- **Facilities:** buildings, rooms, cages, laboratories, wiring closets, and storage areas
- **Applications:** business applications, administrative consoles, software tools, and interfaces
- **Services:** databases, directories, cloud services, application programming interfaces, automation, and managed services

Physical and logical access should support the same policy. A person who is not approved to administer a server should not gain that ability merely by entering the server room. A remote administrator who is authorized logically may still require separate approval for physical entry.

Useful physical controls include badges, guards, locks, turnstiles, visitor procedures, alarms, cameras, and mantraps. Useful logical controls include accounts, device identity, network admission, application roles, encryption keys, and policy enforcement.

**Tailgating** occurs when an unauthorized person follows an authorized person through a controlled entrance. **Piggybacking** is often used for the same event, although some organizations use it when the authorized person knowingly allows the entry. The practical control is to require each person to authenticate and to train staff not to bypass the process for convenience.

Access paths matter. A user may be blocked by the application but still reach the database directly. An administrator may use a protected management portal but retain an unmonitored local account. Review every path to the asset, including recovery, vendor, service, and emergency access.

<h2 id="identity-proofing">5. Register and prove an identity before relying on it</h2>

**Registration** creates an identity record. **Identity proofing** checks evidence that the applicant is the person or entity claimed. **Enrollment** connects approved authenticators and attributes to that identity.

The amount of proof should match the possible harm from a false identity. A public newsletter account needs less assurance than access to financial records, privileged administration, or a regulated service.

A sound process may include:

- Collecting only the information needed for the stated purpose
- Checking documents, records, devices, sponsors, or trusted sources
- Detecting duplicate, synthetic, or stolen identities
- Recording who approved the identity and which evidence was used
- Protecting proofing data because it can enable fraud if exposed
- Providing recovery and dispute processes
- Rechecking identity when important attributes change

A **sponsor** confirms that an identity has a valid organizational relationship, such as an employee, contractor, student, partner, or guest. Sponsorship does not replace proofing. It supplies business context and responsibility.

People, devices, and services require different evidence. A person may present documents and complete a live check. A managed device may be enrolled through inventory, configuration, and a device certificate. A service may be established through an approved deployment pipeline, owner, workload identity, and protected key.

Do not collect stronger identity evidence than the use case requires. Extra identity data increases privacy impact, storage obligations, and the damage caused by a breach.

<h2 id="authentication">6. Design authentication for the possible harm</h2>

**Authentication** checks whether the claimant controls one or more approved authenticators linked to an identity.

Authentication factors are commonly grouped as:

- **Something you know:** password, passphrase, or personal identification number
- **Something you have:** smart card, hardware token, phone, device-bound key, or authenticator application
- **Something you are:** fingerprint, face, iris, voice, or another biometric characteristic

Some systems also consider location, behavior, device condition, or time. These signals can strengthen a decision, but they are often better treated as context than as independent factors.

**Multi-factor authentication (MFA)** uses authenticators from at least two different factor categories. A password and two security questions are still one factor because both are things the user knows.

The goal is not to maximize the number of prompts. The goal is to make impersonation difficult without creating a recovery process that is easier to attack than the normal login.

<h3>Phishing resistance and passwordless authentication</h3>

A phishing-resistant authenticator does not simply reveal a reusable secret to any page that asks for it. It uses cryptography and the identity of the legitimate service so a fake site cannot replay the same proof elsewhere.

**Passwordless authentication** means the user does not enter a traditional password for that account. A passkey, smart card, or certificate can provide passwordless authentication. Passwordless does not automatically mean strong. The enrollment, device protection, recovery process, and verifier still matter.

**Web Authentication (WebAuthn)** allows a website to use public-key credentials stored by an authenticator. **Passkeys** are WebAuthn credentials designed for easier use across supported devices or accounts. The private key is not sent to the website.

<h3>Biometrics</h3>

Biometrics compare a measured characteristic with an enrolled reference. They are convenient, but they are not secrets. A person cannot simply replace a face or fingerprint after compromise.

Common performance measures include:

- **False acceptance rate:** how often an unauthorized person is accepted
- **False rejection rate:** how often an authorized person is rejected
- **Crossover error rate:** the point where false acceptance and false rejection rates are equal

Lowering one error rate can raise the other. The correct threshold depends on the use case. A high-security facility may accept more false rejections to reduce false acceptance, while a consumer device may prioritize usability.

Biometric systems need liveness detection, protected templates, fallback procedures, and another way to recover access. Privacy, accessibility, environmental conditions, and demographic performance should be considered before deployment.

<h3>Adaptive and risk-based authentication</h3>

**Adaptive authentication** changes the required proof when the context changes. A familiar managed device on a normal network may receive a standard check. A new device, unusual location, impossible travel pattern, sensitive action, or suspicious behavior may trigger stronger authentication or denial.

The decision should use reliable signals, explainable policy, and tested thresholds. A model that silently blocks legitimate users or learns from manipulated data can create security and operational problems.

<h2 id="sessions-credentials">7. Protect sessions, credentials, and recovery</h2>

Authentication creates or strengthens a session. The session then carries the identity between requests so the user does not repeat the full login for every action.

Session controls should address:

- Idle and maximum lifetime
- Renewal and reauthentication
- Protection of cookies, tickets, and tokens
- Binding to appropriate device or channel information
- Revocation after termination, password reset, compromise, or privilege change
- Step-up authentication for sensitive actions
- Concurrent session limits when appropriate
- Detection of stolen or replayed session material

A secure login followed by a weak session still exposes the account. Session identifiers should be hard to predict, protected in transit and storage, and invalidated when no longer needed.

**Credential management** covers creation, issuance, storage, use, rotation, recovery, revocation, and destruction. Credentials include passwords, keys, certificates, tokens, application secrets, and recovery codes.

A **password vault** stores secrets in a protected system and controls who or what may retrieve them. A vault is most useful when it also supports approval, rotation, checkout limits, logging, and removal of secrets from scripts and documents.

Recovery requires special attention. Help-desk resets, backup codes, alternate email, and device replacement can bypass strong normal authentication. The recovery path should provide assurance appropriate to the account and should produce useful alerts and records.

<h2 id="federation-sso">8. Use federation and single sign-on without confusing their purposes</h2>

**Single sign-on (SSO)** is the user experience of authenticating once and then reaching several authorized services without entering credentials again.

**Federation** is a trust arrangement in which one organization or service accepts identity information from another. **Federated Identity Management (FIM)** applies that trust across separate identity systems and administrative boundaries. Federation can provide SSO, but the two terms are not identical.

Common roles include:

- **Identity provider (IdP):** authenticates the subject and issues an assertion or token
- **Service provider (SP) or relying party (RP):** accepts the identity information and provides the application or service
- **Credential service provider:** registers subjects, binds authenticators, and manages credentials

The relying service must decide which issuer to trust, which claims to accept, how fresh the authentication must be, and what local access those claims should produce.

<h3>Common federation and delegated-access technologies</h3>

<div class="table-scroll" role="region" aria-label="Federation and delegated access technology comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Technology</th><th scope="col">Plain purpose</th><th scope="col">Important distinction</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Technology">Security Assertion Markup Language (SAML)</td><td data-label="Plain purpose">Carries signed identity assertions, commonly for browser-based enterprise federation.</td><td data-label="Important distinction">The service trusts assertions from an identity provider.</td></tr>
      <tr><td data-label="Technology">OAuth 2.0</td><td data-label="Plain purpose">Lets an application receive limited authority to call an HTTP service.</td><td data-label="Important distinction">OAuth is an authorization framework, not a complete user-authentication protocol.</td></tr>
      <tr><td data-label="Technology">OpenID Connect</td><td data-label="Plain purpose">Adds an identity layer to OAuth 2.0 so a relying party can learn who authenticated.</td><td data-label="Important distinction">An ID token represents authentication information; an access token authorizes an API call.</td></tr>
      <tr><td data-label="Technology">System for Cross-domain Identity Management (SCIM)</td><td data-label="Plain purpose">Automates creation, update, and removal of identity records across systems.</td><td data-label="Important distinction">SCIM handles provisioning, not interactive login.</td></tr>
    </tbody>
  </table>
</div>

Do not use an access token as proof of identity unless the protocol and service explicitly define that use. Validate issuer, audience, signature, time limits, requested permissions, redirect locations, and token handling.

<h3>On-premises, cloud, and hybrid federation</h3>

- **On-premises federation** keeps identity services inside organization-controlled infrastructure.
- **Cloud federation** relies on provider-hosted identity services.
- **Hybrid federation** connects internal directories and applications with cloud identity and services.

The deployment location does not determine trust by itself. Review key protection, administrative roles, availability, privacy, logging, token validation, supplier access, recovery, and exit plans.

Federation can reduce password sprawl and centralize policy, but it also increases the effect of identity-provider failure or compromise. Strong protection and resilience are needed because one identity system may open many services.

<h2 id="authorization-models">9. Choose an authorization model that matches the policy</h2>

Authentication answers **who or what is making the request**. Authorization answers **whether that identity may perform this action on this resource under these conditions**.

<div class="table-scroll" role="region" aria-label="Access control model comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">Model</th><th scope="col">Plain meaning</th><th scope="col">Best fit and caution</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="Model">Role-based access control (RBAC)</td><td data-label="Plain meaning">Permissions are assigned to job or system roles, then identities are assigned to those roles.</td><td data-label="Best fit and caution">Efficient for stable job patterns. Too many special cases can create role explosion.</td></tr>
      <tr><td data-label="Model">Rule-based access control</td><td data-label="Plain meaning">System-wide rules allow or deny access when stated conditions are met.</td><td data-label="Best fit and caution">Useful for conditions such as time, network, or firewall policy. Do not confuse it with RBAC.</td></tr>
      <tr><td data-label="Model">Mandatory access control (MAC)</td><td data-label="Plain meaning">The system compares security labels and clearances according to centrally enforced policy.</td><td data-label="Best fit and caution">Strong control for classified or highly structured environments. Users cannot freely change permissions.</td></tr>
      <tr><td data-label="Model">Discretionary access control (DAC)</td><td data-label="Plain meaning">The resource owner can grant or remove access.</td><td data-label="Best fit and caution">Flexible and common in file systems. Access can spread through owner decisions.</td></tr>
      <tr><td data-label="Model">Attribute-based access control (ABAC)</td><td data-label="Plain meaning">Policy evaluates facts about the subject, resource, requested action, and environment.</td><td data-label="Best fit and caution">Supports detailed and changing decisions. Attributes and policy must be accurate and governed.</td></tr>
      <tr><td data-label="Model">Risk-based access control</td><td data-label="Plain meaning">The decision changes when the current signs of possible harm change.</td><td data-label="Best fit and caution">Useful for adaptive access. Signals and thresholds must be reliable and reviewable.</td></tr>
    </tbody>
  </table>
</div>

**Need to know** limits access to information required for the task. **Least privilege** limits permissions and capabilities to the minimum needed. A user may hold a role but still lack need to know for a particular record.

**Separation of duties** divides a sensitive process among different people or roles so one person cannot complete every critical step alone. **Dual control** requires two authorized parties to act together. These controls reduce fraud, error, and misuse but need tested emergency procedures.

<h2 id="policy-enforcement">10. Separate policy decisions from policy enforcement</h2>

A policy must be translated into a decision and enforced at the point where the action occurs.

- A **Policy Decision Point (PDP)** evaluates policy and decides whether a request should be allowed.
- A **Policy Enforcement Point (PEP)** permits, blocks, redirects, or limits the requested action based on that decision.
- A **Policy Information Point (PIP)** supplies attributes or context used in the decision.
- A **Policy Administration Point (PAP)** is where authorized administrators create and manage policy.

For example, an access gateway may act as the enforcement point. It sends identity, device, resource, and context information to a policy engine. The engine makes the decision, and the gateway enforces it.

Do not assume enforcement is complete because a central engine made the correct decision. A bypass path, stale local cache, application defect, or direct database connection may ignore that decision.

Authorization should default to denial when no rule clearly permits the action. Policies should resolve conflicts predictably, record important decisions, and fail in a way that matches safety and business requirements.

<h2 id="identity-lifecycle">11. Manage the complete identity and access lifecycle</h2>

The identity lifecycle is often described as **joiner, mover, and leaver**:

- **Joiner:** create the identity and grant approved starting access.
- **Mover:** update access when duties, location, project, employer, or contract change.
- **Leaver:** disable access promptly, recover assets, preserve required records, and remove credentials and sessions.

Transfers are a common source of excessive access. Adding the new role without removing the old one produces privilege accumulation.

A sound provisioning process includes:

- A unique identity for each subject
- An approved owner and business reason
- Role or entitlement selection based on defined policy
- Separation-of-duties checks
- Time limits for temporary access
- Independent approval for sensitive privileges
- Confirmation that provisioning completed correctly
- Notification to the owner and requester
- Records that support later review

**Deprovisioning** removes or disables access when the relationship or need ends. It may include accounts, sessions, tokens, keys, certificates, groups, application roles, physical badges, remote access, shared secrets, and supplier connections.

<h3>Access reviews and certification</h3>

An **access review** asks whether existing access is still appropriate. The reviewer needs enough context to make a real decision, including the identity, owner, role, entitlements, last use, risk, conflicts, and reason for access.

Review frequency should match the possible harm. Privileged, financial, regulated, supplier, and inactive accounts often need closer review than ordinary low-impact access.

A manager may know whether an employee still needs a business function, while an asset owner may better understand what a technical entitlement permits. High-quality reviews may need both perspectives.

A review that asks an approver to confirm hundreds of unexplained codes is not meaningful assurance. Improve the data and group decisions around understandable roles, resources, and actions.

<h3>Just-in-time access</h3>

**Just-in-time (JIT) access** grants privilege only when it is needed and removes it after a short period. The request may require approval, a ticket, strong authentication, a healthy device, and session recording.

**Just-in-time provisioning** creates or activates an account when the user first reaches a service, often based on a federation assertion. It reduces advance account creation, but it can also create unmanaged accounts if ownership, role mapping, and deprovisioning are not defined.

<h2 id="privileged-service-accounts">12. Control privileged access and non-human accounts</h2>

A **privileged account** can make high-impact changes, reach sensitive data, alter security controls, or manage other identities. Privileged work should use separate administrative identities rather than an everyday account.

**Privileged Access Management (PAM)** controls how privileged credentials and sessions are requested, approved, issued, monitored, rotated, and revoked.

Useful controls include:

- Separate named administrative accounts
- MFA and protected administrator workstations
- Time-limited elevation
- Approval and ticket linkage
- Credential vaulting and automatic rotation
- Command or session recording where appropriate
- Alerts for unusual privilege use
- Emergency accounts with strong storage and review
- Removal of standing privilege when JIT access is practical

The `sudo` command can allow approved users to run specific commands with elevated rights. Restrict allowed commands, record use, protect configuration, and review exceptions. Giving unrestricted `sudo` access is effectively giving full administrative power.

<h3>Service and workload accounts</h3>

A **service account** is used by an application, process, device, or automated task rather than by a person during normal interactive work.

Service accounts need:

- A named owner and purpose
- Minimum permissions
- Non-interactive use unless specifically required
- Secrets stored outside source code and scripts
- Rotation or short-lived credentials
- Monitoring that distinguishes expected automation from misuse
- Review after application, supplier, or architecture changes
- Removal when the service is retired

Shared service accounts can make accountability difficult. Prefer workload identities, certificates, managed identities, or other mechanisms that identify the specific system or instance.

<h2 id="authentication-systems">13. Implement authentication systems as protected infrastructure</h2>

Authentication systems are high-value targets because compromise can open many other systems. Protect directories, identity providers, certificate authorities, domain controllers, token services, federation keys, recovery systems, and administrative consoles as critical infrastructure.

Common systems and protocols include:

<div class="table-scroll" role="region" aria-label="Authentication system and protocol comparison" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr><th scope="col">System or protocol</th><th scope="col">Plain purpose</th><th scope="col">Key concern</th></tr>
    </thead>
    <tbody>
      <tr><td data-label="System or protocol">Kerberos</td><td data-label="Plain purpose">Uses time-limited tickets so users and services can authenticate without repeatedly sending a password.</td><td data-label="Key concern">Protect the Key Distribution Center, service accounts, keys, time synchronization, and tickets.</td></tr>
      <tr><td data-label="System or protocol">Lightweight Directory Access Protocol (LDAP)</td><td data-label="Plain purpose">Lets applications query and update directory information.</td><td data-label="Key concern">Use protected transport, narrow permissions, and avoid treating a directory query protocol as a complete authentication design.</td></tr>
      <tr><td data-label="System or protocol">Remote Authentication Dial-In User Service (RADIUS)</td><td data-label="Plain purpose">Provides centralized AAA, commonly for network access and remote connections.</td><td data-label="Key concern">Protect shared secrets, transport, administrative access, and accounting records.</td></tr>
      <tr><td data-label="System or protocol">Terminal Access Controller Access-Control System Plus (TACACS+)</td><td data-label="Plain purpose">Centralizes administration of network devices and can authorize individual commands.</td><td data-label="Key concern">Use named administrators, command authorization, protected transport, and complete logging.</td></tr>
      <tr><td data-label="System or protocol">Certificates</td><td data-label="Plain purpose">Bind a public key to an identity so systems can authenticate users, devices, services, or workloads.</td><td data-label="Key concern">Manage issuance, private keys, renewal, revocation, trust stores, and retirement.</td></tr>
    </tbody>
  </table>
</div>

Authentication infrastructure needs resilience. If the only identity provider fails, users may lose access to critical services. If emergency access is too easy, it becomes a bypass. Design redundant services, tested recovery, controlled emergency accounts, and clear procedures for degraded operation.

Log successful and failed authentication, enrollment, recovery, factor changes, federation changes, privilege elevation, token issuance, and administrative actions. Protect logs from alteration and send important events to independent monitoring.

<h2 id="ai-identities">14. Treat AI agents and automation as identities</h2>

An AI agent, robotic process, orchestration tool, or automated service can request data, call tools, change systems, and act on behalf of a user or application. It needs the same identity discipline as other non-human subjects.

Important controls include:

- Give each agent or workload a unique identity and owner.
- Grant only the tools, data, and actions required for its task.
- Separate development, testing, and production identities.
- Use short-lived credentials where practical.
- Require explicit delegation when an agent acts for a person.
- Record which user, agent, model, and tool performed each action.
- Prevent an agent from changing its own roles or credential policy.
- Recheck authorization before sensitive or irreversible actions.
- Remove access when the workflow, model, integration, or supplier is retired.

AI can also support adaptive authentication by identifying unusual behavior. That use still requires governed data, tested thresholds, human review, privacy safeguards, and a way to challenge incorrect decisions.

Do not allow a human user's broad session token to become a permanent agent credential. Delegated authority should be narrow, short-lived, auditable, and revocable.

<h2 id="exam-traps">15. Common CISSP exam traps</h2>

### Choosing authentication before identity proofing

Strong MFA proves control of authenticators. It does not prove that the original identity record belongs to the correct person or entity. Establish the identity first.

### Confusing authentication and authorization

A valid login does not decide which records, commands, or facilities the identity may use. Authentication verifies the claimant. Authorization applies access policy.

### Calling OAuth an authentication protocol

OAuth 2.0 delegates limited access to an HTTP service. OpenID Connect adds an identity layer for authentication information.

### Assuming SSO means one account has every permission

SSO reduces repeated authentication. Each service should still apply its own authorization policy and local controls.

### Treating RBAC and rule-based access control as the same model

RBAC assigns permissions through roles. Rule-based control evaluates system rules and conditions.

### Adding access after a transfer without removing old access

Mover events require both additions and removals. Otherwise privileges accumulate.

### Protecting human accounts while ignoring services

Service accounts, workloads, devices, scripts, certificates, and API credentials can have broad access and long lifetimes. They need owners, lifecycle controls, and monitoring.

### Using periodic reviews as a substitute for timely deprovisioning

A quarterly review is too late for a terminated administrator. Event-driven removal should happen when the relationship or need changes.

### Assuming federation transfers responsibility

The relying service still decides which issuer and claims to trust, maps claims to local authorization, protects tokens, monitors activity, and plans for provider failure.

### Making recovery weaker than normal authentication

An attacker will choose the easiest path. Help-desk resets, backup channels, and lost-device recovery need controls appropriate to the account's impact.

<h2 id="review-checklist">16. Domain 5 review checklist</h2>

You should be able to explain:

- [ ] The difference among identification, identity proofing, authentication, authorization, and accounting
- [ ] How physical and logical access should reinforce the same asset policy
- [ ] Why registration, sponsorship, proofing, enrollment, and recovery are separate activities
- [ ] The difference among knowledge, possession, and biometric factors
- [ ] Why two knowledge checks do not provide multi-factor authentication
- [ ] What phishing-resistant and passwordless authentication mean
- [ ] How biometric false acceptance and false rejection affect threshold decisions
- [ ] How session controls protect the period after authentication
- [ ] The difference between SSO and federation
- [ ] The different purposes of SAML, OAuth 2.0, OpenID Connect, and SCIM
- [ ] How RBAC, rule-based, MAC, DAC, ABAC, and risk-based access control differ
- [ ] The roles of policy decision, enforcement, information, and administration points
- [ ] Why least privilege, need to know, separation of duties, and dual control solve different problems
- [ ] How joiner, mover, and leaver events change access
- [ ] Why access reviews need understandable context and the correct owner
- [ ] The difference between just-in-time access and just-in-time provisioning
- [ ] How PAM controls privileged credentials and sessions
- [ ] Why service accounts and workload identities require named owners and lifecycle controls
- [ ] The purposes and main concerns of Kerberos, LDAP, RADIUS, TACACS+, and certificate authentication
- [ ] How identity controls apply to AI agents and delegated automation

<h2 id="official-references">17. Official references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-63-4: Digital Identity Guidelines](https://csrc.nist.gov/pubs/sp/800/63/4/final)
- [NIST SP 800-63A-4: Identity Proofing and Enrollment](https://csrc.nist.gov/pubs/sp/800/63/a/4/final)
- [NIST SP 800-63B-4: Authentication and Authenticator Management](https://csrc.nist.gov/pubs/sp/800/63/b/4/final)
- [NIST SP 800-63C-4: Federation and Assertions](https://csrc.nist.gov/pubs/sp/800/63/c/4/final)
- [NIST SP 800-162: Guide to Attribute Based Access Control](https://csrc.nist.gov/pubs/sp/800/162/upd2/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [RFC 4120: The Kerberos Network Authentication Service](https://www.rfc-editor.org/rfc/rfc4120)
- [RFC 6749: The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
- [RFC 9700: Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700)
- [RFC 7644: System for Cross-domain Identity Management Protocol](https://www.rfc-editor.org/rfc/rfc7644)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [W3C Web Authentication Level 3](https://www.w3.org/TR/webauthn-3/)
