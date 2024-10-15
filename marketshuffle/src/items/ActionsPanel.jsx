import { Box, Button, Card, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import Divider from '@mui/material/Divider';
import EditPositionModal from './EditPositionModal';
import AddPositionForm from './AddPositionForm';
import GeneralItemActions from './GeneralItemActions';
import CraftingTree from '../crafting-tree/CraftingTree';
import { createItem, deleteItemById, getItemByName, updateItem } from '../services/itemService';
import { createPositionForItem, deletePositionById, updatePosition } from '../services/positionsService';
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

  const handleAddPosition = async (itemId, one, ten, hundred, details, currentUnixTime, positionQuality, bought, sold) => {
    let itemPositionDto = {
      parentItemId: itemId,
      one: one ? one : 0,
      ten: ten ? ten : 0,
      hundred: hundred ? hundred : 0,
      details: details,
      date: currentUnixTime,
      quality: positionQuality
    }

    if (bought || sold) {
      itemPositionDto = await formatPositionFromText(bought, sold, details, currentUnixTime);
    }

    if (!itemPositionDto) {
      alert("Position was empty");
    }

    await createPositionForItem(itemPositionDto);
  }

  const formatPositionFromText = async (bought, sold, details, currentUnixTime) => {

    let regex;
    let matches;

    // Check if it's a bought or sold operation
    if (bought) {
      // Example input for bought: "[09:44] 10 x [Agility Scroll] (59,952 kamas)"
      regex = /\[(\d{2}:\d{2})\]\s(\d+)\sx\s\[(.*?)\]\s\(([\d,]+)\skamas\)/;
      matches = bought.match(regex);
    } else if (sold) {
      // Example input for sold: "[09:56] Bank: +7,277 kamas (sale: 1 [Agility Scroll])"
      regex = /\[(\d{2}:\d{2})\]\sBank:\s\+([\d,]+)\skamas\s\(sale:\s(\d+)\s\[(.*?)\]\)/;
      matches = sold.match(regex);
    }

    // Handle invalid text format
    if (!matches) return null;

    // Extract the relevant data depending on bought or sold
    let quantity, price, itemName;

    if (bought) {
      quantity = parseInt(matches[2]);  // e.g., 10
      itemName = matches[3].trim().toLowerCase();  // "Agility Scroll"
      price = parseInt(matches[4].replace(/,/g, ''));  // Remove commas and parse price, e.g., 59952
    } else if (sold) {
      price = parseInt(matches[2].replace(/,/g, ''));  // Remove commas and parse kamas received, e.g., 7277
      quantity = parseInt(matches[3]);  // e.g., 1
      itemName = matches[4].trim().toLowerCase();  // "Agility Scroll"
    }

    const item = await getItemByName(itemName);

    let itemId;

    if (!item?.id) {
      const id = await createItem({
        id: "",
        name: itemName,
        category: "",
        quality: "n",
        isFavorite: false
      })

      itemId = id;
    } else {
      itemId = item?.id;
    }

    // Step 2: Determine whether to add price to 'one', 'ten', or 'hundred'
    let one = 0, ten = 0, hundred = 0;

    if (quantity === 1) {
      one = price;
    } else if (quantity === 10) {
      ten = Math.floor(price / 10);  // Round down to the nearest integer
    } else if (quantity === 100) {
      hundred = Math.floor(price / 100);  // Round down to the nearest integer
    }

    // Step 3: Return the formatted itemPositionDto
    const itemPositionDto = {
      parentItemId: itemId,  // Make sure this is passed or accessible
      one: one,
      ten: ten,
      hundred: hundred,
      details: details,  // Using itemName as details, adjust as needed
      date: currentUnixTime,  // Ensure this is passed or available
      quality: bought ? "b" : "s",  // Ensure this is passed or available
    };

    console.log(itemPositionDto)
    return itemPositionDto;
  }

  const handleEditPosition = async (newOne, newTen, newHundred, newDetails, newQuality) => {
    const positionToEdit = {
      id: currentPosition?.id,
      details: newDetails ? newDetails : currentPosition?.details,
      quality: newQuality ? newQuality : currentPosition?.quality,
      one: newOne ? newOne : currentPosition?.one,
      ten: newTen ? newTen : currentPosition?.ten,
      hundred: newHundred ? newHunddred : currentPosition?.hundred,
    }

    await updatePosition(positionToEdit);
  }

  const handleEditItem = async (newName, newCategory, newBuyAt, newSellAt, newFavorite, newProfession, newUseFor) => {
    const itemToEdit = {
      id: item?.id,
      name: newName ? newName : item?.name,
      category: newCategory ? newCategory : item?.category,
      buy: newBuyAt ? newBuyAt : item?.buy,
      sell: newSellAt ? newSellAt : item?.sell,
      isFavorite: newFavorite ? newFavorite : item?.isFavorite,
      recipe: item?.recipe,
      positions: item?.positions,
      profession: newProfession ? newProfession : item?.newProfession,
      useFor: newUseFor ? newUseFor : item?.newUseFor,
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
                <Box id="actions-panel" sx={{
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
                  <Typography variant='h4' sx={{ textAlign: 'center' }}>
                    Use for: {item?.useFor?.toLocaleString()}
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
        </Box>
      </Box>
    </Box>
  )
}

export default ActionsPanel