import { Box } from '@mui/material'
import React from 'react'
import RecipeNode from './RecipeNode'
import CraftingTree from './CraftingTree'

function CraftingTreePage() {

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        }}>
           <CraftingTree />
        </Box>
    )
}

export default CraftingTreePage