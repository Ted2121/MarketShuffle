import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, TextField, Typography } from "@mui/material";

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
    const [globalMultiplier, setGlobalMultiplier] = useState(1); // Global multiplier for calculation
    const [level, setLevel] = useState(1); // New state for level

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            parseText(text);
        }
    };

    const parseText = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, "text/html");
    
        const listItems = doc.querySelectorAll("li");
    
        const parsedData = Array.from(listItems).map((li, index) => {
            const match = li.textContent.match(/(\d+)~?(\d+)?%?\s+(.*)/);
            if (!match) return null;
    
            let [, minValue, maxValue, statName] = match;
    
            minValue = parseInt(minValue);
            maxValue = maxValue ? parseInt(maxValue) : parseInt(minValue); // Default maxValue
    
            let normalizedStatName = statName.trim();
            if (normalizedStatName.includes('%')) {
                normalizedStatName = normalizedStatName.replace('%', '').trim();
            }
    
            const matchedStat = stats.find(
                (s) => s.name === normalizedStatName || s.name === `% ${normalizedStatName}`
            );
    
            return matchedStat
                ? {
                    index,
                    stat: statName.trim(),
                    sink: matchedStat.sink,
                    minValue,
                    maxValue,
                    cost: "",
                }
                : null;
        }).filter(Boolean);
    
        setParsedStats(parsedData);
    };

    const handleKamasPerSinkChange = (index, value) => {
        const updatedStats = [...parsedStats];
        updatedStats[index].cost = value;
        setParsedStats(updatedStats);
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value); // Update the level value
    };

    // New function to calculate rune cost with level and global multiplier
    const calculateRuneCost = (stat, withFocus = false) => {
        // Calculate the runes generated based on the formula
        const runesGeneratedMin = stat.minValue * (0.015 * level) * globalMultiplier;
        const runesGeneratedMax = stat.maxValue * (0.015 * level) * globalMultiplier;

        // Apply focus multiplier if necessary
        const minRunesWithMultipliers = runesGeneratedMin * (withFocus ? 0.5 : 1);
        const maxRunesWithMultipliers = runesGeneratedMax * (withFocus ? 0.5 : 1);

        // Calculate total cost
        const totalMinCost = (minRunesWithMultipliers * stat.cost).toFixed(2);
        const totalMaxCost = (maxRunesWithMultipliers * stat.cost).toFixed(2);

        return { totalMinCost, totalMaxCost };
    };

    const totalMinSink = parsedStats.reduce((total, stat) => total + stat.minValue, 0);
    const totalMaxSink = parsedStats.reduce((total, stat) => total + stat.maxValue, 0);

    {/* Calculate total min and max cost for all stats */ }
    const totalMinCost = parsedStats.reduce((total, stat) => {
        if (!stat.cost) return total;
        return total + parseFloat(calculateRuneCost(stat).totalMinCost);
    }, 0);

    const totalMaxCost = parsedStats.reduce((total, stat) => {
        if (!stat.cost) return total;
        return total + parseFloat(calculateRuneCost(stat).totalMaxCost);
    }, 0);

    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginTop: 5, marginBottom: 10 }}>
            <ReactQuill
                value={text}
                onChange={setText}
                onKeyDown={handleKeyDown}
                modules={{ toolbar: false }}
                style={{ width: "700px", height: "100px" }}
            />

            <TextField
                label="Global Dynamic Multiplier (%)"
                variant="outlined"
                size="small"
                value={globalMultiplier * 100} // Display as percentage
                onChange={(e) => setGlobalMultiplier(e.target.value / 100)}
                type="number"
                sx={{ marginTop: 2, marginBottom: 2 }}
            />

            <TextField
                label="Level"
                variant="outlined"
                size="small"
                value={level}
                onChange={handleLevelChange}
                type="number"
                sx={{ marginTop: 2, marginBottom: 2 }}
            />

            {parsedStats.length > 0 && (
                <Box sx={{ width: "95%", marginTop: 2 }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                        {totalMinSink} - {totalMaxSink}
                    </Typography>
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Total Min Cost: {totalMinCost.toFixed(2)} | Total Max Cost: {totalMaxCost.toFixed(2)}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                        {parsedStats.map((stat, index) => (
                            <Box key={index} sx={{ display: "flex", border: "1px solid #ddd", padding: 2, borderRadius: 2, width: "100%", gap: 3, alignItems: "center" }}>
                                <Typography variant="h6">{stat.stat}</Typography>
                                <Typography>{stat.minValue} - {stat.maxValue}</Typography>
                                <Typography>Sink: {stat.sink}</Typography>
                                <TextField
                                    label="Cost"
                                    variant="outlined"
                                    size="small"
                                    value={stat.cost}
                                    onChange={(e) => handleKamasPerSinkChange(index, e.target.value)}
                                    type="number"
                                    sx={{ marginTop: 1 }}
                                />
                                {/* Total cost calculation */}
                                {stat.cost && (
                                    <Box>
                                        <Typography variant="body1">
                                            Total Min Cost: {calculateRuneCost(stat).totalMinCost}
                                        </Typography>
                                        <Typography variant="body1">
                                            Total Max Cost: {calculateRuneCost(stat).totalMaxCost}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
            <pre>{JSON.stringify(parsedStats, null, 2)}</pre>
        </Box>
    );
}
