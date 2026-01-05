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
- Compare the current `readme.md` with previous commits
- Extract added and removed links
- Generate a formatted changelog entry
- Generate a social media post
- Save both to `temp/` directory

## Automated Changelog (GitHub Action)

The repository includes a GitHub Action (`.github/workflows/changelog-generator.yml`) that automatically:

1. **Runs on every push to main** that modifies `readme.md`
2. **Detects changes** by comparing with the previous commit
3. **Updates CHANGELOG.md** with a new dated entry
4. **Creates a social media post** formatted for Twitter/LinkedIn/etc.
5. **Uploads the social post** as a GitHub artifact (available for 90 days)

### Accessing Social Media Posts from GitHub Actions

After each push to main:

1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Click on the latest "Generate Changelog" workflow run
4. Scroll down to "Artifacts" section
5. Download "social-media-post" artifact
6. Extract and use the markdown file for your social media posts

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
🚀 Awesome Sites to Test On - Updates for 2026-01-05

✨ New Testing Sites Added:
• New Testing Site
  https://example.com

Check out the full list: https://github.com/BMayhew/awesome-sites-to-test-on

#testing #qa #automation #softwaretesting #testautomation
```

## Tips

- The GitHub Action automatically commits the CHANGELOG.md updates
- Social media posts are limited to the first 5 additions to keep them concise
- Both scripts only track changes to links (not plain text changes)
- The temp/ directory is gitignored, so manual generations won't be committed
