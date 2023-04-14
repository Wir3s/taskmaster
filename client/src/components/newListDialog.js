import React, { useContext } from "react";
import {  Button,
          TextField,
          Dialog,
          DialogActions,
          DialogContent,
          DialogContentText,
          DialogTitle,
          Tooltip,
          tooltipClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { useMutation } from "@apollo/client";
import { CREATE_LIST } from "../utils/mutations";

import ActiveUserContext from "./activeUserContext";

export default function FormDialog() {
  const { activeUser } = useContext(ActiveUserContext);
  const [open, setOpen] = React.useState(false);

  const [listName, setListName] = React.useState("");
  const [userId, setUserId] = React.useState("");

  const [createList, { error, loading }] = useMutation(CREATE_LIST, {
    variables: { listName, userId },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CreateNewList = async () => {
    console.log("in create list");
    setListName(await document.getElementById("listName").value);

    setUserId(activeUser);
    console.log("set the vars");

    console.log("after mutation");
    if (loading) return <p>Creating List...</p>;
    if (error) return <p>Error creating your tasks list</p>;
    console.log("after ifs");

    console.log(document.getElementById("listName").value);
    console.log(listName);
    createList(listName, userId);
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
    <div>
      <BootstrapTooltip title="Make a new list" placement="top-start">
        <Button
        color="secondary"
        variant="contained"
        startIcon={<PlaylistAddIcon />}
        size="small"
        onClick={handleClickOpen}>
          Create New List
        </Button>
      </BootstrapTooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name for the new list that you would like to
            create.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="listName"
            label="List Name"
            type="listName"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CreateNewList}>Create New List</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
