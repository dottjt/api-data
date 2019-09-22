const knex = require('../db/knex');

const getImages = async (/* _, {} */) => {
  const images = await knex('image').select();

  return images;
};

const getPokemon = async (_, { pokemonName }) => {
  if (pokemonName === '') return [];

  const pokemonList =
    await knex('pokemon')
      .where('name', 'ilike', `${pokemonName}%`)
      .orderBy('name', 'desc')
      .limit('5')
      .select('id', 'name', 'sprite');

  return pokemonList;
};

module.exports = {
  getImages,
  getPokemon,
}