# Exam discovery hub model

Exam discovery hubs provide useful certification guidance before Cert Happens commits to a full question bank and study-guide set.

## Files

- `src/_data/examHubs.json` stores certification-specific facts and copy.
- `src/_includes/components/exam-discovery-hub.njk` renders the shared hub structure.
- A small route wrapper such as `src/cissp/index.njk` or `src/ccna/index.njk` selects the correct data record and supplies page metadata and breadcrumbs.

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

## Optional transition section

Use the `transition` record when an exam version has a published retirement or launch date. It can explain:

- Which version is currently active
- The final date for the outgoing version
- The launch date for the incoming version
- Which foundational skills carry forward
- Which version Cert Happens plans to support with a dedicated bank

Do not publish guessed domain weights or task details for an incoming exam. Use only facts confirmed by the certification vendor.

## Reusable labels

The component reads certification-specific labels from the data record rather than assuming CISSP terminology. Important fields include:

- `audience.signalHeading`
- `comparison.foundationLabel`
- `scope.eyebrow`, `scope.heading`, `scope.intro`, and `scope.itemLabel`
- `experience.eyebrow`
- `preparation.eyebrow`
- `currentResources.eyebrow` and `currentResources.plannedHeading`
- `sources.heading`, `sources.intro`, and `sources.independence`

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

Before changing exam format, fees, experience requirements, domain weights, transition dates, or maintenance obligations, confirm them against official vendor sources.
