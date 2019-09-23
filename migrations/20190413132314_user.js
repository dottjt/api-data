
// table - user

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('user');
  if (!hasDbUserTable) {
    return knex.schema.createTable('user', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('display_name').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();

      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
