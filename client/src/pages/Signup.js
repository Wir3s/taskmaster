import React, { useState } from "react";
import { useMutation } from '@apollo/client';

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

    return (
        <main>
            <div>
                <h1>Signup</h1>
                <form onSubmit={handleFormSubmit}>
                    <input
                        placeholder="Enter your username..."
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Enter your email..."
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Enter your password..."
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    
                </form>
            </div>
        </main>

    )
};

export default Signup;