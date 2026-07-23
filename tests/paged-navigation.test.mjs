import test from "node:test";
import assert from "node:assert/strict";

import {
  createPagedNavigationModel,
} from "../src/assets/js/quiz/paged-navigation.js";

function makeSession() {
  return {
    questionOrder: ["q1", "q2", "q3", "q4"],
    questions: {
      q1: { selectedAnswerIds: ["q1-a"], flaggedForReview: false },
      q2: { selectedAnswerIds: [], flaggedForReview: true },
      q3: { selectedAnswerIds: ["q3-c"], flaggedForReview: true },
      q4: { selectedAnswerIds: [], flaggedForReview: false },
    },
  };
}

test("first question has no previous path and points next to question 2", () => {
  const model = createPagedNavigationModel(makeSession(), 1);
  assert.equal(model.previousPath, null);
  assert.equal(
    model.nextPath,
    "/security-plus/sy0-701/practice-test/question/2/",
  );
});

test("a middle question has previous and next document paths", () => {
  const model = createPagedNavigationModel(makeSession(), 3);
  assert.equal(
    model.previousPath,
    "/security-plus/sy0-701/practice-test/question/2/",
  );
  assert.equal(
    model.nextPath,
    "/security-plus/sy0-701/practice-test/question/4/",
  );
});

test("last question has no next path", () => {
  const model = createPagedNavigationModel(makeSession(), 4);
  assert.equal(
    model.previousPath,
    "/security-plus/sy0-701/practice-test/question/3/",
  );
  assert.equal(model.nextPath, null);
});

test("navigation totals count answered, unanswered, and flagged questions", () => {
  const model = createPagedNavigationModel(makeSession(), 2);
  assert.equal(model.total, 4);
  assert.equal(model.answered, 2);
  assert.equal(model.unanswered, 2);
  assert.equal(model.flagged, 2);
});

test("navigator items expose current, answered, and flagged state", () => {
  const model = createPagedNavigationModel(makeSession(), 3);
  assert.deepEqual(
    {
      answered: model.items[2].answered,
      flagged: model.items[2].flagged,
      current: model.items[2].current,
      ariaLabel: model.items[2].ariaLabel,
    },
    {
      answered: true,
      flagged: true,
      current: true,
      ariaLabel: "Question 3, answered, flagged, current question",
    },
  );
});

test("positions outside the active session are rejected", () => {
  assert.throws(
    () => createPagedNavigationModel(makeSession(), 0),
    RangeError,
  );
  assert.throws(
    () => createPagedNavigationModel(makeSession(), 5),
    RangeError,
  );
});
