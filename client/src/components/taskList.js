import React, { useContext } from "react";
import {
  Grid,
  Container,
  Button,
  ButtonGroup,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { GET_ME_LISTS } from "../utils/queries";
import ListContext from "./context/listContext";
import UpdateListDialog from "./list/updateListDialog";
import DeleteListDialog from "./list/deleteListDialog";

// This controls the gathering and displaying of the lists that the logged in uses has access to.
const TaskList = () => {
  const { activeList, setData } = useContext(ListContext);
  const handleClick = (event) => {
    setData(event.target.dataset.listid);
  };
  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading your tasks list</p>;

  //Setting the active list to the first list from the query
  if (activeList === "default") {
    setData(data.me.lists[0]._id);
  }
  const lists = data?.me.lists;
  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <Container
      id="TasklistSelectionContainer"
      maxWidth="full"
      style={{ padding: 0 }}
    >
      <Grid container>
        {/* This generating the buttons for each of the lists that the use has access to. */}
        {lists.map((list) => (
          <Grid
            item
            id="taskListMap"
            md={4}
            sm={6}
            xs={12}
            key={list._id}
          >
            <ButtonGroup
              size="medium"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <BootstrapTooltip
                id="buttonContainer"
                title="View List"
                placement="top-start"
                style={{
                  display: "flex",
                }}
              >
                <Button
                  id={list.listName}
                  color={list._id === activeList ? "error" : "secondary"}
                  size="small"
                  variant="contained"
                  style={{
                    margin: "1vh",
                    flex: 1,
                  }}
                  data-listid={list._id}
                  onClick={handleClick}
                >
                  {list.listName}
                </Button>
              </BootstrapTooltip>
              <ButtonGroup
                size="medium"
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "center",
                }}
              >
                <UpdateListDialog listId={list._id} listName={list.listName} />
                <DeleteListDialog listId={list._id} listName={list.listName} />
              </ButtonGroup>
            </ButtonGroup>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TaskList;
