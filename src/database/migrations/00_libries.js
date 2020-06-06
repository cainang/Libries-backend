exports.up = function(knex) {
    return knex.schema.createTable('libries', function(table) {
        table.increments('id').primary();
        table.string('id_user').notNullable()
        table.string('autor').notNullable()
        table.string('expressao').notNullable()
        table.string('url_expressao').notNullable()
        table.boolean('condicao').notNullable()
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('libries');
};