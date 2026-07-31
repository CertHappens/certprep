# CCNA 200-301 v2.0 build plan

## Decision

Cert Happens will use the incoming 200-301 CCNA v2.0 exam as the target for its first dedicated CCNA question bank and study-guide set.

The current v1.1 exam remains available through February 2, 2027. Cisco says v2.0 launches February 3, 2027. Cert Happens will not create a separate short-lived v1.1 bank.

Cisco has now published the official v2.0 exam topics. The incoming blueprint is the source of truth for new CCNA-specific guides, objective mapping, test-engine requirements, and eventual question-bank coverage.

## Confirmed v2.0 blueprint

The published v2.0 exam is 120 minutes and uses five weighted domains:

| Domain | Weight |
| --- | ---: |
| 1.0 Network Infrastructure and Connectivity | 25% |
| 2.0 Switching and Network Access | 25% |
| 3.0 IP Routing | 20% |
| 4.0 Network Services and Security | 20% |
| 5.0 AI, and Network Operations and Management | 10% |

The blueprint repeatedly uses practical task verbs such as configure, troubleshoot, diagnose, interpret, validate, and use. It also states that candidates may be required to evaluate output and recommendations from agentic AI and digital network assistants. Those signals support building more evidence-driven and practical question presentation than a text-only multiple-choice bank.

Primary blueprint:

- `https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf`

## Proposed identifiers

These identifiers remain provisional until the v2.0 objective map and validator configuration are created.

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

Do not publish a functional practice-test route or imply that a CCNA question bank exists until approved question data has been integrated and the complete staging workflow passes.

## Source and objective work

Before question generation in the separate CCNA question-bank workflow:

1. Capture every published v2.0 objective and sub-objective in the objective map.
2. Record the official document version, publication/review date, and source URL.
3. Register primary sources for protocols, standards, Cisco IOS behavior, and Cisco platform concepts.
4. Map every question to one official objective and one primary concept.
5. Preserve the official v2.0 domain weights and task verbs when evaluating cumulative coverage.

## Study resources before the practice bank

CCNA-specific public resources can be built before approved question data arrives. Prioritize material that helps learners interpret and troubleshoot networks rather than duplicating Network+ definitions.

Recommended sequence:

1. Update the stable `/ccna/` hub to the published five-domain v2.0 scope.
2. Build `/ccna/200-301-v2/study-guide/` and five domain guides.
3. Build `/ccna/commands/` around troubleshooting goals and verification tasks rather than an alphabetical command dump.
4. Add focused quick reviews for switching, spanning tree, routing, OSPF, ACLs, NAT/PAT, DHCP, DNS, Layer 2 security, syslog, and AI-assisted network operations.
5. Reuse the existing Network+ subnetting, ports/protocols, and foundational networking resources through contextual links instead of duplicating them.

## Question presentation requirements

CCNA needs more than ordinary paragraph questions. The bank should support readable, accessible stimuli such as:

- Cisco IOS configuration fragments
- `show` command output
- Routing tables
- Interface and VLAN state
- Access control lists
- Log or debug excerpts
- Packet-capture summaries
- Text-based topology descriptions
- Side-by-side evidence when multiple outputs must be compared

Before changing the stable quiz engine, prototype an additive data contract with optional fields such as:

```text
stimulus_type
stimulus_text
stimulus_alt
```

`stimulus_text` should remain plain text with preserved line breaks and render inside an accessible `<pre><code>` block. The default value should be empty so Security+ and Network+ remain unaffected.

Do not require an image to answer a question. A future diagram component must include an equivalent text description and work in print and mobile layouts.

## Practical-question direction

Cert Happens may use the term **practical question** or **interactive practice task** for richer items. Do not claim that these reproduce Cisco's actual exam PBQs or lab items.

Build practical behavior in layers:

1. **Rich stimulus with existing answer types.** Render command output, configurations, routing tables, logs, and other evidence while keeping the current single-choice, multi-select, and best-available grading model.
2. **Ordering.** Let the learner place troubleshooting or configuration-verification steps into a defensible sequence. Provide keyboard-accessible controls rather than relying on drag-and-drop alone.
3. **Matching or classification.** Match evidence, commands, interfaces, protocols, or conditions. The final mapping is the grading state, regardless of whether the learner used pointer or keyboard controls.
4. **Selectable configuration or evidence lines.** Present a fixed block and allow the learner to select the lines that satisfy or explain the stated condition.
5. **Multi-part evidence.** Combine two or more accessible text stimuli when the learner must correlate outputs before answering.

Do not build a general IOS command-line simulator as an early requirement. Equivalent valid configurations, command abbreviations, modes, ordering, syntax recovery, mobile input, accessibility, deterministic grading, and review reconstruction make a faithful simulator a separate project.

Every new interaction must define:

- A certification-neutral data contract where practical
- Deterministic grading
- Browser-session persistence
- Review-mode rendering
- Reporting context
- Keyboard operation
- Screen-reader behavior
- Mobile behavior
- Automated tests
- A non-visual or text-equivalent path when needed

Use synthetic fixtures in website-engine tests so this repository can validate interaction behavior without authoring CCNA question-bank content here.

## Question mix

The eventual CCNA bank should deliberately include:

- Route-selection and longest-prefix decisions
- Subnetting and address-planning calculations
- Configuration interpretation
- Best verification command
- Best next troubleshooting step
- Switching and spanning-tree state
- VLAN and trunk faults
- OSPF neighbor and route analysis
- ACL matching and placement
- NAT/PAT, DHCP, DNS, SNMP, syslog, and secure-management scenarios
- Wireless connectivity and security
- Network management, Ansible, and AI-assisted operations concepts

Use single choice, multi-select, best-available, and supported practical interactions where appropriate. Every item must have one defensible scoring outcome and explanations for all answer choices or graded elements.

## Initial bank target

Use the confirmed v2.0 weights and final objective count to tune batch distribution. A reasonable planning range remains:

- Initial credible bank: about 180 questions
- Medium-term bank: about 250 questions
- Later growth: targeted batches based on objective gaps, reported issues, and learner behavior

Quality, task variety, and objective coverage take priority over reaching a round number.

## Delivery phases

### Phase 1: Foundation

- Publish and maintain the CCNA overview hub
- Confirm v2.0 identifiers and routes
- Build the official objective map and source register in the question-bank workflow
- Keep CCNA unregistered from the live quiz catalog until approved data exists

### Phase 2: Study resources

- Create the v2.0 study-guide hub and five domain guides
- Add a command and verification reference
- Add focused troubleshooting and configuration quick reviews
- Strengthen links among CCNA, Network+, subnetting, ports, and shared tools

### Phase 3: Test-engine readiness

- Add certification-neutral command/output stimulus rendering
- Test preserved formatting, mobile behavior, print behavior, accessibility, review mode, session state, and reporting context
- Add practical interaction types one at a time only when they have a clear grading contract and complete test coverage

### Phase 4: Approved question-bank integration

- Add validator configuration and approved CCNA data supplied by the separate question-bank workflow
- Register `CCNA-301-V2` in the quiz catalog only when its required files exist
- Verify duplicate, answer-distribution, difficulty, style, objective coverage, and practical-item behavior
- Enable the practice test only after the bank and reporting workflow pass staging review

### Phase 5: Maintenance

- Review reported questions
- Track Cisco blueprint changes
- Expand weak objectives and practical-output coverage
- Use search and engagement data to decide which guides or tools deserve priority
