---
layout: layouts/article.njk
title: "CISSP Domain 8: Software Development Security"
description: Study CISSP Domain 8 with plain-language guidance on secure software lifecycles, development methods, CI/CD, repositories, application testing, acquired software, supply-chain controls, secure coding, APIs, software-defined security, and AI-assisted development.
permalink: /cissp/study-guide/software-development-security/
ogType: article
printable: true
printTitle: "CISSP Domain 8: Software Development Security"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 8
eyebrow: CISSP Domain 8 guide
lede: Build security into the way software is planned, created, tested, acquired, released, operated, changed, and retired instead of waiting for a final security review.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Software Development Security
    url: /cissp/study-guide/software-development-security/
toc:
  - id: domain-map
    label: Domain 8 map
  - id: decision-order
    label: Decision order
  - id: secure-sdlc
    label: Secure SDLC
  - id: development-methods
    label: Development methods
  - id: maturity-teams
    label: Maturity and teams
  - id: maintenance-change
    label: Maintenance and change
  - id: development-ecosystem
    label: Development ecosystem
  - id: pipelines-repositories
    label: Pipelines and repositories
  - id: application-testing
    label: Application testing
  - id: effectiveness
    label: Security effectiveness
  - id: acquired-software
    label: Acquired software
  - id: software-supply-chain
    label: Software supply chain
  - id: secure-coding
    label: Secure coding
  - id: api-security
    label: API security
  - id: software-defined-security
    label: Software-defined security
  - id: ai-development
    label: AI-assisted development
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 8
  - Software Development Security
  - secure SDLC
  - DevSecOps
  - CI/CD security
  - SAST
  - DAST
  - software supply chain
  - secure coding
  - API security
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Connect software decisions to governance, legal duties, policy, risk response, supplier oversight, and organizational priorities.
  - title: "CISSP Domain 2: Asset Security"
    url: /cissp/study-guide/asset-security/
    description: Classify source code, repositories, build artifacts, data, models, logs, credentials, and other software assets through their lifecycle.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Apply secure design principles, threat modeling, cryptography, system capabilities, architecture review, and lifecycle engineering.
  - title: "CISSP Domain 4: Communication and Network Security"
    url: /cissp/study-guide/communication-network-security/
    description: Protect application traffic, APIs, service-to-service communication, development environments, and deployment paths.
  - title: "CISSP Domain 5: Identity and Access Management"
    url: /cissp/study-guide/identity-access-management/
    description: Control developer, service, workload, pipeline, repository, and production identities with least privilege and strong authentication.
  - title: "CISSP Domain 6: Security Assessment and Testing"
    url: /cissp/study-guide/security-assessment-testing/
    description: Connect code review, application testing, penetration testing, evidence, metrics, reporting, remediation, and retesting.
  - title: "CISSP Domain 7: Security Operations"
    url: /cissp/study-guide/security-operations/
    description: Operate software securely through logging, monitoring, patching, incident response, change control, recovery, and retirement.
  - title: Security+ Security Architecture Guide
    url: /security-plus/sy0-701/study-guide/security-architecture/
    description: Refresh application, cloud, virtualization, automation, and secure-design foundations before applying the CISSP perspective.
---
Domain 8 accounts for 10 percent of the current CISSP exam outline. It asks whether an organization can **build, buy, test, release, operate, change, and retire software without treating security as a last-minute inspection**.

Software security is broader than writing code. It includes requirements, architecture, people, development methods, tools, repositories, build systems, dependencies, deployment pipelines, test evidence, supplier decisions, production monitoring, updates, and retirement. A secure function can still be delivered through an insecure pipeline. A well-written application can still inherit a vulnerable library. A strong scanner can still fail when nobody reviews its findings.

The strongest CISSP answer usually places security requirements and ownership early, applies controls throughout the lifecycle, protects the development environment, verifies the result, and keeps evidence that the process worked. A final penetration test can find important problems, but it cannot replace secure requirements, design review, controlled changes, protected repositories, or trustworthy builds.

<h2 id="domain-map">1. Map the Domain 8 objectives</h2>

The official outline divides Software Development Security into five objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 8 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Plain question</th></tr>
    </thead>
    <tbody>
      <tr><td>8.1</td><td>Secure Software Development Life Cycle</td><td>Is security included from planning through maintenance and retirement, regardless of the development method?</td></tr>
      <tr><td>8.2</td><td>Development ecosystem controls</td><td>Are languages, libraries, tools, environments, pipelines, repositories, runtimes, configuration, and testing protected?</td></tr>
      <tr><td>8.3</td><td>Software-security effectiveness</td><td>Can the organization show that software-security controls work and that changes, findings, and accepted exceptions are tracked?</td></tr>
      <tr><td>8.4</td><td>Acquired software</td><td>Does the organization evaluate commercial, open-source, third-party, managed, and cloud software before and after acquisition?</td></tr>
      <tr><td>8.5</td><td>Secure coding</td><td>Are developers given practical standards for avoiding source-code weaknesses, protecting APIs, and applying software-defined controls safely?</td></tr>
    </tbody>
  </table>
