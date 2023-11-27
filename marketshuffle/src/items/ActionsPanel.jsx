import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import positions from '../data/mocks/positions-mock';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Profits from './Profits';
import EditPositionModal from './EditPositionModal';
import AddPositionForm from './AddPositionForm';

function ActionsPanel({ item }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [ingredientPrices, setIngredientPrices] = useState({});
  const [totalCost, setTotalPrice] = useState(0);
  const currentUnixTime = Math.floor(Date.now() / 1000);
  const [specialItemDetails, setSpecialItemPosition] = useState('');

  const [profits, setProfits] = useState({
    cheapestPrice: 0,
    goodItemPrice: 0,
    perfectItemPrice: 0,
    specialItemPrice: 0,
  });

  const handlePriceChange = (updatedProfits) => {
    setProfits(updatedProfits);
  };

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

  const handleAddPosition = (itemId, cost, details, currentUnixTime) => {
    console.log(itemId, cost, details, currentUnixTime)
    // TODO call add position request
  }


  const handleSetCurrentPosition = (position) => {
    setCurrentPosition(position);
  }

  const positionList = positions.map((position, index) => (
    <Button
      key={index}
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

  const handleSpecialItemDetailsChange = (event) => {
    const { value } = event.target;

    setSpecialItemPosition(value)
  }

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
          <Typography sx={{ fontSize: '1rem' }}>
            {ingredient.name} -
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {ingredient.quantity}x
          </Typography>
          <TextField
            type="number"
            label="Cost"
            size='small'
            value={costValue}
            onChange={(event) => handleCostChange(index, event)}
          />
          <Typography sx={{ fontSize: '1rem' }}>
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
            flex: 4,
          }}>
            <Typography variant='h4' sx={{
              textAlign: 'center'
            }}>
              {item?.name}
            </Typography>
            <Typography sx={{
              fontSize: '1rem',
            }}>
              Cost: {currentPosition?.cost.toLocaleString()}
            </Typography>
            <Typography sx={{
              fontSize: '1rem',
            }}>
              Date: {currentPosition?.date && formatDate(currentPosition?.date)}
            </Typography>
            <Typography sx={{
              fontSize: '1rem',
            }}>
              Details: {currentPosition?.details}
            </Typography>
            <Box sx={{
              display: 'flex',
              gap: 1,
            }}>
              <Button
                onClick={handleDeletePosition}
                variant='contained'
                color='white'
                sx={{
                  color: 'black.main',
                  mt: 1,
                  maxHeight: '50px'
                }}
              >
                Delete
              </Button>
              <EditPositionModal />
            </Box>
            <Divider sx={{
              mt: 2
            }} />
            {/* Add position */}
            <AddPositionForm itemId={item?.id} handleAddPosition={handleAddPosition} />
          </Card>
          {/* recipe */}
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            gap: 1,
            flex: 6,
          }}>
            {recipe}
            <Typography sx={{ fontSize: '1rem' }}>
              Total: {totalCost.toLocaleString()}
            </Typography>
            <Divider />
            <Box sx={{
              display: 'flex',
              gap: 2
            }}>
              <Profits totalCost={totalCost} onUpdatePrice={handlePriceChange} />
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}>
                <Button
                  onClick={() => handleAddPosition(item?.id, profits.cheapestPrice, "", currentUnixTime)}
                  variant='contained'
                  color='white'
                  sx={{
                    color: 'black.main',
                    maxHeight: '30px'
                  }}
                >
                  Add
                </Button><Button
                  onClick={() => handleAddPosition(item?.id, profits.goodItemPrice, "", currentUnixTime)}
                  variant='contained'
                  color='white'
                  sx={{
                    color: 'black.main',
                    maxHeight: '30px'
                  }}
                >
                  Add
                </Button><Button
                  onClick={() => handleAddPosition(item?.id, profits.perfectItemPrice, "", currentUnixTime)}
                  variant='contained'
                  color='white'
                  sx={{
                    color: 'black.main',
                    maxHeight: '30px'
                  }}
                >
                  Add
                </Button>
                <Button
                  onClick={() => handleAddPosition(item?.id, profits.specialItemPrice, specialItemDetails ?? '', currentUnixTime)}
                  variant='contained'
                  color='white'
                  sx={{
                    color: 'black.main',
                    maxHeight: '30px'
                  }}
                >
                  Add
                </Button>
              </Box>
            </Box>
            <TextField
              label="Details"
              size='small'
              value={specialItemDetails}
              onChange={(event) => handleSpecialItemDetailsChange(event)}
            />
          </Card>
        </Box>
        {/* Add item */}
        <Box sx={{
          display: 'flex',
          flex: 4,
        }}>
        </Box>
      </Box>
    </Box>
  )
}

export default ActionsPanel