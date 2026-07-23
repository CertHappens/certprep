import {
  getCurrentQuestionState,
  isValidQuizSession,
  moveToQuestion,
} from "./session.js";
import {
  clearStoredSession,
  loadStoredSession,
  quizSessionStorageKey,
  saveStoredSession,
} from "./storage.js";

function requireStorage(storage) {
  if (
    !storage ||
    typeof storage.getItem !== "function" ||
    typeof storage.setItem !== "function" ||
    typeof storage.removeItem !== "function"
  ) {
    throw new TypeError("A Web Storage-compatible object is required.");
  }
}

export function restorePagedQuizSession({
  storage,
  testId,
  position,
}) {
  requireStorage(storage);

  if (typeof testId !== "string" || testId.trim() === "") {
    throw new TypeError("A test ID is required.");
  }

  if (!Number.isInteger(position) || position < 1) {
    return {
      status: "invalid-position",
      position,
    };
  }

  const storageKey = quizSessionStorageKey(testId);
  const session = loadStoredSession(storage, storageKey);

  if (!session) {
    return {
      status: "missing",
      position,
      storageKey,
    };
  }

  if (!isValidQuizSession(session, testId)) {
    clearStoredSession(storage, storageKey);

    return {
      status: "invalid-session",
      position,
      storageKey,
    };
  }

  const total = session.questionOrder.length;

  if (position > total) {
    return {
      status: "outside-session",
      position,
      total,
      session,
      storageKey,
    };
  }

  if (session.completedAt) {
    return {
      status: "completed",
      position,
      total,
      session,
      storageKey,
    };
  }

  moveToQuestion(session, position - 1);
  saveStoredSession(storage, storageKey, session);

  return {
    status: "restored",
    position,
    total,
    session,
    state: getCurrentQuestionState(session),
    storageKey,
  };
}
