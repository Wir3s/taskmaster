import React from "react";
import { Link } from "react-router-dom";

import Container from "@mui/material/Container";

const Splash = () => {
    return(
        <main>
            <Container>
                <section>
                    <h1>TaskMaster</h1>
                    <p>Welcome to TaskMaster, the solution to all of life's problems.</p>
                    <p>Long ago, the four filters lived together in harmony. Then, everything changed when the fire filter AI gained sentience and attacked. Only the master filter, controller of all four filters, could stop it. But when the homeowner needed a tasklist the most, the master filter reset to factory settings.</p>
                    <p>A month passed and a few developers created a task application named TaskMaster, and although its ability to create, update, and delete tasks was great, they had a lot to learn before they actually got the tasks done. But I believe TaskMaster can save the world.</p>
                </section>
                <section>
                    <div>
                        <Link to="/login">
                            <button>
                                Login or Signup with us!
                            </button>
                        </Link>
                    </div>
                </section>
            </Container>
        </main>
    );
}

export default Splash;