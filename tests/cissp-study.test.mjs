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
        {
          label: "Domain 5: Identity & Access",
          url: "/cissp/study-guide/identity-access-management/",
        },
        {
          label: "Domain 6: Assessment & Testing",
          url: "/cissp/study-guide/security-assessment-testing/",
        },
        {
          label: "Domain 7: Security Operations",
          url: "/cissp/study-guide/security-operations/",
        },
        {
          label: "Domain 8: Software Security",
          url: "/cissp/study-guide/software-development-security/",
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
    cissp.currentResources.links.slice(0, 9).map((link) => link.url),
    [
      "/cissp/study-guide/",
      "/cissp/study-guide/security-risk-management/",
      "/cissp/study-guide/asset-security/",
      "/cissp/study-guide/security-architecture-engineering/",
      "/cissp/study-guide/communication-network-security/",
      "/cissp/study-guide/identity-access-management/",
      "/cissp/study-guide/security-assessment-testing/",
      "/cissp/study-guide/security-operations/",
      "/cissp/study-guide/software-development-security/",
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
      {
        number: "5",
        url: "/cissp/study-guide/identity-access-management/",
        linkLabel: "Open Domain 5 guide",
      },
      {
        number: "6",
        url: "/cissp/study-guide/security-assessment-testing/",
        linkLabel: "Open Domain 6 guide",
      },
      {
        number: "7",
        url: "/cissp/study-guide/security-operations/",
        linkLabel: "Open Domain 7 guide",
      },
      {
        number: "8",
        url: "/cissp/study-guide/software-development-security/",
        linkLabel: "Open Domain 8 guide",
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
    {
      source: await readSource(
        "src/cissp/study-guide/identity-access-management/index.md"
      ),
      route: "/cissp/study-guide/identity-access-management/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/security-assessment-testing/index.md"
      ),
      route: "/cissp/study-guide/security-assessment-testing/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/security-operations/index.md"
      ),
      route: "/cissp/study-guide/security-operations/",
    },
    {
      source: await readSource(
        "src/cissp/study-guide/software-development-security/index.md"
      ),
      route: "/cissp/study-guide/software-development-security/",
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
  assert.match(domain, /APS transports network data physically\./);
  assert.match(domain, /TCP\/IP combines the top three OSI layers into its Application layer/);
  assert.match(domain, /combines the bottom two OSI layers into its Network Access layer/);
  assert.doesNotMatch(domain, /All People Seem To Need Data Processing/);
  assert.doesNotMatch(domain, /\u2014/);
});


