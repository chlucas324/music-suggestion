const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Songs } = require('../models');




//If logged in render search handlebar otherwise, stay on login/homepage
router.get('/',(req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/search');
      return;
    }
    res.render('homepage');
  });

router.get('/search', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('search', {
    loggedIn: req.session.loggedIn
  });
});

//After Searching, it should redirect to this page
  router.get('/search-results', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('search-results', {
      loggedIn: req.session.loggedIn
    });
  });

  router.get('/playlist', (req, res) => {
    if (!req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    else{
      Songs.findAll({
      where: {
          user_id: req.session.user_id
      },
      attributes: [
          'song_name',
          'search_url',
          'artist_name',
      ],
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        const songs = dbUserData.map(song => song.get({ plain: true }))
        if(songs[0] === undefined){
          res.render('playlist', {
            loggedIn: req.session.loggedIn
          });
        }
        else{
          res.render('playlist', {
            songs,
            loggedIn: req.session.loggedIn
          });
        }
        
      })
    }
  });

module.exports = router;