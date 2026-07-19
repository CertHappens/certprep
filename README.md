# Cert Prep

Cert Prep is a free certification practice-test and study-resource website. The initial certification is CompTIA Security+.

- Project test ID: `SEC-701`
- Official exam version represented: `SY0-701`
- Hosting target: Cloudflare Pages
- Static-site generator: Eleventy
- Quiz interface: Vanilla JavaScript
- Question authoring format: CSV

The site is independent and is not affiliated with or endorsed by CompTIA. CompTIA and Security+ are trademarks of CompTIA, Inc.

## Project status

The repository currently contains:

- An authoritative question schema
- Objective and source maps
- Separate draft, active, and retired question files
- Ten approved sample questions
- A Python question-bank validator
- The Phase 1 Eleventy site foundation

The quiz data converter and interactive quiz engine will be added in later phases.

## Repository structure

```text
data/
  security-plus/
    sec-701/
      draft-questions.csv
      questions.csv
      retired-questions.csv
      objective-map.csv
      source-register.csv

docs/
  question-schema.md
  blank-question-template.csv
  validation-report.md

samples/
  sample-coverage-report.csv
  sample-review.md

scripts/
  validate_question_bank.py

src/
  _data/
  _includes/
  assets/
  security-plus/
  index.njk

eleventy.config.js
package.json
```

## Data contract

`docs/question-schema.md` is authoritative for question-bank structure and lifecycle rules.

The production quiz will consume only:

```text
data/security-plus/sec-701/questions.csv
```

Draft and retired files are validated for integrity but must not be included in public quiz data.

## Requirements

Install:

- Python 3.10 or newer
- Node.js 20 or newer
- npm

The validator uses only Python standard-library modules. It does not require `pip install`. A small Node wrapper automatically looks for `py`, `python`, or `python3`, so the npm commands work across Windows and Cloudflare build environments.

## First local setup

From the repository root:

```text
npm install
```

This installs Eleventy and creates `package-lock.json`. Commit the generated lock file so local and Cloudflare builds use the same dependency versions.

## Validate the question bank

Run validation without rewriting the stored Markdown report:

```text
npm run validate:data
```

To intentionally regenerate `docs/validation-report.md`:

```text
npm run validate:data:report
```

The normal build stops when validation errors exist. Warnings and informational diagnostics remain visible but do not fail the build.

## Run the site locally

```text
npm start
```

Eleventy will print the local address, normally:

```text
http://localhost:8080/
```

## Build the production site

```text
npm run build
```

This command:

1. Validates the question bank.
2. Stops if validation errors exist.
3. Builds the Eleventy site into `_site`.

The generated `_site` directory is not committed.

## Cloudflare Pages settings

Use these values when the site is connected to Cloudflare Pages:

```text
Framework preset: Eleventy
Build command: npm run build
Build output directory: _site
Root directory: /
```

Set a production environment variable after the final public domain is known:

```text
SITE_URL=https://example.com
```

The base layout uses `SITE_URL` for canonical and Open Graph URLs. It intentionally omits those absolute URLs when the variable is not set.

## Question workflow

1. Draft new questions in `draft-questions.csv`.
2. Run validation during drafting and review.
3. Complete technical and editorial review.
4. Resolve quality flags.
5. Move approved rows to `questions.csv`.
6. Retire public questions by moving the complete row to `retired-questions.csv` and adding retirement metadata.
7. Never reuse a permanent question ID.

See `docs/question-schema.md` for the full contract.
