const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');
const getFilters = require('./get-filters');
const handleFilters = require('./handle-filters');

module.exports = (req, res) => {
  // trimite mai departe la final de body faptul ca trebuie sa importe si fisierul de javascript
  res.locals.hasJSfile = true;

  db.query('select * from products', (err, resQuery) => {
    if (err) {
      const { response } = jsonErrorHandler(req, res, 1); //1 e de la jsonErrorID, id-ul erorii din json
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      let produse = [];
      let notFound = false;
      if (req.url.split('?').length > 1) {
        produse = handleFilters(req.url.split('?'), resQuery.rows);
        produse.length ? (notFound = false) : (notFound = true);
      }

      if (!notFound) {
        const { pret_min, pret_max, orase, branduri, tipuri_produse } = getFilters(produse.length ? produse : resQuery.rows);

        res.locals.pret_min = pret_min;
        res.locals.pret_max = pret_max;
        res.locals.orase = orase;
        res.locals.branduri = branduri;
        res.locals.tipuri_produse = tipuri_produse;
      }

      res.render('pagini/produse', {
        page: '/produse',
        produse: produse.length ? produse : resQuery.rows,
        notFound,
        urlRedirectNotFound: `${req.protocol}://${req.get('host')}/produse`,
      });
    }
  });
};
