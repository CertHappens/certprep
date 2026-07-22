export function createPagedReportContext(
  session,
  position,
) {
  if (
    !session ||
    !Array.isArray(session.questionOrder) ||
    !session.questions ||
    typeof session.questions !== "object"
  ) {
    throw new TypeError("A valid quiz session is required.");
  }

  if (
    !Number.isInteger(position) ||
    position < 1 ||
    position > session.questionOrder.length
  ) {
    throw new RangeError(
      `Question position must be from 1 through ${session.questionOrder.length}.`,
    );
  }

  const questionId = session.questionOrder[position - 1];

  if (!session.questions[questionId]?.question) {
    throw new TypeError(
      `Question ${questionId} is missing from the session snapshot.`,
    );
  }

  return {
    questionId,
    questionPosition: position,
  };
}
