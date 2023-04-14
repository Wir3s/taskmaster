import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

// Commented portions relate to code that isn't developed yet.
// Might need to change the import name of the LOGIN mutation later.

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
                <div>
                    <h1>Login</h1>
                    <form onSubmit={handleFormSubmit}>
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
                        <button
                            type="submit"
                        >
                            Login
                        </button>  
                    </form>
                </div>
                )}
            </div>
            <div>
                <Link to="/signup">
                    <button>
                        Click here to sign up.
                    </button>
                </Link>
            </div>
        </main>
    )
};

export default Login;