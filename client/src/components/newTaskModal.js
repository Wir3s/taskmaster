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
import { ADD_TASK } from "../utils/mutations";
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

export default function NewTaskModal() {
  const { activeList } = useContext(ListContext);
  const [open, setOpen] = React.useState(false);

  // let addTaskId = "642f8fdafb864a7af0f13f97"
  // let title = "Hard Code Test"
  // let priority = 1
  // let desc = "Hard Code Desc"
  // let complete = false;
  // let dueDate = '04/21/2023'

  // Use Mutation State Variables
  const [addTaskId, setAddListId] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [complete, setComplete] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  const [AddTask, { error, loading, data }] = useMutation(ADD_TASK, {
    variables: { title, complete, desc, priority, dueDate, addTaskId },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const AddNewTask = async () => {

    // NEED TO CREATE THE SAVE TASK FUNCTION
    setAddListId(await activeList);
    setTitle(await document.getElementById("taskTitle").value);
    setPriority(await document.getElementById("taskpriority").value);
    setDesc(await document.getElementById("taskDescription").value);
    setDueDate(await document.getElementById("taskDueDate").value)
    setComplete(false);

    // if (loading) return <p>Creating Task...</p>;
    if (error) return console.log(error);

    // addTaskId = (await activeList);
    // title = (await document.getElementById("taskTitle").value);
    // priority = (await document.getElementById("taskpriority").value);
    // desc = (await document.getElementById("taskDescription").value);
    // complete = false;
    // DueDate = '04/21/2023'

    // addTaskId = "642f8fdafb864a7af0f13f97"
    // title = "Hard Code Test"
    // priority = 1
    // desc = "Hard Code Desc"
    // complete = false;
    // dueDate = '04/21/2023'

    // console.log(await activeList);
    // console.log(await document.getElementById("taskTitle").value);
    // console.log(await document.getElementById("taskpriority").value);
    // console.log(await document.getElementById("taskDescription").value);

    console.log(addTaskId);
    console.log(title)
    console.log(priority)
    console.log(desc)
    console.log(dueDate)
    console.log(complete)

    AddTask(title, complete, desc, priority, dueDate, addTaskId);

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
                  required
                  id="taskTitle"
                  label="Task Title"
                />
                <TextField
                  id="taskpriority"
                  label="Priority"
                  type="number"
                  // defaultValue={5}
                  inputProps={{ max: 5, min: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="taskDueDate"
                  label="Due Date"
                />
                <TextField
                  id="taskDescription"
                  label="Description"
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