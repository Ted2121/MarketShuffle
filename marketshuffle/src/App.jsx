import { useState } from 'react'
import { Box, Paper, Typography, ThemeProvider, CssBaseline } from "@mui/material"
import { ColorModeContext, useMode } from './theme';
import { Route, Routes } from 'react-router-dom';
import RouteLayout from './shared/routing/RouteLayout';
import Navbar from './shared/layouts/Navbar';
import ItemsPage from './items/ItemsPage';
import NewItemsPage from './new-items/NewItemsPage';
import UpdateRecipePage from './items/UpdateRecipePage';
import AllGuildsPage from './guilds/AllGuildsPage';
import Guild from './guilds/Guild';
import AttackInterceptor from './tribal-wars-tools/attack-interceptor';
import TroopDistanceCalculator from './tribal-wars-tools/troop-distance-calculator';
import TwResourceCalculator from './tribal-wars-tools/resource-calculator';
import TwTodoList from './tribal-wars-tools/todo-list';
import TwReports from './tribal-wars-tools/reports';
import TwWarNotes from './tribal-wars-tools/war-notes';
import ScavengeCalculator from './tribal-wars-tools/scavanging';
import RecipeList from './recipe-list/recipe-list';
import SWHeroes from './sw-tools/sw-heroes';
import Crushing from './crushing/crushing';

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
                {/* <Route path='/' element={<TwTodoList />} /> */}
                <Route path='/new' element={<NewItemsPage />} />
                <Route path='/update-recipe' element={<UpdateRecipePage />} />
                {/* <Route path='/guilds' element={<AllGuildsPage />} />
                <Route path='/guild/:id' element={<Guild />} /> */}
                <Route path='/recipe-list' element={<RecipeList />} />
                <Route path='/crushing' element={<Crushing />} />

                {/* Tribal Wars */}
                {/* <Route path='/tw-attack' element={<AttackInterceptor />} />
                <Route path='/tw-distance-calc' element={<TroopDistanceCalculator />} />
                <Route path='/tw-resource-calc' element={<TwResourceCalculator />} />
                <Route path='/tw-todo-list' element={<TwTodoList />} />
                <Route path='/tw-reports' element={<TwReports />} />
                <Route path='/tw-war-notes' element={<TwWarNotes />} />
                <Route path='/tw-scavanging' element={<ScavengeCalculator />} /> */}

                {/* <Route path='/' element={<SWHeroes />} /> */}
              </Route>
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider >
  )
}

export default App
