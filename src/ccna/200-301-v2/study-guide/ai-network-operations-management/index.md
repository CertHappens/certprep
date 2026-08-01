---
layout: layouts/article.njk
title: "CCNA 200-301 v2.0 Domain 5: AI, Network Operations, and Management"
description: Learn CCNA v2.0 Domain 5 through agentic AI, prompt selection, network management approaches, SNMP, Ansible command execution, and syslog interpretation.
permalink: /ccna/200-301-v2/study-guide/ai-network-operations-management/
ogType: article
printable: true
printTitle: "CCNA 200-301 v2.0 Domain 5: AI, Network Operations, and Management"
author: certHappens
datePublished: 2026-08-01
dateModified: 2026-08-01
articleSection: CCNA 200-301 v2.0 Domain 5
eyebrow: CCNA v2.0 domain 5 guide
lede: Use automation and AI to gather, organize, and act on network evidence without giving up engineering judgment, access control, or verification.
breadcrumbs:
  - label: Home
    url: /
  - label: CCNA
    url: /ccna/
  - label: 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
  - label: Domain 5
    url: /ccna/200-301-v2/study-guide/ai-network-operations-management/
toc:
  - id: domain-map
    label: Domain map
  - id: operations-model
    label: Operations model
  - id: agentic-ai
    label: Agentic AI
  - id: prompt-selection
    label: Prompt selection
  - id: management-approaches
    label: Management approaches
  - id: snmp
    label: SNMP
  - id: ansible
    label: Ansible command execution
  - id: syslog
    label: Syslog interpretation
  - id: integrated-scenario
    label: Integrated operations scenario
  - id: common-traps
    label: Common traps
  - id: rapid-review
    label: Rapid review
  - id: official-references
    label: Official references
keywords:
  - CCNA 200-301 v2.0 Domain 5
  - agentic AI network operations
  - CCNA AI prompts
  - SNMP network management
  - Ansible Cisco IOS commands
  - Cisco syslog severity levels
  - infrastructure as code networking
relatedLinks:
  - title: CCNA Acronyms and Terms
    url: /ccna/acronyms/
    description: Expand the AI, management, SNMP, automation, and logging terms used throughout this guide.
  - title: CCNA 200-301 v2.0 Study Guide
    url: /ccna/200-301-v2/study-guide/
    description: Return to the complete five-domain v2.0 guide and practical study method.
  - title: "Domain 4: Network Services and Security"
    url: /ccna/200-301-v2/study-guide/network-services-security/
    description: Review secure management access and network controls before applying automation and operations workflows.
  - title: Cisco IOS Verification and Troubleshooting Commands
    url: /ccna/commands/
    description: Choose the operational commands that Ansible, controllers, or engineers can use to collect evidence.
  - title: Common Ports and Protocols Reference
    url: /ports-protocols/
    description: Review SNMP, syslog, Secure Shell, and other management traffic used in network operations.
---
Domain 5 accounts for **10% of the published CCNA 200-301 v2.0 blueprint**. Cisco expects you to describe agentic artificial intelligence (AI), select an effective prompt for generative AI-assisted network operations, compare network management approaches, describe Simple Network Management Protocol (SNMP), use Ansible to execute commands, and interpret syslog messages.

The domain is small by percentage, but it connects the rest of the exam. A monitoring system may expose a Domain 1 interface fault. An automation task may collect Domain 2 trunk state. A syslog message may explain why a Domain 3 neighbor changed. AI may help summarize the evidence, but the network state remains the source of truth.

<div class="article-callout">
  <p><strong>Use this guide for v2.0.</strong> Cisco says the 200-301 v2.0 exam begins February 3, 2027. Candidates testing through February 2, 2027 should use the active v1.1 blueprint for exam-specific coverage.</p>
</div>

<h2 id="domain-map">Domain 5 objective map</h2>

