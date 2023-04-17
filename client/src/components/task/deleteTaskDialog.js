import React from "react";
import {
  Button,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  tooltipClasses,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { GET_ME_LISTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_TASK } from "../../utils/mutations";
import CloseBTN from "@mui/icons-material/CancelPresentationRounded";

export default function DeleteTaskDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [removeTaskId, setTaskId] = React.useState("");
  const [removeTask, { error, loading, refetch }] = useMutation(
    REMOVE_TASK,
    { variables: { removeTaskId }, refetchQueries: [{ query: GET_ME_LISTS }] }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    //This this the function that is triggered when the user opts to remove a task.
  const RemoveTask = async () => {
    if (
      (await document.getElementById("deleteConfirm").value) !== props.taskName
    ) {
      document.getElementById("deleteConfirm").value = "";
      document.getElementById("deleteConfirm").placeholder =
        "Name does not match, unable to delete";
      return;
    }

    if (loading) return <p>Deleting the Task name...</p>;
    if (error) return <p>Error deleting the Task.</p>;
    setTaskId(props.taskId);
    removeTask(removeTaskId);
    handleClose();
    refetch();
  };

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

  return (
    <div>
      <BootstrapTooltip title="Delete Task" placement="top">
        <IconButton variant="outlined" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </BootstrapTooltip>
      <Dialog open={open} onClose={handleClose}>
        <Box id="modalHeader">
          <DialogTitle>Confirm Task Delete</DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseBTN />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>
            You are about to delete the task "{props.taskName}". This cannot be
            undone and all subtasks will also be deleted. Please enter the task
            name below to confirm deletion.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="deleteConfirm"
            placeholder="Confirm Task Name"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions id="modalFooter">
          <Button sx={{ marginBottom: 3 }}
            onClick={handleClose}
            color="secondary"
            variant="contained"
          >Cancel</Button>
          <Button sx={{ marginBottom: 3 }}
            onClick={RemoveTask}
            color="secondary"
            variant="contained"
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
