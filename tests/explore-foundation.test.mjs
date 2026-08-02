import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import explore from "../src/_data/explore.js";

const readSource = (relative) => readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("Explore foundation preserves the approved first-article contract", () => {
  assert.equal(explore.launchStatus, "draft");
  assert.equal(explore.firstArticle.title, "Which Technology Career Path Fits You?");
  assert.equal(explore.firstArticle.url, "/explore/career/paths/");
  assert.equal(explore.firstArticle.searchIntentPhrase, "What career is right for me?");
  assert.equal(explore.firstArticle.resultCount, 2);
  assert.equal(explore.firstArticle.resultLead, "Your answers suggest that you may enjoy...");
  assert.deepEqual(
    explore.firstArticle.paths.map((path) => path.label),
    [
      "IT operations",
      "Development",
      "Management",
      "Cybersecurity",
      "Quality assurance",
      "Audit and technical assurance",
    ]
  );
  assert.equal(
    explore.firstArticle.nextArticleTitle,
    "Which Cybersecurity Career Path Fits You?"
  );
});

test("Eleventy registers a validated newest-first Explore collection", async () => {
  const config = await readSource("eleventy.config.js");
  assert.match(config, /buildExploreArticleCollection/);
  assert.match(config, /addCollection\("exploreArticles"/);
  assert.match(config, /getFilteredByTag\("exploreArticle"\)/);
});

test("shared layouts support Explore styling, assessment, and optional relationships", async () => {
  const base = await readSource("src/_includes/layouts/base.njk");
  const article = await readSource("src/_includes/layouts/article.njk");

  assert.match(base, /for stylesheet in stylesheets/);
  assert.match(article, /components\/explore-assessment\.njk/);
  assert.match(article, /relatedArticles and relatedArticles \| length/);
  assert.match(article, />Related articles</);
  assert.match(article, />Related resources</);
});

test("Explore feed renders published collection items without visible dates", async () => {
  const feed = await readSource("src/_includes/components/explore-feed.njk");

  assert.match(feed, /for article in collections\.exploreArticles/);
  assert.match(feed, /article\.data\.category/);
  assert.match(feed, /article\.data\.title/);
  assert.match(feed, /article\.data\.description/);
  assert.doesNotMatch(feed, /datePublished|dateModified|readableDate/);
});

test("assessment component promises top-two results without lead capture", async () => {
  const component = await readSource("src/_includes/components/explore-assessment.njk");

  assert.match(component, /See my top two paths/);
  assert.match(component, /Your answers suggest that you may enjoy\.\.\./);
  assert.match(component, /data-career-assessment-results/);
  assert.doesNotMatch(component, /type=["']email["']/i);
  assert.doesNotMatch(component, /mailto:/i);
});

test("authoring contract keeps dates hidden and categories content-led", async () => {
  const documentation = await readSource("docs/explore-authoring.md");

  assert.match(documentation, /dateCreated:/);
  assert.match(documentation, /datePublished:/);
  assert.match(documentation, /dateModified:/);
  assert.match(documentation, /They are not displayed in the article/);
  assert.match(documentation, /does not automatically create a category route or navigation item/);
  assert.match(documentation, /roughly five to ten articles/);
  assert.match(documentation, /without an account, email address, employer classification, or lead-capture step/);
});

test("Explore remains out of public navigation until useful content is approved", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  assert.equal(navigation.primary.some((item) => item.label === "Explore"), false);
});
