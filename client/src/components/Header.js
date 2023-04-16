import React from "react";
import { AppBar, Toolbar, Button, Grid } from "@mui/material";
import Auth from "../utils/auth";

export default function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const displayDesktop = () => {
    return (
      <Toolbar style={{
        padding: '0 1vh 0 1vh'
      }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          component="span"
        >
          <Grid item>
            <Button href="/" style={{margin: 0, padding: 0}}>
                <img
                  src="assets/images/tmlogo.png"
                  alt="TaskMaster Logo"
                  width="100"
                  className="logo"
                  style={{
                    paddingTop: '0.5vh',
                    paddingBottom: '0.5vh',
                  }}
                />
            </Button>
          </Grid>
          <Grid item>
            <h1>TASKMASTER</h1>
          </Grid>
          <Grid item>
            {
              // render logout button if logged in
              Auth.loggedIn() && (
                <Button id="headerLogoutBtn" color="inherit" onClick={logout}>
                  Logout
                </Button>
              )
            }
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar color="secondary" position='static'>{displayDesktop()}</AppBar>
    </header>
  );
}
