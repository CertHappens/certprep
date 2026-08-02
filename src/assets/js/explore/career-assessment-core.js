function requireArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty array.`);
  }
  return value;
}

function requireIdentifier(value, label) {
  const identifier = String(value ?? "").trim();
  if (!/^[a-z][a-zA-Z0-9-]*$/.test(identifier)) {
    throw new TypeError(`${label} must be a stable identifier.`);
  }
  return identifier;
}

export function validateCareerAssessment(assessment) {
  if (!assessment || typeof assessment !== "object") {
    throw new TypeError("Assessment data is required.");
  }

  const paths = requireArray(assessment.paths, "Assessment paths");
  const questions = requireArray(assessment.questions, "Assessment questions");
  const pathIds = new Set();

  for (const path of paths) {
    const pathId = requireIdentifier(path.id, "Path ID");
    if (pathIds.has(pathId)) {
      throw new Error(`Duplicate path ID: ${pathId}`);
    }
    pathIds.add(pathId);

    if (!String(path.label ?? "").trim()) {
      throw new Error(`Path ${pathId} is missing a label.`);
    }
  }

  const questionIds = new Set();
  for (const question of questions) {
    const questionId = requireIdentifier(question.id, "Question ID");
    if (questionIds.has(questionId)) {
      throw new Error(`Duplicate question ID: ${questionId}`);
    }
    questionIds.add(questionId);

    const options = requireArray(question.options, `Options for ${questionId}`);
    const optionIds = new Set();

    for (const option of options) {
      const optionId = requireIdentifier(option.id, `Option ID for ${questionId}`);
      if (optionIds.has(optionId)) {
        throw new Error(`Duplicate option ID ${optionId} for ${questionId}.`);
      }
      optionIds.add(optionId);

      if (!String(option.label ?? "").trim()) {
        throw new Error(`Option ${optionId} for ${questionId} is missing a label.`);
      }

      if (!option.scores || typeof option.scores !== "object" || Array.isArray(option.scores)) {
        throw new Error(`Option ${optionId} for ${questionId} is missing score weights.`);
      }

      for (const [pathId, weight] of Object.entries(option.scores)) {
        if (!pathIds.has(pathId)) {
          throw new Error(`Option ${optionId} for ${questionId} references unknown path ${pathId}.`);
        }
        if (!Number.isFinite(weight) || weight < 0) {
          throw new Error(`Option ${optionId} for ${questionId} has an invalid weight for ${pathId}.`);
        }
      }
    }
  }

  return assessment;
}

export function scoreCareerAssessment(assessment, answers, { resultCount = 2 } = {}) {
  validateCareerAssessment(assessment);

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    throw new TypeError("Assessment answers must be an object keyed by question ID.");
  }

  if (!Number.isInteger(resultCount) || resultCount < 1 || resultCount > assessment.paths.length) {
    throw new RangeError("Result count must fit within the configured career paths.");
  }

  const scores = new Map(assessment.paths.map((path) => [path.id, 0]));
  const missingQuestionIds = [];

  for (const question of assessment.questions) {
    const selectedId = String(answers[question.id] ?? "").trim();
    if (!selectedId) {
      missingQuestionIds.push(question.id);
      continue;
    }

    const selectedOption = question.options.find((option) => option.id === selectedId);
    if (!selectedOption) {
      throw new Error(`Unknown answer ${selectedId} for question ${question.id}.`);
    }

    for (const [pathId, weight] of Object.entries(selectedOption.scores)) {
      scores.set(pathId, scores.get(pathId) + weight);
    }
  }

  if (missingQuestionIds.length > 0) {
    return {
      complete: false,
      missingQuestionIds,
      ranking: [],
      topMatches: [],
    };
  }

  const ranking = assessment.paths
    .map((path, index) => ({
      ...path,
      score: scores.get(path.id),
      configuredOrder: index,
    }))
    .sort((left, right) => right.score - left.score || left.configuredOrder - right.configuredOrder)
    .map(({ configuredOrder, ...path }) => path);

  return {
    complete: true,
    missingQuestionIds: [],
    ranking,
    topMatches: ranking.slice(0, resultCount),
  };
}
