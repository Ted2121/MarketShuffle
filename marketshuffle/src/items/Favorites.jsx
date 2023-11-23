import { Box } from '@mui/material'
import React from 'react'
import Item from './Item'
import item from '../data/mocks/item-mock'

function Favorites({items}) {
  return (
    <Box sx={{
        display: 'flex',
        flex:15,
        justifyContent: 'center',
        flexDirection:'column',
        gap:'16px',
        p:'16px 0',
    }}>
      
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
      <Item item={item}/>
      <Item item={item}/>
    </Box>
  )
}

export default Favorites