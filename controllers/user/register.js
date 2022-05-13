const formidable = require('formidable');
const { jsonErrorHandler } = require('../../middleware');
const { isEmailValid, sendEmail, generateToken } = require('../../functions');
const { db } = require('../../db');
const bcrypt = require('bcryptjs');
const fs = require('fs');

module.exports = (req, res) => {
  const form = formidable({
    multiples: true,
    maxFileSize: 100 * 1024 * 1024, //10mb limitare fisier
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    } else {
      const prenume = fields.prenume.trim();
      const nume = fields.nume.trim();
      const username = fields.username.trim();
      const email = fields.email.trim();
      const password = fields.password.trim();
      const confirm_password = fields['confirm-password'].trim();
      const ocupatie = fields['ocupatie'] ? fields['ocupatie'] : null;
      const role = fields['role'] ? fields['role'] : null;

      let relativeImagePath = null;
      if (files.avatar.originalFilename) {
        relativeImagePath = `/assets/uploads/${username}-${files.avatar.newFilename}.${files.avatar.mimetype.split('/')[1]}`;
        // absolute path
        const filePath = `${global.rootProjectLocation}/assets/uploads/${username}-${files.avatar.newFilename}.${files.avatar.mimetype.split('/')[1]}`;
        const imageData = fs.readFileSync(files.avatar.filepath);
        fs.writeFileSync(filePath, imageData);
      }

      let errors = false;

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
        const accountExistsQuery = await db.query(`select * from users where email=$1 or username=$2`, [email, username]);

        // verifica daca userul exista
        if (accountExistsQuery.rows.length) {
          const { response } = jsonErrorHandler(req, res, 7); //contul exista deja
          res = response;

          res.status(400).render('pagini/eroare_generala');
        } else {
          // daca nu, incepe adaugarea userului
          const parolaCriptata = bcrypt.hashSync(password, 10);

          const columns = ['email', 'parola', 'username', 'rol', 'nume', 'prenume', 'ocupatie', 'cale_imagine', 'cod_confirmare', 'confirmat_mail', 'data_adaugare'];

          const register_token = generateToken(100);
          const values = [email, parolaCriptata, username, role, nume, prenume, ocupatie, relativeImagePath, register_token, null, new Date().toISOString()];

          const query = `insert into users (${columns.join(', ')}) values (${values.map((value, index) => {
            return '$' + (index + 1) + ' ';
          })})`;

          db.query(query, values, async (err, resQuery) => {
            if (err) {
              const { response } = jsonErrorHandler(req, res, 1); //eroare db (insert)
              res = response;

              res.status(400).render('pagini/eroare_generala');
            } else {
              await sendEmail(username, email, register_token);

              res.render('pagini/inregistrare', {
                page: '/inregistrare',
              });
            }
          });
        }
      }
    }
  });
};
