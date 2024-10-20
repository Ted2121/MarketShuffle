import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [reports, setReports] = useState([]);

    const addReport = () => {
        if (reportInput.trim()) {
            const { id, date, links } = parseReport(reportInput.trim());
            const newReport = { id, date, links };
            setReports((prev) => [...prev, newReport]);
            setReportInput(''); // Clear input after adding
        }
    };

    const parseReport = (reportString) => {
        // Match the date format anywhere in the string
        const dateMatch = reportString.match(/(ian\.|feb\.|mar\.|apr\.|mai\.|iun\.|iul\.|aug\.|sep\.|oct\.|noi\.|dec\.)\s*(\d{1,2}),\s*(\d{1,2}):(\d{2})/);
        const date = dateMatch ? dateMatch[0].trim() : ''; // Extract matched date and trim any whitespace

        // Generate a new GUID
        const id = crypto.randomUUID();

        // Extract the target information after "atacă"
        const targetMatch = reportString.match(/atacă\s([^\(]+ \(\d+\|\d+\) K\d{2})/);
        const target = targetMatch ? targetMatch[1].trim() : '';

        // Extract links from the original reportString to keep the HTML links
        const links = extractLinks(reportString); // Extract links from the original string

        console.log("Full String:", reportString); // Debugging: log the full string
        console.log("Matched Date:", date); // Debugging: log the matched date
        console.log("Extracted Target:", target); // Debugging: log the target
        console.log("Extracted Links:", links); // Debugging: log the extracted links

        return { id, date, target, links };
    };

    const extractLinks = (content) => {
        const regex = /https?:\/\/[^\s]+/g; // Regular expression to match URLs
        const links = content.match(regex) || [];

        // Decode each link and replace &amp; with & and remove trailing characters like quotes
        return links.map(link =>
            link
                .replace(/&amp;/g, '&') // Replace &amp; with &
                .replace(/["']+$/, '') // Remove trailing " or '
        );
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 20,
            marginLeft: 10,
            gap: 1,
        }}>
            <ReactQuill
                value={reportInput}
                onChange={setReportInput}
                modules={{ toolbar: false }}
                style={{ width: '700px', height: '50px' }}
            />
            <Button onClick={addReport} variant="contained" sx={{ marginTop: 1 }}>
                Add Report
            </Button>
            {reports.map((report, index) => (
                <Box key={index} sx={{ marginTop: 1 }}>
                    <Typography variant="caption">
                        Links: {report.links.join(', ')}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
}
