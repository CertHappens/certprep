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
    "IT Support or Cybersecurity: Where Should You Start?"
  );
});

test("Eleventy registers a validated newest-first Explore collection", async () => {
  const config = await readSource("eleventy.config.js");
  assert.match(config, /buildExploreArticleCollection/);
  assert.match(config, /addCollection\("exploreArticles"/);
  assert.match(config, /getFilteredByTag\("exploreArticle"\)/);
});

test("shared layouts support full-width articles, inline assessments, and optional relationships", async () => {
  const base = await readSource("src/_includes/layouts/base.njk");
  const article = await readSource("src/_includes/layouts/article.njk");
  const siteCss = await readSource("src/assets/css/site.css");
  assert.match(base, /for stylesheet in stylesheets/);
  assert.match(article, /article-layout--single/);
  assert.match(siteCss, /\.article-layout--single\s*\{[\s\S]*grid-template-columns: minmax\(0, var\(--reading-width\)\)/);
  assert.match(article, /assessmentPlacement != "inline"/);
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
  assert.match(component, /data-career-assessment-jump/);
  assert.match(component, /Assessment question navigation/);
  assert.match(component, /Previous question/);
  assert.match(component, /Next question/);
  assert.match(component, /See my top two paths/);
  assert.match(component, /career-assessment__actions-start[\s\S]*Previous question/);
  assert.match(component, /career-assessment__restart[\s\S]*Restart quiz/);
  assert.match(component, /career-assessment__actions-end[\s\S]*Next question/);
  assert.match(component, /Retake the quiz/);
  assert.doesNotMatch(component, /Explore all six career paths below/);
  assert.match(component, /career-assessment__retake/);
  assert.match(component, /Progress and results are saved in this browser tab/);
  assert.match(component, /Your answers suggest that you may enjoy\.\.\./);
  assert.match(component, /data-career-assessment-results/);
  assert.match(controller, /currentQuestionIndex/);
  assert.match(controller, /question\.style\.display = current \? "" : "none"/);
  assert.match(controller, /aria-current/);
  assert.match(controller, /form\.hidden = true/);
  assert.match(controller, /window\.sessionStorage/);
  assert.match(controller, /certprep\.explore\./);
  assert.match(controller, /completedAt/);
  assert.match(controller, /Restart the quiz and clear all saved answers and results\?/);
  assert.doesNotMatch(controller, /window\.localStorage/);
  assert.doesNotMatch(component, /type=["']email["']/i);
  assert.doesNotMatch(component, /mailto:/i);
});

test("career assessment uses compact rows, a prominent question heading, and exam-style actions", async () => {
  const component = await readSource("src/_includes/components/explore-assessment.njk");
  const exploreCss = await readSource("src/assets/css/explore.css");
  assert.match(component, /role="radiogroup"/);
  assert.match(component, /career-assessment__question-heading/);
  assert.doesNotMatch(component, /<legend>/);
  assert.match(exploreCss, /\.career-assessment__question-heading h3\s*\{[\s\S]*font-size:\s*clamp\(1\.2rem, 1\.7vw, 1\.42rem\)/);
  assert.match(exploreCss, /\.career-assessment__options\s*\{[\s\S]*flex-direction:\s*column[\s\S]*gap:\s*0\.08rem/);
  assert.match(exploreCss, /\.career-assessment__option\s*\{[\s\S]*margin:\s*0 !important[\s\S]*padding:\s*0\.1rem 0\.35rem/);
  assert.match(exploreCss, /\.career-assessment__option\s*\{[\s\S]*font-size:\s*1\.04rem/);
  assert.match(exploreCss, /\.career-assessment__actions\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1fr\) auto minmax\(0, 1fr\)/);
  assert.match(exploreCss, /\.career-assessment__restart\s*\{[\s\S]*justify-self:\s*center/);
  assert.match(exploreCss, /\.career-assessment__retake\s*\{[\s\S]*margin-inline:\s*auto/);
  assert.match(exploreCss, /@media screen and \(max-width: 42rem\)[\s\S]*\.career-assessment__option\s*\{[\s\S]*padding:\s*0\.45rem 0\.45rem/);
  assert.match(exploreCss, /\.career-assessment__status:empty\s*\{[\s\S]*display:\s*none/);
});

test("published career assessment contains six paths and eight balanced questions", () => {
  const { assessment } = articleData;
  validateCareerAssessment(assessment);
  assert.equal(assessment.paths.length, 6);
  assert.equal(assessment.questions.length, 8);
  assert.equal(assessment.questions.every((question) => question.options.length === 6), true);
  assert.deepEqual(
    Object.fromEntries(assessment.paths.map((path) => [path.id, path.url])),
    {
      "it-operations": "#it-operations",
      development: "#software-development",
      management: "#technology-management",
      cybersecurity: "#cybersecurity",
      "quality-assurance": "#quality-testing",
      "technical-assurance": "#audit-assurance",
    }
  );
  assert.equal(assessment.paths.every((path) => path.linkLabel.startsWith("Read about ")), true);
  assert.equal(assessment.paths.some((path) => /Security\+|Network\+|CCNA/.test(path.linkLabel)), false);
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

test("Explore navigation, landing page, and first article activate together as public content", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const exploreNavigation = navigation.primary.find((item) => item.label === "Explore");
  const landing = await readSource("src/explore/index.njk");
  const article = await readSource("src/explore/career/paths/index.md");
  assert.deepEqual(exploreNavigation, {
    label: "Explore",
    url: "/explore/",
    matchPrefix: "/explore/",
    menuId: "explore-navigation",
    groups: [
      {
        label: "Explore",
        links: [
          { label: "Home", url: "/explore/" },
          { label: "Which Tech Career", url: "/explore/career/paths/" },
          { label: "IT or Cybersecurity", url: "/explore/career/it-support-or-cybersecurity/" },
          { label: "Which Cyber Career", url: "/explore/career/cybersecurity-paths/" },
        ],
      },
    ],
  });
  assert.match(landing, /permalink: \/explore\//);
  assert.match(article, /permalink: \/explore\/career\/paths\//);
  assert.match(article, /What career is right for me\?/);
  assert.match(article, /assessmentPlacement: inline/);
  assert.match(article, /toc:[\s\S]*id: career-quiz[\s\S]*id: explore-work[\s\S]*id: related-resources-title/);
  assert.match(article, /career self-assessment below returns your two strongest matches/);
  assert.match(article, /No email address or account is required/);
  assert.match(article, /Explore the Work Before Choosing a Path/);
  assert.match(article, /\{% include "components\/explore-assessment\.njk" %\}[\s\S]*<h2 id="it-operations">IT Operations and Infrastructure<\/h2>/);
  assert.match(article, /Security Technical Implementation Guides/);
  assert.doesNotMatch(landing, /robots: noindex,nofollow,nosnippet/);
  assert.doesNotMatch(article, /robots: noindex,nofollow,nosnippet/);
  assert.doesNotMatch(landing, /sitemap: false/);
  assert.doesNotMatch(article, /sitemap: false/);
});
