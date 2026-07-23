import {
  buildQuestionPath,
  isValidQuestionPosition,
  parseQuestionPosition,
} from "./routes.js";

const PAGED_HISTORY_MARKER = "certHappensPagedQuiz";

function requireSessionQuestionOrder(session) {
  if (!Array.isArray(session?.questionOrder) || session.questionOrder.length === 0) {
    throw new TypeError("A quiz session with questions is required.");
  }

  return session.questionOrder.length;
}

function requirePosition(position, total, label) {
  if (!Number.isInteger(position) || position < 1 || position > total) {
    throw new RangeError(`${label} must be an integer from 1 through ${total}.`);
  }
}

export function createPagedNavigationTransition(
  session,
  currentPosition,
  targetPosition,
) {
  const total = requireSessionQuestionOrder(session);
  requirePosition(currentPosition, total, "Current question position");
  requirePosition(targetPosition, total, "Target question position");

  return {
    changed: targetPosition !== currentPosition,
    currentPosition,
    targetPosition,
    targetIndex: targetPosition - 1,
    path: buildQuestionPath(targetPosition),
  };
}

export function createPagedHistoryState(existingState, position, maximum) {
  if (!isValidQuestionPosition(position, maximum)) {
    throw new RangeError(
      `History question position must be an integer from 1 through ${maximum}.`,
    );
  }

  const baseState =
    existingState &&
    typeof existingState === "object" &&
    !Array.isArray(existingState)
      ? existingState
      : {};

  return {
    ...baseState,
    [PAGED_HISTORY_MARKER]: true,
    questionPosition: position,
  };
}

export function resolvePagedHistoryPosition(
  historyState,
  locationValue,
  maximum,
) {
  if (
    historyState?.[PAGED_HISTORY_MARKER] === true &&
    isValidQuestionPosition(historyState.questionPosition, maximum)
  ) {
    return historyState.questionPosition;
  }

  return parseQuestionPosition(locationValue, maximum);
}

export function shouldHandlePagedNavigationClick(event) {
  return Boolean(
    event &&
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
  );
}
