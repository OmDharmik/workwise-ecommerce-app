const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const env = 'production';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    dialectOptions:
      env === 'production'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : undefined,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(`${env} Database connected successfully.`);
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
