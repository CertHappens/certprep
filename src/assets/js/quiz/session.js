import { isValidQuestionStimulus } from "./stimulus.js";
import {
  createInitialStructuredResponseState,
  getQuestionResponseProgress,
  isChoiceQuestionType,
  isStructuredQuestionType,
  isValidStructuredQuestion,
  isValidStructuredResponseState,
} from "./structured-response.js";
import { sampleWithoutReplacement, shuffleCopy } from "./shuffle.js";

export const QUIZ_SESSION_VERSION = 1;

function isoNow() {
  return new Date().toISOString();
}

function fallbackSessionId() {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

function createSessionId() {
  return globalThis.crypto?.randomUUID?.() ?? fallbackSessionId();
}

function cloneQuestion(question) {
  return JSON.parse(JSON.stringify(question));
}

function touch(session, now = isoNow) {
  session.updatedAt = now();
  return session;
}

export function createQuizSession({
  test,
  dataVersion,
  questions,
  questionCount,
  random = Math.random,
  now = isoNow,
  sessionId = createSessionId,
}) {
  if (!test?.testId) {
    throw new Error("A test ID is required to create a quiz session.");
  }

  if (!dataVersion) {
    throw new Error("A data version is required to create a quiz session.");
  }

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("At least one question is required to create a quiz session.");
  }

  const selectedQuestions = sampleWithoutReplacement(questions, questionCount, random);
  const questionOrder = selectedQuestions.map((question) => question.id);
  const questionStates = {};

  for (const sourceQuestion of selectedQuestions) {
    const question = cloneQuestion(sourceQuestion);

    if (isChoiceQuestionType(question.type)) {
      const answerIds = question.answers.map((answer) => answer.id);
      questionStates[question.id] = {
        question,
        displayedAnswerIds: shuffleCopy(answerIds, random),
        selectedAnswerIds: [],
        flaggedForReview: false,
      };
      continue;
    }

    if (!isValidStructuredQuestion(question)) {
      throw new Error(`Question ${question.id} does not define a valid structured response.`);
    }

    questionStates[question.id] = {
      question,
      displayedAnswerIds: [],
      selectedAnswerIds: [],
      responseState: createInitialStructuredResponseState(question, random),
      flaggedForReview: false,
    };
  }

  const timestamp = now();

  return {
    sessionVersion: QUIZ_SESSION_VERSION,
    sessionId: sessionId(),
    test: { ...test },
    dataVersion,
    startedAt: timestamp,
    updatedAt: timestamp,
    completedAt: null,
    currentIndex: 0,
    questionOrder,
    questions: questionStates,
  };
}

export function isValidQuizSession(session, expectedTestId = null) {
  if (!session || typeof session !== "object") {
    return false;
  }

  if (session.sessionVersion !== QUIZ_SESSION_VERSION) {
    return false;
  }

  if (!session.test?.testId || !session.dataVersion || !session.sessionId) {
    return false;
  }

  if (expectedTestId && session.test.testId !== expectedTestId) {
    return false;
  }

  if (!Array.isArray(session.questionOrder) || session.questionOrder.length === 0) {
    return false;
  }

  if (!session.questions || typeof session.questions !== "object") {
    return false;
  }

  if (!Number.isInteger(session.currentIndex) || session.currentIndex < 0 || session.currentIndex >= session.questionOrder.length) {
    return false;
  }

  const uniqueQuestionIds = new Set(session.questionOrder);
  if (uniqueQuestionIds.size !== session.questionOrder.length) {
    return false;
  }

  for (const questionId of session.questionOrder) {
    const state = session.questions[questionId];
    const question = state?.question;

    if (!state || !question?.id || question.id !== questionId) {
      return false;
    }

    if (!isValidQuestionStimulus(question.stimulus)) {
      return false;
    }

    if (typeof state.flaggedForReview !== "boolean") {
      return false;
    }

    if (!Array.isArray(state.displayedAnswerIds) || !Array.isArray(state.selectedAnswerIds)) {
      return false;
    }

    if (isChoiceQuestionType(question.type)) {
      const answerIds = question.answers?.map((answer) => answer.id);
      const correctAnswerIds = question.correctAnswerIds;

      if (!Array.isArray(answerIds) || answerIds.length === 0) {
        return false;
      }

      if (!Array.isArray(correctAnswerIds) || correctAnswerIds.length === 0) {
        return false;
      }

      if (!correctAnswerIds.every((answerId) => answerIds.includes(answerId))) {
        return false;
      }

      if (state.displayedAnswerIds.length !== answerIds.length) {
        return false;
      }

      if (new Set(state.displayedAnswerIds).size !== answerIds.length) {
        return false;
      }

      if (!state.displayedAnswerIds.every((answerId) => answerIds.includes(answerId))) {
        return false;
      }

      if (new Set(state.selectedAnswerIds).size !== state.selectedAnswerIds.length) {
        return false;
      }

      if (!state.selectedAnswerIds.every((answerId) => answerIds.includes(answerId))) {
        return false;
      }
      continue;
    }

    if (!isStructuredQuestionType(question.type) || !isValidStructuredQuestion(question)) {
      return false;
    }

    if (state.displayedAnswerIds.length !== 0 || state.selectedAnswerIds.length !== 0) {
      return false;
    }

    if (!isValidStructuredResponseState(question, state.responseState)) {
      return false;
    }
  }

  return true;
}

