---
name: site-maintenance
description: >-
  Maintains the awesome-sites-to-test-on curated list. Use when asked to check
  existing sites for broken links, add or update a site entry, process a site
  submission, or find new candidate testing sites. Triggers on phrases like
  "check the sites", "add <url> to the list", "update the <name> entry",
  "process this submission", "find new testing sites", or "/site-maintenance".
---

# Site Maintenance

Maintainer workflow for `awesome-sites-to-test-on`. Replaces the old GitHub
Actions automation (AI Link Fixer, changelog generator, issue-submission agent).
Nothing here runs on a schedule or on a trigger. You invoke it, a human reviews
the PR.

## Conventions

- **Source of truth:** `README.md`. Every entry is `- [Name](URL) - testing value.`
- **Categories:** see `references/categories.md`. Pick the one matching the site's
  primary purpose.
- **Descriptions** explain the *testing value*, not just what the site is.
- **No** affiliate links, referral links, or sites that gate core functionality
  behind a paid account. URLs must be publicly reachable without auth.
- **Branch names:** `chore/link-maintenance-<yyyy-mm-dd>`, `add-site/<slug>`,
  `update-site/<slug>`.
- **PRs:** base `main`, assign `BMayhew`. If the work resolves a GitHub issue,
  put `Closes #<n>` in the body.
- Every run ends with the **Run report** block (see bottom). The calling harness
  reads it from stdout.

## Routing

| Ask | Scenario |
|---|---|
| "check the sites", "are the links still good", link audit | A - Check existing sites |
| "add <url>", "update <name>", "process this submission / issue #<n>" | B - Add or update |
| "find new sites", "what's out there we're missing" | C - Discover (explicit only) |

Never run C as a side effect of A or B.

---

## Scenario A - Check existing sites

1. `bash .claude/skills/site-maintenance/scripts/check-links.sh` from repo root.
   It runs `npm ci` (if needed) + `npm run link-checker` and splits results into:
   - **dead** - 4xx/5xx/0/ERR
   - **flaky** - timeouts, intermittent, already in the linkinator skip list
2. For each dead URL: fetch once more directly. Confirm it is genuinely gone
   (domain parked, 404, DNS fail) vs. an auth wall or bot block (403 with a real
   page, Cloudflare challenge). Auth walls / bot blocks are *not* removals - they
   go to the skip list.
3. Produce a triage table: URL, category, verdict (`remove` / `skip-list` /
   `keep-watching`), reason. **Stop and show the human.** No edits yet.
4. On approval:
   - Remove confirmed-dead entries from `README.md`.
   - Add auth-wall / bot-block URLs to `skip` in `linkinator.config.json`.
   - Run the changelog helper (see below).
   - Commit on `chore/link-maintenance-<date>`, push, open the PR.

## Scenario B - Add or update a site

Input: one or more URLs, optional note, optional issue number.

1. **Dedupe.** Search `README.md` for the URL and its variants (trailing slash,
   http/https, www). If present: report it as already listed, stop (if an issue
   number was given, note it should be closed as duplicate).
2. **Fetch** the page. Read title, headings, meta, body.
3. **Classify** into a category from `references/categories.md`.
4. **Write** the entry at the end of that category section, before the next `##`.
   Format: `- [Name](URL) - testing value.`
   For an *update*, edit the existing line in place.
5. **Link-check** just the change: `npm run link-checker`. If the new URL fails
   but is valid (known auth wall, introspection endpoint), add it to the skip
   list instead of dropping it.
6. Run the changelog helper.
7. Commit on `add-site/<slug>` or `update-site/<slug>`, push, open the PR
   (assign `BMayhew`, `Closes #<n>` if an issue drove it).

### Processing a GitHub issue

If given an issue number or URL: read the issue body and all comments for URLs,
then run steps 1-7. If no URL is anywhere in the issue, post a comment asking for
one and stop. This is manual - the skill does not watch issues.

## Scenario C - Find new potential sites

Explicit request only. Keep it cheap.

1. Read `references/sources.md`. Make **one** focused pass over that list
   (targeted web searches / fetches, no recursive crawling).
2. Collect candidates, diff against `README.md` (drop anything already listed).
3. Return a ranked shortlist, **max 10**: name, URL, one-line why, suggested
   category. Do not fetch-and-validate every candidate. Do not open a PR.
4. The human picks; run Scenario B on the winners.

---

## Changelog helper (internal, both A and B)

After `README.md` is edited and before committing:

1. `node scripts/generate-changelog.js` - writes an entry + social post to `temp/`.
2. Fold the generated entry into `CHANGELOG.md` under the `[Unreleased]` section
   (newest first, keep the existing `---` separators).
3. Stage `CHANGELOG.md` in the same commit as the `README.md` change.
4. Put the social-post draft into the Run report - do not commit it.

## Run report

End every run with exactly this block on stdout:

```
### Site maintenance run report
- Scenario: <A | B | C>
- Changed: <files, or "none">
- PR: <url, or "none">
- Changelog entry:
<the CHANGELOG.md entry, or "none">
- Social post draft:
<the social post text, or "none">
- Follow-ups: <anything needing a human, or "none">
```
