
exports.up = function (knex) {
    return knex.schema.createTable('almoxarifado', function (table) {
        table.increments()
        table.string('nome')
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
};

exports.down = function (knex) {

};
