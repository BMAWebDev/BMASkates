const isEmailValid = require('./validate-email');
const sendEmail = require('./send-email');
const sendDeleteEmail = require('./send-delete-email');
const generateToken = require('./generate-token');

module.exports = { isEmailValid, sendEmail, sendDeleteEmail, generateToken };
