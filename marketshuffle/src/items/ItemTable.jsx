import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import Item from './Item'
import categoryList from '../data/components-text/itemsCategoryList'
import item from '../data/mocks/item-mock';
import rune from '../data/mocks/rune-mock';

function ItemTable({handleSetSelectedItem}) {
const [itemList, setItemList] = useState([]);

const onSetItem = (item) => {
  handleSetSelectedItem(item);
}

const items = (
  itemList.map(item => (
    <Item key={item.id} item={item} handleSetItem={onSetItem}/>
  ))
);


const categories = (
  categoryList.map(category => (
    <Button 
    variant='contained'
    color='white'
    onClick={async () => await getItemsForCategory(category.name)}
    key={category.id} sx={{
      mb:1,
      mr: 1,
    }}>
      <img src={category.img} style={{aspectRatio:1, width:'70px'}}/>
    </Button>
  ))
)

const getItemsForCategory = async (category) => {
// TODO use a switch to call the right api method because runes and misc are on different controller

  console.log("getting items for: ", category)
  // await itemService.getItemsForCategory(category);
  setItemList([item])
}

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        flex:15,
        justifyContent: 'center',
        p:'16px 0',
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
         flex:15,
         justifyContent: 'center',
         flexDirection:'column',
         gap:'16px',
         p:'16px 0',
      }}>
        {items}
      {/* <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/>
      <Item item={item}/> */}
      </Box>
    </Box>
  )
}

export default ItemTable