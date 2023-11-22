import { Box } from '@mui/material'
import React from 'react'
import Favorites from './Favorites'
import ItemTable from './ItemTable'

function Items() {
  return (
    <Box sx={{
        width: '100%',
        maxHeight:'70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'auto',
        p:'32px',
    }}>
        <Favorites />
        <ItemTable />
    </Box>
  )
}

export default Items