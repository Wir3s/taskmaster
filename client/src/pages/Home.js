import React from "react";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

import Container from '@mui/material/Container';

import SubTasks from "../components/subTasks"
import TaskList from "../components/taskList"

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

const Home = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to='/login' />
    // return Navigate('/Login');
  }
  return (
    <div>
      <Container>
        <header style={styles.header}>
          <h1>TaskMaster</h1>
          <div>
            <div>Welcome USERNAME</div>
            <div>DATE</div>
          </div>
          <div>Settings BTN</div>
        </header>
      </Container>

      <div style={styles.main}>
        <Container >
          <button>Add New Task List</button>
          <h3>Your Task Lists</h3>
          <TaskList />
        </Container>

        <Container>
          <SubTasks />
        </Container>
      </div>
    </div>
  );
};

export default Home;