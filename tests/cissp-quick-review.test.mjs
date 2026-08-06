import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

const expectedReviews = [
  {
    title: "Governance, Risk, and Policy Decisions Quick Reference",
    shortTitle: "Governance and risk",
    url: "/cissp/quick-review/governance-risk-policy-decisions/",
  },
  {
    title: "Security Models and Design Principles Quick Reference",
    shortTitle: "Models and design",
    url: "/cissp/quick-review/security-models-design-principles/",
  },
  {
    title: "Assessment, Incident, and Recovery Decisions Quick Reference",
    shortTitle: "Assessment and recovery",
    url: "/cissp/quick-review/assessment-incident-recovery-decisions/",
  },
];

test("CISSP navigation adds quick reviews immediately after the study guide", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const cissp = navigation.primary.find((item) => item.label === "CISSP");
  const study = cissp.groups.find((group) => group.label === "Study");

  assert.deepEqual(study.links.slice(0, 2), [
    { label: "Study guide", url: "/cissp/study-guide/" },
    { label: "Quick reviews", url: "/cissp/quick-review/" },
  ]);
  assert.equal(cissp.groups.some((group) => group.label === "Practice"), false);
});

test("CISSP quick-review data registers three focused guides", async () => {
  const reviews = JSON.parse(await readSource("src/_data/cisspQuickReviews.json"));
  assert.equal(reviews.length, 3);
  assert.deepEqual(
    reviews.map(({ title, shortTitle, url }) => ({ title, shortTitle, url })),
    expectedReviews
  );

  for (const review of reviews) {
    assert.match(review.description, /\S/);
    assert.match(review.buttonLabel, /\S/);
    assert.match(review.meta, /\S/);
  }
});

test("CISSP quick-review hub renders from shared data and links the full study collection", async () => {
  const hub = await readSource("src/cissp/quick-review/index.njk");
  assert.match(hub, /CISSP Quick Review/);
  assert.match(hub, /for guide in cisspQuickReviews/);
  assert.match(hub, /\/cissp\/study-guide\//);
  assert.match(hub, /\/cissp\//);
  assert.match(hub, /\/security-plus\/quick-review\/recovery-metrics\//);
});

const sourceSpecs = [
  {
    path: "src/cissp/quick-review/governance-risk-policy-decisions/index.md",
    markers: [
      "amount of possible loss, harm, disruption, or uncertainty",
      "limit for how much loss, harm, delay, or disruption",
      "Due care",
      "Due diligence",
      "Policy hierarchy",
    ],
  },
  {
    path: "src/cissp/quick-review/security-models-design-principles/index.md",
    markers: [
      "Bell-LaPadula",
      "Biba",
      "Clark-Wilson",
      "Brewer-Nash",
      "Reference monitor",
      "Zero trust",
    ],
  },
  {
    path: "src/cissp/quick-review/assessment-incident-recovery-decisions/index.md",
    markers: [
      "Vulnerability assessment",
      "Penetration test",
      "Maximum Tolerable Downtime",
      "Recovery Time Objective",
      "Full interruption",
    ],
  },
];

for (const spec of sourceSpecs) {
  test(`${spec.path} follows the quick-review article contract`, async () => {
    const source = await readSource(spec.path);
    assert.match(source, /layout: layouts\/article\.njk/);
    assert.match(source, /printable: true/);
    assert.match(source, /datePublished: 2026-08-05/);
    assert.match(source, /dateModified: 2026-08-05/);
    assert.match(source, /url: \/cissp\/quick-review\//);
    assert.match(source, /url: \/cissp\/study-guide\//);
    assert.doesNotMatch(source, /—/);

    for (const marker of spec.markers) {
      assert.match(
        source,
        new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      );
    }
  });
}

test("CISSP hub and study guide surface the quick-review section", async () => {
  const examHubs = JSON.parse(await readSource("src/_data/examHubs.json"));
  const studyGuide = await readSource("src/cissp/study-guide/index.md");

  assert.ok(
    examHubs.cissp.currentResources.links.some(
      (item) => item.url === "/cissp/quick-review/"
    )
  );
  assert.match(studyGuide, /CISSP Quick Review Guides/);
  assert.match(studyGuide, /\/cissp\/quick-review\//);
});

test("homepage places CISSP with the primary certification cards", async () => {
  const homepage = await readSource("src/index.njk");
  const certificationSection = homepage.match(
    /<section class="section section--bordered">[\s\S]*?<\/section>/
  )?.[0] ?? "";

  assert.match(certificationSection, /ISC2 CISSP/);
  assert.match(certificationSection, /Explore CISSP resources/);
  assert.match(certificationSection, /CISSP includes a complete eight-domain study collection/);
  assert.doesNotMatch(homepage, /Explore the CISSP path/);
  assert.doesNotMatch(homepage, /additional-certification-paths-heading/);
  assert.match(homepage, /five domain guides, quick reviews, an IOS command reference/);
});
