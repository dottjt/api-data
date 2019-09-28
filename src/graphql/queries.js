const knex = require('../db/knex');

const getCurrentUser = async (_, {}, { user }) => {
  if (user) return user;
  return knex('user').first();
}

const getImages = async (/* _, {} */) => {
  const images = await knex('image').select();
  return images;
};

const getNewImage = async (_, { image_id }) => {
  if (image_id) {
    const image = await knex('image').where('id', image_id).first();
    return image;
  } else {
    const image =
      await knex('image')
        .leftJoin('annotation', 'annotation.image_id', 'image.id')
        .where('annotation.image_id', null)
        .first('image.*');
    return image; 
  }
};

const doesPokemonExist = async (_, { searchText }) => {
  const doesPokemonExist =
    await knex('pokemon')
      .where('name', 'ilike', `${searchText}%`)
      .orderBy('name', 'desc')
      .limit('5')
      .select('id', 'name');
  
  return !!doesPokemonExist;
}

const getGallerySearch = async (_, { searchText }) => {
  if(!searchText) {
    // get 5 random annotations.

  }

  const images =
    await knex('image')
      .leftJoin('annotation', 'annotation.image_id', 'image.id')
      .leftJoin('pokemon', 'pokemon.id', 'annotation.pokemon_id')
      .leftJoin('coordinate', 'pokemon.annotation')
      .where('pokemon.name', 'ilike', `${searchText}%`)
      .limit('5')
      .select();

  return images;
};

const getImageUserImageSet = async (/* _, {} */) => {
  const images =
    await knex('image')
      .leftJoin('annotation', 'annotation.user_id', 'image.id')
      .leftJoin('user', 'user.id', 'annotation.user_id')
      .first('image.*')

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
  getCurrentUser,
  getImages,
  getNewImage,
  getGallerySearch,
  
  getImageUserImageSet,

  getPokemon,
  doesPokemonExist,
}