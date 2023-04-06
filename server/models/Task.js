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
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subTasks: [ Task ],
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
      ? this.createdAt + this.repeatInterval
      : this.createdAt + 24 // hours
  next();
});

const Task = model("Task", taskSchema);

module.exports = Task;
