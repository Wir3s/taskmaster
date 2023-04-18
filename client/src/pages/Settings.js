import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

  //If the users is not logged in it will redirect them to the login page.
const Settings = () => {
    if (!Auth.loggedIn()) {
        return (
            <div>
                {console.log("Not logged in. Redirecting...")}
                <Navigate to='/login' />
            </div>
        )
    }
    return (
        <div>
            <h1>Settings</h1>
        </div>
    )
};

export default Settings;