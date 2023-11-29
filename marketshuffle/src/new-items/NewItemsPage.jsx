import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function NewItemsPage() {
  const [name, setName] = useState('');
  const handleNameChange = (event) => {
    const { value } = event.target;
    setSpecialItemPosition(value)
  }
  const [recipe, setRecipe] = useState(Array(8).fill({ name: '', quantity: '' }));

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

  const saveRecipe = () => {
    const filteredRecipe = recipe.filter(
      (ingredient) => ingredient.name !== '' && ingredient.quantity !== ''
    );
    // Logic to save the recipe array or use it as needed
    console.log(filteredRecipe);
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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {/* Name */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            Item name:
          </Typography>
          <TextField
            label="Name"
            size='small'
            value={name}
            onChange={(event) => handleNameChange(event)}>
          </TextField>
        </Box>
        {/* Category */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            Item category:
          </Typography>
          <TextField
            label="Name"
            size='small'
            value={name}
            onChange={(event) => handleNameChange(event)}>
          </TextField>
        </Box>
      </Box>
      {renderRecipeFields()}
      {/* Button to save */}
      <Button onClick={saveRecipe}
        variant='contained'
        color='white'
        sx={{
          color: 'black.main',
          mt: 2,
          maxHeight: '50px'
        }}>
        Save Recipe
      </Button>
    </Box>
  )
}

export default NewItemsPage