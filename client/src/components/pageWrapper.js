import React from "react";
import { Box, Container, Paper } from "@mui/material";

const style = {
  backgroundColor: "WhiteSmoke",
  marginTop: "2vh",

};

export default function PageWrapper(props) {
  return (
    <Container>
      <Box sx={style}>
        <Paper>{props.children}</Paper>
      </Box>
    </Container>
  );
}
