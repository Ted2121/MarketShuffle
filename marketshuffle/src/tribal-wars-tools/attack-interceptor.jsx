import { Box, Button, Input, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function AttackInterceptor() {
    const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }) + '.' + new Date().getMilliseconds());
    const [attackOne, setAttackOne] = useState('');
    const [attackTwo, setAttackTwo] = useState('');
    const [attackThree, setAttackThree] = useState('');
    const [attackFour, setAttackFour] = useState('');
    const [mustDefendAt, setMustDefendAt] = useState('');
    const [timeToDefend, setTimeToDefend] = useState('');
    const [testResult, setTestResult] = useState('');
    const [testSuccesful, setTestSuccessful] = useState(false);
    const [alarmPlayed, setAlarmPlayed] = useState(false);
    const soundAlarm = new Audio('src/assets/sound/horn.m4a');

    const handleAttackOneChange = (event) => {
        const { value } = event.target;
        setAttackOne(value);
    }

    const handleAttackTwoChange = (event) => {
        const { value } = event.target;
        setAttackTwo(value);
    }

    const handleAttackThreeChange = (event) => {
        const { value } = event.target;
        setAttackThree(value);
    }

    const handleAttackFourChange = (event) => {
        const { value } = event.target;
        setAttackFour(value);
    }

    const handleTimeToDefendChange = (event) => {
        const { value } = event.target;
        setTimeToDefend(value);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentTime = now.toLocaleTimeString('en-US', { hour12: false }) + '.' + now.getMilliseconds();
            const firstAttack = getEventTimeInMilliseconds(attackOne);
            const timeToDefendInMs = timeStringToMilliseconds(timeToDefend);

            const difference = firstAttack - (now.getTime() + timeToDefendInMs);

            if (difference <= 395 && !alarmPlayed) {
                // Play alarm sound when we're within 100 milliseconds of the attack
                soundAlarm.play();
                setAlarmPlayed(true); // Avoid multiple triggers
            }
            // Reset alarm when difference is far from the event
            if (difference > 2000) {
                setAlarmPlayed(false);
            }

            setTime(currentTime);
        }, 1); // Update every millisecond

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [attackOne, timeToDefend, alarmPlayed, soundAlarm]);

    const reset = () => {
        setTestResult('');
    }

    const testIntercept = () => {
        const clickTime = Date.now();

        // Get the time for the first attack event in milliseconds
        const firstAttack = getEventTimeInMilliseconds(attackOne);
    
        // The amount of time to defend in milliseconds
        const timeToDefendInMs = timeStringToMilliseconds(timeToDefend);
    
        // Calculate the difference: when the defense should finish compared to the event
        const difference = (clickTime + timeToDefendInMs) - firstAttack;
    
        // Set success if the difference is within 100 milliseconds
        setTestSuccessful(difference <= 100 && difference >= -100);
    
        // Show the result of the difference (negative if clicked before, positive after)
        setTestResult(difference);
    }

    function timeStringToMilliseconds(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const totalMilliseconds = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
        return totalMilliseconds;
    }

    const getEventTimeInMilliseconds = (timeString) => {
        const [hours, minutes, seconds = 0, milliseconds = 0] = timeString.split(':').map(Number);
        const now = new Date();
        const eventDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, seconds, milliseconds);
        return eventDate.getTime();
    };

    // Calculate the time to start defending
    const calculateTimeToSend = () => {
        // Time in milliseconds from user input for defense
        const timeToDefendInMs = timeStringToMilliseconds(timeToDefend);

        // Attack time in milliseconds
        const firstAttackTime = getEventTimeInMilliseconds(attackOne);

        // Calculate the time difference to determine when to start defending
        const timeDifference = firstAttackTime - timeToDefendInMs;

        if (timeDifference >= 0) {
            // Calculate and display the time to start defending
            const defendStartTime = new Date(timeDifference);
            setMustDefendAt(defendStartTime.toLocaleTimeString('en-US', { hour12: false }) + '.' + defendStartTime.getMilliseconds());
        } else {
            setMustDefendAt('Event has already passed or invalid input.');
        }
    };

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
            <Typography variant="h1">
                {time}
            </Typography>
            <TextField
                label="1"
                size='small'
                value={attackOne}
                tabIndex="-1"
                onChange={(event) => handleAttackOneChange(event)}
            />
            <TextField
                label="1"
                size='small'
                value={attackTwo}
                tabIndex="-1"
                onChange={(event) => handleAttackTwoChange(event)}
            />
            <TextField
                label="1"
                size='small'
                value={attackThree}
                tabIndex="-1"
                onChange={(event) => handleAttackThreeChange(event)}
            />
            <TextField
                label="1"
                size='small'
                value={attackFour}
                tabIndex="-1"
                onChange={(event) => handleAttackFourChange(event)}
            />
            <TextField
                label="Time to defend"
                size='small'
                value={timeToDefend}
                tabIndex="-1"
                onChange={(event) => handleTimeToDefendChange(event)}
            />
            <Button
                variant='contained'
                onClick={() => calculateTimeToSend()}>
                Calculate
            </Button>
            <Typography variant="h4">
                Must send at: {mustDefendAt}
            </Typography>
            <Button
                variant='contained'
                onClick={() => testIntercept()}>
                Test
            </Button>
            <Button
                variant='contained'
                onClick={() => reset()}>
                Reset
            </Button>
            <Typography variant="h4">
                {testResult}
            </Typography>
        </Box>
    )
}