<div class="table-scroll" role="region" aria-label="CCNA v2.0 Domain 5 objective map" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Objective</th>
        <th scope="col">Main skill</th>
        <th scope="col">Useful question</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Objective">5.1</td><td data-label="Main skill">Agentic AI</td><td data-label="Useful question">What can the system plan, observe, recommend, or act on, and where must a person approve or verify the result?</td></tr>
      <tr><td data-label="Objective">5.2</td><td data-label="Main skill">Prompt selection</td><td data-label="Useful question">Does the prompt protect classified data and clearly define the persona, instructions, evidence, and output format?</td></tr>
      <tr><td data-label="Objective">5.3</td><td data-label="Main skill">Management approaches</td><td data-label="Useful question">Is the network managed per device, through a cloud service or controller, with automation, or from versioned infrastructure definitions?</td></tr>
      <tr><td data-label="Objective">5.4</td><td data-label="Main skill">SNMP</td><td data-label="Useful question">Which manager, agent, management object, poll, or notification supplies the operational state?</td></tr>
      <tr><td data-label="Objective">5.5</td><td data-label="Main skill">Ansible command execution</td><td data-label="Useful question">Which inventory, task, module, and command collect the needed evidence from the intended devices?</td></tr>
      <tr><td data-label="Objective">5.6</td><td data-label="Main skill">Syslog interpretation</td><td data-label="Useful question">Which facility generated the event, how severe is it, and what does the mnemonic and message text say happened?</td></tr>
    </tbody>
  </table>
</div>

<h2 id="operations-model">Use one operations model</h2>

Network operations is a continuous loop:

1. **Observe:** Collect device state, metrics, messages, and user symptoms.
2. **Interpret:** Decide which evidence is normal, abnormal, relevant, or incomplete.
3. **Act:** Make an authorized change, escalate, or collect another piece of evidence.
4. **Verify:** Prove that the intended state exists and that the original symptom changed.
5. **Record:** Preserve the result, context, and change history for the next person or system.

AI, SNMP, Ansible, controllers, and syslog support different parts of that loop. None of them replaces it.

A poor workflow jumps from an alert directly to a configuration change. A better workflow connects the alert to live state, tests the theory, limits the change, and verifies the outcome.

<h2 id="agentic-ai">Agentic artificial intelligence in network operations</h2>

Generative AI can summarize, classify, explain, or propose content from the context it receives. **Agentic AI** goes farther by working toward a goal through multiple steps. Depending on the system and permissions, an agent may select tools, gather additional evidence, compare results, recommend a next action, or execute an approved task.

A network operations agent might:

- Receive an alert about intermittent branch connectivity
- Query interface and routing state
- Correlate the event with recent syslog messages
- Compare the evidence with a known baseline
- Recommend the next verification command
- Open a ticket with the evidence attached
- Request approval before making a change
- Recheck the network after the approved action

The word **agentic** does not mean correct, unrestricted, or fully autonomous. The useful question is not whether the system is called an agent. The useful questions are:

- Which data can it access?
- Which tools can it use?
- Which actions can it perform without approval?
- What evidence supports its conclusion?
- How are actions logged and reviewed?
- What happens when the context is incomplete or conflicting?

### Keep the control boundary visible

An AI-assisted workflow should use the same controls expected of a human operator:

- Least-privilege access
- Approved tools and destinations
- Data-classification rules
- Change authorization
- Logging and accountability
- Validation before and after a change
- A rollback or recovery path

AI output can be useful even when it is not allowed to change anything. A read-only assistant can organize logs, compare snapshots, identify missing evidence, or turn a large command output into a smaller checklist for human review.

### Common AI failure modes

Watch for:

- **Unsupported conclusions:** The recommendation sounds specific but is not grounded in the supplied evidence.
- **Missing context:** The model does not know the intended topology, maintenance window, or policy.
- **Stale assumptions:** The answer uses old syntax, old inventory, or a topology that no longer exists.
- **Sensitive-data exposure:** Configurations, credentials, addresses, customer data, or logs are sent somewhere they should not be.
- **Excessive action:** A broad change is proposed when one verification command would narrow the fault.
- **Automation bias:** A person accepts the recommendation because the system produced it confidently.

