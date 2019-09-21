// table - annotation

exports.up = async function(knex) {
  const hasDbUserTable = await knex.schema.hasTable('annotation');
  if (!hasDbUserTable) {
    return knex.schema.createTable('annotation', function(table) {
      table.uuid('id').notNullable().unique().primary();
      table.string('name').notNullable();
      table.string('stroke').notNullable();
      table.string('key').notNullable();
      table.integer('x1y1').notNullable();
      table.integer('x1y2').notNullable();
      table.integer('x2y1').notNullable();
      table.integer('x2y2').notNullable();
      table.uuid('image_id').references('image.id');

      table.timestamps(true, true);
    });
  }
};

exports.down = function(knex) {
  return knex.schema.dropTable('annotation');
};
