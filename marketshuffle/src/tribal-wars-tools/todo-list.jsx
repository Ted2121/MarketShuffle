import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { todoListModel } from "./models/todo-list.model";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const calculateCountdown = (targetTime) => {
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;

    if (difference <= 0) {
        return "00:00:00"; // Time is up or past
    }

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Format the result as hh:mm:ss
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default function TwTodoList() {
    const [model, setModel] = useState(todoListModel);
    const [countdowns, setCountdowns] = useState({}); // Store countdowns
    const [targetTimes, setTargetTimes] = useState({}); // Store target times

    // Single interval to update all countdowns
    useEffect(() => {
        if (Object.keys(targetTimes).length > 0) {
            const intervalId = setInterval(() => {
                const updatedCountdowns = {};
                Object.keys(targetTimes).forEach(key => {
                    if (targetTimes[key]) {
                        updatedCountdowns[key] = calculateCountdown(targetTimes[key]);
                    }
                });
                setCountdowns(updatedCountdowns);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup on unmount
        }
    }, [targetTimes]);

    const handleFieldChange = (lumeaId, sateId, fieldName, value) => {
        // Update the state without affecting the countdown timer logic
        const updatedModel = model.map(lumea => {
            if (lumea.id === lumeaId) {
                return {
                    ...lumea,
                    sate: lumea.sate.map(sat => {
                        if (sat.id === sateId) {
                            return { ...sat, [fieldName]: value };
                        }
                        return sat;
                    })
                };
            }
            return lumea;
        });

        setModel(updatedModel); // Update model state
    };

    const handleButtonClick = (lumeaId, sateId, targetTimeValue) => {
        const targetTime = new Date(targetTimeValue).getTime();

        setTargetTimes(prev => ({
            ...prev,
            [`${lumeaId}-${sateId}`]: targetTime
        }));
    };

    // Renders a TextField, countdown, and button for each property of a sat (excluding id and name)
    const RegularTodoItem = ({ label, fieldValue, lumeaId, sateId, fieldName }) => {
        return (
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                marginBottom: 2
            }}>
                <TextField
                    label={label}
                    value={fieldValue}
                    onChange={(e) => handleFieldChange(lumeaId, sateId, fieldName, e.target.value)}
                    sx={{ width: '200px' }}
                />
                <Button
                    variant="contained"
                    onClick={() => handleButtonClick(lumeaId, sateId, fieldValue)}
                >
                    Submit
                </Button>
                {/* Display the countdown */}
                <Typography sx={{ marginLeft: 2 }}>
                    {countdowns[`${lumeaId}-${sateId}`] || "00:00:00"}
                </Typography>
            </Box>
        );
    };

    // Renders the todo items (TextFields) inside the accordion for each sat
    const renderTodoItemsForSat = (sat, lumeaId) => {
        return Object.keys(sat).map(field => {
            if (field !== 'id' && field !== 'name') {
                return (
                    <RegularTodoItem
                        key={field}
                        label={field}
                        fieldValue={sat[field]}
                        lumeaId={lumeaId}
                        sateId={sat.id}
                        fieldName={field}
                    />
                );
            }
        });
    };

    // Renders each sat inside its accordion, with all todo items (TextFields) as details
    const SateAccordion = (sate, lumeaId) => {
        if (Array.isArray(sate)) {
            return (
                <>
                    {sate.map((sat) => (
                        <div key={sat?.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={sat?.id}
                                >
                                    {sat?.name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/* Render all todo items (TextFields) for this sat */}
                                    {renderTodoItemsForSat(sat, lumeaId)}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </>
            );
        }
    };

    // Renders each lume with its sate accordions
    const LumeAccordion = () => {
        return (
            <>
                {model.map((lumea) => (
                    <div key={lumea?.id}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                id={lumea?.id}
                            >
                                {lumea?.name}
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Render the sate accordion for each lume */}
                                {SateAccordion(lumea.sate, lumea.id)}
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </>
        );
    };

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginTop: 10,
            marginBottom: 20,
            marginLeft: 10,
            gap: 1,
        }}>
            {/* Render all accordions with dynamic fields */}
            {LumeAccordion()}
        </Box>
    );
}