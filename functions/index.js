const isEmailValid = require('./validate-email');
const sendEmail = require('./send-email');
const generateToken = require('./generate-token');

module.exports = { isEmailValid, sendEmail, generateToken };