test("CISSP Domain 5 covers all official objectives, identity areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/identity-access-management/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "identity-access-basics",
    "access-assets",
    "identity-proofing",
    "authentication",
    "sessions-credentials",
    "federation-sso",
    "authorization-models",
    "policy-enforcement",
    "identity-lifecycle",
    "privileged-service-accounts",
    "authentication-systems",
    "ai-identities",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 6; objective += 1) {
    assert.match(domain, new RegExp(`<td>5\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Identification",
    "Authentication",
    "Authorization",
    "Accounting",
    "Identity proofing",
    "Multi-factor authentication",
    "passwordless authentication",
    "Web Authentication",
    "Passkeys",
    "False acceptance rate",
    "False rejection rate",
    "Adaptive authentication",
    "Single sign-on",
    "Federation",
    "SAML",
    "OAuth 2.0",
    "OpenID Connect",
    "SCIM",
    "Role-based access control",
    "Rule-based access control",
    "Mandatory access control",
    "Discretionary access control",
    "Attribute-based access control",
    "Risk-based access control",
    "Policy Decision Point",
    "Policy Enforcement Point",
    "joiner, mover, and leaver",
    "Just-in-time",
    "Privileged Access Management",
    "Service account",
    "Kerberos",
    "LDAP",
    "RADIUS",
    "TACACS+",
    "AI agent",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/63/4/final",
    "https://csrc.nist.gov/pubs/sp/800/63/a/4/final",
    "https://csrc.nist.gov/pubs/sp/800/63/b/4/final",
    "https://csrc.nist.gov/pubs/sp/800/63/c/4/final",
    "https://csrc.nist.gov/pubs/sp/800/162/upd2/final",
    "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/207/final",
    "https://www.rfc-editor.org/rfc/rfc4120",
    "https://www.rfc-editor.org/rfc/rfc6749",
    "https://www.rfc-editor.org/rfc/rfc9700",
    "https://www.rfc-editor.org/rfc/rfc7644",
    "https://openid.net/specs/openid-connect-core-1_0.html",
    "https://www.w3.org/TR/webauthn-3/",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.match(domain, /OAuth is an authorization framework, not a complete user-authentication protocol/);
  assert.match(domain, /A password and two security questions are still one factor/);
  assert.match(domain, /Just-in-time provisioning.*creates or activates an account/s);
  assert.doesNotMatch(domain, /\u2014/);
});


test("CISSP domain-guide body headings use the ToC section numbers while preserving abbreviated labels", async () => {
  const files = [
    "src/cissp/study-guide/security-risk-management/index.md",
    "src/cissp/study-guide/asset-security/index.md",
    "src/cissp/study-guide/security-architecture-engineering/index.md",
    "src/cissp/study-guide/communication-network-security/index.md",
    "src/cissp/study-guide/identity-access-management/index.md",
    "src/cissp/study-guide/security-assessment-testing/index.md",
    "src/cissp/study-guide/security-operations/index.md",
    "src/cissp/study-guide/software-development-security/index.md",
  ];

  for (const file of files) {
    const source = await readSource(file);
    const frontMatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
    const tocBlock = frontMatter.split(/^toc:\n/m)[1]?.split(/^[A-Za-z][A-Za-z0-9_-]*:/m)[0] ?? "";
    const tocIds = [...tocBlock.matchAll(/^  - id:\s*(.+)$/gm)].map((match) => match[1].trim());
    const headings = [...source.matchAll(/<h2 id="([^"]+)">(\d+)\.\s+([^<]+)<\/h2>/g)].map(
      (match) => ({ id: match[1], number: Number(match[2]), title: match[3] })
    );

    assert.ok(tocIds.length > 0, `${file} must define ToC entries`);
    assert.equal(headings.length, tocIds.length, `${file} must number every main body jump point`);
    assert.deepEqual(
      headings.map((heading) => heading.id),
      tocIds,
      `${file} body heading IDs must follow the ToC order`
    );
    assert.deepEqual(
      headings.map((heading) => heading.number),
      tocIds.map((_, index) => index + 1),
      `${file} body heading numbers must match ToC positions`
    );
  }
});


test("CISSP Domain 7 covers all official objectives, operational areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/security-operations/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "investigations",
    "logging-monitoring",
    "intelligence-hunting",
    "configuration-management",
    "operations-foundations",
    "resource-protection",
    "incident-management",
    "detection-prevention",
    "patch-vulnerability",
    "change-management",
    "recovery-strategies",
    "disaster-recovery",
    "recovery-testing",
    "business-continuity",
    "physical-security",
    "personnel-safety",
    "ai-operations",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 15; objective += 1) {
    assert.match(domain, new RegExp(`<td>7\.${objective}<\/td>`));
  }

  const requiredMarkers = [
    "Chain of custody",
    "order of volatility",
    "digital forensic",
    "Security Information and Event Management",
    "Security Orchestration, Automation and Response",
    "Egress monitoring",
    "User and Entity Behavior Analytics",
    "Threat hunting",
    "Configuration drift",
    "Separation of Duties",
    "Privileged accounts",
    "Service-Level Agreement",
    "Incident",
    "Containment",
    "Eradication",
    "Recovery",
    "Web Application Firewall",
    "Intrusion Detection System",
    "Intrusion Prevention System",
    "allowlist",
    "sandbox",
    "honeypot",
    "Vulnerability management",
    "Patch management",
    "Known Exploited Vulnerabilities",
    "Emergency change",
    "Cold site",
    "Warm site",
    "Hot site",
    "High availability",
    "Fault tolerance",
    "Disaster recovery",
    "Business continuity",
    "Full interruption",
    "tailgating",
    "Multi-factor authentication fatigue",
    "Duress",
    "Model drift",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
    "https://csrc.nist.gov/pubs/sp/800/86/final",
    "https://csrc.nist.gov/pubs/sp/800/92/final",
    "https://csrc.nist.gov/pubs/sp/800/137/final",
    "https://csrc.nist.gov/pubs/sp/800/128/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/40/r4/final",
    "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/84/final",
    "https://csrc.nist.gov/pubs/sp/800/94/final",
    "https://csrc.nist.gov/pubs/sp/800/88/r2/final",
    "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
    "https://www.nist.gov/cyberframework",
    "https://www.nist.gov/itl/ai-risk-management-framework",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.match(domain, /People come before data, equipment, and evidence/);
  assert.match(domain, /Disaster recovery\*\* restores information systems and technology services/);
  assert.match(domain, /Business continuity\*\* keeps priority business activities operating/);
  assert.doesNotMatch(domain, /coming soon|possible next|in development/i);
  assert.doesNotMatch(domain, /\u2014/);
});

test("CISSP Domain 6 covers all official objectives, assessment areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/security-assessment-testing/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "strategy-scope",
    "independence-evidence",
    "vulnerability-assessment",
    "penetration-teams",
    "logs-synthetic-benchmarks",
    "code-misuse-interfaces",
    "breach-compliance",
    "process-data",
    "metrics-indicators",
    "analyze-output",
    "reporting",
    "remediation-exceptions",
    "audits",
    "ai-testing",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 5; objective += 1) {
    assert.match(domain, new RegExp(`<td>6\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Vulnerability assessment",
    "Penetration test",
    "red team",
    "blue team",
    "purple team",
    "Black-box testing",
    "Gray-box testing",
    "White-box testing",
    "Log review",
    "synthetic transaction",
    "benchmark",
    "Code review",
    "misuse case",
    "Coverage analysis",
    "Application programming interface",
    "breach and attack simulation",
    "compliance check",
    "Account management",
    "Management review and approval",
    "Key Performance Indicator",
    "Key Risk Indicator",
    "Backup verification",
    "Disaster recovery",
    "Business continuity",
    "Severity",
    "Priority",
    "Remediation",
    "Mitigation",
    "exception",
    "Ethical disclosure",
    "AI red teaming",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/115/final",
    "https://csrc.nist.gov/pubs/sp/800/53/a/r5/final",
    "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/137/final",
    "https://csrc.nist.gov/pubs/sp/800/92/final",
    "https://csrc.nist.gov/pubs/sp/800/84/final",
    "https://csrc.nist.gov/pubs/sp/800/37/r2/final",
    "https://csrc.nist.gov/pubs/ai/100/2/e2025/final",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.match(domain, /KPIs show whether the work is meeting its target/);
  assert.match(domain, /KRIs warn that exposure to harm may be increasing/);
  assert.doesNotMatch(domain, /coming soon|possible next|in development/i);
  assert.doesNotMatch(domain, /\u2014/);
});

test("CISSP Domain 8 covers all official objectives, software-security areas, and primary references", async () => {
  const domain = await readSource(
    "src/cissp/study-guide/software-development-security/index.md"
  );

  const requiredSections = [
    "domain-map",
    "decision-order",
    "secure-sdlc",
    "development-methods",
    "maturity-teams",
    "maintenance-change",
    "development-ecosystem",
    "pipelines-repositories",
    "application-testing",
    "effectiveness",
    "acquired-software",
    "software-supply-chain",
    "secure-coding",
    "api-security",
    "software-defined-security",
    "ai-development",
    "exam-traps",
    "review-checklist",
    "official-references",
  ];

  for (const id of requiredSections) {
    assert.match(domain, new RegExp(`id=["']${id}["']`));
  }

  for (let objective = 1; objective <= 5; objective += 1) {
    assert.match(domain, new RegExp(`<td>8\\.${objective}<\\/td>`));
  }

  const requiredMarkers = [
    "Software Development Life Cycle",
    "Waterfall",
    "Agile",
    "Development and Operations",
    "Development, Security, and Operations",
    "Scaled Agile Framework",
    "Capability Maturity Model",
    "Software Assurance Maturity Model",
    "Integrated Product Team",
    "Technical debt",
    "Integrated Development Environment",
    "Continuous Integration",
    "Continuous Delivery",
    "Software configuration management",
    "code repository",
    "Static Application Security Testing",
    "Dynamic Application Security Testing",
    "Software Composition Analysis",
    "Interactive Application Security Testing",
    "Commercial off-the-shelf",
    "open-source software",
    "Software Bill of Materials",
    "Vulnerability Exploitability eXchange",
    "Software provenance",
    "Input validation",
    "Injection",
    "Application Programming Interface",
    "software-defined security",
    "Infrastructure as code",
    "AI-assisted coding",
    "hallucinated packages",
  ];

  for (const marker of requiredMarkers) {
    assert.match(domain, new RegExp(escapeRegExp(marker), "i"));
  }

  const requiredReferences = [
    "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline",
    "https://csrc.nist.gov/pubs/sp/800/218/final",
    "https://csrc.nist.gov/pubs/sp/800/218/a/final",
    "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final",
    "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final",
    "https://csrc.nist.gov/Projects/ssdf",
    "https://owasp.org/www-project-samm/",
    "https://owasp.org/www-project-application-security-verification-standard/",
    "https://owasp.org/Top10/",
    "https://owasp.org/API-Security/",
  ];

  for (const url of requiredReferences) {
    assert.match(domain, new RegExp(escapeRegExp(url)));
  }

  assert.match(domain, /An SBOM improves visibility\. It does not prove that a component is safe/);
  assert.match(domain, /AI output is untrusted data/);
  assert.match(domain, /Authentication proves an identity\. Authorization decides what that identity may do/);
  assert.doesNotMatch(domain, /coming soon|possible next|in development/i);
  assert.doesNotMatch(domain, /\u2014/);
});

