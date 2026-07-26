import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputRoot = path.resolve("_site");
const errors = [];

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

const requiredFiles = [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "privacy/index.html",
  "terms/index.html",
  "disclaimer/index.html",
  "contact/index.html",
  "security-plus/index.html",
  "security-plus/acronyms/index.html",
  "network-plus/index.html",
  "network-plus/n10-009/study-guide/index.html",
  "network-plus/n10-009/study-guide/networking-concepts/index.html",
  "network-plus/n10-009/study-guide/network-implementation/index.html",
  "network-plus/n10-009/practice-test/index.html",
  "network-plus/n10-009/practice-test/question/1/index.html",
  "network-plus/n10-009/practice-test/question/50/index.html",
  "security-plus/sy0-701/practice-test/index.html",
  "security-plus/sy0-701/study-guide/index.html",
  "security-plus/sy0-701/study-guide/general-security-concepts/index.html",
  "security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/index.html",
  "security-plus/sy0-701/study-guide/security-architecture/index.html",
  "security-plus/sy0-701/study-guide/security-operations/index.html",
  "security-plus/sy0-701/study-guide/security-program-management-oversight/index.html",
  "_redirects",
  "assets/brand/certhappens-social-card.png",
  "assets/css/site.css",
  "assets/css/print.css",
  "assets/js/print-guide.js",
  "assets/js/acronym-filter.js",
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

  const description = getMeta(html, "description");
  if (!description) {
    fail(`${relative}: missing meta description`);
  }

  const robots = getMeta(html, "robots");
  const isNoIndex = /\bnoindex\b/i.test(robots);

  if (/mailto:/i.test(html)) {
    fail(`${relative}: clickable email link found; public contact addresses must remain text-only`);
  }

  if (/[A-Z0-9._%+-]+@certhappens\.com/i.test(html)) {
    fail(`${relative}: unobscured CertHappens email address found`);
  }

  if (!isNoIndex) {
    const canonical =
      html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ||
      html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)?.[1];

    if (!canonical?.startsWith("https://certhappens.com/")) {
      fail(`${relative}: missing or invalid canonical URL`);
    }

    if (!getMeta(html, "og:image", true)) {
      fail(`${relative}: missing Open Graph image`);
    }
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
      'href="/network-plus/n10-009/practice-test/">Start Network+ practice test</a>'
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

    if (!html.includes('href="/ports-protocols/"')) {
      fail(`${relative}: Network+ hub is missing the shared ports and protocols link`);
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

    if (!html.includes("APS transports network data physically")) {
      fail(`${relative}: Network+ study guide is missing the OSI mnemonic`);
    }

    if (!html.includes('class="table--compact-second-column"')) {
      fail(`${relative}: Network+ domain table is missing the compact second-column utility`);
    }
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
      "/network-plus/n10-009/practice-test/"
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
      "Uninterruptible power supply",
      "/network-plus/n10-009/practice-test/",
      "/network-plus/n10-009/study-guide/networking-concepts/"
    ];

    for (const marker of requiredContent) {
      if (!html.includes(marker)) {
        fail(`${relative}: Network+ Domain 2 guide is missing ${marker}`);
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
      "Recovery time objective"
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
  const expectedUrls = [
    "https://certhappens.com/",
    "https://certhappens.com/security-plus/",
    "https://certhappens.com/security-plus/acronyms/",
    "https://certhappens.com/network-plus/",
    "https://certhappens.com/network-plus/n10-009/study-guide/",
    "https://certhappens.com/network-plus/n10-009/study-guide/networking-concepts/",
    "https://certhappens.com/network-plus/n10-009/study-guide/network-implementation/",
    "https://certhappens.com/network-plus/n10-009/practice-test/",
    "https://certhappens.com/security-plus/sy0-701/practice-test/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/general-security-concepts/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-architecture/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-operations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-program-management-oversight/",
    "https://certhappens.com/privacy/",
    "https://certhappens.com/terms/",
    "https://certhappens.com/disclaimer/",
    "https://certhappens.com/contact/"
  ];

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

  const datedArticleUrls = [
    "https://certhappens.com/security-plus/acronyms/",
    "https://certhappens.com/network-plus/n10-009/study-guide/",
    "https://certhappens.com/network-plus/n10-009/study-guide/networking-concepts/",
    "https://certhappens.com/network-plus/n10-009/study-guide/network-implementation/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/general-security-concepts/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/threats-vulnerabilities-mitigations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-architecture/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-operations/",
    "https://certhappens.com/security-plus/sy0-701/study-guide/security-program-management-oversight/"
  ];

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
