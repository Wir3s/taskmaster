const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    username: String!
    password: String!
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
    assignees: [User]
    subTasks: [Task]
    createdBy: [User]
    createdAt: String
    dueDate: String
  }

  input TaskInput {
    title: String!
    desc: String
    priority: Int
    complete: Boolean!
    # assignees: [User]
    # subTasks: [Task]
    createdBy: String
    createdAt: String
    dueDate: String
  }

  type List {
    _id: ID
    listName: String!
    tasks: [Task]
    createdBy: String!
    users: [User]
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    me: User
    task(_id: ID!): Task
    tasks: [Task]
    list(_id: ID!): List
    lists: [List]
  }

  type Mutation {
    # USERS:
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    # These need AUTH added
    removeUser(id: ID!): User
    updateUserEmail(id: ID!, email: String!): User
    updateUserUsername(id: ID!, username: String!): User


    # LISTS:
    # createList(listName: String!, createdBy: String): List
    # deleteList

    # TASKS:

    # addTask(input: TaskInput): List
    # addTask(title: String!, desc: String, priority: Int!, complete: Boolean!,
    #  createdAt: String, dueDate: String): List

    # Need:
    # removeUser(password: String!): Auth
    # updateUserEmail(email: String!, password: String!): Auth
    # updateUserUsername(username: String!, password: String!): Auth


    # #  TO DO  deleteTask()
    # #  TO DO   deleteList()
  }
`;

module.exports = typeDefs;
