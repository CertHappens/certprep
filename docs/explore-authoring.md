# Explore article and assessment framework

Explore is a learner-focused article section for career guidance, certification comparisons, study strategies, and beginner-friendly technology topics.

The public section remains inactive until the first article's approved copy and self-assessment data are ready. Do not add an empty Explore navigation item, landing page, category page, or category menu.

## First article contract

- Title: `Which Technology Career Path Fits You?`
- Intended URL: `/explore/career/paths/`
- Search-intent phrase: `What career is right for me?`, used naturally in the introduction and optionally in metadata
- Format: helpful article followed by a practical self-assessment
- Results: the reader's two strongest matches
- Result lead: `Your answers suggest that you may enjoy...`
- Paths: IT operations, development, management, cybersecurity, quality assurance, and audit/technical assurance
- Planned follow-up: `Which Cybersecurity Career Path Fits You?`

## Required front matter for a published article

```yaml
title: Which Technology Career Path Fits You?
description: A concise search description that reads naturally.
layout: layouts/article.njk
permalink: /explore/career/paths/
tags:
  - exploreArticle
exploreStatus: published
category: Career paths
dateCreated: 2026-08-02
datePublished: 2026-08-02
dateModified: 2026-08-02
articleSection: Explore
breadcrumbs:
  - label: Home
    url: /
  - label: Explore
    url: /explore/
  - label: Which Technology Career Path Fits You?
stylesheets:
  - /assets/css/explore.css
```

Dates are used for sorting, sitemap freshness, and structured metadata. They are not displayed in the article.

`category` is required metadata but does not automatically create a category route or navigation item. Start with a newest-first Explore feed. Reassess categories after roughly five to ten articles reveal useful groupings.

The initial `/explore/` landing page should render the shared newest-first feed:

```njk
{% include "components/explore-feed.njk" %}
```

Do not add a public empty-state message. Activate the landing route and top-level Explore navigation together when the first approved article is publishable.

## Optional relationship fields

```yaml
relatedArticles:
  - title: Which Cybersecurity Career Path Fits You?
    url: /explore/career/cybersecurity-paths/
    description: Compare security specialties after narrowing the broader technology direction.
relatedLinks:
  - title: Security+ resources
    url: /security-plus/
    description: Practice questions, study guides, and references for foundational security work.
```

The shared article layout hides either section when its array is absent or empty. Do not publish placeholder links for articles that do not exist.

## Assessment data contract

The reusable component is included with:

```njk
{% include "components/explore-assessment.njk" %}
```

The page must provide an `assessment` object:

```js
{
  title: "Find your strongest technology directions",
  introduction: "Answer based on the work you would most enjoy doing.",
  paths: [
    {
      id: "it-operations",
      label: "IT operations",
      description: "Approved result copy from the Explore content workflow.",
      nextSteps: ["Optional approved next step"],
      url: "/network-plus/",
      linkLabel: "Explore networking resources"
    }
  ],
  questions: [
    {
      id: "work-style",
      prompt: "Approved question text",
      options: [
        {
          id: "option-a",
          label: "Approved answer text",
          scores: {
            "it-operations": 2,
            "cybersecurity": 1
          }
        }
      ]
    }
  ]
}
```

Every question must have one selected answer before scoring. Scoring occurs entirely in the browser and returns the top two paths. Ties are resolved by the configured path order, so content authors should order paths deliberately and avoid relying on ties for meaningful distinctions.

The assessment must deliver results without an account, email address, employer classification, or lead-capture step. A future newsletter invitation may appear after the useful result has already been shown.
