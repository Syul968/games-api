'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Videogames', [{
     name: "Brave",
     developer: "EA Games",
     gamesystem: "Xbox One",
     genre: "Adventure",
     year: 2018,
     image: "https://images.eagames.com/2018/brave/xbox-one",
     createdAt: new Date(),
     updatedAt: new Date()
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Videogames', null, {});
  }
};
