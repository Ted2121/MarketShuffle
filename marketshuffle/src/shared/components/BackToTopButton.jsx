import React from 'react';
import { IconButton, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function BackToTopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Box sx={{
            border: '1px solid white',
            borderRadius: '8px',
            maxWidth: '60px',
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 999,
        }}>
            <IconButton onClick={scrollToTop}>
                <ExpandLessIcon sx={{
                    color: 'white.main',
                    fontSize: '2.5rem'
                }}
                />
            </IconButton>
        </Box>
    )
}

export default BackToTopButton;