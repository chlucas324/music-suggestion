const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const songsRoutes = require('./songs-routes');
const playlistRoutes = require('./playlist-routes');

router.use('/users', userRoutes);
router.use('/songs', songsRoutes);
router.use('/playlist', playlistRoutes);


module.exports = router;