</div>

The objectives overlap. Development pipelines use identities from Domain 5, network paths from Domain 4, architecture principles from Domain 3, asset handling from Domain 2, supplier and risk decisions from Domain 1, testing from Domain 6, and operational monitoring and patching from Domain 7.

<h2 id="decision-order">2. Use the right software-security decision order</h2>

Software questions often present a tool as the answer. First determine where the problem belongs in the lifecycle.

A practical order is:

1. **Identify the business purpose, data, users, and harm that could occur.** Security requirements should follow what the software does and what it protects.
2. **Assign ownership and decision authority.** Product owners, architects, developers, security staff, operations teams, privacy staff, suppliers, and business leaders need clear responsibilities.
3. **Define requirements and acceptance criteria before implementation.** Include security, privacy, resilience, logging, maintenance, supplier, and retirement needs.
4. **Choose an architecture and development approach that can meet those requirements.** Threat modeling and design review belong before major implementation choices become expensive to change.
5. **Protect the development ecosystem.** Secure developer accounts, workstations, repositories, dependencies, secrets, build systems, test environments, signing keys, and deployment pipelines.
6. **Build and test in small repeatable steps.** Use review, automated checks, manual testing, and approval gates that match the possible harm.
7. **Release through controlled and verifiable processes.** Preserve provenance, approvals, build records, signatures, test evidence, and rollback capability.
8. **Monitor, patch, and improve in production.** Software security continues through operation, incident response, maintenance, and retirement.

A late scanner may be useful, but fixing the requirement, design, or process that produced the weakness is usually the more durable answer.

<h2 id="secure-sdlc">3. Integrate security throughout the Software Development Life Cycle</h2>

The **Software Development Life Cycle (SDLC)** is the organized process used to plan, design, build, test, release, operate, change, and retire software.

A **secure SDLC** includes security work in every phase instead of adding one security review at the end.

<div class="table-scroll" role="region" aria-label="Secure SDLC activities by phase" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Phase</th><th scope="col">Security work</th><th scope="col">Useful evidence</th></tr>
    </thead>
    <tbody>
      <tr><td>Planning</td><td>Identify stakeholders, purpose, data, laws, suppliers, possible harm, ownership, and budget.</td><td>Business case, scope, ownership record, initial risk assessment</td></tr>
      <tr><td>Requirements</td><td>Define authentication, authorization, privacy, logging, resilience, update, retention, and acceptance needs.</td><td>Approved security requirements and acceptance criteria</td></tr>
      <tr><td>Design</td><td>Review trust boundaries, data flows, attack paths, dependencies, failure behavior, and architecture choices.</td><td>Architecture diagrams, threat model, design decisions</td></tr>
      <tr><td>Implementation</td><td>Apply coding standards, peer review, dependency controls, secrets handling, and automated checks.</td><td>Review records, scan results, signed commits, dependency inventory</td></tr>
      <tr><td>Verification</td><td>Test requirements, misuse cases, interfaces, code, configuration, and operational behavior.</td><td>Test plans, results, findings, remediation, accepted exceptions</td></tr>
      <tr><td>Release</td><td>Use controlled builds, approvals, signing, provenance, deployment checks, and rollback plans.</td><td>Build record, release approval, signature, deployment evidence</td></tr>
      <tr><td>Operation</td><td>Monitor, patch, investigate, manage changes, review access, and measure performance.</td><td>Logs, alerts, patch records, change records, incident evidence</td></tr>
      <tr><td>Retirement</td><td>Remove access, secrets, data, integrations, infrastructure, support obligations, and obsolete components.</td><td>Retirement approval, disposal record, data-handling evidence</td></tr>
    </tbody>
  </table>
</div>

### Security requirements must be testable

“Make the application secure” cannot be verified. Better requirements identify expected behavior and conditions.

Examples:

- Administrators must use phishing-resistant multi-factor authentication.
- Sensitive records must be encrypted in transit and at rest with approved algorithms and managed keys.
- Authorization must be checked on every protected object and operation.
- Security-relevant events must include time, actor, action, result, and affected resource.
- The service must recover within the approved Recovery Time Objective.
- Unsupported dependencies must not enter a production build without an approved exception.

A requirement should be specific enough that someone can design for it, test it, and decide whether the result is acceptable.

### Threat modeling belongs before and during development

A **threat model** is a structured review of what the system protects, who or what may cause harm, where trust changes, how the system could be misused, and which safeguards are needed.

