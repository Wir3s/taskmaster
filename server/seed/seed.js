const { model } = require('mongoose');
const db = require('../config/connection');
const { User, Task, List } = require('../models');

const userSeeds = require('./data/userSeedData.json');
const listSeeds = require('./data/listSeedData.json');
const taskSeeds = require('./data/taskSeedData.json');

function seeds (){

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        console.log('User Seed all done!');
    } catch (err) {
        throw err;
    }

    try {
        await List.deleteMany({});
        await List.create(listSeeds);
        console.log('List Seed all done!');
    } catch (err) {
        throw err;
    }

    try {
        await Task.deleteMany({});
        await Task.create(taskSeeds);
        console.log('Task Seed all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }

});

}

seeds();

module.exports = seeds;