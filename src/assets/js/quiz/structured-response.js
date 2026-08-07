import { shuffleCopy } from "./shuffle.js";

export const CHOICE_QUESTION_TYPES = new Set([
  "single_choice",
  "multi_select",
  "best_available",
]);

export const STRUCTURED_QUESTION_TYPES = new Set([
  "matching",
  "ordering",
  "line_select",
]);

function hasOnlyKeys(value, allowedKeys) {
  return Object.keys(value).every((key) => allowedKeys.has(key));
}

function isNonEmptyText(value, maxLength = 1200) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function uniqueStrings(values) {
  return Array.isArray(values)
    && values.every((value) => typeof value === "string")
    && new Set(values).size === values.length;
}

export function isChoiceQuestionType(questionType) {
  return CHOICE_QUESTION_TYPES.has(questionType);
}

export function isStructuredQuestionType(questionType) {
  return STRUCTURED_QUESTION_TYPES.has(questionType);
}

export function getSelectableStimulusLines(question) {
  if (question?.type !== "line_select" || question?.stimulus?.type !== "preformatted") {
    return [];
  }

  return String(question.stimulus.content || "")
    .split("\n")
    .map((text, index) => ({ number: index + 1, text }));
}

export function isValidStructuredQuestion(question) {
  if (!question || !isStructuredQuestionType(question.type)) {
    return false;
  }

  const response = question.response;
  if (!response || typeof response !== "object" || Array.isArray(response) || response.type !== question.type) {
    return false;
  }

  if (question.type === "matching") {
    if (!hasOnlyKeys(response, new Set(["type", "variant", "items", "options"]))) {
      return false;
    }
    if (!["matching", "classification"].includes(response.variant)) {
      return false;
    }
    if (!Array.isArray(response.items) || response.items.length < 2 || response.items.length > 10) {
      return false;
    }
    if (!Array.isArray(response.options) || response.options.length < 2 || response.options.length > 10) {
      return false;
    }

    const optionIds = response.options.map((option) => option?.id);
    if (!uniqueStrings(optionIds)) {
      return false;
    }
    if (!response.options.every((option) => (
      option
      && typeof option === "object"
      && hasOnlyKeys(option, new Set(["id", "label"]))
      && isNonEmptyText(option.id, 40)
      && isNonEmptyText(option.label, 180)
    ))) {
      return false;
    }

    const itemIds = response.items.map((item) => item?.id);
    if (!uniqueStrings(itemIds)) {
      return false;
    }
    if (!response.items.every((item) => (
      item
      && typeof item === "object"
      && hasOnlyKeys(item, new Set(["id", "text", "correctOptionId", "explanation"]))
      && isNonEmptyText(item.id, 40)
      && isNonEmptyText(item.text, 500)
      && optionIds.includes(item.correctOptionId)
      && isNonEmptyText(item.explanation, 1200)
    ))) {
      return false;
    }

    if (response.variant === "matching") {
      const correctIds = response.items.map((item) => item.correctOptionId);
      return response.items.length === response.options.length
        && new Set(correctIds).size === correctIds.length;
    }
    return true;
  }

  if (question.type === "ordering") {
    if (!hasOnlyKeys(response, new Set(["type", "items", "correctOrder"]))) {
      return false;
    }
    if (!Array.isArray(response.items) || response.items.length < 3 || response.items.length > 10) {
      return false;
    }
    const itemIds = response.items.map((item) => item?.id);
    if (!uniqueStrings(itemIds)) {
      return false;
    }
    if (!response.items.every((item) => (
      item
      && typeof item === "object"
      && hasOnlyKeys(item, new Set(["id", "text", "explanation"]))
      && isNonEmptyText(item.id, 40)
      && isNonEmptyText(item.text, 500)
      && isNonEmptyText(item.explanation, 1200)
    ))) {
      return false;
    }
    return uniqueStrings(response.correctOrder)
      && response.correctOrder.length === itemIds.length
      && response.correctOrder.every((itemId) => itemIds.includes(itemId));
  }

  if (!hasOnlyKeys(response, new Set(["type", "selectionCount", "correctLineNumbers"]))) {
    return false;
  }
  if (!Number.isInteger(response.selectionCount) || response.selectionCount < 1 || response.selectionCount > 8) {
    return false;
  }
  if (
    !Array.isArray(response.correctLineNumbers)
    || response.correctLineNumbers.length !== response.selectionCount
    || response.correctLineNumbers.some((number) => !Number.isInteger(number) || number < 1)
    || new Set(response.correctLineNumbers).size !== response.correctLineNumbers.length
  ) {
    return false;
  }
  const lines = getSelectableStimulusLines(question);
  return lines.length > 0
    && response.correctLineNumbers.every((number) => {
      const line = lines[number - 1];
      return line && line.text.trim().length > 0;
    });
}

