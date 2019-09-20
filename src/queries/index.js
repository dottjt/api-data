const knex = require('../db/knex');

const searchPokemon = (_, { pokemonName }) => {
  const db_user = await knex('db_users').where('discord_id', discordUser.id).first();

  // place a limit on it as well. 
};
