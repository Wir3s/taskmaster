import React, { useState } from "react";
// import { useMutation } from '@apollo/client';
import { Link, Navigate } from 'react-router-dom';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    // const [addUser, {error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // const { data } = await addUser({
            //     variables: { ...formState },
            // });

            // Auth.login(data.addUser.token);
        } catch (err) {
            console.log(err)
        }
    }

    if (Auth.loggedIn()) {
        return <Navigate to='/home' />
    }

    return (
        <main>
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
                    <button
                        type="submit"
                    >
                        Signup
                    </button>
                </form>
            </div>
            <div>
                <Link to="/login">
                    <button>
                        Back to login.
                    </button>
                </Link>
            </div>
        </main>

    )
};

export default Signup;