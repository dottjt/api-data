const pokemonSeedsData = require('../seedsData/pokemonSeedsData');

exports.seed = function(knex) {
  return knex('pokemon').del()
    .then(function () {
      return knex('pokemon').insert(pokemonSeedsData);
    });
};
