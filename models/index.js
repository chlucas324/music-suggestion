// import all models
const User = require('./User');
const Songs = require('./Songs');

//associations
User.hasMany(Songs, {
    foreignKey: 'user_id'
})


module.exports = { User, Songs };