Update the threat model when the architecture, data flow, supplier, trust boundary, deployment model, or user population changes. A diagram created once and never revisited is documentation, not an active security process.

<h2 id="development-methods">4. Apply security regardless of the development method</h2>

A development method changes how work is organized. It does not remove the need for requirements, review, testing, evidence, or accountability.

### Waterfall

**Waterfall** organizes work into larger sequential phases such as requirements, design, implementation, testing, and release.

It can support formal approvals and detailed documentation, but a problem found late may be expensive to correct. Security reviews should occur within each phase rather than wait for final testing.

### Agile

**Agile** delivers work in smaller increments and uses frequent feedback to adjust priorities.

Security should appear in the product backlog, acceptance criteria, definition of done, architecture decisions, and recurring review. A security requirement postponed to an undefined future sprint is not integrated.

### DevOps and DevSecOps

**Development and Operations (DevOps)** brings software development and operations together so changes can be built, tested, released, and improved more frequently.

**Development, Security, and Operations (DevSecOps)** includes security in that shared workflow. It does not mean the security team owns every decision or that automated tools replace review.

Useful DevSecOps practices include:

- Reusable secure templates
- Automated policy checks
- Protected branches and required reviews
- Dependency and secret scanning
- Signed builds and artifacts
- Test gates based on severity and context
- Short-lived deployment credentials
- Controlled infrastructure changes
- Production monitoring that feeds lessons back to development

The goal is not maximum tool count. The goal is repeatable security decisions with fast useful feedback.

### Scaled Agile Framework

The **Scaled Agile Framework (SAFe)** coordinates Agile work across larger programs and teams. Security requirements still need owners, architecture support, funding, acceptance criteria, and evidence across the larger planning structure.

A framework can organize work. It does not guarantee that security work is complete or effective.

<h2 id="maturity-teams">5. Use maturity models and cross-functional teams to improve the process</h2>

A **maturity model** helps an organization measure how consistently a process is performed and plan the next practical improvement.

### Capability Maturity Model

The **Capability Maturity Model (CMM)** describes progression from inconsistent work toward defined, measured, and continually improved processes.

The important idea is not memorizing a label. It is recognizing that repeatability, measurement, and improvement are stronger than depending on individual effort or memory.

### Software Assurance Maturity Model

The **Software Assurance Maturity Model (SAMM)** is an OWASP model for assessing and improving an organization's software-security practices.

A maturity assessment can help answer:

- Which practices exist?
- Which teams use them consistently?
- What evidence supports the rating?
- Which improvement would reduce the most important exposure?
- How will the organization know the change worked?

A high score is not the objective. The objective is a development process that fits the organization's products, threats, obligations, and resources.

### Integrated Product Team

An **Integrated Product Team (IPT)** brings people from different disciplines together to make coordinated product decisions.

Members may include product owners, developers, architects, testers, security staff, privacy staff, operations teams, legal counsel, procurement, support staff, and business representatives.

The team should resolve requirements and tradeoffs early. Sending finished software to security for approval does not create an integrated team.

### Security champions

A **security champion** is a team member who helps bring security knowledge into ordinary development work. Champions can improve communication and local decision-making, but they do not remove accountability from managers, product owners, developers, or the security function.

<h2 id="maintenance-change">6. Protect software during operation, maintenance, and change</h2>

Released software continues to change. New features, dependencies, users, threats, regulations, infrastructure, and integrations can alter the security posture.

### Operation and maintenance

Operational software needs:

- Monitoring and alerting
- Vulnerability and patch management
- Dependency tracking
- Access reviews
- Certificate and key renewal
- Backup and recovery testing
- Capacity and availability management
- Incident response
- Secure support processes
- End-of-support and retirement planning

The production environment should not become a separate world that development teams cannot observe or learn from.

### Change management

**Change management** controls how a proposed change is requested, reviewed, approved, tested, implemented, observed, documented, and reversed.

Software changes should consider:

- Security and privacy impact
- Compatibility and dependency impact
- Required testing
- Migration and rollback
- Monitoring after release
- Updated documentation and threat models
- User and support communication
- Emergency authority and later review

A successful deployment only proves that the change ran. It does not prove that the change preserved security, privacy, resilience, or business requirements.

### Technical debt

**Technical debt** is future work created when a team chooses a faster or simpler solution now instead of a more maintainable one.

Security debt can include temporary permissions, old libraries, skipped tests, hard-coded secrets, weak logging, undocumented exceptions, unsupported platforms, and controls that were never automated.

Debt should be recorded with ownership, possible harm, priority, and a target date. An undocumented temporary workaround often becomes permanent.

<h2 id="development-ecosystem">7. Secure the development ecosystem</h2>

