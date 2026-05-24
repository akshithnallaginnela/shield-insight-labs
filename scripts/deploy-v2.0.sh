#!/usr/bin/env bash
set -euo pipefail

# Deployment script for v2.0.0 — requires Cloudflare Pages / Wrangler configured.
# Usage: export WRANGLER_API_TOKEN=...; ./scripts/deploy-v2.0.sh

echo "Building project..."
npm install --no-audit --no-fund
npm run build

echo "Publishing to Cloudflare Pages (requires wrangler v2 and project configured)"
# Adjust project name and directory as needed. The command below publishes the built client directory.
if command -v wrangler >/dev/null 2>&1; then
  # If you use Pages:
  wrangler pages publish ./dist/client --project-name=shield-insight-labs
else
  echo "wrangler not found. Install @cloudflare/wrangler and configure your account to deploy."
  exit 1
fi

echo "Deployment script finished."