A strong operator can explain why the recommendation fits the evidence and what would disprove it.

<h2 id="prompt-selection">Select a prompt that supports the network decision</h2>

CCNA v2.0 specifically calls out four prompt components: **data classification, output format, persona, and instructions**. Good prompts also provide the relevant evidence and the exact decision the operator needs to make.

<div class="table-scroll" role="region" aria-label="Generative AI prompt components for network operations" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">What it controls</th>
        <th scope="col">Network-operations example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Component"><strong>Data classification</strong></td><td data-label="What it controls">Whether the supplied data is permitted in that system and how it must be protected.</td><td data-label="Network-operations example">State that the evidence is sanitized internal data and remove credentials, customer information, and unneeded addressing.</td></tr>
      <tr><td data-label="Component"><strong>Persona</strong></td><td data-label="What it controls">The perspective and level of expertise the response should use.</td><td data-label="Network-operations example">Act as a network operations analyst reviewing evidence before any configuration change.</td></tr>
      <tr><td data-label="Component"><strong>Instructions</strong></td><td data-label="What it controls">The task, constraints, priorities, and actions the system should or should not take.</td><td data-label="Network-operations example">Identify the most likely cause, cite the evidence, and recommend one read-only verification command. Do not propose a configuration change yet.</td></tr>
      <tr><td data-label="Component"><strong>Output format</strong></td><td data-label="What it controls">How the answer should be organized so a person or tool can use it.</td><td data-label="Network-operations example">Return a three-row table with Evidence, Interpretation, and Next check.</td></tr>
      <tr><td data-label="Component"><strong>Evidence and context</strong></td><td data-label="What it controls">The device state, intended behavior, timing, and boundaries the answer can rely on.</td><td data-label="Network-operations example">Include the sanitized interface summary, routing entry, relevant log lines, and intended destination.</td></tr>
    </tbody>
  </table>
</div>

### Weak prompt

```text
Why is the branch network broken?
```

This request does not define the evidence, expected behavior, allowed data, useful output, or whether the system should diagnose, explain, or change something.

### Better prompt

```text
Data classification: Internal, sanitized operational data. Do not infer or request credentials.

Persona: Act as a network operations analyst reviewing a possible routed-connectivity fault.

Instructions: Analyze only the evidence below. Identify the most likely cause, cite the exact lines that support it, list one competing explanation, and recommend one read-only IOS verification command before any configuration change.

Output format: A table with Evidence, Interpretation, and Next check, followed by a one-sentence confidence statement.

Intended behavior: Branch users should reach 192.0.2.0/24 through Router R1.

Evidence:
R1# show ip interface brief
GigabitEthernet0/0  198.51.100.2  YES manual  up  up
GigabitEthernet0/1  10.20.30.1    YES manual  up  up

R1# show ip route 192.0.2.0
% Network not in table
```

The better prompt narrows the task and asks for evidence-based reasoning. It still does not prove the answer is correct. The operator must run the next check and compare the result with the intended network design.

### Protect data before improving the wording

A beautifully written prompt is still wrong if it includes data that the system is not authorized to receive. Data-classification labels vary by organization, so use the actual policy rather than inventing a universal label.

Before submitting evidence:

- Remove passwords, shared secrets, private keys, tokens, and community strings.
- Remove customer or user information that is not needed for the question.
- Minimize internal addresses, hostnames, topology details, and configuration sections.
- Use sanitized examples when the exact production values are unnecessary.
- Confirm whether the AI system stores prompts, trains on them, or shares them with another service.

<h2 id="management-approaches">Compare network management approaches</h2>

The five approaches in the blueprint are not mutually exclusive. A network may use a cloud dashboard for wireless, a controller for campus policy, Ansible for repetitive command collection, and direct device access for emergency recovery.

