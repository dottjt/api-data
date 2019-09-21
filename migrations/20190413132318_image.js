// table - image

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('image');
  if (!hasDbUserTable) {
    return knex.schema.createTable('image', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('url').notNullable();
      table.string('type').notNullable();
      table.integer('height').notNullable();
      table.integer('width').notNullable();
      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('image');
};