import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import articleData from "../src/explore/certifications/first-it-certification/first-it-certification.11tydata.js";
import {
  scoreCareerAssessment,
  validateCareerAssessment,
} from "../src/assets/js/explore/career-assessment-core.js";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("certification chooser contains six routes and eight balanced questions", () => {
  const { assessment } = articleData;
  validateCareerAssessment(assessment);

  assert.equal(assessment.paths.length, 6);
  assert.equal(assessment.questions.length, 8);
  assert.equal(assessment.questions.every((question) => question.options.length === 6), true);
  assert.deepEqual(assessment.resultRankLabels, ["Best starting point", "Also consider"]);
  assert.equal(assessment.submitLabel, "See my recommendations");

  const primaryTotals = Object.fromEntries(assessment.paths.map((path) => [path.id, 0]));
  for (const question of assessment.questions) {
    for (const option of question.options) {
      const primary = Object.entries(option.scores).sort((left, right) => right[1] - left[1])[0][0];
      primaryTotals[primary] += 1;
    }
  }

  assert.deepEqual(Object.values(primaryTotals), [8, 8, 8, 8, 8, 8]);
});

test("a learner with basic IT knowledge and a security goal receives Security+ first", () => {
  const { assessment } = articleData;
  const outcome = scoreCareerAssessment(
    assessment,
    {
      "current-experience": "ready-for-security-breadth",
      "preferred-practice": "investigate-security",
      "job-direction": "security-analyst",
      "study-style": "security-scenarios",
      "desired-proof": "security-foundation-proof",
      "network-comfort": "network-ready-for-security",
      "credential-fit": "broad-security-credential",
      "next-project": "security-investigation-lab",
    },
    { resultCount: 2 }
  );

  assert.equal(outcome.complete, true);
  assert.equal(outcome.topMatches[0].id, "security-plus");
  assert.equal(outcome.topMatches[1].id, "isc2-cc");
});

test("a new IT learner receives the foundation route before networking", () => {
  const { assessment } = articleData;
  const outcome = scoreCareerAssessment(
    assessment,
    {
      "current-experience": "learning-computer-basics",
      "preferred-practice": "fix-user-computer",
      "job-direction": "support-role",
      "study-style": "support-labs",
      "desired-proof": "support-proof",
      "network-comfort": "need-network-basics",
      "credential-fit": "broad-support-credential",
      "next-project": "desktop-lab",
    },
    { resultCount: 2 }
  );

  assert.deepEqual(outcome.topMatches.map((match) => match.id), [
    "it-foundations",
    "network-plus",
  ]);
});

test("shared assessment presentation supports certification-specific copy", async () => {
  const component = await readSource("src/_includes/components/explore-assessment.njk");
  const controller = await readSource("src/assets/js/explore/career-assessment.js");

  assert.match(component, /assessment\.submitLabel or "See my top two paths"/);
  assert.match(component, /assessment\.resultsTitle or "Your strongest technology career matches"/);
  assert.match(component, /assessment\.resultNext or/);
  assert.match(controller, /assessment\.resultRankLabels/);
  assert.match(controller, /assessment\.completionAnnouncement/);
  assert.match(controller, /Strongest match/);
  assert.match(controller, /Second match/);
});

test("first-certification article is public, plain-language, and complete", async () => {
  const article = await readSource(
    "src/explore/certifications/first-it-certification/index.md"
  );

  const requiredMarkers = [
    "permalink: /explore/certifications/first-it-certification/",
    "assessmentPlacement: inline",
    "Choosing a first IT certification can feel harder than studying for one.",
    "What Your Result Means",
    "Build IT Foundations with CompTIA A+",
    "CompTIA Network+",
    "Cisco CCNA",
    "CompTIA Security+",
    "ISC2 Certified in Cybersecurity",
    "Build Experience Before CISSP",
    "Certification Does Not Replace Hands-On Experience",
    "February 2, 2027",
    "February 3, 2027",
    "September 1, 2026",
    "five years of cumulative full-time experience",
    "No email address or account is required",
  ];

  for (const marker of requiredMarkers) {
    assert.equal(article.includes(marker), true, `Missing article marker: ${marker}`);
  }

  assert.doesNotMatch(article, /\u2014/);
  assert.doesNotMatch(article, /sitemap: false/);
  assert.doesNotMatch(article, /noindex|nofollow|nosnippet/);
});
