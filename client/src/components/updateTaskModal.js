import React, { useState } from 'react';
import {    Backdrop,
            Box,
            Modal,
            Fade,
            Button,
            Typography,
            IconButton,
            TextField } from '@mui/material';

import CloseBTN from '@mui/icons-material/CancelPresentationRounded';

import { useMutation } from "@apollo/client";
import { UPDATE_TASK } from "../utils/mutations";

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

export default function UpdateTaskModal(props) {
    const [open, setOpen] = React.useState(false);

    const [updateForm, setUpdateForm] = useState({
        updateTaskId: props.taskId,
        title: props.taskName,
        desc: props.taskDesc,
        priority: props.taskPriority,
        complete: false,
        dueDate: props.taskDueDate
    })

    console.log(updateForm);
    const [updateTask, { error, data, loading }] = useMutation(UPDATE_TASK)
    const mutationResponse = async (event) => {
       await updateTask ({
            variables: {
                updateTaskId: updateForm.updateTaskId,
                title: updateForm.title,
                desc: updateForm.desc,
                priority: ~~updateForm.priority,
                complete: updateForm.complete,
                dueDate: updateForm.dueDate
            }
        })
          window.location.reload(false);
    }
    const handleFormSubmit = (event) => {
        console.log('in handleform submit');
        event.preventDefault();

        console.log (updateForm)
        mutationResponse();
        handleClose()
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUpdateForm({...updateForm,[name]:value,})
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>🔍</Button>
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
                            Update Task - {props.taskName}<IconButton aria-label="close" onClick={handleClose}>
                                <CloseBTN />
                            </IconButton>
                        </Typography>

                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <Box >
                                <form onSubmit={handleFormSubmit}>
                                    <TextField
                                        required
                                        name='title'
                                        id="taskTitle"
                                        label="Task Title"
                                        defaultValue={updateForm.title}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="taskpriority"
                                        name='priority'
                                        label="Priority"
                                        type="number"
                                        inputProps={{ max: 5, min: 1 }}
                                        defaultValue={updateForm.priority}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="taskDueDate"
                                        name='dueDate'
                                        label="Due Date"
                                        defaultValue={updateForm.dueDate}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        id="taskDescription"
                                        name='desc'
                                        label="Description"
                                        defaultValue={updateForm.desc}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <Button type='submit'>Save Changes</Button>
                                </form>
                            </Box>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