<div class="table-scroll" role="region" aria-label="CCNA network management approaches" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Approach</th>
        <th scope="col">How it works</th>
        <th scope="col">Strength</th>
        <th scope="col">Watch for</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Approach"><strong>Device-based</strong></td><td data-label="How it works">An operator connects to individual devices through a command-line interface (CLI), web interface, or local management tool.</td><td data-label="Strength">Direct access and precise control over one device.</td><td data-label="Watch for">Inconsistent changes, repetitive work, and limited fleet-wide visibility.</td></tr>
      <tr><td data-label="Approach"><strong>Cloud-based</strong></td><td data-label="How it works">A hosted service provides centralized monitoring, configuration, inventory, and lifecycle functions.</td><td data-label="Strength">Reduced local management infrastructure and access from a central service.</td><td data-label="Watch for">Service availability, subscription boundaries, data location, and Internet dependency.</td></tr>
      <tr><td data-label="Approach"><strong>Controller-based</strong></td><td data-label="How it works">A controller maintains a network-wide view and translates policy or intent into device actions.</td><td data-label="Strength">Consistent policy, topology awareness, and centralized orchestration.</td><td data-label="Watch for">Controller reachability, synchronization, scope, and the difference between intended and realized state.</td></tr>
      <tr><td data-label="Approach"><strong>Automation-based</strong></td><td data-label="How it works">Scripts, playbooks, application programming interfaces (APIs), or tools perform repeatable tasks across devices.</td><td data-label="Strength">Speed, consistency, and repeatability for well-defined tasks.</td><td data-label="Watch for">Bad inputs, broad blast radius, credential handling, error recovery, and incomplete validation.</td></tr>
      <tr><td data-label="Approach"><strong>Infrastructure as Code (IaC)</strong></td><td data-label="How it works">Machine-readable, version-controlled definitions describe desired infrastructure or policy.</td><td data-label="Strength">Reviewable changes, repeatable deployment, history, and easier comparison of intended state.</td><td data-label="Watch for">Configuration drift, pipeline permissions, state ownership, and changes made outside the managed workflow.</td></tr>
    </tbody>
  </table>
</div>

### Intended state and realized state

A controller, cloud platform, automation tool, or IaC repository may show what **should** exist. Device output shows what the network is actually doing.

When they disagree, do not assume either side is automatically right. Determine:

- Which system is the approved source of truth?
- Did the last deployment succeed on every device?
- Was a manual change made outside the workflow?
- Is the controller showing cached or delayed state?
- Did a device reject part of the configuration?
- Is the displayed operational state different from configuration state?

A version-controlled file is useful because it shows intended change history. It is not proof that the network accepted or implemented the change.

<h2 id="snmp">Simple Network Management Protocol</h2>

Simple Network Management Protocol (SNMP) provides a standardized way for management software and network devices to exchange operational information.

Core parts include:

<div class="table-scroll" role="region" aria-label="SNMP components and functions" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">Function</th>
        <th scope="col">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Component"><strong>Network management system (NMS)</strong></td><td data-label="Function">Acts as the SNMP manager that polls devices, receives notifications, stores data, and presents operational views.</td><td data-label="Example">A monitoring platform graphs interface utilization and alerts on repeated link changes.</td></tr>
      <tr><td data-label="Component"><strong>Agent</strong></td><td data-label="Function">Runs on the managed device and exposes supported management data.</td><td data-label="Example">The IOS XE SNMP agent supplies interface counters and device information.</td></tr>
      <tr><td data-label="Component"><strong>Management information base (MIB)</strong></td><td data-label="Function">Describes manageable objects and their organization.</td><td data-label="Example">An interface table defines objects for interface state and counters.</td></tr>
      <tr><td data-label="Component"><strong>Object identifier (OID)</strong></td><td data-label="Function">Uniquely identifies a specific management object in a hierarchy.</td><td data-label="Example">The manager requests an OID associated with an interface counter.</td></tr>
      <tr><td data-label="Component"><strong>Poll</strong></td><td data-label="Function">The manager requests current data from the agent.</td><td data-label="Example">The NMS reads interface octet counters every five minutes.</td></tr>
      <tr><td data-label="Component"><strong>Trap or inform</strong></td><td data-label="Function">The agent sends an event notification toward the manager. An inform includes acknowledgment behavior that a basic trap does not.</td><td data-label="Example">A device reports a link-state change without waiting for the next poll.</td></tr>
    </tbody>
  </table>
