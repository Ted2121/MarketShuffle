import { Box, Button, Card, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import Divider from '@mui/material/Divider';
import EditPositionModal from './EditPositionModal';
import AddPositionForm from './AddPositionForm';
import BackToTopButton from '../shared/components/BackToTopButton';
import GeneralItemActions from './GeneralItemActions';
import RuneActions from './RuneActions';
import MiscActions from './MiscActions';
import CraftingTree from '../crafting-tree/CraftingTree';
import { deleteItemById, updateItem } from '../services/itemService';
import { createPositionForItem, deletePositionById } from '../services/positionsService';
import EditItemModal from './EditItemModal';

function ActionsPanel({ item, handleResetPosition }) {
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPosition, setCurrentPosition] = useState(null);
  // const isRune = item?.category == "rune"
  // const isMisc = item?.category == "misc"
  // const isGeneral = !isMisc && !isRune;
  const positions = item?.positions;
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
    const itemPositionDto = {
      parentItemId: itemId,
      one: one ? one : 0,
      ten: ten ? ten : 0,
      hundred: hundred ? hundred : 0,
      details: details,
      date: currentUnixTime,
      quality: positionQuality
    }
    await createPositionForItem(itemPositionDto);
  }

  const handleEditPosition = (newCost, newDetails, newQuality) => {
    //TODO api request with positionId, new cost, new details
  }

  const handleEditItem = async (newName, newCategory, newBuyAt, newSellAt, newFavorite) => {
    const itemToEdit = {
      id: item?.id,
      name: newName ? newName : item?.name,
      category: newCategory ? newCategory : item?.category,
      buy: newBuyAt ? newBuyAt : item?.buy,
      sell: newSellAt ? newSellAt : item?.sell,
      isFavorite: newFavorite ? newFavorite : item?.isFavorite,
      recipe: item?.recipe,
      positions: item?.positions
    }

    await updateItem(itemToEdit);
  }

  const onResetPosition = () => {
    handleResetPosition(item);
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

  const handleDeletePosition = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this position?");

    if (isConfirmed) {
      await deletePositionById(currentPosition?.id);
    }
  }

  const handleDeleteItem = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (isConfirmed) {
      await deleteItemById(item?.id);
      window.location.reload();
    } else {
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
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    {item?.name}
                  </Typography>
                  <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Buy at: {item?.buy?.toLocaleString()}
                  </Typography>
                  <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Sell at: {item?.sell?.toLocaleString()}
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
                  {item && <EditItemModal handleEditItem={handleEditItem} currentItem={item} />}
                </Box>
              )}
              <Typography sx={{
                fontSize: '1rem',
              }}>
                x1 Cost : {currentPosition?.one.toLocaleString()}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
              }}>
                x10 Cost : {currentPosition?.ten.toLocaleString()}
              </Typography>
              <Typography sx={{
                fontSize: '1rem',
              }}>
                x100 Cost : {currentPosition?.hundred.toLocaleString()}
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
              <Typography sx={{
                fontSize: '1rem',
              }}>
                Quality: {currentPosition?.quality}
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
                <Button
                  onClick={onResetPosition}
                  variant='contained'
                  color='white'
                  sx={{
                    color: 'black.main',
                    mt: 1,
                    maxHeight: '50px'
                  }}
                >
                  Reset Position
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
            {/* {isRune && <RuneActions rune={item} />} */}
            <GeneralItemActions item={item} handleAddPosition={handleAddPosition} />
            {/* {isMisc && <MiscActions misc={item} />} */}
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