import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function NewItemsPage() {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQuality, setItemQuality] = useState('n');
  const [itemFavorite, setItemFavorite] = useState('');
  const [recipe, setRecipe] = useState(Array(8).fill({ name: '', quantity: '' }));
  const [item, setItem] = useState(
    {
      name: "",
      category: "",
      quality: "",
      isFavorite: false
    });


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

  const handleItemNameChange = (index, event) => {
    const { value } = event.target;
    setItemName(value)
  }

  const handleItemCategoryChange = (index, event) => {
    const { value } = event.target;
    setItemCategory(value);
  };

  const handleItemQualityChange = (event) => {
    setItemQuality(event.target.value);
  };

  const handleItemFavoriteChange = (index, event) => {
    const { value } = event.target;
    setItemFavorite(value);
  };

  const saveItem = () => {
    const filteredRecipe = recipe.filter(
      (ingredient) => ingredient.name !== '' && ingredient.quantity !== ''
    );

    setItem = {
      name: itemName,
      category: itemCategory,
      quality: itemQuality,
      isFavorite: itemFavorite,
      recipe: recipe
    }

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
            value={itemName}
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
            value={itemCategory}
            onChange={(event) => handleNameChange(event)}>
          </TextField>
        </Box>
        {/* Quality */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            Item quality:
          </Typography>
          <RadioGroup
            defaultValue="n"
            name="quality"
            value={itemQuality}
            onChange={handleItemQualityChange}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2
            }}>
            <FormControlLabel value="c" control={<Radio />} label="c" />
            <FormControlLabel value="n" control={<Radio />} label="n" />
            <FormControlLabel value="g" control={<Radio />} label="g" />
            <FormControlLabel value="p" control={<Radio />} label="p" />
            <FormControlLabel value="s" control={<Radio />} label="s" />
          </RadioGroup>
        </Box>
        {/* Favorite */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            favorite:
          </Typography>
          <TextField
            label="Name"
            size='small'
            value={itemCategory}
            onChange={(event) => handleNameChange(event)}>
          </TextField>
        </Box>
      </Box>
      {renderRecipeFields()}
      {/* Button to save */}
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
    </Box>
  )
}

export default NewItemsPage