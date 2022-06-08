const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Songs } = require('../../models');

router.get('/', (req, res) => {
    Song.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'song_name',
            'search_url',
            'artist',
        ],

    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;