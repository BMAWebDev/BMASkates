const { getIP } = require('../../middleware');
const request = require('request');

module.exports = (req, res) => {
  const ip = getIP(req);
  request(`https://secure.geobytes.com/GetCityDetails?key=7c756203dbb38590a66e01a5a3e1ad96&fqcn=${ip}`, (err, resRequest, body) => {
    const locatie = `${JSON.parse(body).geobytesregion}, ${JSON.parse(body).geobytescountry}`;

    res.render('pagini/index', {
      page: '/index',
      ip,
      serverTime: new Date().toLocaleTimeString(),
      locatie,
    });
  });
};
