---
layout: layouts/article.njk
title: "CISSP Domain 2: Asset Security"
description: Study CISSP Domain 2 with practical guidance on classification, handling, ownership, inventories, data roles, lifecycle decisions, retention, sanitization, and data protection controls.
permalink: /cissp/study-guide/asset-security/
ogType: article
printable: true
printTitle: "CISSP Domain 2: Asset Security"
author: certHappens
datePublished: 2026-08-05
dateModified: 2026-08-05
articleSection: CISSP Domain 2
eyebrow: CISSP Domain 2 guide
lede: Follow information and other assets from identification and classification through ownership, use, retention, protection, and verified destruction.
breadcrumbs:
  - label: Home
    url: /
  - label: CISSP
    url: /cissp/
  - label: Study Guide
    url: /cissp/study-guide/
  - label: Asset Security
    url: /cissp/study-guide/asset-security/
toc:
  - id: domain-map
    label: Domain 2 map
  - id: decision-order
    label: Decision order
  - id: classification
    label: Classification
  - id: handling
    label: Handling requirements
  - id: provisioning
    label: Ownership and inventory
  - id: data-roles
    label: Data roles
  - id: lifecycle
    label: Data lifecycle
  - id: retention
    label: Retention and support
  - id: remanence
    label: Remanence and destruction
  - id: controls
    label: Data controls
  - id: ai-assets
    label: AI assets
  - id: exam-traps
    label: Common exam traps
  - id: review-checklist
    label: Review checklist
  - id: official-references
    label: Official references
keywords:
  - CISSP Domain 2
  - Asset Security
  - data classification
  - asset ownership
  - data lifecycle
  - data retention
  - media sanitization
  - data loss prevention
relatedLinks:
  - title: CISSP Study Guide
    url: /cissp/study-guide/
    description: Return to the eight-domain roadmap, exam perspective, and preparation sequence.
  - title: "CISSP Domain 1: Security and Risk Management"
    url: /cissp/study-guide/security-risk-management/
    description: Review governance, risk ownership, legal duties, policy, continuity, and supplier decisions that shape asset requirements.
  - title: "CISSP Domain 3: Security Architecture and Engineering"
    url: /cissp/study-guide/security-architecture-engineering/
    description: Connect asset requirements to secure design, system capabilities, architecture, cryptography, facilities, and lifecycle engineering.
  - title: "Security+ Domain 3: Security Architecture"
    url: /security-plus/sy0-701/study-guide/security-architecture/
    description: Refresh data protection, resilience, cloud, virtualization, and architecture concepts at the foundational level.
  - title: Hashing, Encryption, and Encoding Quick Reference
    url: /security-plus/quick-review/hashing-encryption-encoding/
    description: Compare common methods used to protect confidentiality and integrity across different data states.
---
Domain 2 accounts for 10 percent of the current CISSP exam outline. Its central question is simple to state and difficult to answer well: what does the organization have, why does it matter, who is accountable for it, and what must happen to it throughout its useful life?

Asset Security is not limited to files stored on servers. Assets include information, devices, software, services, accounts, certificates, intellectual property, cloud resources, backups, logs, models, facilities, and business processes. Some are tangible. Others exist only as rights, records, configurations, relationships, or knowledge.

A good answer connects business value and potential harm to specific handling requirements. A classification label without an owner, inventory, retention rule, or enforceable control is decoration rather than protection.

<h2 id="domain-map">Domain 2 map</h2>

The official outline divides Asset Security into six objectives:

<div class="table-scroll" role="region" aria-label="CISSP Domain 2 objective map" tabindex="0">
  <table>
    <thead>
      <tr><th scope="col">Objective</th><th scope="col">Main focus</th><th scope="col">Questions to ask</th></tr>
    </thead>
    <tbody>
      <tr><td>2.1</td><td>Information and asset classification</td><td>What is the asset, what harm could follow from compromise, and which label or category fits?</td></tr>
      <tr><td>2.2</td><td>Handling requirements</td><td>How may the asset be created, accessed, stored, copied, transmitted, shared, transported, and disposed?</td></tr>
      <tr><td>2.3</td><td>Secure provisioning</td><td>Who owns the asset, where is it recorded, and how is it approved, configured, assigned, tracked, and recovered?</td></tr>
      <tr><td>2.4</td><td>Data lifecycle</td><td>Which roles, locations, processing activities, maintenance steps, retention rules, and destruction methods apply?</td></tr>
      <tr><td>2.5</td><td>Asset retention</td><td>How long is the asset needed, which obligations apply, and what happens at end of life or end of support?</td></tr>
      <tr><td>2.6</td><td>Security controls and compliance</td><td>Which controls protect the asset in use, in transit, and at rest, and how should requirements be scoped and tailored?</td></tr>
    </tbody>
  </table>
