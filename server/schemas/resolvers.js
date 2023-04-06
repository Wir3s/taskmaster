// wherever we're resolving the query to pull data back,
// do a Task.populate(WithSomeTasksInHere) so you get the full task data
// https://www.bezkoder.com/mongoose-one-to-many-relationship/


const { AuthenticationError } = require('apollo-server-express');
const { User, List, Task } = require('../models');
// const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },

        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        // By adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { email, username, password }) => {
            const user = await User.create({ email, username, password });
            //After JWT works
            //const token = signToken(user);

            return {
                //token, 
                user
            };
        },

        // Set up mutation so a logged in user can only remove their account and no one else's
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

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
    },
};

module.exports = resolvers;