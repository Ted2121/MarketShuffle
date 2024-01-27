import { Box, Checkbox, Typography } from '@mui/material'
import React, { useState } from 'react'

function RecipeNode({name}) {
  const [recipe, setRecipe] = useState({});
  console.log(name)
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        p: 2,
        mt: 2
    }}>
        <Typography sx={{
          fontSize:"1.5rem"
        }}>{name}:</Typography>
        <Checkbox size='large'/>
    </Box>
  )
}

export default RecipeNode