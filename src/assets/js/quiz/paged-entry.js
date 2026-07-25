import {
  MAX_PAGED_QUESTION_COUNT,
  buildQuestionPath,
} from "./routes.js";

export function isClassicQuizMode(search = "") {
  if (typeof search !== "string") {
    return false;
  }

  const params = new URLSearchParams(search);
  return params.get("mode") === "classic";
}

function getPagedSessionPath(
  session,
  search,
  { allowCompleted = false } = {},
) {
  if (isClassicQuizMode(search)) {
    return null;
  }

  if (
    !session ||
    (!allowCompleted && session.completedAt) ||
    !Array.isArray(session.questionOrder) ||
    session.questionOrder.length === 0 ||
    !Number.isInteger(session.currentIndex) ||
    session.currentIndex < 0 ||
    session.currentIndex >= session.questionOrder.length
  ) {
    return null;
  }

  return buildQuestionPath(
    session.currentIndex + 1,
    MAX_PAGED_QUESTION_COUNT,
    session.test?.practiceTestPath,
  );
}

export function getPagedEntryPath(session, search = "") {
  return getPagedSessionPath(session, search);
}

export function getPagedReturnPath(session, search = "") {
  return getPagedSessionPath(session, search, {
    allowCompleted: true,
  });
}
