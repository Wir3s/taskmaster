import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from '@mui/material/styles';
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { useMutation } from "@apollo/client";
import { UPDATE_LIST } from "../utils/mutations";

export default function UpdateListDialog(props) {
  const [open, setOpen] = React.useState(false);

  // state var for updateListId
  // state var for listName
  const [updateListId, setUpdateListId] = React.useState("");
  const [listName, setListName] = React.useState("");

  const [updateList, { error, loading, data }] = useMutation(UPDATE_LIST, {
    variables: { updateListId, listName },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UpdateList = async () => {
    console.log("in update list");
    //Setting listName for use in mutation
    if ((await document.getElementById("updateListName").value) === "") {
      console.log("setting to placeholder value");
      setListName(document.getElementById("updateListName").placeholder);
    } else {
      setListName(document.getElementById("updateListName").value);
      console.log("setting to  value");
    }
    console.log("list Name after if");
    console.log(listName);

    //Setting userId for use in mutation
    setUpdateListId(props.listId);
    console.log("set all vars for mutation");

    /// THis is where the code is failing
    updateList(updateListId, listName);

    console.log("after mutation");
    if (loading) return <p>Updating the list name ...</p>;
    if (error) return <p>Error updating your lists name.</p>;
    console.log("after ifs");

    handleClose();
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
    <div id="updateListDiv" style={{
      display: 'flex',
      margin: "1vh"
    }}>
      <BootstrapTooltip
      title="Change list name" placement="top-start">
        <IconButton
        variant="text"
        size="small"
        onClick={handleClickOpen}>
          <EditIcon/>
        </IconButton>
      </BootstrapTooltip>

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
