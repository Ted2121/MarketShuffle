import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Item from './Item'
import categoryList from '../data/components-text/itemsCategoryList'
import item from '../data/mocks/item-mock';
import rune from '../data/mocks/rune-mock';
import {getAllItemsByCategory} from '../services/itemService';

function ItemTable({handleSetSelectedItem}) {
  
  const [itemList, setItemList] = useState([]);

  const onSetItem = (item) => {
    handleSetSelectedItem(item);
  }

  const getItemsForCategory = async (category) => {
    console.log("getting items for: ", category);
    const items = category && await getAllItemsByCategory(category); // Pass the category to the function
    setItemList([item]); // Ensure to update itemList with retrieved items
  }

  const items = (
    itemList.map(item => (
      <Item key={item.id} item={item} handleSetItem={onSetItem} />
    ))
  );

  const categories = (
    categoryList.map(category => (
      <Button
        variant='contained'
        color='white'
        onClick={() => getItemsForCategory(category.name)} // Use an arrow function here
        key={category.id} sx={{
          mb: 1,
          mr: 1,
        }}>
        <img src={category.img} style={{ aspectRatio: 1, width: '70px' }} />
      </Button>
    ))
  )

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      flex: 15,
      justifyContent: 'center',
      p: '16px 0',
      alignItems: 'center',
    }}>
      {/* search */}
      <Box>

      </Box>
      {/* categories */}
      <Box>
        {categories}
      </Box>
      {/* items */}
      <Box sx={{
        display: 'flex',
        flex: 15,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '16px',
        p: '16px 0',
      }}>
        {items}
      </Box>
    </Box>
  )
}

export default ItemTable;