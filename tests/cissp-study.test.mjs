import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

const parseFrontMatterValue = (source, key) => {
  const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  return frontMatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("CISSP navigation exposes overview and available study guides without an empty practice group", async () => {
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
        {
          label: "Domain 2: Asset Security",
          url: "/cissp/study-guide/asset-security/",
        },
        {
          label: "Domain 3: Architecture",
          url: "/cissp/study-guide/security-architecture-engineering/",
        },
        {
          label: "Domain 4: Network Security",
          url: "/cissp/study-guide/communication-network-security/",
        },
      ],
    },
  ]);
  assert.equal(menu.groups.some((group) => group.label === "Practice"), false);
});

test("CISSP hub promotes the study roadmap and all available domain guides", async () => {
  const hubs = JSON.parse(await readSource("src/_data/examHubs.json"));
  const cissp = hubs.cissp;

  assert.equal(cissp.resourcesFirst, true);
  assert.equal(cissp.sourceReviewed, "2026-08-05");
  assert.deepEqual(
    cissp.currentResources.links.slice(0, 5).map((link) => link.url),
    [
      "/cissp/study-guide/",
      "/cissp/study-guide/security-risk-management/",
      "/cissp/study-guide/asset-security/",
      "/cissp/study-guide/security-architecture-engineering/",
      "/cissp/study-guide/communication-network-security/",
    ]
  );

  const linkedDomains = cissp.domains.filter((domain) => domain.url);
  assert.deepEqual(
    linkedDomains.map(({ number, url, linkLabel }) => ({ number, url, linkLabel })),
    [
      {
        number: "1",
        url: "/cissp/study-guide/security-risk-management/",
        linkLabel: "Open Domain 1 guide",
      },
      {
        number: "2",
        url: "/cissp/study-guide/asset-security/",
        linkLabel: "Open Domain 2 guide",
      },
      {
        number: "3",
        url: "/cissp/study-guide/security-architecture-engineering/",
        linkLabel: "Open Domain 3 guide",
      },
      {
        number: "4",
        url: "/cissp/study-guide/communication-network-security/",
        linkLabel: "Open Domain 4 guide",
      },
    ]
  );
});

test("CISSP study pages use the shared printable article contract and current routes", async () => {
  const pages = [
    {
      source: await readSource("src/cissp/study-guide/index.md"),
      route: "/cissp/study-guide/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/security-risk-management/index.md"
      ),
      route: "/cissp/study-guide/security-risk-management/",
    },
    {
      source: await readSource("src/cissp/study-guide/asset-security/index.md"),
      route: "/cissp/study-guide/asset-security/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/security-architecture-engineering/index.md"
      ),
      route: "/cissp/study-guide/security-architecture-engineering/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/communication-network-security/index.md"
      ),
      route: "/cissp/study-guide/communication-network-security/",
    },
  ];

  for (const { source, route } of pages) {
    assert.equal(parseFrontMatterValue(source, "permalink"), route);
    assert.equal(parseFrontMatterValue(source, "layout"), "layouts/article.njk");
    assert.equal(parseFrontMatterValue(source, "printable"), "true");
    assert.equal(parseFrontMatterValue(source, "author"), "certHappens");
    assert.equal(parseFrontMatterValue(source, "datePublished"), "2026-08-05");
    assert.doesNotMatch(source, /\u2014/);
    assert.doesNotMatch(source, /coming soon|possible next|in development/i);
  }
});

test("CISSP Domain 1 uses noncircular due care and due diligence definitions", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/security-risk-management/index.md"
  );

  assert.match(
    domain,
    /\*\*Due care\*\* is the responsibility to take reasonable and appropriate steps to protect people, assets, and interests from foreseeable harm\./
  );
  assert.match(
    domain,
    /\*\*Due diligence\*\* is the ongoing process of investigating, verifying, monitoring, and documenting whether those safeguards remain appropriate and effective\./
  );
  assert.doesNotMatch(domain, /Due care\*\* is the reasonable care expected/);
  assert.doesNotMatch(domain, /maintain that care/);
  assert.equal(parseFrontMatterValue(domain, "dateModified"), "2026-08-05");
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
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }
});

