import React from "react";
import { Box, Container, Paper } from "@mui/material";

const style = {
  backgroundColor: "WhiteSmoke",
  margin: "10vh",
  padding: "1vh",
};

export default function PageWrapper(props) {
  console.log(props);
  return (
    <Container>
      <Box sx={style}>
        <Paper>{props.children}</Paper>
      </Box>
    </Container>
  );
}
