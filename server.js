const express = require('express');
const server = express();
const router = require('./router');

require('dotenv').config();

// seteaza calea catre proiect global
global.rootProjectLocation = __dirname;
global.domain = process.env.domain;

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static('assets'));

// ruteaza tot
server.use('/', router);

const PORT = 8080;
server.listen(PORT, (_) => console.log(`Serverul este deschis la adresa: http://localhost:${PORT}/`));
