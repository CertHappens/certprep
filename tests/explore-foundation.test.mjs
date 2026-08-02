import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import explore from "../src/_data/explore.js";
import articleData from "../src/explore/career/paths/paths.11tydata.js";
import {
  scoreCareerAssessment,
  validateCareerAssessment,
} from "../src/assets/js/explore/career-assessment-core.js";

const readSource = (relative) => readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("Explore launches with the approved first-article contract", () => {
  assert.equal(explore.launchStatus, "published");
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

test("assessment component provides sequential controls and top-two results without lead capture", async () => {
  const component = await readSource("src/_includes/components/explore-assessment.njk");
  const controller = await readSource("src/assets/js/explore/career-assessment.js");
  assert.match(component, /Previous question/);
  assert.match(component, /Next question/);
  assert.match(component, /See my top two paths/);
  assert.match(component, /Your answers suggest that you may enjoy\.\.\./);
  assert.match(component, /data-career-assessment-results/);
  assert.match(controller, /currentQuestionIndex/);
  assert.match(controller, /form\.hidden = true/);
  assert.doesNotMatch(component, /type=["']email["']/i);
  assert.doesNotMatch(component, /mailto:/i);
});

test("published career assessment contains six paths and eight balanced questions", () => {
  const { assessment } = articleData;
  validateCareerAssessment(assessment);
  assert.equal(assessment.paths.length, 6);
  assert.equal(assessment.questions.length, 8);
  assert.equal(assessment.questions.every((question) => question.options.length === 6), true);

  const primaryTotals = Object.fromEntries(assessment.paths.map((path) => [path.id, 0]));
  for (const question of assessment.questions) {
    for (const option of question.options) {
      const strongest = Object.entries(option.scores).sort((left, right) => right[1] - left[1])[0][0];
      primaryTotals[strongest] += 1;
    }
  }
  assert.deepEqual(Object.values(primaryTotals), [8, 8, 8, 8, 8, 8]);
});

test("career assessment returns the expected top two paths for a mixed operations and security profile", () => {
  const { assessment } = articleData;
  const answers = {
    "system-outage": "restore-service",
    "application-launch": "prepare-infrastructure",
    "repeated-task": "check-security-gap",
    "information-preference": "security-data",
    "satisfying-result": "stable-system",
    "incomplete-information": "develop-threat-theory",
    "major-change": "operational-impact",
    conversation: "explain-threat",
  };
  const outcome = scoreCareerAssessment(assessment, answers, { resultCount: 2 });
  assert.equal(outcome.complete, true);
  assert.deepEqual(outcome.topMatches.map((match) => match.id), ["it-operations", "cybersecurity"]);
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

test("Explore navigation, landing page, and first article activate together for staging review", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const exploreNavigation = navigation.primary.find((item) => item.label === "Explore");
  const landing = await readSource("src/explore/index.njk");
  const article = await readSource("src/explore/career/paths/index.md");

  assert.deepEqual(exploreNavigation, {
    label: "Explore",
    url: "/explore/",
    matchPrefix: "/explore/",
  });
  assert.match(landing, /permalink: \/explore\//);
  assert.match(article, /permalink: \/explore\/career\/paths\//);
  assert.match(article, /What career is right for me\?/);
  assert.match(article, /Security Technical Implementation Guides/);
  assert.match(landing, /robots: noindex,nofollow,nosnippet/);
  assert.match(article, /robots: noindex,nofollow,nosnippet/);
  assert.match(landing, /sitemap: false/);
  assert.match(article, /sitemap: false/);
});
