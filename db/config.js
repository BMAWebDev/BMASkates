// configure env variables
require('dotenv').config();
const { Client } = require('pg');

const options = {
  user: process.env.userDB,
  password: process.env.passwordDB,
  database: process.env.databaseDB,
  host: process.env.hostDB,
  port: process.env.portDB,
};

if (process.env.SITE_ONLINE) {
  options.ssl = {
    rejectUnauthorized: false,
  };
}

const client = new Client(options);
client.connect();

module.exports = () => {
  return client;
};
