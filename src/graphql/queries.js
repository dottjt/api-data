const knex = require('../db/knex');

// const getCurrentUser = async (/* _, {} */) => {

// }

const getImages = async (/* _, {} */) => {
  const images = await knex('image').select();

  return images;
};

const getNewImage = async (_, { image_id }) => {
  if (image_id) {
    const image = await knex('image').where('id', image_id).first();
    console.log(image);
    return image;
  }

  const image =
    await knex('image')
      .leftJoin('annotation', 'annotation.image_id', 'image.id')
      .where('annotation.image_id', null)
      .first('image.*')

  return image;
};

// TODO
// const getImageGallery = async (/* _, {} */) => {

//   const images =
//   await knex('image').select()
//     .leftJoin('annotation', 'annotation.image_id', 'image.id')
//     .where('annotation', '==', 0)
//     .first()

//   return images;
// };


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
  getNewImage,
  getPokemon,
}