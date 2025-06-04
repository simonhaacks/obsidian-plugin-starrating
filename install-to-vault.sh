#!/bin/bash

# Star Rating Plugin Installer
# Usage: ./install-to-vault.sh [vault-path]

echo "🌟 Star Rating Plugin Installer"
echo "=================================="

# Check if vault path is provided
if [ -z "$1" ]; then
    echo "📁 Please provide the path to your Obsidian vault:"
    echo "Usage: ./install-to-vault.sh \"/path/to/your/vault\""
    echo ""
    echo "Common vault locations:"
    echo "  macOS: \"/Users/[username]/Library/Mobile Documents/iCloud~md~obsidian/Documents/[VaultName]\""
    echo "  Windows: \"C:\\Users\\[username]\\Documents\\[VaultName]\""
    echo "  Linux: \"/home/[username]/Documents/[VaultName]\""
    exit 1
fi

VAULT_PATH="$1"

# Validate vault path
if [ ! -d "$VAULT_PATH" ]; then
    echo "❌ Error: Vault path does not exist: $VAULT_PATH"
    exit 1
fi

# Check if it's actually an Obsidian vault
if [ ! -d "$VAULT_PATH/.obsidian" ]; then
    echo "❌ Error: This doesn't appear to be an Obsidian vault (no .obsidian folder found)"
    echo "   Make sure you're pointing to the vault root, not a subfolder"
    exit 1
fi

# Create plugins directory if it doesn't exist
PLUGINS_DIR="$VAULT_PATH/.obsidian/plugins"
mkdir -p "$PLUGINS_DIR"

# Create star-rating plugin directory
PLUGIN_DIR="$PLUGINS_DIR/star-rating"
echo "📁 Creating plugin directory: $PLUGIN_DIR"
mkdir -p "$PLUGIN_DIR"

# Check if plugin files exist
if [ ! -f "main.js" ] || [ ! -f "manifest.json" ]; then
    echo "❌ Error: Plugin files not found in current directory"
    echo "   Make sure you're running this from the plugin development folder"
    echo "   Expected files: main.js, manifest.json"
    exit 1
fi

# Copy plugin files
echo "📋 Copying plugin files..."
cp main.js "$PLUGIN_DIR/" || { echo "❌ Failed to copy main.js"; exit 1; }
cp manifest.json "$PLUGIN_DIR/" || { echo "❌ Failed to copy manifest.json"; exit 1; }

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Restart Obsidian"
echo "2. Go to Settings → Community plugins"
echo "3. Find 'Star Rating' and enable it"
echo "4. Start using: {{stars:attribute_name:rating}}"
echo ""
echo "📊 Example usage:"
echo "Energy: {{stars:energy:4}}"
echo "Mood: {{stars:mood:3}}"
echo ""
echo "🎯 For dataview queries:"
echo "\`\`\`dataview"
echo "TABLE energy, mood"
echo "FROM \"\""
echo "WHERE energy > 3"
echo "\`\`\`"
echo ""
echo "🔧 If you have issues, check the console (Ctrl+Shift+I) for errors."

# Check if community plugins are enabled
COMMUNITY_PLUGINS_FILE="$VAULT_PATH/.obsidian/community-plugins.json"
if [ -f "$COMMUNITY_PLUGINS_FILE" ]; then
    if grep -q "star-rating" "$COMMUNITY_PLUGINS_FILE"; then
        echo "✅ Plugin is already enabled in community-plugins.json"
    else
        echo "📝 Note: You'll need to manually enable the plugin in Obsidian settings"
    fi
else
    echo "📝 Note: Community plugins file not found - you'll need to enable the plugin manually"
fi