import { readFileSync } from "node:fs";

import { buildExploreArticleCollection } from "./scripts/explore_content.mjs";
import { buildHumanSitemapSections, getPublicSitemapPages } from "./scripts/site_map.mjs";

const siteNavigation = JSON.parse(
  readFileSync(new URL("./src/_data/siteNavigation.json", import.meta.url), "utf8")
);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeDate(value) {
  if (value instanceof Date) {
    return value;
  }

  const text = String(value ?? "").trim();
  if (!text) {
    throw new Error("A date value is required.");
  }

  const date = /^\d{4}-\d{2}-\d{2}$/.test(text)
    ? new Date(`${text}T00:00:00Z`)
    : new Date(text);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${text}`);
  }

  return date;
}

const readableDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
});

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/quiz-data": "quiz-data" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addWatchTarget("src/assets/css");

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("json", (value) =>
    JSON.stringify(value).replaceAll("<", "\\u003c")
  );

  eleventyConfig.addFilter("xmlEscape", escapeXml);

  eleventyConfig.addFilter("htmlDateString", (value) =>
    normalizeDate(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("schemaDateTime", (value) =>
    normalizeDate(value).toISOString()
  );

  eleventyConfig.addFilter("readableDate", (value) =>
    readableDateFormatter.format(normalizeDate(value))
  );

  eleventyConfig.addCollection("exploreArticles", (collectionApi) =>
    buildExploreArticleCollection(collectionApi.getFilteredByTag("exploreArticle"))
  );

  eleventyConfig.addCollection("sitemapPages", (collectionApi) =>
    getPublicSitemapPages(collectionApi.getAll())
  );

  eleventyConfig.addCollection("humanSitemapSections", (collectionApi) =>
    buildHumanSitemapSections(collectionApi.getAll(), siteNavigation)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "md", "njk"]
  };
}
