# Cert Happens content authoring contract

This document defines the reusable front matter and editorial rules for indexable educational articles.

## Required front matter

```yaml
layout: layouts/article.njk
title: Clear page title
description: Unique search description that accurately summarizes the page
permalink: /stable/lowercase/path/
ogType: article
author: editorialTeam
datePublished: YYYY-MM-DD
articleSection: Certification or topic group
eyebrow: Short page label
lede: One useful sentence that explains what the reader will get
breadcrumbs:
  - label: Home
    url: /
  - label: Parent page
    url: /parent/
  - label: Current page
toc:
  - id: exact-section-id
    label: Reader-facing section label
keywords:
  - Focused topic
relatedLinks:
  - title: Useful related page
    url: /related-page/
    description: Why the link helps
```

Use `dateModified` only when an article receives a meaningful factual or instructional update. Do not refresh dates for spelling corrections, formatting changes, or routine builds. The sitemap uses `dateModified` when present and otherwise uses `datePublished`.

## Heading and table-of-contents rules

- The article layout creates the only `h1`.
- Start article sections with `h2` and subsections with `h3`.
- Give each table-of-contents section a stable HTML ID, for example `<h2 id="risk-analysis">Risk analysis</h2>`.
- Keep the front-matter `toc` entries synchronized with those IDs.
- Do not change a published section ID casually because external and internal links may point to it.

## Writing standard

Every article should solve a real reader problem. It should teach, compare, demonstrate, or help the reader make a decision.

Prefer:

- Plain language and direct reader-focused wording
- Concrete examples and scenario clues
- Clear distinctions between commonly confused concepts
- Short paragraphs and descriptive headings
- Useful bold cues that help scanning
- Occasional safe humor when it improves the explanation
- Original synthesis supported by authoritative references

Avoid:

- Generic introductions that could appear on any website
- Repeating the same point under several headings
- Search phrases inserted unnaturally
- Unverifiable claims, pass promises, or invented certainty
- Empty conclusions that merely restate the introduction
- AI clichés and em dashes in public copy
- Thin pages created only to target a keyword variation

## Sources and maintenance

- Use primary sources whenever possible for exam rules, objectives, standards, laws, protocols, and product behavior.
- Link to the source most directly supporting the factual claim.
- Verify time-sensitive exam details before publishing or updating them.
- Distinguish official facts from Cert Happens recommendations.
- Retain exam-version context so an older article does not silently appear current after a new exam launches.

## Internal linking

Every educational article should normally link to:

- Its certification or topic hub
- A relevant practice test or tool, when one genuinely helps
- One or more deeper or supporting articles, once available

Link text should describe the destination. Avoid strings of unrelated links added only for search engines.

## Article schema and authorship

`layouts/article.njk` creates Article and BreadcrumbList structured data from front matter. Author records live in `src/_data/authors.json`.

The initial author is the Cert Happens Editorial Team as an organization. When an About or editorial-methodology page is published, update the author URL to that stable identity page.
