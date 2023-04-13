import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      username
    }
    token
  }
}
`;

export const ADD_USER = gql `
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      email
      username
    }
    token
  }
}
`;

export const REMOVE_USER = gql `
mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    _id
    email
    username
  }
}
`;

export const UPDATE_USER_EMAIL =gql `
mutation UpdateUserEmail($updateUserEmailId: ID!, $email: String!) {
  updateUserEmail(id: $updateUserEmailId, email: $email) {
    _id
    email
  }
}
`;

export const UPDATE_USERNAME =gql `
mutation UpdateUserUsername($updateUserUsernameId: ID!, $username: String!) {
  updateUserUsername(id: $updateUserUsernameId, username: $username) {
    _id
    username
  }
}
`;

export const CREATE_LIST = gql `
mutation CreateList($listName: String!, $userId: ID!) {
  createList(listName: $listName, id: $userId) {
    _id
    listName
  }
}
`;

export const REMOVE_LIST = gql `
mutation RemoveList($removeListId: ID!) {
  removeList(id: $removeListId) {
    _id
    listName
  }
}
`;

export const UPDATE_LIST = gql `
mutation UpdateList($updateListId: ID!, $listName: String!) {
  updateList(id: $updateListId, listName: $listName) {
    _id
    listName
  }
}
`;

export const ADD_TASK = gql`
mutation AddTask($title: String!, $complete: Boolean!, $desc: String, $priority: Int, $dueDate: String, $addTaskId: String) {
  addTask(title: $title, complete: $complete, desc: $desc, priority: $priority, dueDate: $dueDate, id: $addTaskId) {
    title
    _id
    priority
    dueDate
    desc
    complete
  }
}
`;

export const ADD_SUBTASK = gql `
mutation AddSubTask($taskId: ID!, $title: String, $desc: String, $priority: Int, $complete: Boolean) {
  addSubTask(taskId: $taskId, title: $title, desc: $desc, priority: $priority, complete: $complete) {
    _id
    title
  }
}
`;

export const REMOVE_TASK = gql `
mutation RemoveTask($removeTaskId: ID!) {
  removeTask(id: $removeTaskId) {
    _id
    title
  }
}
`;

export const REMOVE_SUB_TASK = gql `
mutation RemoveSubTask($taskId: ID!, $subTaskId: ID!) {
  removeSubTask(taskId: $taskId, id: $subTaskId) {
    subTasks {
      _id
      title
    }
  }
}
`;

export const UPDATE_TASK = gql `
mutation UpdateTask($updateTaskId: ID!, $title: String, $desc: String, $priority: Int, $complete: Boolean, $dueDate: String) {
  updateTask(id: $updateTaskId, title: $title, desc: $desc, priority: $priority, complete: $complete, dueDate: $dueDate) {
    _id
    title
  }
}
`;

export const UPDATE_SUB_TASK =gql `
mutation UpdateSubTask($taskId: ID!, $subTaskId: ID!, $title: String, $desc: String, $priority: Int, $complete: Boolean) {
  updateSubTask(taskId: $taskId, id: $subTaskId, title: $title, desc: $desc, priority: $priority, complete: $complete) {
    _id
    title
  }
}
`;