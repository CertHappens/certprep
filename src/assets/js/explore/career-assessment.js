import { scoreCareerAssessment, validateCareerAssessment } from "./career-assessment-core.js";

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
  const resetButton = root.querySelector("[data-career-assessment-reset]");
  const previousButton = root.querySelector("[data-career-assessment-previous]");
  const nextButton = root.querySelector("[data-career-assessment-next]");
  const submitButton = root.querySelector("[data-career-assessment-submit]");
  const questionElements = [...root.querySelectorAll("[data-assessment-question]")];

  if (
    !form ||
    !status ||
    !results ||
    !resultCards ||
    !resetButton ||
    !previousButton ||
    !nextButton ||
    !submitButton ||
    questionElements.length === 0
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

  let currentQuestionIndex = 0;
  root.dataset.enhanced = "true";

  const focusCurrentQuestion = () => {
    const current = questionElements[currentQuestionIndex];
    current?.querySelector("input:checked, input")?.focus();
  };

  const renderQuestion = ({ focus = false } = {}) => {
    questionElements.forEach((question, index) => {
      question.hidden = index !== currentQuestionIndex;
      question.removeAttribute("data-incomplete");
    });

    previousButton.hidden = currentQuestionIndex === 0;
    nextButton.hidden = currentQuestionIndex === questionElements.length - 1;
    submitButton.hidden = currentQuestionIndex !== questionElements.length - 1;
    status.textContent = "";

    if (focus) {
      focusCurrentQuestion();
    }
  };

  const currentQuestionIsAnswered = () => {
    const question = assessment.questions[currentQuestionIndex];
    return Boolean(
      form.querySelector(`input[name="${CSS.escape(question.id)}"]:checked`)
    );
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
    renderQuestion({ focus: true });
  });

  previousButton.addEventListener("click", () => {
    currentQuestionIndex = Math.max(0, currentQuestionIndex - 1);
    renderQuestion({ focus: true });
  });

  form.addEventListener("change", (event) => {
    if (event.target.matches('input[type="radio"]')) {
      questionElements[currentQuestionIndex]?.removeAttribute("data-incomplete");
      status.textContent = "";
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
      renderQuestion();
      const firstMissing = questionElements[currentQuestionIndex];
      firstMissing?.setAttribute("data-incomplete", "true");
      status.textContent = "Choose an answer before continuing.";
      firstMissing?.querySelector("input")?.focus();
      return;
    }

    resultCards.replaceChildren(
      ...outcome.topMatches.map((match, index) => createResultCard(match, index + 1))
    );
    status.textContent = "Assessment complete. Your two strongest matches are shown below.";
    form.hidden = true;
    results.hidden = false;
    results.focus();
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    resultCards.replaceChildren();
    results.hidden = true;
    form.hidden = false;
    currentQuestionIndex = 0;
    renderQuestion();
    focusCurrentQuestion();
  });

  renderQuestion();
}

for (const root of document.querySelectorAll("[data-career-assessment]")) {
  initializeCareerAssessment(root);
}
