import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import debounce from 'lodash/debounce';
import { createItem } from '../services/itemService';
import { createRecipe } from '../services/recipeService';
import DoneIcon from '@mui/icons-material/Done';

function NewItemsPage() {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  // const [itemQuality, setItemQuality] = useState('n');
  const [itemFavorite, setItemFavorite] = useState('false');
  const [recipe, setRecipe] = useState(Array(8).fill({ name: '', quantity: '', parentItemId: '' }));
  const [itemBuyAt, setItemBuyAt] = useState("");
  const [itemSellAt, setItemSellAt] = useState("");
  const [item, setItem] = useState(
    {
      id: "",
      name: "",
      category: "",
      quality: "n",
      isFavorite: false
    });
  const [isSuccess, setIsSuccess] = useState(false);

  const debounceSetItem = debounce(setItem, 500);

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

  const handleItemNameChange = (event) => {
    const { value } = event.target;
    setItemName(value);
    debounceSetItem(prevState => ({ ...prevState, name: value }));
  }

  const handleItemCategoryChange = (event) => {
    const { value } = event.target;
    setItemCategory(value);
    debounceSetItem(prevState => ({ ...prevState, category: value }));
  };

  // const handleItemQualityChange = (event) => {
  //   setItemQuality(event.target.value);
  //   debounceSetItem(prevState => ({ ...prevState, quality: event.target.value }));
  // };

  const handleItemFavoriteChange = (event) => {
    setItemFavorite(event.target.value);
    const isFavoriteAsBool = event.target.value = event.target.value === "true";
    console.log(typeof isFavoriteAsBool)
    debounceSetItem(prevState => ({ ...prevState, isFavorite: isFavoriteAsBool }));
  };

  const handleItemSellAtChange = (event) => {
    setItemSellAt(event.target.value);
    debounceSetItem(prevState => ({ ...prevState, Buy: event.target.value }));
  }

  const handleItemBuyAtChange = (event) => {
    setItemBuyAt(event.target.value);
    debounceSetItem(prevState => ({ ...prevState, Sell: event.target.value }));
  }

  const saveItem = async () => {
    const filteredRecipe = recipe.filter(
      (ingredient) => ingredient.name !== "" && ingredient.quantity !== ""
    );

    const itemId = await createItem(item);

    const updatedRecipe = filteredRecipe.map((ingredient) => ({
      ...ingredient,
      parentItemId: itemId
    }));

    console.log(updatedRecipe);
    const recipeCreated = await createRecipe({ recipe: updatedRecipe });

    setIsSuccess(!!itemId && recipeCreated);
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
            onChange={(event) => handleItemNameChange(event)}>
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
            onChange={(event) => handleItemCategoryChange(event)}>
          </TextField>
        </Box>
        {/* price targets */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            Buy at:
          </Typography>
          <TextField
            label="Buy at:"
            size='small'
            value={itemBuyAt}
            onChange={(event) => handleItemBuyAtChange(event)}>
          </TextField>
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            Sell at:
          </Typography>
          <TextField
            label="Sell at:"
            size='small'
            value={itemSellAt}
            onChange={(event) => handleItemSellAtChange(event)}>
          </TextField>
        </Box>
        {/* Quality */}
        {/* <Box sx={{
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
        </Box> */}
        {/* Favorite */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant='h4'>
            favorite:
          </Typography>
          <RadioGroup
            defaultValue="false"
            name="isFavorite"
            value={itemFavorite}
            onChange={handleItemFavoriteChange}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2
            }}>
            <FormControlLabel value="false" control={<Radio />} label="no" />
            <FormControlLabel value="true" control={<Radio />} label="yes" />
          </RadioGroup>
        </Box>
      </Box>
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

export default NewItemsPage