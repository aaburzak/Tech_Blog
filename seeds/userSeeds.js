const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userSeeds = [
    {
        username: 'xanderCrews',
        email: 'xander@crews.com',
        password: 'password123'
    },
    {
        username: 'awesomeX',
        email: 'notXander@crews.com',
        password: 'password1234'
    },
    {
        username: 'stanMan',
        email: 'stan@crews.com',
        password: 'iamlaughing123'
    }
];

const seedUsers = () => User.bulkCreate(userSeeds, { individualHooks: true });

module.exports = seedUsers;