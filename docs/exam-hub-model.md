# Exam discovery hub model

Exam discovery hubs provide useful certification guidance before Cert Happens commits to a full question bank and study-guide set.

## Files

- `src/_data/examHubs.json` stores certification-specific facts and copy.
- `src/_includes/components/exam-discovery-hub.njk` renders the shared hub structure.
- A small route wrapper such as `src/cissp/index.njk` selects the correct data record and supplies page metadata and breadcrumbs.

## Required content

Each hub should include:

- A clear resource-status statement
- Certification purpose and intended audience
- Current exam format
- Official domains or skill areas
- Experience, prerequisite, endorsement, or maintenance requirements when applicable
- A comparison with the closest existing Cert Happens certification
- Existing Cert Happens resources that can refresh prerequisites without being presented as exam-specific preparation
- Official vendor links for details that may change

## Publishing standard

A discovery hub must solve a real learner problem. Do not publish a thin placeholder whose main message is that content is coming later.

Status language must distinguish among:

- Overview available
- Foundation resources available
- Diagnostic questions available
- Full practice tests and study guides available

Do not label a certification as fully supported until its practice tests, review workflow, and core study resources are ready.

## Adding another hub

1. Add a new record to `examHubs.json`.
2. Create a route wrapper that assigns the record to `examHub` and includes the shared component.
3. Add one or two honest internal discovery links from relevant existing pages.
4. Update certification-vendor independence and trademark language when required.
5. Add the route and important content markers to `scripts/verify_site.mjs`.
6. Confirm sitemap inclusion, production indexing, preview `noindex`, mobile layout, and structured breadcrumbs.

## Maintenance

The `sourceReviewed` field is internal and should be updated when official requirements are checked. It is not displayed as an article date.

Before changing exam format, fees, experience requirements, domain weights, or maintenance obligations, confirm them against official vendor sources.
