#!/bin/bash

# Create distribution package for Star Rating Plugin
echo "📦 Creating distribution package..."

# Create dist directory
mkdir -p dist

# Copy plugin files
echo "📋 Copying plugin files..."
cp main.js dist/
cp manifest.json dist/

# Create installation README
cat > dist/README.md << 'EOF'
# 🌟 Star Rating Plugin for Obsidian

Add interactive 5-star ratings anywhere in your notes with automatic dataview integration!

## ✨ Features

- **Interactive Stars**: Click to rate 1-5 ⭐⭐⭐⭐⭐
- **Dataview Ready**: Automatic metadata generation
- **Live Preview**: Works while editing
- **Performance Optimized**: Smooth, no lag

## 🚀 Quick Installation

### Method 1: Manual Install
1. **Copy files** to your vault:
   ```
   [YourVault]/.obsidian/plugins/star-rating/
   ├── main.js
   └── manifest.json
   ```

2. **Restart Obsidian**
3. **Enable plugin**: Settings → Community plugins → "Star Rating"

### Method 2: Command Line (macOS/Linux)
```bash
# Navigate to this folder, then run:
./install.sh "/path/to/your/vault"
```

## 📝 Usage

Add star ratings anywhere in your notes:

```markdown
Energy Level: {{stars:energy_level:4}}
Mood: {{stars:mood:3}}
Sleep Quality: {{stars:sleep_quality:5}}
```

**Result**: Interactive stars with rating display!
- Energy Level: ⭐⭐⭐⭐☆ 4/5
- Mood: ⭐⭐⭐☆☆ 3/5  
- Sleep Quality: ⭐⭐⭐⭐⭐ 5/5

## 📊 Dataview Integration

The plugin automatically creates metadata for dataview queries:

```dataview
TABLE energy_level, mood, sleep_quality
FROM ""
WHERE energy_level >= 4
SORT file.name DESC
```

## 🎯 Use Cases

- **Daily Notes**: Track energy, mood, productivity
- **Book Reviews**: Rate plot, characters, writing
- **Project Tracking**: Progress, satisfaction, difficulty  
- **Health Monitoring**: Symptoms, treatments, recovery

## 🔧 Troubleshooting

### Plugin doesn't appear?
- Check file paths are correct
- Restart Obsidian completely
- Disable "Safe mode" in Community plugins

### Stars show as text?
- Make sure plugin is enabled
- Try in Reading view first
- Check syntax: `{{stars:attribute:rating}}`

### Console errors?
- Open Developer Tools (Ctrl+Shift+I)
- Look for error messages
- Ensure files copied correctly

## 📋 Requirements

- Obsidian v0.15.0 or higher
- Community plugins enabled
- Dataview plugin (optional, for analytics)

## 🎓 Examples

### Daily Note Template
```markdown
# Daily Note - {{date:YYYY-MM-DD}}

## Daily Ratings
**Energy**: {{stars:energy:0}}
**Mood**: {{stars:mood:0}}  
**Sleep**: {{stars:sleep:0}}
**Exercise**: {{stars:exercise:0}}
**Work**: {{stars:work:0}}

## Notes
[Your daily reflection...]
```

### Analytics Dashboard
```dataview
TABLE WITHOUT ID
  "Energy" as "Metric",
  round(average(rows.energy), 1) as "Average"
FROM ""
WHERE energy != null
```

## 📈 Pro Tips

- **Rate consistently** at the same time each day
- **Use 3-7 attributes** that matter to you  
- **Create dataview dashboards** for insights
- **Look for patterns** (sleep → energy correlation)

Happy rating! 🌟
EOF

# Create installation script for the package
cat > dist/install.sh << 'EOF'
#!/bin/bash

echo "🌟 Star Rating Plugin Installer"

if [ -z "$1" ]; then
    echo "Usage: ./install.sh \"/path/to/your/obsidian/vault\""
    exit 1
fi

VAULT_PATH="$1"
PLUGIN_DIR="$VAULT_PATH/.obsidian/plugins/star-rating"

if [ ! -d "$VAULT_PATH/.obsidian" ]; then
    echo "❌ Not an Obsidian vault: $VAULT_PATH"
    exit 1
fi

mkdir -p "$PLUGIN_DIR"
cp main.js "$PLUGIN_DIR/"
cp manifest.json "$PLUGIN_DIR/"

echo "✅ Installed! Restart Obsidian and enable the plugin."
EOF

chmod +x dist/install.sh

# Create version info
cat > dist/version.txt << EOF
Star Rating Plugin v1.0.0
Built: $(date)
Obsidian Compatibility: v0.15.0+
EOF

echo "✅ Distribution package created in 'dist/' folder!"
echo ""
echo "📦 Package contents:"
echo "  ├── main.js           - Plugin code"
echo "  ├── manifest.json     - Plugin metadata"  
echo "  ├── README.md         - Installation guide"
echo "  ├── install.sh        - Automated installer"
echo "  └── version.txt       - Version info"
echo ""
echo "🎁 Ready to share!"
echo "   1. Zip the 'dist/' folder"
echo "   2. Send to others"
echo "   3. They follow README.md instructions"