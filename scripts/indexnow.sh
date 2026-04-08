#!/usr/bin/env bash
# Submit URLs to IndexNow
# Usage:
#   ./scripts/indexnow.sh                          # submit ALL sitemap URLs
#   ./scripts/indexnow.sh https://pierrebarbe.ca/blog/my-post  # submit specific URLs

set -euo pipefail

HOST="pierrebarbe.ca"
KEY="5e0eb4db5eb4405a851083619a292470"
SITEMAP_URL="https://${HOST}/sitemap.xml"

if [ $# -gt 0 ]; then
  URLS="$*"
  COUNT=$#
  echo "Submitting ${COUNT} specified URL(s) to IndexNow..."
else
  echo "Fetching sitemap from ${SITEMAP_URL}..."
  URLS=$(curl -s "$SITEMAP_URL" | grep -oP '<loc>\K[^<]+')
  COUNT=$(echo "$URLS" | wc -l)
  echo "Submitting ${COUNT} URLs (full sitemap) to IndexNow..."
fi

URL_JSON=$(echo "$URLS" | tr ' ' '\n' | awk 'NF {printf "      \"%s\",\n", $0}' | sed '$ s/,$//')

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "{
    \"host\": \"${HOST}\",
    \"key\": \"${KEY}\",
    \"keyLocation\": \"https://${HOST}/${KEY}.txt\",
    \"urlList\": [
${URL_JSON}
    ]
  }")

if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "202" ]; then
  echo "IndexNow accepted (HTTP ${RESPONSE}) — ${COUNT} URL(s) submitted."
else
  echo "IndexNow error (HTTP ${RESPONSE})" >&2
  exit 1
fi
