// wherever we're resolving the query to pull data back,
// do a Task.populate(WithSomeTasksInHere) so you get the full task data
// https://www.bezkoder.com/mongoose-one-to-many-relationship/


const { AuthenticationError } = require('apollo-server-express');
const { User, List, Task } = require('../models');
const { now } = require('mongoose');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        user: async (parent, args) => 
            await User.findById(args._id),

        users: async () => 
            await User.find({}),

        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        task: async (parent, args) => 
        await Task.findById(args._id),

        tasks: async () => 
            await Task.find({}),

        list: async (parent,args) => 
            await List.findById(args._id),

        lists: async () =>
            await List.find({}),
    },

    Mutation: {
        // How to make login accept either email or username?
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            //After JWT works
            //const token = signToken(profile);
            return {
                //token, 
                user
            };
        },

        addUser: async (parent, { email, username, password }) => {
            const user = await User.create({ email, username, password });
            //After JWT works
            //const token = signToken(user);

            return user        
        },

        removeUser: async (parent, { id }) => {
            return User.findOneAndDelete({ _id: id });
        },

        updateUserEmail: async (parent, args) => {
            const { id } = args;
            const result = await User.findByIdAndUpdate(id, args)
            return result;
        },

        updateUserUsername: async (parent, args) => {
            const { id } = args;
            const result = await User.findByIdAndUpdate(id, args)
            return result;
        },



        // This requires login Authentication. Cannot be checked now
        // Uncomment when context.user works

        // // Set up mutation so a logged in user can only remove their account and no one else's
        // removeUser: async (parent, args, context) => {
        //     if (context.user) {
        //         return User.findOneAndDelete({ _id: context.user._id }, args, { new: true });
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },

        // updateUserEmail: async (parent, { newEmail }, context) => {
        //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        //     if (context.user) {
        //         return User.findOneAndUpdate(
        //             { email: newEmail },
        //             {
        //                 new: true,
        //                 runValidators: true,
        //             }
        //         );
        //     }
        //     // If user attempts to execute this mutation and isn't logged in, throw an error
        //     throw new AuthenticationError('You need to be logged in!');
        // },

        // updateUserUsername: async (parent, { newUsername }, context) => {
        //     // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
        //     if (context.user) {
        //         return User.findOneAndUpdate(
        //             { username: newUsername },
        //             {
        //                 new: true,
        //                 runValidators: true,
        //             }
        //         );
        //     }
        //     // If user attempts to execute this mutation and isn't logged in, throw an error
        //     throw new AuthenticationError('You need to be logged in!');
        // },
    },
};

module.exports = resolvers;