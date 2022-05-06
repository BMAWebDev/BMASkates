// Controller
const { Contact } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.get('/contact', Contact.getPage);
