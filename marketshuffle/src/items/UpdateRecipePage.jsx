import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { createRecipe } from '../services/recipeService';
import DoneIcon from '@mui/icons-material/Done';
import { useLocation } from 'react-router-dom';


function UpdateRecipePage() {
    const [recipe, setRecipe] = useState(Array(8).fill({ name: '', quantity: '', parentItemId: '' }));
    const location = useLocation();
    const { id } = location.state;
    const [isSuccess, setIsSuccess] = useState(false);
    const filteredRecipe = recipe.filter(
        (ingredient) => ingredient.name !== "" && ingredient.quantity !== ""
      );

    const handleRecipeNameChange = (index, event) => {
        const { value } = event.target;
        const updatedRecipe = [...recipe];
        updatedRecipe[index] = { ...updatedRecipe[index], name: value };
        setRecipe(updatedRecipe);
    };

    const handleRecipeQuantityChange = (index, event) => {
        const { value } = event.target;
        const updatedRecipe = [...recipe];
        updatedRecipe[index] = { ...updatedRecipe[index], quantity: value };
        setRecipe(updatedRecipe);
    };

    const saveItem = async () => {
        const updatedRecipe = filteredRecipe.map((ingredient) => ({
            ...ingredient,
            parentItemId: id
        }));

        const recipeCreated = await createRecipe({ recipe: updatedRecipe });

        setIsSuccess(recipeCreated);
        window.location.reload();
    };

    const renderRecipeFields = () => {
        return recipe.map((ingredient, index) => (
            <Box
                key={index}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    mt: 1,
                }}
            >
                <Typography variant="h4">{`${index + 1}:`}</Typography>
                <TextField
                    label="Ingredient"
                    size="small"
                    value={ingredient.name}
                    onChange={(event) => handleRecipeNameChange(index, event)}
                />
                <Typography variant="h4">x</Typography>
                <TextField
                    label="Quantity"
                    type='number'
                    size="small"
                    value={ingredient.quantity}
                    onChange={(event) => handleRecipeQuantityChange(index, event)}
                />
            </Box>
        ));
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
            {renderRecipeFields()}
            {/* Button to save */}
            <Box sx={{
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center'
            }}>
                <Button onClick={saveItem}
                    variant='contained'
                    color='white'
                    sx={{
                        color: 'black.main',
                        mt: 2,
                        maxHeight: '50px'
                    }}>
                    Save Recipe
                </Button>
                {isSuccess && <DoneIcon size="large" sx={{
                    color: "green"
                }} />}
            </Box>
        </Box>
    )
}

export default UpdateRecipePage