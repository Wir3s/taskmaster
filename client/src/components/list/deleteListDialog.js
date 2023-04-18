import React from "react";
import {
  Box,
  Button,
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
import { REMOVE_LIST } from "../../utils/mutations";
import CloseBTN from "@mui/icons-material/CancelPresentationRounded";

// This creates the delete list Dialog modal
export default function DeleteListDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [removeListId, setListId] = React.useState("");
  const [removeList, { error, loading, refetch }] = useMutation(
    REMOVE_LIST,
    { variables: { removeListId }, refetchQueries: [{ query: GET_ME_LISTS }] }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    //This is the function that is triggered when the user opts to delete a list.
  const DeleteList = async () => {
    if (
      (await document.getElementById("deleteConfirm").value) !== props.listName
    ) {
      document.getElementById("deleteConfirm").value = "";
      document.getElementById("deleteConfirm").placeholder =
        "Name does not match, unable to delete";
      return;
    }

    if (loading) return <p>Deleting the list name...</p>;
    if (error) return <p>Error deleting the lists.</p>;
    setListId(props.listId);
    removeList(removeListId);
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
    <div
      id="deleteListDiv"
      style={{
        display: "flex",
        margin: "1vh",
      }}
    >
      <BootstrapTooltip title="Delete List" placement="top">
        <IconButton variant="outlined" size="small" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </BootstrapTooltip>

      <Dialog open={open} onClose={handleClose}>
        <Box id="modalHeader">
          <DialogTitle>Confirm Task List Delete</DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseBTN />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>
            You are about to delete the task list "{props.listName}". This
            cannot be undone and all tasks and subtasks will also be deleted.
            Please enter the task list name below to confirm deletion.
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
            onClick={DeleteList}
            color="secondary"
            variant="contained"
          >Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
