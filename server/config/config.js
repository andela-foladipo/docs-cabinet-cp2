const dotenv = require('dotenv');

dotenv.config();

let enableLogging;
if (process.env.SEQUELIZE_LOGGING === 'false') {
  enableLogging = false;
} else {
  enableLogging = true;
}

module.exports = {
  development: {
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_DB_USERNAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    options: {
      host: process.env.POSTGRES_DB_HOST,
      port: process.env.POSTGRES_DB_PORT,
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      logging: enableLogging
    }
  },
  test: {
    dbUri: process.env.TRAVIS_DB_URI,
    dialect: 'postgres'
  },
  production: {
    dbUri: process.env.HEROKU_DB_URI,
    options: {
      dialectOptions: {
        ssl: true
      }
    }
  }
};
