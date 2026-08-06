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

const SEARCH_TERM_ALIASES = new Map([
  ["hack", ["hacker", "hackers", "hacktivist", "compromise", "compromised", "unauthorized access", "penetration testing"]],
  ["hacks", ["hacker", "hackers", "hacktivist", "compromise", "compromised", "unauthorized access", "penetration testing"]],
  ["hacked", ["hack", "hacker", "hackers", "compromise", "compromised", "account takeover", "unauthorized access"]],
  ["hacker", ["hack", "hacking", "hacked", "attacker", "threat actor", "hacktivist", "penetration tester"]],
  ["hackers", ["hack", "hacking", "hacked", "attacker", "threat actor", "hacktivist", "penetration tester"]],
  ["hacking", ["hack", "hacker", "hackers", "attacker", "threat actor", "penetration testing"]],
  ["wifi", ["wi fi", "wireless"]],
  ["wireless", ["wifi", "wi fi"]],
  ["2fa", ["mfa", "multi factor authentication"]],
  ["mfa", ["2fa", "multi factor authentication"]],
  ["login", ["sign in", "authentication"]],
  ["subnet", ["subnetting"]]
]);

const SEARCH_PHRASE_ALIASES = new Map([
  ["ethical hacker", ["penetration tester", "red team", "security testing", "authorized testing"]],
  ["ethical hackers", ["penetration testers", "red team", "security testing", "authorized testing"]],
  ["wi fi", ["wifi", "wireless"]],
  ["log in", ["sign in", "authentication"]],
  ["sign in", ["login", "authentication"]],
  ["multi factor authentication", ["mfa", "2fa"]]
]);

export function tokenizeSearchQuery(query) {
  const tokens = [...new Set(normalizeSearchText(query).split(" ").filter(Boolean))];
  if (tokens.length <= 1) return tokens;
  const meaningful = tokens.filter((token) => !SEARCH_STOP_WORDS.has(token));
  return meaningful.length > 0 ? meaningful : tokens;
}

function isVowel(character) {
  return "aeiou".includes(character);
}

function canDoubleFinalConsonant(value) {
  if (value.length < 3) return false;
  const [before, middle, last] = value.slice(-3);
  return (
    !isVowel(before) &&
    isVowel(middle) &&
    !isVowel(last) &&
    !"wxy".includes(last)
  );
}

function addBaseForms(forms, base) {
  if (!base || base.length < 4) return;
  forms.add(base);

  if (/[^aeiou]y$/.test(base)) {
    forms.add(`${base.slice(0, -1)}ies`);
    forms.add(`${base.slice(0, -1)}ied`);
  } else if (/(s|x|z|ch|sh)$/.test(base)) {
    forms.add(`${base}es`);
  } else {
    forms.add(`${base}s`);
  }

  if (base.endsWith("e")) {
    forms.add(`${base}d`);
    if (!base.endsWith("ee")) forms.add(`${base.slice(0, -1)}ing`);
  } else {
    forms.add(`${base}ed`);
    forms.add(`${base}ing`);
    if (canDoubleFinalConsonant(base)) {
      const last = base.at(-1);
      forms.add(`${base}${last}ed`);
      forms.add(`${base}${last}ing`);
    }
  }
}

export function wordFamilyTerms(term) {
  const normalized = normalizeSearchText(term);
  if (!normalized || normalized.includes(" ") || normalized.length < 4) {
    return [normalized].filter(Boolean);
  }

  const bases = new Set([normalized]);

  if (normalized.endsWith("ies") && normalized.length > 4) {
    bases.add(`${normalized.slice(0, -3)}y`);
  }
  if (normalized.endsWith("ied") && normalized.length > 4) {
    bases.add(`${normalized.slice(0, -3)}y`);
  }
  if (normalized.endsWith("ing") && normalized.length > 5) {
    const stem = normalized.slice(0, -3);
    bases.add(stem);
    bases.add(`${stem}e`);
    if (stem.at(-1) === stem.at(-2) && !isVowel(stem.at(-1))) {
      bases.add(stem.slice(0, -1));
    }
  }
  if (normalized.endsWith("ed") && normalized.length > 4) {
    const stem = normalized.slice(0, -2);
    bases.add(stem);
    bases.add(`${stem}e`);
    if (stem.at(-1) === stem.at(-2) && !isVowel(stem.at(-1))) {
      bases.add(stem.slice(0, -1));
    }
  }
  if (normalized.endsWith("d") && normalized.endsWith("ed")) {
    bases.add(normalized.slice(0, -1));
  }
  if (normalized.endsWith("es") && normalized.length > 4) {
    bases.add(normalized.slice(0, -2));
    bases.add(normalized.slice(0, -1));
  } else if (normalized.endsWith("s") && !normalized.endsWith("ss") && normalized.length > 4) {
    bases.add(normalized.slice(0, -1));
  }

  const forms = new Set();
  for (const base of bases) addBaseForms(forms, base);
  forms.add(normalized);
  return [...forms];
}

