import { Box, Button, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';
import { getAllFavoriteItems } from '../services/itemService';
import Item from './Item';
import { markets } from '../data/components-text/shoppingStructure';

function Markets({ handleSetSelectedItem }) {
  const [itemList, setItemList] = useState([]);
  const [showMarkets, setShowMarkets] = useState(false);

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
            const itemsForCategory = items.filter(
              (item) => item?.category.toLowerCase() === category.name.toLowerCase()
            );
            category.items.push(...itemsForCategory);
          })
        );
      })
    );
  };

  const marketItem = (item) => (
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
      }}
    >
      <Button onClick={handleMarketClick}>Markets</Button>
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
            <Typography variant="h3">{market.name}</Typography>
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
                {category.items.map((item) => marketItem(item))}
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
}

export default Markets;
