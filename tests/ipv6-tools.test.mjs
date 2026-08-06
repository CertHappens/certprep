import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) => readFile(new URL(`../${relative}`, import.meta.url), "utf8");

test("IPv6 reference and calculator use public article routes", async () => {
  const reference = await readSource("src/ipv6-addressing/index.md");
  const calculator = await readSource("src/tools/ipv6-calculator/index.njk");

  assert.match(reference, /permalink: \/ipv6-addressing\//);
  assert.match(reference, /datePublished: 2026-08-06/);
  assert.match(reference, /IPv6 does not use broadcast addresses/);
  assert.match(reference, /RFC 5952/);
  assert.match(reference, /SLAAC/);
  assert.match(reference, /Neighbor Discovery/);
  assert.doesNotMatch(reference, /—/);

  assert.match(calculator, /permalink: \/tools\/ipv6-calculator\//);
  assert.match(calculator, /data-ipv6-calculator/);
  assert.match(calculator, /data-ipv6-child-prefix/);
  assert.match(calculator, /data-ipv6-hextet-body/);
  assert.match(calculator, /src="\/assets\/js\/ipv6-calculator\.js"/);
  assert.match(calculator, /IPv6 does not have a broadcast address/);
  assert.doesNotMatch(calculator, /IPv6[^\n]{0,80}usable hosts?/i);
  assert.doesNotMatch(calculator, /—/);
});

test("Network+ and CCNA navigation include both IPv6 shared resources", async () => {
  const navigation = JSON.parse(await readSource("src/_data/siteNavigation.json"));

  for (const label of ["Network+", "CCNA"]) {
    const menu = navigation.primary.find((item) => item.label === label);
    const group = menu.groups.find((item) => item.label === "References and tools");
    assert.ok(group.links.some((link) => link.url === "/ipv6-addressing/"));
    assert.ok(group.links.some((link) => link.url === "/tools/ipv6-calculator/"));
  }
});

test("homepage and certification resources surface the IPv6 tools", async () => {
  const homepage = await readSource("src/index.njk");
  const networkHub = await readSource("src/network-plus/index.njk");
  const examHubs = JSON.parse(await readSource("src/_data/examHubs.json"));

  for (const source of [homepage, networkHub]) {
    assert.match(source, /\/ipv6-addressing\//);
    assert.match(source, /\/tools\/ipv6-calculator\//);
  }

  assert.ok(examHubs.ccna.currentResources.links.some((item) => item.url === "/ipv6-addressing/"));
  assert.ok(examHubs.ccna.currentResources.links.some((item) => item.url === "/tools/ipv6-calculator/"));
});

test("relevant IPv6 study pages link to the shared reference and calculator", async () => {
  const paths = [
    "src/network-plus/n10-009/study-guide/networking-concepts/index.md",
    "src/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/index.md",
    "src/ccna/quick-review/ipv6-addressing-neighbor-discovery/index.md",
    "src/cissp/study-guide/communication-network-security/index.md",
  ];

  for (const path of paths) {
    const source = await readSource(path);
    assert.match(source, /url: \/ipv6-addressing\//);
    assert.match(source, /url: \/tools\/ipv6-calculator\//);
  }
});
