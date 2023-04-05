const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    email: String!
    username: String!
    password: String!
}

type Task {
    _id: ID
    taskTitle: String!
    taskDesc: String
    taskPriority: Int
    taskComplete: Boolean!
    taskAssignees: [User]
    subTasks: [Task]
    createdBy: [User]
    createdAt: Date
    dueDate: Date
}

type Tasklist {

}



type Query {

}


type Mutation {


}

`;

module.exports = typeDefs;