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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteTaskDialog from "./task/deleteTaskDialog";
import DeleteSubTaskDialog from "./subTask/deleteSubTaskDialog";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_LIST } from "../utils/queries";
import NewTaskModal from "./task/newTaskModal";
import UpdateTaskModal from "./task/updateTaskModal";
import NewSubTaskModal from "./subTask/newSubTaskModal";
import UpdateSubTaskModal from "./subTask/updateSubTaskModal";
import ListContext from "./context/listContext";

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

//Definign the color that will be displayed for the priority dot that is rendered on the page.
function renderSubTaskColor(priority) {
    switch (priority) {
      case 4: return "#ffe9ec";
      case 3: return "#ffc8cc";
      case 2: return "#f4918f";
      case 1: return "#eb6564";
      default: return "transparent";
  }
}

//This is the fucntion that controls the tasks and subtasks that are being rendered on the page.
export default function SubTasks() {
  const { activeList } = useContext(ListContext);
  const id = activeList; // This is the list ID
  const { loading, error, data } = useQuery(GET_SINGLE_LIST, {
    variables: { id },
  });
  const listData = data?.list;

   const [open, setOpen] = React.useState(listData && listData.tasks ? listData.tasks.map(() => false) : []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>No List has been select, please choose one from above.</p>;

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
              marginBottom: "2vh",
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
              <TableCell align="left"><strong class="prioLabel">Priority</strong></TableCell>
              <TableCell align="left"><strong>Task Name</strong></TableCell>
              <TableCell align="left" id="dueDateCell1"><strong>Due Date</strong></TableCell>
              <TableCell align="left" id="taskPriorityCell1"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody id="taskTable">
{/* ------------------------ TASK SECTION ------------------------ */}
            {listData.tasks.map((row) => (
              <React.Fragment key={row._id}>
                <TableRow id="rowTaskList" sx={{
                  "& > *": { borderBottom: "unset", }}}>
                  <TableCell id="rowDetail" align="left">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => {
                        const index = listData.tasks.indexOf(row);
                        const newOpen = [...open];
                        newOpen[index] = !newOpen[index];
                        setOpen(newOpen);
                      }}
                    >
                      {open[listData.tasks.indexOf(row)] ? (
                        <KeyboardArrowDownIcon />
                      ) : (
                        <KeyboardArrowRightIcon />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell id="rowPriorityColor taskPriorityCell2" align="left">
                    {row.priority}
                    <span style={{
                      height: '1vh',
                      width: '1vh',
                      backgroundColor: renderSubTaskColor(row.priority),
                      borderRadius: "50%",
                      display: 'inline-block',
                      marginLeft: '1vh'
                    }}></span>
                  </TableCell>
                  <TableCell id="rowTitle" align="left">{row.title}</TableCell>
                  <TableCell id="dueDateCell2" align="left">{row.dueDate}</TableCell>
                  <TableCell id="rowDelete" align="center" style={{
                    padding: 0
                  }}>
                    <DeleteTaskDialog
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc}
                    />
                  </TableCell>
                  <TableCell id="rowInformation" align="center">
                    <UpdateTaskModal
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc}
                      style={{
                        padding: 0
                      }}/>
                  </TableCell>
                </TableRow>
{/* ------------------------ SUBTASK SECTION ------------------------ */}
                <TableRow id="rowSubTaskList">
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={open[listData.tasks.indexOf(row)]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Sub-Tasks
                          <NewSubTaskModal subTaskID={row._id} />
                        </Typography>
                        <Table size="small" aria-label="purchases">
                        <TableHead>
            <TableRow>
              {/* {headers.map((header) => (
              <TableCell key={header.headerId} align="left">{header.headerText}</TableCell>
            ))} */}
              <TableCell align="left" id="taskPriorityCell3"><strong class="prioLabel">Priority</strong></TableCell>
              <TableCell align="left"><strong>Task Name</strong></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
                          <TableBody>
                            {row.subTasks.map((subTask) => (
                              <TableRow key={subTask._id}>
                                <TableCell align="left" id="taskPriorityCell4">
                                  {subTask.priority}
                                  <span style={{
                                    height: '1vh',
                                    width: '1vh',
                                    backgroundColor: renderSubTaskColor(subTask.priority),
                                    borderRadius: "50%",
                                    display: 'inline-block',
                                    marginLeft: '1vh'
                                  }}></span>
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
                                <TableCell align="left">
                                  <UpdateSubTaskModal
                                    taskID={row._id}
                                    subTaskId={subTask._id}
                                    subTaskName={subTask.title}
                                    subTaskPriority={subTask.priority}
                                    subTaskDueDate={subTask.dueDate}
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
