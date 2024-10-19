import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { todoListModel } from "./models/todo-list.model";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function TwTodoList() {
    const [model, setModel] = useState(todoListModel);
    const [formattedDates, setFormattedDates] = useState({});

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

        const dateObj = new Date(value);
        if (!isNaN(dateObj)) {
            const formattedDate = formatDateTime(dateObj);
            setFormattedDates(prev => ({
                ...prev,
                [villagesId]: formattedDate
            }));
        } else {
            setFormattedDates(prev => ({
                ...prev,
                [villagesId]: ""  // Clear if not valid date
            }));
        }
    };

    const formatDateTime = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${day} ${month} ${hours}:${minutes}:${seconds}`;
    };

    // Handles the button click event (logic to be implemented later)
    const handleButtonClick = (fieldValue, villagesId, fieldName) => {
        const dateObj = new Date(fieldValue);
        if (!isNaN(dateObj)) {
            const formattedDate = formatDateTime(dateObj);
            setFormattedDates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: formattedDate
            }));
        } else {
            setFormattedDates(prev => ({
                ...prev,
                [`${villagesId}-${fieldName}`]: "Invalid date"
            }));
        }
    };

    // Renders a TextField and button for each property of a village (excluding id and name)
    const RegularTodoItem = ({ label, fieldValue, worldId, villagesId, fieldName }) => {
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
                    size="small"
                    onChange={(e) => handleFieldChange(worldId, villagesId, fieldName, e.target.value)}
                    sx={{ width: '200px' }}
                />
                <Button
                    variant="contained"
                    onClick={() => handleButtonClick(fieldValue, villagesId, fieldName)}
                >
                    Submit
                </Button>
                <Typography variant="body2" color="text.secondary">
                    {formattedDates[`${villagesId}-${fieldName}`] || "Enter a valid date"}
                </Typography>
            </Box>
        );
    };

    // Renders the todo items (TextFields) inside the accordion for each village
    const renderTodoItemsForVillage = (village, worldId) => {
        return Object.keys(village).map(field => {
            if (field !== 'id' && field !== 'name') {
                return (
                    <RegularTodoItem
                        key={field}
                        label={field}
                        fieldValue={village[field]}
                        worldId={worldId}
                        villagesId={village.id}
                        fieldName={field}
                    />
                );
            }
            return null;
        });
    };

    // Renders each village inside its accordion, with all todo items (TextFields) as details
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
                                    {/* Render all todo items (TextFields) for this village */}
                                    {renderTodoItemsForVillage(village, worldId)}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </>
            );
        }
    };

    // Renders each lume with its villages accordions
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
                                {/* Render the villages accordion for each lume */}
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
            {/* Render all accordions with dynamic fields */}
            {WorldAccordion()}
        </Box>
    );
}