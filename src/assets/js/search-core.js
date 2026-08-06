export function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SEARCH_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "does",
  "for",
  "from",
  "how",
  "in",
  "is",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "with"
]);

export function tokenizeSearchQuery(query) {
  const tokens = [...new Set(normalizeSearchText(query).split(" ").filter(Boolean))];
  if (tokens.length <= 1) return tokens;
  const meaningful = tokens.filter((token) => !SEARCH_STOP_WORDS.has(token));
  return meaningful.length > 0 ? meaningful : tokens;
}

function phraseIsPresent(haystack, needle) {
  if (!needle) return false;
  return (` ${haystack} `).includes(` ${needle} `);
}

function tokenCount(value, token) {
  return normalizeSearchText(value)
    .split(" ")
    .filter((candidate) => candidate === token).length;
}

function scoreField(value, phrase, terms, weights) {
  const normalized = normalizeSearchText(value);
  let score = normalized === phrase ? weights.exact : 0;
  if (phraseIsPresent(normalized, phrase)) score += weights.phrase;
  for (const term of terms) {
    score += Math.min(tokenCount(normalized, term), weights.cap) * weights.term;
  }
  return score;
}

export function buildSearchExcerpt(text, query, maximumLength = 230) {
  const source = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!source) return "";

  const normalizedSource = normalizeSearchText(source);
  const phrase = normalizeSearchText(query);
  const terms = tokenizeSearchQuery(query);
  let position = phrase ? normalizedSource.indexOf(phrase) : -1;
  if (position < 0) {
    position = terms.reduce((best, term) => {
      const next = normalizedSource.indexOf(term);
      return next >= 0 && (best < 0 || next < best) ? next : best;
    }, -1);
  }

  if (position < 0 || source.length <= maximumLength) {
    return source.length <= maximumLength
      ? source
      : `${source.slice(0, maximumLength - 1).trimEnd()}…`;
  }

  const start = Math.max(0, position - Math.floor(maximumLength * 0.32));
  const end = Math.min(source.length, start + maximumLength);
  const excerpt = source.slice(start, end).trim();
  return `${start > 0 ? "…" : ""}${excerpt}${end < source.length ? "…" : ""}`;
}

export function rankSearchResults(pages, query, limit = 30) {
  const phrase = normalizeSearchText(query);
  const terms = tokenizeSearchQuery(query);
  if (!phrase || terms.length === 0) return [];

  const results = [];
  for (const page of pages ?? []) {
    const title = normalizeSearchText(page.title);
    const description = normalizeSearchText(page.description);
    const headings = (page.headings ?? []).map((heading) =>
      normalizeSearchText(typeof heading === "string" ? heading : heading?.text)
    );
    const text = normalizeSearchText(page.text);
    const combined = [title, description, ...headings, text].join(" ");
    const combinedTokens = new Set(combined.split(" ").filter(Boolean));

    if (!terms.every((term) => combinedTokens.has(term))) {
      continue;
    }

    let score = 0;
    score += scoreField(page.title, phrase, terms, {
      exact: 220,
      phrase: 110,
      term: 34,
      cap: 3
    });
    score += scoreField(page.description, phrase, terms, {
      exact: 70,
      phrase: 45,
      term: 13,
      cap: 3
    });

    let matchedHeading = "";
    let bestHeadingScore = 0;
    let matchedHeadingId = "";
    for (const headingEntry of page.headings ?? []) {
      const heading = typeof headingEntry === "string" ? headingEntry : headingEntry?.text ?? "";
      const headingScore = scoreField(heading, phrase, terms, {
        exact: 130,
        phrase: 78,
        term: 24,
        cap: 2
      });
      if (headingScore > bestHeadingScore) {
        bestHeadingScore = headingScore;
        matchedHeading = heading;
        matchedHeadingId = typeof headingEntry === "string" ? "" : headingEntry?.id ?? "";
      }
    }
    score += bestHeadingScore;
    score += scoreField(page.text, phrase, terms, {
      exact: 0,
      phrase: 24,
      term: 3,
      cap: 12
    });

    results.push({
      ...page,
      matchedHeading: bestHeadingScore > 0 ? matchedHeading : "",
      matchedHeadingId: bestHeadingScore > 0 ? matchedHeadingId : "",
      excerpt: buildSearchExcerpt(page.text || page.description, query),
      score
    });
  }

  return results
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit);
}
