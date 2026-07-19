# Cert Prep

Cert Prep is a free certification practice-test and study-resource website. The initial certification is CompTIA Security+.

- Project test ID: `SEC-701`
- Official exam version represented: `SY0-701`
- Hosting: Cloudflare Pages
- Site generator: Eleventy
- Quiz interface: Vanilla JavaScript
- Question authoring: CSV

The site is independent and is not affiliated with or endorsed by CompTIA. CompTIA and Security+ are trademarks of CompTIA, Inc.

## Current status

The repository contains:

- An authoritative question schema and objective map
- Separate draft, active, and retired question files
- A Python question-bank validator
- An Eleventy site foundation
- A tested CSV-to-JSON runtime data pipeline
- Versioned quiz manifests with stable answer identities

The interactive quiz engine is the next phase.

## Core workflow

`docs/question-schema.md` is authoritative. The production quiz consumes only:

```text
data/security-plus/sec-701/questions.csv
```

The build validates the full question bank, then converts only approved active questions into generated JSON under:

```text
src/quiz-data/
```

Generated JSON is not committed. Cloudflare recreates it during every production build. The browser-facing shape is documented in `docs/runtime-data-contract.md`.

## Commands

```text
npm run validate:data
npm test
npm run build:data
npm run build
npm start
```

`npm run build` validates the bank, runs data-pipeline tests, generates public quiz JSON, and builds the Eleventy site into `_site`.

## Adding another exam version

Add its authoring files and a new entry to:

```text
config/quiz-catalog.json
```

The converter will generate a separate manifest and question file without requiring changes to the existing SEC-701 runtime data.

## Cloudflare Pages

```text
Build command: npm run build
Build output directory: _site
```
