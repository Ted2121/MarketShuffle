import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { todoListModel } from "./models/todo-list.model";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import ClearIcon from '@mui/icons-material/Clear';

export default function TwTodoList() {
    const [model, setModel] = useState(todoListModel);
    const [todoStates, setTodoStates] = useState({}); // Combine dates and status messages

    useEffect(() => {
        const interval = setInterval(() => {
            checkDates(); // Call the checkDates function every 5 seconds
        }, 5000);
        
        return () => clearInterval(interval); // Clean up on unmount
    }, []); // Only run on component mount, no dependencies
    
    const checkDates = () => {
        const currentTime = new Date().getTime(); // Get the current timestamp in milliseconds
    
        setTodoStates(prevTodoStates => {
            const newTodoStates = { ...prevTodoStates }; // Clone current states
            let stateUpdated = false; // Track if we make any updates
    
            for (const key in prevTodoStates) {
                const { date } = prevTodoStates[key];
                const parsedDate = new Date(date).getTime();
    
                if (!isNaN(parsedDate)) { // Check if the date is valid
                    const done = parsedDate < currentTime; // Compare timestamps
                    if (newTodoStates[key].status !== (done ? "Done!" : "")) {
                        newTodoStates[key].status = done ? "Done!" : ""; // Update status if necessary
                        stateUpdated = true; // Mark that we made a change
                    }
                }
            }
    
            return stateUpdated ? newTodoStates : prevTodoStates; // Only update state if necessary
        });
    };

    const handleFieldChange = (worldId, villagesId, fieldName, value) => {
        const updatedModel = model.map(world => {
            if (world.id === worldId) {
                return {
                    ...world,
                    villages: world.villages.map(village => {
                        if (village.id === villagesId) {
                            return { ...village, [fieldName]: value };
                        }
                        return village;
                    })
                };
            }
            return world;
        });

        setModel(updatedModel);
    };

    const formatDateTime = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day} ${month} ${hours}:${minutes}:${seconds}`;
    };

    const RegularTodoItem = ({ label, initialValue, worldId, villagesId, fieldName }) => {
        const [inputValue, setInputValue] = useState(initialValue || "");

        const todoKey = `${villagesId}-${fieldName}`;
        const { status, formatted } = todoStates[todoKey] || {};

        const handleInputChange = (e) => {
            const value = e.target.value;
            setInputValue(value);
            handleFieldChange(worldId, villagesId, fieldName, value);
        };

        const handleClearInput = () => {
            setInputValue(""); // Clear the TextField
            handleFieldChange(worldId, villagesId, fieldName, ""); // Reset the property value in the model
            handleButtonClick('', villagesId, fieldName);
        };

        const handleSubmit = () => {
            console.log("Submitting:", inputValue);
            handleButtonClick(inputValue, villagesId, fieldName);
        };

        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginBottom: 2
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    {/* X button to clear the text field */}
                    <IconButton
                        size="small"
                        onClick={handleClearInput}
                        sx={{ marginRight: '-8px' }} // Adjust position if needed
                    >
                        <ClearIcon />
                    </IconButton>
                    <TextField
                        label={label}
                        value={inputValue}
                        size="small"
                        onChange={handleInputChange}
                        sx={{ width: '200px' }}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                        {status || formatted || "No date set"}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const handleButtonClick = (fieldValue, villagesId, fieldName) => {
        const dateObj = new Date(fieldValue);
        if (!isNaN(dateObj)) {
            const formattedDate = formatDateTime(dateObj);
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: dateObj,
                    formatted: formattedDate,
                    status: ""
                }
            }));
        } else {
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: "",
                    formatted: "Invalid date",
                    status: ""
                }
            }));
        }
    };

    const renderTodoItemsForVillage = (village, worldId) => {
        return Object.keys(village).map(field => {
            if (field !== 'id' && field !== 'name') {
                return (
                    <RegularTodoItem
                        key={field}
                        label={field}
                        initialValue={village[field]}
                        worldId={worldId}
                        villagesId={village.id}
                        fieldName={field}
                    />
                );
            }
            return null;
        });
    };

    const VillagesAccordion = (villages, worldId) => {
        if (Array.isArray(villages)) {
            return (
                <>
                    {villages.map((village) => {
                        // Check if any todo item is done
                        const isAnyTodoDone = Object.keys(village).some(field => {
                            if (field !== 'id' && field !== 'name') {
                                const todoKey = `${village.id}-${field}`;
                                return todoStates[todoKey]?.status === "Done!";
                            }
                            return false;
                        });

                        const hasIncomingAttack = village.atac;

                        return (
                            <div key={village?.id}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        id={village?.id}
                                    >
                                        {village?.name}
                                        {isAnyTodoDone && <span style={{ color: 'green' }}> - Done!</span>}
                                        {hasIncomingAttack && <WarningIcon sx={{ color: 'red', marginLeft: 1 }} />}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {renderTodoItemsForVillage(village, worldId)}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        );
                    })}
                </>
            );
        }
    };

    const WorldAccordion = () => {
        return (
            <>
                {model.map((world) => (
                    <div key={world?.id}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                id={world?.id}
                            >
                                {world?.name}
                            </AccordionSummary>
                            <AccordionDetails>
                                {VillagesAccordion(world.villages, world.id)}
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
            {WorldAccordion()}
        </Box>
    );
}
