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
  eleventyConfig.addFilter("readableDate", (value) =>
    readableDateFormatter.format(normalizeDate(value))
  );

  eleventyConfig.addCollection("sitemapPages", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => {
        if (item.data?.sitemap === false || !item.url) {
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
      })
      .sort((left, right) => left.url.localeCompare(right.url))
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
