const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      // task description
      type: String,
      trim: true,
    },
    priority: {
      type: Number, // very high, high, medium, low, very low
      min: 1,
      max: 5,
      required: true,
      default: 1,
    },
    complete: {
      type: Boolean,
      required: true,
      default: false,
    },
    assignees: [
      {
        type: String
      },
    ],
    //Subtask is an object within the task model.
    subTasks: [{
      title: {
        type: String,
        trim: true,
      },
      desc: {
        // task description
        type: String,
        trim: true,
      },
      priority: {
        type: Number, // very high, high, medium, low, very low
        min: 1,
        max: 5,
        required: true,
        default: 1,
      },
      complete: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    dueDate: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
