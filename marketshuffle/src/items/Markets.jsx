import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getAllFavoriteItems } from '../services/itemService';
import Item from './Item';
import { markets } from '../data/components-text/shoppingStructure'

function Markets({ handleSetSelectedItem }) {
  const [itemList, setItemList] = useState([]);
  const [showMarkets, setShowMarkets] = useState(false);

  const handleMarketClick = async () => {
    setShowMarkets((prevState) => !prevState);

    const items = await getAllFavoriteItems();

    setItemList(items);
  }

  const onMarketItemClick = (item) => {
    handleSetSelectedItem(item);
  }

  const marketStructure = () => {
    markets.forEach(market => {
      // Iterate over each category in the current market
      market.categories.forEach(category => {
        const itemsForCategory = itemList.filter(item => item?.category === category.name);

        category.items.push(...itemsForCategory);
      });
    });
    // import market structure js, manipulate the data to add it to the market object, map each market item to marketItem
  }


  const marketItem = (item) => {
    (<Box sx={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%'
    }}>
      <Item item={item} handleSetItem={onMarketItemClick}></Item>
    </Box>
    )

  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'

    }}>
      <Button onClick={handleMarketClick}>
        Markets
      </Button>
      {showMarkets && markets.map(market => (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          mb: 2
        }}
          key={market.id}>
          <Typography variant="h3">{market.name}</Typography>
          {market.categories.map(category => (
            <Box key={category.id} sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              ml: 3
            }}>
              <Typography variant="h4">{category.name}</Typography>
              {category.items.map(item => marketItem(item))}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
}

export default Markets
