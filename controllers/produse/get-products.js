const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');

module.exports = (req, res) => {
  let query = 'select * from products';
  const urlParams = req.url.split('?=');

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
      res.render('pagini/produse', {
        page: '/produse',
        produse: resQuery.rows,
      });
    }
  });
};