test("CISSP Domain 2 covers all official objectives, decision areas, and primary references", async () => {
  const domain = await readSource("src/cissp/study-guide/asset-security/index.md");

  const requiredSections = [
    "domain-map",
    "decision-order",
    "classification",
    "handling",
    "provisioning",
    "data-roles",
    "lifecycle",
    "retention",
    "remanence",
    "controls",
    "ai-assets",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 6; objective += 1) {
    assert.match(domain, new RegExp(`<td>2\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Information classification",
    "Asset classification",
    "Data owner",
    "Data controller",
    "Data custodian",
    "Data processor",
    "Data subject",
    "Data remanence",
    "End of Life",
    "End of Support",
    "Digital Rights Management",
    "Data Loss Prevention",
    "Cloud Access Security Broker",
    "At rest",
    "In transit",
    "In use",
    "Clear",
    "Purge",
    "Destroy",
    "training data",
    "model weights",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  assert.match(domain, /In practical terms, the product is no longer sold\./);
  assert.match(
    domain,
    /If replacement parts are still available, they may become harder to find and more expensive\./
  );

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/fips/199/final",
    "https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final",
    "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/88/r2/final",
    "https://csrc.nist.gov/pubs/sp/1800/28/final",
    "https://www.nist.gov/privacy-framework",
    "https://www.nist.gov/itl/ai-risk-management-framework",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }
});


test("CISSP Domain 3 covers all official objectives, architecture areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/security-architecture-engineering/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "secure-design",
    "security-models",
    "control-selection",
    "system-capabilities",
    "architecture-vulnerabilities",
    "cryptography",
    "cryptanalysis",
    "facility-design",
    "facility-controls",
    "system-lifecycle",
    "ai-architecture",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 10; objective += 1) {
    assert.match(domain, new RegExp(`<td>3\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Bell-LaPadula",
    "Biba",
    "Clark-Wilson",
    "Brewer-Nash",
    "Trusted Platform Module",
    "Hardware Security Module",
    "Trusted Execution Environment",
    "Industrial Control System",
    "Internet of Things",
    "Microservices",
    "Container",
    "Serverless",
    "High-Performance Computing",
    "Edge computing",
    "Public Key Infrastructure",
    "Cryptographic agility",
    "Quantum Key Distribution",
    "Side-channel",
    "Heating, Ventilation, and Air Conditioning",
    "Uninterruptible Power Supplies",
    "Verification",
    "Validation",
    "prompt injection",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/160/v1/upd2/final",
    "https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final",
    "https://csrc.nist.gov/pubs/sp/800/207/final",
    "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final",
    "https://csrc.nist.gov/pubs/fips/140-3/final",
    "https://csrc.nist.gov/pubs/fips/203/final",
    "https://csrc.nist.gov/pubs/fips/204/final",
    "https://csrc.nist.gov/pubs/fips/205/final",
    "https://csrc.nist.gov/pubs/sp/800/82/r3/final",
    "https://csrc.nist.gov/pubs/sp/800/190/final",
    "https://csrc.nist.gov/pubs/sp/800/204/a/final",
    "https://csrc.nist.gov/pubs/sp/800/125/a/r1/final",
    "https://www.nist.gov/itl/ai-risk-management-framework",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.doesNotMatch(domain, /\u2014/);
});


test("CISSP Domain 4 covers all official objectives, network areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/communication-network-security/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "models-addressing",
    "secure-protocols",
    "transport-performance",
    "segmentation-flows",
    "edge-wireless",
    "software-defined-cloud",
    "monitoring-management",
    "network-components",
    "communication-channels",
    "ai-networking",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 3; objective += 1) {
    assert.match(domain, new RegExp(`<td>4\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Open Systems Interconnection",
    "Transmission Control Protocol/Internet Protocol",
    "IPv4",
    "IPv6",
    "Unicast",
    "Broadcast",
    "Multicast",
    "Anycast",
    "Internet Protocol Security",
    "Secure Shell",
    "Transport Layer Security",
    "multilayer protocol",
    "converged network",
    "InfiniBand over Ethernet",
    "Compute Express Link",
    "data plane",
    "control plane",
    "management plane",
    "bandwidth",
    "latency",
    "jitter",
    "throughput",
    "signal-to-noise ratio",
    "north-south traffic",
    "east-west traffic",
    "out-of-band management",
    "air-gapped",
    "virtual local area network",
    "virtual private network",
    "Virtual routing and forwarding",
    "Microsegmentation",
    "zero trust",
    "Content delivery network",
    "Software-defined networking",
    "Software-Defined Wide Area Networking",
    "Network functions virtualization",
    "Virtual Private Cloud",
    "Network observability",
    "Network Access Control",
    "Voice over Internet Protocol",
    "Remote access",
    "Third-party connectivity",
    "Network Detection and Response",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/215/final",
    "https://csrc.nist.gov/pubs/sp/800/207/final",
    "https://csrc.nist.gov/pubs/sp/800/52/r2/final",
    "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
    "https://csrc.nist.gov/pubs/sp/800/46/r2/final",
    "https://csrc.nist.gov/pubs/sp/800/153/final",
    "https://csrc.nist.gov/pubs/sp/800/137/final",
    "https://csrc.nist.gov/pubs/sp/800/125/b/final",
    "https://www.rfc-editor.org/rfc/rfc8200",
    "https://www.rfc-editor.org/rfc/rfc4301",
    "https://www.rfc-editor.org/rfc/rfc4251",
    "https://www.rfc-editor.org/rfc/rfc8446",
    "https://www.rfc-editor.org/rfc/rfc7568",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.match(domain, /SSL is obsolete and should not be treated as an acceptable modern protocol/);
  assert.match(domain, /A VLAN creates a separate Layer 2 domain/);
  assert.match(domain, /A VPN protects traffic through the tunnel/);
  assert.doesNotMatch(domain, /\u2014/);
});
