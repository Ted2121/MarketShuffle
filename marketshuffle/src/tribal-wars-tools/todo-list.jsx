import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { todoListModel } from "./models/todo-list.model";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import ClearIcon from '@mui/icons-material/Clear';
import { parseCustomDate } from './helpers/time-formatter';

export default function TwTodoList() {
    const [model, setModel] = useState(() => {
        const savedModel = localStorage.getItem('todoModel');
        return savedModel ? JSON.parse(savedModel) : todoListModel;
    });

    const [villageTodos, setVillageTodos] = useState(() => {
        const savedVillageTodos = localStorage.getItem('villageTodos');
        return savedVillageTodos ? JSON.parse(savedVillageTodos) : {};
    });

    const [todoStates, setTodoStates] = useState(() => {
        const savedTodoStates = localStorage.getItem('todoStates');
        return savedTodoStates ? JSON.parse(savedTodoStates) : {};
    });

    useEffect(() => {
        localStorage.setItem('villageTodos', JSON.stringify(villageTodos));
    }, [villageTodos]);

    useEffect(() => {
        localStorage.setItem('todoModel', JSON.stringify(model));
    }, [model]);

    useEffect(() => {
        localStorage.setItem('todoStates', JSON.stringify(todoStates));
    }, [todoStates]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkDates();
        }, 45000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const doneCount = countDoneItems();
        document.title = `[ ${doneCount} ]`;
    }, [todoStates]);

    const countDoneItems = () => {
        let doneCount = 0;
        for (const key in todoStates) {
            if (todoStates[key].status === "Done!") {
                doneCount++;
            }
        }
        return doneCount;
    };

    const handleAddTodo = (villageId, todoText) => {
        setVillageTodos(prevTodos => {
            return {
                ...prevTodos,
                [villageId]: todoText, // Replace the existing value with the new one
            };
        });
    };

    const getTodoByVillageId = (villageId) => {
        return villageTodos[villageId] || null;
    };
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

    const VillageTodoInput = ({ villageId }) => {
        const [todoNext, setTodoNext] = useState("");

        const handlePasteFromClipboard = async () => {
            try {
                const clipboardText = await navigator.clipboard.readText();
                setTodoNext(clipboardText); // Set the pasted text into the input field
            } catch (err) {
                console.error("Failed to read clipboard contents: ", err);
            }
        };

        const handleAddTodoClick = () => {
            setTodoNext(todoNext)
            handleAddTodo(villageId, todoNext);
        };

        const handleClearTodo = () => {
            handleAddTodo(villageId, '');
            setTodoNext("");
        }


        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <IconButton
                    size="small"
                    onClick={handleClearTodo}
                    sx={{ marginRight: '-8px' }}
                >
                    <ClearIcon />
                </IconButton>
                <Button
                    variant="outlined"
                    onClick={handlePasteFromClipboard}
                >
                    Paste
                </Button>
                <TextField
                    value={todoNext}
                    size="small"
                    onChange={(e) => setTodoNext(e.target.value)}
                    label="Next Todo"
                />
                <Button
                    variant="contained"
                    onClick={handleAddTodoClick}
                >
                    Add Todo
                </Button>
                <Typography variant="body2" color="text.secondary">
                    {getTodoByVillageId(villageId)}
                </Typography>
            </Box>
        );
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

        const handlePasteFromClipboard = async () => {
            try {
                const clipboardText = await navigator.clipboard.readText();
                setInputValue(clipboardText); // Set the pasted text into the input field
                handleFieldChange(worldId, villagesId, fieldName, clipboardText); // Update the model
            } catch (err) {
                console.error("Failed to read clipboard contents: ", err);
            }
        };

        const handleClearInput = () => {
            setInputValue(""); // Clear the TextField
            handleFieldChange(worldId, villagesId, fieldName, ""); // Reset the property value in the model
            handleButtonClick('', villagesId, fieldName); // Call to clear the todo state
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
                    <IconButton
                        size="small"
                        onClick={handleClearInput}
                        sx={{ marginRight: '-8px' }}
                    >
                        <ClearIcon />
                    </IconButton>
                    <Button
                        variant="outlined"
                        onClick={handlePasteFromClipboard}
                    >
                        Paste
                    </Button>
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
                    <Typography variant="body2" color={status === 'Done!' ? 'green' : 'text.secondary'}>
                        {status || formatted || "No date set"}
                    </Typography>
                </Box>
            </Box>
        );
    };

    const handleButtonClick = (fieldValue, villagesId, fieldName) => {
        const dateObj = parseCustomDate(fieldValue, 1);
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
                                        <VillageTodoInput villageId={village.id} />
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