function phraseCount(normalizedValue, candidate) {
  if (!normalizedValue || !candidate) return 0;
  const haystack = ` ${normalizedValue} `;
  const needle = ` ${candidate} `;
  let count = 0;
  let position = 0;
  while ((position = haystack.indexOf(needle, position)) >= 0) {
    count += 1;
    position += needle.length - 1;
  }
  return count;
}

function phraseIsPresent(haystack, needle) {
  return phraseCount(haystack, needle) > 0;
}

function uniqueNormalized(values) {
  return [...new Set(values.map(normalizeSearchText).filter(Boolean))];
}

function queryPlan(query) {
  const phrase = normalizeSearchText(query);
  const terms = tokenizeSearchQuery(query);
  const termPlans = terms.map((term) => {
    const family = wordFamilyTerms(term).filter((candidate) => candidate !== term);
    const aliases = uniqueNormalized(SEARCH_TERM_ALIASES.get(term) ?? []).filter(
      (candidate) => candidate !== term && !family.includes(candidate)
    );
    return { term, family, aliases };
  });

  return {
    phrase,
    terms,
    termPlans,
    phraseAliases: uniqueNormalized(SEARCH_PHRASE_ALIASES.get(phrase) ?? [])
  };
}

function bestTermMatch(normalizedValue, plan) {
  const exactCount = phraseCount(normalizedValue, plan.term);
  if (exactCount > 0) {
    return { kind: "exact", matched: plan.term, count: exactCount };
  }

  for (const candidate of plan.family) {
    const count = phraseCount(normalizedValue, candidate);
    if (count > 0) return { kind: "family", matched: candidate, count };
  }

  for (const [aliasIndex, candidate] of plan.aliases.entries()) {
    const count = phraseCount(normalizedValue, candidate);
    if (count > 0) return { kind: "related", matched: candidate, count, aliasIndex };
  }

  return null;
}

function pageMatch(normalizedValue, plan) {
  const termMatches = plan.termPlans.map((termPlan) => bestTermMatch(normalizedValue, termPlan));
  if (termMatches.every(Boolean)) {
    return { matches: termMatches, phraseAlias: "" };
  }

  for (const [aliasIndex, alias] of plan.phraseAliases.entries()) {
    if (phraseIsPresent(normalizedValue, alias)) {
      return {
        matches: [{ kind: "related", matched: alias, count: phraseCount(normalizedValue, alias), aliasIndex }],
        phraseAlias: alias
      };
    }
  }

  return null;
}

function scoreField(value, plan, weights) {
  const normalized = normalizeSearchText(value);
  let score = normalized === plan.phrase ? weights.exact : 0;
  if (phraseIsPresent(normalized, plan.phrase)) score += weights.phrase;

  const matches = [];
  for (const termPlan of plan.termPlans) {
    const match = bestTermMatch(normalized, termPlan);
    if (!match) continue;
    const weight =
      match.kind === "exact"
        ? weights.term
        : match.kind === "family"
          ? weights.family
          : weights.related;
    const relatedFactor = match.kind === "related"
      ? Math.max(0.35, 1 - (match.aliasIndex ?? 0) * 0.12)
      : 1;
    score += Math.min(match.count, weights.cap) * weight * relatedFactor;
    matches.push(match);
  }

  for (const [aliasIndex, alias] of plan.phraseAliases.entries()) {
    const count = phraseCount(normalized, alias);
    if (count > 0) {
      const relatedFactor = Math.max(0.35, 1 - aliasIndex * 0.12);
      score += Math.min(count, weights.cap) * weights.relatedPhrase * relatedFactor;
      matches.push({ kind: "related", matched: alias, count, aliasIndex });
    }
  }

  return { score, matches };
}

