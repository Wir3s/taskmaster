import { gql } from '@apollo/client';

export const LISTS = gql`
query Lists {
  lists {
    _id
    listName
    createdBy
    users {
      _id
      username
      email
    }
    tasks {
      _id
      title
      desc
      priority
      complete
      createdAt
      dueDate
      subTasks {
        _id
        title
        desc
        priority
        complete
      }
    }
  }
}
`;

export const TASKS = gql`
query Query {
  tasks {
    _id
    title
    desc
    priority
    complete
    createdAt
    dueDate
    subTasks {
      _id
      title
      desc
      priority
      complete
    }
  }
}
`;

export const USERS = gql`
query Users {
  users {
    _id
    email
    username
    password
  }
}
`;