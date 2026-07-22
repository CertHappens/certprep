import { restorePagedQuizSession } from "./paged-session.js";

const app = document.querySelector("[data-paged-question-app]");

if (app) {
  initializePagedQuestion(app);
}

function initializePagedQuestion(root) {
  const position = Number(root.dataset.questionPosition);
  const testId = root.dataset.testId;

  const result = restorePagedQuizSession({
    storage: window.sessionStorage,
    testId,
    position,
  });

  const restoredView = root.querySelector('[data-paged-view="restored"]');
  const unavailableView = root.querySelector('[data-paged-view="unavailable"]');

  if (!restoredView || !unavailableView) {
    throw new Error("The paged question interface is incomplete.");
  }

  restoredView.hidden = result.status !== "restored";
  unavailableView.hidden = result.status === "restored";

  if (result.status === "restored") {
    renderRestoredSession(restoredView, result);
    return;
  }

  renderUnavailableSession(unavailableView, result);
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);

  if (!element) {
    throw new Error(`Missing paged question element: ${selector}`);
  }

  element.textContent = value;
}

function renderRestoredSession(root, result) {
  const { question } = result.state;
  const answeredCount = result.state.selectedAnswerIds.length;

  setText(
    root,
    "[data-paged-position]",
    `Question ${result.position} of ${result.total}`,
  );
  setText(root, "[data-paged-question-id]", question.id);
  setText(root, "[data-paged-domain]", `${question.domain.id} ${question.domain.name}`);
  setText(root, "[data-paged-topic]", question.topic);
  setText(root, "[data-paged-question-text]", question.text);
  setText(
    root,
    "[data-paged-answer-status]",
    answeredCount > 0
      ? `${answeredCount} saved answer${answeredCount === 1 ? "" : "s"}`
      : "No answer saved yet",
  );
}

function renderUnavailableSession(root, result) {
  let heading = "No active test was found in this tab.";
  let detail =
    "Start a randomized practice test, then use a numbered question route in the same browser tab.";

  if (result.status === "invalid-position") {
    heading = "This question position is not valid.";
    detail = "Return to the practice-test page and start a new session.";
  } else if (result.status === "invalid-session") {
    heading = "The saved test could not be restored.";
    detail =
      "The unusable browser-session data was cleared. Start a new randomized practice test.";
  } else if (result.status === "outside-session") {
    heading = `This session contains ${result.total} questions.`;
    detail =
      `Question ${result.position} is outside the active test. Open a numbered route from 1 through ${result.total}.`;
  } else if (result.status === "completed") {
    heading = "This test is already complete.";
    detail =
      "Return to the working practice-test page to view the saved results.";
  }

  setText(root, "[data-paged-unavailable-heading]", heading);
  setText(root, "[data-paged-unavailable-detail]", detail);
}
