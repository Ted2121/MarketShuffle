import React from 'react';
import { Box } from '@mui/material';
import RecipeNode from './RecipeNode';

function CraftingTree({ recipe }) {

  const renderTree = (recipe) => {
    return Array.isArray(recipe) && recipe.map((item, index) => (
      <Box key={index} sx={{ ml: 6 }}>
        <RecipeNode name={item.name} />
        {item.recipe && renderTree(item.recipe)}
      </Box>
    ));
  };

  return <div>{renderTree(recipe)}</div>;
}

export default CraftingTree;