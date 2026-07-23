import assert from "node:assert/strict";
import test from "node:test";

import {
  createPagedHistoryState,
  createPagedNavigationTransition,
  resolvePagedHistoryPosition,
  shouldHandlePagedNavigationClick,
} from "../src/assets/js/quiz/paged-client-navigation.js";

function createSession() {
  return {
    questionOrder: ["question-1", "question-2", "question-3"],
  };
}

function createClick(overrides = {}) {
  return {
    defaultPrevented: false,
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    ...overrides,
  };
}

test("creates a client-side transition for another question", () => {
  const transition = createPagedNavigationTransition(
    createSession(),
    1,
    3,
  );

  assert.deepEqual(transition, {
    changed: true,
    currentPosition: 1,
    targetPosition: 3,
    targetIndex: 2,
    path: "/security-plus/sy0-701/practice-test/question/3/",
  });
});

test("marks a transition to the current question as unchanged", () => {
  const transition = createPagedNavigationTransition(
    createSession(),
    2,
    2,
  );

  assert.equal(transition.changed, false);
  assert.equal(transition.targetIndex, 1);
});

test("rejects a target outside the active test", () => {
  assert.throws(
    () => createPagedNavigationTransition(createSession(), 1, 4),
    /Target question position must be an integer from 1 through 3/,
  );
});

test("creates a marked history state while preserving existing values", () => {
  assert.deepEqual(
    createPagedHistoryState({ source: "existing" }, 2, 3),
    {
      source: "existing",
      certHappensPagedQuiz: true,
      questionPosition: 2,
    },
  );
});

test("creates history state when the existing state is not an object", () => {
  assert.deepEqual(createPagedHistoryState(null, 1, 3), {
    certHappensPagedQuiz: true,
    questionPosition: 1,
  });
});

test("rejects a history position outside the active test", () => {
  assert.throws(
    () => createPagedHistoryState({}, 4, 3),
    /History question position must be an integer from 1 through 3/,
  );
});

test("resolves a marked browser-history position", () => {
  assert.equal(
    resolvePagedHistoryPosition(
      {
        certHappensPagedQuiz: true,
        questionPosition: 3,
      },
      "/security-plus/sy0-701/practice-test/question/1/",
      3,
    ),
    3,
  );
});

test("falls back to the route for an unmarked history entry", () => {
  assert.equal(
    resolvePagedHistoryPosition(
      { questionPosition: 3 },
      "/security-plus/sy0-701/practice-test/question/2/",
      3,
    ),
    2,
  );
});

test("falls back to the route when marked history state is invalid", () => {
  assert.equal(
    resolvePagedHistoryPosition(
      {
        certHappensPagedQuiz: true,
        questionPosition: 9,
      },
      "/security-plus/sy0-701/practice-test/question/2/",
      3,
    ),
    2,
  );
});

test("returns null when neither history state nor route identifies a question", () => {
  assert.equal(
    resolvePagedHistoryPosition(null, "/security-plus/sy0-701/practice-test/", 3),
    null,
  );
});

test("handles only an unmodified primary click", () => {
  assert.equal(shouldHandlePagedNavigationClick(createClick()), true);
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ defaultPrevented: true })),
    false,
  );
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ button: 1 })),
    false,
  );
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ ctrlKey: true })),
    false,
  );
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ metaKey: true })),
    false,
  );
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ shiftKey: true })),
    false,
  );
  assert.equal(
    shouldHandlePagedNavigationClick(createClick({ altKey: true })),
    false,
  );
});
