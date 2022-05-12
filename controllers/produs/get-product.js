const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');

module.exports = (req, res) => {
  const { id } = req.params;

  db.query('select * from products where id=$1', [id], (err, resQuery) => {
    if (err) {
      const { errorID, response } = jsonErrorHandler(req, res); //errorID 404 pentru ca nu gaseste produsul
      res = response;

      res.status(errorID).render('pagini/eroare_generala');
    } else {
      res.render('pagini/produs', {
        page: '/produs',
        produs: resQuery.rows[0],
      });
    }
  });
};
