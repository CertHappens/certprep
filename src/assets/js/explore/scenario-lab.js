import { buildScenarioSummary, validateScenarioLab } from "./scenario-lab-core.js";

const SESSION_VERSION = 1;

function parseLabData(root) {
  const source = root.querySelector("[data-scenario-lab-data]");
  if (!source) throw new Error("Scenario lab data is missing.");
  return validateScenarioLab(JSON.parse(source.textContent));
}

function buildLabVersion(lab) {
  return JSON.stringify({
    sizes: lab.sizes.map((size) => size.id),
    hats: lab.hats.map((hat) => hat.id),
    scenarios: lab.scenarios.map((scenario) => ({
      id: scenario.id,
      options: scenario.options.map((option) => option.id),
      hats: scenario.reveal.hats,
    })),
  });
}

function createStorageKey(root) {
  const labId = root.id || "scenario-lab";
  const pagePath = window.location.pathname.replace(/^\/|\/$/g, "").replaceAll("/", ".") || "home";
  return `certprep.explore.${pagePath}.${labId}.session.v${SESSION_VERSION}`;
}

function readSession(storage, key) {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.warn("Scenario progress could not be read.", error);
    return null;
  }
}

function writeSession(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Scenario progress could not be saved.", error);
  }
}

function clearSession(storage, key) {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.warn("Scenario progress could not be cleared.", error);
  }
}

