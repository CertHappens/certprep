import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import site from "../src/_data/site.js";

const readSource = (relative) => readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("canonical site identity is fixed to CertHappens.com", () => {
  assert.equal(site.url, "https://certhappens.com");
  assert.equal(site.canonicalHost, "certhappens.com");
  assert.deepEqual(site.analyticsHosts, ["certhappens.com", "www.certhappens.com"]);
  assert.equal(site.copyrightStartYear, 2026);
});

test("the shared layout host-gates production analytics", async () => {
  const layout = await readSource("src/_includes/layouts/base.njk");
  assert.match(layout, /data-production-analytics/);
  assert.match(layout, /window\.location\.hostname\.toLowerCase\(\)/);
  assert.match(layout, /allowedHosts\.includes\(currentHost\)/);
  assert.match(layout, /document\.createElement\("script"\)/);
  assert.match(layout, /data-site-origin="\{\{ site\.canonicalHost \}\}"/);
});

test("the shared layout publishes copyright and canonical-origin markers", async () => {
  const layout = await readSource("src/_includes/layouts/base.njk");
  assert.match(layout, /Original CertHappens\.com site build/);
  assert.match(layout, /<meta name="copyright" content="\{\{ copyrightNotice \}\}">/);
  assert.match(layout, /"copyrightHolder"/);
  assert.match(layout, /"copyrightNotice"/);
  assert.match(layout, /"copyrightYear"/);
});

test("footer navigation includes the public copyright route", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  assert.deepEqual(
    navigation.footer.find((item) => item.url === "/copyright/"),
    { label: "Copyright and usage", url: "/copyright/" }
  );
});

test("repository and public usage notices are present", async () => {
  const repositoryNotice = await readSource("COPYRIGHT.md");
  const publicPage = await readSource("src/copyright/index.njk");
  const readme = await readSource("README.md");

  assert.match(repositoryNotice, /not distributed under an open-source license/i);
  assert.match(repositoryNotice, /personal study/i);
  assert.match(repositoryNotice, /copy, mirror, scrape for republication/i);
  assert.match(publicPage, /permalink: \/copyright\//);
  assert.match(publicPage, /Personal study and ordinary sharing are welcome/i);
  assert.match(readme, /\[COPYRIGHT\.md\]\(COPYRIGHT\.md\)/);
});

test("Security+ and Network+ study menus link directly to every domain guide", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const studyLinksFor = (certification) => {
    const menu = navigation.primary.find((item) => item.label === certification);
    const study = menu.groups.find((group) => group.label === "Study");
    return study.links;
  };

  assert.deepEqual(studyLinksFor("Security+"), [
    { label: "Study guide", url: "/security-plus/sy0-701/study-guide/" },
    { label: "Quick reviews", url: "/security-plus/quick-review/" },
    {
      label: "Domain 1: Concepts",
      url: "/security-plus/sy0-701/study-guide/general-security-concepts/",
    },
    {
      label: "Domain 2: Threats & Mitigations",
      url: "/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/",
    },
    {
      label: "Domain 3: Architecture",
      url: "/security-plus/sy0-701/study-guide/security-architecture/",
    },
    {
      label: "Domain 4: Operations",
      url: "/security-plus/sy0-701/study-guide/security-operations/",
    },
    {
      label: "Domain 5: Program Management",
      url: "/security-plus/sy0-701/study-guide/security-program-management-oversight/",
    },
  ]);

  assert.deepEqual(studyLinksFor("Network+"), [
    { label: "Study guide", url: "/network-plus/n10-009/study-guide/" },
    { label: "Quick reviews", url: "/network-plus/quick-review/" },
    {
      label: "Domain 1: Concepts",
      url: "/network-plus/n10-009/study-guide/networking-concepts/",
    },
    {
      label: "Domain 2: Implementation",
      url: "/network-plus/n10-009/study-guide/network-implementation/",
    },
    {
      label: "Domain 3: Operations",
      url: "/network-plus/n10-009/study-guide/network-operations/",
    },
    {
      label: "Domain 4: Security",
      url: "/network-plus/n10-009/study-guide/network-security/",
    },
    {
      label: "Domain 5: Troubleshooting",
      url: "/network-plus/n10-009/study-guide/network-troubleshooting/",
    },
  ]);
});
