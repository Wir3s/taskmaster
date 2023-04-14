import React, { useContext } from 'react';
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
import ListContext from './listContext';

import CompletedSwitch from './completedSwitch';

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
    console.log(props);
    const { activeList } = useContext(ListContext);
    const [open, setOpen] = React.useState(false);

    //State Change Variables for textfeilds in modal
    const [modalTitle, setModalTitle] = React.useState('initValue');
    const [modalPriority, setModalPriority] = React.useState("initValue");
    const [modalDueDate, setModalDueDate] = React.useState("initValue");
    const [modalDesc, setModalDesc] = React.useState("initValue");
    
    //Updating settings based on clicked modal
    if (modalTitle === 'initValue'){
        setModalTitle(props.taskName);
        setModalPriority(props.taskPriority);
        setModalDueDate(props.taskDueDate);
        setModalDesc(props.taskDesc);
    };


    // Use Mutation State Variables
    const [updateTaskId, setUpdateTaskId] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [complete, setComplete] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");

    const [UpdateTask, { error, loading, data }] = useMutation(UPDATE_TASK, {
        variables: { updateTaskId, title, desc, priority, complete, dueDate },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const UpdateNewTask = async () => {

        // NEED TO CREATE THE SAVE TASK FUNCTION
        setUpdateTaskId( props.taskId );
        setTitle( modalTitle );
        setPriority(modalPriority);
        setDesc(modalDesc);
        setDueDate(modalDueDate)
        setComplete(false);

        // if (loading) return <p>Creating Task...</p>;
        if (error) return console.log(error);

        console.log("Values before running UpdateTask mutation");
        console.log(updateTaskId);
        console.log(title);
        console.log(desc);
        console.log(priority);
        console.log(complete);
        console.log(dueDate);

        UpdateTask(updateTaskId, title, desc, priority, complete, dueDate);

        handleClose()
    }

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
                            <Box component="form">
                                <TextField
                                    required
                                    id="taskTitle"
                                    label="Task Title"
                                    value={modalTitle}
                                    onChange={(e)=> {setModalTitle(e.target.value) }}
                                    fullWidth
                                />
                                <TextField
                                    id="taskpriority"
                                    label="Priority"
                                    type="number"                                    
                                    inputProps={{ max: 5, min: 1 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={modalPriority}
                                    onChange={(e)=> {setModalPriority(e.target.value) }}
                                    fullWidth
                                />
                                <TextField
                                    id="taskDueDate"
                                    label="Due Date"
                                    value={modalDueDate}
                                    onChange={(e)=> {setModalDueDate(e.target.value) }}
                                    fullWidth
                                />
                                <TextField
                                    id="taskDescription"
                                    label="Description"
                                    value={modalDesc}
                                    onChange={(e)=> {setModalDesc(e.target.value) }}
                                    fullWidth
                                />
                            </Box>
                        </Typography>
                        <Button onClick={UpdateNewTask}>Save Changes</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
