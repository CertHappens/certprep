/**
 * Returns the completion and navigation state for an assessment.
 *
 * Keeping this calculation separate from the DOM controller makes the behavior
 * predictable and easy to test.
 */
export function getAssessmentCompletionState(questionIds, answers, currentQuestionIndex) {
  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    throw new TypeError("questionIds must be a non-empty array.");
  }

  if (!answers || typeof answers !== "object") {
    throw new TypeError("answers must be an object.");
  }

  if (
    !Number.isInteger(currentQuestionIndex) ||
    currentQuestionIndex < 0 ||
    currentQuestionIndex >= questionIds.length
  ) {
    throw new RangeError("currentQuestionIndex is outside the assessment.");
  }

  const missingIndexes = questionIds
    .map((questionId, index) => (answers[questionId] ? -1 : index))
    .filter((index) => index >= 0);

  let nextUnansweredIndex = null;
  if (missingIndexes.length > 0) {
    for (let offset = 1; offset <= questionIds.length; offset += 1) {
      const candidate = (currentQuestionIndex + offset) % questionIds.length;
      if (missingIndexes.includes(candidate)) {
        nextUnansweredIndex = candidate;
        break;
      }
    }
  }

  return {
    complete: missingIndexes.length === 0,
    missingIndexes,
    nextUnansweredIndex,
  };
}

function initializeCompletionControls(root) {
  const form = root.querySelector("[data-career-assessment-form]");
  const nextButton = root.querySelector("[data-career-assessment-next]");
  const submitButton = root.querySelector("[data-career-assessment-submit]");
  const questionElements = [...root.querySelectorAll("[data-assessment-question]")];
  const jumpButtons = [...root.querySelectorAll("[data-career-assessment-jump]")];

  if (
    !form ||
    !nextButton ||
    !submitButton ||
    questionElements.length === 0 ||
    jumpButtons.length !== questionElements.length
  ) {
    return;
  }

  const questionIds = questionElements.map((question) => question.dataset.questionId || "");

  if (questionIds.some((questionId) => !questionId)) {
    return;
  }

  const getCurrentQuestionIndex = () => {
    const visibleIndex = questionElements.findIndex(
      (question) =>
        !question.hidden &&
        question.style.display !== "none" &&
        question.getAttribute("aria-hidden") !== "true"
    );

    if (visibleIndex >= 0) {
      return visibleIndex;
    }

    const currentJumpIndex = jumpButtons.findIndex(
      (button) => button.getAttribute("aria-current") === "step"
    );

    return currentJumpIndex >= 0 ? currentJumpIndex : 0;
  };

  const collectAnswers = () =>
    Object.fromEntries(
      questionIds.map((questionId) => [
        questionId,
        form.querySelector(`input[name="${CSS.escape(questionId)}"]:checked`)?.value || "",
      ])
    );

  const refreshControls = () => {
    if (form.hidden) {
      return;
    }

    const state = getAssessmentCompletionState(
      questionIds,
      collectAnswers(),
      getCurrentQuestionIndex()
    );

    nextButton.hidden = state.complete;
    submitButton.hidden = !state.complete;
  };

  /*
   * The original controller stops Next at the final numbered question. When
   * answers were entered out of order, allow that button to wrap to the next
   * unanswered question instead.
   */
  nextButton.addEventListener(
    "click",
    (event) => {
      const currentQuestionIndex = getCurrentQuestionIndex();
      const currentQuestion = questionElements[currentQuestionIndex];
      const currentAnswered = Boolean(currentQuestion?.querySelector("input:checked"));
      const state = getAssessmentCompletionState(
        questionIds,
        collectAnswers(),
        currentQuestionIndex
      );

      if (
        !state.complete &&
        currentAnswered &&
        currentQuestionIndex === questionElements.length - 1 &&
        state.nextUnansweredIndex !== null
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        jumpButtons[state.nextUnansweredIndex]?.click();
        queueMicrotask(refreshControls);
      }
    },
    true
  );

  root.addEventListener("change", (event) => {
    if (event.target.matches('input[type="radio"]')) {
      queueMicrotask(refreshControls);
    }
  });

  root.addEventListener("click", (event) => {
    if (
      event.target.closest(
        "[data-career-assessment-jump], " +
          "[data-career-assessment-previous], " +
          "[data-career-assessment-next], " +
          "[data-career-assessment-restart], " +
          "[data-career-assessment-reset]"
      )
    ) {
      queueMicrotask(refreshControls);
    }
  });

  refreshControls();
}

if (typeof document !== "undefined") {
  for (const root of document.querySelectorAll("[data-career-assessment]")) {
    initializeCompletionControls(root);
  }
}
