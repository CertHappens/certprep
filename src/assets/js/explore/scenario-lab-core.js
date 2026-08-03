function requireArray(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new TypeError(`${label} must be a non-empty array.`);
  }
  return value;
}

function requireIdentifier(value, label) {
  const identifier = String(value ?? "").trim();
  if (!/^[a-z][a-z0-9-]*$/.test(identifier)) {
    throw new TypeError(`${label} must be a stable lowercase identifier.`);
  }
  return identifier;
}

function requireText(value, label) {
  const text = String(value ?? "").trim();
  if (!text) {
    throw new TypeError(`${label} is required.`);
  }
  return text;
}

export function validateScenarioLab(lab) {
  if (!lab || typeof lab !== "object" || Array.isArray(lab)) {
    throw new TypeError("Scenario lab data is required.");
  }

  requireText(lab.title, "Scenario lab title");
  const sizes = requireArray(lab.sizes, "Scenario lab sizes");
  const hats = requireArray(lab.hats, "Scenario lab work areas");
  const scenarios = requireArray(lab.scenarios, "Scenario lab scenarios");

  const sizeIds = new Set();
  for (const size of sizes) {
    const sizeId = requireIdentifier(size.id, "Organization size ID");
    if (sizeIds.has(sizeId)) {
      throw new Error(`Duplicate organization size ID: ${sizeId}`);
    }
    sizeIds.add(sizeId);
    requireText(size.label, `Organization size ${sizeId} label`);
    requireText(size.description, `Organization size ${sizeId} description`);
  }

  const hatIds = new Set();
  for (const hat of hats) {
    const hatId = requireIdentifier(hat.id, "Work area ID");
    if (hatIds.has(hatId)) {
      throw new Error(`Duplicate work area ID: ${hatId}`);
    }
    hatIds.add(hatId);
    requireText(hat.label, `Work area ${hatId} label`);
  }

  const scenarioIds = new Set();
  for (const scenario of scenarios) {
    const scenarioId = requireIdentifier(scenario.id, "Scenario ID");
    if (scenarioIds.has(scenarioId)) {
      throw new Error(`Duplicate scenario ID: ${scenarioId}`);
    }
    scenarioIds.add(scenarioId);
    requireText(scenario.title, `Scenario ${scenarioId} title`);
    requireText(scenario.prompt, `Scenario ${scenarioId} prompt`);

    const options = requireArray(scenario.options, `Options for ${scenarioId}`);
    const optionIds = new Set();
    let strongOptionCount = 0;

    for (const option of options) {
      const optionId = requireIdentifier(option.id, `Option ID for ${scenarioId}`);
      if (optionIds.has(optionId)) {
        throw new Error(`Duplicate option ID ${optionId} for ${scenarioId}.`);
      }
      optionIds.add(optionId);
      requireText(option.label, `Option ${optionId} label`);
      requireText(option.feedbackTitle, `Option ${optionId} feedback title`);
      requireText(option.feedback, `Option ${optionId} feedback`);
      if (!new Set(["strong", "workable", "weak"]).has(option.tone)) {
        throw new Error(`Option ${optionId} for ${scenarioId} has an invalid tone.`);
      }
      if (option.tone === "strong") {
        strongOptionCount += 1;
      }
    }

    if (strongOptionCount !== 1) {
      throw new Error(`Scenario ${scenarioId} must have exactly one strong first move.`);
    }

    requireText(scenario.reveal?.happened, `Scenario ${scenarioId} outcome`);
    requireText(scenario.reveal?.lesson, `Scenario ${scenarioId} lesson`);

    for (const sizeId of sizeIds) {
      requireText(
        scenario.reveal?.ownership?.[sizeId],
        `Scenario ${scenarioId} ownership for ${sizeId}`
      );
    }

    const scenarioHatIds = requireArray(scenario.reveal?.hats, `Work areas for ${scenarioId}`);
    for (const hatId of scenarioHatIds) {
      if (!hatIds.has(hatId)) {
        throw new Error(`Scenario ${scenarioId} references unknown work area ${hatId}.`);
      }
    }
  }

  return lab;
}

export function buildScenarioSummary(lab, answers = {}) {
  validateScenarioLab(lab);

  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    throw new TypeError("Scenario answers must be an object keyed by scenario ID.");
  }

  const touchedHatIds = new Set();
  const completedScenarioIds = [];

  for (const scenario of lab.scenarios) {
    const selectedOptionId = String(answers[scenario.id] ?? "").trim();
    if (!selectedOptionId) {
      continue;
    }

    if (!scenario.options.some((option) => option.id === selectedOptionId)) {
      throw new Error(`Unknown answer ${selectedOptionId} for scenario ${scenario.id}.`);
    }

    completedScenarioIds.push(scenario.id);
    scenario.reveal.hats.forEach((hatId) => touchedHatIds.add(hatId));
  }

  return {
    complete: completedScenarioIds.length === lab.scenarios.length,
    completedCount: completedScenarioIds.length,
    totalCount: lab.scenarios.length,
    completedScenarioIds,
    workAreas: lab.hats.filter((hat) => touchedHatIds.has(hat.id)),
  };
}
