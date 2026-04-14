#!/usr/bin/env bash
set -euo pipefail

# release.sh — Bump version, tag, and create GitHub release
# Usage: bash scripts/release.sh [--patch|--minor|--major|--version X.Y.Z]

BUMP="patch"
VERSION=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --patch) BUMP="patch"; shift ;;
    --minor) BUMP="minor"; shift ;;
    --major) BUMP="major"; shift ;;
    --version) VERSION="$2"; shift 2 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

# Get current version from package.json
CURRENT=$(node -p "require('./package.json').version")
echo "Current version: ${CURRENT}"

if [ -n "$VERSION" ]; then
  NEW_VERSION="$VERSION"
else
  IFS='.' read -r major minor patch <<< "$CURRENT"
  case "$BUMP" in
    patch) NEW_VERSION="${major}.${minor}.$((patch + 1))" ;;
    minor) NEW_VERSION="${major}.$((minor + 1)).0" ;;
    major) NEW_VERSION="$((major + 1)).0.0" ;;
  esac
fi

echo "New version: ${NEW_VERSION}"

# Update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '${NEW_VERSION}';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# Commit, tag, push
git add package.json
git commit -m "release: v${NEW_VERSION}"
git tag "v${NEW_VERSION}"
git push origin main
git push origin "v${NEW_VERSION}"

# Create GitHub release
if command -v gh &>/dev/null; then
  gh release create "v${NEW_VERSION}" --title "v${NEW_VERSION}" --generate-notes
  echo ""
  echo "GitHub release created: v${NEW_VERSION}"
else
  echo "gh CLI not available — tag pushed but no GitHub release created"
fi

echo ""
echo "Released: v${NEW_VERSION}"
