import { rankSearchResults } from "./search-core.js";

const form = document.querySelector("[data-site-search-form]");
const input = document.querySelector("[data-site-search-input]");
const clearButton = document.querySelector("[data-site-search-clear]");
const status = document.querySelector("[data-site-search-status]");
const resultsList = document.querySelector("[data-site-search-results]");
const emptyState = document.querySelector("[data-site-search-empty]");
const guidance = document.querySelector("[data-site-search-guidance]");

if (form && input && clearButton && status && resultsList && emptyState && guidance) {
  let pages = null;
  let loadingPromise = null;

  function loadIndex() {
    if (!loadingPromise) {
      loadingPromise = fetch("/search-index.json", { cache: "no-cache" })
        .then((response) => {
          if (!response.ok) throw new Error(`Search index request failed (${response.status}).`);
          return response.json();
        })
        .then((index) => {
          pages = Array.isArray(index.pages) ? index.pages : [];
          return pages;
        });
    }
    return loadingPromise;
  }

  function resultCard(result) {
    const item = document.createElement("li");
    item.className = "search-results__item";

    const heading = document.createElement("h2");
    heading.className = "search-results__title";
    const link = document.createElement("a");
    link.href = result.matchedHeadingId
      ? `${result.url}#${encodeURIComponent(result.matchedHeadingId)}`
      : result.url;
    link.textContent = result.title;
    heading.append(link);

    const metadata = document.createElement("p");
    metadata.className = "search-results__metadata";
    metadata.textContent = `${result.section} · ${result.type}`;

    item.append(heading, metadata);

    if (result.matchedHeading && result.matchedHeading !== result.title) {
      const section = document.createElement("p");
      section.className = "search-results__section";
      section.textContent = `Matched section: ${result.matchedHeading}`;
      item.append(section);
    }

    if (result.excerpt) {
      const excerpt = document.createElement("p");
      excerpt.className = "search-results__excerpt";
      excerpt.textContent = result.excerpt;
      item.append(excerpt);
    }

    return item;
  }

  function updateUrl(query, { replace = false } = {}) {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    const method = replace ? "replaceState" : "pushState";
    window.history[method]({}, "", `${url.pathname}${url.search}`);
  }

  async function runSearch(query, options = {}) {
    const cleanQuery = String(query ?? "").trim();
    input.value = cleanQuery;
    clearButton.hidden = !cleanQuery;
    resultsList.replaceChildren();

    if (!cleanQuery) {
      guidance.hidden = false;
      emptyState.hidden = true;
      status.textContent = "Enter a term or phrase to search CertHappens.";
      if (options.updateUrl) updateUrl("", options);
      return;
    }

    guidance.hidden = true;
    emptyState.hidden = true;
    status.textContent = "Searching…";
    if (options.updateUrl) updateUrl(cleanQuery, options);

    try {
      const indexPages = await loadIndex();
      const results = rankSearchResults(indexPages, cleanQuery);
      for (const result of results) resultsList.append(resultCard(result));

      const countLabel = `${results.length} ${results.length === 1 ? "result" : "results"}`;
      status.textContent = `${countLabel} for “${cleanQuery}”.`;
      emptyState.hidden = results.length !== 0;
    } catch (error) {
      console.error(error);
      status.textContent = "Search is temporarily unavailable.";
      emptyState.hidden = false;
      emptyState.textContent = "The search index could not be loaded. Please try again after refreshing the page.";
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch(input.value, { updateUrl: true });
  });

  clearButton.addEventListener("click", () => {
    runSearch("", { updateUrl: true });
    input.focus();
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && input.value) {
      event.preventDefault();
      clearButton.click();
    }
  });

  window.addEventListener("popstate", () => {
    runSearch(new URLSearchParams(window.location.search).get("q") ?? "");
  });

  const initialQuery = new URLSearchParams(window.location.search).get("q") ?? "";
  runSearch(initialQuery, { updateUrl: false });
}
