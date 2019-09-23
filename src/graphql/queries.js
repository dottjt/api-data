const knex = require('../db/knex');

// const getCurrentUser = async (/* _, {} */) => {

// }

const getImages = async (/* _, {} */) => {
  const images = await knex('image').select();

  return images;
};

const getImagesWithoutAnnotations = async (/* _, {} */) => {
  const images =
    await knex('image').select()
      .leftJoin('annotation', 'annotation.image_id', 'image.id')
      .where('annotation', '==', 0)
      .select()

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
  getImagesWithoutAnnotations,
  getPokemon,
}