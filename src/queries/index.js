const knex = require('../db/knex');

const searchPokemon = async (_, { pokemonName }) => {
  const pokemonList =
    await knex('pokemon')
      .where('name', 'ilike', `_${pokemonName}%`)
      .orderBy('name', 'desc')
      .limit('10')
      .select('id', 'name', 'sprite');

  return pokemonList.sort();
};

module.exports = {
  searchPokemon,
}