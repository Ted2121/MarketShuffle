import { Box, Checkbox, Typography } from '@mui/material'
import React from 'react'

function RecipeNode({ name }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}>
      <Typography sx={{
        fontSize: "1.2rem"
      }}>{name}:</Typography>
      <Checkbox size='large' />
    </Box>
  )
}

export default RecipeNode