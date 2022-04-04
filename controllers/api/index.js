const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require ('./commentRoutes');

router.use('/users', userRoutes);
router.use('/projects', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
