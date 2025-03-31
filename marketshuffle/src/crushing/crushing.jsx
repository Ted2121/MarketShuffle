import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";

const stats = [
    { name: "AP", sink: 100 },
    { name: "MP", sink: 90 },
    { name: "Range", sink: 51 },
    { name: "Summons", sink: 30 },
    { name: "Damage", sink: 20 },
    { name: "% Critical Hits", sink: 10 },
    { name: "Heals", sink: 10 },
    { name: "Reflect", sink: 10 },
    { name: "AP Reduction", sink: 7 },
    { name: "MP Reduction", sink: 7 },
    { name: "AP Parry", sink: 7 },
    { name: "MP Parry", sink: 7 },
    { name: "% Earth Resistance", sink: 6 },
    { name: "% Fire Resistance", sink: 6 },
    { name: "% Air Resistance", sink: 6 },
    { name: "% Water Resistance", sink: 6 },
    { name: "% Neutral Resistance", sink: 6 },
    { name: "Earth Damage", sink: 5 },
    { name: "Fire Damage", sink: 5 },
    { name: "Air Damage", sink: 5 },
    { name: "Water Damage", sink: 5 },
    { name: "Neutral Damage", sink: 5 },
    { name: "Critical Damage", sink: 5 },
    { name: "Pushback Damage", sink: 5 },
    { name: "Trap Damage", sink: 5 },
    { name: "Hunting", sink: 5 },
    { name: "Dodge", sink: 4 },
    { name: "Lock", sink: 4 },
    { name: "Prospecting", sink: 3 },
    { name: "Wisdom", sink: 3 },
    { name: "Power", sink: 2 },
    { name: "Trap Power", sink: 2 },
    { name: "Earth Resistance", sink: 2 },
    { name: "Fire Resistance", sink: 2 },
    { name: "Air Resistance", sink: 2 },
    { name: "Water Resistance", sink: 2 },
    { name: "Neutral Resistance", sink: 2 },
    { name: "Critical Resistance", sink: 2 },
    { name: "Pushback Resistance", sink: 2 },
    { name: "Strength", sink: 1 },
    { name: "Intelligence", sink: 1 },
    { name: "Agility", sink: 1 },
    { name: "Chance", sink: 1 },
    { name: "Vitality", sink: 0.2 },
    { name: "Pods", sink: 0.25 },
    { name: "Initiative", sink: 0.1 },
];

export default function Crushing() {
    const [text, setText] = useState("");
    const [parsedStats, setParsedStats] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            parseText(text);
        }
    };

    const parseText = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");

        // Select all <li> elements
        const listItems = doc.querySelectorAll("li");

        const parsedData = Array.from(listItems).map((li, index) => {
            // Extract the numbers (min~max values)
            const match = li.textContent.match(/^(\d+)~(\d+)%?\s+/);
            if (!match) return null;

            const [, minValue, maxValue] = match.map(Number);

            // Extract the stat name from <a> tag
            const link = li.querySelector("a");
            if (!link) return null;

            const statName = link.textContent.trim();
            const matchedStat = stats.find(s => s.name === statName);

            return matchedStat ? {
                index,
                stat: statName,
                sink: matchedStat.sink,
                minValue,
                maxValue,
            } : null;
        }).filter(Boolean); // Remove null entries

        setParsedStats(parsedData);
        console.log(parsedData);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: 5, marginBottom: 10 }}>
            <ReactQuill
                value={text}
                onChange={setText}
                onKeyDown={handleKeyDown}
                modules={{ toolbar: false }}
                style={{ width: "700px", height: "100px" }}
            />
            <pre>{JSON.stringify(parsedStats, null, 2)}</pre>
        </Box>
    );
}
