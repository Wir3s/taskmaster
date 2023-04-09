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

     return (
        <div>
            <h1>Login</h1>
        </div>
    )

};

export default Login;