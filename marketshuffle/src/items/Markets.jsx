import { Box, Button, Checkbox, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getAllFavoriteItems, updateItem } from '../services/itemService';
import Item from './Item';
import { markets } from '../data/components-text/shoppingStructure';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MarketQuickAccess from './MarketQuickAccess';

function Markets({ handleSetSelectedItem }) {
  const [itemList, setItemList] = useState([]);
  const [showMarkets, setShowMarkets] = useState(false);
  const [orderingLocked, setOrderingLocked] = useState(true);

  const handleOrderingLockToggle = () => {
    setOrderingLocked((prev) => !prev);
  };

  const handleMoveItem = (category, itemId, direction, currentIndex) => {
    const foundCategory = markets.flatMap(market => market.categories).find(cat => cat.name?.toLowerCase() === category.name.toLowerCase());
    const itemIndex = foundCategory.items?.findIndex(item => item.id === itemId);

    if (itemIndex === -1) return; // Item not found

    // Calculate the new index for the item
    let newIndex;
    if (direction === 'up') {
      newIndex = Math.max(0, itemIndex - 1); // Ensure the index doesn't go below 0
    } else if (direction === 'down') {
      newIndex = Math.min(foundCategory.items.length - 1, itemIndex + 1); // Ensure the index doesn't exceed the length of the items array
    } else {
      return; // Invalid direction
    }

    // Remove the item from its current position
    const movedItem = foundCategory.items.splice(itemIndex, 1)[0];
    // Insert the item into the new position
    foundCategory.items.splice(newIndex, 0, movedItem);

    // Update the state to trigger a re-render and reflect the changes in the UI
    setItemList([...itemList]);
  };

  const handleSaveOrder = async () => {
    try {
      // Flatten all items from all categories
      const updatedItems = markets.flatMap((market) =>
        market.categories.flatMap((category) =>
          category.items.map((item, index) => ({
            ...item,
            orderInCategory: index // Update the orderInCategory property
          }))
        )
      );

      // Iterate over each item and send a PUT request to update its order
      await Promise.all(updatedItems.map(async (item) => {
        await updateItem(item); // Send PUT request for the individual item
      }));

      // Optionally, you can handle successful update here (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error updating item order:', error);
    }
  };

  const handleMarketClick = async () => {
    setShowMarkets((prevState) => !prevState);

    const items = await getAllFavoriteItems();
    setItemList(items);

    await marketStructure(items);
  };

  const onMarketItemClick = (item) => {
    handleSetSelectedItem(item);
  };

  const marketStructure = async (items) => {
    await Promise.all(
      markets.map(async (market) => {
        await Promise.all(
          market.categories.map(async (category) => {
            category.items = [];
            const itemsForCategory = items.filter(
              (item) => item?.category.toLowerCase() === category.name.toLowerCase()
            ).sort((a, b) => a.orderInCategory - b.orderInCategory);
            category.items.push(...itemsForCategory);
          })
        );
      })
    );
  };

  const marketItem = (category, item) => (
    <Box
      key={item.id}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        mt: '4px',
        ml: 2
      }}
    >
      {orderingLocked ? null : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconButton size='small' onClick={() => handleMoveItem(category, item.id, 'up')}>
            <ExpandLess />
          </IconButton>
          <IconButton size='small' onClick={() => handleMoveItem(category, item.id, 'down')}>
            <ExpandMore />
          </IconButton>
        </Box>
      )}
      <Checkbox size='large'></Checkbox>
      <Item item={item} handleSetItem={onMarketItemClick} showFavoriteButton={false}></Item>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: '22vw'
      }}
    >
      <Button onClick={handleMarketClick}>Markets</Button>
      <MarketQuickAccess />
      <Box sx={{ textAlign: 'center' }}>
        <Button onClick={handleOrderingLockToggle}>
          {orderingLocked ? 'Unlock Ordering' : 'Lock Ordering'}
        </Button>
        {orderingLocked && (
          <Button onClick={handleSaveOrder} disabled={!orderingLocked}>
            Save Order
          </Button>
        )}
      </Box>
      {showMarkets &&
        markets.map((market) => (
          <Box
            key={market.id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              mb: 2,
            }}
          >
            <Typography id={market?.name} variant="h3">{market?.name}</Typography>
            {market.categories.map((category) => (
              <Box
                key={category.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  ml: 3,
                }}
              >
                <Typography variant="h4">{category.name}</Typography>
                {category.items.map((item) => marketItem(category, item))}
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
}

export default Markets;
