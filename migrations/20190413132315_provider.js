
// table - user

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('provider');
  if (!hasDbUserTable) {
    return knex.schema.createTable('provider', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('provider').notNullable();
      table.uuid('user_id').references('user.id');

      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('provider');
};
