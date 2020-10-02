module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devuser',
  password: 'bF9wX0nU4xP7nU7y',
  database: 'hotel',
  entities: [
    'src/**/**.entity.ts',
  ],
  synchronize: true,
  migrations: [
    'src/migration/*.ts'
  ],
  cli: {
    'migrationsDir': 'src/migration'
  }
};
