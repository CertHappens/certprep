import assert from "node:assert/strict";
import test from "node:test";

import {
  countElementsWithAttributeAndText,
  countElementsWithClass,
  decodeHtmlEntities,
  elementTextByIdMatches,
  getElementBlockByAttributeValue,
  hasElementWithNormalizedAttributeValue,
  hasLinkWithText,
  hasPageMarker,
  headingMatches,
  includesNormalizedText,
  normalizeText
} from "../scripts/verify_site_helpers.mjs";

test("decodes named, decimal, and hexadecimal HTML entities", () => {
  assert.equal(
    decodeHtmlEntities("YAML Ain&apos;t Markup Language &#39;ok&#39; &#x26; ready"),
    "YAML Ain't Markup Language 'ok' & ready"
  );
});

test("normalizes case, punctuation, typographic apostrophes, and whitespace", () => {
  assert.equal(
    normalizeText("  YAML Ain’t\nMarkup—Language!  "),
    "yaml ain t markup language"
  );
});

test("preserves meaningful plus and percent symbols as semantic words", () => {
  assert.equal(normalizeText("Network+ covers 25%"), "network plus covers 25 percent");
  assert.notEqual(normalizeText("Network"), normalizeText("Network+"));
});

test("finds semantic text despite tags, entities, case, and punctuation", () => {
  const html = `<main><p>YAML Ain&#39;t <strong>Markup</strong> Language.</p></main>`;
  assert.equal(includesNormalizedText(html, "yaml ain't markup language"), true);
});

test("limits semantic checks to main content when a main landmark exists", () => {
  const html = `<title>Retired phrase</title><main><p>Current copy</p></main>`;
  assert.equal(includesNormalizedText(html, "retired phrase"), false);
  assert.equal(includesNormalizedText(html, "current copy"), true);
});

test("keeps structural markers exact while normalizing prose markers", () => {
  const html = `<main><a href="/ccna/">Explore CCNA</a><p>Network Operations &amp; Management</p></main>`;
  assert.equal(hasPageMarker(html, 'href="/ccna/"'), true);
  assert.equal(hasPageMarker(html, 'href="/CCNA/"'), false);
  assert.equal(hasPageMarker(html, "network operations and management"), true);
});

test("matches headings without depending on case or punctuation", () => {
  assert.equal(
    headingMatches("<main><h1>CCNA 200-301: Study Resources</h1></main>", "ccna 200 301 study resources"),
    true
  );
});

test("matches identified element text and repeated button labels structurally", () => {
  const html = `
    <h2 id="article-toc-title">Jump&nbsp;to</h2>
    <button data-quiz-return>Review the full test, question by question</button>
    <button data-quiz-return>Review the full test question by question</button>
  `;
  assert.equal(elementTextByIdMatches(html, "h2", "article-toc-title", "Jump to"), true);
  assert.equal(
    hasElementWithNormalizedAttributeValue(
      '<button aria-label="Print or Save this Guide"></button>',
      "button",
      "aria-label",
      "print or save this guide"
    ),
    true
  );
  assert.equal(
    hasLinkWithText(
      '<a class="button" href="/ccna/">Explore: CCNA resources</a>',
      "/ccna/",
      "explore ccna resources"
    ),
    true
  );
  assert.equal(
    countElementsWithAttributeAndText(
      html,
      "button",
      "data-quiz-return",
      "Review the full test question by question"
    ),
    2
  );
});


test("counts structural cards inside a labelled section", () => {
  const html = `
    <section aria-labelledby="exam-domains-heading">
      <article class="card"><p>Domain One</p></article>
      <article class="card featured"><p>Domain Two</p></article>
    </section>
    <section aria-labelledby="other-heading"><article class="card"></article></section>
  `;
  const section = getElementBlockByAttributeValue(
    html,
    "section",
    "aria-labelledby",
    "exam-domains-heading"
  );
  assert.equal(countElementsWithClass(section, "article", "card"), 2);
});
