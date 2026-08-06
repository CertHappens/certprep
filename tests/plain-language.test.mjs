import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

const parseFrontMatterValue = (source, key) => {
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  return frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
};

const findAcronym = (data, id) => {
  for (const group of data.groups ?? []) {
    const entry = (group.entries ?? []).find((candidate) => candidate.id === id);
    if (entry) return entry;
  }
  return null;
};

test("risk appetite and tolerance use the approved plain-language definitions", async () => {
  const securityPlus = await readSource(
    "src/security-plus/sy0-701/study-guide/security-program-management-oversight/index.md"
  );
  const cissp = await readSource(
    "src/cissp/study-guide/security-risk-management/index.md"
  );

  const appetite =
    "Risk appetite** is the amount of possible loss, harm, disruption, or uncertainty an organization is willing to accept while pursuing its goals.";
  const tolerance =
    "Risk tolerance** is the limit for how much loss, harm, delay, or disruption is acceptable in one area. For example, an organization may accept some downtime but set a maximum of two hours.";
  const summary =
    "Risk appetite sets the broad boundary. Risk tolerance turns that boundary into measurable limits.";

  assert.match(securityPlus, new RegExp(appetite.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(securityPlus, new RegExp(tolerance.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(securityPlus, new RegExp(summary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(cissp, /The amount of possible loss, harm, disruption, or uncertainty an organization is willing to accept while pursuing its goals\./);
  assert.match(cissp, /The limit for how much loss, harm, delay, or disruption is acceptable in one area\./);
  assert.match(cissp, new RegExp(summary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(securityPlus, /Risk appetite\*\* describes the amount and type of risk/);
  assert.doesNotMatch(cissp, /The broad amount and type of risk an organization is willing/);
});

test("Security+ uses the approved due care and due diligence definitions", async () => {
  const source = await readSource(
    "src/security-plus/sy0-701/study-guide/security-program-management-oversight/index.md"
  );

  assert.match(
    source,
    /\*\*Due care\*\* is the responsibility to take reasonable and appropriate steps to protect people, assets, and interests from foreseeable harm\./
  );
  assert.match(
    source,
    /\*\*Due diligence\*\* is the ongoing process of investigating, verifying, monitoring, and documenting whether those safeguards remain appropriate and effective\./
  );
  assert.doesNotMatch(source, /Due care\*\* is the reasonable protection and action expected/);
});

test("CISSP architecture and asset definitions lead with ordinary meaning", async () => {
  const architecture = await readSource(
    "src/cissp/study-guide/security-architecture-engineering/index.md"
  );
  const assets = await readSource("src/cissp/study-guide/asset-security/index.md");

  const architectureMarkers = [
    "delivers networking and security controls through cloud services",
    "says how much evidence is needed before the organization can trust that a control was built correctly and still works",
    "stores cryptographic keys and records information about how a device started",
    "Attestation** is evidence another system can check",
    "means being able to find and replace outdated encryption",
  ];
  for (const marker of architectureMarkers) assert.equal(architecture.includes(marker), true);

  assert.match(assets, /Data remanence\*\* means deleted data can still remain on a storage device and may be recoverable/);
  assert.match(assets, /Cloud Access Security Broker \(CASB\)\*\* helps an organization see and control how people use cloud services/);
  assert.doesNotMatch(assets, /Data remanence\*\* is residual information/);
});

test("Security+, Network+, and CCNA guides use the approved direct definitions", async () => {
  const securityConcepts = await readSource(
    "src/security-plus/sy0-701/study-guide/general-security-concepts/index.md"
  );
  const securityThreats = await readSource(
    "src/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.md"
  );
  const networkImplementation = await readSource(
    "src/network-plus/n10-009/study-guide/network-implementation/index.md"
  );
  const monitoring = await readSource(
    "src/network-plus/quick-review/monitoring-evidence/index.md"
  );
  const routing = await readSource(
    "src/ccna/200-301-v2/study-guide/ip-routing/index.md"
  );
  const operations = await readSource(
    "src/ccna/200-301-v2/study-guide/ai-network-operations-management/index.md"
  );

  assert.match(securityConcepts, /stores cryptographic keys and records how a device started/);
  assert.match(securityThreats, /happens when a website sends attacker-controlled script to another user's browser/);
  assert.match(networkImplementation, /wireless network name shared by multiple access points/);
  assert.match(monitoring, /lets monitoring software request status and counters from network devices and receive event notifications/);
  assert.match(routing, /tells a Cisco router which route source to prefer/);
  assert.match(routing, /A \*\*metric\*\* tells a routing protocol which of its available paths it prefers/);
  assert.match(operations, /catalog that describes the information a device can report through SNMP/);
  assert.match(operations, /unique number used to request one item from that catalog/);
});

test("acronym references use matching plain-language meanings", async () => {
  const securityPlus = JSON.parse(await readSource("src/_data/securityPlusAcronyms.json"));
  const networkPlus = JSON.parse(await readSource("src/_data/networkPlusAcronyms.json"));
  const ccna = JSON.parse(await readSource("src/_data/ccnaAcronyms.json"));

  assert.equal(
    findAcronym(securityPlus, "xss")?.meaning,
    "An attack that makes a trusted website send attacker-controlled script to another user's browser."
  );
  assert.equal(
    findAcronym(securityPlus, "tpm")?.meaning,
    "A protected hardware component that stores cryptographic keys and records how a device started."
  );
  assert.equal(
    findAcronym(networkPlus, "essid")?.meaning,
    "The wireless network name shared by multiple access points so users can move between them while staying on the same wireless network."
  );

  for (const data of [networkPlus, ccna]) {
    assert.equal(
      findAcronym(data, "mib")?.meaning,
      "The catalog that describes the information a device can report through SNMP."
    );
    assert.equal(
      findAcronym(data, "oid")?.meaning,
      "The unique number used to request one item from an SNMP management catalog."
    );
  }
});

test("meaningful editorial changes update article metadata and authoring guidance", async () => {
  const changedArticles = [
    "src/security-plus/sy0-701/study-guide/general-security-concepts/index.md",
    "src/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.md",
    "src/security-plus/sy0-701/study-guide/security-program-management-oversight/index.md",
    "src/network-plus/n10-009/study-guide/network-implementation/index.md",
    "src/network-plus/quick-review/monitoring-evidence/index.md",
    "src/ccna/200-301-v2/study-guide/ip-routing/index.md",
    "src/ccna/200-301-v2/study-guide/ai-network-operations-management/index.md",
    "src/cissp/study-guide/security-risk-management/index.md",
    "src/cissp/study-guide/asset-security/index.md",
    "src/cissp/study-guide/security-architecture-engineering/index.md",
  ];

  for (const relative of changedArticles) {
    const source = await readSource(relative);
    assert.equal(parseFrontMatterValue(source, "dateModified"), "2026-08-05");
    assert.doesNotMatch(source, /\u2014/);
  }

  const guidance = await readSource("docs/content-authoring.md");
  assert.match(guidance, /State what it means in ordinary language/);
  assert.match(guidance, /Do not define a term by repeating the same unclear word inside its definition/);
  assert.match(guidance, /possible loss, harm, disruption, uncertainty, or missed objectives/);
});
