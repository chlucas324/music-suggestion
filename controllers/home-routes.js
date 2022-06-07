const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Songs } = require('../models');


//If logged in render search handlebar otherwise, stay on login/homepage
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      res.render('search');
      return;
    }
    res.render('homepage');
  });

router.get('/search', (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('search', {
    loggedIn: req.session.loggedIn
  });
});

//After Searching, it should redirect to this page
  router.get('/search-results', (req, res) => {
    // if (!req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
  
    res.render('search-results', {
      loggedIn: req.session.loggedIn
    });
  });

  router.get('/playlist', (req, res) => {
    // if (!req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
    res.render('playlist', {
      loggedIn: req.session.loggedIn
    });
  });

module.exports = router;