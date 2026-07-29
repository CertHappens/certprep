# CCNA 200-301 v2.0 build plan

## Decision

Cert Happens will use the incoming 200-301 CCNA v2.0 exam as the target for its first dedicated CCNA question bank and study-guide set.

The current v1.1 exam remains available through February 2, 2027. Cisco says v2.0 launches February 3, 2027. Cert Happens will not create a separate short-lived v1.1 bank.

## Proposed identifiers

These identifiers are provisional until the v2.0 objective map and validator configuration are created.

- Project test ID: `CCNA-301-V2`
- Exam version: `200-301 v2.0`
- Question ID example: `CCNA301V2-0000001`
- Batch ID example: `CCNA301V2-BATCH-001`
- Data path: `data/ccna/200-301-v2/`

A later major exam version receives a new namespace so published question history, reports, and analytics remain unambiguous.

## Proposed public routes

```text
/ccna/
/ccna/200-301-v2/practice-test/
/ccna/200-301-v2/study-guide/
/ccna/200-301-v2/study-guide/<domain-slug>/
/ccna/quick-review/
/ccna/commands/
```

The `/ccna/` route remains the stable certification hub. Version-specific practice tests and guides live below the exam-version path.

## Source and objective work

Before question generation:

1. Capture the complete official v2.0 blueprint in an objective map.
2. Record the official document version, release date, and source URL.
3. Register primary sources for protocols, standards, Cisco IOS behavior, and Cisco platform concepts.
4. Map every question to one official objective and one primary concept.
5. Confirm domain weights and task verbs from the published v2.0 blueprint rather than carrying v1.1 weights forward.

## Question presentation requirements

CCNA needs more than ordinary paragraph questions. The bank should support readable, accessible stimuli such as:

- Cisco IOS configuration fragments
- `show` command output
- Routing tables
- Interface and VLAN state
- Access control lists
- Log or debug excerpts
- Text-based topology descriptions

Before changing the stable quiz engine, prototype an additive data contract with optional fields such as:

```text
stimulus_type
stimulus_text
stimulus_alt
```

`stimulus_text` should remain plain text with preserved line breaks and render inside an accessible `<pre><code>` block. The default value should be empty so Security+ and Network+ remain unaffected.

Do not require an image to answer a question. A future diagram component must include an equivalent text description and work in print and mobile layouts.

## Question mix

The CCNA bank should deliberately include:

- Route-selection and longest-prefix decisions
- Subnetting and address-planning calculations
- Configuration interpretation
- Best verification command
- Best next troubleshooting step
- Switching and spanning-tree state
- VLAN and trunk faults
- OSPF neighbor and route analysis
- ACL matching and placement
- NAT, DHCP, DNS, NTP, SNMP, syslog, and QoS scenarios
- Wireless architecture and security
- Controller, API, data-format, automation, and AI-assisted operations concepts

Use single choice, multi-select, and best-available questions where appropriate. Every item must have one defensible scoring outcome and explanations for all answer choices.

## Initial bank target

Set the final target only after the v2.0 weights and objective count are mapped. A reasonable planning range is:

- Initial credible bank: about 180 questions
- Medium-term bank: about 250 questions
- Later growth: targeted batches based on objective gaps, reported issues, and learner behavior

Quality, task variety, and objective coverage take priority over reaching a round number.

## Delivery phases

### Phase 1: Foundation

- Publish the CCNA overview hub
- Confirm v2.0 identifiers and routes
- Build the official objective map and source register
- Prototype command-output presentation without altering existing banks

### Phase 2: Question bank

- Add validator configuration and blank CSVs
- Generate and review the first weighted bank
- Verify duplicate, answer-distribution, difficulty, style, and objective coverage
- Enable the practice test only after the bank and reporting workflow pass staging review

### Phase 3: Study resources

- Create the full v2.0 study-guide hub and domain guides
- Add command and verification references
- Add focused troubleshooting and configuration quick reviews
- Strengthen links among CCNA, Network+, subnetting, ports, and shared tools

### Phase 4: Maintenance

- Review reported questions
- Track Cisco blueprint changes
- Expand weak objectives and practical-output coverage
- Use search and engagement data to decide which guides or tools deserve priority
