# 🌟 Star Rating Plugin for Obsidian

Add interactive 5-star ratings anywhere in your notes with automatic dataview integration!

![Demo](https://img.shields.io/badge/Obsidian-Plugin-purple) ![Version](https://img.shields.io/badge/version-1.0.0-blue) ![License](https://img.shields.io/badge/license-Apache%202.0-green)

## ✨ Features

- **Interactive Stars**: Click to rate 1-5 ⭐⭐⭐⭐⭐
- **Live Preview**: Works while editing in Live Preview mode
- **Reading View**: Full functionality in reading/preview mode  
- **Dataview Integration**: Automatic metadata generation for analytics
- **Performance Optimized**: Smooth, debounced updates with no lag
- **Easy Syntax**: Simple `{{stars:attribute:rating}}` format

## 🎯 Use Cases

- **Daily Notes**: Track energy, mood, sleep, productivity
- **Book Reviews**: Rate plot, characters, writing style
- **Project Management**: Progress, satisfaction, difficulty tracking
- **Health Monitoring**: Symptom severity, treatment effectiveness
- **Learning Progress**: Understanding, engagement, retention

## 📝 Usage

### Basic Syntax
```markdown
Energy Level: {{stars:energy_level:4}}
Mood: {{stars:mood:3}}
Sleep Quality: {{stars:sleep_quality:5}}
```

### Visual Result
- Energy Level: ⭐⭐⭐⭐☆ 4/5
- Mood: ⭐⭐⭐☆☆ 3/5  
- Sleep Quality: ⭐⭐⭐⭐⭐ 5/5

### Automatic Metadata
The plugin automatically generates dataview-compatible metadata:
```markdown
Energy Level: {{stars:energy_level:4}} (energy_level:: 4)
```

## 📊 Dataview Integration

Create powerful analytics dashboards:

```dataview
TABLE energy_level, mood, sleep_quality
FROM "Daily Notes"
WHERE energy_level >= 4
SORT file.name DESC
```

```dataview
TABLE WITHOUT ID
  round(average(energy_level), 1) as "Avg Energy",
  round(average(mood), 1) as "Avg Mood"
FROM "Daily Notes"
WHERE energy_level != null
```

## 🚀 Installation

### From GitHub Releases (Recommended)
1. Download the latest release from [Releases](../../releases)
2. Extract files to `[vault]/.obsidian/plugins/star-rating/`
3. Restart Obsidian
4. Enable the plugin in Settings → Community plugins

### Manual Installation
1. Download `main.js` and `manifest.json` from releases
2. Create folder: `[vault]/.obsidian/plugins/star-rating/`
3. Copy the files to this folder
4. Restart Obsidian and enable the plugin

### BRAT Plugin (Beta Testing)
1. Install the BRAT plugin
2. Add this repository: `simonhaacks/obsidian-plugin-starrating`
3. BRAT will handle installation and updates

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
TABLE 
  file.name as "Date",
  energy as "⚡",
  mood as "🎯", 
  sleep as "😴",
  (energy + mood + sleep) as "Total"
FROM "Daily Notes"
WHERE energy != null
SORT file.name DESC
LIMIT 7
```

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm or yarn
- TypeScript

### Setup
```bash
git clone https://github.com/simonhaacks/obsidian-plugin-starrating.git
cd obsidian-plugin-starrating
npm install
```

### Development Workflow
```bash
# Start development build (watches for changes)
npm run dev

# Install to test vault
./dev-helper.sh install-vault "/path/to/test/vault"

# Build for production
npm run build
```

### Project Structure
```
src/
├── main.ts          # Plugin entry point
├── types.ts         # TypeScript interfaces
├── parser.ts        # Syntax parsing
├── renderer.ts      # Star component rendering
├── controller.ts    # Event handling
├── metadata.ts      # Dataview integration
└── editor-extension.ts  # Live Preview support
```

## 📋 Requirements

- Obsidian v0.15.0 or higher
- Community plugins enabled
- Dataview plugin (optional, for analytics)

## 🐛 Troubleshooting

### Stars show as plain text?
- Ensure plugin is enabled in Community plugins
- Try switching to Reading view
- Check syntax: `{{stars:attribute:rating}}`

### Dataview queries not working?
- Install and enable the Dataview plugin
- Verify metadata format: `(attribute:: value)`
- Check file paths in queries

### Performance issues?
- Plugin is optimized with 300ms debouncing
- Check browser console for errors
- Restart Obsidian if needed

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

### Development Commands
```bash
npm run dev          # Development build
npm run build        # Production build
npm run test         # Run tests (if available)
npm run lint         # Code linting
```

## 📄 License

Apache License 2.0 - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the [Obsidian](https://obsidian.md) community
- Inspired by the need for better note analytics
- Thanks to all beta testers and contributors

## 📊 Analytics Examples

The plugin enables powerful personal analytics. Here are some query ideas:

**Weekly Energy Trends**:
```dataview
TABLE 
  dateformat(file.ctime, "yyyy-'W'WW") as "Week",
  round(average(rows.energy), 1) as "Energy"
FROM "Daily Notes"
GROUP BY dateformat(file.ctime, "yyyy-'W'WW")
SORT dateformat(file.ctime, "yyyy-'W'WW") DESC
```

**Sleep vs Energy Correlation**:
```dataview
TABLE sleep, energy, (sleep + energy) as "Combined"
FROM "Daily Notes"  
WHERE sleep >= 4 AND energy >= 4
SORT file.name DESC
```

**Goal Tracking**:
```dataview
TABLE 
  energy >= 4 as "High Energy",
  mood >= 4 as "Good Mood",
  sleep >= 4 as "Good Sleep"
FROM "Daily Notes"
WHERE file.ctime >= date(today) - dur(7 days)
```

---

**Transform your notes into a powerful personal analytics system!** 🌟📊