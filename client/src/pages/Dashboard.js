import React, { useState } from "react";
import Auth from "../utils/auth";
import { Navigate } from "react-router-dom";
import { Paper, Grid } from "@mui/material";
import SubTasks from "../components/subTasks";
import TaskList from "../components/taskList";
import ListContext from "../components/context/listContext";
import ActiveUserContext from "../components/context/activeUserContext";
import { useQuery } from "@apollo/client";
import { GET_ME_LISTS } from "../utils/queries";
import NewListDialog from "../components/list/newListDialog";

const Dashboard = () => {
  const [activeList, setData] = useState("default");
  const [activeUser, setUser] = useState("None");

  const { loading, error, data } = useQuery(GET_ME_LISTS);

  //If the users is not logged in it will redirect them to the login page.
  if (!Auth.loggedIn()) {
    return (
      <div>
        {console.log("Not logged in. Redirecting...")}
        <Navigate to="/login" />
      </div>
    );
  }

  if (loading) return <p>Setting Active User...</p>;
  if (error) return <p>Error setting active user</p>;

  const activeUserDetails = data;

  if (activeUser === "None") {
    setUser(activeUserDetails.me._id);
  }

  return (
    <ActiveUserContext.Provider value={{ activeUser, setUser }}>
      {/* YOUR TASK LIST */}
      <Grid component="section">
        <Grid id="tasklistHeaderContainer"
        container
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        >
          <Grid item id="taskListHeader"
          style={{
            marginBottom: "3vh",
          }}>
            <h2>Your Task Lists</h2>
          </Grid>
          <Grid item id="taskListDialog"
          style={{
            marginBottom: "1vh"
          }}>
            <NewListDialog />
          </Grid>
        </Grid>
          
        <Paper id="taskPaper"
        elevation={0}
        style={{
          marginLeft: "1vh",
          marginRight: "1vh",
          padding: "2vh"
        }}>
          {/* TASKLIST SELECTION */}
          <Grid id="taskListSelection"
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          >
            <ListContext.Provider value={{ activeList, setData }}>
              <TaskList/>
            </ListContext.Provider>
          </Grid>
        </Paper>
      </Grid>


        {/* TASKLIST DISPLAY */}
        <Grid container id="taskListBox"
        component="section"
        style={{
          paddingBottom: '4vh', paddingTop: '4vh'
        }}>
          <ListContext.Provider value={{ activeList, setData }}>
            <SubTasks />
          </ListContext.Provider>
        </Grid>
          
    </ActiveUserContext.Provider>
  );
};

export default Dashboard;
