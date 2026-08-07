const PREFORMATTED_VARIANTS = new Set([
  "command_output",
  "configuration",
  "log",
  "plain_text",
]);

function isNonEmptyText(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function hasOnlyKeys(value, allowedKeys) {
  return Object.keys(value).every((key) => allowedKeys.has(key));
}

export function isValidQuestionStimulus(stimulus) {
  if (stimulus == null) {
    return true;
  }

  if (!stimulus || typeof stimulus !== "object" || Array.isArray(stimulus)) {
    return false;
  }

  if (!isNonEmptyText(stimulus.title, 160)) {
    return false;
  }

  if (stimulus.type === "preformatted") {
    if (!hasOnlyKeys(stimulus, new Set(["type", "variant", "title", "content"]))) {
      return false;
    }

    return (
      PREFORMATTED_VARIANTS.has(stimulus.variant) &&
      isNonEmptyText(stimulus.content, 12000)
    );
  }

  if (stimulus.type === "table") {
    if (!hasOnlyKeys(stimulus, new Set(["type", "title", "caption", "columns", "rows"]))) {
      return false;
    }

    if (stimulus.caption != null && !isNonEmptyText(stimulus.caption, 320)) {
      return false;
    }

    if (!Array.isArray(stimulus.columns) || stimulus.columns.length < 1 || stimulus.columns.length > 10) {
      return false;
    }

    const columnKeys = [];
    for (const column of stimulus.columns) {
      if (!column || typeof column !== "object" || Array.isArray(column)) {
        return false;
      }
      if (!hasOnlyKeys(column, new Set(["key", "label"]))) {
        return false;
      }
      if (typeof column.key !== "string" || !/^[a-z][a-z0-9_]*$/.test(column.key)) {
        return false;
      }
      if (!isNonEmptyText(column.label, 120)) {
        return false;
      }
      columnKeys.push(column.key);
    }

    if (new Set(columnKeys).size !== columnKeys.length) {
      return false;
    }

    if (!Array.isArray(stimulus.rows) || stimulus.rows.length < 1 || stimulus.rows.length > 50) {
      return false;
    }

    const expectedKeys = [...columnKeys].sort();
    return stimulus.rows.every((row) => {
      if (!row || typeof row !== "object" || Array.isArray(row)) {
        return false;
      }
      const rowKeys = Object.keys(row).sort();
      if (rowKeys.length !== expectedKeys.length || rowKeys.some((key, index) => key !== expectedKeys[index])) {
        return false;
      }
      return columnKeys.every((key) => typeof row[key] === "string" && row[key].length <= 500);
    });
  }

  return false;
}

function headingTag(level) {
  const normalized = Number.isInteger(level) ? Math.min(6, Math.max(2, level)) : 3;
  return `h${normalized}`;
}

function safeId(value) {
  return String(value || "question-stimulus")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "question-stimulus";
}

export function getQuestionStimulusTablePresentation(stimulus) {
  if (!stimulus || stimulus.type !== "table" || !isValidQuestionStimulus(stimulus)) {
    return null;
  }

  const columnCount = stimulus.columns.length;
  const rowCount = stimulus.rows.length;
  const maxCellLength = Math.max(
    ...stimulus.rows.flatMap((row) => stimulus.columns.map((column) => row[column.key].length)),
    0,
  );

  // Structured data should reflow into row cards on a phone whenever the
  // resulting cards remain practical. Very dense datasets retain horizontal
  // scrolling so the renderer does not turn a large matrix into dozens of
  // oversized cards. Logs, configurations, and command output are separate
  // preformatted stimulus types and never enter this table heuristic.
  const denseMatrix = columnCount >= 7
    || (columnCount >= 5 && (rowCount >= 8 || maxCellLength > 240));
  return denseMatrix ? "scroll" : "cards";
}

export function renderQuestionStimulus(container, stimulus, {
  headingLevel = 3,
  idPrefix = "question-stimulus",
} = {}) {
  if (!container || typeof container.replaceChildren !== "function") {
    throw new TypeError("A stimulus container element is required.");
  }

  container.replaceChildren();
  container.hidden = true;
  container.removeAttribute("data-stimulus-type");

  if (stimulus == null) {
    return;
  }

  if (!isValidQuestionStimulus(stimulus)) {
    throw new Error("The question stimulus does not match the runtime contract.");
  }

  const documentRef = container.ownerDocument || document;
  const section = documentRef.createElement("section");
  const heading = documentRef.createElement(headingTag(headingLevel));
  const headingId = `${safeId(idPrefix)}-title`;

  section.className = "quiz-stimulus";
  section.setAttribute("aria-labelledby", headingId);
  heading.className = "quiz-stimulus__title";
  heading.id = headingId;
  heading.textContent = stimulus.title;
  section.append(heading);

  if (stimulus.type === "preformatted") {
    const pre = documentRef.createElement("pre");
    const code = documentRef.createElement("code");

    pre.className = `quiz-stimulus__pre quiz-stimulus__pre--${stimulus.variant}`;
    pre.tabIndex = 0;
    pre.setAttribute("aria-label", stimulus.title);
    code.textContent = stimulus.content;
    pre.append(code);
    section.append(pre);
  } else {
    const scroller = documentRef.createElement("div");
    const table = documentRef.createElement("table");
    const head = documentRef.createElement("thead");
    const headRow = documentRef.createElement("tr");
    const body = documentRef.createElement("tbody");
    const mobilePresentation = getQuestionStimulusTablePresentation(stimulus);

    scroller.className = "quiz-stimulus__table-scroll";
    scroller.tabIndex = 0;
    scroller.setAttribute("role", "region");
    scroller.setAttribute("aria-label", `${stimulus.title} table`);
    table.className = `quiz-stimulus__table quiz-stimulus__table--mobile-${mobilePresentation}`;
    scroller.dataset.mobilePresentation = mobilePresentation;

    if (stimulus.caption) {
      const caption = documentRef.createElement("caption");
      caption.textContent = stimulus.caption;
      table.append(caption);
    }

    stimulus.columns.forEach((column) => {
      const cell = documentRef.createElement("th");
      cell.scope = "col";
      cell.textContent = column.label;
      headRow.append(cell);
    });
    head.append(headRow);

    stimulus.rows.forEach((row) => {
      const tableRow = documentRef.createElement("tr");
      stimulus.columns.forEach((column) => {
        const cell = documentRef.createElement("td");
        cell.textContent = row[column.key];
        cell.dataset.label = column.label;
        tableRow.append(cell);
      });
      body.append(tableRow);
    });

    table.append(head, body);
    scroller.append(table);
    section.append(scroller);
  }

  container.dataset.stimulusType = stimulus.type;
  container.append(section);
  container.hidden = false;
}
