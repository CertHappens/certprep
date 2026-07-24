const searchInput = document.querySelector("[data-acronym-search]");
const clearButton = document.querySelector("[data-acronym-clear]");
const status = document.querySelector("[data-acronym-status]");
const emptyMessage = document.querySelector("[data-acronym-empty]");
const reference = document.querySelector("[data-acronym-reference]");

if (searchInput && clearButton && status && emptyMessage && reference) {
  const entries = Array.from(reference.querySelectorAll("[data-acronym-entry]"));
  const groups = Array.from(reference.querySelectorAll("[data-acronym-group]"));
  const total = entries.length;
  let queryBeforePrint = "";

  const normalize = (value) =>
    String(value ?? "")
      .toLocaleLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9+]+/g, " ")
      .trim();

  const applyFilter = (value, { announce = true } = {}) => {
    const query = normalize(value);
    const queryTerms = query.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    for (const entry of entries) {
      const searchText = normalize(entry.dataset.searchText);
      const matches = queryTerms.length === 0 || queryTerms.every((term) => searchText.includes(term));
      entry.hidden = !matches;
      if (matches) visibleCount += 1;
    }

    for (const group of groups) {
      const hasVisibleEntry = Boolean(
        group.querySelector("[data-acronym-entry]:not([hidden])")
      );
      group.hidden = !hasVisibleEntry;
    }

    clearButton.hidden = !query;
    emptyMessage.hidden = visibleCount !== 0;

    if (announce) {
      status.textContent = query
        ? `${visibleCount} ${visibleCount === 1 ? "entry" : "entries"} match “${value.trim()}”.`
        : `Showing all ${total} entries.`;
    }
  };

  searchInput.addEventListener("input", () => applyFilter(searchInput.value));

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      searchInput.value = "";
      applyFilter("");
    }
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    applyFilter("");
    searchInput.focus();
  });

  window.addEventListener("beforeprint", () => {
    queryBeforePrint = searchInput.value;
    applyFilter("", { announce: false });
  });

  window.addEventListener("afterprint", () => {
    searchInput.value = queryBeforePrint;
    applyFilter(queryBeforePrint, { announce: false });
  });

  applyFilter("");
}
