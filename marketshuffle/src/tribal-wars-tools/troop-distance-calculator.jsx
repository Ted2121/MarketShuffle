import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function TroopDistanceCalculator() {
    const [calculatedDistance, setCalculatedDistance] = useState(0);
    const [cityA, setCityA] = useState('');
    const [cityB, setCityB] = useState('');

    const lance = 18;
    const spada = 22;
    const topor = 18;
    const arc = 18;

    const spion = 9;
    const cavUsoara = 10;
    const arcCalaret = 10;
    const cavGrea = 11;

    const berbec = 30;
    const catapulta = 30;
    const paladin = 10;
    const nobil = 35;

    const handleCityAChange = (event) => {
        const { value } = event.target;
        setCityA(value);
    }

    const handleCityBChange = (event) => {
        const { value } = event.target;
        setCityB(value);
    }

    function calculateTravelTime(timePerField) {
        // Step 1: Calculate total travel time in minutes
        const totalMinutes = calculatedDistance * timePerField;

        // Step 2: Convert total minutes to hours, minutes, and seconds
        const hours = Math.floor(totalMinutes / 60); // Get the full hours
        const minutes = Math.floor(totalMinutes % 60); // Get the remaining full minutes
        const seconds = Math.round((totalMinutes % 1) * 60); // Use rounding for seconds

        // Handle rounding case where seconds could be 60 (carry over to minutes)
        let finalMinutes = minutes;
        let finalHours = hours;
        let finalSeconds = seconds;

        if (seconds === 60) {
            finalSeconds = 0;
            finalMinutes += 1; // Add 1 minute
        }

        if (finalMinutes === 60) {
            finalMinutes = 0;
            finalHours += 1; // Add 1 hour if minutes go over 60
        }

        // Step 3: Format the result as hh:mm:ss
        const formattedTime =
            String(finalHours).padStart(2, '0') + 'h ' +
            String(finalMinutes).padStart(2, '0') + 'm ' +
            String(finalSeconds).padStart(2, '0') + 's';

        return formattedTime;
    }

    function calculateDistance(cityA, cityB) {
        // Extract the x and y coordinates from the city coordinates
        const [x1, y1] = cityA.split('|').map(Number);
        const [x2, y2] = cityB.split('|').map(Number);

        // Apply the Pythagorean theorem
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        setCalculatedDistance(distance);
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 3,
            marginTop: 20,
        }}>
            <TextField
                label="city A"
                size='small'
                value={cityA}
                tabIndex="-1"
                onChange={(event) => handleCityAChange(event)}
            />
            <TextField
                label="city B"
                size='small'
                value={cityB}
                tabIndex="-1"
                onChange={(event) => handleCityBChange(event)}
            />
            <Button
                variant='contained'
                onClick={() => calculateDistance(cityA, cityB)}>
                Calculate
            </Button>
            <Typography variant="h4">
                Distance is: {calculatedDistance}
            </Typography>
            <Box sx={{
                width: '800px',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 3,
            }}>
                <Box sx={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    marginTop: 20,
                }}>
                    <Typography variant="h4">lance: {calculateTravelTime(lance)}</Typography>
                    <Typography variant="h4">spada: {calculateTravelTime(spada)}</Typography>
                    <Typography variant="h4">topor: {calculateTravelTime(topor)}</Typography>
                    <Typography variant="h4">arc: {calculateTravelTime(arc)}</Typography>
                </Box>
                <Box sx={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    marginTop: 20,
                }}>
                    <Typography variant="h4">spion: {calculateTravelTime(spion)}</Typography>
                    <Typography variant="h4">cavUsoara: {calculateTravelTime(cavUsoara)}</Typography>
                    <Typography variant="h4">arcCalaret: {calculateTravelTime(arcCalaret)}</Typography>
                    <Typography variant="h4">cavGrea: {calculateTravelTime(cavGrea)}</Typography>
                </Box>
                <Box sx={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 1,
                    marginTop: 20,
                }}>
                    <Typography variant="h4">berbec: {calculateTravelTime(berbec)}</Typography>
                    <Typography variant="h4">catapulta: {calculateTravelTime(catapulta)}</Typography>
                    <Typography variant="h4">paladin: {calculateTravelTime(paladin)}</Typography>
                    <Typography variant="h4">nobil: {calculateTravelTime(nobil)}</Typography>
                </Box>
            </Box>
        </Box>
    )
}