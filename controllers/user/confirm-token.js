const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');

module.exports = async (req, res) => {
  const { username, token } = req.params;

  const queryUser = await db.query('select * from users where username=$1', [username]);
  if (!queryUser) {
    // eroare db
    const { response } = jsonErrorHandler(req, res, 1);
    res = response;

    res.status(400).render('pagini/eroare_generala');
  }

  if (!queryUser.rows.length) {
    // userul nu exista

    const { response } = jsonErrorHandler(req, res, 8);
    res = response;

    res.status(400).render('pagini/eroare_generala');
  } else {
    const user = queryUser.rows[0];

    if (user.cod_confirmare != token) {
      // tokenul nu este valid

      const { response } = jsonErrorHandler(req, res, 11);
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      db.query('update users set confirmat_mail=TRUE where username=$1', [username], (err, resQuery) => {
        if (err) {
          // db error on updating
          const { response } = jsonErrorHandler(req, res, 1);
          res = response;

          res.status(400).render('pagini/eroare_generala');
        } else {
          res.render('pagini/confirmare-cod', {
            page: '/confirmare-cod',
          });
        }
      });
    }
  }
};
