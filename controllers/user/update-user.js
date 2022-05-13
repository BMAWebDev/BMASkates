const formidable = require('formidable');
const { jsonErrorHandler } = require('../../middleware');
const { isEmailValid } = require('../../functions');
const fs = require('fs');
const { db } = require('../../db');
const bcrypt = require('bcryptjs');

module.exports = (req, res) => {
  if (!req.session.user) {
    res.redirect('/login');
  } else {
    const userID = req.session.user.id;
    const form = formidable();

    form.parse(req, async (err, fields, files) => {
      const prenume = fields.prenume.trim();
      const nume = fields.nume.trim();
      const username = fields.username.trim();
      const email = fields.email.trim();
      const password = fields.password.trim();
      const confirm_password = fields['confirm-password'].trim();
      const ocupatie = fields['ocupatie'] ? fields['ocupatie'] : null;
      const role = fields['role'] ? fields['role'] : null;

      let errors = false;
      let userDB = null;

      if (!prenume || !nume || !username || !email || !password || !confirm_password) {
        const { response } = jsonErrorHandler(req, res, 2);
        res = response;
        errors = true;

        res.status(400).render('pagini/eroare_generala');
      }

      if (password != confirm_password) {
        const { response } = jsonErrorHandler(req, res, 3);
        res = response;
        errors = true;

        res.status(400).render('pagini/eroare_generala');
      } else {
        const accountExistsQuery = await db.query(`select * from users where id=$1`, [userID]);

        // verifica daca userul exista
        if (!accountExistsQuery.rows.length) {
          const { response } = jsonErrorHandler(req, res, 8); //contul nu exista
          res = response;
          errors = true;

          res.status(400).render('pagini/eroare_generala');
        } else if (!bcrypt.compareSync(password, accountExistsQuery.rows[0].parola)) {
          const { response } = jsonErrorHandler(req, res, 10); //parola incorecta
          res = response;
          errors = true;

          res.status(400).render('pagini/eroare_generala');
        } else {
          userDB = accountExistsQuery.rows[0];
        }
      }

      const reg = new RegExp(/^[a-z -]+$/i);
      if (!reg.test(prenume) || !reg.test(nume)) {
        const { response } = jsonErrorHandler(req, res, 4);
        res = response;
        errors = true;

        res.status(400).render('pagini/eroare_generala');
      }

      if (!isEmailValid(email)) {
        const { response } = jsonErrorHandler(req, res, 5);
        res = response;
        errors = true;

        res.status(400).render('pagini/eroare_generala');
      }

      const regUsername = new RegExp(/^[a-z-_0-9]+$/i);
      if (!regUsername.test(username)) {
        const { response } = jsonErrorHandler(req, res, 6);
        res = response;
        errors = true;

        res.status(400).render('pagini/eroare_generala');
      }

      if (!errors) {
        const columns = ['email', 'username', 'rol', 'nume', 'prenume', 'ocupatie', 'cale_imagine'];

        const values = [email, username, role, nume, prenume, ocupatie, files.avatar.originalFilename];

        // daca url imagine nu exista atunci nu include coloana si valoarea caii
        if (!files.avatar.originalFilename) {
          columns.pop();
          values.pop();
        } else {
          // modific ultima valoare din values adica cale_imagine
          values[values.length - 1] = userDB.cale_imagine;
        }

        const query = `update users set ${columns.map((column, index) => {
          return column + '=$' + (index + 1) + ' ';
        })}`;

        db.query(query, values, async (err, resQuery) => {
          if (err) {
            const { response } = jsonErrorHandler(req, res, 1); //eroare db (update)
            res = response;

            res.status(400).render('pagini/eroare_generala');
          } else {
            if (files.avatar.originalFilename) {
              // absolute path
              const filePath = global.rootProjectLocation + userDB.cale_imagine;

              const imageData = fs.readFileSync(files.avatar.filepath);

              fs.writeFile(filePath, imageData, (err) => {
                if (err) {
                  const { response } = jsonErrorHandler(req, res, 12); // eroare la scriere fisier avatar
                  res = response;

                  res.status(400).render('pagini/eroare_generala');
                } else {
                  // ca sa se aplice modificarile si pe site si nu doar in DB sterg user din session
                  req.session.user = null;

                  // all good
                  res.render('pagini/login', {
                    page: '/login',
                  });
                }
              });
            } else {
              // ca sa se aplice modificarile si pe site si nu doar in DB sterg user din session
              req.session.user = null;

              // all good
              res.render('pagini/login', {
                page: '/login',
              });
            }
          }
        });
      }
    });
  }
};
