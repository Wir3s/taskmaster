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
import EditIcon from "@mui/icons-material/Edit";
import { GET_ME_LISTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_LIST } from "../../utils/mutations";
import CloseBTN from "@mui/icons-material/CancelPresentationRounded";

// This creates the update list Dialog modal
export default function UpdateListDialog(props) {
  const [open, setOpen] = React.useState(false);

  // state var for updateListId
  // state var for listName
  const [updateListId, setUpdateListId] = React.useState("");
  const [listName, setListName] = React.useState("");
  const [updateList, { error, loading, refetch }] = useMutation(
    UPDATE_LIST,
    {
      variables: { updateListId, listName },
      refetchQueries: [{ query: GET_ME_LISTS }],
    }
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    //This is the function that is triggered when the user opts to create the new list.
  const UpdateList = async () => {
    //Setting listName for use in mutation
    if ((await document.getElementById("updateListName").value) === "") {
      setListName(document.getElementById("updateListName").placeholder);
    } else {
      setListName(document.getElementById("updateListName").value);
    }

    //Setting userId for use in mutation
    setUpdateListId(props.listId);

    /// THis is where the code is failing
    updateList(updateListId, listName);

    if (loading) return <p>Updating the list name ...</p>;
    if (error) return <p>Error updating your lists name.</p>;

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
      id="updateListDiv"
      style={{
        display: "flex",
        margin: "1vh",
      }}
    >
      <BootstrapTooltip title="Change list name" placement="top-start">
        <IconButton variant="text" size="small" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </BootstrapTooltip>

      <Dialog open={open} onClose={handleClose}>
        <Box id="modalHeader">
          <DialogTitle>Update List</DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseBTN />
          </IconButton>
        </Box>
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
        <DialogActions id="modalFooter">
          <Button sx={{ marginBottom: 3 }}
            onClick={handleClose}
            color="secondary"
            variant="contained"
          >Cancel</Button>
          <Button sx={{ marginBottom: 3 }}
            onClick={UpdateList}
            color="secondary"
            variant="contained"
          >Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
