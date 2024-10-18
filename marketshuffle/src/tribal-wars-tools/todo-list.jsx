import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TwTodoList() {
    const [lemn, setLemn] = useState(0);

    const handleLemnChange = (event) => {
        const { value } = event.target;
        setLemn(parseFloat(value) || 0);
    };


    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 20,
            gap: 3,
        }}>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
            }}>
                <TextField
                    label="lemn"
                    size='small'
                    value={lemn}
                    tabIndex="-1"
                    onChange={(event) => handleLemnChange(event)}
                />
                <TextField
                    label="argila"
                    size='small'
                    value={argila}
                    tabIndex="-1"
                    onChange={(event) => handleArgilaChange(event)}
                />
                <TextField
                    label="fier"
                    size='small'
                    value={fier}
                    tabIndex="-1"
                    onChange={(event) => handleFierChange(event)}
                />
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
            }}>
                <TextField
                    label="productieLemn"
                    size='small'
                    value={productieLemn}
                    tabIndex="-1"
                    onChange={(event) => handleProductieLemnChange(event)}
                />
                <TextField
                    label="productieArgila"
                    size='small'
                    value={productieArgila}
                    tabIndex="-1"
                    onChange={(event) => handleProductieArgilaChange(event)}
                />
                <TextField
                    label="productieFier"
                    size='small'
                    value={productieFier}
                    tabIndex="-1"
                    onChange={(event) => handleProductieFierChange(event)}
                />
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 1,
            }}>
                <TextField
                    label="costLemn"
                    size='small'
                    value={costLemn}
                    tabIndex="-1"
                    onChange={(event) => handleCostLemnChange(event)}
                />
                <TextField
                    label="costArgila"
                    size='small'
                    value={costArgila}
                    tabIndex="-1"
                    onChange={(event) => handleCostArgilaChange(event)}
                />
                <TextField
                    label="costFier"
                    size='small'
                    value={costFier}
                    tabIndex="-1"
                    onChange={(event) => handleCostFierChange(event)}
                />
            </Box>
            <Button onClick={calculateAndDisplayResult} variant="contained" color="primary">
                Calculate
            </Button>
            <Typography variant="h4" sx={{ mt: '20px' }}>
                {resultMessage}
            </Typography>
            {timeToReady.map((message, index) => (
                <Typography variant="h4" key={index}>{message}</Typography>
            ))}
        </Box>
    )
}