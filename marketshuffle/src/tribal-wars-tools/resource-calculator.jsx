import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TwResourceCalculator() {
    const [lemn, setLemn] = useState(0);
    const [argila, setArgila] = useState(0);
    const [fier, setFier] = useState(0);

    const [costLemn, setCostLemn] = useState(0);
    const [costArgila, setCostArgila] = useState(0);
    const [costFier, setCostFier] = useState(0);

    const [productieLemn, setProductieLemn] = useState(0);
    const [productieArgila, setProductieArgila] = useState(0);
    const [productieFier, setProductieFier] = useState(0);

    const [resultMessage, setResultMessage] = useState('');
    const [timeToReady, setTimeToReady] = useState([]);

    const handleLemnChange = (event) => {
        const { value } = event.target;
        setLemn(parseFloat(value) || 0);
    };

    const handleArgilaChange = (event) => {
        const { value } = event.target;
        setArgila(parseFloat(value) || 0);
    };

    const handleFierChange = (event) => {
        const { value } = event.target;
        setFier(parseFloat(value) || 0);
    };

    const handleCostLemnChange = (event) => {
        const { value } = event.target;
        setCostLemn(parseFloat(value) || 0);
    };

    const handleCostArgilaChange = (event) => {
        const { value } = event.target;
        setCostArgila(parseFloat(value) || 0);
    };

    const handleCostFierChange = (event) => {
        const { value } = event.target;
        setCostFier(parseFloat(value) || 0);
    };

    const handleProductieLemnChange = (event) => {
        const { value } = event.target;
        setProductieLemn(parseFloat(value) || 0);
    };

    const handleProductieArgilaChange = (event) => {
        const { value } = event.target;
        setProductieArgila(parseFloat(value) || 0);
    };

    const handleProductieFierChange = (event) => {
        const { value } = event.target;
        setProductieFier(parseFloat(value) || 0);
    };

    const calculateTimeToReady = (time) => {
        if (time === Infinity) return 'Infinity';

        const totalMinutes = Math.ceil(time * 60); // Convert time to minutes
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const seconds = Math.round((totalMinutes % 1) * 60); // Get seconds from fractional part

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const calculateAndDisplayResult = () => {
        const message = blockedByResource();
        setResultMessage(message);

        // Calculate the time it takes for each resource to be ready
        const timeLemn = (costLemn - lemn) / (productieLemn > 0 ? productieLemn : 1);
        const timeArgila = (costArgila - argila) / (productieArgila > 0 ? productieArgila : 1);
        const timeFier = (costFier - fier) / (productieFier > 0 ? productieFier : 1);

        // Create an array for time messages
        const timeMessages = [
            `Lemn ready: ${calculateTimeToReady(timeLemn)}`,
            `Argila ready: ${calculateTimeToReady(timeArgila)}`,
            `Fier ready: ${calculateTimeToReady(timeFier)}`
        ];

        // Set timeMessages as an array
        setTimeToReady(timeMessages);
    };

    const blockedByResource = () => {
        const validCostLemn = costLemn >= 0 ? costLemn : 0;
        const validCostArgila = costArgila >= 0 ? costArgila : 0;
        const validCostFier = costFier >= 0 ? costFier : 0;

        const validProductieLemn = productieLemn > 0 ? productieLemn : 0;
        const validProductieArgila = productieArgila > 0 ? productieArgila : 0;
        const validProductieFier = productieFier > 0 ? productieFier : 0;

        const timeForLemn = validProductieLemn > 0 ? (validCostLemn - lemn) / validProductieLemn : Infinity;
        const timeForArgila = validProductieArgila > 0 ? (validCostArgila - argila) / validProductieArgila : Infinity;
        const timeForFier = validProductieFier > 0 ? (validCostFier - fier) / validProductieFier : Infinity;

        const times = [
            { resource: 'lemn', time: timeForLemn, production: validProductieLemn },
            { resource: 'argila', time: timeForArgila, production: validProductieArgila },
            { resource: 'fier', time: timeForFier, production: validProductieFier }
        ];

        // Sort the times array by time
        times.sort((a, b) => a.time - b.time);

        const maxTimeOfTwoFastest = Math.max(times[0].time, times[1].time);
        const slowestResource = times[2];

        const remainingTimeForSlowest = slowestResource.time - maxTimeOfTwoFastest;

        if (remainingTimeForSlowest > 0 && slowestResource.production > 0) {
            const missingAmount = remainingTimeForSlowest * slowestResource.production;
            return `The resource blocking the build is ${slowestResource.resource} by ${missingAmount.toFixed(2)} units.`;
        }

        return slowestResource.production === 0 
            ? `The resource blocking the build is ${slowestResource.resource} due to no production.` 
            : "You have enough resources to build.";
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
            {/* <Button
                variant='contained'
                onClick={() => calculateDistance(cityA, cityB)}>
                Calculate
            </Button> */}
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