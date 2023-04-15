import React from "react";
import { Box, Container, Paper } from "@mui/material";

const style = {
  backgroundColor: "WhiteSmoke",
  padding: "1vh",
  marginTop: "10vh",

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
