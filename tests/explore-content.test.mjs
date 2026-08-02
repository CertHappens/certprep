import assert from "node:assert/strict";
import test from "node:test";

import {
  buildExploreArticleCollection,
  validateExploreArticleData,
} from "../scripts/explore_content.mjs";

function article(overrides = {}) {
  return {
    data: {
      title: "Which Technology Career Path Fits You?",
      description: "A practical technology career self-assessment.",
      category: "Career paths",
      exploreStatus: "published",
      permalink: "/explore/career/paths/",
      dateCreated: "2026-08-02",
      datePublished: "2026-08-02",
      dateModified: "2026-08-02",
      ...overrides,
    },
  };
}

test("Explore article metadata accepts the required published fields", () => {
  const validated = validateExploreArticleData(article().data);
  assert.equal(validated.status, "published");
  assert.equal(validated.targetUrl, "/explore/career/paths/");
});

test("draft Explore metadata can omit a publication date", () => {
  const draft = article({
    exploreStatus: "draft",
    datePublished: undefined,
    exploreUrl: "/explore/career/paths/",
    permalink: undefined,
  });

  const validated = validateExploreArticleData(draft.data);
  assert.equal(validated.status, "draft");
  assert.equal(validated.published, null);
});

test("Explore collection excludes drafts and sorts published articles newest first", () => {
  const items = [
    article({ title: "Older article", permalink: "/explore/older/", datePublished: "2026-08-02" }),
    article({ title: "Draft article", permalink: "/explore/draft/", exploreStatus: "draft", datePublished: undefined }),
    article({ title: "Newer article", permalink: "/explore/newer/", dateCreated: "2026-08-03", datePublished: "2026-08-03", dateModified: "2026-08-03" }),
  ];

  const collection = buildExploreArticleCollection(items);
  assert.deepEqual(
    collection.map((item) => item.data.title),
    ["Newer article", "Older article"]
  );
});

test("Explore metadata rejects modification dates before creation", () => {
  assert.throws(
    () => validateExploreArticleData(article({ dateModified: "2026-08-01" }).data),
    /dateModified cannot be earlier/
  );
});

test("Explore metadata rejects category routes outside the Explore section", () => {
  assert.throws(
    () => validateExploreArticleData(article({ permalink: "/career/paths/" }).data),
    /must begin with \/explore\//
  );
});

test("related article links must be complete and usable", () => {
  assert.throws(
    () =>
      validateExploreArticleData(
        article({ relatedArticles: [{ title: "Missing URL" }] }).data
      ),
    /relatedArticles\[0\]\.url is required/
  );
});

test("Explore collection rejects duplicate article URLs", () => {
  assert.throws(
    () => buildExploreArticleCollection([article(), article({ title: "Duplicate route" })]),
    /Duplicate Explore article URL/
  );
});
