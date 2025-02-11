import { Box, Button, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllRecipeListsWithRows, addRecipeList, deleteRecipeListById } from './services/recipe-list.service';
import { addRecipeListRow, deleteRecipeRowById, updateRecipeRow } from './services/recipe-list-row.service';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function RecipeList() {
    const [quillInput, setQuillInput] = useState('');
    const [recipeLists, setRecipeLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(''); // State to track selected list
    const [newListName, setNewListName] = useState(''); // State for new list name

    useEffect(() => {
        const loadRecipeLists = async () => {
            try {
                const data = await getAllRecipeListsWithRows();
                setRecipeLists(data);
            } catch (error) {
                console.error("Error fetching recipe lists:", error);
            }
        };

        loadRecipeLists();
    }, []);

    const addRecipeListRows = async () => {
        const extractedRecipeRows = extractRecipeRows();

        if (selectedListId) {
            // If a list is selected, add rows to the existing list
            try {
                for (const row of extractedRecipeRows) {
                    await addRecipeListRow({ ...row, recipeListId: selectedListId });
                }

                // Update the list with the new rows in recipeLists state
                setRecipeLists(prevLists => {
                    return prevLists.map(list =>
                        list.id === selectedListId
                            ? { ...list, rows: [...list.rows, ...extractedRecipeRows] }
                            : list
                    );
                });

                setQuillInput(''); // Clear the input after adding
            } catch (error) {
                console.error("Error adding recipe rows:", error);
            }
        } else if (newListName) {
            // If no list is selected, create a new list with the specified name and note
            try {
                const newRecipeListId = await addRecipeList({ name: newListName });

                // Update recipeLists with the new list immediately
                setRecipeLists(prevLists => [
                    ...prevLists,
                    { id: newRecipeListId, name: newListName, rows: extractedRecipeRows }
                ]);

                for (const row of extractedRecipeRows) {
                    await addRecipeListRow({ ...row, recipeListId: newRecipeListId });
                }

                // Clear inputs
                setNewListName('');
                setQuillInput('');
            } catch (error) {
                console.error("Error creating new recipe list and adding rows:", error);
            }
        } else {
            console.warn("Please select an existing list or enter a name for a new list.");
        }
    };

    const extractRecipeRows = () => {
        const items = [];
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(quillInput, 'text/html');

        // Flatten the HTML and remove <p> tags
        const plainText = Array.from(htmlDoc.body.childNodes)
            .map(node => node.nodeName === 'P' ? node.textContent.trim() : node.nodeValue)
            .filter(text => text) // Remove empty strings
            .join('\n'); // Join the lines back together

        // Split the input into lines to handle plain text
        const lines = plainText.split('\n');

        lines.forEach(line => {
            // Get the quantity as the first part before any whitespace
            const quantityMatch = line.match(/^(\d+)\s+/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : null;

            // Get the rest of the line as the resource name
            const resourceName = line.replace(quantityMatch ? quantityMatch[0] : '', '').trim();

            if (quantity && resourceName) {
                // Push an object for each item found
                items.push({
                    quantity,
                    resourceName,
                    area: "", // Default to empty since area is not provided
                    note: "", // Default to empty since note is not provided
                    link: "" // No link available for plain text
                });
            }
        });

        // Target each <li> element in the document for rich text
        htmlDoc.querySelectorAll("li").forEach((node) => {
            // Get the quantity as the first part before any whitespace
            const quantityMatch = node.textContent.match(/^(\d+)\s+/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : null;

            // Get the link element within the <li> for name and link
            const linkElement = node.querySelector('a');

            // Check if there is a link element
            if (linkElement) {
                const resourceName = linkElement.textContent.trim();
                const link = linkElement.href;

                if (quantity && resourceName) {
                    // Push an object for each item found with a link
                    items.push({
                        quantity,
                        resourceName,
                        area: "", // Default to empty since area is not provided
                        note: "", // Default to empty since note is not provided
                        link
                    });
                }
            } else {
                // Handle plain text case when there is no link element
                const plainTextNode = node.textContent.trim();
                if (quantity && plainTextNode) {
                    // Consider the entire text as resource name if no link is found
                    items.push({
                        quantity,
                        resourceName: plainTextNode, // Use the plain text as the resource name
                        area: "", // Default to empty since area is not provided
                        note: "", // Default to empty since note is not provided
                        link: "" // No link available
                    });
                }
            }
        });

        return items;
    };


    const handleChange = (listId, rowIndex, field, value) => {
        setRecipeLists(prevLists => {
            const updatedLists = [...prevLists];
            const updatedRows = [...updatedLists.find(list => list.id === listId).rows];
            updatedRows[rowIndex] = {
                ...updatedRows[rowIndex],
                [field]: value
            };

            updatedLists.find(list => list.id === listId).rows = updatedRows;
            return updatedLists;
        });
    };

    const handleDeleteRow = async (id) => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to delete this row?");

            if (isConfirmed) {
                await deleteRecipeRowById(id);
                setRecipeLists(prevLists => {
                    return prevLists.map(list => ({
                        ...list,
                        rows: list.rows.filter(row => row.id !== id)
                    }));
                });
            }
        } catch (error) {
            console.error("Failed to delete row:", error);
        }
    };

    const handleDeleteList = async (id) => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to delete this recipe list?");

            if (isConfirmed) {
                await deleteRecipeListById(id);
                setRecipeLists(prevLists => {
                    return prevLists.filter(list => list.id !== id); // Remove the entire list by its ID
                });
            }
        } catch (error) {
            console.error("Failed to delete recipe list:", error);
        }
    };

    const handleDone = async (listId, index) => {
        setRecipeLists(prevLists => {
            return prevLists.map(list => {
                if (list.id !== listId) return list;
    
                // Create a new array for rows
                const updatedRows = list.rows.map((row, rowIndex) => 
                    rowIndex === index ? { ...row, done: !row.done } : row
                );
    
                return { ...list, rows: updatedRows };
            });
        });
    
        try {
            const list = recipeLists.find(list => list.id === listId);
            const row = list.rows[index];
            await updateRecipeRow({ ...row, done: !row.done });
        } catch (error) {
            console.error("Error updating row:", error);
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 5, marginBottom: 10 }}>
            {/* Dropdown to select an existing recipe list */}
            <Select
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
                displayEmpty
                sx={{ width: '300px' }}
            >
                <MenuItem value="">
                    <em>Select Existing Recipe List</em>
                </MenuItem>
                {recipeLists.map((list) => (
                    <MenuItem key={list.id} value={list.id}>
                        {list.name}
                    </MenuItem>
                ))}
            </Select>

            {/* Input fields for new list name and note */}
            <TextField
                label="New Recipe List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                sx={{ width: '300px' }}
                size='small'
            />
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 10 }}>
                <ReactQuill
                    value={quillInput}
                    onChange={setQuillInput}
                    modules={{ toolbar: false }}
                    style={{ width: '700px', height: '50px' }}
                />
                <Button onClick={addRecipeListRows} variant="contained">Add Recipe List Rows</Button>
            </Box>

            {recipeLists.map((list) => (
                <TableContainer key={list.id} sx={{ marginBottom: 5, maxWidth: '90%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton
                            aria-label="delete list"
                            onClick={() => handleDeleteList(list.id)}
                            color="error"
                            size='small'
                        >
                            <DeleteIcon />
                        </IconButton>
                        <h3>{list.name}</h3>
                    </Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding='checkbox'></TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Resource Name</TableCell>
                                <TableCell>Area</TableCell>
                                {/* <TableCell>Note</TableCell> */}
                                <TableCell>Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.rows.map((row, index) => (
                                <TableRow key={index} sx={{ backgroundColor: row.done ? '#2c6329' : '' }}>
                                    <TableCell sx={{ width: '100px', display: 'flex' }}>
                                        <IconButton
                                            aria-label="done"
                                            onClick={() => handleDone(list.id, index)}
                                            color="success"
                                            size='small'
                                        >
                                            <CheckCircleIcon fontSize='large' />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                            size='small'
                                            onClick={() => handleDeleteRow(row.id)}
                                            color="error"
                                        >
                                            <DeleteIcon fontSize='large' />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            sx={{ width: '80px' }}
                                            size='small'
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(list.id, index, 'quantity', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            {row.resourceName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            sx={{ width: '250px' }}
                                            size='small'
                                            value={row.area}
                                            onChange={(e) => handleChange(list.id, index, 'area', e.target.value)}
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                                        <TextField
                                            size='small'
                                            value={row.note}
                                            onChange={(e) => handleChange(list.id, index, 'note', e.target.value)}
                                        />
                                    </TableCell> */}
                                    <TableCell>
                                        <Typography>
                                            <a href={row.link} target='_blank' style={{ color: 'white' }}>
                                                {row.link}
                                            </a>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => updateRecipeRow(row)}
                                        >
                                            Save
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ))}
        </Box>
    );
}
