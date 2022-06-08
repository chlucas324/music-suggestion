
const sequelize = require('../config/connection');
const { Songs } = require('../models');

const songdata = [

    {
        song_name: 'Go',
        artist_name: 'test',
        search_url: 'song-name=hello&index=0',
        user_id: '1'
      },

      {
        song_name: 'Stop',
        artist_name: 'test',
        search_url: 'song-name=hello&index=0',
        user_id: '2'
      },


]


const seedSongs = () => Songs.bulkCreate(songdata);

module.exports = seedSongs;
