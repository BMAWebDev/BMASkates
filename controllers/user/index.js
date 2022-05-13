const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const confirmToken = require('./confirm-token');
const getUsers = require('./get-users');
const deleteUser = require('./delete-user');
const updateUser = require('./update-user');

module.exports = { register, login, logout, confirmToken, getUsers, deleteUser, updateUser };