</div>

These objectives form one lifecycle. Classification drives handling. Handling depends on ownership and location. Retention affects storage, backup, legal discovery, cost, and exposure. Destruction must address every copy, including replicas and third-party holdings. Controls must follow the asset wherever it goes.

<h2 id="decision-order">Use the right decision order</h2>

CISSP questions often present a control before the organization has established the requirement. Encryption, Data Loss Prevention, or a Cloud Access Security Broker may be useful, but a product is not the first answer when the asset, owner, classification, or obligation is still unknown.

A practical sequence is:

1. **Identify the asset and business purpose.** Determine what the asset is, how it supports the organization, and which process depends on it.
2. **Assign accountable ownership.** An owner approves classification, use, access, retention, and risk decisions. Technical teams usually implement those decisions.
3. **Determine value and potential impact.** Consider confidentiality, integrity, availability, privacy, safety, legal duties, intellectual property, financial harm, and mission effect.
4. **Classify and label when appropriate.** Apply the organization's approved scheme and document the basis for the decision.
5. **Define handling requirements.** State who may access the asset and how it may be stored, transmitted, copied, shared, transported, and disposed.
6. **Record location and dependencies.** Include backups, logs, replicas, endpoints, cloud regions, suppliers, software services, and derived data.
7. **Select and tailor controls.** Match controls to the asset, data state, threat, obligation, and operating environment.
8. **Set retention and disposal rules.** Reconcile business value with legal, regulatory, contractual, privacy, and evidentiary requirements.
9. **Monitor changes and verify outcomes.** Reclassify when sensitivity changes, review ownership and access, validate sanitization, and update inventory after migration, retirement, or transfer.

If a scenario says the data owner has already approved the classification and handling standard, do not restart the process. Look for the next missing action. If no owner or inventory exists, deploying a control may only hide the governance gap.

<h2 id="classification">Identify and classify information and assets</h2>

Classification groups assets according to value, sensitivity, criticality, obligations, or the harm that could result from compromise. It helps the organization apply stronger controls where they are justified and avoid wasting the same effort on everything.

<h3>Information classification and asset classification</h3>

**Information classification** focuses on the content and the consequences of unauthorized disclosure, alteration, loss, misuse, or unavailability. Examples include customer records, source code, financial forecasts, legal strategy, credentials, research data, and operational logs.

**Asset classification** can include the broader resource that stores, processes, transports, or supports information. A server, laptop, industrial controller, software service, certificate authority, building, backup system, or machine-learning model may be classified according to business criticality, the information it handles, replacement difficulty, safety impact, or operational dependency.

The classifications influence each other, but they are not identical. A low-cost device can process highly sensitive information. An empty replacement server may contain no sensitive data but still be critical to availability because the business depends on its role.

<h3>Base classification on impact</h3>

A classification decision should consider more than secrecy:

- **Confidentiality:** What harm could follow from unauthorized disclosure?
- **Integrity:** What harm could follow from unauthorized or incorrect modification?
- **Availability:** What harm could follow if the asset becomes unavailable or unreliable?
- **Privacy:** Could processing create problems for individuals even without a traditional breach?
- **Legal and contractual duties:** Which laws, regulations, licenses, agreements, or industry rules apply?
- **Business value and criticality:** How does the asset support revenue, safety, trust, mission, or essential operations?
- **Replacement and recovery:** Can the asset be recreated, restored, purchased, or substituted within the required time?
- **Aggregation and inference:** Could several low-sensitivity items reveal sensitive information when combined?

Organizations use different labels. A private company might use Public, Internal, Confidential, and Restricted. A government may use statutory categories. The labels themselves are less important than consistent criteria and enforceable handling rules.

Do not assume that the highest confidentiality label automatically means the highest availability requirement. Public emergency instructions may require little confidentiality but very high integrity and availability. A confidential archive may tolerate several hours of downtime while a public safety system cannot.

<h3>Ownership, labeling, and reclassification</h3>

