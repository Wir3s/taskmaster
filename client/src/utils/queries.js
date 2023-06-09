import { gql } from '@apollo/client';

export const GET_SINGLE_LIST = gql `
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

export const GET_SINGLE_TASK = gql `
query Task($id: ID!) {
  task(_id: $id) {
    _id
    title
    desc
    priority
    complete
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

export const GET_ME_LISTS = gql `
query Me_List {
  me {
    _id
    email
    username
    lists {
      _id
      listName
      tasks {
        _id
      }
    }
  }
}
`;