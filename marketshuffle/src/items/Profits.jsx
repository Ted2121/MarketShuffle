import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { debounce } from 'lodash';

function Profits({ totalCost, onUpdatePrice }) {
    const [cheapestPrice, setCheapestPrice] = useState('');
    const [goodItemPrice, setGoodItemPrice] = useState('');
    const [perfectItemPrice, setPerfectItemPrice] = useState('');
    const [specialItemPrice, setSpecialItemPrice] = useState('');

    const calculateProfits = (price) => {
        return Math.floor((price * .98) - totalCost).toLocaleString();
    }

    const handleCheapestPriceChange = (event) => {
        const { value } = event.target;
        setCheapestPrice(value !== '' ? parseInt(value) : '');
    };

    const handleGoodItemPriceChange = (event) => {
        const { value } = event.target;
        setGoodItemPrice(value !== '' ? parseInt(value) : '');
    };

    const handlePerfectItemPriceChange = (event) => {
        const { value } = event.target;
        setPerfectItemPrice(value !== '' ? parseInt(value) : '');
    };

    const handleSpecialItemPriceChange = (event) => {
        const { value } = event.target;
        setSpecialItemPrice(value !== '' ? parseInt(value) : '');
    };

    const updateParentProfits = debounce(() => {
        const updatedProfits = {
          cheapestPrice,
          goodItemPrice,
          perfectItemPrice,
          specialItemPrice,
        };
        onUpdatePrice(updatedProfits);
      }, 500);

      useEffect(() => {
        updateParentProfits();
      }, [cheapestPrice, goodItemPrice, perfectItemPrice, specialItemPrice, onUpdatePrice]);

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap: 1
        }}>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems:'center'
            }}>
                <Typography sx={{ fontSize: '1rem' }}>
                    Cheapest:
                </Typography>
                <TextField type="number"
                    label="Price"
                    size='small'
                    value={cheapestPrice}
                    onChange={(event) => handleCheapestPriceChange(event)}>
                </TextField>
                <Typography>
                   , Profit : {calculateProfits(cheapestPrice)} k
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems:'center'
            }}>
                <Typography sx={{ fontSize: '1rem' }}>
                    Good:
                </Typography>
                <TextField type="number"
                    label="Price"
                    size='small'
                    value={goodItemPrice}
                    onChange={(event) => handleGoodItemPriceChange(event)}>
                </TextField>
                <Typography>
                   , Profit : {calculateProfits(goodItemPrice)} k
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems:'center'
            }}>
                <Typography sx={{ fontSize: '1rem' }}>
                    Perfect:
                </Typography>
                <TextField type="number"
                    label="Price"
                    size='small'
                    value={perfectItemPrice}
                    onChange={(event) => handlePerfectItemPriceChange(event)}>
                </TextField>
                <Typography>
                   , Profit : {calculateProfits(perfectItemPrice)} k
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1,
                alignItems:'center'
            }}>
                <Typography sx={{ fontSize: '1rem' }}>
                    Special:
                </Typography>
                <TextField type="number"
                    label="Price"
                    size='small'
                    value={specialItemPrice}
                    onChange={(event) => handleSpecialItemPriceChange(event)}>
                </TextField>
                <Typography>
                   , Profit : {calculateProfits(specialItemPrice)} k
                </Typography>
            </Box>
        </Box>
    )
}

export default Profits