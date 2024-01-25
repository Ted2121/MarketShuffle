import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import { useEffect } from 'react';
import RuneRecipeList from './RuneRecipeList';
import rune from '../data/mocks/rune-mock';
import item from '../data/mocks/item-mock';

function RuneActions({ rune }) {
  const [items, setItems] = useState();
  const [total, setTotal] = useState();
  const [price, setPrice] = useState('');
  const [stats, setStats] = useState('');


  const itemList = async () => {
    // TODO: Fetch the items using rune.crush[].ids
    console.log(rune);
    setItems([item]);
  };

  const handleSetTotal = (cost) => {
    setTotal(cost);
  }

  useEffect(() => {
    itemList();
  }, []);

  const recipes = items?.map((item, index) => (
    <RuneRecipeList key={index} item={item} onSetTotal={handleSetTotal} />
  ))

  const handlePriceChange = (event) => {
    const { value } = event.target;
    setPrice(value !== '' ? parseInt(value) : '');
  };
  const handleStatsChange = (event) => {
    const { value } = event.target;
    setStats(value !== '' ? parseInt(value) : '');
  };

  const calculateProfits = (price) => {
    return Math.floor((price * .99) - total).toLocaleString();
  }

  const calculateRuneAmount = () => {
    
  }

  return (
    <>
      {recipes}
      <Box sx={{
          gap: 1,
          display: 'flex',
          alignItems: 'center',
        }}>
        <Typography>
          Stats:
        </Typography>
        <TextField type="number"
          label="Stats"
          size='small'
          value={stats}
          onChange={(event) => handleStatsChange(event)}>
        </TextField>
      </Box>
      <Box>
        <Typography>
          Rune amount: {}
        </Typography>
      </Box>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '1rem' }}>
          Rune price:
        </Typography>
        <TextField type="number"
          label="Price"
          size='small'
          value={price}
          onChange={(event) => handlePriceChange(event)}>
        </TextField>
        <Typography>
          , Profit : {calculateProfits(price)} k
        </Typography>
      </Box>
    </>
  )
}

export default RuneActions