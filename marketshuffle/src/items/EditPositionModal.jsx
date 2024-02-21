import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'grey.dark',
  border: '2px solid #8884d3',
  boxShadow: 24,
  p: 4,
  gap: 2,
};

// TODO add a callback that calls the actual edit function in parent component
function EditPositionModal({ handleEditPosition, currentPosition }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newOne, setNewOne] = useState('');
  const [newTen, setNewTen] = useState('');
  const [newHundred, setNewHundred] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const onEditPosition = () => {
    handleEditPosition(newOne, newDetails);
    handleClose();
    resetFields();
  }

  const resetFields = () => {
    setNewOne('');
    setNewDetails('');
  }

  const handleOneChange = (event) => {
    setNewOne(event.target.value);
  };
  const handleTenChange = (event) => {
    setNewTen(event.target.value);
  };
  const handleHundredChange = (event) => {
    setNewHundred(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setNewDetails(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant='contained'
        color='white'
        sx={{
          color: 'black.main',
          mt: 1,
          maxHeight: '50px'
        }}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}

      >
        <Box sx={style}>
          <TextField
            type="number"
            label="One"
            size='small'
            value={newOne}
            placeholder={currentPosition?.one?.toString()}
            onChange={(event) => handleOneChange(event)}
          />
          <TextField
            type="number"
            label="Ten"
            size='small'
            value={newOne}
            placeholder={currentPosition?.ten?.toString()}
            onChange={(event) => handleTenChange(event)}
          />
          <TextField
            type="number"
            label="Hundred"
            size='small'
            value={newOne}
            placeholder={currentPosition?.hundred.toString()}
            onChange={(event) => handleHundredChange(event)}
          />
          <TextField
            label="Details"
            size='small'
            value={newDetails}
            placeholder={currentPosition?.details.toString()}
            onChange={(event) => handleDetailsChange(event)}
          />
          <Button
            onClick={onEditPosition}
            variant='contained'
            color='white'
            sx={{
              color: 'black.main',
              mt: 1,
              maxHeight: '50px'
            }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EditPositionModal