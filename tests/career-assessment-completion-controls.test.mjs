import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  getAssessmentCompletionState,
} from "../src/assets/js/explore/career-assessment-completion-controls.js";

const questionIds = ["q1", "q2", "q3", "q4"];

test("results become available as soon as every question is answered", () => {
  const state = getAssessmentCompletionState(
    questionIds,
    { q1: "a", q2: "b", q3: "c", q4: "d" },
    1
  );

  assert.equal(state.complete, true);
  assert.deepEqual(state.missingIndexes, []);
  assert.equal(state.nextUnansweredIndex, null);
});

test("the final question can wrap to an earlier unanswered question", () => {
  const state = getAssessmentCompletionState(
    questionIds,
    { q1: "a", q2: "", q3: "c", q4: "d" },
    3
  );

  assert.equal(state.complete, false);
  assert.deepEqual(state.missingIndexes, [1]);
  assert.equal(state.nextUnansweredIndex, 1);
});

test("next unanswered selection follows the current question before wrapping", () => {
  const state = getAssessmentCompletionState(
    questionIds,
    { q1: "a", q2: "", q3: "", q4: "d" },
    0
  );

  assert.equal(state.nextUnansweredIndex, 1);
});

test("the assessment component loads the completion-control companion module", async () => {
  const component = await readFile(
    new URL("../src/_includes/components/explore-assessment.njk", import.meta.url),
    "utf8"
  );

  assert.match(
    component,
    /src="\/assets\/js\/explore\/career-assessment-completion-controls\.js"/
  );
  assert.match(component, /data-career-assessment-next[\s\S]*Next question/);
  assert.match(component, /data-career-assessment-submit[\s\S]*See my top two paths/);
});
