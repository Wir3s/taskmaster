const { Schema, model } = require("mongoose");

const taskListSchema = new Schema({
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

  users: [User.schema],

});


taskListSchema.tasks.filter(task => task.taskComplete === true);

const Tasklist = model("Tasklist", taskListSchema);

module.exports = Tasklist;
