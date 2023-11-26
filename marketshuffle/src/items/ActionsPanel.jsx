import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import positions from '../data/mocks/positions-mock';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

function ActionsPanel({ item }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [ingredientPrices, setIngredientPrices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = date.getDate().toString().padStart(2, '0');
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} ${year}`;
  };

  const handleSetCurrentPosition = (position) => {
    setCurrentPosition(position);
  }

  const positionList = positions.map((position) => (
    <Button
      onClick={() => handleSetCurrentPosition(position)}
      sx={{
        color: 'black.main',
        backgroundColor: 'white.main',
        mb: '8px',
        '&:hover': {
          backgroundColor: 'secondary.main',
        },
      }}
    >
      {position.cost.toLocaleString()}
    </Button>
  ))

  const handleCostChange = (index, event) => {
    const { value } = event.target;
    setIngredientPrices(prevState => ({
      ...prevState,
      [index]: value !== '' ? parseInt(value) : '',
    }));
  };

  useEffect(() => {
    let total = 0;
    item?.recipe?.forEach((ingredient, index) => {
      const price = ingredientPrices[index];
      if (!isNaN(price) && !isNaN(ingredient.quantity)) {
        total += price * parseFloat(ingredient.quantity);
      }
    });
    setTotalPrice(total);
  }, [ingredientPrices, item?.recipe]);

  const recipe = item?.recipe?.map((ingredient, index) => {
    const costValue = ingredientPrices[index] !== undefined ? ingredientPrices[index] : '';
  
    return (
      !item || !Array.isArray(item.positions) ? (
        <div key={index}>No positions data available</div>
      ) : (
        <Box 
          key={index}
          sx={{
            gap: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '1.1rem' }}>
            {ingredient.name} -
          </Typography>
          <Typography sx={{ fontSize: '1.1rem' }}>
            {ingredient.quantity}x
          </Typography>
          <TextField
            type="number"
            label="Cost"
            value={costValue}
            onChange={(event) => handleCostChange(index, event)}
          />
          <Typography sx={{ fontSize: '1.1rem' }}>
            = {ingredientPrices[index] && (ingredientPrices[index] * ingredient.quantity).toLocaleString()} k
          </Typography>
        </Box>
      )
    );
  });

  const handleDeletePosition = () => {

  }

  //TODO this one is the real one
  // const positionList = item?.positions.map((position) => (
  //   <Button onClick={handleSetCurrentPosition}
  // sx={{
  //   color:'white.main'
  // }}>
  //   {position.cost.toLocaleString()}
  // </Button>
  // ))

  return (
    // price history
    <Box sx={{
      display: 'flex',
      flex: 70,
      justifyContent: 'space-between',
      p: '16px 0',
      alignItems: 'flex-start',
      ml: 1,
    }}>
      {/* Positions */}
      <Box>
        <Card sx={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {positionList}
        </Card>
      </Box>
      {/* main content */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        width: '100%',
        m: '0 8px',
      }}>
        {/* graph */}
        <Box sx={{
          display: 'flex',
          flex: 1,
        }}>
          <PositionsChart positions={positions} />
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 1,
        }}>
          {/* Position details */}
          <Card sx={{
            p: 1,
            flex: 4
          }}>
            <Box sx={{
              display: 'flex',
              gap: 1,
            }}>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                Cost:
              </Typography>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                {currentPosition?.cost.toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{
              gap: 1,
              display: 'flex',
            }}>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                Date:
              </Typography>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                {currentPosition?.date && formatDate(currentPosition?.date)}
              </Typography>
            </Box>
            <Box sx={{
              gap: 1,
              display: 'flex'
            }}>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                Details:
              </Typography>
              <Typography sx={{
                fontSize: '1.1rem',
              }}>
                {currentPosition?.details}
              </Typography>
            </Box>
            <Button
              onClick={handleDeletePosition}
              variant='contained'
              color='white'
              sx={{
                color: 'black.main',
                mt: 1,
                maxHeight:'50px'
              }}
            >
              Delete position
            </Button>
          </Card>
          {/* recipe */}
          {/* Kitsou hair: 8x [   ]  = x kamas*/}
          {/* x : 18x [   ]  = x kamas*/}
          {/* y: 2x [   ]  = x kamas*/}
          {/* Unmaged Item price: [   ] kamas - Profit: x kamas*/}
          {/* Ok Item price: [   ] kamas - Profit: x kamas */}
          {/* Perfect Item price: [   ] kamas - Profit: x kamas */}
          <Card sx={{
            display: 'flex',
            flexDirection:'column',
            p: 1,
            gap: 1,
            flex: 6,
          }}>
            {recipe}
          </Card>
        </Box>
          {/* Add item */}
          <Box sx={{
            display: 'flex',
            flex: 4,
          }}>
{totalPrice}
          </Box>
      </Box>
    </Box>
  )
}

export default ActionsPanel