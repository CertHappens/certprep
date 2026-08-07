import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  buildStructuredReportAnswerIds,
  confirmOrderingResponse,
  createInitialStructuredResponseState,
  formatStructuredResponseSummary,
  getQuestionResponseProgress,
  gradeStructuredResponseState,
  isValidStructuredQuestion,
  isValidStructuredResponseState,
  moveOrderingResponseItem,
  moveOrderingResponseItemToEdge,
  setMatchingResponseValue,
  toggleLineResponseSelection,
} from "../src/assets/js/quiz/structured-response.js";
import {
  createQuizSession,
  getAnsweredCount,
  getIncompleteCount,
  getUnansweredCount,
  isValidQuizSession,
  setStructuredResponseState,
} from "../src/assets/js/quiz/session.js";
import { gradeQuestionState } from "../src/assets/js/quiz/grading.js";
import { normalizeQuestionReportPayload } from "../functions/_lib/question-report.js";

function matchingQuestion(variant = "matching") {
  return {
    id: "SEC701-9000001",
    version: 1,
    type: "matching",
    style: "comparison",
    difficulty: "medium",
    instruction: variant === "classification" ? "Classify each item." : "Match each item.",
    text: "Associate each item with the best category.",
    topic: "Structured response",
    domain: { id: "1.0", name: "General" },
    objective: { id: "1.1", text: "Test objective" },
    correctExplanation: "Each item maps to the category that best describes it.",
    studyTopics: ["matching"],
    response: {
      type: "matching",
      variant,
      items: [
        { id: "item_a", text: "Item A", correctOptionId: "option_one", explanation: "A maps to one." },
        { id: "item_b", text: "Item B", correctOptionId: variant === "classification" ? "option_one" : "option_two", explanation: "B maps to its category." },
      ],
      options: [
        { id: "option_one", label: "Category one" },
        { id: "option_two", label: "Category two" },
      ],
    },
  };
}

function orderingQuestion() {
  return {
    id: "SEC701-9000002",
    version: 1,
    type: "ordering",
    style: "scenario",
    difficulty: "medium",
    instruction: "Place the actions in the correct order.",
    text: "Order the response actions.",
    topic: "Structured response",
    domain: { id: "1.0", name: "General" },
    objective: { id: "1.1", text: "Test objective" },
    correctExplanation: "The actions follow the required sequence.",
    studyTopics: ["ordering"],
    response: {
      type: "ordering",
      items: [
        { id: "first", text: "First action", explanation: "This comes first." },
        { id: "second", text: "Second action", explanation: "This comes second." },
        { id: "third", text: "Third action", explanation: "This comes third." },
      ],
      correctOrder: ["first", "second", "third"],
    },
  };
}

function lineSelectQuestion() {
  return {
    id: "SEC701-9000003",
    version: 1,
    type: "line_select",
    style: "scenario",
    difficulty: "hard",
    instruction: "Select exactly two lines that identify the problem.",
    text: "Which two configuration lines should be investigated?",
    topic: "Structured response",
    domain: { id: "1.0", name: "General" },
    objective: { id: "1.1", text: "Test objective" },
    correctExplanation: "Lines 2 and 4 contain the relevant evidence.",
    studyTopics: ["evidence"],
    stimulus: {
      type: "preformatted",
      variant: "configuration",
      title: "Configuration excerpt",
      content: "interface Gi0/1\n switchport mode trunk\n\n switchport trunk native vlan 20\n description uplink",
    },
    response: {
      type: "line_select",
      selectionCount: 2,
      correctLineNumbers: [2, 4],
    },
  };
}

const deterministicRandom = () => 0;

