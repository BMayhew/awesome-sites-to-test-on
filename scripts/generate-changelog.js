#!/usr/bin/env node

/**
 * Manual Changelog Generator
 * Run this script to manually generate a changelog entry from git diff
 * 
 * Usage: node scripts/generate-changelog.js [number-of-commits]
 * Example: node scripts/generate-changelog.js 1  (compares HEAD with HEAD~1)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get number of commits to compare (default: 1)
const commitsBack = process.argv[2] || '1';
const compareRef = `HEAD~${commitsBack}`;

try {
  // Get the diff
  const diff = execSync(`git diff ${compareRef} HEAD -- readme.md`, { encoding: 'utf-8' });
  
  if (!diff) {
    console.log('No changes detected in readme.md');
    process.exit(0);
  }

  // Parse added lines
  const addedLines = [];
  const removedLines = [];
  
  diff.split('\n').forEach(line => {
    // Match lines that add links (start with + and contain markdown links with http)
    if (line.match(/^\+.*\[.*\]\(http/) && !line.startsWith('+++')) {
      addedLines.push(line.substring(1).trim());
    }
    // Match lines that remove links (start with - and contain markdown links with http)
    if (line.match(/^-.*\[.*\]\(http/) && !line.startsWith('---')) {
      removedLines.push(line.substring(1).trim());
    }
  });

  // Generate changelog entry
  const date = new Date().toISOString().split('T')[0];
  let changelogEntry = `\n## [${date}]\n\n`;
  
  if (addedLines.length > 0) {
    changelogEntry += '### Added\n';
    addedLines.forEach(line => {
      changelogEntry += `${line}\n`;
    });
    changelogEntry += '\n';
  }
  
  if (removedLines.length > 0) {
    changelogEntry += '### Removed\n';
    removedLines.forEach(line => {
      changelogEntry += `${line}\n`;
    });
    changelogEntry += '\n';
  }
  
  changelogEntry += '---\n';

  // Generate social media post
  let socialPost = `Awesome Sites to Test On - Updates for ${date}\n\n`;
  
  if (addedLines.length > 0) {
    socialPost += 'New Testing Sites Added:\n';
    addedLines.slice(0, 5).forEach(line => {
      const nameMatch = line.match(/\[(.*?)\]/);
      const urlMatch = line.match(/\((https?:\/\/[^\)]+)/);
      if (nameMatch && urlMatch) {
        socialPost += `• ${nameMatch[1]}\n  ${urlMatch[1]}\n`;
      }
    });
    
    if (addedLines.length > 5) {
      socialPost += `\n...and ${addedLines.length - 5} more!\n`;
    }
  }
  
  if (removedLines.length > 0) {
    socialPost += `\n${removedLines.length} site(s) removed\n`;
  }
  
  socialPost += '\nCheck out the full list: https://github.com/BMayhew/awesome-sites-to-test-on\n\n';
  socialPost += '#testing #qa #automation #softwaretesting #testautomation\n';

  // Output results
  console.log('CHANGELOG ENTRY:');
  console.log('==================');
  console.log(changelogEntry);
  
  console.log('\n\nSOCIAL MEDIA POST:');
  console.log('===================');
  console.log(socialPost);
  
  // Ask if user wants to update CHANGELOG.md
  console.log('\n\nTo update CHANGELOG.md, append the entry after the [Unreleased] section.');
  console.log('To save social post: Copy the text above or run with output redirection');
  
  // Save to temp files
  const tempDir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(tempDir, 'changelog-entry.md'), changelogEntry);
  fs.writeFileSync(path.join(tempDir, 'social-post.md'), socialPost);
  
  console.log(`\nSaved to temp/changelog-entry.md and temp/social-post.md`);
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