The data or asset owner is normally responsible for approving the classification because the owner understands business value, obligations, and acceptable use. Security and privacy specialists advise. Custodians apply labels and controls. Users follow the handling rules.

Classification is not permanent by default. Information may become less sensitive after public release, contract completion, patent filing, declassification, or expiration of a business event. It may become more sensitive after aggregation, enrichment, a merger, a legal hold, or a change in threat conditions.

A mature process defines:

- Who may classify and reclassify
- Which criteria support each level
- How labels appear in digital and physical forms
- How inherited or derived information is treated
- When classifications are reviewed
- Who approves downgrading or declassification
- How exceptions are documented

<h2 id="handling">Establish handling requirements</h2>

Handling requirements translate a classification into actions. They should be specific enough that users, administrators, suppliers, and automated systems can follow them.

A handling standard may address:

<div class="table-scroll" role="region" aria-label="Asset handling requirements" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">Activity</th><th scope="col">Possible requirements</th></tr></thead>
    <tbody>
      <tr><td data-label="Activity">Creation and collection</td><td data-label="Possible requirements">Approved purpose, minimum necessary data, source validation, consent or authority, and immediate labeling.</td></tr>
      <tr><td data-label="Activity">Access</td><td data-label="Possible requirements">Need to know, least privilege, role approval, strong authentication, logging, and periodic review.</td></tr>
      <tr><td data-label="Activity">Storage</td><td data-label="Possible requirements">Approved repositories, encryption, geographic limits, backup, physical protection, and separation from lower-trust data.</td></tr>
      <tr><td data-label="Activity">Transmission</td><td data-label="Possible requirements">Approved protocols, encryption, recipient verification, integrity protection, and restrictions on personal accounts or removable media.</td></tr>
      <tr><td data-label="Activity">Copying and printing</td><td data-label="Possible requirements">Business justification, copy limits, markings, secure printers, inventory, and prompt retrieval.</td></tr>
      <tr><td data-label="Activity">Sharing</td><td data-label="Possible requirements">Contract, purpose limitation, minimum fields, approved recipients, expiration, and downstream protection.</td></tr>
      <tr><td data-label="Activity">Transport</td><td data-label="Possible requirements">Custody records, tamper protection, approved couriers, encryption, tracking, and incident reporting.</td></tr>
      <tr><td data-label="Activity">Retention and disposal</td><td data-label="Possible requirements">Retention schedule, legal hold checks, approved sanitization, verification, and destruction records.</td></tr>
    </tbody>
  </table>
</div>

A label should travel with the asset when practical, but a label alone cannot enforce behavior. Controls may include metadata tags, access policies, encryption keys, storage rules, transport procedures, contract clauses, and monitoring.

<h3>Minimize unnecessary data</h3>

Collecting or copying information creates continuing responsibilities. Before acquiring data, ask whether the organization needs it, whether a less sensitive form would work, how long it will remain useful, and whether it can be aggregated, masked, tokenized, or anonymized.

Data minimization reduces breach impact, privacy risk, discovery burden, storage cost, and the number of systems that need controls. It also makes destruction more achievable because fewer copies exist.

<h2 id="provisioning">Provision information and assets securely</h2>

Provisioning begins before an asset enters service. The organization should approve the need, assign ownership, record the asset, establish configuration and handling requirements, and define how it will be transferred or retired.

<h3>Information and asset ownership</h3>

Ownership means accountability, not necessarily possession or daily administration. An owner typically decides or approves:

- Classification and criticality
- Authorized uses and users
- Access criteria
- Retention and disposal
- Recovery requirements
- Risk acceptance and exceptions
- Periodic review

The owner may delegate tasks, but accountability remains. A storage administrator can maintain a database without having authority to decide that every employee should read it.

<h3>Maintain a useful inventory</h3>

An inventory should include enough context to support decisions. A list of serial numbers is not sufficient for cloud services, information, software, or business dependencies.

Useful fields may include:

- Asset identifier and description
- Owner and custodian
- Classification and criticality
- Physical or logical location
- Business service and dependencies
- Data types processed
- Approved users or roles
- Supplier and contract
- Configuration or baseline reference
- Support status and renewal date
- Recovery objective and backup arrangement
- Retention and disposal requirement
- Last review and current lifecycle state

Include tangible and intangible assets. Common omissions include cloud subscriptions, unmanaged software-as-a-service accounts, service accounts, certificates, encryption keys, source repositories, domain names, data sets, application programming interfaces, models, algorithms, licenses, documentation, and institutional knowledge.

