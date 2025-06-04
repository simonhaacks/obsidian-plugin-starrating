// JavaScript to generate daily notes - Run this in browser console
// Copy the output and save as individual notes in your vault

function generateDailyNotes() {
    const notes = [];
    
    // Function to generate random rating (0-5)
    function randomRating() {
        return Math.floor(Math.random() * 6);
    }
    
    // Function to get date string
    function getDateString(daysAgo) {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString().split('T')[0];
    }
    
    // Generate 50 daily notes
    for (let i = 0; i < 50; i++) {
        const date = getDateString(i);
        const sleep = randomRating();
        const motivation = randomRating();
        const energy = randomRating();
        const sport = randomRating();
        const workMotivation = randomRating();
        
        const note = `# Daily Note - ${date}

## Ratings

**Sleep Quality**: {{stars:sleep:${sleep}}} (sleep:: ${sleep})
**Motivation**: {{stars:motivation:${motivation}}} (motivation:: ${motivation})
**Energy Level**: {{stars:energy:${energy}}} (energy:: ${energy})
**Sport/Exercise**: {{stars:sport:${sport}}} (sport:: ${sport})
**Work Motivation**: {{stars:work_motivation:${workMotivation}}} (work_motivation:: ${workMotivation})

## Notes

Today was a day with ${energy}/5 energy and ${motivation}/5 motivation. 
${sport > 3 ? "Had a good workout session! 💪" : "Need to focus more on exercise."}
${workMotivation > 3 ? "Productive work day! 🚀" : "Work felt challenging today."}
${sleep > 3 ? "Slept well last night. 😴" : "Could use better sleep."}

## Tags
#daily-note #ratings #year-2025

---`;

        notes.push({
            filename: `${date}.md`,
            content: note
        });
    }
    
    return notes;
}

// Generate and display the notes
const dailyNotes = generateDailyNotes();

console.log("📝 Generated 50 daily notes! Copy each one to create individual files:");
console.log("===================================================================");

dailyNotes.forEach((note, index) => {
    console.log(`\n🗓️ FILE: ${note.filename}`);
    console.log("─".repeat(50));
    console.log(note.content);
    console.log("═".repeat(50));
});

// Also create a summary for easy copying
const summaryTable = dailyNotes.map(note => {
    const content = note.content;
    const sleep = content.match(/sleep:(\d+)/)[1];
    const motivation = content.match(/motivation:(\d+)/)[1];
    const energy = content.match(/energy:(\d+)/)[1];
    const sport = content.match(/sport:(\d+)/)[1];
    const workMotivation = content.match(/work_motivation:(\d+)/)[1];
    
    return `${note.filename.replace('.md', '')} | ${sleep} | ${motivation} | ${energy} | ${sport} | ${workMotivation}`;
});

console.log("\n📊 SUMMARY TABLE (for quick reference):");
console.log("Date | Sleep | Motivation | Energy | Sport | Work");
console.log("─".repeat(60));
summaryTable.forEach(row => console.log(row));