function firstPosition(normalizedSource, candidates) {
  const padded = ` ${normalizedSource} `;
  let best = -1;
  for (const candidate of uniqueNormalized(candidates)) {
    const next = padded.indexOf(` ${candidate} `);
    if (next >= 0 && (best < 0 || next < best)) best = next;
  }
  return best;
}

export function buildSearchExcerpt(text, query, maximumLength = 230, matchedTerms = []) {
  const source = String(text ?? "").replace(/\s+/g, " ").trim();
  if (!source) return "";

  const normalizedSource = normalizeSearchText(source);
  const plan = queryPlan(query);
  const position = firstPosition(normalizedSource, [
    plan.phrase,
    ...plan.terms,
    ...matchedTerms
  ]);

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
  const plan = queryPlan(query);
  if (!plan.phrase || plan.terms.length === 0) return [];

  const results = [];
  for (const page of pages ?? []) {
    const title = normalizeSearchText(page.title);
    const description = normalizeSearchText(page.description);
    const headings = (page.headings ?? []).map((heading) =>
      normalizeSearchText(typeof heading === "string" ? heading : heading?.text)
    );
    const text = normalizeSearchText(page.text);
    const combined = [title, description, ...headings, text].join(" ");
    const qualification = pageMatch(combined, plan);
    if (!qualification) continue;

    let score = 0;
    const collectedMatches = [];

    for (const [value, weights] of [
      [page.title, { exact: 220, phrase: 110, term: 34, family: 18, related: 8, relatedPhrase: 10, cap: 3 }],
      [page.description, { exact: 70, phrase: 45, term: 13, family: 7, related: 3, relatedPhrase: 4, cap: 3 }]
    ]) {
      const field = scoreField(value, plan, weights);
      score += field.score;
      collectedMatches.push(...field.matches);
    }

    let matchedHeading = "";
    let bestHeadingScore = 0;
    let matchedHeadingId = "";
    let headingMatches = [];
    for (const headingEntry of page.headings ?? []) {
      const heading = typeof headingEntry === "string" ? headingEntry : headingEntry?.text ?? "";
      const headingField = scoreField(heading, plan, {
        exact: 130,
        phrase: 78,
        term: 24,
        family: 13,
        related: 6,
        relatedPhrase: 7,
        cap: 2
      });
      if (headingField.score > bestHeadingScore) {
        bestHeadingScore = headingField.score;
        matchedHeading = heading;
        matchedHeadingId = typeof headingEntry === "string" ? "" : headingEntry?.id ?? "";
        headingMatches = headingField.matches;
      }
    }
    score += bestHeadingScore;
    collectedMatches.push(...headingMatches);

    const textField = scoreField(page.text, plan, {
      exact: 0,
      phrase: 24,
      term: 3,
      family: 1.5,
      related: 0.65,
      relatedPhrase: 0.8,
      cap: 12
    });
    score += textField.score;
    collectedMatches.push(...textField.matches);

    const relatedCandidates = qualification.matches.filter(
      (match) => match.kind === "related"
    );
    relatedCandidates.sort(
      (left, right) => (left.aliasIndex ?? Number.MAX_SAFE_INTEGER) - (right.aliasIndex ?? Number.MAX_SAFE_INTEGER)
    );
    const relatedMatch = relatedCandidates[0]?.matched ?? qualification.phraseAlias;
    const matchedTerms = uniqueNormalized([
      ...qualification.matches.map((match) => match.matched),
      ...collectedMatches.map((match) => match.matched)
    ]);

    results.push({
      ...page,
      matchedHeading: bestHeadingScore > 0 ? matchedHeading : "",
      matchedHeadingId: bestHeadingScore > 0 ? matchedHeadingId : "",
      relatedMatch,
      excerpt: buildSearchExcerpt(page.text || page.description, query, 230, matchedTerms),
      score
    });
  }

  return results
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, limit);
}
