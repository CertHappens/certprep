export const PRACTICE_TEST_PATH =
  "/security-plus/sy0-701/practice-test";

export const MAX_PAGED_QUESTION_COUNT = 50;

function isIntegerInRange(value, minimum, maximum) {
  return (
    Number.isInteger(value) &&
    value >= minimum &&
    value <= maximum
  );
}

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizePracticeTestPath(
  value = PRACTICE_TEST_PATH,
) {
  if (typeof value !== "string") {
    throw new TypeError("Practice-test path must be a string.");
  }

  const normalized = `/${value.trim().replace(/^\/+|\/+$/g, "")}`;

  if (
    normalized === "/" ||
    normalized.includes("?") ||
    normalized.includes("#")
  ) {
    throw new TypeError("Practice-test path must be an absolute site path.");
  }

  return normalized;
}

export function isValidQuestionPosition(
  position,
  maximum = MAX_PAGED_QUESTION_COUNT,
) {
  return (
    Number.isInteger(maximum) &&
    maximum > 0 &&
    isIntegerInRange(position, 1, maximum)
  );
}

export function buildQuestionPath(
  position,
  maximum = MAX_PAGED_QUESTION_COUNT,
  practiceTestPath = PRACTICE_TEST_PATH,
) {
  if (!isValidQuestionPosition(position, maximum)) {
    throw new RangeError(
      `Question position must be an integer from 1 through ${maximum}.`,
    );
  }

  return `${normalizePracticeTestPath(practiceTestPath)}/question/${position}/`;
}

export function parseQuestionPosition(
  locationValue,
  maximum = MAX_PAGED_QUESTION_COUNT,
  practiceTestPath = PRACTICE_TEST_PATH,
) {
  if (typeof locationValue !== "string") {
    return null;
  }

  const pathname = locationValue.split(/[?#]/, 1)[0];
  const basePath = escapeRegularExpression(
    normalizePracticeTestPath(practiceTestPath),
  );
  const expression = new RegExp(
    `^${basePath}/question/([1-9][0-9]*)/?$`,
  );
  const match = pathname.match(expression);

  if (!match) {
    return null;
  }

  const position = Number.parseInt(match[1], 10);
  return isValidQuestionPosition(position, maximum)
    ? position
    : null;
}

export function questionPositionToSessionIndex(
  position,
  maximum = MAX_PAGED_QUESTION_COUNT,
) {
  if (!isValidQuestionPosition(position, maximum)) {
    throw new RangeError(
      `Question position must be an integer from 1 through ${maximum}.`,
    );
  }

  return position - 1;
}

export function sessionIndexToQuestionPosition(
  index,
  maximum = MAX_PAGED_QUESTION_COUNT,
) {
  if (!isIntegerInRange(index, 0, maximum - 1)) {
    throw new RangeError(
      `Session index must be an integer from 0 through ${maximum - 1}.`,
    );
  }

  return index + 1;
}
