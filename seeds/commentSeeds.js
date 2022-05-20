const { Comment } = require('../models');

const commentSeeds = [
    {
        comment_text: 'Facts!',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: '100%',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'Never thought about it like that',
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentSeeds);

module.exports = seedComments;