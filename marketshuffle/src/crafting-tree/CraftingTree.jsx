import React from 'react';
import item from '../data/mocks/item-mock';
import { Box } from '@mui/material';
import RecipeTier from './RecipeTier';

function CraftingTree() {

    const recipe = item.recipe;
// console.log(recipe)
    const renderTiers = (data, depth = 0) => {
        console.log(data)
        return (
          <Box key={depth} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.isArray(data) && data.map((item, index) => (
              <React.Fragment key={index}>
                <RecipeTier tierData={data} />
                {item.recipe && renderTiers(item.recipe, depth + 1)}
              </React.Fragment>
            ))}
          </Box>
        );
      };
    
      return <Box>{renderTiers(recipe)}</Box>;
}

export default CraftingTree