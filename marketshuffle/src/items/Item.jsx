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

function Item({ item }) {
  const [isFavorite, setIsFavorite] = useState(item?.isFavorite);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const actionButton = (text, action) => (
    <Link to={action} style={{
      textDecoration: 'none',
      margin: '0 8px'
    }}>
      <Button variant="contained">{text}</Button>
    </Link>
  );

  const handleFavoriteToggle = async () => {
    const isSuccess = await itemService.setIsFavorite(item.id, !isFavorite)

    if (isSuccess) {
      setIsFavorite((prevState) => !prevState);
    }
  }

  const favoriteButton = (
    <IconButton onClick={handleFavoriteToggle}>
      {isFavorite ? <StarIcon
        sx={{
          color: 'black.main',
          fontSize: '1.7rem',
        }} /> : <StarOutlineIcon />}
    </IconButton>
  )

  console.log(item);
  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      <Accordion expanded={expanded === item?.id} onChange={handleChange(item?.id)}>
        <AccordionSummary id={item?.id} expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontSize: '1.2rem' }}>{item?.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex' }}>
            {actionButton('recipe', `recipe/${item.id}`)}
            {actionButton('history', `history/${item.id}`)}
            {actionButton('profit', `profit/${item.id}`)}
          </Box>
        </AccordionDetails>
      </Accordion>
      {favoriteButton}
    </Box>
  )
}

export default Item