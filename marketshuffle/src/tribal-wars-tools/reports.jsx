import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [reports, setReports] = useState(() => {
        const storedReports = localStorage.getItem('reports');
        return storedReports ? JSON.parse(storedReports) : [];
    });

    const [filteredReports, setFilteredReports] = useState(reports);

    useEffect(() => {
        localStorage.setItem('reports', JSON.stringify(reports));
        setFilteredReports(reports); // Update filtered reports when reports change
    }, [reports]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchInput) {
                setFilteredReports(reports.filter(report => report.target.toLowerCase().includes(searchInput.toLowerCase())));
            } else {
                setFilteredReports(reports); // Reset to all reports if search is empty
            }
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(debounceTimer); // Cleanup on unmount or when searchInput changes
    }, [searchInput, reports]);

    const addReport = () => {
        if (reportInput.trim()) {
            const { id, date, target, links } = parseReport(reportInput.trim());
            const newReport = { id, date, target, links };
    
            setReports((prevReports) => {
                const grouped = groupReportsByTarget([newReport, ...prevReports]);
                const limitedReports = limitReportsToFive(grouped);
                return Object.values(limitedReports).flat();
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
            limitedReports[target] = groupedReports[target].slice(-5);
        }
        return limitedReports;
    };

    const groupedReports = groupReportsByTarget(filteredReports);

    return (
        <Box sx={{
            width: '90%',
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

            {/* Search Input */}
            <TextField
                label="Search by Target"
                variant="outlined"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                sx={{ width: '100%', marginTop: 2 }}
            />

            {/* Render Accordions for each target */}
            {Object.entries(groupedReports).map(([target, reports]) => (
                <Accordion key={target} sx={{ width: '100%' }}>
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
                                        <a style={{ color: 'white' }} key={index} href={link} target="_blank" rel="noopener noreferrer">
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
