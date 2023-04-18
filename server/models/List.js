const { Schema, model } = require("mongoose");

const listSchema = new Schema(
  {
    listName: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // users: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   }
    // ],
  });

listSchema.methods.countTasks = function () {
  const filteredList = listSchema.tasks.filter(task => task.taskComplete === true);
  return filteredList.length;
};

const List = model("List", listSchema);

module.exports = List;
