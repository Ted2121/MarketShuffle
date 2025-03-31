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
      // Extract min and max values with optional '%' and stat name
      const match = li.textContent.match(/(\d+)~(\d+)%?\s+(.*)/);
      if (!match) return null; // Skip invalid formats

      const [, minValue, maxValue, statName] = match;

      // Normalize the stat name: check for '%' at the end
      let normalizedStatName = statName.trim();
      if (normalizedStatName.includes('%')) {
        normalizedStatName = normalizedStatName.replace('%', '').trim();
      }

      // Find the stat from the predefined list, handle % in name properly
      const matchedStat = stats.find(
        (s) =>
          s.name === normalizedStatName ||
          s.name === `% ${normalizedStatName}` // Check for '%' version as well
      );

      return matchedStat
        ? {
            index,
            stat: statName.trim(),
            sink: matchedStat.sink,
            minValue: parseInt(minValue),
            maxValue: parseInt(maxValue),
            cost: "", // New attribute for kamas/sink ratio
          }
        : null;
    }).filter(Boolean); // Remove null entries if any

    setParsedStats(parsedData);
    console.log(parsedData);
  };

  const handleKamasPerSinkChange = (index, value) => {
    const updatedStats = [...parsedStats];
    updatedStats[index].cost = value;
    setParsedStats(updatedStats);
  };

  const calculateCostPerSink = (cost, sink) => {
    if (!cost || !sink || sink === 0) return 0;
    return (parseFloat(cost) / sink).toFixed(2); // Round to 2 decimal places
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        marginTop: 5,
        marginBottom: 10,
      }}
    >
      <ReactQuill
        value={text}
        onChange={setText}
        onKeyDown={handleKeyDown}
        modules={{ toolbar: false }}
        style={{ width: "700px", height: "100px" }}
      />
      {parsedStats.length > 0 && (
        <Box sx={{ width: "95%", marginTop: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            {parsedStats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  border: "1px solid #ddd",
                  padding: 2,
                  borderRadius: 2,
                  width: "100%",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{stat.stat}</Typography>
                <Typography>
                  {stat.minValue} - {stat.maxValue}
                </Typography>
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
                {/* Cost / Sink Calculation */}
                <Typography variant="body1">
                  Cost / Sink: {calculateCostPerSink(stat.cost, stat.sink)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <pre>{JSON.stringify(parsedStats, null, 2)}</pre>
    </Box>
  );
}
