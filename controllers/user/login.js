const formidable = require('formidable');
const { db } = require('../../db');
const { jsonErrorHandler } = require('../../middleware');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    const username = fields.username.trim();
    const password = fields.password.trim();

    const userConfirmedToken = await db.query(`select * from users where username='${username}'`);
    if (!userConfirmedToken.rows.length) {
      const { response } = jsonErrorHandler(req, res, 8); // user not found
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else if (!userConfirmedToken.rows[0].confirmat_mail) {
      const { response } = jsonErrorHandler(req, res, 9); // confirma token
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else if (!bcrypt.compareSync(password, userConfirmedToken.rows[0].parola)) {
      const { response } = jsonErrorHandler(req, res, 10); // parola inexistenta
      res = response;

      res.status(400).render('pagini/eroare_generala');
    } else {
      req.session.user = userConfirmedToken.rows[0];

      res.redirect('/');
    }
  });
};
