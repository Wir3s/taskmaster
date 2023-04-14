import React, { useContext } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CloseBTN from '@mui/icons-material/CancelPresentationRounded';
import IconButton from '@mui/material/IconButton';

import { useMutation } from "@apollo/client";
import { ADD_SUBTASK } from "../utils/mutations";
import TextField from '@mui/material/TextField';
import ListContext from './listContext';

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

  export default function NewSubTaskModal() {
    const { activeTask } = useContext(TaskContext);
    const [open, setOpen] = React.useState(false);

    const [taskId, setTaskId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [complete, setComplete] = React.useState("");

    const [AddSubTask, { error, loading, data }] = useMutation(ADD_SUBTASK, {
        variables: { taskId, title, desc, priority, complete },
      });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const AddNewSubTask = async() => {

    
    setTaskId(await activeTask);
    setTitle(await document.getElementById('') ).value;
    setDesc(await document.getElementById('') ).value;
    setPriority(await document.getElementById('') ).value;
    setComplete(await document.getElementById('') ).value;

    if (error) return console.log(error);

    AddSubTask(taskId, title, desc, priority, complete);

    handleClose()
    }

    return (
        <div>
          <Button onClick={handleOpen}>Create new task</Button>
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
                  Create a new task<IconButton aria-label="close" onClick={handleClose}>
                    <CloseBTN />
                  </IconButton>
                </Typography>
    
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  <Box component="form">
                    <TextField
                    autoFocus
                      required
                      id="taskTitle"
                      label="Task Title"
                      fullWidth
                    />
                    <TextField
                      id="taskpriority"
                      label="Priority"
                      type="number"
                      fullWidth
                      // defaultValue={5}
                      inputProps={{ max: 5, min: 1 }}
                    />
                    <TextField
                      id="taskDueDate"
                      label="Due Date"
                      fullWidth
                    />
                    <TextField
                      id="taskDescription"
                      label="Description"
                      fullWidth
                    />
                  </Box>
                </Typography>
                <Button onClick={AddNewTask}>Create task</Button>
              </Box>
            </Fade>
          </Modal>
        </div>
      );
  }