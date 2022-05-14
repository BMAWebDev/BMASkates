// configure env variables
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.userDB,
  password: process.env.passwordDB,
  database: process.env.databaseDB,
  host: process.env.hostDB,
  port: process.env.portDB,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
});
client.connect();

module.exports = () => {
  return client;
};
