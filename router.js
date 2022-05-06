const { Router } = require('express');
const { errorHandler, notFound } = require('./middleware');
const { Error404 } = require('./controllers');
const { acasa } = require('./routes');

const router = Router();
module.exports = router;

// utilizeaza instantele definite
router.use(acasa);

// ruta pentru 404, atunci cand nu gaseste nicio alta ruta de mai sus
router.all('*', Error404.getPage);

// middleware pentru eroare
router.use(errorHandler);
