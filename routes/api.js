// Controller
const { Api } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/api/produse', Api.getProducts);
router.post('/api/cart', Api.buyProducts);
