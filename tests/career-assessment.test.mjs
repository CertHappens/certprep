import assert from "node:assert/strict";
import test from "node:test";

import {
  scoreCareerAssessment,
  validateCareerAssessment,
} from "../src/assets/js/explore/career-assessment-core.js";

const assessment = {
  paths: [
    { id: "it-operations", label: "IT operations" },
    { id: "development", label: "Development" },
    { id: "management", label: "Management" },
  ],
  questions: [
    {
      id: "work-style",
      prompt: "Which work sounds most satisfying?",
      options: [
        {
          id: "restore-service",
          label: "Restore an unavailable service",
          scores: { "it-operations": 2, management: 1 },
        },
        {
          id: "build-feature",
          label: "Build a new feature",
          scores: { development: 2 },
        },
      ],
    },
    {
      id: "team-role",
      prompt: "Which team role sounds most natural?",
      options: [
        {
          id: "coordinate-work",
          label: "Coordinate the work",
          scores: { management: 2 },
        },
        {
          id: "improve-system",
          label: "Improve the system",
          scores: { "it-operations": 1, development: 1 },
        },
      ],
    },
  ],
};

test("career assessment returns the two strongest configured paths", () => {
  const outcome = scoreCareerAssessment(assessment, {
    "work-style": "restore-service",
    "team-role": "coordinate-work",
  });

  assert.equal(outcome.complete, true);
  assert.deepEqual(
    outcome.topMatches.map((match) => [match.id, match.score]),
    [
      ["management", 3],
      ["it-operations", 2],
    ]
  );
});

test("career assessment reports every unanswered question before scoring", () => {
  const outcome = scoreCareerAssessment(assessment, {
    "work-style": "build-feature",
  });

  assert.equal(outcome.complete, false);
  assert.deepEqual(outcome.missingQuestionIds, ["team-role"]);
  assert.deepEqual(outcome.topMatches, []);
});

test("configured path order resolves equal scores deterministically", () => {
  const outcome = scoreCareerAssessment(assessment, {
    "work-style": "build-feature",
    "team-role": "coordinate-work",
  });

  assert.deepEqual(
    outcome.topMatches.map((match) => match.id),
    ["development", "management"]
  );
});

test("career assessment rejects an answer that is not configured", () => {
  assert.throws(
    () =>
      scoreCareerAssessment(assessment, {
        "work-style": "unknown-answer",
        "team-role": "coordinate-work",
      }),
    /Unknown answer/
  );
});

test("career assessment validation rejects unknown scoring paths", () => {
  const invalid = structuredClone(assessment);
  invalid.questions[0].options[0].scores = { nonexistent: 2 };

  assert.throws(() => validateCareerAssessment(invalid), /unknown path nonexistent/);
});
