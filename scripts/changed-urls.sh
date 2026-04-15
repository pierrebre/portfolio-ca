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
    # Service pages
    app/routes/services/optimisation-web-performance.tsx)
      URLS="${URLS}${BASE_URL}/services/optimisation-web-performance\n" ;;
    app/routes/services/creation-maintenance-sites.tsx)
      URLS="${URLS}${BASE_URL}/services/creation-maintenance-sites\n" ;;
    app/routes/services/automatisation-workflows.tsx)
      URLS="${URLS}${BASE_URL}/services/automatisation-workflows\n" ;;
    app/routes/services/audits-techniques-core-web-vitals.tsx)
      URLS="${URLS}${BASE_URL}/services/audits-techniques-core-web-vitals\n" ;;
    app/routes/services/gestion-serveur-deploiement.tsx)
      URLS="${URLS}${BASE_URL}/services/gestion-serveur-deploiement\n" ;;
    app/routes/services/integration-outils-ia.tsx)
      URLS="${URLS}${BASE_URL}/services/integration-outils-ia\n" ;;
    app/routes/services/services._index.tsx)
      URLS="${URLS}${BASE_URL}/services\n" ;;
    # Project pages
    app/routes/projects/projects._index.tsx)
      URLS="${URLS}${BASE_URL}/projects\n" ;;
    app/routes/projects/projects.\$slug.tsx)
      URLS="${URLS}${BASE_URL}/projects\n" ;;
    # Main pages
    app/routes/home.tsx|app/components/hero.tsx)
      URLS="${URLS}${BASE_URL}/\n" ;;
    app/routes/about.tsx)
      URLS="${URLS}${BASE_URL}/about\n" ;;
    app/routes/contact.tsx)
      URLS="${URLS}${BASE_URL}/contact\n" ;;
    # Shared layout/components affect all pages — reindex homepage
    app/root.tsx|app/components/navbar.tsx|app/components/footer.tsx)
      URLS="${URLS}${BASE_URL}/\n" ;;
  esac
done <<< "$CHANGED_FILES"

# Deduplicate and output
if [ -n "$URLS" ]; then
  echo -e "$URLS" | sort -u | grep -v '^$'
fi
