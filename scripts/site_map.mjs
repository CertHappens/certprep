const HUMAN_SITE_MAP_SECTION_RULES = [
  {
    id: "security-plus",
    label: "Security+",
    matches: (url) => url.startsWith("/security-plus/")
  },
  {
    id: "network-plus",
    label: "Network+",
    matches: (url) => url.startsWith("/network-plus/")
  },
  {
    id: "ccna",
    label: "CCNA",
    matches: (url) => url.startsWith("/ccna/")
  },
  {
    id: "cissp",
    label: "CISSP",
    matches: (url) => url.startsWith("/cissp/")
  },
  {
    id: "explore",
    label: "Explore",
    matches: (url) => url.startsWith("/explore/")
  },
  {
    id: "references-tools",
    label: "References and tools",
    matches: (url) => url === "/ports-protocols/" || url.startsWith("/tools/")
  },
  {
    id: "site-information",
    label: "Site information",
    matches: (url) =>
      [
        "/privacy/",
        "/terms/",
        "/copyright/",
        "/disclaimer/",
        "/contact/"
      ].includes(url)
  }
];

export function isPublicSitemapPage(item) {
  if (item?.data?.sitemap === false || !item?.url) {
    return false;
  }

  if (
    item.url.startsWith("/quiz-data/") ||
    item.url.startsWith("/api/") ||
    item.url.endsWith(".xml") ||
    item.url.endsWith(".txt") ||
    item.url.endsWith(".webmanifest") ||
    item.url === "/404.html"
  ) {
    return false;
  }

  return item.url.endsWith("/");
}

export function getPublicSitemapPages(items) {
  return [...items]
    .filter(isPublicSitemapPage)
    .sort((left, right) => left.url.localeCompare(right.url));
}

function flattenNavigation(siteNavigation) {
  const entries = [];

  for (const primaryItem of siteNavigation?.primary ?? []) {
    for (const group of primaryItem.groups ?? []) {
      for (const link of group.links ?? []) {
        entries.push({ label: link.label, url: link.url });
      }
    }

    if (!entries.some((entry) => entry.url === primaryItem.url)) {
      entries.push({ label: primaryItem.label, url: primaryItem.url });
    }
  }

  for (const footerItem of siteNavigation?.footer ?? []) {
    entries.push({ label: footerItem.label, url: footerItem.url });
  }

  return entries;
}

function navigationDetails(siteNavigation) {
  const entries = flattenNavigation(siteNavigation);
  const byUrl = new Map();

  for (const [index, entry] of entries.entries()) {
    if (!byUrl.has(entry.url)) {
      byUrl.set(entry.url, { ...entry, order: index });
    }
  }

  return { entries, byUrl };
}

function normalizedDateValue(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.getTime();
  }

  const text = String(value ?? "").trim();
  if (!text) {
    return 0;
  }

  const date = /^\d{4}-\d{2}-\d{2}$/.test(text)
    ? new Date(`${text}T00:00:00Z`)
    : new Date(text);

  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function closestNavigationOrder(url, navigationEntries) {
  let closest = null;

  for (const [index, entry] of navigationEntries.entries()) {
    if (url === entry.url) {
      return index * 1000;
    }

    if (entry.url !== "/" && url.startsWith(entry.url)) {
      if (!closest || entry.url.length > closest.url.length) {
        closest = { index, url: entry.url };
      }
    }
  }

  return closest ? closest.index * 1000 + 500 : Number.MAX_SAFE_INTEGER;
}

function labelForPage(page, navigationByUrl) {
  const explicitLabel = String(page.data?.siteMapTitle ?? "").trim();
  if (explicitLabel) {
    return explicitLabel;
  }

  const title = String(page.data?.title ?? "").trim();
  if (page.url.startsWith("/explore/") && title) {
    return title;
  }

  const navigationLabel = navigationByUrl.get(page.url)?.label;
  if (navigationLabel) {
    return navigationLabel;
  }

  if (title) {
    return title;
  }

  throw new Error(`Public page ${page.url} requires a title or siteMapTitle.`);
}

function sectionForUrl(url) {
  return (
    HUMAN_SITE_MAP_SECTION_RULES.find((section) => section.matches(url)) ?? {
      id: "more-resources",
      label: "More resources",
      matches: () => true
    }
  );
}

function sortSectionPages(sectionId, left, right) {
  if (sectionId === "explore") {
    if (left.url === "/explore/") {
      return -1;
    }
    if (right.url === "/explore/") {
      return 1;
    }

    const dateDifference = right.publishedAt - left.publishedAt;
    if (dateDifference !== 0) {
      return dateDifference;
    }
  }

  const orderDifference = left.navigationOrder - right.navigationOrder;
  if (orderDifference !== 0) {
    return orderDifference;
  }

  return left.label.localeCompare(right.label);
}

export function buildHumanSitemapSections(items, siteNavigation) {
  const publicPages = getPublicSitemapPages(items).filter(
    (page) => page.url !== "/" && page.url !== "/sitemap/"
  );
  const { entries: navigationEntries, byUrl: navigationByUrl } =
    navigationDetails(siteNavigation);
  const sectionMap = new Map();

  for (const page of publicPages) {
    const section = sectionForUrl(page.url);
    const sitemapPage = {
      label: labelForPage(page, navigationByUrl),
      url: page.url,
      navigationOrder: closestNavigationOrder(page.url, navigationEntries),
      publishedAt: normalizedDateValue(
        page.data?.datePublished ?? page.data?.dateModified ?? page.date
      )
    };

    if (!sectionMap.has(section.id)) {
      sectionMap.set(section.id, {
        id: section.id,
        label: section.label,
        pages: []
      });
    }

    sectionMap.get(section.id).pages.push(sitemapPage);
  }

  const knownSectionOrder = new Map(
    HUMAN_SITE_MAP_SECTION_RULES.map((section, index) => [section.id, index])
  );

  return [...sectionMap.values()]
    .map((section) => ({
      ...section,
      pages: section.pages
        .sort((left, right) => sortSectionPages(section.id, left, right))
        .map(({ navigationOrder, publishedAt, ...page }) => page)
    }))
    .sort(
      (left, right) =>
        (knownSectionOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER) -
          (knownSectionOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER) ||
        left.label.localeCompare(right.label)
    );
}