test("matching responses move from unanswered to incomplete to answered and grade exactly", () => {
  const question = matchingQuestion();
  const initial = createInitialStructuredResponseState(question, deterministicRandom);
  let state = { question, responseState: initial };

  assert.equal(isValidStructuredQuestion(question), true);
  assert.equal(getQuestionResponseProgress(state), "unanswered");

  const partial = setMatchingResponseValue(initial, "item_a", "option_one");
  state = { question, responseState: partial };
  assert.equal(getQuestionResponseProgress(state), "incomplete");
  assert.equal(gradeStructuredResponseState(state).status, "incorrect");

  const complete = setMatchingResponseValue(partial, "item_b", "option_two");
  state = { question, responseState: complete };
  assert.equal(getQuestionResponseProgress(state), "answered");
  assert.equal(gradeStructuredResponseState(state).status, "correct");
  assert.match(formatStructuredResponseSummary(state), /Item A: Category one/);
});

test("one-to-one matching rejects duplicate option use while classification permits it", () => {
  const question = matchingQuestion();
  const responseState = {
    type: "matching",
    matches: { item_a: "option_one", item_b: "option_one" },
    optionOrder: ["option_one", "option_two"],
    touched: true,
  };
  assert.equal(isValidStructuredResponseState(question, responseState), false);
});

test("classification permits multiple items to use the same category", () => {
  const question = matchingQuestion("classification");
  let responseState = createInitialStructuredResponseState(question, deterministicRandom);
  responseState = setMatchingResponseValue(responseState, "item_a", "option_one");
  responseState = setMatchingResponseValue(responseState, "item_b", "option_one");

  assert.equal(isValidStructuredResponseState(question, responseState), true);
  assert.equal(gradeStructuredResponseState({ question, responseState }).status, "correct");
});

test("ordering is unanswered until the learner changes or explicitly confirms the randomized order", () => {
  const question = orderingQuestion();
  const initial = createInitialStructuredResponseState(question, deterministicRandom);
  assert.equal(getQuestionResponseProgress({ question, responseState: initial }), "unanswered");

  const confirmed = confirmOrderingResponse(initial);
  assert.equal(confirmed.touched, true);
  assert.equal(getQuestionResponseProgress({ question, responseState: confirmed }), "answered");

  const moved = moveOrderingResponseItem(initial, initial.order[1], -1);
  assert.equal(moved.touched, true);
  assert.equal(getQuestionResponseProgress({ question, responseState: moved }), "answered");

  const correct = {
    type: "ordering",
    order: [...question.response.correctOrder],
    touched: true,
  };
  assert.equal(gradeStructuredResponseState({ question, responseState: correct }).status, "correct");
});

test("ordering items can jump directly to the top or bottom", () => {
  const question = orderingQuestion();
  const initial = {
    type: "ordering",
    order: ["first", "second", "third"],
    touched: false,
  };

  const toTop = moveOrderingResponseItemToEdge(initial, "third", "start");
  assert.deepEqual(toTop.order, ["third", "first", "second"]);
  assert.equal(toTop.touched, true);

  const toBottom = moveOrderingResponseItemToEdge(toTop, "third", "end");
  assert.deepEqual(toBottom.order, ["first", "second", "third"]);
  assert.equal(isValidStructuredResponseState(question, toBottom), true);
  assert.throws(() => moveOrderingResponseItemToEdge(initial, "third", "middle"), RangeError);
});

test("line selection tracks partial responses and grades the selected line set", () => {
  const question = lineSelectQuestion();
  let responseState = createInitialStructuredResponseState(question, deterministicRandom);
  responseState = toggleLineResponseSelection(responseState, 4, true, 2);
  assert.equal(getQuestionResponseProgress({ question, responseState }), "incomplete");

  responseState = toggleLineResponseSelection(responseState, 2, true, 2);
  const state = { question, responseState };
  assert.equal(getQuestionResponseProgress(state), "answered");
  assert.equal(gradeStructuredResponseState(state).status, "correct");
  assert.equal(formatStructuredResponseSummary(state), "Lines 2, 4");

  assert.throws(
    () => toggleLineResponseSelection(responseState, 5, true, 2),
    RangeError,
  );
});

