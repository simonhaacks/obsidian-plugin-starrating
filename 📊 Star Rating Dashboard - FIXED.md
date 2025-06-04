# 📊 Star Rating Dashboard - FIXED

## Recent Ratings Overview

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
LIMIT 10
```

## Average Performance - FIXED

```dataview
TABLE WITHOUT ID
  "😴 Avg Sleep" as "Metric",
  round(average(rows.sleep), 1) as "Value"
FROM "Daily Notes"
WHERE sleep != null
```

```dataview
TABLE WITHOUT ID
  "🎯 Avg Motivation" as "Metric", 
  round(average(rows.motivation), 1) as "Value"
FROM "Daily Notes"
WHERE motivation != null
```

```dataview
TABLE WITHOUT ID
  "⚡ Avg Energy" as "Metric",
  round(average(rows.energy), 1) as "Value" 
FROM "Daily Notes"
WHERE energy != null
```

```dataview
TABLE WITHOUT ID
  "🏃 Avg Sport" as "Metric",
  round(average(rows.sport), 1) as "Value"
FROM "Daily Notes"
WHERE sport != null
```

```dataview
TABLE WITHOUT ID
  "💼 Avg Work" as "Metric",
  round(average(rows.work_motivation), 1) as "Value"
FROM "Daily Notes"
WHERE work_motivation != null
```

## High Energy Days 

```dataview
TABLE energy, motivation, work_motivation, file.name as "Date"
FROM "Daily Notes"
WHERE energy >= 4
SORT energy DESC
```

## Best Overall Days (Fixed Calculation)

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
WHERE sleep != null AND motivation != null AND energy != null AND sport != null AND work_motivation != null
WHERE (sleep + motivation + energy + sport + work_motivation) >= 18
SORT (sleep + motivation + energy + sport + work_motivation) DESC
```

## Low Performance Days

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
WHERE sleep != null AND motivation != null AND energy != null AND sport != null AND work_motivation != null
WHERE (sleep + motivation + energy + sport + work_motivation) < 10
SORT (sleep + motivation + energy + sport + work_motivation) ASC
```

## Monthly Summary - FIXED

```dataview
TABLE 
  dateformat(file.ctime, "yyyy-MM") as "Month",
  length(rows) as "Days",
  round(average(rows.sleep), 1) as "😴 Sleep",
  round(average(rows.motivation), 1) as "🎯 Motivation",
  round(average(rows.energy), 1) as "⚡ Energy",
  round(average(rows.sport), 1) as "🏃 Sport", 
  round(average(rows.work_motivation), 1) as "💼 Work"
FROM "Daily Notes"
WHERE sleep != null
GROUP BY dateformat(file.ctime, "yyyy-MM")
SORT dateformat(file.ctime, "yyyy-MM") DESC
```

## Simple Stats Summary

```dataview
LIST 
  "📊 Total Days: " + length(rows) + 
  " | Avg Sleep: " + round(average(rows.sleep), 1) +
  " | Avg Energy: " + round(average(rows.energy), 1) +
  " | Avg Motivation: " + round(average(rows.motivation), 1)
FROM "Daily Notes"
WHERE sleep != null
```

## All Your Data (Debug View)

```dataview
TABLE 
  sleep, motivation, energy, sport, work_motivation,
  (sleep + motivation + energy + sport + work_motivation) as "Total"
FROM "Daily Notes"
WHERE sleep != null
SORT file.name DESC
```

---

## 🎯 Quick Insights

### Based on Your Data:
- **You have data!** ✅ The queries are finding your notes
- **Sport & Work** seem to be your focus areas (lots of variety)
- **Several low-energy days** but also some good ones
- **Good range** of data for analysis

### Common Issues Fixed:
- ✅ **`count()` → `length(rows)`** (compatibility)
- ✅ **Better WHERE clauses** (null checks)
- ✅ **Simplified average calculations**
- ✅ **More robust grouping**

### Next Steps:
1. **Replace your dashboard** with this fixed version
2. **Check which queries work** now
3. **Add more daily notes** to see better trends
4. **Customize the queries** based on what you find useful!