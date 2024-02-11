import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import { useEffect, useCallback, useMemo } from 'react';

function GeneralItemActions({ item, handleAddPosition }) {
  const [ingredientPrices, setIngredientPrices] = useState({});
    const [totalCost, setTotalPrice] = useState(0);
    const [specialItemDetails, setSpecialItemPosition] = useState('');
    const [selectedItemId, setSelectedItemId] = useState(null);
    const currentUnixTime = useMemo(() => Math.floor(Date.now() / 1000), []);

    const [costs, setCosts] = useState({
        cheapestPrice: 0,
        goodItemPrice: 0,
        perfectItemPrice: 0,
        specialItemPrice: 0,
    });

    const onAddPosition = useCallback((itemId, cost, details, time) => {
        handleAddPosition(itemId, cost, details, time);
    }, [handleAddPosition]);

    const handleSpecialItemDetailsChange = useCallback((event) => {
        setSpecialItemPosition(event.target.value);
    }, []);

    const handleCostChange = useCallback((index, event) => {
        const { value } = event.target;
        setIngredientPrices(prevState => ({
            ...prevState,
            [index]: value !== '' ? parseInt(value) : '',
        }));
    }, []);

    const handlePriceChange = useCallback((updatedProfits) => {
        setCosts(updatedProfits);
        // Recalculate total cost when prices change
        let total = 0;
        item?.recipe?.forEach((ingredient, index) => {
            const price = ingredientPrices[index];
            if (!isNaN(price) && !isNaN(ingredient.quantity)) {
                total += price * parseFloat(ingredient.quantity);
            }
        });
        setTotalPrice(total);
    }, [ingredientPrices, item?.recipe]);

    const handleItemSelection = useCallback((item) => {
        if (item.id !== selectedItemId) {
            // Reset state when a new item is selected
            setIngredientPrices({});
            setTotalPrice(0);
            setSpecialItemPosition('');
            setSelectedItemId(item.id);
        }
    }, [selectedItemId]);

    const handleAddButtonClick = useCallback((cost) => {
        onAddPosition(item.id, cost, specialItemDetails, currentUnixTime);
    }, [item?.id, onAddPosition, specialItemDetails, currentUnixTime]);

    const recipe = useMemo(() => {
        return Array.isArray(item?.recipe) && item?.recipe?.map((ingredient, index) => {
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
}, [ingredientPrices, item?.recipe]);

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