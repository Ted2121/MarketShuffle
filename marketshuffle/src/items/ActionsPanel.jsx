import { Box } from '@mui/material'
import React from 'react'

function ActionsPanel({item}) {
  return (
    <Box sx={{
        display: 'flex',
        flex:70,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        {/* price history */}
        <Box>
            {/* Positions */}
            <Box>

            </Box>
            {/* Position details */}
            <Box>

            </Box>
            {/* graph */}
            <Box>

            </Box>
        </Box>
        {/* recipe */}
        {/* Kitsou hair: 8x [   ]  = x kamas*/}
        {/* x : 18x [   ]  = x kamas*/}
        {/* y: 2x [   ]  = x kamas*/}
        {/* Unmaged Item price: [   ] kamas - Profit: x kamas*/}
        {/* Ok Item price: [   ] kamas - Profit: x kamas */}
        {/* Perfect Item price: [   ] kamas - Profit: x kamas */}
        <Box>

        </Box>
        {/* Add item */}
        <Box>
            
        </Box>
    </Box>
  )
}

export default ActionsPanel