export function createInitialStructuredResponseState(question, random = Math.random) {
  if (!isValidStructuredQuestion(question)) {
    throw new TypeError("A valid structured question is required.");
  }

  if (question.type === "matching") {
    return {
      type: "matching",
      matches: {},
      optionOrder: shuffleCopy(question.response.options.map((option) => option.id), random),
      touched: false,
    };
  }

  if (question.type === "ordering") {
    const itemIds = question.response.items.map((item) => item.id);
    return {
      type: "ordering",
      order: shuffleCopy(itemIds, random),
      touched: false,
    };
  }

  return { type: "line_select", selectedLineNumbers: [], touched: false };
}

export function isValidStructuredResponseState(question, responseState) {
  if (!isValidStructuredQuestion(question)) {
    return false;
  }
  if (!responseState || typeof responseState !== "object" || Array.isArray(responseState)) {
    return false;
  }
  if (responseState.type !== question.type || typeof responseState.touched !== "boolean") {
    return false;
  }

  if (question.type === "matching") {
    if (!hasOnlyKeys(responseState, new Set(["type", "matches", "optionOrder", "touched"]))) {
      return false;
    }
    if (!responseState.matches || typeof responseState.matches !== "object" || Array.isArray(responseState.matches)) {
      return false;
    }
    const itemIds = new Set(question.response.items.map((item) => item.id));
    const optionIds = new Set(question.response.options.map((option) => option.id));
    const matchedOptionIds = Object.values(responseState.matches);
    const matchingUsesUniqueOptions = question.response.variant !== "matching"
      || new Set(matchedOptionIds).size === matchedOptionIds.length;
    return uniqueStrings(responseState.optionOrder)
      && responseState.optionOrder.length === optionIds.size
      && responseState.optionOrder.every((optionId) => optionIds.has(optionId))
      && Object.entries(responseState.matches).every(([itemId, optionId]) => (
        itemIds.has(itemId) && optionIds.has(optionId)
      ))
      && matchingUsesUniqueOptions;
  }

  if (question.type === "ordering") {
    if (!hasOnlyKeys(responseState, new Set(["type", "order", "touched"]))) {
      return false;
    }
    const itemIds = question.response.items.map((item) => item.id);
    return uniqueStrings(responseState.order)
      && responseState.order.length === itemIds.length
      && responseState.order.every((itemId) => itemIds.includes(itemId));
  }

  if (!hasOnlyKeys(responseState, new Set(["type", "selectedLineNumbers", "touched"]))) {
    return false;
  }
  const lines = getSelectableStimulusLines(question);
  return Array.isArray(responseState.selectedLineNumbers)
    && responseState.selectedLineNumbers.every((number) => (
      Number.isInteger(number)
      && number >= 1
      && number <= lines.length
      && lines[number - 1].text.trim().length > 0
    ))
    && new Set(responseState.selectedLineNumbers).size === responseState.selectedLineNumbers.length
    && responseState.selectedLineNumbers.length <= question.response.selectionCount;
}

export function setMatchingResponseValue(responseState, itemId, optionId) {
  const matches = { ...(responseState?.matches || {}) };
  if (optionId) {
    matches[itemId] = optionId;
  } else {
    delete matches[itemId];
  }
  return {
    type: "matching",
    matches,
    optionOrder: [...(responseState?.optionOrder || [])],
    touched: true,
  };
}

export function confirmOrderingResponse(responseState) {
  if (!responseState || responseState.type !== "ordering" || !Array.isArray(responseState.order)) {
    throw new TypeError("A valid ordering response state is required.");
  }
  return {
    type: "ordering",
    order: [...responseState.order],
    touched: true,
  };
}