</div>

### Polling and notifications answer different questions

Polling asks, “What is the state now?” Notifications say, “An event occurred.”

A five-minute poll can miss a short interface flap between samples. A notification can report the event quickly, but the manager may still need to poll the device for current counters and state.

Useful monitoring design combines both:

- Poll stable measurements and counters at an appropriate interval.
- Receive notifications for important state changes.
- Correlate the event with syslog and direct device output.
- Avoid alerting on every raw counter without context or thresholds.

### SNMP versions at a practical level

SNMPv1 and SNMPv2c commonly use community strings. A community string should not be treated as strong modern protection, and it should never be exposed in examples, logs, or AI prompts.

SNMPv3 can provide user-based authentication and privacy protection. The exact configuration is beyond this Domain 5 objective, but the operational distinction matters when deciding how monitoring traffic is protected.

Common checks on IOS XE include:

```text
show snmp
show snmp engineID
show snmp group
show snmp user
```

The objective asks for SNMP's function, so focus on the manager-agent relationship, MIBs, OIDs, polling, and notifications before memorizing configuration commands.

<h2 id="ansible">Use Ansible to execute network commands</h2>

Ansible is an automation tool that uses an inventory, playbooks, tasks, and modules to perform repeatable work. For this CCNA objective, the practical focus is using Ansible to execute commands on network devices.

Key parts:

- **Control node:** The system running Ansible.
- **Inventory:** The managed devices and associated connection variables.
- **Playbook:** A document, commonly written in YAML Ain't Markup Language (YAML), that defines plays and tasks.
- **Module:** The code that performs an operation, such as executing IOS commands.
- **Task:** One named use of a module.
- **Registered result:** Output saved for another task or for review.


### Example inventory

```yaml
all:
  children:
    branch_routers:
      hosts:
        r1:
          ansible_host: 192.0.2.10
      vars:
        ansible_connection: ansible.netcommon.network_cli
        ansible_network_os: cisco.ios.ios
```

Do not place clear-text production passwords or private keys in a shared inventory file. Use an approved credential store, protected variables, or another authorized secret-management method.

### Example playbook that collects evidence

```yaml
---
- name: Collect branch routing evidence
  hosts: branch_routers
  gather_facts: false

  tasks:
    - name: Run verification commands
      cisco.ios.ios_command:
        commands:
          - show ip interface brief
          - show ip route
          - show logging | include LINEPROTO|LINK
      register: verification

    - name: Display collected output
      ansible.builtin.debug:
        var: verification.stdout_lines
```

This playbook does not decide why the network failed. It collects consistent evidence from the intended hosts.

When reading an Ansible task, identify:

1. Which host group is targeted?
2. Which connection and network operating system are expected?
3. Which module is used?
4. Which commands run?
5. Where is the output stored?
6. What happens if one host is unreachable or returns an error?

### Automation does not remove validation

A command can succeed syntactically and still collect the wrong evidence. Examples include:

- The inventory points to the wrong device.
- The play targets a broader group than intended.
- The command is valid but does not answer the troubleshooting question.
- The account lacks permission for part of the task.
- One device uses different syntax or returns different output.
- The output is collected but never reviewed.

Automation improves consistency when the inputs, scope, and validation are also controlled.

<h2 id="syslog">Interpret syslog messages</h2>

Syslog records device events. A common Cisco IOS message format is:

```text
%FACILITY-SEVERITY-MNEMONIC: message-text
```

Example:

```text
%LINK-3-UPDOWN: Interface GigabitEthernet1/0/24, changed state to down
```

Interpret it in parts:

- **Facility:** `LINK`, the subsystem or source category that generated the message.
- **Severity:** `3`, an error-level message.
- **Mnemonic:** `UPDOWN`, a short identifier for the event type.
- **Message text:** The interface and the state change.

