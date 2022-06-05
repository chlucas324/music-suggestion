
const sequelize = require('../config/connection');
const { Songs } = require('../models');

const songdata = [

    {
        song_name: 'Go',
        search_url: 'tst.com',
        user_id: '1'
      },

      {
        song_name: 'Stop',
        search_url: 'tst.com',
        user_id: '2'
      },


]


const seedSongs = () => Songs.bulkCreate(songdata);

module.exports = seedSongs;
