import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

const parseFrontMatterValue = (source, key) => {
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  return frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
};

test("CISSP navigation exposes overview and current study resources without an empty practice group", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));
  const menu = navigation.primary.find((item) => item.label === "CISSP");

  assert.ok(menu);
  assert.equal(menu.menuId, "cissp-navigation");
  assert.deepEqual(menu.groups, [
    {
      label: "Overview",
      links: [{ label: "CISSP hub", url: "/cissp/" }],
    },
    {
      label: "Study",
      links: [
        { label: "Study guide", url: "/cissp/study-guide/" },
        {
          label: "Domain 1: Risk Management",
          url: "/cissp/study-guide/security-risk-management/",
        },
      ],
    },
  ]);
  assert.equal(menu.groups.some((group) => group.label === "Practice"), false);
});

test("CISSP hub promotes current study resources and links only the available domain guide", async () => {
  const hubs = JSON.parse(await readSource("src/_data/examHubs.json"));
  const cissp = hubs.cissp;

  assert.equal(cissp.resourcesFirst, true);
  assert.equal(cissp.sourceReviewed, "2026-08-05");
  assert.deepEqual(
    cissp.currentResources.links.slice(0, 2).map((link) => link.url),
    [
      "/cissp/study-guide/",
      "/cissp/study-guide/security-risk-management/",
    ]
  );

  const linkedDomains = cissp.domains.filter((domain) => domain.url);
  assert.deepEqual(linkedDomains, [
    {
      number: "1",
      name: "Security and Risk Management",
      weight: "16%",
      focus:
        "Ethics, governance, law, policy, risk, supply chains, awareness, and business continuity foundations.",
      url: "/cissp/study-guide/security-risk-management/",
      linkLabel: "Open Domain 1 guide",
    },
  ]);
});

test("CISSP study pages use the shared printable article contract and current routes", async () => {
  const hub = await readSource("src/cissp/study-guide/index.md");
  const domain = await readSource(
    "src/cissp/study-guide/security-risk-management/index.md"
  );

  assert.equal(parseFrontMatterValue(hub, "permalink"), "/cissp/study-guide/");
  assert.equal(
    parseFrontMatterValue(domain, "permalink"),
    "/cissp/study-guide/security-risk-management/"
  );

  for (const source of [hub, domain]) {
    assert.equal(parseFrontMatterValue(source, "layout"), "layouts/article.njk");
    assert.equal(parseFrontMatterValue(source, "printable"), "true");
    assert.equal(parseFrontMatterValue(source, "author"), "certHappens");
    assert.equal(parseFrontMatterValue(source, "datePublished"), "2026-08-05");
    assert.doesNotMatch(source, /\u2014/);
    assert.doesNotMatch(source, /coming soon|possible next|in development/i);
  }
});

test("CISSP Domain 1 covers every official objective area and durable primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/security-risk-management/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "ethics-principles",
    "governance",
    "legal-investigations",
    "policy",
    "business-continuity",
    "personnel-security",
    "risk-management",
    "threat-modeling",
    "supply-chain",
    "awareness",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 12; objective += 1) {
    assert.match(domain, new RegExp(`<td>1\\.${objective}<\\/td>`));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://www.isc2.org/Ethics",
    "https://www.nist.gov/publications/nist-cybersecurity-framework-csf-20",
    "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
    "https://csrc.nist.gov/pubs/sp/800/37/r2/final",
    "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/50/r1/final",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
