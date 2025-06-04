#!/bin/bash

# Daily Notes Generator for Star Rating Plugin Testing
# Generates 50 daily notes with randomized star ratings

VAULT_PATH="/Users/simon.haacks/vault_starrating/Starrating"
NOTES_DIR="$VAULT_PATH/Daily Notes"

echo "🗓️ Generating 50 daily notes with star ratings..."

# Create Daily Notes directory
mkdir -p "$NOTES_DIR"

# Function to generate random rating (0-5)
random_rating() {
    echo $((RANDOM % 6))
}

# Function to generate a daily note
generate_daily_note() {
    local date=$1
    local filename="$NOTES_DIR/${date}.md"
    
    # Generate random ratings
    local sleep=$(random_rating)
    local motivation=$(random_rating)
    local energy=$(random_rating)
    local sport=$(random_rating)
    local work_motivation=$(random_rating)
    
    # Create the note content
    cat > "$filename" << EOF
# Daily Note - ${date}

## Ratings

**Sleep Quality**: {{stars:sleep:${sleep}}} (sleep:: ${sleep})
**Motivation**: {{stars:motivation:${motivation}}} (motivation:: ${motivation})
**Energy Level**: {{stars:energy:${energy}}} (energy:: ${energy})
**Sport/Exercise**: {{stars:sport:${sport}}} (sport:: ${sport})
**Work Motivation**: {{stars:work_motivation:${work_motivation}}} (work_motivation:: ${work_motivation})

## Notes

Today was a day with ${energy}/5 energy and ${motivation}/5 motivation. 
$([ $sport -gt 3 ] && echo "Had a good workout session! 💪" || echo "Need to focus more on exercise.")
$([ $work_motivation -gt 3 ] && echo "Productive work day! 🚀" || echo "Work felt challenging today.")
$([ $sleep -gt 3 ] && echo "Slept well last night. 😴" || echo "Could use better sleep.")

## Tags
#daily-note #ratings #year-2025
EOF

    echo "📝 Created: ${date} (Sleep:${sleep}, Motivation:${motivation}, Energy:${energy}, Sport:${sport}, Work:${work_motivation})"
}

# Generate notes for the last 50 days
for i in {0..49}; do
    # Calculate date (macOS date command)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        date=$(date -v-${i}d +"%Y-%m-%d")
    else
        # Linux date command
        date=$(date -d "${i} days ago" +"%Y-%m-%d")
    fi
    
    generate_daily_note "$date"
done

echo ""
echo "✅ Generated 50 daily notes in '$NOTES_DIR'"
echo "🌟 Each note contains 5 star ratings with randomized values"
echo "📊 Ready for dataview analysis!"