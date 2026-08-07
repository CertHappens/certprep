import { getQuestionResponseProgress, isStructuredQuestionType } from "./structured-response.js";
import {
  PRACTICE_TEST_PATH,
  normalizePracticeTestPath,
} from "./routes.js";

export const PAGED_RESULTS_PATH = `${PRACTICE_TEST_PATH}/`;

function requireSession(session) {
  if (
    !session ||
    !Array.isArray(session.questionOrder) ||
    session.questionOrder.length === 0 ||
    !session.questions ||
    typeof session.questions !== "object"
  ) {
    throw new TypeError("A valid quiz session is required.");
  }
}

export function createPagedCompletionModel(
  session,
  currentPosition,
) {
  requireSession(session);

  const total = session.questionOrder.length;

  if (
    !Number.isInteger(currentPosition) ||
    currentPosition < 1 ||
    currentPosition > total
  ) {
    throw new RangeError(
      `Current position must be an integer from 1 through ${total}.`,
    );
  }

  let unanswered = 0;
  let incomplete = 0;
  for (const questionId of session.questionOrder) {
    const state = session.questions[questionId];
    if (!state) {
      throw new TypeError(`Question state ${questionId} is missing response data.`);
    }
    if (!isStructuredQuestionType(state.question?.type) && !Array.isArray(state.selectedAnswerIds)) {
      throw new TypeError(`Question state ${questionId} is missing response data.`);
    }
    const progress = getQuestionResponseProgress(state);
    if (progress === "incomplete") incomplete += 1;
    else if (progress === "unanswered") unanswered += 1;
  }


  const isFinal = currentPosition === total;

  return {
    isFinal,
    total,
    unanswered,
    incomplete,
    resultsPath: `${normalizePracticeTestPath(
      session.test?.practiceTestPath,
    )}/`,
    confirmationMessage: (() => {
      if (!isFinal || (unanswered === 0 && incomplete === 0)) return null;
      const parts = [];
      if (incomplete > 0) {
        parts.push(`${incomplete} incomplete question${incomplete === 1 ? "" : "s"}`);
      }
      if (unanswered > 0) {
        parts.push(`${unanswered} unanswered question${unanswered === 1 ? "" : "s"}`);
      }
      return `Finish this test with ${parts.join(" and ")}?`;
    })(),
  };
}
