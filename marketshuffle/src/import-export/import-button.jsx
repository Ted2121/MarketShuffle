import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

export default function ImportButton() {
    const [open, setOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [fileContent, setFileContent] = useState(null);

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setConfirmationText(''); // Clear the text field after dialog is closed
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setFileContent(e.target.result); // Store the file content
        };

        reader.readAsText(file); // Read the uploaded file as text
    };

    const handleImport = () => {
        if (confirmationText.toLowerCase() === 'import') {
            try {
                const parsedData = JSON.parse(fileContent); // Parse the uploaded JSON file
                localStorage.clear(); // Clear current local storage
                for (const key in parsedData) {
                    localStorage.setItem(key, parsedData[key]); // Import new data into local storage
                }
                alert('Local storage successfully updated! Refresh the page');
            } catch (error) {
                alert('Failed to parse JSON file.');
            } finally {
                handleCloseDialog();
            }
        } else {
            alert('You must type "import" to confirm the import action.');
        }
    };

    return (
        <>
            {/* Button to open the import dialog */}
            <Button
                variant="outlined"
                onClick={handleOpenDialog}
            >
                Import Data
            </Button>

            {/* Dialog for importing data */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Import Data into Local Storage</DialogTitle>
                <DialogContent>
                    <input
                        type="file"
                        accept="application/json"
                        onChange={handleFileChange}
                    />
                    <TextField
                        margin="dense"
                        label='This action will delete current data. Type "Import" to confirm'
                        fullWidth
                        variant="outlined"
                        value={confirmationText}
                        onChange={(e) => setConfirmationText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleImport} variant="contained" color="secondary">
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}