const seedUsers = require('./user-seeds');
const seedSongs = require('./songs-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  await seedSongs();
  console.log('--------------');


  process.exit(0);
};

seedAll();
