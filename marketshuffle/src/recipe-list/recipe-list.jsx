import { Box, Button, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllRecipeListsWithRows, addRecipeList } from './services/recipe-list.service';
import { addRecipeListRow } from './services/recipe-list-row.service';

export default function RecipeList() {
    const [quillInput, setQuillInput] = useState('');
    const [recipeLists, setRecipeLists] = useState([]);
    const [selectedListId, setSelectedListId] = useState(''); // State to track selected list
    const [newListName, setNewListName] = useState(''); // State for new list name
    const [newListNote, setNewListNote] = useState(''); // State for new list note

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
                const newRecipeListId = await addRecipeList({ name: newListName, note: newListNote });
                
                // Update recipeLists with the new list immediately
                setRecipeLists(prevLists => [
                    ...prevLists, 
                    { id: newRecipeListId, name: newListName, note: newListNote, rows: extractedRecipeRows }
                ]);
    
                for (const row of extractedRecipeRows) {
                    await addRecipeListRow({ ...row, recipeListId: newRecipeListId });
                }
    
                // Clear inputs
                setNewListName('');
                setNewListNote('');
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

        // Target each <li> element in the document
        htmlDoc.querySelectorAll("li").forEach((node) => {
            // Get the quantity as the first part before any whitespace
            const quantityMatch = node.textContent.match(/^(\d+)\s+/);
            const quantity = quantityMatch ? parseInt(quantityMatch[1], 10) : null;

            // Get the link element within the <li> for name and link
            const linkElement = node.querySelector('a');
            const resourceName = linkElement ? linkElement.textContent.trim() : null;
            const link = linkElement ? linkElement.href : null;

            if (quantity && resourceName) {
                // Push an object for each item found
                items.push({
                    quantity,
                    resourceName,
                    area: "", // Default to empty since area is not provided
                    note: "", // Default to empty since note is not provided
                    link
                });
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

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 5, marginBottom: 10 }}>
            {/* Dropdown to select an existing recipe list */}
            <Select
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
                displayEmpty
                sx={{ width: '50%' }}
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
                sx={{ width: '50%' }}
            />
            <TextField
                label="New Recipe List Note"
                value={newListNote}
                onChange={(e) => setNewListNote(e.target.value)}
                sx={{ width: '50%' }}
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
                    <h3>{list.name}</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Resource Name</TableCell>
                                <TableCell>Area</TableCell>
                                <TableCell>Note</TableCell>
                                <TableCell>Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <TextField
                                            sx={{ width: '80px' }}
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(list.id, index, 'quantity', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            sx={{ width: '250px' }}
                                            value={row.resourceName}
                                            onChange={(e) => handleChange(list.id, index, 'resourceName', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            sx={{ width: '250px' }}
                                            value={row.area}
                                            onChange={(e) => handleChange(list.id, index, 'area', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            value={row.note}
                                            onChange={(e) => handleChange(list.id, index, 'note', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <a href={row.link} target='_blank' style={{ color: 'white' }}>
                                                {row.link}
                                            </a>
                                        </Typography>
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
