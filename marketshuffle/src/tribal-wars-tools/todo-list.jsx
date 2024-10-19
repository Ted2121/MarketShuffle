import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { todoListModel } from "./models/todo-list.model";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TwTodoList() {
    const [model, setModel] = useState(todoListModel);
    const [todoStates, setTodoStates] = useState({}); // Combine dates and status messages

    useEffect(() => {
        const interval = setInterval(() => {
            checkDates();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Clean up on unmount
    }, [todoStates]); // Depend on todoStates to re-check when they change

    const checkDates = () => {
        const currentTime = new Date();
        const newTodoStates = { ...todoStates }; // Clone current states

        for (const key in todoStates) {
            const { date, formatted } = todoStates[key];
            if (!isNaN(new Date(date))) {
                newTodoStates[key].status = new Date(date) < currentTime ? "Done!" : ""; // Update status
            }
        }

        setTodoStates(newTodoStates); // Update state with new status messages
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

    const handleButtonClick = (fieldValue, villagesId, fieldName) => {
        const dateObj = new Date(fieldValue);
        if (!isNaN(dateObj)) {
            const formattedDate = formatDateTime(dateObj);
            setTodoStates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: {
                    date: formattedDate,
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

    const RegularTodoItem = ({ label, initialValue, worldId, villagesId, fieldName }) => {
        const [inputValue, setInputValue] = useState(initialValue || "");

        const handleInputChange = (e) => {
            const value = e.target.value;
            setInputValue(value);
            handleFieldChange(worldId, villagesId, fieldName, value);
        };

        const handleSubmit = () => {
            handleButtonClick(inputValue, villagesId, fieldName);
            setInputValue(""); // Clear the TextField
        };

        const todoKey = `${villagesId}-${fieldName}`;
        const { formatted = "", status = "Enter a valid date" } = todoStates[todoKey] || {};

        return (
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                marginBottom: 2
            }}>
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
                    {status || formatted}
                </Typography>
            </Box>
        );
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
                    {villages.map((village) => (
                        <div key={village?.id}>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={village?.id}
                                >
                                    {village?.name}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {renderTodoItemsForVillage(village, worldId)}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
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
            marginLeft: 10,
            gap: 1,
        }}>
            {WorldAccordion()}
        </Box>
    );
}