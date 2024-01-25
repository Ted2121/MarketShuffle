import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import { useEffect } from 'react';

function RuneRecipeList({ item, onSetTotal }) {
    const [ingredientPrices, setIngredientPrices] = useState({});
    const [totalCost, setTotalPrice] = useState(0);

    const handleCostChange = (index, event) => {
        const { value } = event.target;
        setIngredientPrices(prevState => ({
            ...prevState,
            [index]: value !== '' ? parseInt(value) : '',
        }));
    };

    useEffect(() => {
        let total = 0;
        item?.recipe?.forEach((ingredient, index) => {
            const price = ingredientPrices[index];
            if (!isNaN(price) && !isNaN(ingredient.quantity)) {
                total += price * parseFloat(ingredient.quantity);
            }
        });
        setTotalPrice(total);
        onSetTotal(total);
    }, [ingredientPrices, item?.recipe]);



    const recipe = item?.recipe?.map((ingredient, index) => {
        const costValue = ingredientPrices[index] !== undefined ? ingredientPrices[index] : '';

        return (
            (
                <Box
                    key={index}
                    sx={{
                        gap: 1,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography sx={{ fontSize: '1rem' }}>
                        {ingredient.name} -
                    </Typography>
                    <Typography sx={{ fontSize: '1rem' }}>
                        {ingredient.quantity}x
                    </Typography>
                    <TextField
                        type="number"
                        label="Cost"
                        size='small'
                        value={costValue}
                        onChange={(event) => handleCostChange(index, event)}
                    />
                    <Typography sx={{ fontSize: '1rem' }}>
                        = {ingredientPrices[index] && (ingredientPrices[index] * ingredient.quantity).toLocaleString()} k
                    </Typography>
                </Box>
            )
        );
    });

    return (
        <>
            {recipe}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography sx={{ fontSize: '1rem' }}>
                    Total: {totalCost.toLocaleString()}
                </Typography>
            </Box>
        </>
    )
}

export default RuneRecipeList