The development ecosystem includes the people, identities, workstations, languages, libraries, tools, environments, build systems, repositories, registries, runtimes, and services used to produce software.

### Programming languages and runtimes

A **programming language** provides the rules developers use to express software behavior.

A **runtime** is the environment that executes the software. It may provide memory management, libraries, permissions, process isolation, and other services.

Security considerations include:

- Memory safety
- Type safety
- Error handling
- Package and module systems
- Compiler and interpreter trust
- Supported versions
- Default configuration
- Runtime permissions
- Sandboxing and isolation
- Update and vulnerability history

A safer language can reduce certain mistakes, but it cannot correct broken authorization, unsafe business logic, exposed secrets, or insecure architecture by itself.

### Libraries and frameworks

A **library** is reusable code that an application calls. A **framework** provides a larger structure that application code fits into.

Controls should address:

- Approved sources
- Version pinning where appropriate
- Integrity verification
- Known vulnerabilities
- Transitive dependencies
- License obligations
- Maintenance activity
- Replacement options
- Removal of unused components

A dependency can save development time while also adding code, suppliers, update obligations, and possible weaknesses the organization did not write itself.

### Tool sets and Integrated Development Environments

An **Integrated Development Environment (IDE)** combines tools such as an editor, debugger, build support, code navigation, and extensions in one workspace.

Protect development tools by controlling:

- Approved software and extensions
- Updates and signatures
- Plugin permissions
- Secrets and local credentials
- Debug output and local data
- Remote development connections
- Administrative privileges
- Device security and monitoring

An IDE extension can read source code, execute commands, or access credentials depending on its permissions. Treat development plugins as software suppliers, not harmless decorations.

### Separate environments

Development, test, staging, and production environments should have clear purposes and controlled paths between them.

Good separation limits:

- Production data copied into lower environments
- Developer access to production
- Test credentials reused in production
- Unreviewed code promoted directly
- Debug settings exposed publicly
- Production secrets stored in developer tools

Synthetic or masked data is usually safer than copying sensitive production records into test systems.

<h2 id="pipelines-repositories">8. Protect repositories, configuration, and CI/CD pipelines</h2>

### Continuous Integration and Continuous Delivery

**Continuous Integration (CI)** automatically builds and tests changes as they are added to a shared codebase.

**Continuous Delivery (CD)** keeps approved changes ready for release through a repeatable pipeline. Some organizations use the same abbreviation for continuous deployment, where approved changes are released automatically.

A pipeline may have authority to read source code, retrieve secrets, create artifacts, sign releases, modify infrastructure, and deploy to production. That makes it high-value infrastructure.

Protect pipelines with:

- Strong authentication and least privilege
- Separate build and deployment roles
- Short-lived credentials
- Protected secrets
- Approved runners and build images
- Isolated untrusted builds
- Reviewed pipeline definitions
- Restricted production approvals
- Signed artifacts and provenance
- Tamper-resistant logs
- Dependency and tool version controls
- Rollback and recovery procedures

### Code repositories

A **code repository** stores source code and its change history.

Useful controls include:

- Protected branches
- Required peer review
- Signed commits or verified identities where appropriate
- Restrictions on force pushes and history deletion
- Secret scanning
- Access reviews
- Backup and recovery
- Audit logging
- Separation between personal and service identities
- Controlled external collaboration

Repository access does not automatically grant authority to approve or release a change. Separate contribution, review, merge, build, and deployment permissions when the possible harm justifies it.

### Software configuration management

**Software configuration management** identifies the approved versions of source code, dependencies, build instructions, configuration, documentation, and artifacts that make up a release.

It answers questions such as:

- What exactly was built?
- Which source and dependencies were used?
- Which configuration was approved?
- Who authorized the change?
- Can the release be reproduced?
- Can the organization return to the prior version?

A version number without trustworthy source, build, and dependency records is incomplete configuration control.

### Reproducible and verifiable builds

A **reproducible build** can produce the same output again from the same recorded inputs and process.

A **verifiable build** provides evidence that the released artifact came from the expected source and approved process.

Reproducibility can make tampering easier to detect, but it still depends on protected tools, dependencies, build environments, and records.

<h2 id="application-testing">9. Match application-security testing to the question being asked</h2>

No single test sees every type of weakness. Use several methods and understand their limits.

