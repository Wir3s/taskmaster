// wherever we're resolving the query to pull data back,
// do a Task.populate(WithSomeTasksInHere) so you get the full task data
// https://www.bezkoder.com/mongoose-one-to-many-relationship/

const { AuthenticationError } = require("apollo-server-express");
const { User, List, Task } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return User.findById(args._id).populate("lists");
    },

    users: async () => {
      return User.find({}).populate("lists");
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    meList: async (parent, args, context) => {
      if (context.user) {
        const findOne =  await User.findOne({ _id: context.user._id })
        return List.findById(findOne) ;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    task: async (parent, args) => {
      return Task.findById(args._id).populate("createdBy"); //Createdby doesn't work yet.
    },

    tasks: async () => {
      return Task.find({}).populate("createdBy"); //Createdby doesn't work yet.
    },

    list: async (parent, args) => {
      return List.findById(args._id).populate("users").populate("tasks");
    },

    lists: async () => {
      return List.find({}).populate("users").populate("tasks");
    },
  },

  Mutation: {
    // USERS:
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({ email, username, password });

      const token = signToken(user);
      return { token, user };
    },

    removeUser: async (parent, { id }) => {
      return User.findOneAndDelete({ _id: id });
    },

    updateUserEmail: async (parent, args) => {
      const { id } = args;
      const result = await User.findByIdAndUpdate(id, args);
      return result;
    },

    updateUserUsername: async (parent, args) => {
      const { id } = args;
      const result = await User.findByIdAndUpdate(id, args);
      return result;
    },

    // TASKS:

    addTask: async (parent, { title, desc, priority, complete, dueDate }) => {
      const task = await Task.create({
        title,
        desc,
        priority,
        complete,
        dueDate,
      });
      await List.findByIdAndUpdate(
        { _id: "642f8fdafb864a7af0f13f97" },
        { $addToSet: { tasks: task._id } }
      );
      return task;
    },

    // addTask with Context:
    // addTask: async (parent, { title, desc, priority, complete, dueDate }, context) => {
    //   if (context.user) {
    //   const task = await Task.create({
    //     title,
    //     desc,
    //     priority,
    //     complete,
    //     dueDate,
    //   });
    //   await List.findByIdAndUpdate(
    //     { _id: listId },
    //     { $addToSet: { tasks: task._id } }
    //   );
    //   return task;
    // }
    // throw new AuthenticationError('You need to be logged in!');
    // },

    addSubTask: async (parent, { taskId, title, desc, priority, complete }) => {
      return Task.findByIdAndUpdate(
        { _id: taskId },
        { $addToSet: { subTasks: { title, desc, priority, complete } } }
      );
    },

    removeTask: async (parent, { id }) => {
      return Task.findOneAndDelete({ _id: id });
    },

    // removeTask with Context:

    // updateTask: async (parent, args) => {
    //   const { id } = args;
    //   const result = await Task.findByIdAndUpdate(id, args);
    //   return result;
    // },

    updateTaskTitle: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },
    updateTaskDesc: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },
    updateTaskPriority: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },
    updateTaskComplete: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },
    updateTaskDueDate: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },
    // LISTS:

    createList: async (parent, { listName }) => {
      const list = await List.create({ listName });

      // { $addToSet: {users: "642f8b9361968c78806c0e73"} }

      // users.push("642f8b9361968c78806c0e73");

      return list;
    },

    removeList: async (parent, { id }) => {
      return List.findOneAndDelete({ _id: id });
    },

    updateList: async (parent, args) => {
      const { id } = args;
      const result = await List.findByIdAndUpdate(id, args);
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
    //           );
    //         }
    //         // If user attempts to execute this mutation and isn't logged in, throw an error
    //         throw new AuthenticationError('You need to be logged in!');
    //       },
  },
};

module.exports = resolvers;
