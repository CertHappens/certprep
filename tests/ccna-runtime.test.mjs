import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("CCNA is registered in the shared public quiz catalog", async () => {
  const catalog = JSON.parse(await readSource("config/quiz-catalog.json"));
  const quiz = catalog.quizzes.find((entry) => entry.slug === "ccna/200-301-v2");

  assert.ok(quiz);
  assert.equal(quiz.questions_csv, "data/ccna/200-301-v2/questions.csv");
  assert.equal(quiz.objective_map_csv, "data/ccna/200-301-v2/objective-map.csv");
  assert.equal(quiz.stimuli_json, "data/ccna/200-301-v2/stimuli.json");
  assert.equal(quiz.public_base_path, "/quiz-data/ccna/200-301-v2");
  assert.equal(quiz.practice_test_path, "/ccna/200-301-v2/practice-test");
  assert.deepEqual(quiz.question_count_options, [10, 20, 30, 50]);
  assert.equal(quiz.preferred_default_question_count, 30);
});

test("CCNA practice pages use the established shared quiz interface", async () => {
  const landing = await readSource("src/ccna/200-301-v2/practice-test/index.njk");
  const question = await readSource("src/ccna/200-301-v2/practice-test/question.njk");

  assert.match(landing, /quizCatalog\.byTestId\["CCNA-301-V2"\]/);
  assert.match(landing, /data-test-id="\{\{ quiz\.test\.testId \}\}"/);
  assert.match(landing, /data-quiz-stimulus/);
  assert.match(landing, /data-quiz-report/);
  assert.match(landing, /February 3, 2027/);
  assert.match(question, /data-test-id="CCNA-301-V2"/);
  assert.match(question, /data-paged-stimulus/);
  assert.match(question, /robots: noindex,nofollow,nosnippet/);
  assert.match(question, /sitemap: false/);
});

test("CCNA practice is discoverable from navigation, homepage, and hub", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const ccnaNavigation = navigation.primary.find((item) => item.label === "CCNA");
  const practice = ccnaNavigation.groups.find((group) => group.label === "Practice");
  const referencesAndTools = ccnaNavigation.groups.find(
    (group) => group.label === "References and tools",
  );
  const homepage = await readSource("src/index.njk");
  const hubs = JSON.parse(await readSource("src/_data/examHubs.json"));

  assert.deepEqual(practice.links, [
    {
      label: "200-301 v2.0 practice test",
      url: "/ccna/200-301-v2/practice-test/",
    },
  ]);
  assert.deepEqual(
    referencesAndTools.links.slice(-4).map((link) => link.url),
    [
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/",
      "/ipv6-addressing/",
      "/tools/ipv6-calculator/",
    ],
  );
  assert.match(homepage, /quizCatalog\.byTestId\["CCNA-301-V2"\]/);
  assert.match(homepage, /Start CCNA v2\.0 practice test/);
  assert.equal(
    hubs.ccna.currentResources.links[0].url,
    "/ccna/200-301-v2/practice-test/",
  );
});

test("paged question titles update without a certification-specific branch", async () => {
  const source = await readSource("src/assets/js/quiz/paged-question.js");

  assert.match(source, /\/Practice Test Question \\d\+\//);
  assert.doesNotMatch(source, /Security\\\+ SY0-701 Practice Test Question/);
});
