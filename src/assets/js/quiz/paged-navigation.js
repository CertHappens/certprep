import { getQuestionResponseProgress, isStructuredQuestionType } from "./structured-response.js";
import { buildQuestionPath } from "./routes.js";

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

export function createPagedNavigationModel(session, currentPosition) {
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

  let answered = 0;
  let incomplete = 0;
  let unanswered = 0;
  let flagged = 0;

  const items = session.questionOrder.map((questionId, index) => {
    const state = session.questions[questionId];

    if (
      !state ||
      typeof state.flaggedForReview !== "boolean"
    ) {
      throw new TypeError(
        `Question state ${questionId} is missing navigation data.`,
      );
    }
    if (!isStructuredQuestionType(state.question?.type) && !Array.isArray(state.selectedAnswerIds)) {
      throw new TypeError(`Question state ${questionId} is missing response data.`);
    }

    const position = index + 1;
    const responseProgress = getQuestionResponseProgress(state);
    const isAnswered = responseProgress === "answered";
    const isIncomplete = responseProgress === "incomplete";
    const isFlagged = state.flaggedForReview;
    const isCurrent = position === currentPosition;

    if (isAnswered) answered += 1;
    else if (isIncomplete) incomplete += 1;
    else unanswered += 1;
    if (isFlagged) flagged += 1;

    const statuses = [responseProgress];

    if (isFlagged) statuses.push("flagged");
    if (isCurrent) statuses.push("current question");

    return {
      position,
      path: buildQuestionPath(
        position,
        total,
        session.test?.practiceTestPath,
      ),
      answered: isAnswered,
      incomplete: isIncomplete,
      flagged: isFlagged,
      current: isCurrent,
      ariaLabel: `Question ${position}, ${statuses.join(", ")}`,
    };
  });

  return {
    currentPosition,
    total,
    answered,
    incomplete,
    unanswered,
    flagged,
    previousPath:
      currentPosition > 1
        ? buildQuestionPath(
            currentPosition - 1,
            total,
            session.test?.practiceTestPath,
          )
        : null,
    nextPath:
      currentPosition < total
        ? buildQuestionPath(
            currentPosition + 1,
            total,
            session.test?.practiceTestPath,
          )
        : null,
    items,
  };
}
