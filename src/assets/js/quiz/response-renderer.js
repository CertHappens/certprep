import {
  confirmOrderingResponse,
  getSelectableStimulusLines,
  isValidStructuredResponseState,
  moveOrderingResponseItem,
  setMatchingResponseValue,
  toggleLineResponseSelection,
} from "./structured-response.js";

function safeToken(value) {
  return String(value || "response")
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "response";
}

function focusRenderedControl(container, focusKey) {
  if (!focusKey) return;
  const control = [...container.querySelectorAll("[data-response-focus-key]")]
    .find((element) => element.dataset.responseFocusKey === focusKey);
  control?.focus({ preventScroll: true });
}

function renderMatching(container, state, onChange, idPrefix) {
  const documentRef = container.ownerDocument || document;
  const wrapper = documentRef.createElement("div");
  const optionById = new Map(state.question.response.options.map((option) => [option.id, option]));
  const classification = state.question.response.variant === "classification";
  const usedOptionIds = new Set(Object.values(state.responseState.matches));

  wrapper.className = "quiz-structured-response quiz-matching-response";

  state.question.response.items.forEach((item, index) => {
    const row = documentRef.createElement("div");
    const label = documentRef.createElement("label");
    const itemNumber = documentRef.createElement("span");
    const itemText = documentRef.createElement("span");
    const select = documentRef.createElement("select");
    const placeholder = documentRef.createElement("option");
    const selectId = `${safeToken(idPrefix)}-match-${safeToken(item.id)}`;
    const focusKey = `match:${item.id}`;

    row.className = "quiz-match-row";
    label.className = "quiz-match-row__item";
    label.htmlFor = selectId;
    itemNumber.className = "quiz-match-row__number";
    itemNumber.textContent = String(index + 1);
    itemNumber.setAttribute("aria-hidden", "true");
    itemText.textContent = item.text;
    label.append(itemNumber, itemText);

    select.id = selectId;
    select.className = "quiz-match-row__select";
    select.dataset.responseFocusKey = focusKey;
    placeholder.value = "";
    placeholder.textContent = classification ? "Choose a category" : "Choose a match";
    select.append(placeholder);

    state.responseState.optionOrder.forEach((optionId) => {
      const option = optionById.get(optionId);
      if (!option) return;
      const element = documentRef.createElement("option");
      element.value = option.id;
      element.textContent = option.label;
      if (!classification && usedOptionIds.has(option.id) && state.responseState.matches[item.id] !== option.id) {
        element.disabled = true;
      }
      select.append(element);
    });

    select.value = state.responseState.matches[item.id] || "";
    select.addEventListener("change", () => {
      const nextState = setMatchingResponseValue(state.responseState, item.id, select.value);
      onChange(nextState, {
        focusKey,
        announcement: `Match saved for item ${index + 1}.`,
      });
    });

    row.append(label, select);
    wrapper.append(row);
  });

  container.append(wrapper);
}

function renderOrdering(container, state, onChange, idPrefix) {
  const documentRef = container.ownerDocument || document;
  const wrapper = documentRef.createElement("div");
  const list = documentRef.createElement("ol");
  const itemById = new Map(state.question.response.items.map((item) => [item.id, item]));

  wrapper.className = "quiz-structured-response quiz-ordering-response";
  list.className = "quiz-order-list";

  state.responseState.order.forEach((itemId, index) => {
    const item = itemById.get(itemId);
    if (!item) return;

    const row = documentRef.createElement("li");
    const position = documentRef.createElement("span");
    const text = documentRef.createElement("span");
    const controls = documentRef.createElement("span");
    const up = documentRef.createElement("button");
    const down = documentRef.createElement("button");

    row.className = "quiz-order-item";
    position.className = "quiz-order-item__number";
    position.textContent = String(index + 1);
    position.setAttribute("aria-hidden", "true");
    text.className = "quiz-order-item__text";
    text.textContent = item.text;
    controls.className = "quiz-order-item__controls";

    up.type = "button";
    up.className = "button button--secondary button--small quiz-order-item__move";
    up.textContent = "Move up";
    up.disabled = index === 0;
    up.dataset.responseFocusKey = `order:${itemId}:up`;
    up.setAttribute("aria-label", `Move ${item.text} up`);

    down.type = "button";
    down.className = "button button--secondary button--small quiz-order-item__move";
    down.textContent = "Move down";
    down.disabled = index === state.responseState.order.length - 1;
    down.dataset.responseFocusKey = `order:${itemId}:down`;
    down.setAttribute("aria-label", `Move ${item.text} down`);

    up.addEventListener("click", () => {
      const nextState = moveOrderingResponseItem(state.responseState, itemId, -1);
      onChange(nextState, {
        focusKey: `order:${itemId}:up`,
        announcement: `Moved item ${index + 1} up.`,
      });
    });

    down.addEventListener("click", () => {
      const nextState = moveOrderingResponseItem(state.responseState, itemId, 1);
      onChange(nextState, {
        focusKey: `order:${itemId}:down`,
        announcement: `Moved item ${index + 1} down.`,
      });
    });

    controls.append(up, down);
    row.append(position, text, controls);
    list.append(row);
  });

  const confirm = documentRef.createElement("button");
  const help = documentRef.createElement("p");
  confirm.type = "button";
  confirm.className = "button button--secondary button--small quiz-order-confirm";
  confirm.disabled = state.responseState.touched;
  confirm.textContent = state.responseState.touched ? "Order saved" : "Use this order";
  confirm.dataset.responseFocusKey = "order:confirm";
  confirm.addEventListener("click", () => {
    const nextState = confirmOrderingResponse(state.responseState);
    onChange(nextState, {
      focusKey: "order:confirm",
      announcement: "Order saved.",
    });
  });

  help.className = "quiz-structured-response__help";
  help.textContent = "Use Move up and Move down to arrange the items. If the current order is already correct, choose Use this order.";
  wrapper.append(list, confirm, help);
  container.append(wrapper);
}

