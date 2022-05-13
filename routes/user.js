// Controller
const { User } = require('../controllers');

const express = require('express');
const router = express.Router();
module.exports = router;

router.post('/inregistrare', User.register);
router.post('/login', User.login);
router.get('/confirmare-token/:username/:token', User.confirmToken);
router.get('/logout', User.logout);

router.get('/utilizatori', User.getUsers);
router.delete('/utilizatori/:id', User.deleteUser);

router.post('/profil', User.updateUser);
