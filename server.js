const express = require('express');
const server = express();

server.set('view engine', 'ejs');

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(express.static('assets'));

server.get(['/', '/index', '/home'], (req, res) => {
  res.render('pagini/index');
});

server.get('/*', (req, res) => {
  res.status(404);
  res.render('pagini/404');
});

const PORT = 8080;
server.listen(PORT, (_) => console.log(`Serverul este deschis la adresa: http://localhost:${PORT}/`));
