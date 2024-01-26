import React from 'react';
import item from '../data/mocks/item-mock';
import { Box, Checkbox, Typography } from '@mui/material';
import RecipeTier from './RecipeTier';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { v4 as uuidv4 } from 'uuid';

function CraftingTree() {
    const recipe = item.recipe;
  
    const renderTree = (data) => {
      const nodeId = uuidv4();
      return (
        <TreeItem key={nodeId} nodeId={nodeId} label={renderLabel(data)}>
          {Array.isArray(data.recipe) ? data.recipe.map((subItem) => renderTree(subItem)) : null}
        </TreeItem>
      );
    };
  
    const renderLabel = (data) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '1.5rem', marginRight: 1 }}>{data.name}:</Typography>
        <Checkbox size="large" />
      </Box>
    );
  
    // Create a root node with a label for the entire tree
    const rootNode = (
      <TreeItem key="root" nodeId="root" label={<Typography variant="h5">Crafting Recipes:</Typography>}>
        {recipe.map((item) => renderTree(item))}
      </TreeItem>
    );
  
    return (
      <TreeView sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
        {rootNode}
      </TreeView>
    );
  }
  
  
  

export default CraftingTree