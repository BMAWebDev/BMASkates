const { Router } = require('express');
const { errorHandler } = require('./middleware');
const { Error404 } = require('./controllers');
const { acasa, contact } = require('./routes');

const router = Router();
module.exports = router;

// utilizeaza instantele definite
router.use(acasa);
router.use(contact);

// ruta pentru 404, atunci cand nu gaseste nicio alta ruta de mai sus
router.all('*', Error404.getPage);

// middleware pentru eroare
router.use(errorHandler);
