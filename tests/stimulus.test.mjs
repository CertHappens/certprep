import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { isValidQuestionStimulus } from "../src/assets/js/quiz/stimulus.js";
import { createQuizSession, isValidQuizSession } from "../src/assets/js/quiz/session.js";

const preformatted = {
  type: "preformatted",
  variant: "command_output",
  title: "Router output",
  content: "R1# show ip route\n<script>alert('no')</script>",
};

const table = {
  type: "table",
  title: "Evidence",
  caption: "Observed state",
  columns: [
    { key: "device", label: "Device" },
    { key: "status", label: "Status" },
  ],
  rows: [{ device: "SW1", status: "Up" }],
};

function question(stimulus) {
  return {
    id: "TEST-0000001",
    version: 1,
    type: "single_choice",
    style: "scenario",
    difficulty: "medium",
    instruction: null,
    text: "Review the evidence.",
    topic: "Testing",
    domain: { id: "1.0", name: "Domain" },
    objective: { id: "1.1", text: "Objective" },
    answers: ["A", "B", "C", "D"].map((key) => ({
      id: `TEST-0000001:${key}`,
      text: key,
      explanation: key,
    })),
    correctAnswerIds: ["TEST-0000001:A"],
    correctExplanation: "A",
    studyTopics: ["Testing"],
    stimulus,
  };
}

test("accepts supported preformatted and table stimuli", () => {
  assert.equal(isValidQuestionStimulus(preformatted), true);
  assert.equal(isValidQuestionStimulus(table), true);
  assert.equal(isValidQuestionStimulus(undefined), true);
});

test("rejects malformed stimulus structures", () => {
  assert.equal(isValidQuestionStimulus({ ...preformatted, variant: "html" }), false);
  assert.equal(isValidQuestionStimulus({ ...table, rows: [{ device: "SW1" }] }), false);
  assert.equal(isValidQuestionStimulus({ ...preformatted, extra: true }), false);
});

test("session snapshots preserve stimuli and reject malformed restored stimuli", () => {
  const session = createQuizSession({
    test: { testId: "TEST", examVersion: "1" },
    dataVersion: "sha256:test",
    questions: [question(table)],
    questionCount: 1,
    random: () => 0.25,
    now: () => "2026-08-01T12:00:00.000Z",
    sessionId: () => "session-test",
  });
  const restored = JSON.parse(JSON.stringify(session));
  assert.deepEqual(restored.questions["TEST-0000001"].question.stimulus, table);
  assert.equal(isValidQuizSession(restored, "TEST"), true);
  restored.questions["TEST-0000001"].question.stimulus.rows[0] = { device: "SW1" };
  assert.equal(isValidQuizSession(restored, "TEST"), false);
});

test("renderer and templates keep stimulus content text-only and available in both engines", async () => {
  const renderer = await readFile(new URL("../src/assets/js/quiz/stimulus.js", import.meta.url), "utf8");
  const classic = await readFile(new URL("../src/security-plus/sy0-701/practice-test/index.njk", import.meta.url), "utf8");
  const paged = await readFile(new URL("../src/security-plus/sy0-701/practice-test/question.njk", import.meta.url), "utf8");
  const app = await readFile(new URL("../src/assets/js/quiz/app.js", import.meta.url), "utf8");

  assert.match(renderer, /code\.textContent = stimulus\.content/);
  assert.match(renderer, /cell\.textContent = row\[column\.key\]/);
  assert.doesNotMatch(renderer, /innerHTML\s*=/);
  assert.match(classic, /data-quiz-stimulus/);
  assert.match(paged, /data-paged-stimulus/);
  assert.match(app, /review-stimulus/);
});
