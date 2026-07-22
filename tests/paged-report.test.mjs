import test from "node:test";
import assert from "node:assert/strict";

import {
  createPagedReportContext,
} from "../src/assets/js/quiz/paged-report.js";

function makeSession() {
  return {
    questionOrder: ["q1", "q2", "q3"],
    questions: {
      q1: { question: { id: "q1" } },
      q2: { question: { id: "q2" } },
      q3: { question: { id: "q3" } },
    },
  };
}

test("the report context identifies the requested randomized question", () => {
  assert.deepEqual(
    createPagedReportContext(makeSession(), 2),
    {
      questionId: "q2",
      questionPosition: 2,
    },
  );
});

test("the first and last session positions are supported", () => {
  assert.equal(
    createPagedReportContext(makeSession(), 1).questionId,
    "q1",
  );
  assert.equal(
    createPagedReportContext(makeSession(), 3).questionId,
    "q3",
  );
});

test("positions outside the active test are rejected", () => {
  assert.throws(
    () => createPagedReportContext(makeSession(), 0),
    RangeError,
  );
  assert.throws(
    () => createPagedReportContext(makeSession(), 4),
    RangeError,
  );
});

test("missing question snapshots and malformed sessions are rejected", () => {
  const missing = makeSession();
  delete missing.questions.q2.question;

  assert.throws(
    () => createPagedReportContext(missing, 2),
    TypeError,
  );
  assert.throws(
    () => createPagedReportContext(null, 1),
    TypeError,
  );
});
