import React, { useContext } from 'react';
import {  Backdrop,
          Box,
          Modal,
          Fade,
          Button,
          Typography,
          IconButton,
          TextField } from '@mui/material';
          
import CloseBTN from '@mui/icons-material/CancelPresentationRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useMutation } from "@apollo/client";
import { ADD_SUBTASK } from "../utils/mutations";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
  const [priority, setPriority] = React.useState("");
  const [complete, setComplete] = React.useState("");

  if (taskId === "unset"){
    setTaskId(props.subTaskID);}

  const [AddSubTask, { error, loading, data }] = useMutation(ADD_SUBTASK, {
    variables: { taskId, title, desc, priority, complete },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const AddNewSubTask = async () => {
    // NEED TO CREATE THE SAVE TASK FUNCTION
    console.log (activeTask);
    setTaskId(await activeTask)
    console.log (taskId)

    setTitle(await document.getElementById("subTaskTitle").value);
    setPriority(parseInt(await document.getElementById("subTaskpriority").value));
    setDesc(await document.getElementById("subTaskDescription").value);
    setComplete(false);

    // if (loading) return <p>Creating Task...</p>;
    if (error) return console.log(error);

    AddSubTask(taskId, title, desc, priority, complete);

    handleClose()
  }

  return (
    <div>
      <Button
      color="secondary"
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      size="small"
      onClick={handleOpen}>
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
          <Box sx={style}>
            <Typography id="newListModal" variant="h6" component="h2">
              Create a new SubTask<IconButton aria-label="close" onClick={handleClose} id='111111'>
                <CloseBTN />
              </IconButton>
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <Box component="form">
                <TextField
                autoFocus
                  required
                  id="subTaskTitle"
                  label="Task Title"
                  fullWidth
                />
                <TextField
                  id="subTaskpriority"
                  label="Priority"
                  type="number"
                  fullWidth
                  // defaultValue={5}
                  inputProps={{ max: 5, min: 1 }}
                />
                <TextField
                  id="subTaskDescription"
                  label="Description"
                  fullWidth
                />
              </Box>
            </Typography>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={AddNewSubTask}>Create</Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}