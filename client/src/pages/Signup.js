import React from "react";

const Signup = () => {
    return (
        <main>
            <div>
                <h1>Signup</h1>
                <form onSubmit={handleFormSubmit}>
                    <input
                        placeholder="Enter your username..."
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </main>

    )
};

export default Signup;