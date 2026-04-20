#!/bin/bash

# Deploy all sites: root + generated subfolders
# This script ensures both the main site and all generated sites are published to gh-pages

set -e

echo "🔨 Building main site..."
npm run build

echo "📦 Preparing deployment folder..."
rm -rf deploy-temp
mkdir -p deploy-temp

# Copy root site files
echo "📄 Copying root site files..."
cp -r dist/* deploy-temp/

# Copy generated sites as subfolders
echo "📂 Copying generated site subfolders..."
if [ -d "generated-sites" ]; then
  for site in generated-sites/*/; do
    site_name=$(basename "$site")
    echo "  → $site_name"
    cp -r "$site" deploy-temp/"$site_name/"
  done
fi

echo "🚀 Deploying to gh-pages..."
npx gh-pages -d deploy-temp

echo "✅ Deployment complete!"
echo ""
echo "📍 Your sites are now live at:"
echo "   Main: https://guddukumaralgo-art.github.io/bright-smiles-demo/"
echo "   Generated sites: https://guddukumaralgo-art.github.io/bright-smiles-demo/{site-name}/"
