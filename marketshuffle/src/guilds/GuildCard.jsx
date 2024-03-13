import { Box, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function GuildCard({ guild }) {
    const navigate = useNavigate();
    const [difficult, setDifficult] = useState(guild?.difficult)

    const handleGuildClick = () => {
        navigate(`/guild/${guild?.id}`);
    };

    const handleChangeDifficult = () => {

    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}
            onClick={handleGuildClick}>
            <Typography>{guild?.name}</Typography>
            <Typography>{guild?.level}</Typography>
            <Checkbox
                checked={guild?.difficult}
                onChange={handleChangeDifficult}
            />
        </Box>
    )
}

export default GuildCard