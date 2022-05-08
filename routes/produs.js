// Controller
const { Produs } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/produse/:id', Produs.getProduct);
