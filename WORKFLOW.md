# Changelog System - Visual Workflow

## 🔄 Automatic Workflow (GitHub Actions)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. You edit README.md and add/remove testing site links    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Commit and push to main branch                           │
│    git add README.md                                         │
│    git commit -m "Add new testing sites"                    │
│    git push origin main                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. GitHub Action automatically runs                         │
│    ✓ Compares with previous commit                          │
│    ✓ Extracts added/removed links                           │
│    ✓ Updates CHANGELOG.md                                   │
│    ✓ Generates social media post                            │
│    ✓ Commits changelog changes                              │
│    ✓ Uploads social post as artifact                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. You download the social media post                       │
│    • Go to Actions tab                                       │
│    • Click "Generate Changelog" workflow                    │
│    • Download "social-media-post" artifact                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Share on social media! 🎉                                │
│    Twitter, LinkedIn, Reddit, etc.                          │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Manual Workflow (Local Script)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. You edit README.md and add/remove testing site links    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Run the changelog generator locally                      │
│    npm run changelog                                         │
│                                                              │
│    or for multiple commits:                                 │
│    node scripts/generate-changelog.js 3                     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Script generates files in temp/ directory                │
│    ✓ temp/changelog-entry.md                                │
│    ✓ temp/social-post.md                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Review the generated content                             │
│    cat temp/social-post.md                                  │
│    cat temp/changelog-entry.md                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. Either:                                                   │
│    A) Manually copy entry to CHANGELOG.md, or               │
│    B) Push to main and let GitHub Action handle it          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. Share on social media! 🎉                                │
└─────────────────────────────────────────────────────────────┘
```

## 📊 What Gets Tracked

### ✅ Detected Changes

```markdown
Before:
## API Testing
- [Old Site](https://old.com) - Description

After:
## API Testing
- [New Site](https://new.com) - New description  ← DETECTED (Added)
- [Old Site](https://old.com) - Description      ← REMOVED LINE = DETECTED
```

### ❌ Ignored Changes

```markdown
Before:
- [Site](https://site.com) - Old description

After:
- [Site](https://site.com) - Updated description  ← NOT TRACKED
```

Only changes to link lines (containing markdown links with http/https) are tracked.

## 📱 Social Media Post Example

Input (what you add to README.md):
```markdown
- [Coffee Cart](https://coffee-cart.app/) - A simple coffee ordering app
- [Academy Bugs](https://academybugs.com/) - Test site with 25 real bugs
- [UI Testing Playground](http://uitestingplayground.com) - Practice site
```

Output (generated social post):
```
🚀 Awesome Sites to Test On - Updates for 2026-01-05

✨ New Testing Sites Added:
• Coffee Cart
  https://coffee-cart.app/
• Academy Bugs
  https://academybugs.com/
• UI Testing Playground
  http://uitestingplayground.com

Check out the full list: https://github.com/BMayhew/awesome-sites-to-test-on

#testing #qa #automation #softwaretesting #testautomation
```

Perfect for copy-paste to Twitter, LinkedIn, or any social platform!

## 🎯 Best Practices

### For Single Updates
```bash
# Make your change
vim README.md

# Test locally first
npm run changelog

# Review output
cat temp/social-post.md

# If happy, push
git add README.md
git commit -m "Add Coffee Cart testing site"
git push origin main
```

### For Batch Updates
```bash
# Add multiple sites in one session
vim README.md
# (add 5-10 new testing sites)

# Commit all at once
git add README.md
git commit -m "Add 10 new web testing sites"
git push origin main

# Result: One comprehensive social post with all additions
```

## 🔍 Troubleshooting

### "No changes detected"
- Make sure you're editing README.md
- Changes must be to lines containing markdown links: `[Text](http://url)`
- Commit your changes before running the script

### GitHub Action not running
- Check that you pushed to the `main` branch
- Verify README.md was actually modified in the commit
- Check Actions tab for error messages

### Script fails locally
- Ensure you have Node.js installed
- Make sure you're in a git repository
- Check that you have commit history (at least 1 commit)

---

Need more help? Check:
- [QUICK_START.md](QUICK_START.md) - Quick commands
- [CHANGELOG_SYSTEM.md](CHANGELOG_SYSTEM.md) - Full documentation
- [scripts/README.md](scripts/README.md) - Script details
