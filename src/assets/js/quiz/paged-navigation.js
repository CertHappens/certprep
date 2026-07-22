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
  let flagged = 0;

  const items = session.questionOrder.map((questionId, index) => {
    const state = session.questions[questionId];

    if (
      !state ||
      !Array.isArray(state.selectedAnswerIds) ||
      typeof state.flaggedForReview !== "boolean"
    ) {
      throw new TypeError(
        `Question state ${questionId} is missing navigation data.`,
      );
    }

    const position = index + 1;
    const isAnswered = state.selectedAnswerIds.length > 0;
    const isFlagged = state.flaggedForReview;
    const isCurrent = position === currentPosition;

    if (isAnswered) answered += 1;
    if (isFlagged) flagged += 1;

    const statuses = [
      isAnswered ? "answered" : "unanswered",
    ];

    if (isFlagged) statuses.push("flagged");
    if (isCurrent) statuses.push("current question");

    return {
      position,
      path: buildQuestionPath(position),
      answered: isAnswered,
      flagged: isFlagged,
      current: isCurrent,
      ariaLabel: `Question ${position}, ${statuses.join(", ")}`,
    };
  });

  return {
    currentPosition,
    total,
    answered,
    unanswered: total - answered,
    flagged,
    previousPath:
      currentPosition > 1
        ? buildQuestionPath(currentPosition - 1)
        : null,
    nextPath:
      currentPosition < total
        ? buildQuestionPath(currentPosition + 1)
        : null,
    items,
  };
}