export function moveOrderingResponseItem(responseState, itemId, direction) {
  if (![ -1, 1 ].includes(direction)) {
    throw new RangeError("Ordering direction must be -1 or 1.");
  }
  const order = [...(responseState?.order || [])];
  const currentIndex = order.indexOf(itemId);
  if (currentIndex < 0) {
    throw new RangeError("The ordering item is not part of this response.");
  }
  const targetIndex = currentIndex + direction;
  if (targetIndex < 0 || targetIndex >= order.length) {
    return { type: "ordering", order, touched: true };
  }
  [order[currentIndex], order[targetIndex]] = [order[targetIndex], order[currentIndex]];
  return { type: "ordering", order, touched: true };
}

export function moveOrderingResponseItemToEdge(responseState, itemId, edge) {
  if (!["start", "end"].includes(edge)) {
    throw new RangeError('Ordering edge must be "start" or "end".');
  }
  const order = [...(responseState?.order || [])];
  const currentIndex = order.indexOf(itemId);
  if (currentIndex < 0) {
    throw new RangeError("The ordering item is not part of this response.");
  }
  if (order.length < 2) {
    return { type: "ordering", order, touched: true };
  }

  const targetIndex = edge === "start" ? 0 : order.length - 1;
  if (currentIndex === targetIndex) {
    return { type: "ordering", order, touched: true };
  }

  const [item] = order.splice(currentIndex, 1);
  order.splice(targetIndex, 0, item);
  return { type: "ordering", order, touched: true };
}

export function toggleLineResponseSelection(responseState, lineNumber, checked, selectionCount) {
  const selected = new Set(responseState?.selectedLineNumbers || []);
  if (checked) {
    if (!selected.has(lineNumber) && selected.size >= selectionCount) {
      throw new RangeError(`Select exactly ${selectionCount} line${selectionCount === 1 ? "" : "s"}.`);
    }
    selected.add(lineNumber);
  } else {
    selected.delete(lineNumber);
  }
  return {
    type: "line_select",
    selectedLineNumbers: [...selected].sort((left, right) => left - right),
    touched: true,
  };
}

export function getQuestionResponseProgress(state) {
  if (!state || typeof state !== "object") {
    return "unanswered";
  }

  // Legacy/minimal choice-state fixtures and older saved choice sessions may not
  // carry the embedded question snapshot. Structured responses always do.
  if (!isStructuredQuestionType(state.question?.type)) {
    return Array.isArray(state.selectedAnswerIds) && state.selectedAnswerIds.length > 0
      ? "answered"
      : "unanswered";
  }

  if (!isValidStructuredResponseState(state.question, state.responseState)) {
    return "unanswered";
  }

  if (state.question.type === "matching") {
    const count = Object.keys(state.responseState.matches).length;
    if (count === 0) return "unanswered";
    return count === state.question.response.items.length ? "answered" : "incomplete";
  }

  if (state.question.type === "ordering") {
    return state.responseState.touched ? "answered" : "unanswered";
  }

  const count = state.responseState.selectedLineNumbers.length;
  if (count === 0) return "unanswered";
  return count === state.question.response.selectionCount ? "answered" : "incomplete";
}

export function getQuestionResponseStatusText(state) {
  if (!isStructuredQuestionType(state?.question?.type)) {
    const count = Array.isArray(state?.selectedAnswerIds) ? state.selectedAnswerIds.length : 0;
    return count === 0
      ? "No answer saved yet"
      : `${count} saved answer${count === 1 ? "" : "s"}`;
  }

  if (state?.question?.type === "matching") {
    const saved = Object.keys(state.responseState?.matches || {}).length;
    const total = state.question.response.items.length;
    return saved === 0 ? "No matches saved yet" : `${saved} of ${total} matches saved`;
  }

  if (state?.question?.type === "ordering") {
    return state.responseState?.touched ? "Order saved" : "No order saved yet";
  }

  if (state?.question?.type === "line_select") {
    const saved = state.responseState?.selectedLineNumbers?.length || 0;
    const total = state.question.response.selectionCount;
    return saved === 0
      ? "No lines selected yet"
      : `${saved} of ${total} required line${total === 1 ? "" : "s"} selected`;
  }

  return "No response saved yet";
}

