# 🚀 Quick Setup: Daily Notes + Dataview Reports

## Method 1: Manual Setup (Recommended)

### Step 1: Copy Sample Notes
1. **Create a "Daily Notes" folder** in your vault
2. **Copy the 4 sample notes** from `/sample-notes/` to your vault's "Daily Notes" folder:
   - `2025-06-02.md` (mixed ratings)
   - `2025-06-01.md` (low energy day)
   - `2025-05-31.md` (great day!)
   - `2025-05-30.md` (rough day)

### Step 2: Create Dashboard
1. **Copy** `📊 Star Rating Dashboard.md` to your vault
2. **Open it** - you should see dataview reports with your sample data!

### Step 3: Add More Notes (Optional)
Create more daily notes with this template:

```markdown
# Daily Note - YYYY-MM-DD

## Ratings

**Sleep Quality**: {{stars:sleep:X}} (sleep:: X)
**Motivation**: {{stars:motivation:X}} (motivation:: X)
**Energy Level**: {{stars:energy:X}} (energy:: X)
**Sport/Exercise**: {{stars:sport:X}} (sport:: X)
**Work Motivation**: {{stars:work_motivation:X}} (work_motivation:: X)

## Notes

Today was a day with X/5 energy and X/5 motivation.

## Tags
#daily-note #ratings #year-2025
```

## Method 2: Automated Generation

### Option A: Run the Shell Script
```bash
chmod +x generate-daily-notes.sh
./generate-daily-notes.sh
```

### Option B: Use JavaScript Generator
1. **Open browser console** (F12)
2. **Copy and paste** `generate-notes.js` content
3. **Run it** - copy the output to create individual notes

## Expected Results

Once set up, your dashboard will show:

### 📊 **Sample Data Analysis**
- **Average Sleep**: ~3.5/5
- **Average Energy**: ~2.8/5  
- **Best Day**: 2025-05-31 (Total: 23/25)
- **Rough Day**: 2025-05-30 (Total: 8/25)

### 📈 **Interactive Features**
- ✅ **Click stars** to update ratings
- ✅ **Real-time dataview updates**
- ✅ **Trend analysis** over time
- ✅ **Correlation insights**

### 🎯 **Useful Queries**

**Quick Performance Check**:
```dataview
LIST (sleep + motivation + energy + sport + work_motivation) as "Total Score"
FROM "Daily Notes" 
SORT file.name DESC
LIMIT 7
```

**This Week's Average**:
```dataview
TABLE WITHOUT ID
round(average(energy), 1) as "⚡ Energy This Week"
FROM "Daily Notes"
WHERE file.ctime >= date(today) - dur(7 days)
```

**Goal Tracking**:
```dataview
TABLE 
sleep >= 4 as "😴 Good Sleep",
energy >= 4 as "⚡ High Energy", 
sport >= 3 as "🏃 Active Day"
FROM "Daily Notes"
WHERE file.ctime >= date(today) - dur(7 days)
```

## Pro Tips

1. **Consistent Format**: Keep the metadata format `(attribute:: value)` for dataview
2. **Daily Habit**: Rate your day each evening
3. **Weekly Review**: Check your dashboard weekly for patterns
4. **Goal Setting**: Use the data to set realistic improvement targets
5. **Correlations**: Look for patterns (sleep → energy, sport → motivation)

## Troubleshooting

**Stars not showing?**
- Ensure plugin is enabled
- Check Live Preview mode
- Verify syntax: `{{stars:attribute:rating}}`

**Dataview not working?** 
- Install/enable Dataview plugin
- Check folder path matches ("Daily Notes")
- Verify metadata format: `(sleep:: 4)`

**No data in reports?**
- Make sure notes are in "Daily Notes" folder
- Check that metadata is present: `(attribute:: value)`
- Refresh the dashboard note

You now have a powerful personal analytics system! 🌟📊