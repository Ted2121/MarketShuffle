import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import ClearIcon from '@mui/icons-material/Clear';

export default function TwReports() {
    const [reportInput, setReportInput] = useState('');
    const [reports, setReports] = useState([]);

    const addReport = () => {
        if (reportInput.trim()) {
            const newReports = [...reports, reportInput.trim()];
            setReports(newReports);
            setReportInput('');
        }
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
            <TextField
                value={reportInput}
                size="small"
                onChange={(e) => setReportInput(e.target.value)}
                label="Report"
                sx={{width: '700px'}}
            />
        </Box>
    );
}
