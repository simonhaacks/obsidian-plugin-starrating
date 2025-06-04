#!/bin/bash

# Star Rating Plugin - Development Helper Script
# Usage: ./dev-helper.sh [command]

VAULT_NAME="Starrating"
VAULT_PATH="/Users/simon.haacks/vault_starrating/Starrating"
PLUGIN_PATH="$VAULT_PATH/.obsidian/plugins/star-rating"

case "$1" in
    "install")
        echo "🔧 Installing plugin to test vault..."
        mkdir -p "$PLUGIN_PATH"
        cp main.js "$PLUGIN_PATH/" 2>/dev/null || echo "❌ main.js not found - run 'npm run dev' first"
        cp manifest.json "$PLUGIN_PATH/"
        echo "✅ Plugin installed! Restart Obsidian to see changes."
        ;;
    
    "install-vault")
        if [ -z "$2" ]; then
            echo "🌟 Install plugin to any vault"
            echo "Usage: ./dev-helper.sh install-vault \"/path/to/vault\""
            echo ""
            echo "Examples:"
            echo "  ./dev-helper.sh install-vault \"/Users/simon.haacks/.../MyVault\""
            exit 1
        fi
        
        TARGET_VAULT="$2"
        TARGET_PLUGIN_PATH="$TARGET_VAULT/.obsidian/plugins/star-rating"
        
        if [ ! -d "$TARGET_VAULT/.obsidian" ]; then
            echo "❌ Not an Obsidian vault: $TARGET_VAULT"
            exit 1
        fi
        
        echo "🔧 Installing plugin to: $TARGET_VAULT"
        mkdir -p "$TARGET_PLUGIN_PATH"
        cp main.js "$TARGET_PLUGIN_PATH/" 2>/dev/null || echo "❌ main.js not found - run 'npm run dev' first"
        cp manifest.json "$TARGET_PLUGIN_PATH/"
        echo "✅ Plugin installed! Restart Obsidian and enable the plugin."
        ;;
    
    "update")
        echo "🔄 Updating plugin..."
        cp main.js "$PLUGIN_PATH/" 2>/dev/null || echo "❌ main.js not found - run 'npm run dev' first"
        echo "✅ Plugin updated! Press Ctrl+R in Obsidian to reload."
        ;;
    
    "build")
        echo "🏗️  Building plugin..."
        npm run build
        if [ $? -eq 0 ]; then
            echo "✅ Build successful!"
        else
            echo "❌ Build failed!"
            exit 1
        fi
        ;;
    
    "dev")
        echo "🚀 Starting development mode..."
        echo "   - Building and watching for changes"
        echo "   - Use './dev-helper.sh update' to copy changes to vault"
        npm run dev
        ;;
    
    "test")
        echo "🧪 Creating test note..."
        TEST_NOTE="$VAULT_PATH/Star Rating Test.md"
        cat > "$TEST_NOTE" << 'EOF'
# Star Rating Test

## Basic Ratings
Energy Level: {{stars:energy_level:0}}
Mood: {{stars:mood:3}} 
Focus: {{stars:focus:5}}
Sleep Quality: {{stars:sleep_quality:0}}

## Different Attributes
Motivation: {{stars:motivation:2}}
Stress Level: {{stars:stress:4}}
Happiness: {{stars:happiness:4}}
Productivity: {{stars:productivity:1}}

## Test Cases
Zero Rating: {{stars:zero_test:0}}
Max Rating: {{stars:max_test:5}}
Mid Rating: {{stars:mid_test:3}}

## Instructions
1. Click on stars to change ratings
2. Check console (Ctrl+Shift+I) for debug messages
3. Verify markdown updates when you click
4. Test hover effects
EOF
        echo "✅ Test note created: '$TEST_NOTE'"
        ;;
    
    "logs")
        echo "📋 Recent Obsidian console logs:"
        echo "   (Open Obsidian, press Ctrl+Shift+I, check Console tab)"
        echo ""
        echo "Expected logs when plugin loads:"
        echo "   🌟 Loading Star Rating Plugin"
        echo "   ⭐ Clicked star X for attribute_name"
        echo "   📝 Updated attribute_name to X/5"
        ;;
    
    "clean")
        echo "🧹 Cleaning build files..."
        rm -f main.js main.js.map
        echo "✅ Cleaned!"
        ;;
    
    "status")
        echo "📊 Plugin Development Status:"
        echo ""
        echo "Files:"
        [ -f "main.js" ] && echo "   ✅ main.js (built)" || echo "   ❌ main.js (not built)"
        [ -f "manifest.json" ] && echo "   ✅ manifest.json" || echo "   ❌ manifest.json"
        [ -d "src" ] && echo "   ✅ src/ directory" || echo "   ❌ src/ directory"
        [ -d "node_modules" ] && echo "   ✅ node_modules (dependencies installed)" || echo "   ❌ node_modules (run 'npm install')"
        echo ""
        echo "Test Vault:"
        [ -d "$VAULT_PATH" ] && echo "   ✅ Vault exists: $VAULT_NAME" || echo "   ❌ Vault not found: $VAULT_NAME"
        [ -d "$PLUGIN_PATH" ] && echo "   ✅ Plugin directory exists" || echo "   ❌ Plugin directory missing"
        [ -f "$PLUGIN_PATH/main.js" ] && echo "   ✅ Plugin installed" || echo "   ❌ Plugin not installed"
        ;;
    
    *)
        echo "🌟 Star Rating Plugin - Development Helper"
        echo ""
        echo "Usage: ./dev-helper.sh [command]"
        echo ""
        echo "Commands:"
        echo "   install      - Install plugin to test vault"
        echo "   install-vault - Install plugin to any vault (specify path)"
        echo "   update       - Update plugin in test vault"
        echo "   build        - Build plugin for production"
        echo "   dev          - Start development mode"
        echo "   test         - Create test note with sample ratings"
        echo "   logs         - Show expected console logs"
        echo "   clean        - Remove build files"
        echo "   status       - Check development status"
        echo ""
        echo "Quick workflow:"
        echo "   1. npm install"
        echo "   2. ./dev-helper.sh dev"
        echo "   3. ./dev-helper.sh install (or install-vault for other vaults)"
        echo "   4. ./dev-helper.sh test"
        echo "   5. Make changes, then ./dev-helper.sh update"
        ;;
esac