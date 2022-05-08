const { db } = require('../../db');

module.exports = (req, res) => {
  db.query('select * from products', (err, resQuery) => {
    res.render('pagini/produse', {
      page: '/produse',
      produse: resQuery.rows,
    });
  });
};
