import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildHumanSitemapSections,
  getPublicSitemapPages,
  isPublicSitemapPage
} from "../scripts/site_map.mjs";

const readSource = (relative) =>
  readFile(new URL(`../${relative}`, import.meta.url), "utf8");

function page(url, title, data = {}) {
  return {
    url,
    data: {
      title,
      ...data
    }
  };
}

const navigation = {
  primary: [
    {
      label: "Security+",
      url: "/security-plus/",
      groups: [
        {
          label: "Overview",
          links: [
            { label: "Security+ hub", url: "/security-plus/" }
          ]
        },
        {
          label: "Study",
          links: [
            {
              label: "Quick reviews",
              url: "/security-plus/quick-review/"
            }
          ]
        }
      ]
    },
    {
      label: "Explore",
      url: "/explore/",
      groups: [
        {
          label: "Explore",
          links: [{ label: "Home", url: "/explore/" }]
        }
      ]
    }
  ],
  footer: [
    { label: "Privacy", url: "/privacy/" },
    { label: "Site Map", url: "/sitemap/" }
  ]
};

test("public sitemap filtering remains shared by XML and human site maps", () => {
  assert.equal(isPublicSitemapPage(page("/security-plus/", "Security+")), true);
  assert.equal(
    isPublicSitemapPage(page("/draft/", "Draft", { sitemap: false })),
    false
  );
  assert.equal(isPublicSitemapPage(page("/api/report/", "API")), false);
  assert.equal(isPublicSitemapPage(page("/sitemap.xml", "XML")), false);
  assert.equal(isPublicSitemapPage(page("/404.html", "Missing")), false);

  assert.deepEqual(
    getPublicSitemapPages([
      page("/z/", "Z"),
      page("/a/", "A"),
      page("/robots.txt", "Robots"),
      page("/hidden/", "Hidden", { sitemap: false })
    ]).map((item) => item.url),
    ["/a/", "/z/"]
  );
});

test("human site map groups public pages and uses navigation labels", () => {
  const sections = buildHumanSitemapSections(
    [
      page("/", "Home"),
      page("/sitemap/", "Site Map"),
      page("/security-plus/", "CompTIA Security+ Practice and Study Resources"),
      page("/security-plus/quick-review/", "Security+ Quick Review Guides"),
      page(
        "/security-plus/quick-review/security-controls/",
        "Security Controls Quick Reference"
      ),
      page("/privacy/", "Privacy Policy"),
      page("/new-resource/", "A New Resource")
    ],
    navigation
  );

  assert.deepEqual(
    sections.map((section) => section.label),
    ["Security+", "Site information", "More resources"]
  );
  assert.deepEqual(sections[0].pages, [
    { label: "Security+ hub", url: "/security-plus/" },
    { label: "Quick reviews", url: "/security-plus/quick-review/" },
    {
      label: "Security Controls Quick Reference",
      url: "/security-plus/quick-review/security-controls/"
    }
  ]);
  assert.deepEqual(sections[1].pages, [
    { label: "Privacy", url: "/privacy/" }
  ]);
  assert.deepEqual(sections[2].pages, [
    { label: "A New Resource", url: "/new-resource/" }
  ]);
});

test("Explore articles sort newest first after the landing page", () => {
  const sections = buildHumanSitemapSections(
    [
      page("/explore/", "Explore", { siteMapTitle: "Explore home" }),
      page("/explore/older/", "Older", { datePublished: "2026-08-01" }),
      page("/explore/newer/", "Newer", { datePublished: "2026-08-04" })
    ],
    navigation
  );

  assert.deepEqual(sections[0].pages, [
    { label: "Explore home", url: "/explore/" },
    { label: "Newer", url: "/explore/newer/" },
    { label: "Older", url: "/explore/older/" }
  ]);
});

test("footer and Site Map source use the human-facing route", async () => {
  const siteNavigation = JSON.parse(
    await readSource("src/_data/siteNavigation.json")
  );
  const sitemapTemplate = await readSource("src/sitemap/index.njk");

  assert.deepEqual(
    siteNavigation.footer.find((item) => item.url === "/sitemap/"),
    { label: "Site Map", url: "/sitemap/" }
  );
  assert.match(sitemapTemplate, /permalink: \/sitemap\//);
  assert.match(sitemapTemplate, /collections\.humanSitemapSections/);
  assert.doesNotMatch(sitemapTemplate, /href=["']\/sitemap\.xml/);
});
