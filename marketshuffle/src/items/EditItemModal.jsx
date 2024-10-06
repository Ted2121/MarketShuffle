import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'grey.dark',
    border: '2px solid #8884d3',
    boxShadow: 24,
    p: 4,
    gap: 2,
};

// TODO add a callback that calls the actual edit function in parent component
function EditItemModal({ handleEditItem, currentItem }) {
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newBuyAt, setNewBuyAt] = useState('');
    const [newSellAt, setNewSellAt] = useState('');
    const [newFavorite, setNewFavorite] = useState('')
    const [newUseFor, setNewUseFor] = useState('')
    const [newProfession, setNewProfession] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const resetFields = () => {
        setNewName('');
        setNewBuyAt('');
        setNewSellAt('');
        setNewCategory('');
        setNewFavorite('');
        setNewUseFor('');
        setNewProfession('');
    }
    
    const handleBuyAtChange = (event) => {
        setNewBuyAt(event.target.value && event.target.value);
    };
    
    const handleSellAtChange = (event) => {
        setNewSellAt(event.target.value && event.target.value);
    };
    
    const handleNameChange = (event) => {
        setNewName(event.target.value && event.target.value);
    };
    
    const handleFavoriteChange = (event) => {
        setNewFavorite(event.target.value && event.target.value);
    };
    
    const handleCategoryChange = (event) => {
        setNewCategory(event.target.value && event.target.value);
    };

    const handleUseForChange = (event) => {
        setNewUseFor(event.target.value && event.target.value);
    };

    const handleProfessionChange = (event) => {
        setNewProfession(event.target.value && event.target.value);
    };
    
    const onEditItem = () => {
        handleEditItem(newName, newCategory, newBuyAt, newSellAt, newFavorite, newProfession, newUseFor);
        handleClose();
        resetFields();
    }
    return (
        <div>
            <Button
                onClick={handleOpen}
                variant='contained'
                color='white'
                sx={{
                    color: 'black.main',
                    mt: 1,
                    maxHeight: '50px'
                }}
            >
                Edit
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <TextField
                        label="Name"
                        size='small'
                        value={newName}
                        placeholder={currentItem?.name?.toString()}
                        onChange={(event) => handleNameChange(event)}
                    />
                    <TextField
                        type="number"
                        label="Buy at"
                        size='small'
                        value={newBuyAt}
                        placeholder={currentItem?.buy?.toString()}
                        onChange={(event) => handleBuyAtChange(event)}
                    />
                    <TextField
                        type="number"
                        label="Sell at"
                        size='small'
                        value={newSellAt}
                        placeholder={currentItem?.sell?.toString()}
                        onChange={(event) => handleSellAtChange(event)}
                    />
                    <TextField
                        label="Category"
                        size='small'
                        value={newCategory}
                        placeholder={currentItem?.category?.toString()}
                        onChange={(event) => handleCategoryChange(event)}
                    />
                    {/* <TextField
                        label="Favorite"
                        size='small'
                        value={newFavorite}
                        placeholder={currentItem?.isFavorite?.toString()}
                        onChange={(event) => handleFavoriteChange(event)}
                    /> */}
                    <TextField
                        label="Use for"
                        size='small'
                        value={newUseFor}
                        placeholder={currentItem?.useFor?.toString()}
                        onChange={(event) => handleUseForChange(event)}
                    />
                    <TextField
                        label="Profession"
                        size='small'
                        value={newProfession}
                        placeholder={currentItem?.profession?.toString()}
                        onChange={(event) => handleProfessionChange(event)}
                    />
                    <Button
                        onClick={onEditItem}
                        variant='contained'
                        color='white'
                        sx={{
                            color: 'black.main',
                            mt: 1,
                            maxHeight: '50px'
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default EditItemModal