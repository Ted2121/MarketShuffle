import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import { useEffect } from 'react';

function GeneralItemActions({ item, handleAddPosition }) {
    const [ingredientPrices, setIngredientPrices] = useState({});
    const [totalCost, setTotalPrice] = useState(0);
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const [specialItemDetails, setSpecialItemPosition] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);

    const [costs, setCosts] = useState({
        cheapestPrice: 0,
        goodItemPrice: 0,
        perfectItemPrice: 0,
        specialItemPrice: 0,
    });

    const onAddPosition = (itemId, cost, details, time) => {
        handleAddPosition(itemId, cost, details, time);
    }

    const handleSpecialItemDetailsChange = (event) => {
        const { value } = event.target;
        setSpecialItemPosition(value)
    }

    const handleCostChange = (index, event) => {
        const { value } = event.target;
        setIngredientPrices(prevState => ({
            ...prevState,
            [index]: value !== '' ? parseInt(value) : '',
        }));
    };

    const handlePriceChange = (updatedProfits) => {
        setCosts(updatedProfits);
    };

    useEffect(() => {
        if (!item || !Array.isArray(item.recipe)) return;

        let total = 0;
        item?.recipe?.forEach((ingredient, index) => {
            const price = ingredientPrices[index];
            if (!isNaN(price) && !isNaN(ingredient.quantity)) {
                total += price * parseFloat(ingredient.quantity);
            }
        });
        setTotalPrice(total);
        console.log(item);
    }, [ingredientPrices, item?.recipe]);

    useEffect(() => {
        if (item && item.id !== selectedItemId) {
            // Reset state when a new item is selected
            setIngredientPrices({});
            setTotalPrice(0);
            setSpecialItemPosition('');
            setSelectedItemId(item.id);
        }
    }, [item, selectedItemId]);

    const recipe = Array.isArray(item?.recipe) && item?.recipe?.map((ingredient, index) => {
        const costValue = ingredientPrices[index] !== undefined ? ingredientPrices[index] : '';
        console.log(item?.recipe)
        return (
            !item || !Array.isArray(item.positions) ? (
                <div key={index}>No positions data available</div>
            ) : (
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
            <Divider />
            <Box sx={{
                display: 'flex',
                gap: 2
            }}>
                <Profits totalCost={totalCost} onUpdatePrice={handlePriceChange} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Button
                        onClick={() => onAddPosition(item?.id, costs.cheapestPrice, "", currentUnixTime)}
                        variant='contained'
                        color='white'
                        sx={{
                            color: 'black.main',
                            maxHeight: '30px'
                        }}
                    >
                        Add
                    </Button><Button
                        onClick={() => onAddPosition(item?.id, costs.goodItemPrice, "", currentUnixTime)}
                        variant='contained'
                        color='white'
                        sx={{
                            color: 'black.main',
                            maxHeight: '30px'
                        }}
                    >
                        Add
                    </Button><Button
                        onClick={() => onAddPosition(item?.id, costs.perfectItemPrice, "", currentUnixTime)}
                        variant='contained'
                        color='white'
                        sx={{
                            color: 'black.main',
                            maxHeight: '30px'
                        }}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={() => onAddPosition(item?.id, costs.specialItemPrice, specialItemDetails ?? '', currentUnixTime)}
                        variant='contained'
                        color='white'
                        sx={{
                            color: 'black.main',
                            maxHeight: '30px'
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
            <TextField
                label="Details"
                size='small'
                value={specialItemDetails}
                onChange={(event) => handleSpecialItemDetailsChange(event)}
            />
        </>
    )
}

export default GeneralItemActions