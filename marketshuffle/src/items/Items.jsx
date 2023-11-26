import { Box } from '@mui/material'
import React from 'react'
import Favorites from './Favorites'
import ItemTable from './ItemTable'
import ActionsPanel from './ActionsPanel'

function Items() {
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
        <ActionsPanel />
        <ItemTable />
    </Box>
  )
}

export default Items