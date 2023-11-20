import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';


function Item({ item }) {
  const actionButton = (action) => (
    <Link to={action} style={{ textDecoration: 'none' }}>
      <Button>{action}</Button>
    </Link>
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{item?.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <Box sx={{
      dislay:'flex',
      gap: '16px'
    }}>
        {actionButton(`/recipe/${item.id}`)} 
        {actionButton(`/history/${item.id}`)} 
        {actionButton(`/profit/${item.id}`)} 
    </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default Item