<div class="table-scroll" role="region" aria-label="Application security testing methods" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Method</th><th scope="col">Plain meaning</th><th scope="col">Strengths and limits</th></tr>
    </thead>
    <tbody>
      <tr><td>Static Application Security Testing (SAST)</td><td>Examines source code or compiled code without running the application.</td><td>Can provide early code-level feedback, but may produce false positives and may miss runtime configuration or business-logic problems.</td></tr>
      <tr><td>Dynamic Application Security Testing (DAST)</td><td>Tests a running application from the outside.</td><td>Observes real responses and exposed interfaces, but may not identify the exact vulnerable code and sees only reachable behavior.</td></tr>
      <tr><td>Software Composition Analysis (SCA)</td><td>Identifies third-party and open-source components and checks them for known concerns.</td><td>Improves dependency visibility, but accuracy depends on the inventory, vulnerability data, version detection, and context.</td></tr>
      <tr><td>Interactive Application Security Testing (IAST)</td><td>Observes a running application from inside the application while tests exercise it.</td><td>Can connect runtime behavior to code, but needs instrumentation and useful test coverage.</td></tr>
      <tr><td>Manual code review</td><td>A person examines code and design decisions.</td><td>Can find logic, authorization, and context problems that tools miss, but requires skill, time, and a defined scope.</td></tr>
      <tr><td>Fuzz testing</td><td>Sends many unexpected or malformed inputs to find crashes and unsafe behavior.</td><td>Useful for parsers and interfaces, but results depend on input design, coverage, and monitoring.</td></tr>
      <tr><td>Penetration testing</td><td>Attempts to exploit weaknesses in a defined environment and scope.</td><td>Shows realistic attack paths, but is a time-limited sample and does not prove that untested paths are safe.</td></tr>
    </tbody>
  </table>
</div>

### Place tests where feedback is useful

- Requirements reviews can find missing security behavior before code exists.
- Threat modeling can find unsafe trust assumptions before implementation.
- IDE checks can give immediate developer feedback.
- Pre-commit checks can block obvious secrets or prohibited files.
- CI checks can run repeatable tests on every change.
- Pre-release testing can evaluate the integrated system.
- Production monitoring can reveal failures and attack patterns that test environments did not reproduce.

Moving a test earlier is useful only when the team can understand and act on the result. A fast flood of unreviewed findings does not create secure software.

### Findings need context

A tool's severity is not automatically the organization's priority. Consider:

- Reachability
- Data and business impact
- Exploitability
- Existing safeguards
- User privileges required
- Internet exposure
- Active exploitation
- Component use
- Fix availability
- Operational and safety impact of the change

False positives waste effort. False negatives create false confidence. Validate important findings and measure whether the testing process finds meaningful problems early enough to act.

<h2 id="effectiveness">10. Assess whether software-security controls work</h2>

A control is effective when it produces the intended result in the real environment. Having a policy, tool, or checklist is not enough.

### Useful evidence

Evidence may include:

- Approved security requirements
- Threat models and architecture reviews
- Code-review records
- Test results and coverage
- Dependency inventories
- Build and signing records
- Repository and pipeline logs
- Change approvals
- Findings, remediation, exceptions, and retesting
- Production alerts and incidents
- Patch and update records
- Access reviews
- Supplier evidence
- Metrics and trend reports

### Audit and log changes

Changes should be traceable to an identity, request, review, approval, build, test result, artifact, deployment, and outcome when the possible harm justifies that level of evidence.

Logs should be protected from unauthorized alteration and retained long enough to support investigations, audits, defect analysis, and supplier obligations.

### Measure outcomes, not only activity

Weak measures count work without showing results:

- Number of scans run
- Number of developers trained
- Number of policies published
- Number of findings opened

Stronger measures connect work to outcomes:

- Time to correct important weaknesses
- Percentage of releases with complete provenance
- Repeated weakness types by root cause
- Age and ownership of approved exceptions
- Percentage of critical dependencies with a supported upgrade path
- Findings discovered before release versus after release
- Production incidents linked to known development weaknesses
- Time required to revoke a compromised pipeline credential

A metric can guide improvement, but it can also encourage shortcuts if people are rewarded for the number rather than the underlying result.

### Risk analysis and mitigation

When a weakness cannot be corrected immediately, document:

- The affected software and versions
- Possible loss, harm, or disruption
- Exposure and exploitability
- Existing and temporary safeguards
- Owner and approving authority
- Monitoring requirements
- Planned correction
- Expiration or review date

Calling a weakness “accepted” does not remove it. Acceptance means the authorized owner understands the remaining exposure and chooses to proceed for a documented reason.

<h2 id="acquired-software">11. Assess the security impact of acquired software</h2>

The organization remains responsible for its own use of software even when another party created or operates it.

### Commercial off-the-shelf software

**Commercial off-the-shelf (COTS) software** is a ready-made product sold to many customers.

Review:

- Security capabilities and configuration
- Update and support practices
- Vulnerability disclosure process
- Data handling and privacy
- Identity and integration options
- Logging and audit access
- Contract terms and service levels
- End-of-life and migration options
- Supplier stability and concentration exposure

