require('dotenv').config();

const ROOT_DIR = process.cwd();

module.exports = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        searchPath: ['knex', 'public'],
        migrations: {
            directory: `${ROOT_DIR}/src/core/database/migrations`,
            tableName: 'migrations',
        },
        seeds: {
            directory: `${ROOT_DIR}/src/core/database/seeds`,
            tableName: 'seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: `${ROOT_DIR}/src/core/database/migrations`,
            tableName: 'migrations',
        },
        seeds: {
            directory: `${ROOT_DIR}/src/core/database/seeds`,
            tableName: 'seeds',
        }
    },
};
