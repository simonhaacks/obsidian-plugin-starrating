#!/bin/bash

# Quick development update script
echo "🚀 Updating Star Rating Plugin..."

# Build the plugin
echo "📦 Building..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Copy to vault
echo "📂 Copying to vault..."
VAULT_PATH="/Users/simon.haacks/vault_starrating/Starrating/.obsidian/plugins/star-rating"
cp main.js "$VAULT_PATH/" 2>/dev/null && echo "✅ Plugin updated"

echo "🔄 Reload Obsidian (Ctrl+R) to see changes"
echo ""
echo "💡 Performance optimizations:"
echo "   - ⚡ Debounced updates (300ms delay)"
echo "   - 🎯 Smart change detection"
echo "   - 🚀 Incremental processing"
echo "   - 🔇 Reduced logging"