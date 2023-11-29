import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import positions from '../data/mocks/positions-mock';
import Divider from '@mui/material/Divider';
import EditPositionModal from './EditPositionModal';
import AddPositionForm from './AddPositionForm';
import BackToTopButton from '../shared/components/BackToTopButton';
import GeneralItemActions from './GeneralItemActions';

function ActionsPanel({ item }) {
  const [currentPosition, setCurrentPosition] = useState(null);
  
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

  const handleEditPosition = (newCost, newDetails) => {
    console.log(currentPosition.id, newCost, newDetails);
    //TODO api request with positionId, new cost, new details
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
              <EditPositionModal handleEditPosition={handleEditPosition} currentPosition={currentPosition}/>
            </Box>
            <Divider sx={{
              mt: 2
            }} />
            {/* Add position */}
            <AddPositionForm itemId={item?.id} handleAddPosition={handleAddPosition} />
          </Card>
          <GeneralItemActions item={item} handleAddPosition={handleAddPosition}/>
        </Box>
        <Box sx={{
          display:'flex',
          width:'100%',
          justifyContent:'center'
        }}>
        <BackToTopButton />
        </Box>
      </Box>
    </Box>
  )
}

export default ActionsPanel