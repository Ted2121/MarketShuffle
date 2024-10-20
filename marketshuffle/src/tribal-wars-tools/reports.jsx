import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [reports, setReports] = useState(() => {
        // Load from local storage on component mount
        const storedReports = localStorage.getItem('reports');
        return storedReports ? JSON.parse(storedReports) : [];
    });

    useEffect(() => {
        // Save to local storage whenever reports state changes
        localStorage.setItem('reports', JSON.stringify(reports));
    }, [reports]);

    const addReport = () => {
        if (reportInput.trim()) {
            const { id, date, target, links } = parseReport(reportInput.trim());
            const newReport = { id, date, target, links };
    
            setReports((prevReports) => {
                const grouped = groupReportsByTarget([newReport, ...prevReports]); // Add new report at the beginning
                const limitedReports = limitReportsToFive(grouped);
                return Object.values(limitedReports).flat(); // Flatten grouped structure back to array
            });
            setReportInput(''); // Clear input after adding
        }
    };

    const parseReport = (reportString) => {
        const dateMatch = reportString.match(/(ian\.|feb\.|mar\.|apr\.|mai\.|iun\.|iul\.|aug\.|sep\.|oct\.|noi\.|dec\.)\s*(\d{1,2}),\s*(\d{1,2}):(\d{2})/);
        const date = dateMatch ? dateMatch[0].trim() : '';

        const id = crypto.randomUUID();

        const targetMatch = reportString.match(/atacă\s([^\(]+ \(\d+\|\d+\) K\d{2})/);
        const target = targetMatch ? targetMatch[1].trim() : '';

        const links = extractLinks(reportString);

        return { id, date, target, links };
    };

    const extractLinks = (content) => {
        const regex = /https?:\/\/[^\s]+/g;
        const links = content.match(regex) || [];
        return links.map(link =>
            link
                .replace(/&amp;/g, '&')
                .replace(/["']+$/, '')
        );
    };

    const groupReportsByTarget = (reports) => {
        return reports.reduce((groups, report) => {
            const { target } = report;
            if (!groups[target]) {
                groups[target] = [];
            }
            groups[target].push(report);
            return groups;
        }, {});
    };

    const limitReportsToFive = (groupedReports) => {
        const limitedReports = {};
        for (const target in groupedReports) {
            limitedReports[target] = groupedReports[target].slice(-5); // Keep only the last 5 reports
        }
        return limitedReports;
    };

    const groupedReports = groupReportsByTarget(reports);

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            marginTop: 5
        }}>
            <ReactQuill
                value={reportInput}
                onChange={setReportInput}
                modules={{ toolbar: false }}
                style={{ width: '700px', height: '50px' }}
            />
            <Button onClick={addReport} variant="contained">
                Add Report
            </Button>

            {/* Render Accordions for each target */}
            {Object.entries(groupedReports).map(([target, reports]) => (
                <Accordion key={target} sx={{ width: '90%' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{target}</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                        {reports.map((report) => (
                            <Box key={report.id} sx={{ marginBottom: 2 }}>
                                <Typography variant="body1">Date: {report.date}</Typography>
                                <Typography variant="body1">
                                    Links: {report.links.map((link, index) => (
                                        <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    )).reduce((prev, curr) => [prev, ', ', curr])}
                                </Typography>
                                <Divider sx={{ mt: '6px' }} />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