COTS software may reduce development effort, but customers usually have less visibility and control over the source and release process.

### Open-source software

**Open-source software** makes its source code available under a license that permits defined forms of use, review, modification, or distribution.

Source availability does not guarantee active review, secure design, timely maintenance, or rapid fixes. Evaluate:

- Maintainer activity
- Release and signing practices
- Vulnerability history
- Dependency chain
- License obligations
- Community and commercial support
- Replacement options
- Internal ability to patch or maintain a fork

The organization should know which open-source components it uses and who will respond when a serious weakness appears.

### Third-party custom software

For software developed by a supplier, contracts can address:

- Security requirements
- Development and testing practices
- Right to review evidence
- Vulnerability disclosure and correction time
- Dependency and component transparency
- Ownership of source and intellectual property
- Access to source code or escrow where justified
- Data location and handling
- Incident notification
- Maintenance and support
- Secure transition and termination

A contract can create obligations. It cannot prove that the supplier follows them, so use appropriate evidence, assessment, and monitoring.

### Managed and cloud services

A managed or cloud service may combine software, infrastructure, operations, identities, data, and supplier support.

Apply the shared-responsibility model. Determine which party handles:

- Application code
- Platform and runtime
- Infrastructure
- Identity and access
- Configuration
- Logging and monitoring
- Encryption and keys
- Backup and recovery
- Vulnerability and patch management
- Incident response
- Data export and deletion

Do not assume that “managed” means every security responsibility has moved to the provider.

<h2 id="software-supply-chain">12. Protect the software supply chain</h2>

The **software supply chain** includes the people, organizations, source code, libraries, tools, services, build systems, repositories, registries, infrastructure, and processes involved in producing and delivering software.

A weakness or compromise can enter through any of these parts.

### Software Bill of Materials

A **Software Bill of Materials (SBOM)** is a structured inventory of the components included in software and their supply-chain relationships.

An SBOM helps answer:

- Is a vulnerable component present?
- Which products and versions use it?
- Who supplied it?
- Which teams need to respond?
- Is an upgrade or replacement available?

An SBOM improves visibility. It does not prove that a component is safe, reachable, correctly configured, or free of unknown weaknesses.

### Vulnerability Exploitability eXchange

**Vulnerability Exploitability eXchange (VEX)** communicates whether a known vulnerability is believed to affect a specific product and why.

VEX can add context to component vulnerability data, but the statement must come from a trustworthy process and should be updated when facts change.

### Provenance and integrity

**Software provenance** is information about where software came from and how it was produced.

Useful provenance may identify:

- Source revision
- Dependencies
- Build instructions
- Build service and environment
- Tools and versions
- Actor or service identity
- Time of build
- Tests and approvals
- Artifact hash or signature

Signatures and hashes can help detect change and confirm origin when keys and verification processes are trustworthy.

### Common supply-chain controls

- Approve dependency sources and registries
- Pin or constrain versions appropriately
- Verify signatures and hashes
- Scan source, dependencies, secrets, containers, and artifacts
- Protect package publishing identities
- Isolate untrusted builds
- Use minimal build and runtime images
- Remove unused components and tools
- Preserve build records and provenance
- Monitor supplier advisories
- Maintain upgrade and replacement plans
- Test recovery from repository, registry, or build-service compromise

The strongest control set reduces both the chance of compromise and the time needed to identify, contain, and replace affected components.

<h2 id="secure-coding">13. Define and apply secure coding guidelines</h2>

A **secure coding standard** gives developers practical rules for avoiding common weaknesses in the languages, frameworks, and systems they use.

Useful standards are specific enough to apply during ordinary work and are supported by examples, libraries, tools, review, training, and feedback.

### Validate input and enforce meaning

**Input validation** checks whether data has the expected type, length, format, range, source, and meaning before the application trusts or uses it.

Prefer allowlists that define acceptable values when the valid set is known. Reject or safely handle unexpected input. Validation should occur at the trust boundary and again where business rules require it.

Validation does not replace output encoding, parameterized queries, authorization, or safe memory handling.

### Prevent injection

**Injection** occurs when untrusted data is interpreted as a command, query, or instruction.

Use:

- Parameterized queries
- Safe APIs
- Context-appropriate output encoding
- Strict command construction
- Least-privileged service identities
- Input validation
- Separation of data from instructions

Escaping rules differ among SQL, shell commands, HTML, JavaScript, directory queries, templates, and other interpreters.

### Enforce authorization at the object and action

Authentication proves an identity. Authorization decides what that identity may do.

Check authorization on every protected request, object, function, and workflow. Do not rely on a hidden button, predictable identifier, client-side check, or earlier page to enforce access.

### Protect secrets and cryptographic material

Do not hard-code passwords, API keys, tokens, private keys, or production connection strings in source code, test data, build logs, or configuration committed to a repository.

