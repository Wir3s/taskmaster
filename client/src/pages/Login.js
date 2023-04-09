import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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
        <div>
            <h1>Login</h1>
        </div>
    )

};

export default Login;