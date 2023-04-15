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
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          component="span"
        >
          <Grid item>
            <img
              src="assets/images/tmlogo.png"
              alt="TaskMaster Logo"
              width="100"
              className="logo"
            />
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
      <AppBar color="secondary">{displayDesktop()}</AppBar>
    </header>
  );
}
