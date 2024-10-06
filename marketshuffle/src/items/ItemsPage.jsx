import { Box } from '@mui/material'
import React, { useState } from 'react'
import Favorites from './Favorites'
import ItemTable from './ItemTable'
import ActionsPanel from './ActionsPanel'
import { getRecipeByParentId } from '../services/recipeService'
import { getAllPositionsByItemId } from '../services/positionsService'
import Markets from './Markets'
import BackToTopButton from '../shared/components/BackToTopButton'

function ItemsPage() {
  const [selectedItem, setSelectedItem] = useState();
  const actionsPanel = document.getElementById('actions-panel');


  const onHandleResetPosition = (item) => {
    handleSetSelectedItem(item);
  }

  const handleSetSelectedItem = async (item) => {
    const { recipe } = await getRecipeByParentId(item.id);
    const positions = await getAllPositionsByItemId(item.id);
    item.recipe = recipe;
    item.positions = positions;
    setSelectedItem(item);
    actionsPanel?.scrollIntoView({ behavior: 'smooth' });
  }
  // TODO call the get all favorites in a useEffect and pass it to favorites component
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* <Favorites /> */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'auto',
        p: '32px',
      }}>
        <Markets handleSetSelectedItem={handleSetSelectedItem}></Markets>
        <ActionsPanel item={selectedItem} handleResetPosition={onHandleResetPosition} />
        <ItemTable handleSetSelectedItem={handleSetSelectedItem} />

      </Box>
      <BackToTopButton />

    </Box>
  )
}

export default ItemsPage;