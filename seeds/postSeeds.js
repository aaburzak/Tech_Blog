
const { Post } = require('../models');

const postSeeds = [
    {
        title: 'New Tech!',
        description: 'Crazy new future tech!',
        user_id: 1
    },
    {
        title: 'Old Tech!',
        description: 'Check out Old Tech, can you believe we used this?',
        user_id: 2
    },
    {
        title: 'Current Tech',
        description: 'Use it, or lose it',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postSeeds);

module.exports = seedPosts;
