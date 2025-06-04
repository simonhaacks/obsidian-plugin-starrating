# ✅ Setup Checklist - Star Rating Plugin

## Phase 1: Development Environment ✅ DONE

- [x] **Development directory created**: `/Users/simon.haacks/DEV-local/claude/obsidian-starrating`
- [x] **Source files organized** in `src/` folder:
  - [x] `src/main.ts` - Main plugin entry
  - [x] `src/types.ts` - TypeScript interfaces  
  - [x] `src/parser.ts` - Syntax parsing
  - [x] `src/renderer.ts` - Star components
  - [x] `src/controller.ts` - Event handling
  - [x] `src/metadata.ts` - Dataview integration
- [x] **Build configuration** ready:
  - [x] `package.json` - Dependencies
  - [x] `tsconfig.json` - TypeScript config
  - [x] `esbuild.config.mjs` - Build system
  - [x] `manifest.json` - Plugin metadata
- [x] **Development tools**:
  - [x] `.gitignore` - Git ignore rules
  - [x] `README.md` - Development guide
  - [x] `dev-helper.sh` - Convenience script

## Phase 2: Next Steps (TODO)

### Step 1: Install Dependencies
```bash
cd /Users/simon.haacks/DEV-local/claude/obsidian-starrating
npm install
```

### Step 2: Start Development Build
```bash
# Start watching for changes
npm run dev

# You should see: "[watch] build finished, watching for changes..."
```

### Step 3: Create Test Vault
1. **Open Obsidian**
2. **Create new vault** named "Star Rating Test" 
3. **Enable Community Plugins**:
   - Settings → Community plugins → Turn off "Safe mode"

### Step 4: Install Plugin in Test Vault
```bash
# Use the helper script
./dev-helper.sh install

# Or manually:
mkdir -p "/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/Star Rating Test/.obsidian/plugins/star-rating"
cp main.js "/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/Star Rating Test/.obsidian/plugins/star-rating/"
cp manifest.json "/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/Star Rating Test/.obsidian/plugins/star-rating/"
```

### Step 5: Enable Plugin in Obsidian
1. **Restart Obsidian** (or reload with Ctrl+R)
2. **Settings → Community plugins**
3. **Find "Star Rating"** and enable it
4. **Check console** (Ctrl+Shift+I) - should see "🌟 Loading Star Rating Plugin"

### Step 6: Test Basic Functionality
```bash
# Create test note
./dev-helper.sh test
```

Or manually create a note with:
```markdown
# Test Star Ratings

Energy Level: {{stars:energy_level:0}}
Mood: {{stars:mood:3}}
Focus: {{stars:focus:5}}
```

### Step 7: Verify Everything Works
- [ ] **Stars appear** as interactive elements (⭐/☆)
- [ ] **Clicking stars** updates the rating
- [ ] **Rating display** shows "3/5" format
- [ ] **Hover effects** work
- [ ] **Markdown updates** when you click stars
- [ ] **Console shows** debug messages

## Phase 3: Development Workflow

### Making Changes
1. **Edit files** in `src/`
2. **npm run dev** rebuilds automatically  
3. **Update plugin**: `./dev-helper.sh update`
4. **Reload Obsidian** (Ctrl+R)

### Helper Commands
```bash
./dev-helper.sh status    # Check development status
./dev-helper.sh update    # Copy changes to vault
./dev-helper.sh test      # Create test note
./dev-helper.sh logs      # Show expected console output
```

## Phase 4: Features to Add Later

- [ ] **Dataview metadata** (partially working)
- [ ] **Error handling** improvements
- [ ] **Mobile optimization**
- [ ] **Theme compatibility** testing
- [ ] **Performance optimization**
- [ ] **Advanced features** (custom scales, templates)

## Troubleshooting Guide

### Plugin Won't Load
- Check console for errors (Ctrl+Shift+I)
- Verify `main.js` exists and is valid
- Check `manifest.json` syntax
- Ensure plugin is enabled in settings

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

### Stars Don't Appear
- Verify syntax: `{{stars:attribute_name:rating}}`
- Check console for JavaScript errors
- Ensure plugin is properly enabled
- Try reloading with Ctrl+R

### Clicks Don't Work
- Check console for event handler errors
- Verify file write permissions
- Test with simple note first
- Check browser console for errors

## Success Indicators ✅

You'll know it's working when:
- ✅ Console shows: "🌟 Loading Star Rating Plugin"
- ✅ Stars render as interactive elements (not plain text)
- ✅ Clicking stars updates the visual display
- ✅ Markdown source updates when you click
- ✅ Rating display shows "X/5" next to stars
- ✅ Hover effects preview the rating

## Next Development Session

When you continue development:

1. **Start development build**: `npm run dev`
2. **Make your changes** in `src/` files
3. **Test changes**: `./dev-helper.sh update` → reload Obsidian
4. **Check console** for any errors
5. **Test in your notes** to verify functionality

## Support

If you run into issues:
1. Check the console first (Ctrl+Shift+I)
2. Verify the setup checklist steps
3. Try the helper script commands
4. Check the README.md for detailed guidance

You now have a complete, professional development environment for your star rating plugin! 🌟