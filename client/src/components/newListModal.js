import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CloseBTN from '@mui/icons-material/CancelPresentationRounded';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function NewListModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function saveNewList(){
// NEED TO CREATE THE SAVE TASK FUNCTION
    handleClose()
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add a new task list</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="newListModal" variant="h6" component="h2">
            Create a new list<IconButton aria-label="close" onClick={handleClose}>
  <CloseBTN />
</IconButton>
            </Typography>
            
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Name: (Only need to collect this one data point)
            </Typography>
            <Button onClick={saveNewList}>Create new list</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}