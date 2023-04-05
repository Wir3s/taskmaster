const {Schema, model} = require('mongoose');

const taskSchema = new Schema(
    {
        desc:{
            // task description
            type: String,
            required: true,
            minlength: 1,
            trim: true,
        }, 
        priority: Number, // high, medium, low
        subtasks: [
            // array of subtasks; can be empty
            {
                type: Schema.Types.ObjectId,
                ref: 'Task',
            },
        ],
        createdAt: Date,
        dueDate: Date, // defaults to a day from createdAt?
        repeatInterval: Number // In hours? set to 0 for non-repeating?
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

// pre-save middleware for calculating dueDate based on repeatInterval?
taskSchema.pre('save', async function (next) {
    this.dueDate =
        this.repeatInterval > 0 ?
        this.createdAt + this.repeatInterval
        : this.createdAt + 24 // hours
    next();
});

const Task = model('task', taskSchema);

module.exports = Task;