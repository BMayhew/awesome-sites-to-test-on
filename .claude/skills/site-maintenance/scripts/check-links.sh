#!/usr/bin/env bash
# Run the repo link checker and split the results into dead vs flaky.
# Usage: bash .claude/skills/site-maintenance/scripts/check-links.sh
# Run from the repo root. Writes:
#   temp/link-results.txt  - full linkinator output
#   temp/dead-urls.txt     - 4xx / 5xx / 0 / ERR
#   temp/flaky-urls.txt    - timeouts / other non-OK, non-dead
# Exit code is 0 even when links fail, so the caller can triage.

set -u
mkdir -p temp

if [ ! -d node_modules ]; then
  npm ci
fi

npm run link-checker 2>&1 | tee temp/link-results.txt || true

# linkinator text lines look like: [404] https://example.com
grep -E '^\[(4[0-9][0-9]|5[0-9][0-9]|0|ERR)\]' temp/link-results.txt \
  | awk '{print $2}' | sort -u > temp/dead-urls.txt || true

grep -E '^\[(TIMEOUT|timeout)\]' temp/link-results.txt \
  | awk '{print $2}' | sort -u > temp/flaky-urls.txt || true

echo
echo "dead URLs:  $(wc -l < temp/dead-urls.txt | tr -d ' ')"
echo "flaky URLs: $(wc -l < temp/flaky-urls.txt | tr -d ' ')"
echo "full output: temp/link-results.txt"
