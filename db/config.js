// configure env variables
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  port: process.env.port,
});
client.connect();

module.exports = () => {
  return client;
};
