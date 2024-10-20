import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Divider, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [selectedWorld, setSelectedWorld] = useState(() => {
        const storedWorld = localStorage.getItem('selectedWorld');
        return storedWorld ? JSON.parse(storedWorld) : '';
    });
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

    useEffect(() => {
        localStorage.setItem('selectedWorld', JSON.stringify(selectedWorld)); // Save selected world to local storage
    }, [selectedWorld]);

    const addReport = () => {
        if (reportInput.trim()) {
            const { id, date, target, links, world } = parseReport(reportInput.trim());
            const newReport = { id, date, target, links, world };

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

        const links = extractLinks(reportString) || []; // Ensure links is always an array
        const world = extractWorld(reportString); // Extract the world number

        return { id, date, target, links, world };
    };

    const extractWorld = (reportString) => {
        const worldMatch = reportString.match(/https?:\/\/([a-z]+)(\d+)\./);
        return worldMatch ? worldMatch[2] : ''; // Extracts the world number (e.g., "104" from "ro104")
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

    // Filter reports based on selected world
    const reportsForSelectedWorld = filteredReports.filter(report => report.world === selectedWorld);
    const groupedReports = groupReportsByTarget(reportsForSelectedWorld);

    // Get unique worlds from the reports
    const uniqueWorlds = Array.from(new Set(reports.map(report => report.world)));

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setReportInput(text); // Set the report input to the pasted text
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    return (
        <Box sx={{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            marginTop: 5,
            marginBottom: 10,
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



            {/* Search Input with Paste Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Button onClick={handlePaste} variant="outlined">
                    Paste
                </Button>
                <TextField
                    label="Search by Target"
                    variant="outlined"
                    size="small"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    sx={{ flex: 1 }} // Allow the TextField to take up remaining space
                />
                {/* World Selection Dropdown */}
                <FormControl size="small" variant="outlined" sx={{ width: '200px' }}>
                    <InputLabel>World</InputLabel>
                    <Select
                        value={selectedWorld}
                        onChange={(e) => setSelectedWorld(e.target.value)}
                        label="World"
                    >
                        {uniqueWorlds.map(world => (
                            <MenuItem key={world} value={world}>{world}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

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
                                    Links: {Array.isArray(report.links) ? report.links.map((link, index) => (
                                        <a style={{ color: 'white' }} key={index} href={link} target="_blank" rel="noopener noreferrer">
                                            {link}
                                        </a>
                                    )).reduce((prev, curr) => [prev, ', ', curr]) : 'No links available'}
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
