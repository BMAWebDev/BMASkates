// Controller
const { Produse } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/produse', Produse.getProducts);
