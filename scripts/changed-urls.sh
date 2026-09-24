#!/usr/bin/env bash
# Detect changed URLs from git diff and map file paths to live URLs
# Usage: ./scripts/changed-urls.sh <base-sha> <head-sha>

set -euo pipefail

BASE_SHA="${1:?Usage: changed-urls.sh <base-sha> <head-sha>}"
HEAD_SHA="${2:?Usage: changed-urls.sh <base-sha> <head-sha>}"
BASE_URL="https://pierrebarbe.ca"

CHANGED_FILES=$(git diff --name-only --diff-filter=ACMR "$BASE_SHA" "$HEAD_SHA")

URLS=""

while IFS= read -r file; do
  [ -z "$file" ] && continue

  case "$file" in
    # Blog posts
    content/blog/*.mdx)
      slug=$(basename "$file" .mdx)
      URLS="${URLS}${BASE_URL}/blog/${slug}\n"
      # Also reindex /blog index
      URLS="${URLS}${BASE_URL}/blog\n"
      ;;
    # Études de cas : la carte sur /projects, et la page si le fichier a un corps
    content/projects/*.mdx)
      URLS="${URLS}${BASE_URL}/projects\n"
      if awk 'c>=2{print} /^---$/{c++}' "$file" | grep -q '[^[:space:]]'; then
        URLS="${URLS}${BASE_URL}/projects/$(basename "$file" .mdx)\n"
      fi
      ;;
  esac
done <<< "$CHANGED_FILES"

# Pages fixes : celles dont la date a changé dans data/lastmod.json (tenu à
# jour par « pnpm lastmod », qui détecte tout changement de contenu rendu).
while IFS= read -r path; do
  [ -n "$path" ] && URLS="${URLS}${BASE_URL}${path}\n"
done < <(node -e '
  const [before, after] = process.argv.slice(1).map((s) => (s ? JSON.parse(s) : {}));
  for (const [path, e] of Object.entries(after)) if (before[path]?.lastmod !== e.lastmod) console.log(path);
' "$(git show "$BASE_SHA:data/lastmod.json" 2>/dev/null || true)" "$(git show "$HEAD_SHA:data/lastmod.json" 2>/dev/null || true)")

# Deduplicate and output
if [ -n "$URLS" ]; then
  echo -e "$URLS" | sort -u | grep -v '^$'
fi
