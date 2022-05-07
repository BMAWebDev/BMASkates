const { getIP } = require('../../middleware');

module.exports = (req, res) => {
  res.render('pagini/index', {
    page: '/index',
    ip: getIP(req),
  });
};
