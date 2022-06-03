const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const songsRoutes = require('./songs-routes');

router.use('/users', userRoutes);
router.use('/songs', songsRoutes);


module.exports = router;