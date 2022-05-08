const fs = require('fs');
const { erori } = require('../assets/json/erori.json');

module.exports = (req, res, jsonErrorID = null) => {
  const fileExists = fs.existsSync(`views/pagini/${req.url}.ejs`);
  let eroare = null;
  let errorID = null;

  if (req.url.slice(-4) == '.ejs') {
    eroare = erori.filter((e) => e.id == '403')[0];
    errorID = 403;
  } else if (jsonErrorID) {
    eroare = erori.filter((e) => e.id == jsonErrorID)[0];
  } else if (fileExists) {
    res.locals.page = req.url;
  } else {
    eroare = erori.filter((e) => e.id == '404')[0];
    errorID = 404;
  }

  if (eroare) {
    res.locals.page = '/error-page';
    res.locals.titluEroare = eroare.titlu;
    res.locals.textEroare = eroare.text;
    res.locals.imagineEroare = eroare.imagine;
  }

  return { errorID, response: res };
};
