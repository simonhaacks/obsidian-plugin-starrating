# 🚀 GitHub Repository Setup Guide

## Step 1: Create Repository ✅ 

You're already doing this! Your settings look perfect:
- Repository name: `obsidian-plugin-starrating`
- Description: "An Obsidian plugin to enable starrating options in notes"
- Public repository ✅
- Initialize with README ✅
- Apache License 2.0 ✅

**Click "Create repository" to proceed!**

## Step 2: Prepare Your Local Code

### A. Build the Plugin
```bash
cd /Users/simon.haacks/DEV-local/claude/obsidian-starrating

# Ensure you have the latest build
npm run build
```

### B. Initialize Git Repository
```bash
# Initialize git in your project folder
git init

# Add the GitHub remote (replace URL with your actual repo)
git remote add origin https://github.com/simonhaacks/obsidian-plugin-starrating.git
```

### C. Prepare Files for Commit
```bash
# Check what files we have
ls -la

# Should include:
# ✅ src/ folder with TypeScript source
# ✅ main.js (built plugin)
# ✅ manifest.json 
# ✅ package.json
# ✅ README.md
# ✅ .gitignore
# ✅ versions.json
```

## Step 3: Push Your Code

### A. Stage and Commit
```bash
# Add files to git
git add .

# Check what will be committed
git status

# Commit with a good message
git commit -m "Initial commit: Star Rating Plugin v1.0.0

- Interactive 5-star rating system
- Live Preview and Reading View support
- Dataview integration with auto-metadata
- Performance optimized with debouncing
- Complete TypeScript implementation"
```

### B. Push to GitHub
```bash
# Push to main branch
git branch -M main
git push -u origin main
```

## Step 4: Create Your First Release

### A. Via GitHub Web Interface (Recommended)

1. **Go to your repository** on GitHub
2. **Click "Releases"** on the right sidebar
3. **Click "Create a new release"**
4. **Tag version**: `1.0.0`
5. **Release title**: `v1.0.0 - Initial Release`
6. **Description**:
```markdown
## 🌟 Star Rating Plugin v1.0.0

First stable release of the Star Rating Plugin for Obsidian!

### ✨ Features
- Interactive 5-star ratings with click-to-rate functionality
- Works in both Live Preview editing and Reading modes
- Automatic dataview metadata generation
- Performance optimized with smart debouncing
- Simple syntax: `{{stars:attribute:rating}}`

### 📦 Installation
1. Download `main.js` and `manifest.json` from assets below
2. Copy to `[vault]/.obsidian/plugins/star-rating/`
3. Restart Obsidian and enable the plugin

### 🎯 Quick Start
```markdown
Energy: {{stars:energy:4}}
Mood: {{stars:mood:3}}
```

### 📊 Dataview Integration
Automatically creates metadata for analytics:
```dataview
TABLE energy, mood
FROM ""
WHERE energy > 3
```

Happy rating! 🌟
```

7. **Upload files**: 
   - Drag and drop `main.js`
   - Drag and drop `manifest.json`
   
8. **Click "Publish release"**

### B. Via Command Line (Alternative)
```bash
# Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Then create release on GitHub web interface
```

## Step 5: Verify Everything Works

### A. Test Installation from GitHub
1. **Download your release files**
2. **Install in a test vault**
3. **Verify everything works**

### B. Update Documentation
Add to your repository:
- Installation instructions
- Usage examples  
- Screenshots/GIFs (optional but great)
- Troubleshooting guide

## Step 6: Share Your Plugin

### A. Community Sharing
- Share on Obsidian Discord in #plugin-dev
- Post on Reddit r/ObsidianMD
- Add to community plugin lists

### B. BRAT Installation Support
Your repository is now BRAT-compatible! Users can install via:
1. Install BRAT plugin
2. Add your repo: `simonhaacks/obsidian-plugin-starrating`

### C. Future Updates
For updates:
1. Make changes in your local code
2. Update version in `manifest.json`
3. Build: `npm run build`
4. Commit and push changes
5. Create new release with updated files

## Step 7: Optional Enhancements

### A. Add GitHub Actions (CI/CD)
Create `.github/workflows/release.yml`:
```yaml
name: Release Obsidian Plugin

on:
  push:
    tags:
      - "*"

env:
  PLUGIN_NAME: star-rating

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: "14.x"
      - name: Build
        run: |
          npm install
          npm run build
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
      - name: Upload main.js
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./main.js
          asset_name: main.js
          asset_content_type: application/javascript
      - name: Upload manifest.json
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./manifest.json
          asset_name: manifest.json
          asset_content_type: application/json
```

### B. Add Issue Templates
Create `.github/ISSUE_TEMPLATE/bug_report.md` and `feature_request.md`

### C. Add Contributing Guidelines
Create `CONTRIBUTING.md` with development setup instructions

## 🎯 Your Repository Will Have

After following this guide:
- ✅ **Professional README** with examples and installation instructions
- ✅ **Proper releases** with downloadable plugin files
- ✅ **BRAT compatibility** for easy beta testing
- ✅ **Version tracking** for Obsidian compatibility
- ✅ **Open source** for community contributions
- ✅ **Easy distribution** via GitHub releases

## 🌟 Next Steps

1. **Create the repository** (you're doing this now!)
2. **Follow steps 2-4** to push code and create first release
3. **Test installation** from your GitHub release
4. **Share with the community**
5. **Iterate and improve** based on feedback

Your star rating plugin will be professionally distributed and easy for others to install! 🚀