Use approved secret-management systems, limited access, short lifetimes where practical, rotation, monitoring, and rapid revocation.

### Handle errors safely

Applications should fail in a controlled state, return useful but limited error messages, preserve diagnostic evidence, and avoid exposing stack traces, secrets, internal paths, queries, or sensitive data to users.

Error handling should not silently grant access, skip validation, or continue with an unsafe default.

### Protect memory and concurrency

Depending on the language and system, secure coding may need to address:

- Buffer overflows
- Use-after-free errors
- Integer overflow and underflow
- Null-pointer errors
- Uninitialized memory
- Race conditions
- Time-of-check to time-of-use problems
- Unsafe deserialization
- Resource exhaustion

Use memory-safe languages or safe language features when practical, compiler protections, tested libraries, bounds checks, ownership rules, concurrency controls, and focused testing.

### Log useful events without creating new exposure

Record security-relevant actions such as authentication, authorization failure, privilege change, sensitive data access, administrative action, configuration change, and important validation failure.

Do not place passwords, full tokens, cryptographic keys, or unnecessary sensitive data in logs. Protect log integrity and access.

### Use secure defaults

A new installation or feature should begin in a reasonably protected state. Optional insecure behavior should require an explicit informed decision rather than being enabled because it is easier.

<h2 id="api-security">14. Protect Application Programming Interfaces</h2>

An **Application Programming Interface (API)** is a defined way for software components or services to exchange requests and responses.

APIs expose data and business functions directly, so security must cover more than the network connection.

### Authenticate the caller and authorize each request

- Use appropriate authentication for users, devices, services, and workloads.
- Validate token issuer, audience, signature, lifetime, and intended use.
- Check object-level and function-level authorization on every request.
- Do not trust an identifier merely because the client supplied it.
- Apply least privilege to service-to-service access.

### Validate requests and responses

- Enforce schemas, types, ranges, lengths, and allowed values.
- Reject unexpected fields when appropriate.
- Limit request and response size.
- Encode outputs for the receiving context.
- Avoid returning unnecessary sensitive fields.
- Treat data from third-party APIs as untrusted input.

### Control use and abuse

- Apply rate limits and quotas based on identity and business context.
- Limit expensive queries and bulk operations.
- Use pagination and bounded filters.
- Detect scraping, enumeration, credential attacks, and abnormal automation.
- Protect asynchronous jobs, webhooks, and callback URLs.

### Maintain an API inventory

Track:

- Owners
- Purpose
- Data and classification
- Authentication and authorization model
- External and internal consumers
- Versions
- Dependencies
- Internet exposure
- Logging
- Support status
- Retirement plan

An undocumented old version may remain reachable after the main application has moved on.

### Protect API documentation and errors

Documentation is necessary for legitimate use and testing, but access should match the audience. Avoid exposing internal endpoints, test credentials, secrets, or sensitive examples.

Errors should help the caller correct a request without revealing internal code, queries, paths, or security controls.

<h2 id="software-defined-security">15. Apply software-defined security with controlled policy and automation</h2>

**Software-defined security** uses software, APIs, and automation to create, configure, enforce, or change security controls.

Examples include:

- Infrastructure as code
- Policy as code
- Automated firewall and access rules
- Cloud security configuration
- Container and orchestration policy
- Automated certificate and secret delivery
- Pipeline security gates
- Software-defined networking controls

Benefits include consistency, repeatability, reviewable changes, rapid deployment, and easier recovery. The same automation can also spread an unsafe change quickly.

Protect software-defined controls with:

- Version control
- Peer review
- Testing in representative environments
- Least-privileged automation identities
- Separation of author and approver where appropriate
- Policy validation
- Protected state and secrets
- Signed or verified modules
- Change records
- Drift detection
- Rollback
- Monitoring after deployment

Treat code that configures security as production security infrastructure, not merely as convenience scripting.

<h2 id="ai-development">16. Secure AI-assisted development and AI software components</h2>

AI can help generate, review, test, explain, and refactor code. It can also produce insecure or nonexistent code, dependencies, APIs, and configuration while sounding confident.

### AI-assisted coding

Controls should address:

- Human review of generated code
- Testing against the real requirements and environment
- Secure handling of source code, prompts, secrets, and customer data
- Approved models and services
- License and intellectual-property concerns
- Logging and retention
- Dependency verification
- Detection of hallucinated packages or functions
- Use of generated code in high-impact systems

Never treat generated code as trusted merely because it compiles or passes a small test set.

### AI-specific software assets

AI systems may include:

- Training and evaluation data
- Model code
- Pretrained models
- Model weights
- Embeddings
- Prompt templates
- Guardrails
- Plugins and tools
- Vector databases
- Inference services
- Monitoring data

