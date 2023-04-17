const { AuthenticationError } = require("apollo-server-express");
const { User, List, Task } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, args) => {
      return User.findById(args._id).populate("lists").populate({
        path: 'lists',
        populate: 'tasks'
      }); // Poputates lists into user and tasks into list.
    },

    users: async () => {
      return User.find({}).populate("lists").populate({
        path: 'lists',
        populate: 'tasks'
      }); // Poputates lists into user and tasks into list.
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        const findOne = await User.findById({ _id: context.user._id }).populate('lists').populate({
          path: 'lists',
          populate: 'tasks'
        });
        return findOne;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    task: async (parent, args) => {
      return Task.findById(args._id).populate("createdBy"); 
    },

    tasks: async () => {
      return Task.find({}).populate("createdBy");
    },

    list: async (parent, args) => {
      return List.findById(args._id).populate("tasks");
    },

    lists: async () => {
      return List.find({}).populate("tasks");
    },
  },

  Mutation: {
    // USERS:
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      //checks for correct password
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      
      //Uses JWT for user authentication
      const token = signToken(user);
      return { token, user };
    },

    // Until error handling on front, addUser automatically creates a list and task for a new user.
    addUser: async (parent, { email, username, password, listName, title }) => {
      const user = await User.create({ email, username, password });
      const token = signToken(user);
      const list = await List.create({ listName: "My First List" });
      await User.findByIdAndUpdate(
        { _id: user._id },
        { $addToSet: { lists: list._id } }
      );
      const task = await Task.create({ title: "My First Task" })
      await List.findByIdAndUpdate(
        { _id: list._id },
        { $addToSet: { tasks: task._id } }
      );
      return { token, user, list, task };
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
    addTask: async (parent, { title, desc, priority, complete, dueDate, id }, context) => {
      const task = await Task.create({
        title,
        desc,
        priority,
        complete,
        dueDate,
      });
      await List.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { tasks: task._id } }
      );
      return task;
    },

    addSubTask: async (parent, { taskId, title, desc, priority, complete }) => {
      return Task.findByIdAndUpdate(
        { _id: taskId },
        { $addToSet: { subTasks: { title, desc, priority, complete } } }
      );
    },

    removeTask: async (parent, { id }) => {
      return Task.findOneAndDelete({ _id: id });
    },

    removeSubTask: async (parent, { taskId, id }) => {
      await Task.findByIdAndUpdate(
        { _id: taskId },
        { $pull: { subTasks: { _id: id } } }
      );
    },

    updateSubTask: async (parent, { taskId, id, title, desc, priority, complete }) => {
      await Task.findByIdAndUpdate(
        { _id: taskId },
        { $pull: { subTasks: { _id: id } } },
      );
      await Task.findByIdAndUpdate(
        { _id: taskId },
        { $addToSet: { subTasks: { _id: id, title, desc, priority, complete } } }
      )
    },

    updateTask: async (parent, args) => {
      const { id } = args;
      const result = await Task.findByIdAndUpdate(id, args);
      return result;
    },

    // LISTS:
    createList: async (parent, { listName, id }) => {
      const list = await List.create({ listName });
      await User.findByIdAndUpdate(
        { _id: id },
        { $addToSet: { lists: list._id } }
      );
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
  },
};

module.exports = resolvers;