Discovery tools can help find assets, but automated discovery does not assign ownership or explain business value. Inventory quality depends on reconciliation with procurement, finance, identity, configuration management, cloud management, contracts, and operational records.

<h3>Control shadow assets and transfers</h3>

A business unit may create a cloud service with a credit card, copy data into a collaboration platform, or deploy an application outside the standard process. Blocking every experiment may be unrealistic, but unknown assets create unmanaged risk.

Provide an approval path that is usable, discover activity through technical and financial records, and bring legitimate services into inventory and governance. When ownership changes, transfer access, records, keys, contracts, recovery duties, and risk decisions rather than changing only a name in a database.

<h2 id="data-roles">Understand data roles</h2>

The official outline names owners, controllers, custodians, processors, users, and data subjects. Terminology varies among laws and organizations, so focus on authority and responsibility.

<div class="table-scroll" role="region" aria-label="Data role comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Role</th><th scope="col">Typical responsibility</th><th scope="col">Common mistake</th></tr></thead>
    <tbody>
      <tr><td>Data owner</td><td>Approves classification, access, use, retention, and protection requirements for organizational data.</td><td>Assuming the database administrator owns the business decision.</td></tr>
      <tr><td>Data controller</td><td>Determines the purposes and means of processing personal data within the applicable legal context.</td><td>Assuming outsourcing removes the controller's accountability.</td></tr>
      <tr><td>Data custodian</td><td>Implements storage, backup, access, protection, and operational requirements on behalf of the owner.</td><td>Allowing the custodian to change classification without business approval.</td></tr>
      <tr><td>Data processor</td><td>Processes personal data for a controller according to instructions and applicable obligations.</td><td>Treating a processor as free to reuse the data for unrelated purposes.</td></tr>
      <tr><td>Data user</td><td>Uses information for an authorized purpose and follows handling requirements.</td><td>Assuming legitimate access permits unlimited copying or sharing.</td></tr>
      <tr><td>Data subject</td><td>The person to whom personal data relates.</td><td>Confusing the subject with the organization that owns the system or record.</td></tr>
    </tbody>
  </table>
</div>

One organization can hold several roles. A service provider may process customer data for a client and act as controller for its own employee records. Contracts should state roles, instructions, permitted use, security requirements, incident duties, return or destruction, audit rights, and subprocessor conditions.

<h2 id="lifecycle">Manage the data lifecycle</h2>

Data moves through collection, use, maintenance, sharing, retention, and destruction. It may be transformed, replicated, combined, summarized, or used to create new assets. Lifecycle management must follow those changes.

<h3>Collection</h3>

Before collection, identify purpose, authority, minimum necessary fields, source, expected quality, classification, owner, retention, and notice or consent requirements. Collecting data first and deciding how to govern it later creates avoidable exposure.

Validate provenance and integrity when decisions depend on the data. An authorized source can still provide incomplete, outdated, or corrupted information.

<h3>Location</h3>

Location includes more than the primary database. Data may exist in:

- User devices and browser caches
- Backups and snapshots
- Logs and monitoring systems
- Search indexes and analytics platforms
- Development and test environments
- Email, chat, and collaboration tools
- Cloud regions and content delivery networks
- Supplier systems and subprocessors
- Exports, reports, printouts, and removable media
- Derived data, embeddings, models, and aggregated records

Location can affect law, contract, latency, resilience, access, incident response, and destruction. Data residency describes where data is stored or processed. Data sovereignty concerns the legal authority that may apply because of that location or other jurisdictional connections.

<h3>Maintenance</h3>

Maintenance preserves accuracy, completeness, availability, and usefulness. It includes validation, correction, reconciliation, version control, metadata, integrity checks, backup testing, access review, and removal of obsolete copies.

Poor maintenance can turn an apparently protected data set into a source of bad decisions. Integrity requires both protection from unauthorized changes and processes for correcting authorized errors.

<h3>Derived and transformed data</h3>

Masking, aggregation, pseudonymization, tokenization, analytics, and model training can create new assets. Do not assume a transformed output is automatically harmless. It may still permit reidentification, reveal proprietary patterns, inherit restrictions, or support sensitive inferences.

Classify the result according to its own content and risk, while preserving lineage to the source. Lineage helps explain origin, transformations, quality, ownership, and downstream obligations.

