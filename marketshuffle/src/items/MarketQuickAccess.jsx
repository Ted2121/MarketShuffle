import { Box, IconButton } from '@mui/material'
import React from 'react'
import { markets } from '../data/components-text/shoppingStructure'

function MarketQuickAccess() {
    const marketButtons = markets.map(market => (
        market?.image &&
        <IconButton size='small' sx={{
            aspectRatio: 1,
            backgroundColor: 'white.main',
            width: '40px'
        }} key={market.id} onClick={() => handleMarketClick(market)}>
            <img src={market.image} alt={market.name} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} />
        </IconButton>
    ));

    const handleMarketClick = (market) => {
        const section = document.getElementById(market?.name);
        section.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
        }}>
            {marketButtons}
        </Box>
    )
}

export default MarketQuickAccess