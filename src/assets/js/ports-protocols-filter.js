const controls = document.querySelector("[data-port-controls]");
const reference = document.querySelector("[data-port-reference]");

if (controls && reference) {
  const input = controls.querySelector("[data-port-search]");
  const clearButton = controls.querySelector("[data-port-clear]");
  const status = controls.querySelector("[data-port-status]");
  const emptyState = document.querySelector("[data-port-empty]");
  const rows = Array.from(reference.querySelectorAll("[data-port-entry]"));
  const groups = Array.from(reference.querySelectorAll("[data-port-group]"));
  const total = Number(reference.dataset.totalEntries || rows.length);

  const normalize = (value) =>
    String(value || "")
      .toLocaleLowerCase()
      .replace(/\s+/g, " ")
      .trim();

  const showAllForPrint = () => {
    groups.forEach((group) => {
      group.hidden = false;
    });
    rows.forEach((row) => {
      row.hidden = false;
    });
    if (emptyState) {
      emptyState.hidden = true;
    }
  };

  const applyFilter = () => {
    const query = normalize(input?.value);
    const terms = query ? query.split(" ") : [];
    let visibleCount = 0;

    rows.forEach((row) => {
      const searchText = normalize(row.dataset.searchText);
      const matches = terms.every((term) => searchText.includes(term));
      row.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    groups.forEach((group) => {
      group.hidden = !group.querySelector("[data-port-entry]:not([hidden])");
    });

    if (clearButton) {
      clearButton.hidden = !query;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (status) {
      if (!query) {
        status.textContent = `Showing all ${total} entries.`;
      } else if (visibleCount === 1) {
        status.textContent = `Showing 1 matching entry for “${input.value.trim()}”.`;
      } else {
        status.textContent = `Showing ${visibleCount} matching entries for “${input.value.trim()}”.`;
      }
    }
  };

  input?.addEventListener("input", applyFilter);

  clearButton?.addEventListener("click", () => {
    input.value = "";
    applyFilter();
    input.focus();
  });

  window.addEventListener("beforeprint", showAllForPrint);
  window.addEventListener("afterprint", applyFilter);

  applyFilter();
}
