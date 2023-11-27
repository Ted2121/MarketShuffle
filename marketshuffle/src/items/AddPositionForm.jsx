import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

function AddPositionForm({ itemId, handleAddPosition }) {
    const [cost, setCost] = useState('');
    const [details, setDetails] = useState('');

    const handleCostChange = (event) => {
        const { value } = event.target;
        setCost(value !== '' ? parseInt(value) : '');
    }

    const handleDetailsChange = (event) => {
        const { value } = event.target;
        setDetails(value);
    }

    const onAddPosition = () => {
        const currentUnixTime = Math.floor(Date.now() / 1000);
        handleAddPosition(itemId, cost, details, currentUnixTime);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                gap: 2,
            }}>
                <Typography>
                    Cost:
                </Typography>
                <TextField
                    type="number"
                    label="Cost"
                    size='small'
                    value={cost}
                    onChange={(event) => handleCostChange(event)}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 2,
            }}>
                <Typography>
                    Details:
                </Typography>
                <TextField
                    label="Details"
                    size='small'
                    value={details}
                    onChange={(event) => handleDetailsChange(event)}
                />
            </Box>
            <Button
                onClick={onAddPosition}
                variant='contained'
                color='white'
                sx={{
                    color: 'black.main',
                    maxHeight: '50px',
                    maxWidth:'80px'
                }}>
                Add
            </Button>
        </Box>
    )
}

export default AddPositionForm