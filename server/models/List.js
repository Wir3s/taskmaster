const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    listName: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      // Remember to call a .populate whenever you actually want to use these.
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
  });

listSchema.methods.countTasks = function () {
  const filteredList = listSchema.tasks.filter(task => task.taskComplete === true);
  return filteredList.length;
};

const List = model("List", listSchema);

module.exports = List;
