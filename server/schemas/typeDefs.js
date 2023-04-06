const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User {
    _id: ID
    email: String!
    username: String!
    password: String!
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
    createdAt: Date
    dueDate: Date
}

type List {
    _id: ID
    listName: String!
    tasks: [Task]
    createdBy: [User]
    users: [User]
}



type Query {
    user(username: String, email: String): User
}


type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTask(title: String!, desc: String, priority: Int!, complete: Boolean!, 
    assignees: [User], subTasks: [Task], createdBy: [User], createdAt: Date
    dueDate: Date)
#  TO DO  deleteTask()
#  TO DO   createList()
#  TO DO   deleteList()

}

`;

module.exports = typeDefs;
