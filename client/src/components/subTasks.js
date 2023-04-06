import * as React from 'react';
import PropTypes from 'prop-types';
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


//Test Data
function createData(details, priority, taskName, dueDate, assignee, actions) {
  return {
    details,
    priority,
    taskName,
    dueDate,
    assignee,
    actions,
    subTasks: [
      {
        details: '🔍',
        priority: 1,
        taskName: 'Scrub Toliet',
        dueDate: 'Date Due - XX/XX/XXXX',
        assignee: 'Assignee',
        actions: '✓ / 🗑 / 🖫'
      },
      {
        details: '🔍',
        priority: 2,
        taskName: 'Clean Mirror',
        dueDate: 'XX/XX/XXXX',
        assignee: 'Assignee',
        actions: '✓ / 🗑 / 🖫'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="left">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.details}</TableCell>
        <TableCell align="left">{row.priority}</TableCell>
        <TableCell align="left">{row.taskName}</TableCell>
        <TableCell align="left">{row.dueDate}</TableCell>
        <TableCell align="left">{row.assignee}</TableCell>
        <TableCell align="left">{row.actions}</TableCell>
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
                    <TableRow key={subTask.taskName}> {/*This should be updated to the subTask ID*/}
                      <TableCell align="right">{subTask.details}</TableCell>
                      <TableCell align="left">{subTask.priority}</TableCell>
                      <TableCell align="left">{subTask.taskName}</TableCell>
                      <TableCell align="left">{subTask.dueDate}</TableCell>
                      <TableCell align="left">{subTask.assignee}</TableCell>
                      <TableCell align="left">{subTask.actions}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right">+</TableCell>
                    <TableCell align="left">Priority</TableCell>
                    <TableCell align="left">Task Name</TableCell>
                    <TableCell align="left">Due Date</TableCell>
                    <TableCell align="left">Assignee</TableCell>
                    <TableCell align="left">Save Icon</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    details: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    taskName: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    subTasks: PropTypes.arrayOf(
      PropTypes.shape({
        details: PropTypes.string.isRequired,
        priority: PropTypes.number.isRequired,
        taskName: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        assignee: PropTypes.string.isRequired,
        actions: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('🔍', 1, "Clean Bathroom", "Date Due - XX/XX/XXXX", "Assignee", 'Complete / Delete / Save Changes'),
  createData('🔍', 2, "Clean Kitchen", "XX/XX/XXXX", "Assignee", '✓ / 🗑 / 🖫'),
  createData('🔍', 3, "Clean Livingroom", "XX/XX/XXXX", "Assignee", '✓ / 🗑 / 🖫'),
];

export default function subTasks() {
  return (
    <TableContainer component={Paper} contenteditable='true'> {/* This conentedotable tag makes this able to be edited on screen...  */}
      <Table aria-label="collapsible table">
        <TableHead>
          {/* <TableRow>
            <TableCell align="left">Hide / Show Subtasks</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="left">Priority</TableCell>
            <TableCell align="left">Task Name</TableCell>
            <TableCell align="left">Due Date</TableCell>
            <TableCell align="left">Assignee</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.taskName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}