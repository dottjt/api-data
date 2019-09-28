exports.up = async function(knex) {

  // USER
  const hasDbUserTable = await knex.schema.hasTable('user');
  if (!hasDbUserTable) {
    await knex.schema.createTable('user', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('display_name').notNullable();
      table.string('email').notNullable();
      table.string('avatar');
      table.string('admin');

      table.timestamps(true, true);
    });
  }

  // PROVIDER
  const hasDbProviderTable = await knex.schema.hasTable('provider');
  if (!hasDbProviderTable) {
    await knex.schema.createTable('provider', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('provider').notNullable();
      table.uuid('user_id').references('user.id');

      table.timestamps(true, true);
    });
  }

  // POKEMON
  const hasDbPokemonTable = await knex.schema.hasTable('pokemon');
  if (!hasDbPokemonTable) {
    return knex.schema.createTable('pokemon', function(table) {
      table.uuid('id').notNullable().unique().primary();
      
      table.string('pokemon_id').notNullable();
      table.string('name').notNullable().unique();
      table.string('sprite').notNullable();

      table.timestamps(true, true);
    });
  }

  // IMAGE
  const hasDbImageTable = await knex.schema.hasTable('image');
  if (!hasDbImageTable) {
    return knex.schema.createTable('image', function(table) {
      table.uuid('id').notNullable().unique().primary();

      table.string('url').notNullable();
      table.string('type').notNullable();
      table.integer('height').notNullable();
      table.integer('width').notNullable();

      table.timestamps(true, true);
    });
  }

  // ANNOTATION
  const hasDbAnnotationTable = await knex.schema.hasTable('annotation');
  if (!hasDbAnnotationTable) {
    return knex.schema.createTable('annotation', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('name').notNullable();
      table.string('type').notNullable();
      table.string('stroke').notNullable();
      table.string('key').notNullable();

      table.uuid('image_id').references('image.id');
      table.uuid('pokemon_id').references('pokemon.id');
      table.uuid('user_id').references('user.id');

      table.timestamps(true, true);
    });
  }

  // COORDINATE
  const hasDbCoordinateTable = await knex.schema.hasTable('coordinate');
  if (!hasDbCoordinateTable) {
    return knex.schema.createTable('coordinate', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.integer('x').notNullable();
      table.integer('y').notNullable();

      table.uuid('annotation_id').references('annotation.id');

      table.timestamps(true, true);
    });
  }
};

exports.down = async function(knex) {
  await knex.schema.dropTable('user');
  await knex.schema.dropTable('provider');
  await knex.schema.dropTable('pokemon');
  await knex.schema.dropTable('image');
  await knex.schema.dropTable('annotation');
  await knex.schema.dropTable('coordinate');
};
