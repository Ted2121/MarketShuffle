import React, { useEffect, useState } from 'react';
import item from '../data/mocks/item-mock';
import { Box, Checkbox, Typography } from '@mui/material';
import RecipeTier from './RecipeTier';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { v4 as uuidv4 } from 'uuid';

function CraftingTree() {
  const recipe = item.recipe;

  // Generate unique IDs for each node
  const generateNodeIds = (data) => {
    const nodeId = uuidv4();
    if (Array.isArray(data.recipe)) {
      data.recipe.forEach((subItem) => generateNodeIds(subItem));
    }
    return nodeId;
  };

  // Generate IDs for all nodes
  const expandedNodes = recipe.map((item) => generateNodeIds(item));

  const renderTree = (data) => {
    const nodeId = uuidv4();

    return (
      <TreeItem
        key={nodeId}
        nodeId={nodeId}
        label={renderLabel(data)}
      >
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

  return (
    <TreeView
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      defaultExpanded={expandedNodes}
    >
      {recipe.map((item) => renderTree(item))}
    </TreeView>
  );
}

  

export default CraftingTree