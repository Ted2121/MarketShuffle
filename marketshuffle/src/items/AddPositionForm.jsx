import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import '../main.css';

function AddPositionForm({ itemId, handleAddPosition }) {
    const [one, setOne] = useState('');
    const [ten, setTen] = useState('');
    const [hundred, setHundred] = useState('');
    const [details, setDetails] = useState('');
    const [positionQuality, setPositionQuality] = useState('n');
    const oneRef = useRef(null);

    const handlePositionQualityChange = (event) => {
        setPositionQuality(event.target.value);
    };

    const handleOneChange = (event) => {
        const { value } = event.target;
        setOne(value);
    }

    const handleTenChange = (event) => {
        const { value } = event.target;
        setTen(value);
    }

    const handleHundredChange = (event) => {
        const { value } = event.target;
        setHundred(value);
    }
    const handleDetailsChange = (event) => {
        const { value } = event.target;
        setDetails(value);
    }

    const onAddPosition = () => {
        oneRef.current.focus();
        const currentUnixTime = Math.floor(Date.now() / 1000);
        handleAddPosition(itemId, one, ten, hundred, details, currentUnixTime, positionQuality);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onAddPosition();
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mt: 2,
            gap: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Box sx={{
                    display: 'flex', gap: 2
                }}>
                    <Typography>
                        One:
                    </Typography>
                    <TextField
                        type="number"
                        label="One:"
                        size='small'
                        value={one}
                        onChange={(event) => handleOneChange(event)}
                        inputRef={oneRef}
                    />
                </Box>
                <Box sx={{
                    display: 'flex', gap: 2
                }}>
                    <Typography>
                        Ten:
                    </Typography>
                    <TextField
                        type="number"
                        label="Ten:"
                        size='small'
                        value={ten}
                        onChange={(event) => handleTenChange(event)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex', gap: 2
                }}>
                    <Typography>
                        Hundred:
                    </Typography>
                    <TextField
                        type="number"
                        label="Hundred:"
                        size='small'
                        value={hundred}
                        onChange={(event) => handleHundredChange(event)}
                        onKeyDown={handleKeyPress}
                    />
                </Box>
            </Box>
            <Button
                onClick={onAddPosition}
                variant='contained'
                color='white'
                sx={{
                    color: 'black.main',
                    maxHeight: '50px',
                    maxWidth: '80px'
                }}>
                Add
            </Button>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Box sx={{
                    display: 'flex', gap: 2
                }}>
                    <Typography>
                        Details:
                    </Typography>
                    <TextField
                        label="Details"
                        size='small'
                        value={details}
                        tabIndex="-1"
                        onChange={(event) => handleDetailsChange(event)}
                    />
                </Box>
                {/* Quality */}
                <Typography variant='h4'>
                    Item quality:
                </Typography>
                <RadioGroup
                    defaultValue="n"
                    name="quality"
                    value={positionQuality}
                    onChange={handlePositionQualityChange}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                    <FormControlLabel value="c" control={<Radio />} label="c" />
                    <FormControlLabel value="n" control={<Radio />} label="n" />
                    <FormControlLabel value="g" control={<Radio />} label="g" />
                    <FormControlLabel value="p" control={<Radio />} label="p" />
                    <FormControlLabel value="s" control={<Radio />} label="s" />
                </RadioGroup>
            </Box>

        </Box>
    )
}

export default AddPositionForm