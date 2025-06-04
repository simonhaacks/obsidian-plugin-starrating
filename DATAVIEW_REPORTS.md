# 📊 Daily Notes & Dataview Reports

## Sample Daily Note Template

Here's what each generated daily note will look like:

```markdown
# Daily Note - 2025-05-20

## Ratings

**Sleep Quality**: {{stars:sleep:4}} (sleep:: 4)
**Motivation**: {{stars:motivation:3}} (motivation:: 3)
**Energy Level**: {{stars:energy:5}} (energy:: 5)
**Sport/Exercise**: {{stars:sport:2}} (sport:: 2)
**Work Motivation**: {{stars:work_motivation:4}} (work_motivation:: 4)

## Notes

Today was a day with 5/5 energy and 3/5 motivation. 
Need to focus more on exercise.
Productive work day! 🚀
Slept well last night. 😴

## Tags
#daily-note #ratings #year-2025
```

## How to Generate 50 Daily Notes

1. **Make the script executable**:
```bash
chmod +x generate-daily-notes.sh
```

2. **Run the generator**:
```bash
./generate-daily-notes.sh
```

This will create 50 daily notes with randomized star ratings in your vault's "Daily Notes" folder.

## Dataview Reports

### 1. **Ratings Overview Table**
```dataview
TABLE 
  sleep as "😴 Sleep",
  motivation as "🎯 Motivation", 
  energy as "⚡ Energy",
  sport as "🏃 Sport",
  work_motivation as "💼 Work"
FROM "Daily Notes"
WHERE sleep != null
SORT file.name DESC
LIMIT 20
```

### 2. **Average Ratings Summary**
```dataview
TABLE WITHOUT ID
  round(average(sleep), 1) as "😴 Avg Sleep",
  round(average(motivation), 1) as "🎯 Avg Motivation",
  round(average(energy), 1) as "⚡ Avg Energy", 
  round(average(sport), 1) as "🏃 Avg Sport",
  round(average(work_motivation), 1) as "💼 Avg Work"
FROM "Daily Notes"
WHERE sleep != null
```

### 3. **High Energy Days**
```dataview
TABLE energy, motivation, work_motivation, file.name as "Date"
FROM "Daily Notes"
WHERE energy >= 4
SORT energy DESC
```

### 4. **Correlation Analysis**
```dataview
TABLE 
  sleep,
  energy,
  (sleep + energy) as "Sleep+Energy",
  motivation,
  work_motivation
FROM "Daily Notes"  
WHERE sleep >= 4 AND energy >= 4
SORT file.name DESC
```

### 5. **Weekly Trends**
```dataview
TABLE 
  dateformat(file.ctime, "yyyy-'W'WW") as "Week",
  round(average(sleep), 1) as "😴",
  round(average(motivation), 1) as "🎯",
  round(average(energy), 1) as "⚡",
  round(average(sport), 1) as "🏃",
  round(average(work_motivation), 1) as "💼"
FROM "Daily Notes"
WHERE sleep != null
GROUP BY dateformat(file.ctime, "yyyy-'W'WW")
SORT dateformat(file.ctime, "yyyy-'W'WW") DESC
```

### 6. **Low Performance Days** 
```dataview
TABLE 
  file.name as "Date",
  sleep as "😴",
  motivation as "🎯", 
  energy as "⚡",
  sport as "🏃",
  work_motivation as "💼"
FROM "Daily Notes"
WHERE (sleep + motivation + energy + sport + work_motivation) < 10
SORT (sleep + motivation + energy + sport + work_motivation) ASC
```

### 7. **Best Days (High Across All Metrics)**
```dataview
TABLE 
  file.name as "Date",
  sleep as "😴",
  motivation as "🎯",
  energy as "⚡", 
  sport as "🏃",
  work_motivation as "💼",
  (sleep + motivation + energy + sport + work_motivation) as "Total"
FROM "Daily Notes"
WHERE (sleep + motivation + energy + sport + work_motivation) > 18
SORT (sleep + motivation + energy + sport + work_motivation) DESC
```

### 8. **Month-by-Month Comparison**
```dataview
TABLE 
  dateformat(file.ctime, "yyyy-MM") as "Month",
  count() as "Days",
  round(average(sleep), 1) as "😴 Sleep",
  round(average(motivation), 1) as "🎯 Motivation",
  round(average(energy), 1) as "⚡ Energy",
  round(average(sport), 1) as "🏃 Sport", 
  round(average(work_motivation), 1) as "💼 Work"
FROM "Daily Notes"
WHERE sleep != null
GROUP BY dateformat(file.ctime, "yyyy-MM")
SORT dateformat(file.ctime, "yyyy-MM") DESC
```

## Setup Instructions

1. **Generate the daily notes** using the script
2. **Create a new note** called "📊 Star Rating Dashboard"
3. **Copy any of the dataview queries above** into that note
4. **View the results** - your star ratings will show up as data!

## Advanced Analysis Ideas

- **Sleep vs Energy correlation**: See if better sleep leads to higher energy
- **Sport vs Motivation**: Check if exercise boosts motivation  
- **Weekly patterns**: Identify which days of the week are typically better
- **Trend analysis**: See if ratings improve over time
- **Goal tracking**: Set targets (e.g., average 4/5 energy) and track progress

The combination of interactive star ratings + dataview queries gives you a powerful personal analytics system! 🚀