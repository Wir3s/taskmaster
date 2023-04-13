import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const Signup = (props) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

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
          <div>
            <h1>Signup</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                placeholder="Enter username..."
                name="username"
                type="text"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                placeholder="Enter email..."
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                placeholder="Enter password..."
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button type="submit">Signup</button>
            </form>
          </div>
        )}
      </div>
      <div>
        <Link to="/login">
          <button>Back to login.</button>
        </Link>
      </div>
    </main>
  );
};

export default Signup;
