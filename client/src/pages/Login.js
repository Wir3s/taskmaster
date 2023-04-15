import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error, data }] = useMutation(LOGIN);

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
        }

        // reset form state after submit
        setFormState({
            email: '',
            password: '',
        });
    };

    if (Auth.loggedIn()) {
        return (
            <div>
                {console.log("Already logged in. Redirecting...")}
                <Navigate to="/dashboard" />
            </div>
        )
    }
    return (
        <main>
            <div>
                { data
                ? (
                    <Navigate to="/dashboard" />
                )
                : (
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
                                width: '100%'
                            }}
                        >
                            Submit
                        </Button>
                        <Link to="/signup"
                        style={{
                            textDecoration: 'none',
                            marginBottom: '2vh'
                        }}>
                            <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            >
                                Signup here
                            </Button>
                        </Link>
                    </form>
                </div>
                )}
            </div>
        </main>
    )
};

export default Login;