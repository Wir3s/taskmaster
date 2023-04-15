import React, { useContext } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import DeleteTaskDialog from "./deleteTaskDialog";
import DeleteSubTaskDialog from "./deleteSubTaskDialog";

import { useQuery } from "@apollo/client";
import { GET_SINGLE_LIST } from "../utils/queries";

import NewTaskModal from "./newTaskModal";
import UpdateTaskModal from "./updateTaskModal";
import NewSubTaskModal from "./newSubTaskModal";
import UpdateSubTaskModal from "./updateSubTaskModal";

import ListContext from "./listContext";

// const headers = [
//   {
//     headerText: "Hide / Show Subtask",
//     headerId: 1,
//   },
//   {
//     headerText: "Details",
//     headerId: 2,
//   },
//   {
//     headerText: "Priority",
//     headerId: 3,
//   },
//   {
//     headerText: "Task Name",
//     headerId: 4,
//   },
//   {
//     headerText: "Due Date",
//     headerId: 5,
//   },
//   {
//     headerText: "Actions",
//     headerId: 6,
//   }
// ]

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
};

export default function SubTasks() {
  const [open, setOpen] = React.useState(false);

  const { activeList, setData } = useContext(ListContext);

  const id = activeList; // This is the list ID
  const { loading, error, data } = useQuery(GET_SINGLE_LIST, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>No List has been select, please choose one from above.</p>;

  const listData = data?.list;

  console.log(listData);

  return (
    <Container>
      <Container>
        <div id="subTaskContainerHeader" style={styles.header}>
          <div
            style={{
              display: "flex",
              flexFlow: "row wrap",
              alignItems: "center",
            }}
          >
            <h2>{listData.listName}</h2>
            {/* <p style={{ margin: "1vh" }}>Task Count</p> */}
          </div>
          <div
            style={{
              display: "flex",
              flexFlow: "row-reverse wrap",
              marginBottom: '2vh'
            }}
          >
            <NewTaskModal />
            {/* <p style={{ margin: "1vh" }}>Toggle Completed Tasks</p> */}
          </div>
        </div>
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* {headers.map((header) => (
              <TableCell key={header.headerId} align="left">{header.headerText}</TableCell>
            ))} */}
              <TableCell align="left"></TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Task Name</TableCell>
              <TableCell align="left">Due Date</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.tasks.map((row) => (
              <React.Fragment key={row._id}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell align="left">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <UpdateTaskModal
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc}
                    />
                  </TableCell>
                  <TableCell align="left">{row.priority}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.dueDate}</TableCell>
                  <TableCell align="center">
                    <DeleteTaskDialog
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Sub-Tasks
                          <NewSubTaskModal subTaskID={row._id} />
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            {row.subTasks.map((subTask) => (
                              <TableRow key={subTask._id}>
                                <TableCell align="right">
                                  <UpdateSubTaskModal
                                    taskID={row._id}
                                    subTaskId={subTask._id}
                                    subTaskName={subTask.title}
                                    subTaskPriority={subTask.priority}
                                    subTaskDueDate={subTask.dueDate}
                                    subTaskDesc={subTask.desc}
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  {subTask.priority}
                                </TableCell>
                                <TableCell align="left">
                                  {subTask.title}
                                </TableCell>
                                <TableCell align="left">
                                  <DeleteSubTaskDialog
                                    subTaskId={subTask._id}
                                    taskId={row._id}
                                    subTaskName={subTask.title}
                                    subTaskPriority={subTask.priority}
                                    subTaskDesc={subTask.desc}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
