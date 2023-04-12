import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useMutation } from '@apollo/client';
import { UPDATE_LIST } from '../utils/mutations';

export default function UpdateListDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateList = () => {
    console.log('in update list');
    //Setting listName for use in mutation
    let listName = ''
    if (document.getElementById('updateListName').value === '' ){
      listName = document.getElementById('updateListName').placeholder
    } else {
      listName = document.getElementById('updateListName').value
    }
    console.log("list Name after if");
    console.log(listName)

    //Setting userId for use in mutation
    const updateListId = props.listId;
    console.log('set all vars for mutation');

    /// THis is where the code is failing
    const { loading, error } = useMutation(UPDATE_LIST, // THIS NEEDS TO BE UPDATED TO THE UPDATE LIST
        { variables: { updateListId, listName } } //UPDATE THESE VARIABLES
      )



    console.log('after mutation');
      if (loading) return <p>Updating the list nam ...</p>;
      if (error) return <p>Error updating your lists name.</p>;
      console.log('after ifs');
    
    handleClose();
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update List Name
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new name for this list.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="updateListName"
            label="List Name"
            type="listName"
            placeholder={props.listName}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={UpdateList}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}