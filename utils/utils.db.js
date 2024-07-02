const { Pool } = require("pg");
const {
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USER
} = require('./utils.config.js');

const connectionPool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
});

module.exports = connectionPool;