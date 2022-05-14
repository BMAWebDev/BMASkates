const { getIP } = require('../../middleware');
const request = require('request');

module.exports = (req, res) => {
  request(req.ip, (err, resRequest, body) => {
    const locatie = `${JSON.parse(body).geobytesregion}, ${JSON.parse(body).geobytescountry}`;

    res.render('pagini/index', {
      page: '/index',
      ip: getIP(req),
      serverTime: new Date().toLocaleTimeString(),
      locatie,
    });
  });
};
