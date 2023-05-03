import React from "react";
import { AppBar, Toolbar, Button, Grid, ButtonGroup } from "@mui/material";
import Auth from "../utils/auth";

export default function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const displayDesktop = () => {
    return (
      <Toolbar
        style={{
          padding: "1vh",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          component="span"
        >
          <Grid item>
            <Button href="/" style={{ margin: 0, padding: 0 }}>
              <img
                src="assets/images/tmlogo.png"
                alt="TaskMaster Logo"
                width="100"
                className="logo"
                style={{
                  paddingTop: "1vh",
                  paddingBottom: "1vh",
                }}
              />
            </Button>
          </Grid>
          <Grid
            item
            style={{
              position: "absolute",
              textAlign: "center",
              width: "100%",
            }}
          >
            <h1 id="taskMasterTitle">TASKMASTER</h1>
          </Grid>

          <Grid item>
            {
              // render logout button if logged in
              Auth.loggedIn() && (
              <ButtonGroup variant="outline"> 
                <Button id="settingsBtn" color="inherit">
                Settings
                </Button>
              
             
                <Button id="headerLogoutBtn" color="inherit" onClick={logout}>
                  Logout
                </Button>
              </ButtonGroup> 
              )
            }
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar color="secondary" position="static">
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
