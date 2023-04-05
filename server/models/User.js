const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }
);

const User = model('user', userSchema);

module.exports = User;