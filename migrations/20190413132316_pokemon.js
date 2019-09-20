
// table - pokemon

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('pokemon');
  if (!hasDbUserTable) {
    return knex.schema.createTable('pokemon', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('pokemon_id').notNullable();
      table.string('name').notNullable().unique();
      table.string('sprite').notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('pokemon');
};
