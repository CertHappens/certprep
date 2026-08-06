import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  searchPageFromHtml,
  sitemapUrls
} from "../scripts/search_index.mjs";
import {
  buildSearchExcerpt,
  normalizeSearchText,
  rankSearchResults,
  tokenizeSearchQuery
} from "../src/assets/js/search-core.js";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("search index extraction uses public page metadata, headings, and main content", () => {
  const page = searchPageFromHtml(
    `<!doctype html><html><head><title>Fallback | CertHappens</title><meta name="description" content="Plain &amp; useful"></head><body><main id="main-content"><h1>IPv6 Addressing</h1><h2 id="link-local">Link-local addresses</h2><p>Link-local addresses begin with FE80::/10.</p><script>ignore me</script></main></body></html>`,
    "/ipv6-addressing/"
  );

  assert.deepEqual(page, {
    title: "IPv6 Addressing",
    url: "/ipv6-addressing/",
    description: "Plain & useful",
    type: "Reference",
    section: "Shared resource",
    headings: [{ text: "Link-local addresses", id: "link-local" }],
    text: "IPv6 Addressing Link-local addresses Link-local addresses begin with FE80::/10."
  });
});

test("search index follows sitemap URLs while excluding the search and Site Map pages", () => {
  assert.deepEqual(
    sitemapUrls(`
      <urlset>
        <url><loc>https://certhappens.com/</loc></url>
        <url><loc>https://certhappens.com/search/</loc></url>
        <url><loc>https://certhappens.com/sitemap/</loc></url>
        <url><loc>https://certhappens.com/cissp/study-guide/</loc></url>
      </urlset>
    `),
    ["/", "/cissp/study-guide/"]
  );
});

test("search ranking favors title and heading matches while requiring every query term", () => {
  const pages = [
    {
      title: "IPv6 Addressing and Prefix Reference",
      url: "/ipv6-addressing/",
      description: "Understand IPv6 address types.",
      type: "Reference",
      section: "Shared resource",
      headings: [{ text: "Link-local addresses", id: "link-local" }],
      text: "IPv6 link-local addresses commonly begin with fe80."
    },
    {
      title: "Network Concepts",
      url: "/network-plus/concepts/",
      description: "Networking concepts.",
      type: "Domain guide",
      section: "Network+",
      headings: [{ text: "IPv6 addressing", id: "ipv6" }],
      text: "This section mentions IPv6 but not the requested scope."
    }
  ];

  const results = rankSearchResults(pages, "IPv6 link local");
  assert.equal(results.length, 1);
  assert.equal(results[0].url, "/ipv6-addressing/");
  assert.equal(results[0].matchedHeading, "Link-local addresses");
  assert.equal(results[0].matchedHeadingId, "link-local");
});

test("search normalization and excerpts remain readable", () => {
  assert.equal(normalizeSearchText("  Security+ / SY0-701  "), "security sy0 701");
  assert.deepEqual(tokenizeSearchQuery("risk risk tolerance"), ["risk", "tolerance"]);
  assert.deepEqual(tokenizeSearchQuery("what is risk tolerance"), ["risk", "tolerance"]);
  assert.match(buildSearchExcerpt("A ".repeat(80) + "risk tolerance sets a measurable limit." + " B".repeat(80), "risk tolerance"), /risk tolerance/);
});

test("short acronym queries match whole terms instead of unrelated word fragments", () => {
  const pages = [
    {
      title: "AI in Network Operations",
      url: "/ai/",
      description: "Artificial intelligence operations.",
      type: "Domain guide",
      section: "CCNA",
      headings: [],
      text: "AI can assist with network operations."
    },
    {
      title: "Security Training",
      url: "/training/",
      description: "Training guidance.",
      type: "Page",
      section: "Site",
      headings: [],
      text: "Training and awareness improve behavior."
    }
  ];

  assert.deepEqual(rankSearchResults(pages, "AI").map((page) => page.url), ["/ai/"]);
});

test("site search route, index hook, navigation icon, and client assets are registered", async () => {
  const [navigationText, layout, config, page, headers, client, styles] = await Promise.all([
    readSource("src/_data/siteNavigation.json"),
    readSource("src/_includes/layouts/base.njk"),
    readSource("eleventy.config.js"),
    readSource("src/search/index.njk"),
    readSource("src/_headers"),
    readSource("src/assets/js/site-search.js"),
    readSource("src/assets/css/search.css")
  ]);
  const navigation = JSON.parse(navigationText);

  assert.deepEqual(navigation.primary.at(-1), {
    label: "Search",
    url: "/search/",
    matchPrefix: "/search/",
    icon: "search"
  });
  assert.match(layout, /primary-nav__icon/);
  assert.match(layout, /<circle cx="11" cy="11" r="7">/);
  assert.match(config, /buildSearchIndex/);
  assert.match(config, /eleventy\.after/);
  assert.match(page, /permalink: \/search\//);
  assert.match(page, /data-site-search-input/);
  assert.match(page, /Numbered practice-test questions are not included/);
  assert.match(headers, /\/search-index\.json/);
  assert.match(client, /rankSearchResults/);
  assert.match(styles, /\.search-results__item/);
});
