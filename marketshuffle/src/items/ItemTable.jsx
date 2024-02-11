import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import Item from './Item'
import categoryList from '../data/components-text/itemsCategoryList'
import item from '../data/mocks/item-mock';
import rune from '../data/mocks/rune-mock';
import { getAllItemsByCategory, getItemsBySearchString } from '../services/itemService';

function ItemTable({ handleSetSelectedItem }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemList, setItemList] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const onSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      const items = await getItemsBySearchString(value);
      setItemList(items || []);
    }, 1000);

    setTimeoutId(newTimeoutId);
  };

  const getItemsForCategory = async (category) => {
    const items = category && await getAllItemsByCategory(category);
    setItemList(items);
  }

  const onSetItem = (item) => {
    handleSetSelectedItem(item);
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
        onClick={() => getItemsForCategory(category.name)}
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
        width: '100%',
      }}>
        {/* search */}
        <Box sx={{
          width: '100%'
        }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={onSearchChange}
            sx={{
              mb: 1,
              width: '100%'
            }}
          />
        </Box>
        {items}
      </Box>
    </Box>
  )
}

export default ItemTable;