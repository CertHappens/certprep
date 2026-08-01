import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("_site");
const errors = [];
const googleAnalyticsMeasurementId = "G-7MYVYMG2H1";
const expectsGoogleAnalytics = process.env.CF_PAGES_BRANCH === "main";

function fail(message) {
  errors.push(message);
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

function getMeta(html, name, property = false) {
  const attribute = property ? "property" : "name";
  const expression = new RegExp(
    `<meta\\s+[^>]*${attribute}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    "i"
  );
  const reverseExpression = new RegExp(
    `<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attribute}=["']${name}["'][^>]*>`,
    "i"
  );

  return html.match(expression)?.[1] || html.match(reverseExpression)?.[1] || "";
}

function getNamedInputValues(html, name) {
  const values = [];

  for (const match of html.matchAll(/<input\b[^>]*>/gi)) {
    const tag = match[0];
    const inputName = tag.match(/\bname=["']([^"']+)["']/i)?.[1];

    if (inputName !== name) {
      continue;
    }

    const value = tag.match(/\bvalue=["']([^"']+)["']/i)?.[1];
    if (value !== undefined) {
      values.push(value);
    }
  }

  return values;
}

function verifyQuizResultActions(html, relative, resourcePath, resourceLabel) {
  const requiredMarkers = [
    "What would you like to do next?",
    "Your incorrect and unanswered questions, correct answers, and explanations are listed directly below.",
    'href="#missed-question-review">Jump to missed questions</a>',
    'id="missed-question-review"',
    `href="${resourcePath}">${resourceLabel}</a>`
  ];

  for (const marker of requiredMarkers) {
    if (!html.includes(marker)) {
      fail(`${relative}: completed-test actions are missing ${marker}`);
    }
  }

  const reviewButtonCount = (html.match(/data-quiz-return/g) || []).length;
  if (reviewButtonCount !== 2) {
    fail(`${relative}: expected 2 full-test review actions, found ${reviewButtonCount}`);
  }

  const restartButtonCount = (html.match(/data-quiz-restart/g) || []).length;
  if (restartButtonCount !== 2) {
    fail(`${relative}: expected 2 Start a new test actions, found ${restartButtonCount}`);
  }

  const reviewLabelCount = (html.match(/>Review the full test question by question<\/button>/g) || []).length;
  if (reviewLabelCount !== 2) {
    fail(`${relative}: expected 2 full-test review labels, found ${reviewLabelCount}`);
  }

  const restartLabelCount = (html.match(/>Start a new test<\/button>/g) || []).length;
  if (restartLabelCount !== 2) {
    fail(`${relative}: expected 2 Start a new test labels, found ${restartLabelCount}`);
  }

  const jumpLinkCount = (html.match(/href="#missed-question-review">Jump to missed questions<\/a>/g) || []).length;
  if (jumpLinkCount !== 1) {
    fail(`${relative}: expected 1 Jump to missed questions action, found ${jumpLinkCount}`);
  }

  const domainPosition = html.indexOf('id="domain-results-heading"');
  const nextStepsPosition = html.indexOf('id="quiz-next-steps-heading"');
  const missedReviewPosition = html.indexOf('id="missed-question-review"');

  if (
    domainPosition < 0 ||
    nextStepsPosition < 0 ||
    missedReviewPosition < 0 ||
    !(domainPosition < nextStepsPosition && nextStepsPosition < missedReviewPosition)
  ) {
    fail(`${relative}: result sections are not ordered as score by domain, next steps, then missed-question review`);
  }

  if (html.includes(">Return to test</button>")) {
    fail(`${relative}: retired Return to test label is still present`);
  }

  if (html.includes(">Review this test</button>")) {
    fail(`${relative}: ambiguous Review this test label is still present`);
  }

  if (html.includes(">Start another randomized test</button>")) {
    fail(`${relative}: retired Start another randomized test label is still present`);
  }
}

function localTarget(href) {
  const clean = href.split("#")[0].split("?")[0];

  if (!clean || !clean.startsWith("/") || clean.startsWith("//")) {
    return null;
  }

  if (clean.startsWith("/api/") || clean.startsWith("/quiz-data/")) {
    return null;
  }

  if (clean === "/") {
    return path.join(outputRoot, "index.html");
  }

  if (path.extname(clean)) {
    return path.join(outputRoot, clean.replace(/^\/+/, ""));
  }

  return path.join(outputRoot, clean.replace(/^\/+/, ""), "index.html");
}

const publicPageFiles = [
  "index.html",
  "contact/index.html",
  "cissp/index.html",
  "ccna/index.html",
  "ccna/acronyms/index.html",
  "ccna/commands/index.html",
  "ccna/200-301-v2/study-guide/index.html",
  "ccna/200-301-v2/study-guide/network-infrastructure-connectivity/index.html",
  "ccna/200-301-v2/study-guide/switching-network-access/index.html",
  "ccna/200-301-v2/study-guide/ip-routing/index.html",
  "ccna/200-301-v2/study-guide/network-services-security/index.html",
  "ccna/200-301-v2/study-guide/ai-network-operations-management/index.html",
  "disclaimer/index.html",
  "network-plus/index.html",
  "network-plus/acronyms/index.html",
  "network-plus/n10-009/practice-test/index.html",
  "network-plus/n10-009/study-guide/index.html",
  "network-plus/n10-009/study-guide/ipv4-subnetting/index.html",
  "network-plus/n10-009/study-guide/network-implementation/index.html",
  "network-plus/n10-009/study-guide/network-operations/index.html",
  "network-plus/n10-009/study-guide/network-security/index.html",
  "network-plus/n10-009/study-guide/network-troubleshooting/index.html",
  "network-plus/n10-009/study-guide/networking-concepts/index.html",
  "network-plus/quick-review/index.html",
  "network-plus/quick-review/monitoring-evidence/index.html",
  "network-plus/quick-review/troubleshooting-tools/index.html",
  "network-plus/quick-review/vlans-trunks-stp-lacp/index.html",
  "ports-protocols/index.html",
  "privacy/index.html",
  "security-plus/index.html",
  "security-plus/acronyms/index.html",
  "security-plus/quick-review/index.html",
  "security-plus/quick-review/hashing-encryption-encoding/index.html",
  "security-plus/quick-review/recovery-metrics/index.html",
  "security-plus/quick-review/security-controls/index.html",
  "security-plus/sy0-701/practice-test/index.html",
  "security-plus/sy0-701/study-guide/index.html",
  "security-plus/sy0-701/study-guide/general-security-concepts/index.html",
  "security-plus/sy0-701/study-guide/security-architecture/index.html",
  "security-plus/sy0-701/study-guide/security-operations/index.html",
  "security-plus/sy0-701/study-guide/security-program-management-oversight/index.html",
  "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html",
  "terms/index.html",
  "tools/subnet-calculator/index.html"
];

const articlePageFiles = [
  "ccna/acronyms/index.html",
  "ccna/commands/index.html",
  "ccna/200-301-v2/study-guide/index.html",
  "ccna/200-301-v2/study-guide/network-infrastructure-connectivity/index.html",
  "ccna/200-301-v2/study-guide/switching-network-access/index.html",
  "ccna/200-301-v2/study-guide/ip-routing/index.html",
  "ccna/200-301-v2/study-guide/network-services-security/index.html",
  "ccna/200-301-v2/study-guide/ai-network-operations-management/index.html",
  "network-plus/acronyms/index.html",
  "network-plus/n10-009/study-guide/index.html",
  "network-plus/n10-009/study-guide/ipv4-subnetting/index.html",
  "network-plus/n10-009/study-guide/network-implementation/index.html",
  "network-plus/n10-009/study-guide/network-operations/index.html",
  "network-plus/n10-009/study-guide/network-security/index.html",
  "network-plus/n10-009/study-guide/network-troubleshooting/index.html",
  "network-plus/n10-009/study-guide/networking-concepts/index.html",
  "network-plus/quick-review/monitoring-evidence/index.html",
  "network-plus/quick-review/troubleshooting-tools/index.html",
  "network-plus/quick-review/vlans-trunks-stp-lacp/index.html",
  "ports-protocols/index.html",
  "security-plus/acronyms/index.html",
  "security-plus/quick-review/hashing-encryption-encoding/index.html",
  "security-plus/quick-review/recovery-metrics/index.html",
  "security-plus/quick-review/security-controls/index.html",
  "security-plus/sy0-701/study-guide/index.html",
  "security-plus/sy0-701/study-guide/general-security-concepts/index.html",
  "security-plus/sy0-701/study-guide/security-architecture/index.html",
  "security-plus/sy0-701/study-guide/security-operations/index.html",
  "security-plus/sy0-701/study-guide/security-program-management-oversight/index.html",
  "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html",
  "tools/subnet-calculator/index.html"
];

const publicPageFileSet = new Set(publicPageFiles);

const wholeSitePageMarkers = new Map([
  [
    "index.html",
    [
      "five domain guides, quick reviews, acronyms, subnetting tools",
      "/security-plus/",
      "/network-plus/",
      "/cissp/",
      "/ccna/",
      "/ports-protocols/",
      "/tools/subnet-calculator/"
    ]
  ],
  [
    "cissp/index.html",
    [
      "CISSP Certification Overview",
      "Start with scope, experience, and decision-making",
      "Security and Risk Management",
      "Software Development Security",
      "120 credits during each three-year certification cycle",
      "/security-plus/sy0-701/study-guide/",
      "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    ]
  ],
  [
    "ccna/index.html",
    [
      "CCNA 200-301 Study Resources",
      "Start studying CCNA",
      "/ccna/200-301-v2/study-guide/",
      "/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/",
      "/ccna/200-301-v2/study-guide/switching-network-access/",
      "/ccna/200-301-v2/study-guide/ip-routing/",
      "/ccna/200-301-v2/study-guide/network-services-security/",
      "/ccna/200-301-v2/study-guide/ai-network-operations-management/",
      "/ccna/acronyms/",
      "/ccna/commands/",
      "Use v1.1 through February 2, 2027 and v2.0 starting February 3, 2027",
      "Network Infrastructure and Connectivity",
      "AI, and Network Operations and Management",
      "February 3, 2027",
      "https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccna.html"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/index.html",
    [
      "CCNA 200-301 v2.0 Study Guide",
      "The five CCNA v2.0 domains",
      "/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/",
      "/ccna/200-301-v2/study-guide/switching-network-access/",
      "/ccna/200-301-v2/study-guide/ip-routing/",
      "/ccna/200-301-v2/study-guide/network-services-security/",
      "/ccna/commands/",
      "/ccna/acronyms/",
      "February 3, 2027"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/network-infrastructure-connectivity/index.html",
    [
      "CCNA 200-301 v2.0 Domain 1: Network Infrastructure and Connectivity",
      "Domain 1 objective map",
      "Modified EUI-64",
      "ip helper-address",
      "/tools/subnet-calculator/",
      "/ccna/acronyms/"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/switching-network-access/index.html",
    [
      "CCNA 200-301 v2.0 Domain 2: Switching and Network Access",
      "Domain 2 objective map",
      "show interfaces trunk",
      "show etherchannel summary",
      "Rapid PVST+",
      "spanning-tree guard root",
      "/ccna/commands/",
      "/ccna/acronyms/"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/ip-routing/index.html",
    [
      "CCNA 200-301 v2.0 Domain 3: IP Routing",
      "Domain 3 objective map",
      "show ip route",
      "show ip ospf neighbor",
      "router ospfv3",
      "show standby brief",
      "show vrrp brief",
      "/ccna/acronyms/"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/network-services-security/index.html",
    [
      "CCNA 200-301 v2.0 Domain 4: Network Services and Security",
      "Domain 4 objective map",
      "aaa authentication login default",
      "show ip nat translations",
      "Domain Name System (DNS) records",
      "Internet Key Exchange (IKE)",
      "show ip access-lists",
      "show ip dhcp snooping binding",
      "show ip arp inspection",
      "show port-security interface",
      "/ccna/acronyms/"
    ]
  ],
  [
    "ccna/200-301-v2/study-guide/ai-network-operations-management/index.html",
    [
      "CCNA 200-301 v2.0 Domain 5: AI, Network Operations, and Management",
      "Domain 5 objective map",
      "Agentic artificial intelligence",
      "Infrastructure as Code (IaC)",
      "Network management system (NMS)",
      "cisco.ios.ios_command",
      "%FACILITY-SEVERITY-MNEMONIC",
      "Syslog severity levels",
      "/ccna/acronyms/"
    ]
  ],
  [
    "404.html",
    ["/security-plus/", "/network-plus/", "Return home"]
  ],
  [
    "contact/index.html",
    [
      "/security-plus/sy0-701/practice-test/",
      "/network-plus/n10-009/practice-test/",
      "/privacy/"
    ]
  ],
  [
    "security-plus/index.html",
    ["/cissp/", "See how CISSP widens the security perspective"]
  ],
  [
    "network-plus/index.html",
    ["/ccna/", "See how CCNA builds on Network+"]
  ],
  [
    "security-plus/acronyms/index.html",
    [
      "/security-plus/quick-review/",
      "/ports-protocols/",
      "/security-plus/sy0-701/practice-test/"
    ]
  ],
  [
    "security-plus/quick-review/hashing-encryption-encoding/index.html",
    ["/security-plus/quick-review/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/quick-review/recovery-metrics/index.html",
    ["/security-plus/quick-review/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/quick-review/security-controls/index.html",
    ["/security-plus/quick-review/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/sy0-701/study-guide/general-security-concepts/index.html",
    [
      "/security-plus/quick-review/security-controls/",
      "/security-plus/quick-review/hashing-encryption-encoding/",
      "/security-plus/acronyms/"
    ]
  ],
  [
    "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html",
    ["/security-plus/quick-review/security-controls/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/sy0-701/study-guide/security-architecture/index.html",
    ["/security-plus/quick-review/recovery-metrics/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/sy0-701/study-guide/security-operations/index.html",
    ["/ports-protocols/", "/security-plus/acronyms/"]
  ],
  [
    "security-plus/sy0-701/study-guide/security-program-management-oversight/index.html",
    ["/security-plus/quick-review/recovery-metrics/", "/security-plus/acronyms/"]
  ]
]);

function publicUrlFromOutput(relative) {
  if (relative === "index.html") {
    return "https://certhappens.com/";
  }

  return `https://certhappens.com/${relative.replace(/index\.html$/, "")}`;
}

const requiredFiles = [
  ...publicPageFiles,
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "network-plus/n10-009/practice-test/question/1/index.html",
  "network-plus/n10-009/practice-test/question/50/index.html",
  "security-plus/sy0-701/practice-test/question/1/index.html",
  "security-plus/sy0-701/practice-test/question/50/index.html",
  "_redirects",
  "assets/brand/certhappens-social-card.png",
  "assets/css/site.css",
  "assets/css/navigation.css",
  "assets/css/print.css",
  "assets/js/site-navigation.js",
  "assets/js/print-guide.js",
  "assets/js/acronym-filter.js",
  "assets/js/ports-protocols-filter.js",
  "assets/js/subnet-calculator.js",
  "assets/js/quiz/app.js",
  "assets/js/quiz/results-actions.js",
  "assets/js/quiz/paged-question.js",
  "quiz-data/catalog.json",
  "quiz-data/security-plus/sec-701/manifest.json",
  "quiz-data/security-plus/sec-701/questions.json",
  "quiz-data/network-plus/n10-009/manifest.json",
  "quiz-data/network-plus/n10-009/questions.json"
];

for (const relative of requiredFiles) {
  if (!(await isFile(path.join(outputRoot, relative)))) {
    fail(`Missing required build output: ${relative}`);
  }
}

const generatedQuizSpecs = [
  {
    path: "quiz-data/security-plus/sec-701/manifest.json",
    testId: "SEC-701",
    practiceTestPath: "/security-plus/sy0-701/practice-test"
  },
  {
    path: "quiz-data/network-plus/n10-009/manifest.json",
    testId: "NET-009",
    practiceTestPath: "/network-plus/n10-009/practice-test"
  }
];

const generatedQuizManifests = new Map();

for (const expected of generatedQuizSpecs) {
  const filePath = path.join(outputRoot, expected.path);

  if (!(await isFile(filePath))) {
    continue;
  }

  try {
    const manifest = JSON.parse(await readFile(filePath, "utf8"));
    generatedQuizManifests.set(expected.testId, manifest);

    if (manifest.test?.testId !== expected.testId) {
      fail(`${expected.path}: unexpected test ID`);
    }

    if (manifest.test?.practiceTestPath !== expected.practiceTestPath) {
      fail(`${expected.path}: unexpected practice-test path`);
    }

    if (
      !Number.isInteger(manifest.availableQuestionCount) ||
      manifest.availableQuestionCount < 1
    ) {
      fail(`${expected.path}: invalid approved question count`);
    }

    if (
      !Array.isArray(manifest.questionCountOptions) ||
      manifest.questionCountOptions.length < 1 ||
      manifest.questionCountOptions.some(
        (option) =>
          !Number.isInteger(option) ||
          option < 1 ||
          option > manifest.availableQuestionCount
      )
    ) {
      fail(`${expected.path}: invalid question-count options`);
    }

    if (
      !manifest.questionCountOptions.includes(manifest.defaultQuestionCount)
    ) {
      fail(`${expected.path}: default question count is not an available option`);
    }

    const questionsRelative = String(manifest.questionsFile || "").replace(/^\/+/, "");
    const questionsPath = path.join(outputRoot, questionsRelative);

    if (!(await isFile(questionsPath))) {
      fail(`${expected.path}: questions file is missing`);
      continue;
    }

    const questions = JSON.parse(await readFile(questionsPath, "utf8"));
    if (
      questions.questionCount !== manifest.availableQuestionCount ||
      questions.questions?.length !== manifest.availableQuestionCount
    ) {
      fail(`${expected.path}: manifest and questions file counts do not match`);
    }
  } catch (error) {
    fail(`${expected.path}: invalid generated quiz data (${error.message})`);
  }
}

const siteCssPath = path.join(outputRoot, "assets/css/site.css");
if (await isFile(siteCssPath)) {
  const siteCss = await readFile(siteCssPath, "utf8");

  if (/\.article-body\s+(?:th|td):last-child/.test(siteCss)) {
    fail("site.css: retired article-table last-column sizing rule is present");
  }

  if (!siteCss.includes(".table-scroll") || !siteCss.includes("overflow-x: auto")) {
    fail("site.css: responsive article-table scrolling is missing");
  }

  if (!siteCss.includes("table-layout: auto") || !siteCss.includes("overflow-wrap: anywhere")) {
    fail("site.css: shared article tables are missing flexible wrapping rules");
  }

  const requiredFirstColumnRules = [
    ".article-body th:first-child",
    ".article-body td:first-child",
    "min-width: 6.5rem",
    "overflow-wrap: normal",
    "word-break: normal",
    "hyphens: none"
  ];

  for (const rule of requiredFirstColumnRules) {
    if (!siteCss.includes(rule)) {
      fail(`site.css: article-table first-column rule is missing: ${rule}`);
    }
  }

  const requiredAcronymRules = [
    ".acronym-controls",
    ".acronym-search",
    ".article-toc--compact-grid",
    ".article-toc--compact-grid ol",
    "grid-template-columns: repeat(4, minmax(0, 1fr))",
    ".acronym-entry",
    "grid-template-columns: minmax(6.5rem, 8rem) minmax(0, 1fr)",
    "overflow-wrap: normal",
    "word-break: normal"
  ];

  for (const rule of requiredAcronymRules) {
    if (!siteCss.includes(rule)) {
      fail(`site.css: shared acronym-reference rule is missing: ${rule}`);
    }
  }
}

const navigationCssPath = path.join(outputRoot, "assets/css/navigation.css");
if (await isFile(navigationCssPath)) {
  const navigationCss = await readFile(navigationCssPath, "utf8");
  const requiredNavigationCssRules = [
    ".site-nav-toggle",
    ".primary-nav__details",
    ".primary-nav__submenu",
    ".primary-nav__group-label",
    ".primary-nav__submenu-link",
    "@media screen and (max-width: 48rem)",
    '.site-header[data-nav-enhanced="true"] .primary-nav[data-open="false"]'
  ];

  for (const rule of requiredNavigationCssRules) {
    if (!navigationCss.includes(rule)) {
      fail(`navigation.css: shared navigation rule is missing: ${rule}`);
    }
  }
}

const navigationScriptPath = path.join(outputRoot, "assets/js/site-navigation.js");
if (await isFile(navigationScriptPath)) {
  const navigationScript = await readFile(navigationScriptPath, "utf8");
  const requiredNavigationScriptMarkers = [
    'event.key !== "Escape"',
    'setAttribute("aria-expanded"',
    'window.matchMedia("(max-width: 48rem)")',
    'closeSubmenus(submenu)',
    'setNavigationOpen(false, { returnFocus: true })'
  ];

  for (const marker of requiredNavigationScriptMarkers) {
    if (!navigationScript.includes(marker)) {
      fail(`site-navigation.js: navigation behavior is missing: ${marker}`);
    }
  }
}

const printCssPath = path.join(outputRoot, "assets/css/print.css");
if (await isFile(printCssPath)) {
  const printCss = await readFile(printCssPath, "utf8");

  if (/pre,\s*table,\s*figure\s*\{/.test(printCss)) {
    fail("print.css: whole tables are still blocked from splitting across pages");
  }

  const requiredPrintTableRules = [
    "display: table-header-group",
    "page-break-inside: auto",
    "white-space: normal !important",
    "overflow-wrap: anywhere",
    "border: 0 !important"
  ];

  for (const rule of requiredPrintTableRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: shared printable-table rule is missing: ${rule}`);
    }
  }


  const requiredPrintFirstColumnRules = [
    "th:first-child",
    "td:first-child",
    "min-width: 1.05in !important",
    "word-break: normal !important",
    "hyphens: none !important"
  ];

  for (const rule of requiredPrintFirstColumnRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: printable first-column rule is missing: ${rule}`);
    }
  }


  const requiredCompactSecondColumnRules = [
    ".table--compact-second-column th:nth-child(2)",
    ".table--compact-second-column td:nth-child(2)",
    "min-width: 0.55in !important",
    "white-space: nowrap !important"
  ];

  for (const rule of requiredCompactSecondColumnRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: compact second-column utility is missing: ${rule}`);
    }
  }

  const requiredPrintAdRules = [
    ".ad-slot",
    ".ad-container",
    ".advertisement",
    "[data-ad-slot]",
    "[data-ad-unit]",
    "ins.adsbygoogle"
  ];

  for (const rule of requiredPrintAdRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: printable ad suppression is missing: ${rule}`);
    }
  }

  const requiredAcronymPrintRules = [
    ".acronym-controls",
    ".article-toc",
    ".acronym-entry[hidden]",
    "grid-template-columns: 0.85in minmax(0, 1fr)",
    "break-inside: avoid-page"
  ];

  for (const rule of requiredAcronymPrintRules) {
    if (!printCss.includes(rule)) {
      fail(`print.css: printable acronym-reference rule is missing: ${rule}`);
    }
  }
}

const allFiles = await walk(outputRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));

for (const file of htmlFiles) {
  const relative = path.relative(outputRoot, file);
  const html = await readFile(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();

  if (!title) {
    fail(`${relative}: missing title`);
  }

  const googleTagLoader = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsMeasurementId}`;
  const googleTagLoaderCount = html.split(googleTagLoader).length - 1;
  const googleTagConfigCount = (
    html.match(new RegExp(`gtag\\('config', '${googleAnalyticsMeasurementId}'\\)`, "g")) || []
  ).length;

  if (expectsGoogleAnalytics) {
    if (googleTagLoaderCount !== 1 || googleTagConfigCount !== 1) {
      fail(
        `${relative}: production build must contain exactly one Google Analytics tag for ${googleAnalyticsMeasurementId}`
      );
    }
  } else if (googleTagLoaderCount !== 0 || googleTagConfigCount !== 0) {
    fail(`${relative}: non-main build must not contain the Google Analytics tag`);
  }

  const discouragedPublicSourceHosts = [
    "assets.ctfassets.net",
    "comptiacdn.azureedge.net",
    "files.cmp.optimizely.com",
    "examcompass.com"
  ];

  for (const host of discouragedPublicSourceHosts) {
    if (html.includes(host)) {
      fail(`${relative}: public page still links to a non-canonical exam source host: ${host}`);
    }
  }

  const description = getMeta(html, "description");
  if (!description) {
    fail(`${relative}: missing meta description`);
  }

  const robots = getMeta(html, "robots");
  const isNoIndex = /\bnoindex\b/i.test(robots);
  const isPagedQuestionRoute =
    relative.startsWith("security-plus/sy0-701/practice-test/question/") ||
    relative.startsWith("network-plus/n10-009/practice-test/question/");
  const isPublicPage = publicPageFileSet.has(relative);

  if (expectsGoogleAnalytics) {
    if (isPublicPage && isNoIndex) {
      fail(`${relative}: public production page must remain indexable`);
    }

    if (!isPublicPage && !isNoIndex) {
      fail(`${relative}: non-sitemap production route must remain noindex`);
    }
  } else if (!isNoIndex) {
    fail(`${relative}: preview and local builds must remain noindex`);
  }

  if (/mailto:/i.test(html)) {
    fail(`${relative}: clickable email link found; public contact addresses must remain text-only`);
  }

  if (/[A-Z0-9._%+-]+@certhappens\.com/i.test(html)) {
    fail(`${relative}: unobscured CertHappens email address found`);
  }

  const canonical =
    html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ||
    html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];

  if (!canonical?.startsWith("https://certhappens.com/")) {
    fail(`${relative}: missing or invalid canonical URL`);
  }

  if (!getMeta(html, "og:image", true)) {
    fail(`${relative}: missing Open Graph image`);
  }

  if (!getMeta(html, "twitter:description") || !getMeta(html, "twitter:image")) {
    fail(`${relative}: incomplete Twitter card metadata`);
  }

  if (!html.includes('class="skip-link"') || !html.includes('id="main-content"')) {
    fail(`${relative}: shared skip link or main landmark is missing`);
  }

  if (!html.includes('class="site-footer"')) {
    fail(`${relative}: shared site footer is missing`);
  }

  const requiredNavigationMarkers = [
    'data-site-header',
    'data-site-nav-toggle',
    'aria-controls="primary-navigation"',
    'id="primary-navigation"',
    'data-primary-navigation',
    'id="security-plus-navigation"',
    'id="network-plus-navigation"',
    'id="ccna-navigation"',
    'id="ccna-navigation-group-1">Overview',
    'id="ccna-navigation-group-2">Subnetting',
    'id="ccna-navigation-group-3">Study',
    'id="ccna-navigation-group-4">References',
    'src="/assets/js/site-navigation.js"',
    'href="/cissp/"',
    'href="/ccna/"'
  ];

  for (const marker of requiredNavigationMarkers) {
    if (!html.includes(marker)) {
      fail(`${relative}: shared navigation is missing ${marker}`);
    }
  }

  const navigationSubmenuCount = (html.match(/data-nav-submenu/g) || []).length;
  if (navigationSubmenuCount !== 3) {
    fail(`${relative}: expected 3 certification navigation submenus, found ${navigationSubmenuCount}`);
  }

  const requiredNavigationLinks = [
    "/security-plus/",
    "/security-plus/sy0-701/practice-test/",
    "/security-plus/sy0-701/study-guide/",
    "/security-plus/quick-review/",
    "/security-plus/acronyms/",
    "/network-plus/",
    "/network-plus/n10-009/practice-test/",
    "/network-plus/n10-009/study-guide/",
    "/network-plus/quick-review/",
    "/network-plus/acronyms/",
    "/ports-protocols/",
    "/network-plus/n10-009/study-guide/ipv4-subnetting/",
    "/tools/subnet-calculator/",
    "/ccna/200-301-v2/study-guide/",
    "/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/",
    "/ccna/200-301-v2/study-guide/switching-network-access/",
    "/ccna/200-301-v2/study-guide/ip-routing/",
    "/ccna/200-301-v2/study-guide/network-services-security/",
    "/ccna/200-301-v2/study-guide/ai-network-operations-management/",
    "/ccna/acronyms/",
    "/ccna/commands/",
    "/cissp/",
    "/ccna/"
  ];

  for (const href of requiredNavigationLinks) {
    if (!html.includes(`href="${href}"`)) {
      fail(`${relative}: shared navigation is missing ${href}`);
    }
  }

  const breadcrumbStructuredDataCount = (
    html.match(/"@type"\s*:\s*"BreadcrumbList"/g) || []
  ).length;

  if (isPublicPage && relative !== "index.html" && breadcrumbStructuredDataCount !== 1) {
    fail(`${relative}: expected exactly one breadcrumb structured-data block, found ${breadcrumbStructuredDataCount}`);
  }

  if (relative === "index.html" && breadcrumbStructuredDataCount !== 0) {
    fail(`${relative}: homepage should not contain breadcrumb structured data`);
  }

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) {
    fail(`${relative}: expected exactly one h1, found ${h1Count}`);
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt\s*=/i.test(match[1])) {
      fail(`${relative}: image without alt attribute`);
    }
  }

  for (const match of html.matchAll(
    /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi
  )) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail(`${relative}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
    const target = localTarget(match[1]);
    if (target && !(await isFile(target))) {
      fail(`${relative}: broken internal link ${match[1]}`);
    }
  }

  const wholeSiteMarkers = wholeSitePageMarkers.get(relative) || [];
  for (const marker of wholeSiteMarkers) {
    if (!html.includes(marker)) {
      fail(`${relative}: whole-site audit marker is missing ${marker}`);
    }
  }

  if (html.includes('class="article-body prose"')) {
    const articleTableCount = (html.match(/<table\b/gi) || []).length;
    const tableScrollCount = (
      html.match(/class=["'][^"']*\btable-scroll\b[^"']*["']/gi) || []
    ).length;

    if (articleTableCount > 0 && tableScrollCount !== articleTableCount) {
      fail(
        `${relative}: expected one shared table-scroll wrapper per article table, found ${tableScrollCount} wrappers for ${articleTableCount} tables`
      );
    }

    if (!html.includes('"@type": "Article"')) {
      fail(`${relative}: article page is missing Article structured data`);
    }

    if (!html.includes('"@type": "BreadcrumbList"')) {
      fail(`${relative}: article page is missing breadcrumb structured data`);
    }

    if (!/"datePublished"\s*:\s*"\d{4}-\d{2}-\d{2}"/.test(html)) {
      fail(`${relative}: article page is missing a structured publication date`);
    }

    if (/class=["']article-meta["']/.test(html)) {
      fail(`${relative}: article page contains visible byline or date metadata`);
    }

    if (html.includes("data-print-guide")) {
      if (!html.includes('href="/assets/css/print.css" media="print"')) {
        fail(`${relative}: printable article is missing the shared print stylesheet`);
      }

      if (!html.includes('src="/assets/js/print-guide.js"')) {
        fail(`${relative}: printable article is missing the shared print control script`);
      }

      if (!html.includes('class="site-header__print-title"')) {
        fail(`${relative}: printable article is missing the branded print title`);
      }

      if (!html.includes('class="article-print-button__icon"')) {
        fail(`${relative}: printable article is missing the shared printer icon`);
      }

      if (!html.includes('data-print-icon="printer"')) {
        fail(`${relative}: printable article is missing the standard printer symbol`);
      }

      if (!html.includes('aria-label="Print or save this guide"')) {
        fail(`${relative}: printable article is missing the accessible print-control name`);
      }

      if (!html.includes('<span aria-hidden="true">Print | Save</span>')) {
        fail(`${relative}: printable article is missing the shared Print | Save label`);
      }

      if (html.includes("Print / Save PDF")) {
        fail(`${relative}: printable article contains the retired print-control label`);
      }
    }
  }

  if (relative === "index.html") {
    const requiredHomepageMarkers = [
      "Certification study and practice",
      "Choose an exam and start studying",
      'href="/security-plus/sy0-701/practice-test/">Start Security+ practice test</a>',
      'href="/network-plus/n10-009/practice-test/">Start Network+ practice test</a>',
      'href="/tools/subnet-calculator/">Open the IPv4 subnet calculator</a>',
      'href="/cissp/">Explore the CISSP overview</a>',
      'href="/ccna/">Explore the CCNA overview</a>'
    ];

    for (const marker of requiredHomepageMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: homepage is missing ${marker}`);
      }
    }

    if (html.includes("Free certification practice")) {
      fail(`${relative}: retired free-practice eyebrow is still present`);
    }
  }

  if (relative === "privacy/index.html") {
    const requiredAnalyticsDisclosures = [
      "Cloudflare Web Analytics and Google Analytics 4",
      "first-party cookies or similar browser storage",
      "IP addresses",
      "July 26, 2026"
    ];

    for (const marker of requiredAnalyticsDisclosures) {
      if (!html.includes(marker)) {
        fail(`${relative}: analytics disclosure is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/index.html") {
    if (!/<h1>CompTIA Network\+ N10-009<\/h1>/.test(html)) {
      fail(`${relative}: Network+ hub is missing its expected h1`);
    }

    if (!html.includes('href="/network-plus/n10-009/practice-test/"')) {
      fail(`${relative}: Network+ hub is missing the N10-009 practice-test link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/"')) {
      fail(`${relative}: Network+ hub is missing the N10-009 study-guide link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/networking-concepts/"')) {
      fail(`${relative}: Network+ hub is missing the detailed Domain 1 guide link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/network-implementation/"')) {
      fail(`${relative}: Network+ hub is missing the detailed Domain 2 guide link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/network-operations/"')) {
      fail(`${relative}: Network+ hub is missing the detailed Domain 3 guide link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/network-security/"')) {
      fail(`${relative}: Network+ hub is missing the detailed Domain 4 guide link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/network-troubleshooting/"')) {
      fail(`${relative}: Network+ hub is missing the detailed Domain 5 guide link`);
    }

    if (!html.includes('href="/network-plus/acronyms/"')) {
      fail(`${relative}: Network+ hub is missing the acronyms and terms link`);
    }

    if (!html.includes('href="/network-plus/quick-review/"')) {
      fail(`${relative}: Network+ hub is missing the quick-review link`);
    }

    const featuredQuickReviewLinks = [
      "/network-plus/quick-review/monitoring-evidence/",
      "/network-plus/quick-review/troubleshooting-tools/",
      "/network-plus/quick-review/vlans-trunks-stp-lacp/"
    ];

    for (const href of featuredQuickReviewLinks) {
      if (!html.includes(`href="${href}"`)) {
        fail(`${relative}: Network+ hub is missing featured quick review ${href}`);
      }
    }

    if (!html.includes('href="/ports-protocols/"')) {
      fail(`${relative}: Network+ hub is missing the shared ports and protocols link`);
    }

    if (!html.includes('href="/tools/subnet-calculator/"')) {
      fail(`${relative}: Network+ hub is missing the IPv4 subnet calculator link`);
    }

    if (!html.includes('href="/network-plus/n10-009/study-guide/ipv4-subnetting/"')) {
      fail(`${relative}: Network+ hub is missing the IPv4 subnetting reference link`);
    }

    if (!html.includes('href="/ccna/"')) {
      fail(`${relative}: Network+ hub is missing the CCNA transition link`);
    }
  }



  if (relative === "network-plus/quick-review/index.html") {
    if (!/<h1>Network\+ N10-009 Quick Review<\/h1>/.test(html)) {
      fail(`${relative}: Network+ quick-review hub is missing its expected h1`);
    }

    const requiredQuickReviewLinks = [
      "/network-plus/quick-review/monitoring-evidence/",
      "/network-plus/quick-review/troubleshooting-tools/",
      "/network-plus/quick-review/vlans-trunks-stp-lacp/",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/"
    ];

    for (const href of requiredQuickReviewLinks) {
      if (!html.includes(`href="${href}"`)) {
        fail(`${relative}: quick-review hub is missing ${href}`);
      }
    }
  }

  const networkQuickReviewPages = {
    "network-plus/quick-review/monitoring-evidence/index.html": [
      "Evidence sources at a glance",
      "Simple Network Management Protocol",
      "Flow data",
      "Packet capture",
      "RFC 7011"
    ],
    "network-plus/quick-review/troubleshooting-tools/index.html": [
      "Method before tool",
      "ping",
      "traceroute",
      "Time-domain reflectometer",
      "Optical time-domain reflectometer"
    ],
    "network-plus/quick-review/vlans-trunks-stp-lacp/index.html": [
      "802.1Q trunk",
      "Native VLAN",
      "Inter-VLAN routing",
      "Spanning Tree Protocol",
      "Link Aggregation Control Protocol"
    ]
  };

  if (Object.hasOwn(networkQuickReviewPages, relative)) {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: quick-review guide is missing the shared Print | Save control`);
    }

    if (!html.includes('/network-plus/quick-review/')) {
      fail(`${relative}: quick-review guide is missing its hub link`);
    }

    if (!html.includes('/network-plus/n10-009/practice-test/')) {
      fail(`${relative}: quick-review guide is missing its practice-test link`);
    }

    for (const marker of networkQuickReviewPages[relative]) {
      if (!html.includes(marker)) {
        fail(`${relative}: quick-review guide is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/acronyms/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: acronym reference is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ Acronyms and Terms<\/h1>/.test(html)) {
      fail(`${relative}: acronym reference is missing its stable Network+ h1`);
    }

    const acronymEntryCount = (html.match(/data-acronym-entry/g) || []).length;
    if (acronymEntryCount < 170) {
      fail(`${relative}: expected at least 170 acronym entries, found ${acronymEntryCount}`);
    }

    const requiredAcronymMarkup = [
      "data-acronym-search",
      "data-acronym-clear",
      "data-acronym-status",
      "data-acronym-reference",
      "data-acronym-empty",
      'src="/assets/js/acronym-filter.js"',
      "Context decides the meaning",
      "General Data Protection Regulation",
      "Spanning Tree Protocol",
      "Shielded Twisted Pair",
      "Recovery Time Objective",
      "Bridge Protocol Data Unit",
      "Time-Domain Reflectometer",
      "Wi-Fi Protected Access 3",
      "Automatic Private IP Addressing"
    ];

    for (const marker of requiredAcronymMarkup) {
      if (!html.includes(marker)) {
        fail(`${relative}: acronym reference is missing ${marker}`);
      }
    }

    if (!html.includes('class="article-toc article-toc--compact-grid"')) {
      fail(`${relative}: acronym reference is missing the shared compact sidebar index`);
    }

    if (!html.includes('<h2 id="article-toc-title">Jump to</h2>')) {
      fail(`${relative}: acronym sidebar is missing its Jump to heading`);
    }

    const acronymJumpLinkCount = (html.match(/href=["']#acronyms-[^"']+["']/g) || []).length;
    if (acronymJumpLinkCount !== 23) {
      fail(`${relative}: expected 23 sidebar acronym jump links, found ${acronymJumpLinkCount}`);
    }

    if (html.includes("data-acronym-index")) {
      fail(`${relative}: retired in-body acronym index is still present`);
    }
  }

  if (relative === "network-plus/n10-009/study-guide/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ study guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Study Guide<\/h1>/.test(html)) {
      fail(`${relative}: Network+ study guide is missing its expected h1`);
    }

    if (/<h1[^>]*>\s*CompTIA\b/i.test(html)) {
      fail(`${relative}: Network+ study guide H1 should not present the guide as CompTIA material`);
    }

    const requiredSectionIds = [
      "exam-snapshot",
      "domain-priorities",
      "networking-concepts",
      "network-implementation",
      "network-operations",
      "network-security",
      "network-troubleshooting",
      "practical-study-plan",
      "performance-based-questions",
      "readiness-checklist",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ study guide is missing section #${id}`);
      }
    }

    if (!html.includes('/network-plus/acronyms/')) {
      fail(`${relative}: Network+ study guide is missing the Network+ acronym reference link`);
    }

    if (!html.includes('/network-plus/quick-review/')) {
      fail(`${relative}: Network+ study guide is missing the Network+ quick-review link`);
    }

    if (!html.includes('/ports-protocols/')) {
      fail(`${relative}: Network+ study guide is missing the shared ports and protocols link`);
    }

    if (!html.includes('/network-plus/n10-009/practice-test/')) {
      fail(`${relative}: Network+ study guide is missing its practice-test link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/networking-concepts/')) {
      fail(`${relative}: Network+ study guide is missing its detailed Domain 1 link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/network-implementation/')) {
      fail(`${relative}: Network+ study guide is missing its detailed Domain 2 link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/network-operations/')) {
      fail(`${relative}: Network+ study guide is missing its detailed Domain 3 link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/network-security/')) {
      fail(`${relative}: Network+ study guide is missing its detailed Domain 4 link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/network-troubleshooting/')) {
      fail(`${relative}: Network+ study guide is missing its detailed Domain 5 link`);
    }

    if (!html.includes('/network-plus/n10-009/study-guide/ipv4-subnetting/')) {
      fail(`${relative}: Network+ study guide is missing the IPv4 subnetting reference link`);
    }

    if (!html.includes('/tools/subnet-calculator/')) {
      fail(`${relative}: Network+ study guide is missing the IPv4 subnet calculator link`);
    }

    if (!html.includes('aria-label="Network+ resource chooser"') || !html.includes('class="mobile-card-table"')) {
      fail(`${relative}: Network+ study guide is missing its responsive resource chooser`);
    }

    if (!html.includes("APS transports network data physically")) {
      fail(`${relative}: Network+ study guide is missing the OSI mnemonic`);
    }

    if (!html.includes('class="table--compact-second-column"')) {
      fail(`${relative}: Network+ domain table is missing the compact second-column utility`);
    }
  }



  const networkGuidePages = [
    "network-plus/n10-009/study-guide/networking-concepts/index.html",
    "network-plus/n10-009/study-guide/network-implementation/index.html",
    "network-plus/n10-009/study-guide/network-operations/index.html",
    "network-plus/n10-009/study-guide/network-security/index.html",
    "network-plus/n10-009/study-guide/network-troubleshooting/index.html",
    "network-plus/n10-009/study-guide/ipv4-subnetting/index.html"
  ];

  if (networkGuidePages.includes(relative) && !html.includes('/network-plus/acronyms/')) {
    fail(`${relative}: Network+ guide is missing the Network+ acronym reference link`);
  }

  if (relative === "network-plus/n10-009/study-guide/networking-concepts/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ Domain 1 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Domain 1: Networking Concepts<\/h1>/.test(html)) {
      fail(`${relative}: Network+ Domain 1 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "domain-map",
      "osi-model",
      "devices-functions",
      "cloud-concepts",
      "ports-protocols",
      "traffic-types",
      "media-transceivers",
      "topologies",
      "ipv4-addressing",
      "subnetting",
      "ipv6-addressing",
      "modern-networks",
      "trace-a-session",
      "exam-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ Domain 1 guide is missing section #${id}`);
      }
    }

    const requiredContent = [
      "APS transports network data physically",
      "192.168.40.77/26",
      "2001:db8::42",
      "Infrastructure as code",
      "/ports-protocols/",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ Domain 1 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/study-guide/network-implementation/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ Domain 2 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Domain 2: Network Implementation<\/h1>/.test(html)) {
      fail(`${relative}: Network+ Domain 2 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "domain-map",
      "implementation-workflow",
      "routing-technologies",
      "route-selection",
      "translation-redundancy",
      "switching-technologies",
      "vlans-trunks",
      "aggregation-spanning-tree",
      "interface-settings",
      "wireless-design",
      "wireless-security",
      "physical-installations",
      "implementation-scenarios",
      "exam-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ Domain 2 guide is missing section #${id}`);
      }
    }

    const requiredContent = [
      "floating static route",
      "longest prefix match",
      "802.1Q trunks",
      "Link aggregation",
      "2.4 GHz",
      "uninterruptible power supply",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/networking-concepts/",
      "/network-plus/n10-009/study-guide/network-operations/",
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/",
      "/network-plus/quick-review/vlans-trunks-stp-lacp/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ Domain 2 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/study-guide/network-operations/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ Domain 3 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Domain 3: Network Operations<\/h1>/.test(html)) {
      fail(`${relative}: Network+ Domain 3 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "domain-map",
      "operations-cycle",
      "documentation",
      "lifecycle-change",
      "configuration-management",
      "monitoring-methods",
      "monitoring-solutions",
      "disaster-recovery",
      "availability-sites",
      "network-services",
      "dhcp-slaac",
      "dns",
      "time-services",
      "access-management",
      "operations-scenarios",
      "exam-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ Domain 3 guide is missing section #${id}`);
      }
    }

    const requiredContent = [
      "baseline or golden configuration",
      "SNMPv3",
      "Flow data",
      "Recovery point objective",
      "Discover, Offer, Request, and Acknowledgment",
      "DNS Security Extensions",
      "Network Time Security",
      "out-of-band management",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/network-implementation/",
      "/network-plus/n10-009/study-guide/network-security/",
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/",
      "/ports-protocols/",
      "/network-plus/quick-review/monitoring-evidence/"
    ];

    for (const content of requiredContent) {
      if (!html.includes(content)) {
        fail(`${relative}: Network+ Domain 3 guide is missing ${content}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/study-guide/network-security/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ Domain 4 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Domain 4: Network Security<\/h1>/.test(html)) {
      fail(`${relative}: Network+ Domain 4 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "domain-map",
      "security-decisions",
      "encryption",
      "certificates-pki",
      "identity-access",
      "physical-deception",
      "terminology-compliance",
      "segmentation",
      "network-attacks",
      "layer2-attacks",
      "name-address-attacks",
      "wireless-human-malware",
      "hardening-nac",
      "keys-rules-zones",
      "security-scenarios",
      "exam-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ Domain 4 guide is missing section #${id}`);
      }
    }

    const requiredContent = [
      "Data in transit",
      "Public key infrastructure",
      "RADIUS",
      "TACACS+",
      "least privilege",
      "honeynet",
      "PCI DSS",
      "VLAN hopping",
      "MAC flooding",
      "ARP poisoning",
      "DNS poisoning",
      "rogue DHCP",
      "evil twin",
      "802.1X",
      "screened subnet",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/network-operations/",
      "/network-plus/n10-009/study-guide/network-troubleshooting/",
      "/ports-protocols/",
      "/security-plus/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ Domain 4 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/study-guide/network-troubleshooting/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Network+ Domain 5 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Network\+ N10-009 Domain 5: Network Troubleshooting<\/h1>/.test(html)) {
      fail(`${relative}: Network+ Domain 5 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "domain-map",
      "troubleshooting-method",
      "scope-evidence",
      "cabling-media",
      "interface-counters",
      "poe-transceivers",
      "switching-services",
      "routing-addressing",
      "performance",
      "wireless",
      "software-tools",
      "hardware-tools",
      "device-commands",
      "troubleshooting-scenarios",
      "exam-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Network+ Domain 5 guide is missing section #${id}`);
      }
    }

    const requiredContent = [
      "Establish a theory of probable cause",
      "cyclic redundancy check",
      "Power over Ethernet",
      "error-disabled",
      "Spanning Tree Protocol",
      "Address pool exhaustion",
      "Duplicate IP address",
      "Packet loss",
      "Jitter",
      "Client disassociation",
      "traceroute",
      "Link Layer Discovery Protocol",
      "Visual fault locator",
      "show mac-address-table",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/",
      "/ports-protocols/",
      "/network-plus/quick-review/troubleshooting-tools/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ Domain 5 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/study-guide/ipv4-subnetting/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: IPv4 subnetting reference is missing the shared Print | Save control`);
    }

    if (!/<h1>IPv4 Subnetting Reference for Network\+<\/h1>/.test(html)) {
      fail(`${relative}: IPv4 subnetting reference is missing its expected h1`);
    }

    const requiredSectionIds = [
      "core-model",
      "cidr-reference",
      "powers-of-two",
      "borrowed-bits",
      "block-size",
      "special-ranges",
      "slash-31-32",
      "worked-examples",
      "vlsm",
      "common-mistakes",
      "practice-routine",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: IPv4 subnetting reference is missing section #${id}`);
      }
    }

    const requiredContent = [
      "Borrowed subnet bits",
      "256 - changing mask octet",
      "192.0.2.0/24",
      "RFC 3021",
      "192.168.60.224/31",
      "/tools/subnet-calculator/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: IPv4 subnetting reference is missing ${marker}`);
      }
    }
  }

  if (relative === "ports-protocols/index.html") {
    const requiredPortReferenceMarkers = [
      "data-port-search",
      "data-port-reference",
      'src="/assets/js/ports-protocols-filter.js"',
      '/network-plus/n10-009/study-guide/',
      '/network-plus/acronyms/',
      '/network-plus/quick-review/',
      '/network-plus/n10-009/practice-test/',
      '/security-plus/sy0-701/study-guide/',
      '/security-plus/acronyms/',
      '/security-plus/sy0-701/practice-test/'
    ];

    for (const marker of requiredPortReferenceMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: shared ports reference is missing ${marker}`);
      }
    }
  }

  if (relative === "tools/subnet-calculator/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: IPv4 subnet calculator is missing the shared Print | Save control`);
    }

    if (!/<h1>IPv4 Subnet Calculator<\/h1>/.test(html)) {
      fail(`${relative}: IPv4 subnet calculator is missing its expected h1`);
    }

    const requiredMarkers = [
      'data-subnet-calculator',
      'data-subnet-form',
      'data-subnet-address',
      'data-subnet-mask',
      'data-subnet-results',
      'data-subnet-output="network"',
      'data-subnet-output="broadcast"',
      'data-subnet-output="wildcard"',
      'data-subnet-binary-body',
      'src="/assets/js/subnet-calculator.js"',
      '/network-plus/n10-009/study-guide/ipv4-subnetting/',
      '/network-plus/quick-review/troubleshooting-tools/',
      '/network-plus/'
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: IPv4 subnet calculator is missing ${marker}`);
      }
    }
  }

  if (relative === "security-plus/sy0-701/practice-test/index.html") {
    verifyQuizResultActions(
      html,
      relative,
      "/security-plus/",
      "Return to Security+ resources"
    );
    const requiredPracticeMarkers = [
      "Security+ SY0-701 practice test",
      'data-test-id="SEC-701"',
      'data-questions-url="/quiz-data/security-plus/sec-701/questions.json"'
    ];

    for (const marker of requiredPracticeMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: Security+ practice test is missing ${marker}`);
      }
    }
  }

  if (relative === "network-plus/n10-009/practice-test/index.html") {
    verifyQuizResultActions(
      html,
      relative,
      "/network-plus/",
      "Return to Network+ resources"
    );
    const requiredPracticeMarkers = [
      "Network+ N10-009 practice test",
      'data-test-id="NET-009"',
      'data-questions-url="/quiz-data/network-plus/n10-009/questions.json"'
    ];

    for (const marker of requiredPracticeMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ practice test is missing ${marker}`);
      }
    }

    const manifest = generatedQuizManifests.get("NET-009");
    if (manifest) {
      const questionCountMarker =
        `${manifest.availableQuestionCount}</strong> approved questions`;

      if (!html.includes(questionCountMarker)) {
        fail(
          `${relative}: Network+ practice test does not show the generated approved question count`
        );
      }

      const renderedOptions = getNamedInputValues(html, "question-count").map(Number);
      if (
        renderedOptions.length !== manifest.questionCountOptions.length ||
        renderedOptions.some(
          (option, index) => option !== manifest.questionCountOptions[index]
        )
      ) {
        fail(
          `${relative}: Network+ practice-test lengths do not match the generated manifest`
        );
      }
    }
  }

  if (relative === "security-plus/index.html") {
    if (!html.includes('href="/security-plus/acronyms/"')) {
      fail(`${relative}: Security+ hub is missing the acronyms and terms link`);
    }

    if (!html.includes("Available now") || !html.includes("Open acronyms and terms")) {
      fail(`${relative}: Quick Review card is not marked available`);
    }
  }

  if (relative === "security-plus/acronyms/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: acronym reference is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ Acronyms and Terms<\/h1>/.test(html)) {
      fail(`${relative}: acronym reference is missing its stable Security+ h1`);
    }

    const acronymEntryCount = (html.match(/data-acronym-entry/g) || []).length;
    if (acronymEntryCount < 200) {
      fail(`${relative}: expected at least 200 acronym entries, found ${acronymEntryCount}`);
    }

    const requiredAcronymMarkup = [
      "data-acronym-search",
      "data-acronym-clear",
      "data-acronym-status",
      "data-acronym-reference",
      "data-acronym-empty",
      'src="/assets/js/acronym-filter.js"',
      "Context decides the meaning",
      "Recovery time objective",
      "Attribute-based access control",
      "Maximum tolerable downtime",
      "Demilitarized zone"
    ];

    for (const marker of requiredAcronymMarkup) {
      if (!html.includes(marker)) {
        fail(`${relative}: acronym reference is missing ${marker}`);
      }
    }

    if (!html.includes('class="article-toc article-toc--compact-grid"')) {
      fail(`${relative}: acronym reference is missing the shared compact sidebar index`);
    }

    if (!html.includes('<h2 id="article-toc-title">Jump to</h2>')) {
      fail(`${relative}: acronym sidebar is missing its Jump to heading`);
    }

    const acronymJumpLinkCount = (html.match(/href=["']#acronyms-[^"']+["']/g) || []).length;
    if (acronymJumpLinkCount !== 25) {
      fail(`${relative}: expected 25 sidebar acronym jump links, found ${acronymJumpLinkCount}`);
    }

    if (html.includes("data-acronym-index")) {
      fail(`${relative}: retired in-body acronym index is still present`);
    }

    const sidebarPosition = html.indexOf('class="article-toc article-toc--compact-grid"');
    const articlePosition = html.indexOf('class="article-body prose"');
    const controlsPosition = html.indexOf('class="acronym-controls"');

    if (!(sidebarPosition >= 0 && articlePosition > sidebarPosition && controlsPosition > articlePosition)) {
      fail(`${relative}: acronym sidebar and main reference content are not in the expected two-column order`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: study guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Study Guide<\/h1>/.test(html)) {
      fail(`${relative}: study guide is missing the independent Security+ title`);
    }

    if (/<h1[^>]*>\s*CompTIA\b/i.test(html)) {
      fail(`${relative}: study guide H1 should not present the guide as CompTIA material`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/general-security-concepts/')) {
      fail(`${relative}: study guide is missing its Domain 1 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/')) {
      fail(`${relative}: study guide is missing its Domain 2 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-architecture/')) {
      fail(`${relative}: study guide is missing its Domain 3 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-operations/')) {
      fail(`${relative}: study guide is missing its Domain 4 guide link`);
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-program-management-oversight/')) {
      fail(`${relative}: study guide is missing its Domain 5 guide link`);
    }

    if (!html.includes('/security-plus/acronyms/')) {
      fail(`${relative}: study guide is missing the Security+ acronym reference link`);
    }

    const linkedDomainRows = [
      ["general-security-concepts", "1.0 General Security Concepts"],
      ["threats-vulnerabilities-mitigations", "2.0 Threats, Vulnerabilities, and Mitigations"],
      ["security-architecture", "3.0 Security Architecture"],
      ["security-operations", "4.0 Security Operations"],
      ["security-program-management-oversight", "5.0 Security Program Management and Oversight"]
    ];

    for (const [route, label] of linkedDomainRows) {
      const expectedLink = `<td><a href="/security-plus/sy0-701/study-guide/${route}/">${label}</a></td>`;
      if (!html.includes(expectedLink)) {
        fail(`${relative}: exam-domain table is missing its linked ${label} row`);
      }
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/general-security-concepts/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 1 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 1: General Security Concepts<\/h1>/.test(html)) {
      fail(`${relative}: Domain 1 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "security-controls",
      "core-concepts",
      "zero-trust-physical-deception",
      "change-management",
      "cryptography-pki",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 1 guide is missing section #${id}`);
      }
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 2 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 2: Threats, Vulnerabilities, and Mitigations<\/h1>/.test(html)) {
      fail(`${relative}: Domain 2 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "threat-actors",
      "vectors-surfaces",
      "vulnerabilities",
      "malicious-activity",
      "mitigations",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 2 guide is missing section #${id}`);
      }
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-architecture/')) {
      fail(`${relative}: Domain 2 guide is missing its Domain 3 guide link`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/security-architecture/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 3 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 3: Security Architecture<\/h1>/.test(html)) {
      fail(`${relative}: Domain 3 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "architecture-models",
      "enterprise-infrastructure",
      "data-protection",
      "resilience-recovery",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 3 guide is missing section #${id}`);
      }
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-operations/')) {
      fail(`${relative}: Domain 3 guide is missing its Domain 4 guide link`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/security-operations/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 4 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 4: Security Operations<\/h1>/.test(html)) {
      fail(`${relative}: Domain 4 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "secure-computing",
      "asset-management",
      "vulnerability-management",
      "monitoring-alerting",
      "enterprise-controls",
      "identity-access",
      "automation-orchestration",
      "incident-response",
      "investigation-data",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 4 guide is missing section #${id}`);
      }
    }

    if (!html.includes('/security-plus/sy0-701/study-guide/security-program-management-oversight/')) {
      fail(`${relative}: Domain 4 guide is missing its Domain 5 guide link`);
    }
  }

  if (relative === "security-plus/sy0-701/study-guide/security-program-management-oversight/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: Domain 5 guide is missing the shared Print | Save control`);
    }

    if (!/<h1>Security\+ SY0-701 Domain 5: Security Program Management and Oversight<\/h1>/.test(html)) {
      fail(`${relative}: Domain 5 guide is missing its expected h1`);
    }

    const requiredSectionIds = [
      "security-governance",
      "risk-management",
      "third-party-risk",
      "compliance-privacy",
      "audits-assessments",
      "security-awareness",
      "review-checklist"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: Domain 5 guide is missing section #${id}`);
      }
    }
  }

  if (relative === "cissp/index.html") {
    if (!/<h1>CISSP Certification Overview<\/h1>/.test(html)) {
      fail(`${relative}: expected CISSP overview h1 is missing`);
    }

    const requiredSectionIds = [
      "exam-overview-heading",
      "exam-audience-heading",
      "exam-comparison-heading",
      "exam-domains-heading",
      "exam-experience-heading",
      "exam-preparation-heading",
      "exam-resources-heading",
      "exam-sources-heading"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: reusable exam hub is missing section #${id}`);
      }
    }

    const domainCardCount = (html.match(/class="card__meta">Domain [1-8] ·/g) || []).length;
    if (domainCardCount !== 8) {
      fail(`${relative}: expected 8 CISSP domain cards, found ${domainCardCount}`);
    }

    if (!html.includes("not affiliated with or endorsed by ISC2")) {
      fail(`${relative}: ISC2 independence statement is missing`);
    }
  }

  if (relative === "ccna/index.html") {
    if (!/<h1>CCNA 200-301 Study Resources<\/h1>/.test(html)) {
      fail(`${relative}: expected CCNA resource-hub h1 is missing`);
    }

    const resourceHeadingIndex = html.indexOf('id="exam-resources-heading"');
    const versionHeadingIndex = html.indexOf("Use v1.1 through February 2, 2027 and v2.0 starting February 3, 2027");
    const overviewHeadingIndex = html.indexOf('id="exam-overview-heading"');
    if (resourceHeadingIndex < 0 || versionHeadingIndex < 0 || overviewHeadingIndex < 0) {
      fail(`${relative}: CCNA resource-first section ordering markers are incomplete`);
    } else if (!(resourceHeadingIndex < versionHeadingIndex && resourceHeadingIndex < overviewHeadingIndex)) {
      fail(`${relative}: CCNA study resources must appear before exam-version and overview content`);
    }

    const requiredResourceLinks = [
      "/ccna/200-301-v2/study-guide/",
      "/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/",
      "/ccna/200-301-v2/study-guide/switching-network-access/",
      "/ccna/200-301-v2/study-guide/ip-routing/",
      "/ccna/200-301-v2/study-guide/network-services-security/",
      "/ccna/200-301-v2/study-guide/ai-network-operations-management/",
      "/ccna/acronyms/",
      "/ccna/commands/",
      "/network-plus/n10-009/study-guide/ipv4-subnetting/",
      "/tools/subnet-calculator/",
      "/ports-protocols/"
    ];
    for (const href of requiredResourceLinks) {
      if (!html.includes(`href="${href}"`)) {
        fail(`${relative}: CCNA resource hub is missing ${href}`);
      }
    }

    const requiredSectionIds = [
      "exam-overview-heading",
      "exam-transition-heading",
      "exam-audience-heading",
      "exam-comparison-heading",
      "exam-domains-heading",
      "exam-experience-heading",
      "exam-preparation-heading",
      "exam-resources-heading",
      "exam-sources-heading"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: reusable exam hub is missing section #${id}`);
      }
    }

    const domainCardCount = (html.match(/class="card__meta">Domain [1-5]\.0 ·/g) || []).length;
    if (domainCardCount !== 5) {
      fail(`${relative}: expected 5 CCNA v2.0 domain cards, found ${domainCardCount}`);
    }

    const publishedDomainGuideLinks = [
      ["/ccna/200-301-v2/study-guide/network-infrastructure-connectivity/", "Open Domain 1 guide"],
      ["/ccna/200-301-v2/study-guide/switching-network-access/", "Open Domain 2 guide"],
      ["/ccna/200-301-v2/study-guide/ip-routing/", "Open Domain 3 guide"],
      ["/ccna/200-301-v2/study-guide/network-services-security/", "Open Domain 4 guide"],
      ["/ccna/200-301-v2/study-guide/ai-network-operations-management/", "Open Domain 5 guide"]
    ];
    for (const [href, label] of publishedDomainGuideLinks) {
      if (!html.includes(`href="${href}"`) || !html.includes(label)) {
        fail(`${relative}: published CCNA domain card is missing ${label}`);
      }
    }

    const requiredMarkers = [
      "Last day for v1.1",
      "First day for v2.0",
      "Network+ foundation",
      "25%",
      "20%",
      "10%",
      "Official 200-301 CCNA v2.0 exam topics",
      "One 200-301 exam",
      "30 credits",
      "not affiliated with or endorsed by Cisco"
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: CCNA overview is missing ${marker}`);
      }
    }

    if (!html.includes('href="/ccna/commands/"')) {
      fail(`${relative}: CCNA overview is missing the IOS command reference link`);
    }

    if (html.includes("Planned CCNA v2.0 resources")) {
      fail(`${relative}: CCNA overview still exposes internal roadmap copy`);
    }
  }

  if (relative === "ccna/200-301-v2/study-guide/network-services-security/index.html") {
    if (!/<h1>CCNA 200-301 v2\.0 Domain 4: Network Services and Security<\/h1>/.test(html)) {
      fail(`${relative}: expected CCNA Domain 4 h1 is missing`);
    }

    if (!html.includes('data-print-guide')) {
      fail(`${relative}: CCNA Domain 4 guide is missing the shared Print | Save control`);
    }

    const requiredSectionIds = [
      "domain-map",
      "service-security-model",
      "aaa",
      "file-transfer",
      "nat-pat",
      "dns",
      "ipsec",
      "ipv4-acls",
      "dhcp-snooping",
      "dai",
      "storm-control",
      "ra-guard",
      "port-security",
      "integrated-scenario",
      "common-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: CCNA Domain 4 guide is missing section #${id}`);
      }
    }

    const requiredMarkers = [
      "Authentication, Authorization, and Accounting (AAA)",
      "Terminal Access Controller Access-Control System Plus (TACACS+)",
      "Remote Authentication Dial-In User Service (RADIUS)",
      "SSH File Transfer Protocol (SFTP)",
      "Secure Copy Protocol (SCP)",
      "show ip nat translations",
      "Encapsulating Security Payload (ESP)",
      "Authentication Header (AH)",
      "show ip access-lists",
      "show ip dhcp snooping binding",
      "show ip arp inspection",
      "show storm-control",
      "show ipv6 nd raguard policy",
      "show port-security interface",
      'href="/ccna/acronyms/"'
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: CCNA Domain 4 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "ccna/200-301-v2/study-guide/ai-network-operations-management/index.html") {
    if (!/<h1>CCNA 200-301 v2\.0 Domain 5: AI, Network Operations, and Management<\/h1>/.test(html)) {
      fail(`${relative}: expected CCNA Domain 5 h1 is missing`);
    }

    if (!html.includes('data-print-guide')) {
      fail(`${relative}: CCNA Domain 5 guide is missing the shared Print | Save control`);
    }

    const requiredSectionIds = [
      "domain-map",
      "operations-model",
      "agentic-ai",
      "prompt-selection",
      "management-approaches",
      "snmp",
      "ansible",
      "syslog",
      "integrated-scenario",
      "common-traps",
      "rapid-review",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: CCNA Domain 5 guide is missing section #${id}`);
      }
    }

    const requiredMarkers = [
      "data classification, output format, persona, and instructions",
      "Infrastructure as Code (IaC)",
      "Simple Network Management Protocol (SNMP)",
      "Network management system (NMS)",
      "Management information base (MIB)",
      "Object identifier (OID)",
      "cisco.ios.ios_command",
      "%FACILITY-SEVERITY-MNEMONIC",
      "Emergencies",
      "Debugging",
      'href="/ccna/acronyms/"'
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: CCNA Domain 5 guide is missing ${marker}`);
      }
    }
  }

  if (relative === "ccna/acronyms/index.html") {
    if (!html.includes("data-print-guide")) {
      fail(`${relative}: acronym reference is missing the shared Print | Save control`);
    }

    if (!/<h1>CCNA Acronyms and Terms<\/h1>/.test(html)) {
      fail(`${relative}: acronym reference is missing its stable CCNA h1`);
    }

    const acronymEntryCount = (html.match(/data-acronym-entry/g) || []).length;
    if (acronymEntryCount < 80) {
      fail(`${relative}: expected at least 80 acronym entries, found ${acronymEntryCount}`);
    }

    const requiredAcronymMarkup = [
      "data-acronym-search",
      "data-acronym-clear",
      "data-acronym-status",
      "data-acronym-reference",
      "data-acronym-empty",
      'src="/assets/js/acronym-filter.js"',
      "Context still matters",
      "Open Shortest Path First",
      "Hot Standby Router Protocol",
      "Virtual Router Redundancy Protocol",
      "Link Aggregation Control Protocol",
      "Received Signal Strength Indicator",
      "Terminal Access Controller Access-Control System Plus",
      "Encapsulating Security Payload",
      "Internet Key Exchange",
      "Router Advertisement",
      "Infrastructure as Code",
      "Management Information Base",
      "Network Management System",
      "Object Identifier",
      "YAML Ain't Markup Language"
    ];

    const normalizedAcronymHtml = html
      .replaceAll("&#39;", "'")
      .replaceAll("&apos;", "'");

    for (const marker of requiredAcronymMarkup) {
      if (!normalizedAcronymHtml.includes(marker)) {
        fail(`${relative}: acronym reference is missing ${marker}`);
      }
    }

    if (!html.includes('class="article-toc article-toc--compact-grid"')) {
      fail(`${relative}: acronym reference is missing the shared compact sidebar index`);
    }

    if (!html.includes('<h2 id="article-toc-title">Jump to</h2>')) {
      fail(`${relative}: acronym sidebar is missing its Jump to heading`);
    }

    const acronymJumpLinkCount = (html.match(/href=["']#acronyms-[^"']+["']/g) || []).length;
    if (acronymJumpLinkCount !== 20) {
      fail(`${relative}: expected 20 sidebar acronym jump links, found ${acronymJumpLinkCount}`);
    }

    if (html.includes("data-acronym-index")) {
      fail(`${relative}: retired in-body acronym index is still present`);
    }
  }

  if (relative === "ccna/commands/index.html") {
    if (!/<h1>Core Cisco IOS Verification and Troubleshooting Commands for CCNA 200-301 v2\.0<\/h1>/.test(html)) {
      fail(`${relative}: expected CCNA command reference h1 is missing`);
    }

    if (!html.includes('data-print-guide')) {
      fail(`${relative}: CCNA command reference is missing the shared Print | Save control`);
    }

    const requiredSectionIds = [
      "workflow",
      "command-map",
      "interfaces",
      "vlans-trunks",
      "etherchannel",
      "spanning-tree",
      "neighbors",
      "routing",
      "ospf",
      "dhcp-fhrp",
      "acl-nat",
      "logs-path",
      "sequence",
      "official-references"
    ];

    for (const id of requiredSectionIds) {
      if (!html.includes(`id="${id}"`)) {
        fail(`${relative}: CCNA command reference is missing section #${id}`);
      }
    }

    const requiredMarkers = [
      "show ip interface brief",
      "show interfaces trunk",
      "show etherchannel summary",
      "show spanning-tree",
      "show ip route",
      "show ipv6 route",
      "show ip ospf neighbor",
      "show ospfv3 neighbor",
      "show ip dhcp pool",
      "show ip dhcp binding",
      "show standby brief",
      "show vrrp brief",
      "show ip access-lists",
      "show ip nat translations",
      "show logging",
      'href="/ccna/"',
      'href="/ccna/acronyms/"',
      'href="/network-plus/n10-009/study-guide/ipv4-subnetting/"'
    ];

    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        fail(`${relative}: CCNA command reference is missing ${marker}`);
      }
    }
  }

  if (relative === "cissp/index.html" && html.includes("Possible next CISSP resources")) {
    fail(`${relative}: CISSP overview still exposes internal roadmap copy`);
  }

  const isSecurityPagedQuestion = relative.startsWith(
    "security-plus/sy0-701/practice-test/question/"
  );
  const isNetworkPagedQuestion = relative.startsWith(
    "network-plus/n10-009/practice-test/question/"
  );

  if (isSecurityPagedQuestion || isNetworkPagedQuestion) {
    if (!/<h1\b[^>]*data-paged-position[^>]*>/i.test(html)) {
      fail(`${relative}: paged question heading is missing its dynamic position marker`);
    }

    if (/class=["']paged-quiz__question-id["']/.test(html)) {
      fail(`${relative}: paged question still contains the retired duplicate question-ID wrapper`);
    }

    if (!/\bnoindex\b/i.test(robots)) {
      fail(`${relative}: paged question must remain noindex`);
    }

    const expectedTestId = isNetworkPagedQuestion ? "NET-009" : "SEC-701";
    if (!html.includes(`data-test-id="${expectedTestId}"`)) {
      fail(`${relative}: paged question is missing data-test-id ${expectedTestId}`);
    }
  }
}

