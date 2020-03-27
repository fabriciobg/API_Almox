
exports.up = function (knex) {
    return knex.schema.createTable('item_almoxarifado', function (table) {
        table.increments()
        table.bigInteger('id_almoxarifado').unsigned().index().references('id').inTable('almoxarifado').notNullable()
        table.bigInteger('id_item').unsigned().index().references('id').inTable('item').notNullable()
        table.string('nome').notNullable()
        table.integer('quantidade').unsigned().notNullable().defaultTo(0)
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
};

exports.down = function (knex) {

};
