import React from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import item from '../data/mocks/item-mock';
import RecipeNode from './RecipeNode';

function CraftingTree({ }) {

const data = item.recipe;
  const renderTree = (items) => {
    return Array.isArray(items) && items.map((item, index) => (
      <Box key={index} sx={{ml: 10 }}>
        <RecipeNode name={item.name}/>
        {item.recipe && renderTree(item.recipe)}
      </Box>
    ));
  };

  return <div>{renderTree(data)}</div>;
}

export default CraftingTree;