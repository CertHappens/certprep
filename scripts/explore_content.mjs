const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const EXPLORE_ROUTE_PATTERN = /^\/explore\/(?:[^?#]+\/)?$/;
const VALID_STATUSES = new Set(["draft", "published"]);

function requireText(value, fieldName) {
  const text = String(value ?? "").trim();
  if (!text) {
    throw new Error(`Explore article ${fieldName} is required.`);
  }
  return text;
}

function parseDate(value, fieldName, { required = true } = {}) {
  const text = String(value ?? "").trim();
  if (!text) {
    if (!required) {
      return null;
    }
    throw new Error(`Explore article ${fieldName} is required.`);
  }

  if (!DATE_ONLY_PATTERN.test(text)) {
    throw new Error(`Explore article ${fieldName} must use YYYY-MM-DD.`);
  }

  const date = new Date(`${text}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Explore article ${fieldName} is invalid.`);
  }

  return date;
}

function validateLinkList(value, fieldName) {
  if (value === undefined) {
    return;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Explore article ${fieldName} must be an array.`);
  }

  value.forEach((link, index) => {
    if (!link || typeof link !== "object") {
      throw new Error(`Explore article ${fieldName}[${index}] must be an object.`);
    }

    requireText(link.title, `${fieldName}[${index}].title`);
    const url = requireText(link.url, `${fieldName}[${index}].url`);
    if (!url.startsWith("/") && !/^https:\/\//.test(url)) {
      throw new Error(`Explore article ${fieldName}[${index}].url must be a local path or HTTPS URL.`);
    }
  });
}

export function validateExploreArticleData(data = {}) {
  const status = requireText(data.exploreStatus, "exploreStatus");
  if (!VALID_STATUSES.has(status)) {
    throw new Error('Explore article exploreStatus must be "draft" or "published".');
  }

  requireText(data.title, "title");
  requireText(data.description, "description");
  requireText(data.category, "category");

  const targetUrl = requireText(data.exploreUrl || data.permalink, "exploreUrl or permalink");
  if (!EXPLORE_ROUTE_PATTERN.test(targetUrl)) {
    throw new Error("Explore article URL must begin with /explore/ and end with a slash.");
  }

  const created = parseDate(data.dateCreated, "dateCreated");
  const modified = parseDate(data.dateModified, "dateModified");
  const published = parseDate(data.datePublished, "datePublished", {
    required: status === "published",
  });

  if (modified < created) {
    throw new Error("Explore article dateModified cannot be earlier than dateCreated.");
  }

  if (published && published < created) {
    throw new Error("Explore article datePublished cannot be earlier than dateCreated.");
  }

  if (published && modified < published) {
    throw new Error("Explore article dateModified cannot be earlier than datePublished.");
  }

  validateLinkList(data.relatedArticles, "relatedArticles");
  validateLinkList(data.relatedLinks, "relatedLinks");

  return {
    status,
    targetUrl,
    created,
    published,
    modified,
  };
}

export function buildExploreArticleCollection(items = []) {
  const publishedItems = [];
  const targetUrls = new Set();

  for (const item of items) {
    const validated = validateExploreArticleData(item.data);
    if (targetUrls.has(validated.targetUrl)) {
      throw new Error(`Duplicate Explore article URL: ${validated.targetUrl}`);
    }
    targetUrls.add(validated.targetUrl);

    if (validated.status === "published") {
      publishedItems.push(item);
    }
  }

  return publishedItems.sort((left, right) => {
    const rightDate = parseDate(right.data.datePublished, "datePublished").getTime();
    const leftDate = parseDate(left.data.datePublished, "datePublished").getTime();

    if (rightDate !== leftDate) {
      return rightDate - leftDate;
    }

    return String(left.data.title).localeCompare(String(right.data.title));
  });
}
