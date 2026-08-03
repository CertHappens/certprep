import { scoreCareerAssessment, validateCareerAssessment } from "./career-assessment-core.js";

const SESSION_VERSION = 1;

function parseAssessmentData(root) {
  const source = root.querySelector("[data-career-assessment-data]");
  if (!source) {
    throw new Error("Career assessment data is missing.");
  }

  const assessment = JSON.parse(source.textContent);
  validateCareerAssessment(assessment);
  return assessment;
}

function collectAnswers(form, assessment) {
  const formData = new FormData(form);
  return Object.fromEntries(
    assessment.questions.map((question) => [question.id, formData.get(question.id) || ""])
  );
}

function buildAssessmentVersion(assessment) {
  return assessment.questions
    .map((question) => `${question.id}:${question.options.map((option) => `${option.id}:${JSON.stringify(option.scores)}`).join(",")}`)
    .join("|");
}

function createStorageKey(root) {
  const assessmentId = root.id || "career-assessment";
  const pagePath = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .replaceAll("/", ".") || "home";
  return `certprep.explore.${pagePath}.${assessmentId}.session.v${SESSION_VERSION}`;
}

function readStoredSession(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn("Career assessment progress could not be read.", error);
    return null;
  }
}

function writeStoredSession(storage, key, session) {
  try {
    storage.setItem(key, JSON.stringify(session));
  } catch (error) {
    console.warn("Career assessment progress could not be saved.", error);
  }
}

function removeStoredSession(storage, key) {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.warn("Career assessment progress could not be cleared.", error);
  }
}

function restoreAnswers(form, assessment, savedAnswers) {
  if (!savedAnswers || typeof savedAnswers !== "object") {
    return;
  }

  for (const question of assessment.questions) {
    const savedOptionId = savedAnswers[question.id];
    if (!savedOptionId || !question.options.some((option) => option.id === savedOptionId)) {
      continue;
    }

    const input = form.querySelector(
      `input[name="${CSS.escape(question.id)}"][value="${CSS.escape(savedOptionId)}"]`
    );
    if (input) {
      input.checked = true;
    }
  }
}

function createResultCard(match, rank) {
  const article = document.createElement("article");
  article.className = "career-assessment__result-card";
  const rankLabel = document.createElement("p");
  rankLabel.className = "career-assessment__result-rank";
  rankLabel.textContent = rank === 1 ? "Strongest match" : "Second match";

  const heading = document.createElement("h3");
  heading.textContent = match.label;

  article.append(rankLabel, heading);

  if (match.description) {
    const description = document.createElement("p");
    description.textContent = match.description;
    article.append(description);
  }

  if (Array.isArray(match.nextSteps) && match.nextSteps.length > 0) {
    const list = document.createElement("ul");
    for (const step of match.nextSteps) {
      const item = document.createElement("li");
      item.textContent = step;
      list.append(item);
    }
    article.append(list);
  }

  if (match.url) {
    const link = document.createElement("a");
    link.className = "card__link";
    link.href = match.url;
    link.textContent = match.linkLabel || `Explore ${match.label}`;
    article.append(link);
  }

  return article;
}

