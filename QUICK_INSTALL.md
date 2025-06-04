# 🚀 Quick Installation Commands

## Install to Your Real Vault

### Step 1: Find Your Real Vault Path
```bash
# Common locations:
ls "/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/"
```

### Step 2: Install Plugin  
```bash
cd /Users/simon.haacks/DEV-local/claude/obsidian-starrating

# Option A: Use installer script
chmod +x install-to-vault.sh
./install-to-vault.sh "/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/[YOUR_REAL_VAULT_NAME]"

# Option B: Manual copy
REAL_VAULT="/Users/simon.haacks/Library/Mobile Documents/iCloud~md~obsidian/Documents/[YOUR_REAL_VAULT_NAME]"
mkdir -p "$REAL_VAULT/.obsidian/plugins/star-rating"
cp main.js "$REAL_VAULT/.obsidian/plugins/star-rating/"
cp manifest.json "$REAL_VAULT/.obsidian/plugins/star-rating/"
```

### Step 3: Enable in Obsidian
1. Open your real vault in Obsidian
2. Settings → Community plugins → "Star Rating" → Enable
3. Test: `{{stars:test:3}}`

## Share with Others

### Create Distribution Package
```bash
cd /Users/simon.haacks/DEV-local/claude/obsidian-starrating

# Create shareable package
chmod +x create-dist.sh
./create-dist.sh

# Package created in 'dist/' folder
zip -r star-rating-plugin.zip dist/
```

### Send to Others
1. **Share** `star-rating-plugin.zip`
2. **They extract** and follow `README.md`
3. **They install** using `install.sh` script or manual copy

## Quick Test Instructions

Send this to anyone testing the plugin:

```markdown
# Star Rating Plugin - Test Instructions

## Installation
1. Extract the zip file
2. Run: ./install.sh "/path/to/your/vault"
3. Restart Obsidian  
4. Enable: Settings → Community plugins → "Star Rating"

## Quick Test
Add to any note:
{{stars:energy:0}}
{{stars:mood:3}}

Click the stars! Should see: ⭐⭐⭐☆☆ 3/5

## Dataview Test (if you have Dataview plugin)
```dataview
TABLE energy, mood
FROM ""
WHERE energy > 0
```

Report any issues! 🌟
```

## Troubleshooting for Others

Common installation paths:
- **macOS**: `/Users/[username]/Library/Mobile Documents/iCloud~md~obsidian/Documents/[VaultName]`
- **Windows**: `C:\Users\[username]\Documents\[VaultName]` 
- **Linux**: `/home/[username]/Documents/[VaultName]`

Plugin files must be in:
`[VaultPath]/.obsidian/plugins/star-rating/main.js`
`[VaultPath]/.obsidian/plugins/star-rating/manifest.json`