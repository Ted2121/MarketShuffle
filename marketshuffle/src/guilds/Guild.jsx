import { Box } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Guild() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleGuildClick = (guildId) => {
        navigate(`/guild/${guildId}`);
    };

    return (
       <Box>

       </Box>
    )
}

export default Guild