if (await isFile(path.join(outputRoot, "quiz-data/catalog.json"))) {
  try {
    const catalog = JSON.parse(
      await readFile(path.join(outputRoot, "quiz-data/catalog.json"), "utf8")
    );
    if (catalog.quizzes?.length !== 2) {
      fail("quiz-data/catalog.json: expected two configured quizzes");
    }
  } catch (error) {
    fail(`quiz-data/catalog.json: invalid JSON (${error.message})`);
  }
}

if (await isFile(path.join(outputRoot, "site.webmanifest"))) {
  try {
    JSON.parse(await readFile(path.join(outputRoot, "site.webmanifest"), "utf8"));
  } catch (error) {
    fail(`site.webmanifest: invalid JSON (${error.message})`);
  }
}

if (await isFile(path.join(outputRoot, "robots.txt"))) {
  const robots = await readFile(path.join(outputRoot, "robots.txt"), "utf8");
  if (!robots.includes("Sitemap: https://certhappens.com/sitemap.xml")) {
    fail("robots.txt: canonical sitemap reference missing");
  }
}

if (await isFile(path.join(outputRoot, "_redirects"))) {
  const redirects = await readFile(path.join(outputRoot, "_redirects"), "utf8");
  const expectedRedirects = [
    "/security-plus/practice-test /security-plus/sy0-701/practice-test/ 302",
    "/security-plus/practice-test/ /security-plus/sy0-701/practice-test/ 302",
    "/network-plus/practice-test /network-plus/n10-009/practice-test/ 302",
    "/network-plus/practice-test/ /network-plus/n10-009/practice-test/ 302"
  ];

  for (const rule of expectedRedirects) {
    if (!redirects.includes(rule)) {
      fail(`_redirects is missing required rule: ${rule}`);
    }
  }
}

