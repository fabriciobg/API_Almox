
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments()
        table.string('username').notNullable()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })
};

exports.down = function (knex) {

};
