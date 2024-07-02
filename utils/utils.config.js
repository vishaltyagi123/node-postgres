require('dotenv/config');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET

const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_DATABASE = process.env.PG_DATABASE
const PG_USER = process.env.PG_USER

module.exports = { 
    PORT,
    PG_PASSWORD,
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USER,
    JWT_SECRET
};