'use strict';
module.exports = (sequelize, DataTypes) => {
  const Videogame = sequelize.define('Videogame', {
    name: DataTypes.STRING,
    developer: DataTypes.STRING,
    gamesystem: DataTypes.STRING,
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  Videogame.associate = function(models) {
    // associations can be defined here
  };
  return Videogame;
};