test("a quiz session can persist and grade all structured response types", () => {
  const questions = [matchingQuestion(), orderingQuestion(), lineSelectQuestion()];
  const session = createQuizSession({
    test: { testId: "SEC-701", examVersion: "SY0-701", practiceTestPath: "/security-plus/sy0-701/practice-test" },
    dataVersion: "sha256:structured-test",
    questions,
    questionCount: 3,
    random: deterministicRandom,
    now: () => "2026-08-07T12:00:00Z",
    sessionId: () => "structured-session",
  });

  assert.equal(isValidQuizSession(session, "SEC-701"), true);
  assert.equal(getAnsweredCount(session), 0);
  assert.equal(getIncompleteCount(session), 0);
  assert.equal(getUnansweredCount(session), 3);

  const matchState = session.questions["SEC701-9000001"];
  let matches = setMatchingResponseValue(matchState.responseState, "item_a", "option_one");
  setStructuredResponseState(session, matchState.question.id, matches, () => "2026-08-07T12:01:00Z");
  assert.equal(getIncompleteCount(session), 1);

  matches = setMatchingResponseValue(matches, "item_b", "option_two");
  setStructuredResponseState(session, matchState.question.id, matches, () => "2026-08-07T12:02:00Z");
  assert.equal(getAnsweredCount(session), 1);
  assert.equal(gradeQuestionState(session.questions[matchState.question.id]).status, "correct");
});

test("structured report encoding fits the existing report API contract", () => {
  const question = matchingQuestion();
  let responseState = createInitialStructuredResponseState(question, deterministicRandom);
  responseState = setMatchingResponseValue(responseState, "item_a", "option_one");
  responseState = setMatchingResponseValue(responseState, "item_b", "option_two");
  const encoded = buildStructuredReportAnswerIds({ question, responseState });

  assert.ok(encoded.displayedAnswerIds.length <= 12);
  assert.ok(encoded.selectedAnswerIds.every((id) => encoded.displayedAnswerIds.includes(id)));
  assert.ok(encoded.displayedAnswerIds.every((id) => id.startsWith(`${question.id}:`)));

  const normalized = normalizeQuestionReportPayload({
    questionId: question.id,
    testId: "SEC-701",
    examVersion: "SY0-701",
    questionVersion: 1,
    dataVersion: "sha256:structured-test",
    category: "explanation_unclear",
    note: "Review this response.",
    questionPosition: 1,
    ...encoded,
    turnstileToken: "test-token",
    website: "",
  });
  assert.deepEqual(normalized.selectedAnswerIds, encoded.selectedAnswerIds);
});

test("practice-test runtimes render structured responses in classic and paged modes", () => {
  const appSource = readFileSync("src/assets/js/quiz/app.js", "utf8");
  const pagedSource = readFileSync("src/assets/js/quiz/paged-question.js", "utf8");
  const rendererSource = readFileSync("src/assets/js/quiz/response-renderer.js", "utf8");

  assert.match(appSource, /renderStructuredQuestionResponse/);
  assert.match(pagedSource, /renderStructuredQuestionResponse/);
  assert.match(rendererSource, /Move up/);
  assert.match(rendererSource, /Move down/);
  assert.match(rendererSource, /To top/);
  assert.match(rendererSource, /To bottom/);
  assert.match(rendererSource, /icon: "⇈"/);
  assert.match(rendererSource, /icon: "⇊"/);
  assert.match(rendererSource, /Use this order/);
  assert.match(rendererSource, /Select exactly/);
  assert.match(rendererSource, /Choose a match/);
  assert.match(rendererSource, /Choose a category/);
});

test("site verifier accepts generalized correct-response wording", () => {
  const verifierSource = readFileSync("scripts/verify_site.mjs", "utf8");
  const practiceTemplates = [
    "src/security-plus/sy0-701/practice-test/index.njk",
    "src/network-plus/n10-009/practice-test/index.njk",
    "src/ccna/200-301-v2/practice-test/index.njk",
  ].map((path) => readFileSync(path, "utf8"));

  assert.match(verifierSource, /"correct responses"/);
  for (const source of practiceTemplates) {
    assert.match(source, /correct responses/i);
  }
});
