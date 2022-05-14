const errorHandler = require('./error-handler');
const getIP = require('./getIP');
const jsonErrorHandler = require('./json-error-handler');
const setGlobalLocals = require('./set-global-locals');
const setQRCodes = require('./set-qr-codes');

module.exports = {
  errorHandler,
  getIP,
  jsonErrorHandler,
  setGlobalLocals,
  setQRCodes,
};
