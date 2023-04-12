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
    username
    _id
  }
}
`;

export const CREATE_LIST = gql `
mutation CreateList($listName: String!) {
  createList(listName: $listName) {
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