<h2 id="retention">Ensure appropriate asset retention</h2>

Retention balances legitimate need against cost and exposure. Keeping everything forever is not a neutral choice. It increases breach impact, privacy risk, legal discovery, storage cost, recovery complexity, and the number of copies that must eventually be destroyed.

A retention schedule should reconcile:

- Law and regulation
- Contractual commitments
- Litigation holds and investigation needs
- Records-management requirements
- Business and operational value
- Tax, audit, safety, and warranty needs
- Privacy principles and promises
- Backup and disaster-recovery design
- Technical ability to locate and delete copies

A legal hold temporarily overrides ordinary destruction for relevant information. The organization should preserve what falls within the hold, suspend conflicting deletion, document custody, and resume the approved schedule when authorized.

<h3>Retention is not the same as backup</h3>

A retention policy determines how long information should remain available for a purpose or obligation. A backup supports recovery after loss or corruption. Treating backup media as an indefinite archive makes retrieval, access control, legal response, and deletion difficult.

Backup design should reflect retention requirements, but the two processes have different goals. A record may require long-term preservation in an archive with controlled format and metadata while short-term operational backups rotate more frequently.

<h3>End of life and end of support</h3>

**End of Life (EOL)** generally means a product or asset has reached the end of its planned lifecycle or commercial availability. In practical terms, the product is no longer sold.

**End of Support (EOS)** means the provider no longer supplies official patches, updates, or technical help. If replacement parts are still available, they may become harder to find and more expensive.

The exact vendor terminology varies. Focus on the risk: unsupported assets may retain known vulnerabilities, incompatible dependencies, unavailable parts, expired licenses, or staff knowledge that is disappearing.

The appropriate response may be replacement, migration, isolation, compensating controls, reduced functionality, contract extension, or documented risk acceptance. Inventory should identify approaching dates early enough for funding, testing, data transfer, and secure disposal.

<h2 id="remanence">Address data remanence and destruction</h2>

**Data remanence** means deleted data can still remain on a storage device and may be recoverable. Deleting a file, formatting a drive, or removing a directory entry does not always erase the underlying information.

Sanitization should make access to the target data infeasible for the required level of effort. The method depends on media type, sensitivity, reuse plan, threat, available assurance, and organizational standard.

<h3>Clear, purge, and destroy</h3>

<div class="table-scroll" role="region" aria-label="Media sanitization comparison" tabindex="0">
  <table>
    <thead><tr><th scope="col">Approach</th><th scope="col">Purpose</th><th scope="col">Decision considerations</th></tr></thead>
    <tbody>
      <tr><td>Clear</td><td>Uses logical techniques through normal interfaces to protect against straightforward recovery.</td><td>May be appropriate for reuse within a controlled environment when policy and media capabilities support it.</td></tr>
      <tr><td>Purge</td><td>Applies stronger logical or physical techniques intended to make recovery infeasible even with advanced resources.</td><td>May support reuse outside the original control boundary when the approved method is validated.</td></tr>
      <tr><td>Destroy</td><td>Physically damages media so it cannot be used for storage again.</td><td>Useful when reuse is unnecessary, the media cannot be reliably sanitized, or policy requires physical destruction.</td></tr>
    </tbody>
  </table>
</div>

Cryptographic erase can be effective when strong encryption protected all target data and the relevant keys can be reliably sanitized. It fails when unencrypted copies exist, keys remain recoverable, encryption was implemented incorrectly, or the organization cannot prove which data and keys were covered.

Modern environments complicate sanitization. Data may reside in cloud storage, solid-state media, snapshots, deduplicated systems, replicas, shared infrastructure, or provider-managed backups. Contracts and architecture should address deletion and return before data is placed there.

<h3>Verify and document destruction</h3>

A sound sanitization program defines approved methods, authorized tools or providers, validation, records, exceptions, and custody. Evidence may include asset identifiers, method, date, responsible party, result, and certificate of destruction.

Do not confuse completion with effectiveness. Verification confirms that the expected process occurred. Validation assesses whether the result meets the required sanitization outcome. Highly sensitive assets may require independent checks or witnessed destruction.

<h2 id="controls">Determine data security controls and compliance requirements</h2>

Controls should follow the asset across data states and locations. A solution that protects storage but exposes data during processing or transfer leaves a gap.

<h3>Data states</h3>