function initializeCareerAssessment(root) {
  const form = root.querySelector("[data-career-assessment-form]");
  const status = root.querySelector("[data-career-assessment-status]");
  const results = root.querySelector("[data-career-assessment-results]");
  const resultCards = root.querySelector("[data-career-assessment-result-cards]");
  const retakeButton = root.querySelector("[data-career-assessment-reset]");
  const restartButton = root.querySelector("[data-career-assessment-restart]");
  const previousButton = root.querySelector("[data-career-assessment-previous]");
  const nextButton = root.querySelector("[data-career-assessment-next]");
  const submitButton = root.querySelector("[data-career-assessment-submit]");
  const questionElements = [...root.querySelectorAll("[data-assessment-question]")];
  const jumpButtons = [...root.querySelectorAll("[data-career-assessment-jump]")];

  if (
    !form ||
    !status ||
    !results ||
    !resultCards ||
    !retakeButton ||
    !restartButton ||
    !previousButton ||
    !nextButton ||
    !submitButton ||
    questionElements.length === 0 ||
    jumpButtons.length !== questionElements.length
  ) {
    return;
  }

  let assessment;
  try {
    assessment = parseAssessmentData(root);
  } catch (error) {
    status.textContent = "The assessment could not be loaded. Please try again later.";
    console.error(error);
    return;
  }

  const storage = window.sessionStorage;
  const storageKey = createStorageKey(root);
  const assessmentVersion = buildAssessmentVersion(assessment);
  let currentQuestionIndex = 0;
  let completedAt = null;
  let startedAt = new Date().toISOString();
  root.dataset.enhanced = "true";

  const focusCurrentQuestion = () => {
    const current = questionElements[currentQuestionIndex];
    current?.querySelector("input:checked, input")?.focus();
  };

  const saveSession = () => {
    writeStoredSession(storage, storageKey, {
      sessionVersion: SESSION_VERSION,
      assessmentId: root.id || "career-assessment",
      assessmentVersion,
      startedAt,
      updatedAt: new Date().toISOString(),
      completedAt,
      currentQuestionIndex,
      answers: collectAnswers(form, assessment),
    });
  };

  const updateQuestionNavigator = () => {
    jumpButtons.forEach((button, index) => {
      const question = assessment.questions[index];
      const answered = Boolean(
        form.querySelector(`input[name="${CSS.escape(question.id)}"]:checked`)
      );
      const current = index === currentQuestionIndex;

      button.classList.toggle("is-answered", answered);
      button.classList.toggle("is-current", current);
      button.setAttribute(
        "aria-label",
        `Go to question ${index + 1}${answered ? ", answered" : ", unanswered"}${current ? ", current question" : ""}`
      );

      if (current) {
        button.setAttribute("aria-current", "step");
      } else {
        button.removeAttribute("aria-current");
      }
    });
  };

  const renderQuestion = ({ focus = false, save = false } = {}) => {
    questionElements.forEach((question, index) => {
      const current = index === currentQuestionIndex;
      question.hidden = !current;
      question.style.display = current ? "" : "none";
      if (current) {
        question.removeAttribute("aria-hidden");
      } else {
        question.setAttribute("aria-hidden", "true");
      }
      question.removeAttribute("data-incomplete");
    });

    updateQuestionNavigator();
    previousButton.hidden = currentQuestionIndex === 0;
    nextButton.hidden = currentQuestionIndex === questionElements.length - 1;
    submitButton.hidden = currentQuestionIndex !== questionElements.length - 1;
    status.textContent = "";

    if (save) {
      saveSession();
    }

    if (focus) {
      focusCurrentQuestion();
    }
  };

  const renderResults = (outcome, { focus = false, announce = false } = {}) => {
    resultCards.replaceChildren(
      ...outcome.topMatches.map((match, index) => createResultCard(match, index + 1))
    );
    if (announce) {
      status.textContent = "Assessment complete. Your two strongest matches are shown below.";
    }
    form.hidden = true;
    results.hidden = false;
    if (focus) {
      results.focus();
    }
  };

  const currentQuestionIsAnswered = () => {
    const question = assessment.questions[currentQuestionIndex];
    return Boolean(
      form.querySelector(`input[name="${CSS.escape(question.id)}"]:checked`)
    );
  };

  const resetAssessment = ({ confirmRestart = false, focus = true } = {}) => {
    const hasProgress = Object.values(collectAnswers(form, assessment)).some(Boolean) || completedAt;
    if (
      confirmRestart &&
      hasProgress &&
      !window.confirm("Restart the quiz and clear all saved answers and results?")
    ) {
      return;
    }

    form.reset();
    resultCards.replaceChildren();
    results.hidden = true;
    form.hidden = false;
    currentQuestionIndex = 0;
    completedAt = null;
    startedAt = new Date().toISOString();
    removeStoredSession(storage, storageKey);
    renderQuestion();
    if (focus) {
      focusCurrentQuestion();
    }
  };

  nextButton.addEventListener("click", () => {
    if (!currentQuestionIsAnswered()) {
      const current = questionElements[currentQuestionIndex];
      current.setAttribute("data-incomplete", "true");
      status.textContent = "Choose an answer before continuing.";
      current.querySelector("input")?.focus();
      return;
    }

    currentQuestionIndex += 1;
    renderQuestion({ focus: true, save: true });
  });

  previousButton.addEventListener("click", () => {
    currentQuestionIndex = Math.max(0, currentQuestionIndex - 1);
    renderQuestion({ focus: true, save: true });
  });

  for (const button of jumpButtons) {
    button.addEventListener("click", () => {
      const requestedIndex = Number.parseInt(button.dataset.questionIndex || "", 10);
      if (!Number.isInteger(requestedIndex) || !questionElements[requestedIndex]) {
        return;
      }

      currentQuestionIndex = requestedIndex;
      renderQuestion({ focus: true, save: true });
    });
  }

  form.addEventListener("change", (event) => {
    if (event.target.matches('input[type="radio"]')) {
      questionElements[currentQuestionIndex]?.removeAttribute("data-incomplete");
      status.textContent = "";
      updateQuestionNavigator();
      saveSession();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const outcome = scoreCareerAssessment(assessment, collectAnswers(form, assessment), {
      resultCount: 2,
    });

    questionElements.forEach((question) => question.removeAttribute("data-incomplete"));

    if (!outcome.complete) {
      const firstMissingId = outcome.missingQuestionIds[0];
      const missingIndex = assessment.questions.findIndex(
        (question) => question.id === firstMissingId
      );
      currentQuestionIndex = Math.max(0, missingIndex);
      renderQuestion({ save: true });
      const firstMissing = questionElements[currentQuestionIndex];
      firstMissing?.setAttribute("data-incomplete", "true");
      status.textContent = "Choose an answer before continuing.";
      firstMissing?.querySelector("input")?.focus();
      return;
    }

    completedAt = new Date().toISOString();
    saveSession();
    renderResults(outcome, { focus: true, announce: true });
  });

  restartButton.addEventListener("click", () => {
    resetAssessment({ confirmRestart: true });
  });

  retakeButton.addEventListener("click", () => {
    resetAssessment();
  });

  const savedSession = readStoredSession(storage, storageKey);
  const canRestore =
    savedSession &&
    savedSession.sessionVersion === SESSION_VERSION &&
    savedSession.assessmentVersion === assessmentVersion &&
    savedSession.answers &&
    typeof savedSession.answers === "object";

  if (canRestore) {
    restoreAnswers(form, assessment, savedSession.answers);
    startedAt = typeof savedSession.startedAt === "string" ? savedSession.startedAt : startedAt;
    currentQuestionIndex = Number.isInteger(savedSession.currentQuestionIndex)
      ? Math.min(Math.max(savedSession.currentQuestionIndex, 0), questionElements.length - 1)
      : 0;
    completedAt = typeof savedSession.completedAt === "string" ? savedSession.completedAt : null;

    const restoredOutcome = scoreCareerAssessment(assessment, collectAnswers(form, assessment), {
      resultCount: 2,
    });

    if (completedAt && restoredOutcome.complete) {
      renderResults(restoredOutcome);
      return;
    }

    if (!restoredOutcome.complete) {
      completedAt = null;
    }
  } else if (savedSession) {
    removeStoredSession(storage, storageKey);
  }

  renderQuestion();
}

for (const root of document.querySelectorAll("[data-career-assessment]")) {
  initializeCareerAssessment(root);
}
