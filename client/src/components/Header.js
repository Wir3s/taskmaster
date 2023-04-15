import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@mui/material";
import Auth from '../utils/auth'

export default function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const displayDesktop = () => {
    return <Toolbar>
      <h1>TASKMASTER </h1>
      
      <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      component="span"
      >
        {
        // render logout button if logged in
        Auth.loggedIn()
        &&  <Button id="headerLogoutBtn" color="inherit" onClick={logout}>
              Logout
            </Button>
        }
      </Grid>
      </Toolbar>;
  };

  return (
    <header>
      <AppBar color="secondary">{displayDesktop()}</AppBar>
    </header>
  );
}
