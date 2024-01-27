import { useState } from 'react'
import { Box, Paper, Typography, ThemeProvider, CssBaseline } from "@mui/material"
import { ColorModeContext, useMode } from './theme';
import { Route, Routes } from 'react-router-dom';
import RouteLayout from './shared/routing/RouteLayout';
import Navbar from './shared/layouts/Navbar';
import ItemsPage from './items/ItemsPage';
import NewItemsPage from './new-items/NewItemsPage';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'auto', height: 'auto' }}>
          <Navbar />
          <Box
            className='main'
            sx={{
              display: 'flex',
              flex: 1,
              minHeight: '100%',
              minWidth: '100%',
              justifyContent: 'center',
              overflow: 'auto',
              height: 'auto'
            }}>
            <Routes>
              <Route path='/' element={<RouteLayout />}>
                {/* public routes */}
                <Route path='/' element={<ItemsPage />} />
                <Route path='/new' element={<NewItemsPage />} />
              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider >
  )
}

export default App
