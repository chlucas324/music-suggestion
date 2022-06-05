const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Songs } = require('../models');


//If logged in render search handlebar otherwise, stay on login/homepage
router.get('/homepage', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/search');
      return;
    }
    res.render('homepage');
  });

//After Searching, it should redirect to this page
  router.get('/search-results', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('search-results');
  });



module.exports = router;