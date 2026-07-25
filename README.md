# Cert Happens

[CertHappens.com](https://certhappens.com) is a free certification practice-test and study-resource website. Current resources cover CompTIA Security+ SY0-701 and CompTIA Network+ N10-009.

The repository includes the Eleventy site, vanilla JavaScript quiz engine, CSV question workflow, automated validation and conversion, detailed grading and review, and Cloudflare question reporting.

The production quiz consumes approved questions only from:

```text
data/security-plus/sec-701/questions.csv
```

`docs/question-schema.md` is the authoritative question-data contract.

The site is independent and is not affiliated with or endorsed by CompTIA. CompTIA, Security+, and Network+ are trademarks of CompTIA, Inc.
