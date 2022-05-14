const isEmailValid = require('./validate-email');
const sendEmail = require('./send-email');
const sendDeleteEmail = require('./send-delete-email');
const generateToken = require('./generate-token');
const sendInvoiceEmail = require('./send-invoice-email');

module.exports = { isEmailValid, sendEmail, sendDeleteEmail, generateToken, sendInvoiceEmail };
