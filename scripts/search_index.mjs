import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SEARCH_EXCLUDED_PATHS = new Set(["/search/", "/sitemap/"]);

function decodeHtmlEntities(value) {
  const named = new Map([
    ["amp", "&"],
    ["apos", "'"],
    ["gt", ">"],
    ["hellip", "…"],
    ["laquo", "«"],
    ["ldquo", "“"],
    ["lsquo", "‘"],
    ["lt", "<"],
    ["mdash", "—"],
    ["nbsp", " "],
    ["ndash", "–"],
    ["quot", '"'],
    ["raquo", "»"],
    ["rdquo", "”"],
    ["rsquo", "’"]
  ]);

  return String(value ?? "").replace(
    /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi,
    (entity, code) => {
      if (code.startsWith("#x") || code.startsWith("#X")) {
        return String.fromCodePoint(Number.parseInt(code.slice(2), 16));
      }
      if (code.startsWith("#")) {
        return String.fromCodePoint(Number.parseInt(code.slice(1), 10));
      }
      return named.get(code.toLowerCase()) ?? entity;
    }
  );
}

function textFromHtml(value) {
  return decodeHtmlEntities(
    String(value ?? "")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/p\s*>/gi, " ")
      .replace(/<\/li\s*>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function attributeValue(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    tag.match(new RegExp(`\\b${escaped}=["']([^"']*)["']`, "i"))?.[1] ?? ""
  );
}

function metaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if (attributeValue(tag, "name").toLowerCase() === name.toLowerCase()) {
      return decodeHtmlEntities(attributeValue(tag, "content"));
    }
  }
  return "";
}

function mainHtml(html) {
  return (
    html.match(/<main\b[^>]*id=["']main-content["'][^>]*>([\s\S]*?)<\/main>/i)?.[1] ??
    ""
  );
}

function headingEntries(html) {
  const headings = [];
  const seen = new Set();
  for (const match of html.matchAll(/<h([1-3])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)) {
    const text = textFromHtml(match[3]);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    headings.push({
      text,
      id: decodeHtmlEntities(attributeValue(match[2], "id"))
    });
  }
  return headings;
}

function pageTypeForUrl(url) {
  if (url === "/") return "Home";
  if (/\/practice-test\/$/.test(url)) return "Practice test";
  if (/\/quick-review\/$/.test(url)) return "Quick reviews";
  if (url.includes("/quick-review/")) return "Quick review";
  if (/\/study-guide\/$/.test(url)) return "Study guide";
  if (url.includes("/study-guide/")) return "Domain guide";
  if (url.includes("/acronyms/") || url.includes("/commands/")) return "Reference";
  if (url === "/ports-protocols/" || url === "/ipv6-addressing/") return "Reference";
  if (url.startsWith("/tools/")) return "Tool";
  if (url === "/explore/") return "Explore";
  if (url.startsWith("/explore/")) return "Explore article";
  if (["/security-plus/", "/network-plus/", "/ccna/", "/cissp/"].includes(url)) {
    return "Certification hub";
  }
  if (["/privacy/", "/terms/", "/copyright/", "/disclaimer/", "/contact/"].includes(url)) {
    return "Site information";
  }
  return "Page";
}

function sectionForUrl(url) {
  if (url.startsWith("/security-plus/")) return "Security+";
  if (url.startsWith("/network-plus/")) return "Network+";
  if (url.startsWith("/ccna/")) return "CCNA";
  if (url.startsWith("/cissp/")) return "CISSP";
  if (url.startsWith("/explore/")) return "Explore";
  if (url === "/" || url.startsWith("/tools/") || url === "/ports-protocols/" || url === "/ipv6-addressing/") {
    return "Shared resource";
  }
  return "Site";
}

function outputFileForUrl(outputDir, url) {
  if (url === "/") {
    return path.join(outputDir, "index.html");
  }
  return path.join(outputDir, url.replace(/^\/+|\/+$/g, ""), "index.html");
}

export function searchPageFromHtml(html, url) {
  const main = mainHtml(html);
  if (!main) {
    throw new Error(`Search page ${url} is missing #main-content.`);
  }

  const headings = headingEntries(main);
  const title = headings[0]?.text || textFromHtml(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  if (!title) {
    throw new Error(`Search page ${url} is missing a title.`);
  }

  const text = textFromHtml(main);
  return {
    title,
    url,
    description: metaContent(html, "description"),
    type: pageTypeForUrl(url),
    section: sectionForUrl(url),
    headings: headings.slice(1),
    text
  };
}

export function sitemapUrls(xml) {
  return [...String(xml ?? "").matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => decodeHtmlEntities(match[1]))
    .map((value) => new URL(value).pathname)
    .filter((url) => !SEARCH_EXCLUDED_PATHS.has(url));
}

export async function buildSearchIndex(outputDir = "_site") {
  const absoluteOutput = path.resolve(outputDir);
  const sitemap = await readFile(path.join(absoluteOutput, "sitemap.xml"), "utf8");
  const urls = sitemapUrls(sitemap);
  const pages = [];

  for (const url of urls) {
    const html = await readFile(outputFileForUrl(absoluteOutput, url), "utf8");
    pages.push(searchPageFromHtml(html, url));
  }

  pages.sort((left, right) => left.title.localeCompare(right.title));
  const output = `${JSON.stringify({ version: 1, pages })}\n`;
  await mkdir(absoluteOutput, { recursive: true });
  await writeFile(path.join(absoluteOutput, "search-index.json"), output, "utf8");
  return pages;
}
