import React, { useState } from "react";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

import Container from '@mui/material/Container';

import SubTasks from "../components/subTasks"
import TaskList from "../components/taskList"

import ListContext from '../components/listContext';

import NewListModal from '../components/newListModal'

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
  const [activeList, setData] = useState('default');

  if (!Auth.loggedIn()) {
    return (
      <div>
        {console.log("Not logged in. Redirecting...")}
        <Navigate to='/login' />
      </div>
    )
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
          <NewListModal />
          <h3>Your Task Lists</h3>
          <ListContext.Provider value={{ activeList, setData }}>
            <TaskList />
          </ListContext.Provider>
        </Container>

        <Container>
          <ListContext.Provider value={{ activeList, setData }}>
            <SubTasks />
          </ListContext.Provider>
        </Container>
      </div>
    </div>
  );
};

export default Home;