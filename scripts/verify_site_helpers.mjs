const namedEntities = new Map([
  ["amp", "&"],
  ["apos", "'"],
  ["bull", "•"],
  ["copy", "©"],
  ["gt", ">"],
  ["hellip", "…"],
  ["ldquo", '“'],
  ["lsquo", '‘'],
  ["lt", "<"],
  ["mdash", "—"],
  ["middot", "·"],
  ["nbsp", " "],
  ["ndash", "–"],
  ["quot", '"'],
  ["reg", "®"],
  ["rdquo", '”'],
  ["rsquo", '’'],
  ["trade", "™"]
]);

export function decodeHtmlEntities(value = "") {
  return String(value).replace(
    /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]+);/gi,
    (entity, encoded) => {
      if (encoded[0] === "#") {
        const hexadecimal = encoded[1]?.toLowerCase() === "x";
        const digits = encoded.slice(hexadecimal ? 2 : 1);
        const codePoint = Number.parseInt(digits, hexadecimal ? 16 : 10);

        if (Number.isFinite(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff) {
          return String.fromCodePoint(codePoint);
        }

        return entity;
      }

      return namedEntities.get(encoded.toLowerCase()) ?? entity;
    }
  );
}

export function extractMainHtml(html = "") {
  return String(html).match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? String(html);
}

export function htmlToText(html = "") {
  return decodeHtmlEntities(String(html))
    .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
}

export function normalizeText(value = "") {
  return htmlToText(value)
    .normalize("NFKC")
    .replace(/[\u2018\u2019\u02bc\uff07]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/%/g, " percent ")
    .toLocaleLowerCase("en-US")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function includesNormalizedText(html, expected, { mainOnly = true } = {}) {
  const scope = mainOnly ? extractMainHtml(html) : String(html);
  const normalizedExpected = normalizeText(expected);

  return normalizedExpected.length > 0 && normalizeText(scope).includes(normalizedExpected);
}

export function textEquals(actual, expected) {
  return normalizeText(actual) === normalizeText(expected);
}

export function getJsonLdGraph(html = "") {
  const scripts = [
    ...String(html).matchAll(
      /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi
    )
  ];

  if (scripts.length === 0) {
    return { error: "missing JSON-LD", graph: [] };
  }

  const graphBlocks = [];

  for (const [index, script] of scripts.entries()) {
    try {
      const data = JSON.parse(script[1]);
      if (Array.isArray(data?.["@graph"])) {
        graphBlocks.push(data["@graph"]);
      }
    } catch (error) {
      return {
        error: `invalid JSON-LD block ${index + 1} (${error.message})`,
        graph: []
      };
    }
  }

  if (graphBlocks.length !== 1) {
    return {
      error: `expected one JSON-LD @graph block, found ${graphBlocks.length}`,
      graph: []
    };
  }

  return { error: "", graph: graphBlocks[0] };
}

export function getFirstHeadingText(html, level = 1) {
  const match = String(html).match(
    new RegExp(`<h${level}\\b[^>]*>([\\s\\S]*?)<\\/h${level}>`, "i")
  );
  return match ? htmlToText(match[1]).trim() : "";
}

export function headingMatches(html, expected, level = 1) {
  return textEquals(getFirstHeadingText(html, level), expected);
}

export function getElementTextById(html, tagName, id) {
  const escapedId = escapeRegExp(id);
  const match = String(html).match(
    new RegExp(
      `<${tagName}\\b(?=[^>]*\\bid=["']${escapedId}["'])[^>]*>([\\s\\S]*?)<\\/${tagName}>`,
      "i"
    )
  );
  return match ? htmlToText(match[1]).trim() : "";
}

export function elementTextByIdMatches(html, tagName, id, expected) {
  return textEquals(getElementTextById(html, tagName, id), expected);
}


export function getElementBlockByAttributeValue(
  html,
  tagName,
  attribute,
  value
) {
  const escapedAttribute = escapeRegExp(attribute);
  const escapedValue = escapeRegExp(value);
  return String(html).match(
    new RegExp(
      `<${tagName}\\b(?=[^>]*\\b${escapedAttribute}=["']${escapedValue}["'])[^>]*>[\\s\\S]*?<\\/${tagName}>`,
      "i"
    )
  )?.[0] ?? "";
}

export function countElementsWithClass(html, tagName, className) {
  const expression = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  let count = 0;

  for (const match of String(html).matchAll(expression)) {
    const classValue = match[0].match(/\bclass=["']([^"']*)["']/i)?.[1] ?? "";
    if (classValue.split(/\s+/).includes(className)) {
      count += 1;
    }
  }

  return count;
}

export function hasLinkWithText(html, href, expected) {
  const escapedHref = escapeRegExp(href);
  const links = String(html).match(
    new RegExp(
      `<a\\b(?=[^>]*\\bhref=["']${escapedHref}["'])[^>]*>[\\s\\S]*?<\\/a>`,
      "gi"
    )
  ) || [];

  return links.some((link) =>
    includesNormalizedText(link, expected, { mainOnly: false })
  );
}

export function hasElementWithNormalizedAttributeValue(
  html,
  tagName,
  attribute,
  expected
) {
  const escapedAttribute = escapeRegExp(attribute);
  const expression = new RegExp(`<${tagName}\\b[^>]*>`, "gi");

  for (const match of String(html).matchAll(expression)) {
    const tag = match[0];
    const value = tag.match(
      new RegExp(`\\b${escapedAttribute}=["']([^"']*)["']`, "i")
    )?.[1];

    if (value !== undefined && textEquals(value, expected)) {
      return true;
    }
  }

  return false;
}
export function countElementsWithAttributeAndText(html, tagName, attribute, expected) {
  const escapedAttribute = escapeRegExp(attribute);
  const expression = new RegExp(
    `<${tagName}\\b(?=[^>]*\\b${escapedAttribute}(?:\\s*=|\\s|>))[^>]*>([\\s\\S]*?)<\\/${tagName}>`,
    "gi"
  );
  let count = 0;

  for (const match of String(html).matchAll(expression)) {
    if (textEquals(match[1], expected)) {
      count += 1;
    }
  }

  return count;
}

export function hasHtmlAttribute(html, attribute) {
  const name = String(attribute).trim();

  if (!/^[a-z_:][\w:.-]*$/i.test(name)) {
    return false;
  }

  const escapedAttribute = escapeRegExp(name);
  const attributeExpression = new RegExp(
    `\\s${escapedAttribute}(?=\\s|=|/\\s*>|>)`,
    "i"
  );

  for (const match of String(html).matchAll(/<[a-z][^>]*>/gi)) {
    if (attributeExpression.test(match[0])) {
      return true;
    }
  }

  return false;
}

export function isStructuralMarker(marker = "") {
  const value = String(marker).trim();
  return (
    value.startsWith("<") ||
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    /^(?:data-[\w-]+|aria-[\w-]+)$/i.test(value) ||
    /^(?:href|src|id|class|data-[\w-]+|aria-[\w-]+|role|type)=/i.test(value) ||
    /\b(?:href|src|id|class|data-[\w-]+|aria-[\w-]+|role|type)=["']/.test(value)
  );
}

export function hasPageMarker(html, marker) {
  const value = String(marker).trim();

  if (/^(?:data-[\w-]+|aria-[\w-]+)$/i.test(value)) {
    return hasHtmlAttribute(html, value);
  }

  return isStructuralMarker(value)
    ? String(html).includes(value)
    : includesNormalizedText(html, value);
}

export function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
