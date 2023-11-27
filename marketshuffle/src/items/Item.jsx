import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, textFieldClasses } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

function Item({ item, setItem }) {
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite);

  const handleFavoriteToggle = async () => {
    const isSuccess = await itemService.setIsFavorite(item.id, !isFavorite)

    if (isSuccess) {
      setIsFavorite((prevState) => !prevState);
    }
  }

  const handleSetItem = () => {
    setItem(item.id);
  }

  const favoriteButton = (
    <IconButton onClick={handleFavoriteToggle}>
      {isFavorite ? <StarIcon
        sx={{
          color: 'white.main',
          fontSize: '1.7rem',
        }} /> : <StarOutlineIcon />}
    </IconButton>
  )

  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Button 
      onClick={handleSetItem}
      variant='contained' color='white' sx={{
        color:'black.main',
        width:'300px'
      }}>
        {item?.name}
      </Button>
      {favoriteButton}
    </Box>
  )
}

export default Item