// table - annotation

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('annotation');
  if (!hasDbUserTable) {
    return knex.schema.createTable('annotation', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('name').notNullable();
      table.string('stroke').notNullable();
      table.string('key').notNullable();

      table.integer('x').notNullable();
      table.integer('y').notNullable();
      table.integer('width').notNullable();
      table.integer('height').notNullable();
      table.uuid('image_id').references('image.id');
      table.uuid('pokemon_id').references('pokemon.id');
      table.uuid('user_id').references('user.id');

      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('annotation');
};