<div class="table-scroll" role="region" aria-label="Data states and controls" tabindex="0">
  <table class="mobile-card-table">
    <thead><tr><th scope="col">State</th><th scope="col">Meaning</th><th scope="col">Common controls</th></tr></thead>
    <tbody>
      <tr><td data-label="State">At rest</td><td data-label="Meaning">Stored on media, in databases, backups, repositories, devices, or cloud storage.</td><td data-label="Common controls">Access control, encryption, key management, physical protection, integrity checks, backup, retention, and sanitization.</td></tr>
      <tr><td data-label="State">In transit</td><td data-label="Meaning">Moving across a network, link, service boundary, courier route, or other transfer channel.</td><td data-label="Common controls">Secure protocols, encryption, authentication, integrity protection, recipient validation, routing controls, and custody tracking.</td></tr>
      <tr><td data-label="State">In use</td><td data-label="Meaning">Being processed, viewed, edited, queried, decrypted, or held in memory.</td><td data-label="Common controls">Least privilege, application controls, isolation, masking, monitoring, secure memory and execution features, and restricted export.</td></tr>
    </tbody>
  </table>
</div>

Encryption is important, but it does not establish authorized use, correct classification, accurate data, suitable retention, or secure deletion. Keys, identities, applications, endpoints, and administrators can still expose encrypted data.

<h3>Protection methods in the outline</h3>

**Digital Rights Management (DRM)** attaches usage restrictions to protected content, such as limits on viewing, copying, printing, forwarding, or expiration. It can support policy enforcement after distribution, but it depends on compatible clients, identity, keys, and trust in the enforcement environment.

**Data Loss Prevention (DLP)** identifies and monitors sensitive content and can block, warn, quarantine, encrypt, or record actions involving data at endpoints, across networks, or in repositories. DLP needs accurate classification, tuned rules, exception handling, and response processes. A flood of false positives can cause users to bypass the control or analysts to ignore alerts.

A **Cloud Access Security Broker (CASB)** helps an organization see and control how people use cloud services. Depending on how it is connected, it can enforce access rules, protect data, detect threats, and support compliance.

CASBs can work through proxies, application programming interfaces, or controls built into the cloud provider. The connection method affects what the CASB can see and block.

Other methods include access control, encryption, tokenization, masking, rights management, secure enclaves, database activity monitoring, information flow controls, integrity validation, backups, and physical safeguards.

<h3>Scope, tailor, and select standards</h3>

Do not apply a control catalog mechanically. Determine scope first:

- Which information and assets are included?
- Which systems, locations, suppliers, and lifecycle phases are included?
- Which legal, contractual, privacy, and industry requirements apply?
- Which threats and impacts matter?
- Which inherited controls already exist?
- Which exceptions or alternative implementations are justified?

Tailoring adjusts a baseline to the organization's risk, environment, and obligations. It may add controls, strengthen parameters, remove inapplicable controls with justification, or use compensating controls. The result should remain traceable to the requirement and approved by the proper authority.

A standard or framework can provide structure, but it cannot decide business ownership, classification, retention, or acceptable residual risk for the organization.

<h2 id="ai-assets">Protect artificial intelligence assets</h2>

The current ISC2 guidance integrates artificial intelligence throughout the CISSP domains. In Domain 2, treat AI data and models as assets with their own classification, ownership, lineage, lifecycle, and destruction requirements.

Relevant assets may include:

- Training, validation, and test data
- Labels, prompts, system instructions, and evaluation sets
- Pretrained and fine-tuned models
- Model weights and checkpoints
- Embeddings and vector databases
- Retrieval sources and knowledge bases
- Feature stores and transformation pipelines
- Outputs, feedback, telemetry, and audit logs
- Application programming interface keys, service accounts, and deployment configurations

Training data integrity affects model behavior. Poisoned, mislabeled, outdated, or unauthorized data can produce harmful results even when the model infrastructure is secure. Record provenance, approved use, transformations, quality checks, access, and version history.

Models and weights may contain intellectual property, encode sensitive patterns, or expose information about training data. Classify them according to value and risk rather than assuming they are ordinary software files. Restrict export, copying, and third-party reuse.

Privacy controls may include purpose limitation, minimization, masking, tokenization, access restrictions, deletion workflows, and techniques such as differential privacy where appropriate. A provider promise that data is not used for training does not eliminate the need to understand logs, retention, subprocessors, geographic location, security, and deletion.

