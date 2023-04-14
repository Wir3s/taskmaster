import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';

import DeleteTaskDialog from './deleteTaskDialog'

import { useQuery } from '@apollo/client';
import { GET_SINGLE_LIST } from '../utils/queries';

import NewTaskModal from './newTaskModal';
import UpdateTaskModal from './updateTaskModal';

import ListContext from './listContext';

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
}

export default function SubTasks() {
  const [open, setOpen] = React.useState(false);

  const { activeList, setData } = useContext(ListContext);

  const id = activeList; // This is the list ID
  const { loading, error, data } = useQuery(GET_SINGLE_LIST,
    { variables: { id } }
  )

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const listData = data?.list;

  console.log(listData)

  return (
    <Container>
      <Container>
        <div style={styles.header}>
          <div>
            <h3>{listData.listName}</h3>
            <p>Task Count</p>
          </div>
          <div>
            <NewTaskModal />
            <p>Hide / Show Completed Toggle</p>
          </div>
        </div>
      </Container>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Hide / Show Subtasks</TableCell>
              <TableCell align="left">Details</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Task Name</TableCell>
              <TableCell align="left">Due Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listData.tasks.map((row) => (
              <React.Fragment>
                <TableRow key={row._id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell align="left">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="left">
                    <UpdateTaskModal
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc} /></TableCell>
                  <TableCell align="left">{row.priority}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.dueDate}</TableCell>
                  <TableCell align="left"><DeleteTaskDialog 
                      taskId={row._id}
                      taskName={row.title}
                      taskPriority={row.priority}
                      taskDueDate={row.dueDate}
                      taskDesc={row.desc}/></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Sub-Tasks
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableBody>
                            {row.subTasks.map((subTask) => (
                              <TableRow key={subTask._id}>
                                <TableCell align="right">🔍</TableCell>
                                <TableCell align="left">{subTask.priority}</TableCell>
                                <TableCell align="left">{subTask.title}</TableCell>
                                <TableCell align="left">✓ / 🗑 / 🖫</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell align="right">+</TableCell>
                              <TableCell align="left">Priority</TableCell>
                              <TableCell align="left">Task Name</TableCell>
                              <TableCell align="left">Save Icon</TableCell>
                            </TableRow>
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