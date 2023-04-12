import React, { useState } from "react";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";

import Container from '@mui/material/Container';

import SubTasks from "../components/subTasks"
import TaskList from "../components/taskList"

import ListContext from '../components/listContext';

import ActiveUserContext from '../components/activeUserContext';
import { useQuery } from '@apollo/client';
import { GET_ME_LISTS } from '../utils/queries';


import NewListDialog from '../components/newListDialog'

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
  const [activeUser, setUser] = useState('None');

  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (loading) return <p>Setting Active User...</p>;
  if (error) return <p>Error setting active user</p>;

  const activeUserDetails = data
  if (activeUser === 'None') {
    setUser(activeUserDetails.me._id)
  }
  console.log (activeUserDetails.me._id)
  console.log (activeUserDetails.me.username)
  console.log(activeUser)

  if (!Auth.loggedIn()) {
    return (
      <div>
        {console.log("Not logged in. Redirecting...")}
        <Navigate to='/login' />
      </div>
    )
  }
  return (
    <ActiveUserContext.Provider value={{ activeUser, setUser }}>
    <div>
      <Container>
        <header style={styles.header}>
          <h1>TaskMaster</h1>
          <div>
            <div>Welcome {activeUserDetails.me.username}</div>
            <div>DATE</div>
          </div>
          <div>Settings BTN</div>
        </header>
      </Container>

      <div style={styles.main}>
        <Container >
          <NewListDialog />
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
    </ActiveUserContext.Provider>
  );
};

export default Home;