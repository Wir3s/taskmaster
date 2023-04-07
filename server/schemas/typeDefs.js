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

type List {
    _id: ID
    listName: String!
    tasks: [Task]
    createdBy: [User]
    users: [User]
}



type Query {
    me: User
    tasks: [Task]
    task(_id:ID!): Task
    list(_id:ID!): List
    lists: [List]
}


# type Mutation {
#     # addUser(username: String!, email: String!, password: String!): Auth
#     # login(email: String!, password: String!): Auth
#     # addTask(title: String!, desc: String, priority: Int!, complete: Boolean!, 
#     # assignees: [User], subTasks: [Task], createdBy: [User], createdAt: String
#     # dueDate: String): [User]
# #  TO DO  deleteTask()
# #  TO DO   createList()
# #  TO DO   deleteList()

# }

`;

module.exports = typeDefs;
