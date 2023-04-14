import React from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function Header() {
  const displayDesktop = () => {
    return <Toolbar>TASKMASTER</Toolbar>;
  };

  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}
