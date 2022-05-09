const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');
const getFilters = require('./get-filters');

module.exports = (req, res) => {
  let query = 'select * from products';
  const urlParams = req.url.split('?=');

  // trimite mai departe la final de body faptul ca trebuie sa importe si fisierul de javascript
  res.locals.hasJSfile = true;

  // afiseaza produsele din categorie
  if (urlParams.length > 1) {
    if (!urlParams[1].includes('/')) urlParams[1] = `/${urlParams[1]}`;

    query = `select * from products where categorie='${urlParams[1].slice(1)}'`;
  }

  db.query(query, (err, resQuery) => {
    if (err) {
      const { response } = jsonErrorHandler(req, res, 1); //1 e de la jsonErrorID, id-ul erorii din json
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      const { pret_min, pret_max, orase, branduri, tipuri_produse } = getFilters(resQuery.rows);

      res.locals.pret_min = pret_min;
      res.locals.pret_max = pret_max;
      res.locals.orase = orase;
      res.locals.branduri = branduri;
      res.locals.tipuri_produse = tipuri_produse;

      res.render('pagini/produse', {
        page: '/produse',
        produse: resQuery.rows,
      });
    }
  });
};
