// Controller
const { Inregistrare } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/inregistrare', Inregistrare.createUser);
