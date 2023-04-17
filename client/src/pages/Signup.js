import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    console.log({ data });
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (error) {
      console.error(error);
    }

    setFormState({
      username: "",
      email: "",
      password: "",
    });
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
          <p>Signing up...</p>
        ) : (
          <div style={{
                    display: 'flex',
                    flexFlow: 'column',
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
            
            <form onSubmit={handleFormSubmit} style={{
                        display: 'flex',
                        flexFlow: 'column',
                        alignContent: 'center',
                        alignItems: 'center',
                        gap: '2vh',
                        marginTop: '2vh'
                    }}>
                      <h1>Signup</h1>
              <TextField
                placeholder="Enter username..."
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
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
                style={{ width: '100% '}}
                >Signup
                </Button>
            <Link to="/login"
              style={{
                textDecoration: 'none',
                marginBottom: '2vh'
              }}>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            >Login Here
            </Button>
        </Link>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Signup;
