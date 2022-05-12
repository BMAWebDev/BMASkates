const formidable = require('formidable');
const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');

module.exports = (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const username = fields.username;
    const password = fields.password;

    const userConfirmedToken = await db.query(`select * from users where username='${username}'`);
    if (!userConfirmedToken.rows.length) {
      const { response } = jsonErrorHandler(req, res, 8); //user not found
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else if (!userConfirmedToken.rows[0].confirmat_mail) {
      const { response } = jsonErrorHandler(req, res, 9); //user not found
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      res.redirect('/');
    }
  });

  return res;
};
