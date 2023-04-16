import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { GET_ME_LISTS } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_SUB_TASK } from "../utils/mutations";
import CloseBTN from "@mui/icons-material/CancelPresentationRounded";

export default function DeleteSubTaskDialog(props) {
  console.log(props);
  const [open, setOpen] = React.useState(false);

  const [subTaskId, setSubTaskId] = React.useState("");
  const [taskId, setTaskId] = React.useState("");

  const [removeSubTask, { error, loading, data, refetch }] = useMutation(
    REMOVE_SUB_TASK,
    {
      variables: { subTaskId, taskId },
      refetchQueries: [{ query: GET_ME_LISTS }],
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const RemoveSubTask = async () => {
    if (
      (await document.getElementById("deleteConfirm").value) !==
      props.subTaskName
    ) {
      document.getElementById("deleteConfirm").value = "";
      document.getElementById("deleteConfirm").placeholder =
        "Name does not match, unable to delete";
      return;
    }

    if (loading) return <p>Deleting the SubTask name...</p>;
    if (error) return <p>Error deleting the SubTask.</p>;
    setSubTaskId(props.subTaskId);
    setTaskId(props.taskId);
    removeSubTask(subTaskId, taskId);

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
        <DialogTitle>Confirm SubTask Delete</DialogTitle>
        <IconButton aria-label="close" onClick={handleClose}>
                <CloseBTN />
              </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>
            You are about to delete the SubTask "{props.subTaskName}". This
            cannot be undone. Please enter the SubTask name below to confirm
            deletion.
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
          <Button sx={{marginBottom: 3}}
          onClick={handleClose}
          color="secondary"
          variant="contained"
          >Cancel</Button>
          <Button sx={{marginBottom: 3}}
          onClick={RemoveSubTask}
          color="secondary"
          variant="contained"
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
