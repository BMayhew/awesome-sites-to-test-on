# Quick Reference: Changelog System

## 🚀 Quick Start

**After adding/removing links from README.md:**

### Option 1: Automatic (Push to main)
```bash
git add README.md
git commit -m "Add new testing sites"
git push origin main
```
→ Go to Actions tab → Download "social-media-post" artifact

### Option 2: Manual (Before pushing)
```bash
npm run changelog
```
→ Check `temp/social-post.md` for your post

## 📱 Get Your Social Media Post

### From GitHub Actions
1. Push changes to main
2. Go to https://github.com/BMayhew/awesome-sites-to-test-on/actions
3. Click latest "Generate Changelog" workflow
4. Scroll to "Artifacts" → Download "social-media-post"
5. Extract and share!

### From Command Line
```bash
npm run changelog
cat temp/social-post.md
```

## 🎯 Common Commands

```bash
# Generate changelog from last commit
npm run changelog

# Generate from last 3 commits  
node scripts/generate-changelog.js 3

# Check what changed without generating
git diff HEAD~1 README.md
```

## 📋 What Gets Tracked

✅ **Tracked:**
- New links added: `- [Site Name](https://url.com) - Description`
- Links removed

❌ **Not tracked:**
- Plain text changes
- Link description updates
- Formatting changes

## 💡 Pro Tips

- **Preview first**: Use `npm run changelog` locally before pushing
- **Batch updates**: Add multiple links in one commit for better social posts
- **Edit posts**: Generated posts are starting points - customize before sharing
- **Check Actions**: Failed workflows? Check Actions tab for error messages

## 📞 Need Help?

- Detailed docs: [CHANGELOG_SYSTEM.md](CHANGELOG_SYSTEM.md)
- Script docs: [scripts/README.md](scripts/README.md)
- View changelog: [CHANGELOG.md](CHANGELOG.md)
