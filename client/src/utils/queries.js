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
    }
  }
}
`;

export const LIST = gql `
query List($id: ID!) {
  list(_id: $id) {
    _id
    listName
    users {
      _id
      email
      username
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
query Tasks {
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

export const TASK = gql `
query Task($id: ID!) {
  task(_id: $id) {
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

export const USER = gql `
query User($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
    password
  }
}
`;

export const ME = gql `
query ME {
  me {
    _id
    email
    username
    password
  }
}
`;