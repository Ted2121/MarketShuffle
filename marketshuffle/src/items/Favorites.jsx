import { Box } from '@mui/material'
import React from 'react'
import Item from './Item'
import item from '../data/mocks/item-mock'

function Favorites() {
  return (
    <Box sx={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'column',
        gap:'16px',
        overflow:'auto',
        p:'16px 0'
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