const annotationData = require('../seedsData/annotationData');
const pokemonData = require('../seedsData/pokemonData');
const userData = require('../seedsData/userData');
const imageData = require('../seedsData/imageData');

exports.seed = async function(knex) {
  // delete
  await knex('user').del();
  await knex('provider').del();
  await knex('pokemon').del();
  await knex('coordinate').del();
  await knex('annotation').del();
  await knex('image').del();

  // insert
  await knex('pokemon').insert(pokemonData);
  await knex('user').insert(userData);  
  await knex('image').insert(imageData);  
  
  // fetch
  const userId = await knex('user').select('id');
  const imageIds = await knex('image').limit(3).select('id');
  const pokemonIds = await knex('pokemon').limit(3).select('id');

  // insert annotations
  for (let i; i < imageIds.length; i++) {
    const annotation = await knex('annotation').insert({
      ...annotationData[i],
      image_id: imageIds[i],
      pokemon_id: pokemonIds[i],
      user_id: userId,
    });
    console.log(annotation);
  }

  // await knex('image').insert();
};
