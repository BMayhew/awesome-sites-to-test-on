# AGENTS.md

Instructions for AI agents working on this repository.

## Project

A curated list of websites for QA professionals to practice testing. `README.md` is the single source of truth - all contributions are additions or removals to that file.

## Repository Structure

| File/Dir | Purpose |
|---|---|
| `README.md` | The main list - all site entries live here |
| `contributing.md` | Human contributor guidelines |
| `linkinator.config.json` | Link checker config - add skip URLs here for known-broken/auth-required links |
| `.github/workflows/github-action.yml` | Runs `npm run link-checker` on push/PR |
| `.github/workflows/pr-review.yml` | AI-generated PR summary comment |
| `.github/workflows/ai-link-fixer.yml` | Weekly automated broken link removal via AI |

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

## AI Workflows

`pr-review.yml` and `ai-link-fixer.yml` use the **GitHub Models API** (`https://models.github.ai/inference`) with the built-in `GITHUB_TOKEN`. No extra secrets or API keys are required.
