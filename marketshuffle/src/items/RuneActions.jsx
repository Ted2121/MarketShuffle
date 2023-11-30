import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import { useEffect } from 'react';
import RecipeList from './RecipeList';

function RuneActions({rune}) {
    const [item, setItem] = useState();


  return (
    <>

        <RecipeList item={item}/>
    </>
  )
}

export default RuneActions