# AGENTS.md

Instructions for AI agents working on this repository.

## Project

A curated list of websites for QA professionals to practice testing. `README.md` is the single source of truth - all contributions are additions or removals to that file.

## Repository Structure

| File/Dir | Purpose |
|---|---|
| `README.md` | The main list - all site entries live here |
| `contributing.md` | Human contributor guidelines |
| `CHANGELOG.md` | Changelog - new entries fold into the `[Unreleased]` section |
| `linkinator.config.json` | Link checker config - add skip URLs here for known-broken/auth-required links |
| `.github/workflows/github-action.yml` | Runs `npm run link-checker` on PRs to main |
| `scripts/generate-changelog.js` | Generates changelog entries + social posts from README diffs (writes to `temp/`) |
| `.claude/skills/site-maintenance/` | Maintainer skill - link audits, add/update entries, changelog, PRs |

## Adding a Site

Entries follow this exact format:

```markdown
- [Site Name](URL) - Brief description of testing value.
```

For entries with sub-links:

```markdown
- [Site Name](URL) - Description.
  - [Related resource](URL)
```

Place the entry in the correct category section. Append to the end of the section unless alphabetical order is being maintained.

## Categories

| Category | What belongs here |
|---|---|
| Security Testing | Vulnerable apps, OWASP targets, pentesting playgrounds |
| Mobile Testing | iOS/Android vulnerable or demo apps |
| Web Testing | Demo storefronts, intentionally buggy apps, exploratory testing targets |
| Performance Testing | Load testing targets, benchmark apps |
| Test Automation | Sites with rich UI elements, login/CRUD workflows, automation frameworks |
| API Testing | REST, GraphQL, gRPC, WebSocket practice endpoints |

Full category guidance, entry format rules, and rejection criteria live in
`.claude/skills/site-maintenance/references/categories.md`.

## What Needs to Be Added

Priority gaps (search README.md first to avoid duplicates):

- **gRPC practice endpoints** - no gRPC-specific testing targets exist
- **WebSocket testing targets** - very few present
- **Accessibility testing sites** - sites focused on WCAG compliance practice
- **MFA/SSO authentication flows** - most auth sites only cover basic login
- **File upload/download scenarios** - limited representation
- **i18n/localization testing** - no dedicated sites

## Validation

Run before submitting any change:

```bash
npm run link-checker
```

All links must return 2xx. If a link is inherently problematic (LinkedIn profiles, GraphQL introspection endpoints, auth-required URLs), add it to the `skip` array in `linkinator.config.json` instead of removing it.

## Constraints

- No duplicates - search README.md before adding
- URLs must be publicly accessible without authentication
- Descriptions must explain *testing value*, not just what the site is
- No affiliate or referral links
- Self-promotion is allowed if the site is genuinely useful for testing practice
- Do not add sites that require paid accounts to access core functionality

## Maintenance

The unattended GitHub Actions automation (AI Link Fixer, changelog generator,
issue-submission agent, PR reviewer) was removed. Maintenance now runs through
the `site-maintenance` skill (`.claude/skills/site-maintenance/`), invoked
manually by a maintainer or AI assistant:

- **Link audits** - scan all sites, triage dead links, remove confirmed-dead
  entries and update the skip list via PR
- **Add/update entries** - dedupe, fetch, classify, edit `README.md` via PR
- **Changelog** - after any `README.md` edit, run `node scripts/generate-changelog.js`
  and fold the entry into `CHANGELOG.md` under `[Unreleased]`

PRs target `main` and must pass the link check before merge.
