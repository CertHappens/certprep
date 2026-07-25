import test from "node:test";
import assert from "node:assert/strict";

import {
  getPagedEntryPath,
  getPagedReturnPath,
  isClassicQuizMode,
} from "../src/assets/js/quiz/paged-entry.js";

function makeSession({
  currentIndex = 0,
  completedAt = null,
  count = 10,
} = {}) {
  return {
    test: {
      practiceTestPath: "/security-plus/sy0-701/practice-test",
    },
    completedAt,
    currentIndex,
    questionOrder: Array.from(
      { length: count },
      (_, index) => `question-${index + 1}`,
    ),
  };
}

test("classic mode is enabled only by the explicit query value", () => {
  assert.equal(isClassicQuizMode("?mode=classic"), true);
  assert.equal(isClassicQuizMode("?source=test&mode=classic"), true);
  assert.equal(isClassicQuizMode("?mode=paged"), false);
  assert.equal(isClassicQuizMode(""), false);
});

test("a new active session enters question 1", () => {
  assert.equal(
    getPagedEntryPath(makeSession()),
    "/security-plus/sy0-701/practice-test/question/1/",
  );
});

test("an unfinished session resumes its current numbered position", () => {
  assert.equal(
    getPagedEntryPath(makeSession({ currentIndex: 6 })),
    "/security-plus/sy0-701/practice-test/question/7/",
  );
});



test("a Network+ session enters its own numbered route", () => {
  const session = makeSession({ currentIndex: 1 });
  session.test.practiceTestPath = "/network-plus/n10-009/practice-test";

  assert.equal(
    getPagedEntryPath(session),
    "/network-plus/n10-009/practice-test/question/2/",
  );
});

test("classic mode keeps the established one-page engine", () => {
  assert.equal(
    getPagedEntryPath(
      makeSession({ currentIndex: 4 }),
      "?mode=classic",
    ),
    null,
  );
});

test("completed sessions remain on the base route for results", () => {
  assert.equal(
    getPagedEntryPath(
      makeSession({ completedAt: "2026-07-22T20:00:00.000Z" }),
    ),
    null,
  );
});


test("returning from Security+ results reopens the saved paged question", () => {
  assert.equal(
    getPagedReturnPath(
      makeSession({
        currentIndex: 6,
        completedAt: "2026-07-25T20:00:00.000Z",
      }),
    ),
    "/security-plus/sy0-701/practice-test/question/7/",
  );
});


test("returning from Network+ results uses the Network+ paged route", () => {
  const session = makeSession({
    currentIndex: 12,
    completedAt: "2026-07-25T20:00:00.000Z",
    count: 20,
  });
  session.test.practiceTestPath = "/network-plus/n10-009/practice-test";

  assert.equal(
    getPagedReturnPath(session),
    "/network-plus/n10-009/practice-test/question/13/",
  );
});


test("returning from classic results stays in the one-page fallback", () => {
  assert.equal(
    getPagedReturnPath(
      makeSession({
        currentIndex: 4,
        completedAt: "2026-07-25T20:00:00.000Z",
      }),
      "?mode=classic",
    ),
    null,
  );
});

test("missing or malformed sessions do not create a paged route", () => {
  assert.equal(getPagedEntryPath(null), null);
  assert.equal(
    getPagedEntryPath({
      completedAt: null,
      currentIndex: 10,
      questionOrder: ["question-1"],
    }),
    null,
  );
});
