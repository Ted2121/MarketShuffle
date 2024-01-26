import { Box } from '@mui/material'
import React from 'react'
import RecipeNode from './RecipeNode'

function RecipeTier({tierData}) {
  return (
    <Box sx={{
        display:'flex',
        gap: 2
    }}>
    {Array.isArray(tierData) && tierData.map((item, index) => (
      item.name && <RecipeNode key={index} name={item.name} />
    ))}
  </Box>
  )
}

export default RecipeTier