Track ownership, origin, versions, licenses, access, integrity, dependencies, and support for these assets just as for other software components.

### AI software threats

Development teams may need to address:

- Poisoned training or fine-tuning data
- Model or dependency tampering
- Prompt injection
- Unsafe tool use
- Sensitive-data disclosure
- Model extraction
- Inference attacks
- Hallucinated insecure code
- Biased or unsafe business logic
- Untrusted model output passed into commands or APIs

AI output is untrusted data. Validate it before using it to make a security decision, execute a command, change infrastructure, or access sensitive information.

### Secure the AI supply chain

Evaluate model providers, datasets, libraries, frameworks, hosting services, plugins, and update channels. Record provenance where possible and verify that changes in model, data, or configuration go through controlled testing and approval.

<h2 id="exam-traps">17. Avoid common Domain 8 exam traps</h2>

### Choosing a final test instead of an earlier lifecycle control

A penetration test may find a weakness, but the better answer may be to define the requirement, correct the design, protect the pipeline, or improve the coding standard so the weakness is less likely to recur.

### Treating DevSecOps as a tool purchase

DevSecOps is shared secure delivery work supported by people, process, architecture, automation, and feedback. Buying scanners does not create ownership or integration.

### Assuming open source is automatically safer or less safe

Evaluate the actual component, maintainers, provenance, vulnerabilities, license, support, dependencies, and ability to respond. Source availability alone does not determine security.

### Confusing SAST, DAST, SCA, and IAST

Ask what is being examined:

- Code without running: SAST
- Running application from outside: DAST
- Third-party components: SCA
- Running application with internal instrumentation: IAST

### Treating an SBOM as proof of security

An SBOM is an inventory. It helps identify affected software, but it does not prove that components are safe, reachable, correctly configured, or uncompromised.

### Trusting a supplier because the contract requires security

A contract creates obligations. Assessment, evidence, monitoring, testing, and incident handling help determine whether the obligations are met.

### Fixing every scanner finding in severity order

Prioritize using business impact, reachability, exploitability, exposure, active threats, existing safeguards, and fix consequences. Validate important findings before acting.

### Assuming a successful deployment is a secure deployment

A release can run successfully while exposing secrets, weakening authorization, disabling logging, using a vulnerable dependency, or bypassing approval.

### Trusting AI-generated code because it looks reasonable

Generated code requires the same requirements, review, testing, dependency checks, and accountability as human-written code.

<h2 id="review-checklist">18. Review Domain 8 before the exam</h2>

Confirm that you can:

- Explain the SDLC in plain language and place security work in every phase.
- Distinguish Waterfall, Agile, DevOps, DevSecOps, and SAFe without assuming one method guarantees security.
- Explain what maturity models measure and why evidence matters.
- Describe the purpose of an Integrated Product Team and security champions.
- Connect operation, maintenance, change management, and retirement to software security.
- Identify development-ecosystem assets and explain why repositories, IDEs, build systems, and runtimes need protection.
- Distinguish Continuous Integration, Continuous Delivery, and continuous deployment.
- Explain software configuration management, reproducible builds, and provenance.
- Distinguish SAST, DAST, SCA, IAST, manual review, fuzz testing, and penetration testing.
- Explain why test findings need context, validation, ownership, remediation, and retesting.
- Assess COTS, open-source, custom third-party, managed, and cloud software.
- Explain the purpose and limits of an SBOM and VEX.
- Describe software-supply-chain controls from source through release and update.
- Apply secure coding guidance to input, output, queries, authorization, secrets, errors, memory, concurrency, and logging.
- Explain object-level and function-level API authorization.
- Describe rate limiting, schema validation, API inventory, versioning, and safe third-party API use.
- Explain software-defined security, policy as code, and infrastructure as code.
- Identify AI-assisted development concerns and treat model output as untrusted data.
- Prefer early, repeatable, evidence-based controls over a one-time final inspection.

<h2 id="official-references">19. Use current primary references</h2>

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST SP 800-218, Secure Software Development Framework Version 1.1](https://csrc.nist.gov/pubs/sp/800/218/final)
- [NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models](https://csrc.nist.gov/pubs/sp/800/218/a/final)
- [NIST SP 800-161 Revision 1, Cybersecurity Supply Chain Risk Management Practices](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final)
- [NIST SP 800-53 Revision 5, Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST Secure Software Development Framework project](https://csrc.nist.gov/Projects/ssdf)
- [OWASP Software Assurance Maturity Model](https://owasp.org/www-project-samm/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Top 10](https://owasp.org/Top10/)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)

Use the ISC2 outline to confirm exam scope. Use NIST and OWASP material to deepen implementation knowledge and connect software-security decisions to current practices.
