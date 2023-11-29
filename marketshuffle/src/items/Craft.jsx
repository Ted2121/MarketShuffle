import { Box } from '@mui/material'
import React, { useState } from 'react'
import Favorites from './Favorites'
import ItemTable from './ItemTable'
import ActionsPanel from './ActionsPanel'
import item from '../data/mocks/item-mock'

function Items() {
  const [selectedItem, setSelectedItem] = useState();

  const handleSetSelectedItem = (item) => {
    setSelectedItem(item);
  }
  // TODO call the get all favorites in a useEffect and pass it to favorites component
  return (
    <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow:'auto',
        p:'32px',
    }}>
        <Favorites />
        <ActionsPanel item={selectedItem} />
        <ItemTable handleSetSelectedItem={handleSetSelectedItem}/>
    </Box>
  )
}

export default Items