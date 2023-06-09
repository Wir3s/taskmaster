const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    username: String!
    password: String!
    lists: [List]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Task {
    _id: ID
    title: String!
    desc: String
    priority: Int
    complete: Boolean!
    assignees: [String]
    subTasks: [Subtask]
    createdBy: [User]
    createdAt: String
    dueDate: String
  }

  type Subtask {
    _id: ID
    title: String!
    desc: String
    priority: Int!
    complete: Boolean!
    assignees: String
  }

  type List {
    _id: ID
    listName: String!
    tasks: [Task]
    createdBy: String!
    # users: [User]
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    me: User
    meList(_id:ID!): List
    task(_id: ID!): Task
    tasks: [Task]
    list(_id: ID!): List
    lists: [List]
  }

  type Mutation {
    # USERS:
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, listName: String, title: String): Auth
    removeUser(id: ID!): User
    updateUserEmail(id: ID!, email: String!): User
    updateUserUsername(id: ID!, username: String!): User

    # LISTS:
    createList(listName: String!, id: ID!): List
    removeList(id: ID!): List
    updateList(id: ID!, listName: String!): List

    # TASKS:
    addTask(
      title: String!
      desc: String
      priority: Int
      complete: Boolean!
      dueDate: String
      id: String
    ): Task
    removeTask(id: ID!): Task
    updateTask(
      id: ID!
      title: String
      desc: String
      priority: Int
      complete: Boolean
      dueDate: String
    ): Task

    # SUBTASKS
    addSubTask(
      taskId: ID!
      title: String
      desc: String
      priority: Int
      complete: Boolean
    ): Task
    removeSubTask(
      taskId: ID!
      id: ID!
    ): Task
    updateSubTask(
      taskId: ID!
      id: ID!
      title: String
      desc: String
      priority: Int
      complete: Boolean
    ): Task
  }
`;

module.exports = typeDefs;
