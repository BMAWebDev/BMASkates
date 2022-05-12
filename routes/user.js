// Controller
const { User } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/inregistrare', User.register);
