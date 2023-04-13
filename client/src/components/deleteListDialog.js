import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useMutation } from '@apollo/client';
import { REMOVE_LIST } from '../utils/mutations';

export default function DeleteListDialog(props) {
    const [open, setOpen] = React.useState(false);

    const [removeListId, setListId] = React.useState('');

    const [removeList, { error, loading, data }] = useMutation(REMOVE_LIST, 
    { variables: { removeListId } } 
)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const DeleteList = async() => {
        console.log('in delete list');

        if (await document.getElementById('deleteConfirm').value !== props.listName) {
            document.getElementById('deleteConfirm').value = ""
            document.getElementById('deleteConfirm').placeholder = "Name does not match, unable to delete"
            return
        } 
            console.log("delete list after if");

            //Setting userId for use in mutation
            console.log(props.listId)

            console.log('set all vars for mutation');

            console.log('after mutation');
            if (loading) return <p>Deleting the list name...</p>;
            if (error) return <p>Error deleting the lists.</p>;
            console.log('after ifs');
            console.log(props.listId)
            setListId (props.listId);
            console.log(removeListId)
            removeList(removeListId)

            handleClose();
       }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                🗑
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Task List Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>You are about to delete the task list "{props.listName}". This cannot be undone and all tasks and subtasks will also be deleted. Please enter the task list name below to confirm deletion.</p>
                        <p id="deleteError"></p>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="deleteConfirm"
                        placeholder='Confirm Task Name'
                        type="name"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={DeleteList}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}