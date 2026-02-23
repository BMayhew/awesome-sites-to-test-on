# Changelog System for Awesome Sites to Test On

This repository now includes an automated changelog system that tracks when links are added or removed, making it easy to share updates on social media!

## 🎯 Features

### Automated Changelog
- **Automatic Updates**: Every time you push changes to `README.md` on the main branch, the changelog is automatically updated
- **GitHub Action**: Runs automatically and commits the updated `CHANGELOG.md`
- **Social Media Posts**: Generates ready-to-share social media posts as artifacts

### Manual Generation
- **On-Demand**: Generate changelog entries and social posts anytime from your local repository
- **Flexible Comparison**: Compare against any number of previous commits

## 📝 How It Works

### Automatic (Recommended)

1. **Edit README.md** and add or remove testing site links
2. **Commit and push** to the main branch
3. **GitHub Action runs automatically** and:
   - Detects what links were added or removed
   - Updates `CHANGELOG.md` with a dated entry
   - Generates a social media post
   - Uploads the post as an artifact

4. **Download your social media post**:
   - Go to GitHub Actions tab
   - Click on the latest "Generate Changelog" run
   - Download the "social-media-post" artifact
   - Use the markdown file to post on Twitter, LinkedIn, etc.

### Manual

Run the changelog generator script locally:

```bash
# Generate from the last commit
npm run changelog

# Generate from the last 3 commits
node scripts/generate-changelog.js 3
```

This creates files in the `temp/` directory:
- `changelog-entry.md` - Formatted changelog entry
- `social-post.md` - Ready-to-share social media post

## 📱 Social Media Post Format

The generated posts are optimized for social media and look like this:

```
🚀 Awesome Sites to Test On - Updates for 2026-01-05

✨ New Testing Sites Added:
• Coffee Cart
  https://coffee-cart.app/
• Academy Bugs
  https://academybugs.com/find-bugs/

Check out the full list: https://github.com/BMayhew/awesome-sites-to-test-on

#testing #qa #automation #softwaretesting #testautomation
```

## 📋 Files Created

- **CHANGELOG.md** - Main changelog file tracking all updates
- **.github/workflows/changelog-generator.yml** - GitHub Action for automation
- **scripts/generate-changelog.js** - Manual changelog generator script
- **scripts/README.md** - Detailed documentation for the scripts

## 🔧 Configuration

The system works out of the box with zero configuration! It automatically:
- Detects markdown links in README.md
- Identifies additions and removals
- Formats entries with proper dates
- Generates hashtag-optimized social posts

## 🎨 Customization

### Change Social Media Hashtags

Edit the hashtags in:
- `.github/workflows/changelog-generator.yml` (line ~110)
- `scripts/generate-changelog.js` (line ~81)

### Adjust Post Length

By default, social posts show the first 5 new links. To change this:
- In `.github/workflows/changelog-generator.yml`: Modify `head -5` (line ~63)
- In `scripts/generate-changelog.js`: Change `slice(0, 5)` (line ~72)

### Change Date Format

Both scripts use ISO format (YYYY-MM-DD). Modify the date formatting in:
- GitHub Action: `date +%Y-%m-%d` command
- Node script: `.toISOString().split('T')[0]` method

## 🚀 Getting Started

1. **No setup needed!** The system is ready to use.
2. Make changes to README.md and push to main
3. Check the Actions tab for your generated social media post
4. Download and share on your favorite platforms!

## 💡 Tips

- **Batch updates**: Add multiple links in one commit for a comprehensive social post
- **Review before sharing**: The generated posts are templates - feel free to customize before posting
- **Keep descriptions concise**: Short, clear descriptions work best for social media
- **Use the manual script** to preview changes before pushing

## 🤝 Contributing

When contributing new testing sites:
1. Add the link to the appropriate section in README.md
2. Include a clear, concise description
3. Push to main - the changelog updates automatically!
4. Check the Actions tab to get your social media post

---

For detailed information about the scripts and their usage, see [scripts/README.md](scripts/README.md).
