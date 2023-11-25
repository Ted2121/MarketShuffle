import { Box, Button, Card, Typography } from '@mui/material'
import React, { useState } from 'react'

function ActionsPanel({ item }) {
  const [currentPosition, setCurrentPosition] = useState(null);

  const handleSetCurrentPosition = () => {
    setCurrentPosition()
  }

  const positionList = item?.positions.map((position) => (
    <Button onClick={handleSetCurrentPosition}>
      {position.cost}
    </Button>
  ))

  return (
    <Box sx={{
      display: 'flex',
      flex: 70,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* price history */}
      <Box>
        {/* Positions */}
        <Box>
          <Card>
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