export function getCurrentQuestionId(session) {
  return session.questionOrder[session.currentIndex];
}

export function getQuestionState(session, questionId) {
  const state = session.questions[questionId];

  if (!state) {
    throw new Error(`Question ${questionId} is not part of this session.`);
  }

  return state;
}

export function getCurrentQuestionState(session) {
  return getQuestionState(session, getCurrentQuestionId(session));
}

export function setSelectedAnswerIds(session, questionId, selectedAnswerIds, now = isoNow) {
  const state = getQuestionState(session, questionId);
  if (!isChoiceQuestionType(state.question.type)) {
    throw new Error(`Question ${questionId} does not use answer-choice selections.`);
  }
  const allowedAnswerIds = new Set(state.question.answers.map((answer) => answer.id));
  const normalizedIds = [...new Set(selectedAnswerIds)];

  if (!normalizedIds.every((answerId) => allowedAnswerIds.has(answerId))) {
    throw new Error(`A selected answer does not belong to question ${questionId}.`);
  }

  if (["single_choice", "best_available"].includes(state.question.type) && normalizedIds.length > 1) {
    throw new Error(`Question ${questionId} accepts only one answer.`);
  }

  state.selectedAnswerIds = normalizedIds;
  touch(session, now);
  return session;
}

export function setStructuredResponseState(session, questionId, responseState, now = isoNow) {
  const state = getQuestionState(session, questionId);
  if (!isStructuredQuestionType(state.question.type)) {
    throw new Error(`Question ${questionId} does not use a structured response.`);
  }
  if (!isValidStructuredResponseState(state.question, responseState)) {
    throw new Error(`Question ${questionId} received an invalid structured response state.`);
  }
  state.responseState = JSON.parse(JSON.stringify(responseState));
  touch(session, now);
  return session;
}

export function toggleQuestionFlag(session, questionId, now = isoNow) {
  const state = getQuestionState(session, questionId);
  state.flaggedForReview = !state.flaggedForReview;
  touch(session, now);
  return state.flaggedForReview;
}

export function moveToQuestion(session, index, now = isoNow) {
  if (!Number.isInteger(index) || index < 0 || index >= session.questionOrder.length) {
    throw new RangeError("Question index is outside this test.");
  }

  session.currentIndex = index;
  touch(session, now);
  return session;
}

export function getAnsweredCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (getQuestionResponseProgress(session.questions[questionId]) === "answered" ? 1 : 0);
  }, 0);
}

export function getIncompleteCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (getQuestionResponseProgress(session.questions[questionId]) === "incomplete" ? 1 : 0);
  }, 0);
}

export function getFlaggedCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (session.questions[questionId].flaggedForReview ? 1 : 0);
  }, 0);
}

export function getUnansweredCount(session) {
  return session.questionOrder.reduce((count, questionId) => {
    return count + (getQuestionResponseProgress(session.questions[questionId]) === "unanswered" ? 1 : 0);
  }, 0);
}

export function completeQuizSession(session, now = isoNow) {
  const timestamp = now();
  session.completedAt = timestamp;
  session.updatedAt = timestamp;
  return session;
}

export function reopenQuizSession(session, now = isoNow) {
  session.completedAt = null;
  touch(session, now);
  return session;
}
