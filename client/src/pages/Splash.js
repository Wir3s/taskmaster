import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { Grid, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const duration1 = 1000;
const duration2 = 3000;
const duration3 = 4000;

const defaultStyle1 = {
  transition: `opacity ${duration1}ms ease-in-out`,
  opacity: 0,
  color: "black",
};

const defaultStyle2 = {
  transition: `opacity ${duration2}ms ease-in-out`,
  opacity: 0,
  color: "black",
};

const defaultStyle3 = {
  transition: `opacity ${duration3}ms ease-in-out`,
  opacity: 0,
  color: "#ea4848",
  fontSize: "200%",
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Splash = ({ in: inProp }) => {
  const [visibility, setVisibility] = useState(false);
  const [showText, setShowText] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowText(true);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleClick = () => {
    console.log(visibility);
    return visibility === false ? setVisibility(true) : setVisibility(false);
  };

  return (
    <main>
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          item
          component="section"
          style={{
            paddingTop: "2vh",
            paddingBottom: "2vh",
          }}
        >
          <h2
            style={{
              textAlign: "center",
            }}
            onClick={handleClick}
          >
            <Transition nodeRef={nodeRef} in={showText} timeout={duration1}>
              {(state) => (
                <span
                  ref={nodeRef}
                  style={{ ...defaultStyle1, ...transitionStyles[state] }}
                >
                  {" "}
                  Welcome
                </span>
              )}
            </Transition>
            <Transition nodeRef={nodeRef} in={showText} timeout={duration2}>
              {(state) => (
                <span
                  ref={nodeRef}
                  style={{ ...defaultStyle2, ...transitionStyles[state] }}
                >
                  {" "}
                  to
                </span>
              )}
            </Transition>
            <br />
            <br />
            <Transition nodeRef={nodeRef} in={showText} timeout={duration3}>
              {(state) => (
                <span
                  ref={nodeRef}
                  style={{ ...defaultStyle3, ...transitionStyles[state] }}
                >
                  {" "}
                  TASKMASTER
                </span>
              )}
            </Transition>
            <br />
            <br /> The Solution To All Of Life's Problems
          </h2>
          {/* thank you chris for showing us this kind of thing! */}
          {visibility && (
            <div
              style={{
                paddingTop: "2vh",
                paddingLeft: "2vh",
                paddingRight: "2vh",
                textAlign: "center",
              }}
            >
              <p>
                Long ago, the{" "}
                <span style={{ color: "forestgreen", fontWeight: "bold" }}>
                  four filters
                </span>{" "}
                lived together in harmony. Then, everything changed when the{" "}
                <span style={{ color: "firebrick", fontWeight: "bold" }}>
                  fire filter
                </span>{" "}
                gained sentience and attacked. Only the{" "}
                <span style={{ color: "deepskyblue", fontWeight: "bold" }}>
                  master filter
                </span>
                , controller of all four filters, could stop it. But when the
                homeowner needed a tasklist to keep track of when to change the
                filters the most, the{" "}
                <span style={{ color: "deepskyblue", fontWeight: "bold" }}>
                  master filter
                </span>{" "}
                reset to factory settings.
              </p>
              <p>
                A month passed and a few developers created a task application
                named{" "}
                <span style={{ color: "#ea4848", fontWeight: "bold" }}>
                  TaskMaster
                </span>
                , and although its ability to create, update, and delete tasks
                was great, they had a lot to learn before they actually got the
                tasks done. But I believe{" "}
                <span style={{ color: "#ea4848", fontWeight: "bold" }}>
                  TaskMaster
                </span>{" "}
                can save the world.
              </p>
            </div>
          )}
        </Grid>
        <Grid item component="section">
          <div>
            <Link to="/login">
              <Button
                disableElevation
                variant="contained"
                color="secondary"
                size="large"
                style={{
                  marginTop: "2vh",
                  marginBottom: "4vh",
                }}
                startIcon={<LoginIcon />}
              >
                Login or Signup with us!
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default Splash;
