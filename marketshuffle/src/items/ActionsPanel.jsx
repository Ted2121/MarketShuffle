import { Box, Button, Card, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
// import positions from '../data/mocks/positions-mock';
import Divider from '@mui/material/Divider';
import EditPositionModal from './EditPositionModal';
import AddPositionForm from './AddPositionForm';
import BackToTopButton from '../shared/components/BackToTopButton';
import GeneralItemActions from './GeneralItemActions';
import RuneActions from './RuneActions';
import MiscActions from './MiscActions';
import CraftingTree from '../crafting-tree/CraftingTree';
import { deleteItemById } from '../services/itemService';
import { createPositionForItem } from '../services/positionsService';

function ActionsPanel({ item }) {
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPosition, setCurrentPosition] = useState(null);
  const isRune = item?.category == "rune"
  const isMisc = item?.category == "misc"
  const isGeneral = !isMisc && !isRune;
  const positions = item?.positions;
console.log()
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

  const handleAddPosition = async (itemId, one, ten, hundred, details, currentUnixTime, positionQuality) => {
    // TODO call add position request
    const itemPositionDto = {
      parentItemId: itemId,
      one: one,
      ten: ten,
      hundred: hundred,
      details: details,
      date: currentUnixTime,
      quality: positionQuality
    }
    
    await createPositionForItem(itemPositionDto);
// call api
  }

  const handleEditPosition = (newCost, newDetails, newQuality) => {
    console.log(currentPosition.id, newCost, newDetails, newQuality);
    //TODO api request with positionId, new cost, new details
  }

  const handleSetCurrentPosition = (position) => {
    setCurrentPosition(position);
  }

  const sortPositions = (sortType) => {
    if (sortBy === sortType) {
      setSortBy(sortType.endsWith('_asc') ? sortType.replace('_asc', '_desc') : sortType.replace('_desc', '_asc'));
    } else {
      setSortBy(sortType);
    }
  };

  const sortIcon = (sortType) => {
    if (sortBy === sortType || sortBy === sortType.replace('_asc', '_desc') || sortBy === sortType.replace('_desc', '_asc')) {
      return sortBy.endsWith('_asc') ? '▲' : '▼';
    }
    return '';
  };

  const sortedPositions = positions && [...positions]?.sort((a, b) => {
    switch (sortBy) {
      case 'date_asc':
        return a.date - b.date;
      case 'date_desc':
        return b.date - a.date;
      case 'cost_asc':
        return a.cost - b.cost;
      case 'cost_desc':
        return b.cost - a.cost;
      default:
        return 0;
    }
  });

  function formatDateWithDays(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const year = date.getFullYear().toString().slice(-2);
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
    const day = date.getDate().toString().padStart(2, '0');

    return `${day} ${month} ${year}`;
  }

  //TODO add filtering for item quality

  const positionList = sortedPositions?.map((position, index) => (
    <Button
      key={index}
      onClick={() => handleSetCurrentPosition(position)}
      sx={{
        color: 'black.main',
        backgroundColor: 'white.main',
        mb: '8px',
        width: '80px',
      }}
    >
      {formatDateWithDays(position.date)} {position.one?.toLocaleString()} {position.ten?.toLocaleString()} {position.hundred?.toLocaleString()}
    </Button>
  ));

  const handleDeletePosition = () => {
    // TODO api call to delete position and then remove the position from the list
  }

  const handleDeleteItem = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {
      await deleteItemById(item?.id);
      window.location.reload();
    } else {
      console.log("Delete action canceled by user.");
    }
  }


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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Button onClick={() => sortPositions('date_asc')}>
              Sort by Date {sortIcon('date_asc')}
            </Button>
            <Button onClick={() => sortPositions('cost_asc')}>
              Sort by Cost {sortIcon('cost_asc')}
            </Button>
            {positionList}
          </Box>
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
          justifyContent: 'flex-end'
        }}>
          <PositionsChart positions={positions} />
        </Box>
        <Box sx={{
          display: 'flex',
          gap: 1,
        }}>
          <Box sx={{
            display: 'flex',
            gap: 1,
            flexDirection: 'column'
          }}>
            {/* Position details */}
            <Card sx={{
              p: 1,
              flex: 4,
            }}>
              {item && (
                <>
                  <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    {item?.name}
                  </Typography>
                  <Button
                    onClick={handleDeleteItem}
                    variant='contained'
                    color='white'
                    sx={{
                      color: 'black.main',
                      mt: 1,
                      maxHeight: '50px'
                    }}
                  >
                    Delete Item
                  </Button>
                </>
              )}
              <Typography sx={{
                fontSize: '1rem',
              }}>
                Cost x1: {currentPosition?.one.toLocaleString()}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
              }}>
                Cost x10: {currentPosition?.ten.toLocaleString()}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
              }}>
                Cost x100: {currentPosition?.hundred.toLocaleString()}
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
                  Delete Position
                </Button>
                {item && <EditPositionModal handleEditPosition={handleEditPosition} currentPosition={currentPosition} />}
              </Box>
              <Divider sx={{
                mt: 2
              }} />
              {/* Add position */}
              {item && <AddPositionForm itemId={item?.id} handleAddPosition={handleAddPosition} />}
            </Card>
            <Card>
              <CraftingTree recipe={item?.recipe} />
            </Card>
          </Box>
          {/* Price Calculations */}
          <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            gap: 1,
            flex: 6,
          }}>
            {isRune && <RuneActions rune={item} />}
            {isGeneral && <GeneralItemActions item={item} handleAddPosition={handleAddPosition} />}
            {isMisc && <MiscActions misc={item} />}
          </Card >
        </Box>
        {/* Back to top */}
        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center'
        }}>
          <BackToTopButton />
        </Box>
      </Box>
    </Box>
  )
}

export default ActionsPanel