function initializeScenarioLab(root) {
  let lab;
  try {
    lab = parseLabData(root);
  } catch (error) {
    console.error(error);
    return;
  }

  const panel = root.querySelector("[data-scenario-panel]");
  const counter = root.querySelector("[data-scenario-counter]");
  const heading = root.querySelector("[data-scenario-heading]");
  const prompt = root.querySelector("[data-scenario-prompt]");
  const options = root.querySelector("[data-scenario-options]");
  const jumpButtons = [...root.querySelectorAll("[data-scenario-jump]")];
  const sizeInputs = [...root.querySelectorAll('input[name="scenario-company-size"]')];
  const previousButton = root.querySelector("[data-scenario-previous]");
  const nextButton = root.querySelector("[data-scenario-next]");
  const restartButton = root.querySelector("[data-scenario-restart]");
  const resetButton = root.querySelector("[data-scenario-reset]");
  const status = root.querySelector("[data-scenario-status]");
  const summaryPanel = root.querySelector("[data-scenario-summary-panel]");
  const summaryText = root.querySelector("[data-scenario-summary-text]");
  const summaryHats = root.querySelector("[data-scenario-summary-hats]");

  if (
    !panel ||
    !counter ||
    !heading ||
    !prompt ||
    !options ||
    jumpButtons.length !== lab.scenarios.length ||
    sizeInputs.length !== lab.sizes.length ||
    !previousButton ||
    !nextButton ||
    !restartButton ||
    !resetButton ||
    !status ||
    !summaryPanel ||
    !summaryText ||
    !summaryHats
  ) {
    return;
  }

  const storage = window.sessionStorage;
  const storageKey = createStorageKey(root);
  const labVersion = buildLabVersion(lab);
  let currentIndex = 0;
  let sizeId = lab.sizes[0].id;
  let answers = {};
  let startedAt = new Date().toISOString();
  let completedAt = null;

  const save = () => {
    writeSession(storage, storageKey, {
      sessionVersion: SESSION_VERSION,
      labVersion,
      currentIndex,
      sizeId,
      answers,
      startedAt,
      completedAt,
      updatedAt: new Date().toISOString(),
    });
  };

  const currentScenario = () => lab.scenarios[currentIndex];

  const makeOption = (scenario, option, selectedId) => {
    const label = document.createElement("label");
    label.className = "scenario-lab__option";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "scenario-current-response";
    input.value = option.id;
    input.checked = option.id === selectedId;
    input.dataset.scenarioId = scenario.id;

    const text = document.createElement("span");
    text.textContent = option.label;

    label.append(input, text);
    return label;
  };

  const renderReveal = (scenario) => {
    const selectedId = answers[scenario.id];
    const reveal = panel.querySelector("[data-scenario-reveal]");
    if (!reveal) return;

    const option = scenario.options.find((candidate) => candidate.id === selectedId);
    if (!option) {
      reveal.hidden = true;
      return;
    }

    const size = lab.sizes.find((candidate) => candidate.id === sizeId);
    const hatLookup = new Map(lab.hats.map((hat) => [hat.id, hat]));
    const feedback = reveal.querySelector("[data-scenario-feedback]");
    feedback.dataset.tone = option.tone;
    reveal.querySelector("[data-scenario-feedback-title]").textContent = option.feedbackTitle;
    reveal.querySelector("[data-scenario-feedback-text]").textContent = option.feedback;
    reveal.querySelector("[data-scenario-happened]").textContent = scenario.reveal.happened;
    reveal.querySelector("[data-scenario-ownership-heading]").textContent = `Who may own the response at a ${size.label.toLowerCase()}`;
    reveal.querySelector("[data-scenario-ownership]").textContent = scenario.reveal.ownership[sizeId];
    reveal.querySelector("[data-scenario-lesson]").textContent = scenario.reveal.lesson;

    const hats = reveal.querySelector("[data-scenario-hats]");
    hats.replaceChildren(
      ...scenario.reveal.hats.map((hatId) => {
        const item = document.createElement("li");
        item.textContent = hatLookup.get(hatId)?.label || hatId;
        return item;
      })
    );
    reveal.hidden = false;
  };

  const renderSummary = ({ focus = false } = {}) => {
    const summary = buildScenarioSummary(lab, answers);
    if (!summary.complete) {
      summaryPanel.hidden = true;
      return;
    }

    summaryText.textContent = `Across six situations, the work touched ${summary.workAreas.length} different areas. The breadth is common in smaller organizations, even when the job title sounds narrow.`;
    summaryHats.replaceChildren(
      ...summary.workAreas.map((hat) => {
        const item = document.createElement("li");
        item.textContent = hat.label;
        return item;
      })
    );
    summaryPanel.hidden = false;
    if (focus) summaryPanel.focus();
  };

  const updateNavigator = () => {
    jumpButtons.forEach((button, index) => {
      const scenario = lab.scenarios[index];
      const answered = Boolean(answers[scenario.id]);
      const current = index === currentIndex;
      button.classList.toggle("is-answered", answered);
      button.classList.toggle("is-current", current);
      button.setAttribute(
        "aria-label",
        `Go to scenario ${index + 1}${answered ? ", completed" : ", not completed"}${current ? ", current scenario" : ""}`
      );
      if (current) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  };

  const render = ({ focus = false, persist = false } = {}) => {
    const scenario = currentScenario();
    const selectedId = answers[scenario.id];

    panel.dataset.scenarioId = scenario.id;
    counter.textContent = `Scenario ${currentIndex + 1} of ${lab.scenarios.length}`;
    heading.textContent = scenario.title;
    prompt.textContent = scenario.prompt;
    options.replaceChildren(
      ...scenario.options.map((option) => makeOption(scenario, option, selectedId))
    );
    renderReveal(scenario);

    sizeInputs.forEach((input) => {
      input.checked = input.value === sizeId;
    });

    updateNavigator();
    const summary = buildScenarioSummary(lab, answers);
    const complete = summary.complete;
    root.classList.toggle("is-complete", complete);
    previousButton.hidden = complete || currentIndex === 0;
    nextButton.hidden = complete || currentIndex === lab.scenarios.length - 1;
    restartButton.hidden = complete;
    status.textContent = "";
    renderSummary();

    if (persist) save();
    if (focus) options.querySelector('input:checked, input[type="radio"]')?.focus();
  };

  const moveTo = (index, { focus = true } = {}) => {
    currentIndex = Math.max(0, Math.min(index, lab.scenarios.length - 1));
    render({ focus, persist: true });
  };

  const requireCurrentAnswer = () => {
    if (answers[currentScenario().id]) return true;
    status.textContent = "Choose a first response before continuing.";
    options.querySelector('input[type="radio"]')?.focus();
    return false;
  };

  const reset = ({ confirmReset = false } = {}) => {
    if (confirmReset && Object.keys(answers).length > 0) {
      const approved = window.confirm("Restart the scenarios? Your saved choices will be cleared.");
      if (!approved) return;
    }
    currentIndex = 0;
    sizeId = lab.sizes[0].id;
    answers = {};
    startedAt = new Date().toISOString();
    completedAt = null;
    clearSession(storage, storageKey);
    summaryPanel.hidden = true;
    render({ focus: true, persist: true });
  };

  root.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;

    if (input.name === "scenario-company-size") {
      sizeId = input.value;
      render({ persist: true });
      return;
    }

    if (input.name !== "scenario-current-response") return;
    const scenario = currentScenario();
    answers = { ...answers, [scenario.id]: input.value };
    const summary = buildScenarioSummary(lab, answers);
    const justCompleted = summary.complete && !completedAt;
    if (justCompleted) completedAt = new Date().toISOString();
    render({ persist: true });

    if (justCompleted) {
      window.requestAnimationFrame(() => {
        renderSummary({ focus: true });
        summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });

  jumpButtons.forEach((button) => {
    button.addEventListener("click", () => moveTo(Number(button.dataset.scenarioIndex)));
  });
  previousButton.addEventListener("click", () => moveTo(currentIndex - 1));
  nextButton.addEventListener("click", () => {
    if (requireCurrentAnswer()) moveTo(currentIndex + 1);
  });
  restartButton.addEventListener("click", () => reset({ confirmReset: true }));
  resetButton.addEventListener("click", () => reset());

  const stored = readSession(storage, storageKey);
  if (stored?.sessionVersion === SESSION_VERSION && stored.labVersion === labVersion) {
    currentIndex = Number.isInteger(stored.currentIndex) ? stored.currentIndex : 0;
    sizeId = lab.sizes.some((size) => size.id === stored.sizeId) ? stored.sizeId : lab.sizes[0].id;
    const savedAnswers = stored.answers && typeof stored.answers === "object" ? stored.answers : {};
    answers = Object.fromEntries(
      lab.scenarios.flatMap((scenario) => {
        const savedOptionId = savedAnswers[scenario.id];
        return scenario.options.some((option) => option.id === savedOptionId)
          ? [[scenario.id, savedOptionId]]
          : [];
      })
    );
    startedAt = stored.startedAt || startedAt;
    completedAt = stored.completedAt || null;
  }

  render();
}

document.querySelectorAll("[data-scenario-lab]").forEach(initializeScenarioLab);
