const { db } = require('../../db');

module.exports = (req, res) => {
  if (req.session.user?.rol != 'admin') res.redirect('/');
  else {
    // ia toti userii care nu sunt admini
    db.query('select * from users where not rol=$1', ['admin'], (err, resQuery) => {
      if (err) console.log(err);
      else {
        res.render('pagini/utilizatori', {
          page: '/utilizatori',
          users: resQuery.rows,
        });
      }
    });
  }
};
