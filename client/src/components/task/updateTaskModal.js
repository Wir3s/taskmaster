import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  IconButton,
  TextField,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseBTN from "@mui/icons-material/CancelPresentationRounded";
import { GET_ME_LISTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../../utils/mutations";

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

export default function UpdateTaskModal(props) {
  const [open, setOpen] = React.useState(false);

  const [updateForm, setUpdateForm] = useState({
    updateTaskId: props.taskId,
    title: props.taskName,
    desc: props.taskDesc,
    priority: props.taskPriority,
    complete: false,
    dueDate: props.taskDueDate,
  });

  console.log(updateForm);
  const [updateTask, { refetch }] =
    useMutation(UPDATE_TASK);
  const mutationResponse = async (event) => {
    await updateTask({
      variables: {
        updateTaskId: updateForm.updateTaskId,
        title: updateForm.title,
        desc: updateForm.desc,
        priority: ~~updateForm.priority,
        complete: updateForm.complete,
        dueDate: updateForm.dueDate,
      },
      refetchQueries: [{ query: GET_ME_LISTS }],
    });
    window.location.reload(false);
    refetch();
  };
  const handleFormSubmit = (event) => {
    console.log("in handleform submit");
    event.preventDefault();

    console.log(updateForm);
    mutationResponse();
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <BootstrapTooltip
        id="buttonContainer"
        title="View & Update Details"
        placement="top-start"
        style={{
          display: "flex",
        }}
      >
        <Button onClick={handleOpen} style={{
          minWidth: 0,
        }}>🔍</Button></BootstrapTooltip>
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
                Update Task - {props.taskName}
              </Typography>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseBTN />
              </IconButton>
            </Box>
            <Box>
              <form onSubmit={handleFormSubmit}>
                <InputLabel>Task Title (Required)</InputLabel>
                <TextField
                  required
                  name="title"
                  id="taskTitle"
                  defaultValue={updateForm.title}
                  onChange={handleChange}
                  fullWidth
                />
                <InputLabel>Priority (Required)</InputLabel>
                <Select
                  id="taskpriority"
                  name="priority"
                  value={updateForm.priority}
                  defaultValue={5}
                  type="number"
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
                <TextField
                  id="taskDueDate"
                  name="dueDate"
                  defaultValue={updateForm.dueDate}
                  onChange={handleChange}
                  fullWidth
                />
                <InputLabel>Description</InputLabel>
                <TextField
                  id="taskDescription"
                  name="desc"
                  defaultValue={updateForm.desc}
                  onChange={handleChange}
                  fullWidth
                />
                <Box id="modalFooter">
                  <Button sx={{ marginTop: 3 }}
                    onClick={handleClose}
                    color="secondary"
                    variant="contained"
                  >Cancel
                  </Button>
                  <Button sx={{ marginTop: 3 }}
                    type="submit"
                    color="secondary"
                    variant="contained">Save Changes</Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
