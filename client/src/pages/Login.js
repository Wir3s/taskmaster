import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { data }] = useMutation(LOGIN);

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // update form state
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      if (error.message.includes("No user with this email")) {
        setErrorMessage("The email address you entered is not registered.");
      } else if (error.message.includes("Incorrect password")) {
        setErrorMessage("The password is incorrect");
      } else {
        setErrorMessage("An error occurred while logging in. Please try again.");
      }
      setOpen(true);
    }

    // reset form state after submit
    setFormState({
      email: "",
      password: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (Auth.loggedIn()) {
    return (
      <div>
        {console.log("Already logged in. Redirecting...")}
        <Navigate to="/dashboard" />
      </div>
    );
  }
  return (
    <main>
      <div>
        {data ? (
          <Navigate to="/dashboard" />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <form
              onSubmit={handleFormSubmit}
              style={{
                display: "flex",
                flexFlow: "column",
                alignContent: "center",
                alignItems: "center",
                gap: "2vh",
                marginTop: "2vh",
              }}
            >
              <h1>Login</h1>
              <TextField
                placeholder="Enter email..."
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <TextField
                placeholder="Enter password..."
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                size="large"
                style={{
                  width: "100%",
                }}
              >
                Submit
              </Button>
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  marginBottom: "2vh",
                }}
              >
                <Button variant="outlined" color="secondary" size="small">
                  Signup here
                </Button>
              </Link>
            </form>
          </div>

        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="ErrorModal" variant="h6" component="h2" sx={{ mb: 2 }}>
            Something went wrong -
          </Typography>
          <Typography id="ErrorModalMessage" sx={{ mb: 2 }}>
            {errorMessage}
            {errorMessage.includes("is not registered") && (
            <Button component="a" href="/signup" variant="outlined" color="secondary" size="small">
              Sign Up
            </Button>
          )}
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </main>

    
  );
};

export default Login;
