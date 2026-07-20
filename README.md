# Cert Happens

[CertHappens.com](https://certhappens.com) is a free certification practice-test and study-resource website. The initial certification is CompTIA Security+ SY0-701.

The repository includes the Eleventy site, vanilla JavaScript quiz engine, CSV question workflow, automated validation and conversion, detailed grading and review, and Cloudflare question reporting.

The production quiz consumes approved questions only from:

```text
data/security-plus/sec-701/questions.csv
```

`docs/question-schema.md` is the authoritative question-data contract.

The site is independent and is not affiliated with or endorsed by CompTIA. CompTIA and Security+ are trademarks of CompTIA, Inc.
