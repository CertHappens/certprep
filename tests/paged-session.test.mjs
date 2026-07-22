import test from "node:test";
import assert from "node:assert/strict";

import {
  completeQuizSession,
  createQuizSession,
} from "../src/assets/js/quiz/session.js";
import { restorePagedQuizSession } from "../src/assets/js/quiz/paged-session.js";
import { quizSessionStorageKey } from "../src/assets/js/quiz/storage.js";

class MemoryStorage {
  constructor() {
    this.values = new Map();
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

function makeQuestions(count = 3) {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const id = `SEC701-${String(number).padStart(7, "0")}`;

    return {
      id,
      type: "single_choice",
      text: `Question ${number}`,
      instruction: "",
      domain: {
        id: "1.0",
        name: "General Security Concepts",
      },
      objective: {
        id: "1.1",
        text: "Compare security controls.",
      },
      topic: "Controls",
      answers: [
        {
          id: `${id}-A`,
          text: "Answer A",
          explanation: "Explanation A",
        },
        {
          id: `${id}-B`,
          text: "Answer B",
          explanation: "Explanation B",
        },
      ],
      correctAnswerIds: [`${id}-A`],
      correctExplanation: "Answer A is correct.",
    };
  });
}

function makeSession(questionCount = 3) {
  return createQuizSession({
    test: {
      testId: "SEC-701",
      examVersion: "SY0-701",
    },
    dataVersion: "test-version",
    questions: makeQuestions(questionCount),
    questionCount,
    random: () => 0.5,
    now: () => "2026-07-22T18:00:00.000Z",
    sessionId: () => "session-test",
  });
}

function saveSession(storage, session) {
  storage.setItem(
    quizSessionStorageKey("SEC-701"),
    JSON.stringify(session),
  );
}

test("a missing browser session is reported without creating one", () => {
  const storage = new MemoryStorage();

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 1,
  });

  assert.equal(result.status, "missing");
  assert.equal(storage.values.size, 0);
});

test("an invalid question position is rejected before reading storage", () => {
  const storage = new MemoryStorage();

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 0,
  });

  assert.equal(result.status, "invalid-position");
});

test("an invalid saved session is cleared", () => {
  const storage = new MemoryStorage();
  storage.setItem(
    quizSessionStorageKey("SEC-701"),
    JSON.stringify({ sessionVersion: 999 }),
  );

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 1,
  });

  assert.equal(result.status, "invalid-session");
  assert.equal(storage.getItem(quizSessionStorageKey("SEC-701")), null);
});

test("a session for another test is rejected and cleared", () => {
  const storage = new MemoryStorage();
  const session = makeSession();
  session.test.testId = "OTHER-TEST";
  saveSession(storage, session);

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 1,
  });

  assert.equal(result.status, "invalid-session");
  assert.equal(storage.getItem(quizSessionStorageKey("SEC-701")), null);
});

test("a numbered route outside the active test does not move the session", () => {
  const storage = new MemoryStorage();
  const session = makeSession(3);
  saveSession(storage, session);

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 4,
  });

  assert.equal(result.status, "outside-session");
  assert.equal(result.total, 3);
  assert.equal(result.session.currentIndex, 0);
});

test("a completed session is recognized without changing its position", () => {
  const storage = new MemoryStorage();
  const session = makeSession();
  session.currentIndex = 2;
  completeQuizSession(
    session,
    () => "2026-07-22T18:05:00.000Z",
  );
  saveSession(storage, session);

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 1,
  });

  assert.equal(result.status, "completed");
  assert.equal(result.session.currentIndex, 2);
});

test("an active session restores the requested question and persists the position", () => {
  const storage = new MemoryStorage();
  const session = makeSession();
  saveSession(storage, session);

  const result = restorePagedQuizSession({
    storage,
    testId: "SEC-701",
    position: 2,
  });

  assert.equal(result.status, "restored");
  assert.equal(result.position, 2);
  assert.equal(result.total, 3);
  assert.equal(result.session.currentIndex, 1);
  assert.equal(
    result.state.question.id,
    result.session.questionOrder[1],
  );

  const persisted = JSON.parse(
    storage.getItem(quizSessionStorageKey("SEC-701")),
  );
  assert.equal(persisted.currentIndex, 1);
});
