const fs = require('fs');
const erori = require('../assets/json/erori.json');

module.exports = (req, res) => {
  const fileExists = fs.existsSync(`views/pagini/${req.url}.ejs`);
  let errorID = null;

  if (req.url.slice(-4) == '.ejs') {
    const eroare = erori.erori.filter((e) => e.id == '403')[0];
    errorID = 403;

    res.locals.page = '/error-page';
    res.locals.titluEroare = eroare.titlu;
    res.locals.textEroare = eroare.text;
    res.locals.imagineEroare = eroare.imagine;
  } else if (fileExists) {
    res.locals.page = req.url;
  } else {
    const eroare = erori.erori.filter((e) => e.id == '404')[0];
    errorID = 404;

    res.locals.page = '/error-page';
    res.locals.titluEroare = eroare.titlu;
    res.locals.textEroare = eroare.text;
    res.locals.imagineEroare = eroare.imagine;
  }

  res.render('pagini' + req.url, (err, rezRandare) => {
    if (errorID && erori.erori.filter((e) => e.id == errorID).length) res.status(errorID).render('pagini/eroare_generala');
    else res.send(rezRandare);

    // codul comentat e de la etapa 2, ajungand la etapa 4 a fost modificat
    // if (req.url.slice(-4) == '.ejs') res.status(403).render('pagini/403');
    // else if (err && err.message.includes('Failed to lookup')) res.status(404).render('pagini/404');
  });
};
