import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getAllRecipeListsWithRows } from './services/recipe-list.service';

export default function RecipeList() {
    const [quillInput, setQuillInput] = useState('');
    const [recipeLists, setRecipeLists] = useState([]); // Changed to hold multiple recipe lists

    useEffect(() => {
        const loadRecipeLists = async () => {
            try {
                const data = await getAllRecipeListsWithRows();
                setRecipeLists(data); // Set the fetched data to state
            } catch (error) {
                console.error("Error fetching recipe lists:", error);
            }
        };

        loadRecipeLists();
    }, []);

    const addRecipeListRows = async () => {
        const extractedRecipeRows = extractRecipeRows();
        const newRecipeList = {
            id: `list-${Date.now()}`, // Unique ID for the new recipe list
            rows: extractedRecipeRows
        };

        setRecipeLists([...recipeLists, newRecipeList]); // Add new recipe list
        setQuillInput(''); // Clear the input after adding
    };

    const extractRecipeRows = () => {
        const editorContent = quillInput;
        const items = [];
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(editorContent, 'text/html');

        htmlDoc.body.childNodes.forEach(node => {
            const itemRegex = /^(\d+)\s+(.+)$/; // Regex to capture quantity and resource name
            const text = node.innerText;

            const match = itemRegex.exec(text);
            if (match) {
                const quantity = parseInt(match[1], 10);
                const resourceName = match[2];
                const link = node.querySelector('a') ? node.querySelector('a').href : null;

                items.push({ quantity, resourceName, link });
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
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 10 }}>
                <ReactQuill
                    value={quillInput}
                    onChange={setQuillInput}
                    modules={{ toolbar: false }}
                    style={{ width: '700px', height: '50px' }}
                />
                <Button onClick={addRecipeListRows} variant="contained">Add Recipe List</Button>
            </Box>
            {recipeLists.map((list) => (
                <TableContainer key={list.id} sx={{ marginBottom: 5, maxWidth: '90%' }}>
                    <h3>{list.name}</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Resource Name</TableCell>
                                <TableCell>Link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <TextField
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => handleChange(list.id, index, 'quantity', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            value={row.resourceName}
                                            onChange={(e) => handleChange(list.id, index, 'resourceName', e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            <a href={row.link} target='_blank' style={{color: 'white'}}>
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
