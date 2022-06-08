const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Songs extends Model {}
Songs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      song_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      search_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isURL: true
          }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'songs'
    }
  );

  module.exports = Songs;