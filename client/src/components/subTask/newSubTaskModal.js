import React from "react";
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
import { GET_ME_LISTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { ADD_SUBTASK } from "../../utils/mutations";

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

export default function NewTaskModal(props) {
  const [open, setOpen] = React.useState(false);
  const activeTask = props.subTaskID;
  console.log(activeTask);
  // Use Mutation State Variables
  const [taskId, setTaskId] = React.useState("unset");
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [priority, setPriority] = React.useState(5);
  const [complete, setComplete] = React.useState("");

  if (taskId === "unset") {
    setTaskId(props.subTaskID);
  }

  const [AddSubTask, { error, refetch }] = useMutation(
    ADD_SUBTASK,
    {
      variables: { taskId, title, desc, priority, complete },
      refetchQueries: [{ query: GET_ME_LISTS }],
    }
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const update = parseInt(event.target.value);
    setPriority(update);
  };

  const AddNewSubTask = async () => {
    // NEED TO CREATE THE SAVE TASK FUNCTION
    console.log(activeTask);
    setTaskId(await activeTask);
    console.log(taskId);

    setTitle(await document.getElementById("subTaskTitle").value);
    setPriority(parseInt(await priority));
    setDesc(await document.getElementById("subTaskDescription").value);
    setComplete(false);

    if (error) return console.log(error);

    AddSubTask(taskId, title, desc, priority, complete);

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
        New SubTask
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
                Create a new SubTask
              </Typography>
              <IconButton aria-label="close" onClick={handleClose} id="111111">
                <CloseBTN />
              </IconButton>
            </Box>
            <InputLabel>Task Title (Required)</InputLabel>
            <Box component="form">
              <TextField
                autoFocus
                required
                id="subTaskTitle"
                fullWidth
              />
              <InputLabel>Priority (Required)</InputLabel>
              <Select
                id="subTaskpriority"
                name="subTaskPriority"
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
              <InputLabel>Description</InputLabel>
              <TextField
                id="subTaskDescription"
                fullWidth
              />
            </Box>
            <Box id="modalFooter">
              <Button sx={{ marginTop: 3 }}
                onClick={handleClose}
                color="secondary"
                variant="contained"
              >Cancel</Button>
              <Button sx={{ marginTop: 3 }}
                onClick={AddNewSubTask}
                color="secondary"
                variant="contained"
              >Create</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