A timestamp and sequence number may appear before the percent sign when configured.

### Syslog severity levels

Lower numbers are more severe.

<div class="table-scroll" role="region" aria-label="Cisco syslog severity levels" tabindex="0">
  <table class="mobile-card-table">
    <thead>
      <tr>
        <th scope="col">Level</th>
        <th scope="col">Name</th>
        <th scope="col">Operational meaning</th>
      </tr>
    </thead>
    <tbody>
      <tr><td data-label="Level">0</td><td data-label="Name"><strong>Emergencies</strong></td><td data-label="Operational meaning">The system is unusable.</td></tr>
      <tr><td data-label="Level">1</td><td data-label="Name"><strong>Alerts</strong></td><td data-label="Operational meaning">Immediate action is required.</td></tr>
      <tr><td data-label="Level">2</td><td data-label="Name"><strong>Critical</strong></td><td data-label="Operational meaning">A critical condition exists.</td></tr>
      <tr><td data-label="Level">3</td><td data-label="Name"><strong>Errors</strong></td><td data-label="Operational meaning">An error condition occurred.</td></tr>
      <tr><td data-label="Level">4</td><td data-label="Name"><strong>Warnings</strong></td><td data-label="Operational meaning">A warning condition should be reviewed.</td></tr>
      <tr><td data-label="Level">5</td><td data-label="Name"><strong>Notifications</strong></td><td data-label="Operational meaning">A normal but significant event occurred.</td></tr>
      <tr><td data-label="Level">6</td><td data-label="Name"><strong>Informational</strong></td><td data-label="Operational meaning">The device is reporting routine informational activity.</td></tr>
      <tr><td data-label="Level">7</td><td data-label="Name"><strong>Debugging</strong></td><td data-label="Operational meaning">Detailed diagnostic output is available.</td></tr>
    </tbody>
  </table>
</div>

A configured threshold includes that level and the more severe lower-numbered levels. For example, a warning threshold includes levels 0 through 4. It does not include notifications, informational, or debugging messages.

### Facility can mean two related things

Inside an IOS message such as `%OSPF-5-ADJCHG`, the facility identifies the subsystem that produced the message.

When sending syslog to an external server, the device can also use a protocol facility value that helps the server categorize messages. Do not confuse the visible IOS facility name with the external server's storage rule or category.

### Read the message before reacting to the level

Severity helps prioritize, but the message text and context still matter.

Consider:

```text
%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to down
```

The message is level 5, not level 0 or 1, but repeated changes on an important link may still cause a serious user impact. Correlate the event with:

```text
show logging
show interfaces GigabitEthernet0/1
show interfaces counters errors
show ip interface brief
```

Useful logging configuration and verification commands include:

```text
service timestamps log datetime msec
logging buffered warnings
logging host 192.0.2.60
logging trap notifications
logging source-interface Loopback0
show logging
```

The exact logging policy depends on the environment. CCNA questions are more likely to ask you to interpret the message, level, or facility than to design an enterprise logging architecture.

<h2 id="integrated-scenario">Integrated operations scenario</h2>

A branch reports intermittent connectivity. The monitoring platform shows a short rise in interface errors. Syslog contains repeated link-state messages. An automated task collects interface and route output from the branch router.

A disciplined workflow could be:

1. **SNMP observation:** Confirm which interface counter or state changed and whether the problem is still active.
2. **Syslog correlation:** Identify the facility, severity, mnemonic, interface, and timestamps around the user report.
3. **Ansible collection:** Run the same read-only commands on the affected router and a healthy comparison router.
4. **AI-assisted summary:** Provide sanitized evidence with a prompt that requests supported conclusions, a competing explanation, and one next verification command.
5. **Human decision:** Compare the recommendation with the topology, maintenance history, and direct device state.
6. **Authorized action:** Replace or reconfigure only after the evidence supports the cause and the change is approved.
7. **Verification:** Recheck the interface, counters, logs, monitoring state, and user path.
8. **Record:** Save the evidence and result so the next event has a usable baseline.

