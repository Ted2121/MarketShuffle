import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import positions from '../data/mocks/positions-mock';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { debounce } from 'lodash';

function Profits({ totalCost, onUpdateProfits }) {
    const [cheapestPrice, setCheapestPrice] = useState('');
    const [goodItemPrice, setGoodItemPrice] = useState('');
    const [perfectItemPrice, setPerfectItemPrice] = useState('');
    const [specialItemPrice, setSpecialItemPrice] = useState('');

    const calculateProfits = (price) => {
        return Math.floor((price * .99) - totalCost).toLocaleString();
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
        onUpdateProfits(updatedProfits);
      }, 1000);

      useEffect(() => {
        updateParentProfits();
      }, [cheapestPrice, goodItemPrice, perfectItemPrice, specialItemPrice, onUpdateProfits]);

    return (
        <>
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
        </>
    )
}

export default Profits