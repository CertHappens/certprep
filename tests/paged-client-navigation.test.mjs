import assert from "node:assert/strict";
import test from "node:test";

import {
  createPagedNavigationTransition,
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
