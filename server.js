const express = require('express');
const server = express();
const router = require('./router');

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static('assets'));

// ruteaza tot
server.use('/', router);

const PORT = 8080;
server.listen(PORT, (_) => console.log(`Serverul este deschis la adresa: http://localhost:${PORT}/`));
