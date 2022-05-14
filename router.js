const { Router } = require('express');
const { errorHandler, setGlobalLocals, setQRCodes } = require('./middleware');
const { Restul } = require('./controllers');
const { acasa, contact, produse, produs, user, api } = require('./routes');

const router = Router();

router.use(setGlobalLocals);
router.use(setQRCodes);
module.exports = router;

// utilizeaza instantele definite

router.use(acasa);
router.use(contact);
router.use(produse);
router.use(produs);
router.use(user);
router.use(api);

// trateaza toate rutele care nu se potrivesc cu cele de mai sus
router.all('*', Restul);

// middleware pentru eroare
router.use(errorHandler);
