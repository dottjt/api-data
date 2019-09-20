
// table - pokemon_type

// exports.up = async function(knex) {
//   const hasDbUserTable = await knex.schema.hasTable('pokemon_type');
//   if (!hasDbUserTable) {
//     return knex.schema.createTable('pokemon_type', function(table) {
//       table.uuid('id').notNullable().unique().primary();
//       table.string('name').notNullable().unique();
//       table.uuid('pokemon_id').references('pokemon.id');
//       table.timestamps(true, true);
//     });
//   }
// };

// exports.down = function(knex) {
//   return knex.schema.dropTable('pokemon_type');
// };