Each tool contributes something different. SNMP provides measurements and events. Syslog supplies event detail. Ansible gathers repeatable evidence. AI can organize the evidence. The engineer remains responsible for scope, authorization, interpretation, and proof.

<h2 id="common-traps">Common traps</h2>

### Treating an AI answer as device state

A generated explanation is not equivalent to `show` output, a packet capture, a controller state query, or a validated topology.

### Supplying sensitive data because the prompt is technically good

Data classification comes before persona, format, or phrasing.

### Confusing central management with automatic correctness

A cloud dashboard or controller can distribute a bad policy consistently. Centralization improves control, but it does not make every input correct.

### Treating IaC as a text backup

Infrastructure as Code is a managed workflow around machine-readable desired state, review, versioning, deployment, and validation. A folder of copied running configurations is useful documentation, but it is not automatically IaC.

### Assuming SNMP only sends alerts

SNMP supports manager polling and agent notifications. Polling and notifications solve different operational problems.

### Memorizing an OID without understanding the object

Know what the manager, agent, MIB, and OID do. The objective does not require memorizing a large object tree.

### Assuming an Ansible playbook targets the right devices

Read the `hosts` value and inventory. A correct task applied to the wrong group is still a bad operation.

### Reversing syslog severity

Level 0 is the most severe. Level 7 is debugging.

### Reading the severity but ignoring the event

The facility, mnemonic, interface, timestamp, frequency, and message text explain what happened.

<h2 id="rapid-review">Rapid review</h2>

Be able to explain these without notes:

- Agentic AI can pursue a goal through multiple tool-assisted steps, but its data access, permissions, approvals, and verification still require control.
- A useful network-operations prompt addresses data classification, persona, instructions, evidence, and output format.
- Device-, cloud-, controller-, automation-, and IaC-based management can coexist.
- Intended state must be compared with realized device state.
- SNMP uses a manager, agent, MIB, and OIDs to exchange management data.
- Polling requests current data; traps and informs report events.
- Ansible uses inventories, playbooks, tasks, and modules to perform repeatable work.
- `cisco.ios.ios_command` can execute IOS verification commands and return their output.
- Cisco syslog messages commonly expose facility, severity, mnemonic, and message text.
- Syslog severity runs from 0 emergencies through 7 debugging, with lower numbers representing greater severity.
- Operations work is not complete until the result is verified and recorded.

<h2 id="official-references">Official references</h2>

- [Cisco 200-301 CCNA v2.0 exam topics](https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf)
- [Cisco guidance on the CCNA v2.0 AI and operations refresh](https://blogs.cisco.com/learning/ai-updates-ccna-ccie-automation)
- [Cisco AI Assistant prompt guide](https://www.cisco.com/c/en/us/td/docs/security/cdo/ai-assistant/cisco-ai-assistant-user-guide/m_prompt-guide-for-cisco-ai-assistant.html)
- [Cisco AI Assistant data and privacy guidance](https://www.cisco.com/c/en/us/td/docs/security/cdo/ai-assistant/cisco-ai-assistant-guide/m_cisco-ai-assistant-faq.html)
- [Cisco Infrastructure as Code fundamentals](https://netascode.cisco.com/docs/guides/branch/02_understanding-iac/)
- [Cisco DevNet Ansible automation resources](https://developer.cisco.com/automation-ansible/)
- [Official Ansible IOS platform options](https://docs.ansible.com/projects/ansible/latest/network/user_guide/platform_ios.html)
- [Official Ansible cisco.ios.ios_command module](https://docs.ansible.com/projects/ansible/latest/collections/cisco/ios/ios_command_module.html)
- [Cisco IOS XE SNMP configuration guide](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9300/software/release/17-18/configuration_guide/nmgmt/b_1718_nmgmt_9300_cg/configuring_simple_network_management_protocol.html)
- [Cisco IOS XE system message logging](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst9600/software/release/17-17/configuration_guide/sys_mgmt/b_1717_sys_mgmt_9600_cg/configuring_system_message_logs.html)
