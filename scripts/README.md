# Changelog Scripts

This directory contains scripts to help manage the changelog and generate social media posts.

## Manual Changelog Generation

Use this when you want to manually generate a changelog entry from recent commits:

```bash
# Generate changelog from last commit
node scripts/generate-changelog.js

# Generate changelog from last 3 commits
node scripts/generate-changelog.js 3
```

This will:
- Compare the current `README.md` with previous commits
- Extract added and removed links
- Generate a formatted changelog entry
- Generate a social media post
- Save both to `temp/` directory

## Changelog as part of site maintenance

Changelog updates are no longer produced by a GitHub Action. The `site-maintenance`
skill (`.claude/skills/site-maintenance/`) runs this script after it edits
`README.md`, folds the new entry into `CHANGELOG.md`, and includes the social-post
draft in its run report. See the skill's `SKILL.md` for details.

## Example Output

### Changelog Entry
```markdown
## [2026-01-05]

### Added
- [New Testing Site](https://example.com) - Description of what it does

### Removed
- [Old Testing Site](https://old.com) - Reason for removal

---
```

### Social Media Post
```
Awesome Sites to Test On - Updates for 2026-01-05

New Testing Sites Added:
- New Testing Site
  https://example.com

Check out the full list: https://github.com/BMayhew/awesome-sites-to-test-on

#testing #qa #automation #softwaretesting
```

## Tips

- Social media posts are limited to the first 5 additions to keep them concise
- Both scripts only track changes to links (not plain text changes)
- The temp/ directory is gitignored, so manual generations won't be committed
