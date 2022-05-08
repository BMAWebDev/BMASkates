const { db } = require('../db');
const jsonErrorHandler = require('./json-error-handler');

module.exports = (req, res, next) => {
  db.query('SELECT unnest(enum_range(NULL::product_cat))', (err, resQuery) => {
    if (err) {
      const { response } = jsonErrorHandler(req, res, 1); //1 e de la jsonErrorID, id-ul erorii din json
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      const categorii = [];
      resQuery.rows.forEach((row) => categorii.push(row.unnest));
      res.locals.header_categorii = categorii;

      next();
    }
  });
};
