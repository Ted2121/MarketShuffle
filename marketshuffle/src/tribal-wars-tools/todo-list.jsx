/** IMPORTANT NOTE: I subtracted 1 hour in all 3 returns statements from parseCustomDate because I'm in Denmark.
 * Remove it when it's no longer needed
*/
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
        const dateObj = parseCustomDate(fieldValue);
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

                        const hasIncomingAttack = village.aparare;

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

    function parseCustomDate(input) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date
    
        const regexDateTime = /(\d{1,2})\.(\d{1,2})\. la ora (\d{1,2}):(\d{1,2}):(\d{1,2})/;
        const regexTomorrow = /mâine la ora (\d{1,2}):(\d{1,2}):(\d{1,2})/;
        const regexToday = /astăzi la ora (\d{1,2}):(\d{1,2}):(\d{1,2})/;
    
        let match;
    
        // Check for the full date format
        if ((match = regexDateTime.exec(input))) {
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1; // Month is zero-based in JS
            const hours = parseInt(match[3], 10);
            const minutes = parseInt(match[4], 10);
            const seconds = parseInt(match[5], 10);
            
            // Create a date object for the specified date and time
            return new Date(today.getFullYear(), month, day, hours - 1, minutes, seconds);
        }
    
        // Check for "mâine"
        if ((match = regexTomorrow.exec(input))) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3], 10);
            
            // Set the time to tomorrow
            return new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), hours - 1, minutes, seconds);
        }
    
        // Check for "astăzi"
        if ((match = regexToday.exec(input))) {
            const hours = parseInt(match[1], 10);
            const minutes = parseInt(match[2], 10);
            const seconds = parseInt(match[3], 10);
            
            // Set the time to today
            return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours - 1, minutes, seconds);
        }
    
        // If the input does not match any format, return null or throw an error
        return input; // or throw new Error("Invalid date format");
    }

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
