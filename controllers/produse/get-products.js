const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');

module.exports = (req, res) => {
  db.query('select * from products', (err, resQuery) => {
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
