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

  if (!form || !status || !results || !resultCards || !resetButton) {
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

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const outcome = scoreCareerAssessment(assessment, collectAnswers(form, assessment), {
      resultCount: 2,
    });

    root.querySelectorAll("[data-assessment-question]").forEach((question) => {
      question.removeAttribute("data-incomplete");
    });

    if (!outcome.complete) {
      const firstMissingId = outcome.missingQuestionIds[0];
      const firstMissing = root.querySelector(`[data-question-id="${CSS.escape(firstMissingId)}"]`);

      for (const questionId of outcome.missingQuestionIds) {
        root
          .querySelector(`[data-question-id="${CSS.escape(questionId)}"]`)
          ?.setAttribute("data-incomplete", "true");
      }

      status.textContent = `Answer ${outcome.missingQuestionIds.length === 1 ? "the remaining question" : `the remaining ${outcome.missingQuestionIds.length} questions`} to see your results.`;
      firstMissing?.querySelector("input")?.focus();
      return;
    }

    resultCards.replaceChildren(
      ...outcome.topMatches.map((match, index) => createResultCard(match, index + 1))
    );
    status.textContent = "Assessment complete. Your two strongest matches are shown below.";
    results.hidden = false;
    results.focus();
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    resultCards.replaceChildren();
    results.hidden = true;
    status.textContent = "";
    root.querySelectorAll("[data-assessment-question]").forEach((question) => {
      question.removeAttribute("data-incomplete");
    });
    form.querySelector("input")?.focus();
  });
}

for (const root of document.querySelectorAll("[data-career-assessment]")) {
  initializeCareerAssessment(root);
}
