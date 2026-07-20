# Cloudflare question-reporting setup

Question reports use a Cloudflare Pages Function, D1, and Turnstile.

## D1

- Database: `certprep-reports`
- Pages binding: `REPORTS_DB`
- Migration: `migrations/0001_question_reports.sql`

## Turnstile

The widget may be renamed **Cert Happens question reports** without changing its keys.

Use Managed mode and allow these hostnames:

```text
certhappens.com
certprep-e0r.pages.dev
```

Add `www.certhappens.com` only if that hostname is connected to the site.

Pages variables:

- `TURNSTILE_SITE_KEY`: Text
- `TURNSTILE_SECRET_KEY`: Secret

After changing allowed hostnames or Pages variables, redeploy the newest production commit and test a report from `https://certhappens.com`.

## Verify a stored report

```sql
SELECT
  report_id,
  submitted_at,
  question_id,
  report_category,
  note,
  review_status
FROM question_reports
ORDER BY submitted_at DESC;
```
