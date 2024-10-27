import { Box, 
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, } from '@mui/material';
import React, { useState } from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RecipeList() {
    const [quillInput, setQuillInput] = useState('');
    const [recipeRows, setRecipeRows] = useState([]);

    const addRecipeListRows = async () => {
        const extractedRecipeRows = extractRecipeRows();
        setRecipeRows(
            ...recipeRows,
            ...extractedRecipeRows
        );


    }

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

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            marginTop: 5,
            marginBottom: 10,
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginBottom: 10,
            }}>
                <ReactQuill
                    value={quillInput}
                    onChange={setQuillInput}
                    modules={{ toolbar: false }}
                    style={{ width: '700px', height: '50px' }}
                />
                <Button onClick={addRecipeListRows} variant="contained">
                    Add Recipe List
                </Button>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                marginBottom: 10,
            }}>

            </Box>
        </Box>
    );
}