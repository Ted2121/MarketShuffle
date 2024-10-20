import React, { useState } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [reports, setReports] = useState([]);

    const addReport = () => {
        if (reportInput.trim()) {
            const { id, date, target, links } = parseReport(reportInput.trim());
            const newReport = { id, date, target, links };
            setReports((prev) => [...prev, newReport]);
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
                                {/* <Typography variant="body1">Target: {report.target}</Typography> */}
                                <Typography variant="body1">Date: {report.date}</Typography>
                                <Typography variant="body1">Links: {report.links.join(', ')}</Typography>
                                <Divider sx={{mt:'6px'}}/>
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
