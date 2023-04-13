import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { useMutation } from '@apollo/client';
import { REMOVE_TASK } from '../utils/mutations';

export default function DeleteTaskDialog(props) {
    const [open, setOpen] = React.useState(false);

    const [removeTaskId, setTaskId] = React.useState('');

    const [removeTask, { error, loading, data }] = useMutation(REMOVE_TASK, 
        { variables: { removeTaskId } } 
    )

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const RemoveTask = async() => {
        if(await document.getElementById().value !== props.taskName) {
            document.getElementById('deleteConfirm').value = ""
            document.getElementById('deleteConfirm').placeholder = "Name does not match, unable to delete"
            return
        }

        if (loading) return <p>Deleting the Task name...</p>;
        if (error) return <p>Error deleting the Task.</p>;
        setTaskId(props.taskId)
        removeTask(removeTaskId)

        handleClose();
    }

    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: theme.palette.common.black,
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: theme.palette.common.black,
        },
      }));

      return(
        <div>
            <BootstrapTooltip title="Delete Task" placement="right-end">
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            </BootstrapTooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Task Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>You are about to delete the task "{props.taskName}". This cannot be undone and all subtasks will also be deleted. Please enter the task name below to confirm deletion.</p>
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
                    <Button onClick={RemoveTask}>Delete</Button>
                </DialogActions>
            </Dialog>

        </div>
      );
}