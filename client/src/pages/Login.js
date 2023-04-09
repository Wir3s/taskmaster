import React, { useState } from "react";
// import { useMutation } from '@apollo/client';
// import { LOGIN } from '../utils/mutations';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    // const [login, { error, data }] = useMutation(LOGIN);

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
            const { loginData } = await Login({
                variables: { ...formState },
            });

            // Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
        }

        // reset form state after submit
        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <main>
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
                    Submit
                </button>  
            </form> 
        </main>
    )
};

export default Login;