const annotationData = require('../seedData/annotationData');
const coordinateData = require('../seedData/coordinateData');
const pokemonData = require('../seedData/pokemonData');
const userData = require('../seedData/userData');
const imageData = require('../seedData/imageData');

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
    await knex('annotation').insert({
      ...annotationData[i],
      image_id: imageIds[i],
      pokemon_id: pokemonIds[i],
      user_id: userId,
    });

    for (let j; j < coordinateData[i].length; j++) {
      await knex('coordinate').insert({
        ...coordinateData[i][j],
        annotation_id: annotationData[i].id,
      });  
    }
  }
};
