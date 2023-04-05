const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    taskTitle: {
      type: String,
      required: true,
    },
    taskDesc: {
      // task description
      type: String,
      trim: true,
    },
    taskPriority: {
      type: Number, // very high, high, medium, low, very low
      min: 1,
      max: 5,
      required: true,
      default: 1,
    },
    taskComplete: {
        type: Boolean,
        required: true,
        default: false,
    },
    taskAssignees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    subTasks: [
      // array of subtasks; can be empty
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
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
    dueDate: Date, 

    // Uncomment for repeated task joy
    // repeatInterval: Number, // In hours? set to 0 for non-repeating?
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// pre-save middleware for calculating dueDate based on repeatInterval?
taskSchema.pre("save", async function (next) {
  this.dueDate =
    this.repeatInterval > 0
      ? this.createdAt + 24
      : this.createdAt + this.repeatInterval; // hours
  next();
});

const Task = model("Task", taskSchema);

module.exports = Task;