AI assets also create derived-data questions. An embedding, summary, or model output may remain sensitive even when it no longer resembles the source record. Evaluate the result instead of assuming transformation removed the obligation.

<h2 id="exam-traps">Common CISSP exam traps</h2>

<h3>Letting the custodian make the business decision</h3>

Administrators implement controls, but owners normally approve classification, access, retention, and risk. Escalate an unresolved business decision to the accountable owner rather than allowing the most technical person to decide by convenience.

<h3>Choosing a control before identifying the asset</h3>

A DLP system cannot compensate for unknown data, missing ownership, or undefined handling rules. Identify and classify first unless the scenario says those steps are complete.

<h3>Treating classification as a confidentiality-only exercise</h3>

Integrity and availability may drive the highest impact. Consider privacy, safety, mission, and legal consequences as well.

<h3>Assuming encryption completes protection</h3>

Encryption does not correct excessive access, bad retention, compromised endpoints, weak keys, inaccurate data, or authorized misuse. Match controls to the full lifecycle and data state.

<h3>Confusing retention with backup</h3>

Retention defines how long information should exist for a purpose or obligation. Backup supports recovery. Long-term records may need an archive, not an untouched pile of operational backups.

<h3>Confusing deletion with sanitization</h3>

A delete command may only remove a reference. Choose an approved sanitization method based on media, sensitivity, reuse, and assurance, then verify the outcome.

<h3>Inventorying only hardware</h3>

Cloud services, accounts, certificates, data sets, source code, licenses, models, application programming interfaces, and business knowledge can be critical assets even without a serial number.

<h3>Assuming outsourcing transfers accountability</h3>

A processor or service provider performs work, but the organization may retain ownership, controller duties, contractual obligations, and responsibility for oversight.

<h3>Ignoring end-of-support risk</h3>

A functioning asset can still be unacceptable when patches, parts, expertise, or vendor support are no longer available. Plan migration before the deadline becomes an emergency.

<h2 id="review-checklist">Domain 2 review checklist</h2>

You should be able to explain or apply each of the following:

- Distinguish information classification from broader asset classification.
- Classify according to potential impact across confidentiality, integrity, availability, privacy, safety, obligations, and business value.
- Explain why aggregation and inference can increase sensitivity.
- Assign classification decisions to the owner and implementation duties to custodians and other supporting roles.
- Translate a label into requirements for creation, access, storage, transfer, copying, sharing, transport, retention, and disposal.
- Build an inventory that includes tangible and intangible assets, ownership, location, dependencies, support status, and lifecycle state.
- Compare data owner, controller, custodian, processor, user, and data subject.
- Follow data through collection, location, maintenance, transformation, retention, remanence, and destruction.
- Distinguish retention schedules, legal holds, archives, and backups.
- Explain the operational risk of End of Life and End of Support.
- Compare clear, purge, destroy, and cryptographic erase at a decision level.
- Explain why sanitization must cover cloud copies, snapshots, backups, replicas, and third-party holdings.
- Protect data in use, in transit, and at rest.
- Compare Digital Rights Management, Data Loss Prevention, and Cloud Access Security Broker capabilities.
- Scope and tailor controls according to assets, obligations, risk, and environment.
- Treat training data, models, weights, embeddings, prompts, outputs, and AI logs as governed assets.
- Choose the correct next action based on what the scenario has already completed.

<h2 id="official-references">Official references</h2>

Use these primary sources to confirm scope and study the underlying practices:

- [ISC2 CISSP Certification Exam Outline](https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline)
- [NIST FIPS 199: Standards for Security Categorization of Federal Information and Information Systems](https://csrc.nist.gov/pubs/fips/199/final)
- [NIST SP 800-60 Volume 1 Revision 1: Guide for Mapping Types of Information and Information Systems to Security Categories](https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final)
- [NIST SP 800-53 Revision 5: Security and Privacy Controls for Information Systems and Organizations](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final)
- [NIST SP 800-88 Revision 2: Guidelines for Media Sanitization](https://csrc.nist.gov/pubs/sp/800/88/r2/final)
- [NIST SP 1800-28: Data Confidentiality, Identifying and Protecting Assets Against Data Breaches](https://csrc.nist.gov/pubs/sp/1800/28/final)
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework)
- [NIST Artificial Intelligence Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

Exam objectives and organizational requirements can change. Use the current ISC2 outline for exam scope and the versions of laws, standards, contracts, and policies that apply to your environment.
