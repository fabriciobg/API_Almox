module.exports = {
    client: 'postgresql',
    connection: {
        host: '',
        database: '',
        user: '',
        password: '',
        ssl: {
            rejectUnauthorized: false,
        },
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    }
};