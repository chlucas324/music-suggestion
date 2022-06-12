const router = require("express").Router();
const sequelize = require("../../config/connection");
const { User, Songs } = require("../../models");

router.get("/", (req, res) => {
  Songs.findAll({
    attributes: ["id", "song_name", "search_url", "user_id"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // expects {song_name: 'My Way', song_name: 'https://taskmaster.com/press', user_id: 1}
  if (req.session) {
    Songs.create({
      song_name: req.body.song_name,
      artist_name: req.body.artist_name,
      search_url: req.body.search_url,
      user_id: req.session.user_id,
    })
      .then((dbPostData) => res.json(dbPostData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

module.exports = router;
