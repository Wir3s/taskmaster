import React, { useContext } from 'react';
import {  Container,
          Button,
          ButtonGroup,
          Tooltip,
          tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useQuery } from '@apollo/client';
import { GET_ME_LISTS } from '../utils/queries';

import ListContext from './listContext';

import UpdateListDialog from './updateListDialog';
import DeleteListDialog from './deleteListDialog';

const TaskList = () => {
  const { activeList, setData } = useContext(ListContext);

  const handleClick = (event) => {
    console.log(event.target.dataset.listid);
    setData(event.target.dataset.listid);
  }

  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading your tasks list</p>;

  //Setting the active list to the first list from the query
  //////////////////////// BELOW IF STATEMENT IS THROWING AN ERROR IN CONSOLE ///////////////////////////
  if (activeList === 'default') {
     setData( data.me.lists[0]._id);
  }
  const lists = data?.me.lists;

  console.log("testing")
  console.log(data.me.lists[0]._id)

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
    <Container id="TasklistSelectionContainer"
      maxWidth="full"
      style={{padding: 0}}
    >
      {lists.map((list) => (
        <div id="taskListMap"
        key={list._id}
        >
          <ButtonGroup
          size="medium"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <BootstrapTooltip title="View List" placement="left">
              <Button id={list.listName}
              color="secondary"
              size="large"
              variant="contained"
              data-listid={list._id}
              onClick={handleClick}
              >
                {list.listName}
              </Button>
            </BootstrapTooltip>
            <ButtonGroup
              size="medium"
              style={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
            }}>
              <UpdateListDialog listId={list._id} listName={list.listName}/>
              <DeleteListDialog listId={list._id} listName={list.listName}/>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      ))}
    </Container>
  );
};

export default TaskList;