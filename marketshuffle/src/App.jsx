import { useState } from 'react'
import { Box, Paper, Typography, ThemeProvider, CssBaseline } from "@mui/material"
import { ColorModeContext, useMode } from './theme';
import { Route, Routes } from 'react-router-dom';
import RouteLayout from './shared/routing/RouteLayout';
import Navbar from './shared/layouts/Navbar';
import SimpleShuffle from './simple-shuffle/SimpleShuffle';

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
                <Route path='/' element={<SimpleShuffle />} />
                {/* <Route path='/pricing' element={<PricingPage />} />
                <Route path='/blog' element={<BlogPage />} />  */}
                {/* <Route path='login' element={<LogIn />} />
                  <Route path='signup' element={<SignUp />} />
                  <Route path='server-error' element={<ServerError />} /> */}
                {/* private routes */}
                {/* <Route element={<RequireAuth />}> */}
                {/* <Route path='profile' element={<Profile />} /> */}
                {/* </Route>*/}
              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider >
  )
}

export default App
