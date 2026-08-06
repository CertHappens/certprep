import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) => readFile(new URL(`../${relative}`, import.meta.url), "utf8");

const expectedReviews = [
  {
    title: "IPv6 Addressing and Neighbor Discovery Quick Reference",
    shortTitle: "IPv6 addressing",
    url: "/ccna/quick-review/ipv6-addressing-neighbor-discovery/",
  },
  {
    title: "Route Selection and Static Routing Quick Reference",
    shortTitle: "Route selection",
    url: "/ccna/quick-review/route-selection-static-routing/",
  },
  {
    title: "VLANs, Trunks, Rapid PVST+, and EtherChannel Quick Reference",
    shortTitle: "Switching decisions",
    url: "/ccna/quick-review/vlans-trunks-stp-etherchannel/",
  },
];

test("CCNA navigation adds quick reviews immediately after the study guide", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const ccna = navigation.primary.find((item) => item.label === "CCNA");
  const study = ccna.groups.find((group) => group.label === "Study");

  assert.deepEqual(study.links.slice(0, 2), [
    { label: "200-301 v2.0 study guide", url: "/ccna/200-301-v2/study-guide/" },
    { label: "Quick reviews", url: "/ccna/quick-review/" },
  ]);
});

test("CCNA quick-review data registers three focused guides", async () => {
  const reviews = JSON.parse(await readSource("src/_data/ccnaQuickReviews.json"));
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

test("CCNA quick-review hub renders from shared data and links study resources", async () => {
  const hub = await readSource("src/ccna/quick-review/index.njk");
  assert.match(hub, /CCNA 200-301 v2\.0 Quick Review/);
  assert.match(hub, /for guide in ccnaQuickReviews/);
  assert.match(hub, /\/ccna\/200-301-v2\/practice-test\//);
  assert.match(hub, /\/ccna\/200-301-v2\/study-guide\//);
  assert.match(hub, /\/ccna\/commands\//);
  assert.match(hub, /\/ccna\/acronyms\//);
});

const sourceSpecs = [
  {
    path: "src/ccna/quick-review/ipv6-addressing-neighbor-discovery/index.md",
    markers: ["Neighbor Discovery", "Modified EUI-64", "show ipv6 neighbors", "Router Advertisement"],
  },
  {
    path: "src/ccna/quick-review/route-selection-static-routing/index.md",
    markers: ["longest matching installed prefix", "administrative distance", "floating static", "show ip route"],
  },
  {
    path: "src/ccna/quick-review/vlans-trunks-stp-etherchannel/index.md",
    markers: ["Rapid PVST+", "show etherchannel summary", "BPDU Guard", "Loop Guard"],
  },
];

for (const spec of sourceSpecs) {
  test(`${spec.path} follows the quick-review article contract`, async () => {
    const source = await readSource(spec.path);
    assert.match(source, /layout: layouts\/article\.njk/);
    assert.match(source, /printable: true/);
    assert.match(source, /datePublished: 2026-08-05/);
    assert.match(source, /dateModified: 2026-08-05/);
    assert.match(source, /url: \/ccna\/quick-review\//);
    assert.match(source, /url: \/ccna\/200-301-v2\/practice-test\//);
    assert.doesNotMatch(source, /—/);

    for (const marker of spec.markers) {
      assert.match(source, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    }
  });
}

test("CCNA hub and study guide surface the quick-review section", async () => {
  const examHubs = JSON.parse(await readSource("src/_data/examHubs.json"));
  const hubSource = await readSource("src/ccna/index.njk");
  const studyGuide = await readSource("src/ccna/200-301-v2/study-guide/index.md");

  assert.ok(examHubs.ccna.currentResources.links.some((item) => item.url === "/ccna/quick-review/"));
  assert.match(hubSource, /focused quick reviews/);
  assert.match(studyGuide, /CCNA Quick Review Guides/);
  assert.match(studyGuide, /\/ccna\/quick-review\//);
});
