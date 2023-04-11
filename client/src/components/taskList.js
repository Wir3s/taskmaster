import React from 'react';
import Container from '@mui/material/Container';

import { useQuery } from '@apollo/client';
import { GET_ME_LISTS } from '../utils/queries';

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

const TaskList = () => {
  const { loading, error, data } = useQuery(GET_ME_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading your tasks list</p>;

  const lists = data?.me.lists;

  console.log("testing")
  console.log(data.me)

  return (
    <Container maxWidth="full">
      {lists.map((list) => (
      <div key={list._id} style={styles.flex}>
        <div>{list.listName}</div>
        <button id={list._id} >🗑</button>
      </div>
      ))}
    </Container>
  );
};

export default TaskList;