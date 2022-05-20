const seedUsers = require('./userSeeds');
const seedPosts = require('./postSeeds');
const seedComments = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedDB = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedPosts();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    process.exit(0);
};

seedDB();