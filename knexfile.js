// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'clucks_dev'
  },
    migrations: {
      tableName: 'knex_migrations_clucks',
      directory: "./db/migrations"
    }
  },
};
