import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import Auth from '../utils/auth'

export default function Header() {
    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const displayDesktop = () => {
    return <Toolbar>TASKMASTER      
      <span>{Auth.loggedIn() ? ( 
        <Button onClick={logout} color="error">Logout</Button>
      ) : (
        <h5>Login</h5>
        
      )}</span>
      </Toolbar>;
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>

    </header>
  );
}