function renderLineSelect(container, state, onChange) {
  const documentRef = container.ownerDocument || document;
  const wrapper = documentRef.createElement("div");
  const title = documentRef.createElement("h3");
  const list = documentRef.createElement("div");
  const lines = getSelectableStimulusLines(state.question);
  const selectionCount = state.question.response.selectionCount;
  const selected = new Set(state.responseState.selectedLineNumbers);
  const atLimit = selected.size >= selectionCount;

  wrapper.className = "quiz-structured-response quiz-line-response";
  title.className = "quiz-stimulus__title";
  title.textContent = state.question.stimulus.title;
  list.className = "quiz-line-list";
  list.setAttribute("role", "group");
  list.setAttribute(
    "aria-label",
    `Select exactly ${selectionCount} evidence line${selectionCount === 1 ? "" : "s"}`,
  );

  lines.forEach((line) => {
    const row = documentRef.createElement(line.text.trim() ? "label" : "div");
    const number = documentRef.createElement("span");
    const code = documentRef.createElement("code");

    row.className = "quiz-line-row";
    row.classList.toggle("quiz-line-row--blank", !line.text.trim());
    number.className = "quiz-line-row__number";
    number.textContent = String(line.number);
    number.setAttribute("aria-hidden", "true");
    code.className = "quiz-line-row__code";
    code.textContent = line.text || " ";

    if (line.text.trim()) {
      const input = documentRef.createElement("input");
      const checked = selected.has(line.number);
      input.type = "checkbox";
      input.className = "quiz-line-row__input";
      input.checked = checked;
      input.disabled = !checked && atLimit;
      input.value = String(line.number);
      input.dataset.responseFocusKey = `line:${line.number}`;
      input.setAttribute("aria-label", `Select line ${line.number}: ${line.text.trim()}`);
      row.classList.toggle("is-selected", checked);

      input.addEventListener("change", () => {
        try {
          const nextState = toggleLineResponseSelection(
            state.responseState,
            line.number,
            input.checked,
            selectionCount,
          );
          onChange(nextState, {
            focusKey: `line:${line.number}`,
            announcement: `${nextState.selectedLineNumbers.length} of ${selectionCount} required lines selected.`,
          });
        } catch (error) {
          input.checked = selected.has(line.number);
          onChange(state.responseState, {
            focusKey: `line:${line.number}`,
            announcement: error.message,
            persist: false,
          });
        }
      });

      row.append(input, number, code);
    } else {
      row.append(number, code);
    }

    list.append(row);
  });

  const help = documentRef.createElement("p");
  help.className = "quiz-structured-response__help";
  help.textContent = `Select exactly ${selectionCount} line${selectionCount === 1 ? "" : "s"}.`;
  wrapper.append(title, list, help);
  container.append(wrapper);
}

export function renderStructuredQuestionResponse(container, state, {
  onChange,
  idPrefix = "structured-response",
  focusKey = null,
} = {}) {
  if (!container || typeof container.replaceChildren !== "function") {
    throw new TypeError("A response container element is required.");
  }
  if (!isValidStructuredResponseState(state?.question, state?.responseState)) {
    throw new TypeError("A valid structured question state is required.");
  }
  if (typeof onChange !== "function") {
    throw new TypeError("A structured response change handler is required.");
  }

  container.replaceChildren();

  if (state.question.type === "matching") {
    renderMatching(container, state, onChange, idPrefix);
  } else if (state.question.type === "ordering") {
    renderOrdering(container, state, onChange, idPrefix);
  } else {
    renderLineSelect(container, state, onChange);
  }

  focusRenderedControl(container, focusKey);
}
