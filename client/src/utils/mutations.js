import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      username
    }
  }
}
`;

export const ADD_USER = gql `
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
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

