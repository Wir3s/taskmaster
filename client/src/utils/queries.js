import { gql } from '@apollo/client';

export const GET_LISTS = gql`
query Lists {
  lists {
    _id
    listName
    createdBy
    tasks {
      _id
    }
  }
}
`;

export const GET_LIST = gql `
query List($id: ID!) {
  list(_id: $id) {
    _id
    listName
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

export const GET_TASKS = gql`
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

export const GET_TASK = gql `
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

export const GET_USERS = gql`
query Users {
  users {
    _id
    email
    username
  }
}
`;

export const GET_USER = gql `
query User($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
  }
}
`;

export const QUERY_ME = gql `
query Me {
  me {
    _id
    email
    username
    lists {
      _id
      listName
      createdBy
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
}
`;