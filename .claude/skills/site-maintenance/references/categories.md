# Categories

The README is organized into these sections. Place a site in the one matching its
**primary** purpose. When a site fits two, pick the one a tester would look under
first.

| Category | What belongs here |
|---|---|
| Security Testing | Vulnerable apps, OWASP targets, pentesting playgrounds, deliberately insecure APIs |
| Mobile Testing | iOS / Android vulnerable or demo apps, mobile automation targets |
| Web Testing | Demo storefronts, intentionally buggy web apps, exploratory testing targets |
| Performance Testing | Load-testing targets, benchmark apps, sites that tolerate heavy traffic |
| Test Automation | Sites with rich UI elements, login / CRUD workflows, framework demo pages |
| API Testing | REST, GraphQL, gRPC, WebSocket practice endpoints |

## Entry format

```markdown
- [Site Name](URL) - Brief description of the testing value.
```

- Name: the site's own name, title case.
- URL: canonical, https where available, no tracking params.
- Description: one sentence, what a tester can practice or exercise there. Not a
  marketing blurb, not just "a demo site".

## Rejection criteria

Do not add a site if any of these are true:

- Core functionality needs a paid account.
- It requires auth just to view the landing page (no public access).
- It is an affiliate or referral link.
- It is not actually meant for testing practice (a real product with no demo /
  sandbox, a blog post, a course sales page).
- It duplicates a site already listed (check URL variants).
