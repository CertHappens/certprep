# SEC-701 Batch 004 Critical Review

## Batch summary

- Batch ID: `SEC701-BATCH-004`
- Questions: 24
- IDs: `SEC701-0000055` through `SEC701-0000078`
- Status: `approved`
- Reviewer: `initial-quality-review`
- Approval date: `2026-07-20`
- Domain allocation: 3 / 5 / 4 / 7 / 5
- Difficulty distribution: easy = 6, medium = 12, hard = 6
- Stored correct-answer distribution: A = 6, B = 6, C = 6, D = 6
- Exact duplicate stems: none
- Duplicate concept keys: none
- Exact or reversed-clause duplicate answer choices: none
- High-similarity near-duplicate stems: none

The questions were automatically approved under the accelerated workflow authorized for growth from 30 to 150 questions. Each question was compared against the complete 54-question starting bank before merging.

## Cumulative domain coverage

| Domain | Before | Added | Total | Total share | Exam weight |
|---|---:|---:|---:|---:|---:|
| 1.0 General Security Concepts | 7 | 3 | 10 | 12.8% | 12% |
| 2.0 Threats, Vulnerabilities, and Mitigations | 11 | 5 | 16 | 20.5% | 22% |
| 3.0 Security Architecture | 9 | 4 | 13 | 16.7% | 18% |
| 4.0 Security Operations | 16 | 7 | 23 | 29.5% | 28% |
| 5.0 Security Program Management and Oversight | 11 | 5 | 16 | 20.5% | 20% |

## Question-by-question review

| ID | Objective | Topic | Quality finding |
|---|---|---|---|
| SEC701-0000055 | 1.1 | Compensating controls | The legacy limitation is temporary, and the answer supplies comparable protection, documentation, ownership, and a path back to the primary control. |
| SEC701-0000056 | 1.2 | Deception technology | The item has no legitimate use and generates an alert when accessed, which uniquely identifies a honeytoken. |
| SEC701-0000057 | 1.4 | Password salting | The explanation distinguishes salts from encryption, password strength, and computational work factors. |
| SEC701-0000058 | 2.1 | Hacktivist motivation | The public manifesto and policy grievance establish ideological motivation without implying insider access or financial goals. |
| SEC701-0000059 | 2.2 | Business email compromise | Independent contact verification directly addresses a potentially compromised vendor mailbox and avoids relying on the same channel. |
| SEC701-0000060 | 2.3 | Stored cross-site scripting | Persistence in the database and later execution in other users' browsers provide the defining stored-XSS facts. |
| SEC701-0000061 | 2.4 | Pass-the-hash attacks | The stem explicitly states that the NTLM hash is used without recovering the plaintext password, distinguishing pass-the-hash. |
| SEC701-0000062 | 2.5 | Least functionality | The service has no business purpose, so removal and port blocking directly apply least functionality. |
| SEC701-0000063 | 3.1 | Infrastructure as code | Reviewed version-controlled templates and automated deployment address both consistency and configuration drift. |
| SEC701-0000064 | 3.2 | Secure remote administration | The required protections are stated directly and align with SSH rather than insecure or noninteractive alternatives. |
| SEC701-0000065 | 3.3 | Data states | The record is decrypted and actively processed in memory, making the data state unambiguous. |
| SEC701-0000066 | 3.4 | Alternate recovery sites | The site has equipment but still requires restoration and configuration, which distinguishes warm from hot and cold sites. |
| SEC701-0000067 | 4.1 | Selective mobile wipe | The personal-device requirement makes selective enterprise wipe clearly preferable to a factory reset. |
| SEC701-0000068 | 4.2 | Asset ownership and classification | Ownership, purpose, classification, and lifecycle status are the missing asset-management elements needed before other controls can be assigned. |
| SEC701-0000069 | 4.3 | Vulnerability exception handling | The answer manages an unpatchable safety-critical device with a time-bound exception, compensating controls, and recurring review. |
| SEC701-0000070 | 4.4 | Behavioral baselining | Per-system baselines solve both the noisy high-volume workload and the missed low-volume anomaly without creating a monitoring blind spot. |
| SEC701-0000071 | 4.5 | DNS filtering | The question asks specifically for resolution blocking and optional redirection, which maps directly to DNS deny or sinkhole controls. |
| SEC701-0000072 | 4.6 | Delegated authorization | Limited resource access without password disclosure is the defining OAuth delegated-authorization use case. |
| SEC701-0000073 | 4.7 | Security orchestration | The workflow coordinates several security platforms, distinguishing orchestration from a single automated task. |
| SEC701-0000074 | 5.1 | Policy exceptions | The formal time-bound exception preserves the standard while documenting risk ownership, temporary controls, and remediation. |
| SEC701-0000075 | 5.2 | Risk tolerance | The 30-minute outage limit is specific and measurable, while the moderate risk statement remains a broad appetite declaration. |
| SEC701-0000076 | 5.3 | Independent vendor assurance | The requested assurance concerns independent evidence of operating effectiveness over time, not vendor assertions or financial risk transfer. |
| SEC701-0000077 | 5.4 | Legal holds | The pending deletion and litigation notice make suspension of routine disposition under legal hold the required action. |
| SEC701-0000078 | 5.6 | Role-based security training | The specialized courses align training with job responsibilities and exposure while retaining a common baseline for everyone. |

## Similarity review

- No stem pair reached the reporting threshold.

## Batch-level observations

- No question depends on stored or displayed answer position.
- No question uses all-of-the-above, none-of-the-above, or linked answer labels.
- Each scenario includes the facts needed to support its intended decision.
- Incorrect-answer explanations identify why the choice does not fit and where the concept would apply.
- All 28 published objectives remain represented in the approved bank.
