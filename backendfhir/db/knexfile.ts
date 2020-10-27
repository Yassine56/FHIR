require('dotenv').config({ path: '../.env' });
const development = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
  },
  seeds: {
    directory: './seeds/integration'
  },
  migrations: {
    directory: './migrations'
  }
};
const production = {
  client: 'pg',
  connection: {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT)
  },
  seeds: {
    directory: './seeds/integration'
  },
  migrations: {
    directory: './migrations'
  }
};

module.exports = {
  development,
  production
};