if (await isFile(path.join(outputRoot, "sitemap.xml"))) {
  const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
  const expectedUrls = publicPageFiles.map(publicUrlFromOutput);
  const sitemapLocationCount = (sitemap.match(/<loc>/g) || []).length;

  if (sitemapLocationCount !== expectedUrls.length) {
    fail(
      `sitemap.xml: expected ${expectedUrls.length} public URLs, found ${sitemapLocationCount}`
    );
  }

  for (const url of expectedUrls) {
    if (!sitemap.includes(`<loc>${url}</loc>`)) {
      fail(`sitemap.xml: missing ${url}`);
    }
  }

  const excludedQuestionPrefixes = [
    "https://certhappens.com/security-plus/sy0-701/practice-test/question/",
    "https://certhappens.com/network-plus/n10-009/practice-test/question/"
  ];

  for (const prefix of excludedQuestionPrefixes) {
    if (sitemap.includes(`<loc>${prefix}`)) {
      fail(`sitemap.xml: paged question route must remain excluded (${prefix})`);
    }
  }

  const datedArticleUrls = articlePageFiles.map(publicUrlFromOutput);

  for (const url of datedArticleUrls) {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const entry = sitemap.match(
      new RegExp(`<url>[\\s\\S]*?<loc>${escapedUrl}</loc>[\\s\\S]*?</url>`)
    )?.[0];

    if (!entry || !/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(entry)) {
      fail(`sitemap.xml: publication or modification date is missing for ${url}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Site verification failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Site verification passed for ${htmlFiles.length} HTML files.`);
}
