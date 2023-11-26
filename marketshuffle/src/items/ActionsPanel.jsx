import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'
import PositionsChart from './PositionsChart'
import positions from '../data/mocks/positions-mock';

function ActionsPanel({ item }) {
  const [currentPosition, setCurrentPosition] = useState(null);

  const handleSetCurrentPosition = () => {
    setCurrentPosition()
  }
  const positionList = positions.map((position) => (
    <Button onClick={handleSetCurrentPosition}
    sx={{
      color:'white.main'
    }}>
      {position.cost.toLocaleString()}
    </Button>
  ))

  //TODO this one is the real one
  // const positionList = item?.positions.map((position) => (
  //   <Button onClick={handleSetCurrentPosition}>
  //     {position.cost}
  //   </Button>
  // ))

  return (
    <Box sx={{
      display: 'flex',
      flex: 70,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* price history */}
      <Box sx={{
        display:'flex'
      }}>
        {/* Positions */}
        <Box>
          <Card sx={{
            display:'flex',
            flexDirection:'column',
          }}>
            {positionList}
          </Card>
        </Box>
        {/* Position details */}
        <Box>
          <Card>
            <Box>
              <Typography>
                Cost:
              </Typography>
              <Typography>
                {currentPosition?.cost}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Date:
              </Typography>
              <Typography>
                {currentPosition?.date}
              </Typography>
            </Box>
            <Box>
              <Typography>
                Details:
              </Typography>
              <Typography>
                {currentPosition?.details}
              </Typography>
            </Box>
          </Card>
        </Box>
        {/* graph */}
        <PositionsChart positions={positions} />
        <Box>

        </Box>
      </Box>
      {/* recipe */}
      {/* Kitsou hair: 8x [   ]  = x kamas*/}
      {/* x : 18x [   ]  = x kamas*/}
      {/* y: 2x [   ]  = x kamas*/}
      {/* Unmaged Item price: [   ] kamas - Profit: x kamas*/}
      {/* Ok Item price: [   ] kamas - Profit: x kamas */}
      {/* Perfect Item price: [   ] kamas - Profit: x kamas */}
      <Box>

      </Box>
      {/* Add item */}
      <Box>

      </Box>
    </Box>
  )
}

export default ActionsPanel