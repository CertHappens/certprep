import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import articleData from "../src/explore/career/it-support-or-cybersecurity/it-support-or-cybersecurity.11tydata.js";
import {
  buildScenarioSummary,
  validateScenarioLab,
} from "../src/assets/js/explore/scenario-lab-core.js";

const readSource = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("IT support and cybersecurity scenario lab has six balanced workplace situations", () => {
  const lab = validateScenarioLab(articleData.scenarioLab);
  assert.equal(lab.sizes.length, 3);
  assert.equal(lab.scenarios.length, 6);
  assert.equal(lab.hats.length, 8);
  for (const scenario of lab.scenarios) {
    assert.equal(scenario.options.length, 4);
    assert.equal(
      scenario.options.filter((option) => option.tone === "strong").length,
      1,
      `${scenario.id} should have one strong first move`
    );
    assert.deepEqual(Object.keys(scenario.reveal.ownership).sort(), ["large", "midsize", "small"]);
  }
});

test("scenario summary tracks breadth without grading the visitor", () => {
  const lab = articleData.scenarioLab;
  const answers = Object.fromEntries(
    lab.scenarios.map((scenario) => [scenario.id, scenario.options[0].id])
  );
  const summary = buildScenarioSummary(lab, answers);
  assert.equal(summary.complete, true);
  assert.equal(summary.completedCount, 6);
  assert.equal(summary.totalCount, 6);
  assert.ok(summary.workAreas.length >= 7);
  assert.ok(summary.workAreas.some((area) => area.id === "cybersecurity"));
  assert.ok(summary.workAreas.some((area) => area.id === "continuity"));
  assert.ok(summary.workAreas.some((area) => area.id === "assets"));
});

test("second Explore article uses a compact single-panel scenario lab", async () => {
  const article = await readSource("src/explore/career/it-support-or-cybersecurity/index.md");
  const component = await readSource("src/_includes/components/explore-scenario-lab.njk");
  const controller = await readSource("src/assets/js/explore/scenario-lab.js");
  const css = await readSource("src/assets/css/explore.css");

  assert.match(article, /title: "IT Support or Cybersecurity: Where Should You Start\?"/);
  assert.match(article, /permalink: \/explore\/career\/it-support-or-cybersecurity\//);
  assert.match(article, /everything with a power cable/);
  assert.match(article, /\{% include "components\/explore-scenario-lab\.njk" %\}/);
  assert.match(article, /Generalist Role or Underfunded Catch-All\?/);
  assert.match(JSON.stringify(articleData.scenarioLab), /The budget is cut, but the expectations are not/);
  assert.match(article, /robots: noindex,nofollow,nosnippet/);
  assert.match(article, /\/assets\/css\/explore\.css\?v=\d{8}-\d+/);
  assert.doesNotMatch(article, /explore-scenario-compact\.css/);
  assert.match(article, /sitemap: false/);

  assert.match(component, /data-scenario-lab-data/);
  assert.match(component, /Choose the organization you want to explore/);
  assert.match(component, /role="radiogroup"/);
  assert.match(component, /scenario-lab__company-choice/);
  assert.match(component, /scenario-lab__sizes-label/);
  assert.match(component, /<\/div>\s*<nav class="scenario-lab__navigator"/);
  assert.match(component, /data-scenario-counter/);
  assert.match(component, /data-scenario-heading/);
  assert.match(component, /data-scenario-prompt/);
  assert.match(component, /data-scenario-options/);
  assert.match(component, /scenario-lab__response-block/);
  assert.doesNotMatch(component, /scenario-lab__setup/);
  assert.doesNotMatch(component, /scenario-lab__scenarios/);
  assert.equal((component.match(/data-scenario-panel/g) || []).length, 1);

  assert.match(controller, /window\.sessionStorage/);
  assert.match(controller, /Restart the scenarios\? Your saved choices will be cleared\./);
  assert.match(controller, /buildScenarioSummary\(lab, answers\)/);
  assert.match(controller, /root\.classList\.toggle\("is-complete", complete\)/);
  assert.match(controller, /summaryPanel\.scrollIntoView/);
  assert.match(controller, /options\.replaceChildren/);
  assert.doesNotMatch(controller, /panels\.forEach/);
  assert.doesNotMatch(component, /See what the day covered/);
  assert.match(component, /Restart scenarios/);
  assert.match(component, /Continue reading the article/);
  assert.match(component, /href="#company-size"/);
  assert.match(article, /<h2 id="choose-route">A Practical Way to Start<\/h2>/);

  assert.match(css, /\/\* Single-panel workplace scenario flow \*\//);
  assert.match(css, /\.scenario-lab\s*\{[\s\S]*display:\s*block/);
  assert.match(css, /\.scenario-lab__company-choice\s*\{[\s\S]*display:\s*block[\s\S]*margin-top:\s*1\.25rem/);
  assert.match(css, /\.scenario-lab__company-choice \.scenario-lab__sizes-label\s*\{[\s\S]*margin:\s*0 0 0\.65rem/);
  assert.match(css, /\.scenario-lab__navigator\s*\{[\s\S]*margin:\s*0\.65rem 0 0 !important[\s\S]*padding:\s*0/);
  assert.match(css, /\.scenario-lab__scenario\s*\{[\s\S]*display:\s*block[\s\S]*height:\s*auto/);
  assert.match(css, /\.scenario-lab__prompt\s*\{[\s\S]*margin:\s*0 0 0\.3rem/);
  assert.match(css, /\.scenario-lab__options\s*\{[\s\S]*flex-direction:\s*column[\s\S]*gap:\s*0\.3rem/);
  assert.match(css, /\.scenario-lab__actions\s*\{[\s\S]*margin-top:\s*0\.55rem/);
  assert.match(css, /\.career-comparison-grid/);
});

test("first career article links forward to the second article", async () => {
  const article = await readSource("src/explore/career/paths/index.md");
  assert.match(article, /relatedArticles:[\s\S]*IT Support or Cybersecurity: Where Should You Start\?/);
  assert.match(article, /\/explore\/career\/it-support-or-cybersecurity\//);
  assert.match(article, /toc:[\s\S]*id: related-articles-title[\s\S]*id: related-resources-title/);
});
