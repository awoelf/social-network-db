const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const { emails, usernames } = require('./data');

console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];

    for (let i = 0; i < 3; i++) {
        const newUser = {
            username: usernames[i],
            email: emails[i],
        }
        users.push(newUser);
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.timeEnd('seeding complete');
    process.exit(0);
})