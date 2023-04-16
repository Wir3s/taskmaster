import React, { useContext } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";

import CloseBTN from "@mui/icons-material/CancelPresentationRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { GET_ME_LISTS } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_TASK } from "../utils/mutations";
import ListContext from "./listContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewTaskModal() {
  const { activeList } = useContext(ListContext);
  const [open, setOpen] = React.useState(false);

  // Use Mutation State Variables
  const [addTaskId, setAddListId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState(5);
  const [desc, setDesc] = React.useState("");
  const [complete, setComplete] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const [AddTask, { error, loading, data, refetch }] = useMutation(ADD_TASK, {
    variables: { title, complete, desc, priority, dueDate, addTaskId },
    refetchQueries: [{ query: GET_ME_LISTS }],
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const update = parseInt(event.target.value);
    setPriority(update);
  };

  
  const AddNewTask = async () => {
    console.log(priority)
    setAddListId(await activeList);
    setTitle(await document.getElementById("taskTitle").value);
    setPriority(parseInt(await priority));
    setDesc(await document.getElementById("taskDescription").value);
    setDueDate(await document.getElementById("taskDueDate").value);
    setComplete(false);

    if (error) return console.log(error);

    console.log(addTaskId);
    console.log(title);
    console.log(priority);
    console.log(desc);
    console.log(dueDate);
    console.log(complete);

    AddTask(title, complete, desc, priority, dueDate, addTaskId);

    handleClose();
    refetch();
  };

  return (
    <div>
      <Button
        color="secondary"
        variant="contained"
        startIcon={<AddCircleOutlineIcon />}
        size="small"
        onClick={handleOpen}
      >
        New Task
      </Button>
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
          <Box sx={style} id="modal">
            <Box id="modalHeader">
            <Typography id="newListModal" variant="h6" component="h2">
              Create a new task
              </Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseBTN />
              </IconButton>
            </Box>
            <Box component="form">
              <InputLabel>Task Title (Required)</InputLabel>
              <TextField
                autoFocus
                required
                id="taskTitle"
                fullWidth
              />
              
                <InputLabel>Priority (Required)</InputLabel>
                <Select
                    id="taskPriority"
                    name="taskPriority"
                    type="number"
                    defaultValue='5'
                    onChange={handleChange}
                    fullWidth
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
              <InputLabel>Due Date</InputLabel>
              <TextField id="taskDueDate" fullWidth />
              <InputLabel>Description</InputLabel>
              <TextField id="taskDescription" fullWidth />
            </Box>
            <Box id="modalFooter">
              <Button sx={{marginTop: 3}}
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >Cancel
              </Button>
              <Button sx={{marginTop: 3}}
                onClick={AddNewTask}
                color="secondary"
                variant="contained">
                Create
                </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
