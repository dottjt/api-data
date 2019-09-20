const knex = require('../db/knex');

const searchPokemon = (_, { pokemonName }) => {
  const pokemonList =
    await knex('pokemon')
      .where('name', 'ilike', `${pokemonName}%`)
      .limit('10')
      .select('name', 'sprite');

  return pokemonList;
};

module.exports = {
  searchPokemon,
}