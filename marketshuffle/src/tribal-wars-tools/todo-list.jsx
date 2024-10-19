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
    const [model, setModel] = useState(() => {
        const savedModel = localStorage.getItem('todoModel');
        return savedModel ? JSON.parse(savedModel) : todoListModel;
    });
    
    const [todoStates, setTodoStates] = useState(() => {
        const savedTodoStates = localStorage.getItem('todoStates');
        return savedTodoStates ? JSON.parse(savedTodoStates) : {};
    });

    useEffect(() => {
        localStorage.setItem('todoModel', JSON.stringify(model));
    }, [model]);

    useEffect(() => {
        localStorage.setItem('todoStates', JSON.stringify(todoStates));
    }, [todoStates]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkDates();
        }, 30000);
        
        return () => clearInterval(interval);
    }, []);

    const checkDates = () => {
        const currentTime = new Date().getTime();
    
        setTodoStates(prevTodoStates => {
            const newTodoStates = { ...prevTodoStates };
            let stateUpdated = false;

            for (const key in prevTodoStates) {
                const { date } = prevTodoStates[key];
                const parsedDate = new Date(date).getTime();
    
                if (!isNaN(parsedDate)) {
                    const done = parsedDate < currentTime;
                    if (newTodoStates[key].status !== (done ? "Done!" : "")) {
                        newTodoStates[key].status = done ? "Done!" : "";
                        stateUpdated = true;
                    }
                }
            }
    
            return stateUpdated ? newTodoStates : prevTodoStates;
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
        if (!(date instanceof Date) || isNaN(date)) {
            return "Invalid date"; // Handle invalid date case
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day} ${month} ${hours}:${minutes}:${seconds}`;
    };

    const RegularTodoItem = ({ label, initialValue, worldId, villagesId, fieldName, itemType }) => {
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
            handleButtonClick('', villagesId, fieldName, itemType); // Call to clear the todo state
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: "", // Clear the date
                    formatted: "", // Clear the formatted date
                    status: "" // Clear the status
                }
            }));
        };
    
        const handleSubmit = () => {
            console.log("Submitting:", inputValue);
            handleButtonClick(inputValue, villagesId, fieldName, itemType);
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
                        sx={{ marginRight: '-8px' }} 
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

    const handleButtonClick = (fieldValue, villagesId, fieldName, itemType) => {
        const dateObj = parseCustomDate(fieldValue);
        if (!isNaN(dateObj) && itemType === 'date') {
            const formattedDate = formatDateTime(dateObj);
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: dateObj,
                    formatted: formattedDate,
                    status: ""
                }
            }));
        } else if (itemType === 'text'){
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: "",
                    formatted: fieldValue,
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
                        itemType={field === 'next' || field === 'nobili' ? 'text' : 'date'}
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
                        const isAnyTodoDone = Object.keys(village).some(field => {
                            if (field !== 'id' && field !== 'name') {
                                const todoKey = `${village.id}-${field}`;
                                console.log(todoStates[todoKey]?.status)
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
    
        return input;
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
