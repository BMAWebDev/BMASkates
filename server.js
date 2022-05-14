const express = require('express');
const server = express();
const router = require('./router');
const session = require('express-session');
const helmet = require('helmet');

require('dotenv').config();

// seteaza calea catre proiect global
global.rootProjectLocation = __dirname;
global.protocol = process.env.protocol;
global.domain = process.env.domain;

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static('assets'));

server.use(helmet.frameguard()); // prevent iframe

// pentru req.session
server.use(
  session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
  })
);

// ruteaza tot
server.use('/', router);

const PORT = 8080;
server.listen(PORT, (_) => console.log(`Serverul este deschis la adresa: http://localhost:${PORT}/`));
