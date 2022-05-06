// Controller
const { Acasa } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.get(['/', '/index', '/home'], Acasa.getPage);