export function gradeStructuredResponseState(state) {
  if (!isValidStructuredResponseState(state?.question, state?.responseState)) {
    throw new Error(`Question ${state?.question?.id || "unknown"} does not define a valid structured response state.`);
  }

  const progress = getQuestionResponseProgress(state);
  let correct = false;

  if (state.question.type === "matching") {
    correct = state.question.response.items.every((item) => (
      state.responseState.matches[item.id] === item.correctOptionId
    ));
  } else if (state.question.type === "ordering") {
    correct = state.responseState.order.every((itemId, index) => (
      itemId === state.question.response.correctOrder[index]
    ));
  } else {
    const selected = [...state.responseState.selectedLineNumbers].sort((a, b) => a - b);
    const expected = [...state.question.response.correctLineNumbers].sort((a, b) => a - b);
    correct = selected.length === expected.length
      && selected.every((lineNumber, index) => lineNumber === expected[index]);
  }

  return {
    status: progress === "unanswered" ? "unanswered" : correct ? "correct" : "incorrect",
    isAnswered: progress === "answered",
    progress,
  };
}

function matchingSummary(state, correct) {
  const optionById = new Map(state.question.response.options.map((option) => [option.id, option.label]));
  return state.question.response.items
    .map((item) => {
      const optionId = correct ? item.correctOptionId : state.responseState.matches[item.id];
      return `${item.text}: ${optionById.get(optionId) || "Not selected"}`;
    })
    .join("; ");
}

function orderingSummary(state, correct) {
  const itemById = new Map(state.question.response.items.map((item) => [item.id, item.text]));
  if (!correct && !state.responseState.touched) {
    return "No order saved";
  }
  const order = correct ? state.question.response.correctOrder : state.responseState.order;
  return order.map((itemId) => itemById.get(itemId) || itemId).join(" → ");
}

function lineSummary(state, correct) {
  const numbers = correct
    ? state.question.response.correctLineNumbers
    : state.responseState.selectedLineNumbers;
  if (numbers.length === 0) {
    return "No lines selected";
  }
  return `Line${numbers.length === 1 ? "" : "s"} ${numbers.join(", ")}`;
}

export function formatStructuredResponseSummary(state, { correct = false } = {}) {
  if (!isValidStructuredResponseState(state?.question, state?.responseState)) {
    return "Response unavailable";
  }
  if (state.question.type === "matching") return matchingSummary(state, correct);
  if (state.question.type === "ordering") return orderingSummary(state, correct);
  return lineSummary(state, correct);
}

export function buildStructuredReportAnswerIds(state) {
  const questionId = state?.question?.id;
  if (!questionId || !isValidStructuredResponseState(state.question, state.responseState)) {
    throw new TypeError("A valid structured question state is required for reporting.");
  }

  const marker = `${questionId}:structured:${state.question.type}`;
  const selected = [];

  if (state.question.type === "matching") {
    const itemIndex = new Map(state.question.response.items.map((item, index) => [item.id, index + 1]));
    const optionIndex = new Map(state.question.response.options.map((option, index) => [option.id, index + 1]));
    for (const item of state.question.response.items) {
      const optionId = state.responseState.matches[item.id];
      if (optionId) {
        selected.push(`${questionId}:M${itemIndex.get(item.id)}=${optionIndex.get(optionId)}`);
      }
    }
  } else if (state.question.type === "ordering" && state.responseState.touched) {
    const itemIndex = new Map(state.question.response.items.map((item, index) => [item.id, index + 1]));
    state.responseState.order.forEach((itemId, index) => {
      selected.push(`${questionId}:O${index + 1}=${itemIndex.get(itemId)}`);
    });
  } else if (state.question.type === "line_select") {
    state.responseState.selectedLineNumbers.forEach((lineNumber) => {
      selected.push(`${questionId}:L${lineNumber}`);
    });
  }

  return {
    displayedAnswerIds: [marker, ...selected],
    selectedAnswerIds: selected,
  };
}
