# Initial Sample Question Review

## Batch summary

- Batch: `SEC701-SAMPLE-001`
- Questions: 10
- Status: `approved`
- Structural validation: passed with no errors or warnings
- Domains represented: all five
- Objectives represented: 10 of 28
- Correct stored-answer distribution: A = 3, B = 3, C = 2, D = 2
- Difficulty distribution: easy = 3, medium = 5, hard = 2
- Question styles: scenario = 5, direct = 2, calculation = 2, comparison = 1

The domain distribution is 1/2/2/3/2, which closely follows the published 12%/22%/18%/28%/20% weighting for a ten-question sample.

## Critical review by question

| ID | Review finding | Remaining concern |
|---|---|---|
| SEC701-0000001 | Clearly separates digital signatures from confidentiality. Distractors test public-key direction, unauthenticated hashes, and symmetric-key limitations. | A future editor should watch answer length when adding related cryptography questions. |
| SEC701-0000002 | The single account and many changing passwords remove the usual brute-force versus spraying ambiguity. | None identified. |
| SEC701-0000003 | The requirement to retain only remediation access makes quarantine segmentation with a narrow ACL uniquely best. | Similar future containment questions should not reuse this same quarantine pattern. |
| SEC701-0000004 | The separately protected reversible mapping makes tokenization distinct from hashing, masking, and encryption. | Some real systems implement tokens cryptographically; keep the question focused on the data-protection model, not implementation internals. |
| SEC701-0000005 | Data-loss tolerance and restoration deadline are explicitly stated, so RPO and RTO are defensible. Version 2 replaced a distractor that duplicated another answer in reversed clause order. | Difficulty may calibrate closer to medium after learner data is available. |
| SEC701-0000006 | The question asks for technical validation, not process approval, making rescanning clearly correct. | None identified. |
| SEC701-0000007 | Uses current factor categories and avoids treating two credentials from one category as MFA. | None identified. |
| SEC701-0000008 | The stem states active spread, containment, and preservation needs. Network isolation is clearly preferable to recovery, eradication, or lessons learned. | Operational playbooks may differ, so the phrase `most directly supports containment` is important and should remain. |
| SEC701-0000009 | Provides both SLE and frequency, and the arithmetic is one step. Distractors reflect common calculation errors. | Currency values should remain simple unless arithmetic skill is intentionally tested. |
| SEC701-0000010 | Measurable uptime, response targets, and remedies point directly to an SLA. Other agreement types remain plausible but distinct. | None identified. |

## Batch-level ambiguity and duplication review

- No exact or near-identical stems were found within the sample.
- Each question uses a different `concept_key`.
- Questions 3 and 8 both involve limiting network reach, but they test different objectives and decision contexts: enterprise mitigation versus active incident containment.
- No choice depends on display position.
- No question uses all-of-the-above, none-of-the-above, or linked answer labels.
- Explanations identify when an incorrect technique would be relevant rather than dismissing it.
- The correct choice is not consistently the longest option, and the answer-key sequence does not form a simple repeating pattern.

## Recommendation before expansion

The project owner approved all ten questions on `2026-07-19`, and they were moved to `questions.csv`. Continue with batches of 10–20. Do not force every small batch to match the exam weights exactly; measure cumulative coverage and correct underrepresented objectives in later batches.
