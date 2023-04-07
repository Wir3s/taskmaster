const { model } = require('mongoose');
const db = require('../config/connection');
const { User, Task, List } = require('../models');

const userSeeds = require('./userSeedData.json');
// const taskSeeds = require('./profileSeeds.json');
// const listSeeds = require('./listSeedData.json');

function seeds (){

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        console.log('User Seed all done!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});

// db.once('open', async () => {
//     try {
//         await Task.deleteMany({});
//         await Task.create(taskSeeds);
//         console.log('all done!');
//         
//     } catch (err) {
//         throw err;
//     }
// });

// db.once('open', async () => {
//     try {
//         await List.deleteMany({});
//         await List.create(listSeeds);

//         console.log('all done!');
//         process.exit(0);
//     } catch (err) {
//         throw err;
//     }
// });

}

seeds();

module.exports = seeds;