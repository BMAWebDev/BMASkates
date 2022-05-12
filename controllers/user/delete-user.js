const { db } = require('../../db');
const { sendDeleteEmail } = require('../../functions');
const fs = require('fs');

module.exports = async (req, res) => {
  if (req.session.user?.rol != 'admin') res.redirect('/');
  else {
    const { id } = req.params;

    try {
      const userQuery = await db.query('select * from users where id=$1', [id]);

      const imgURL = userQuery.rows[0].cale_imagine;
      if (imgURL) fs.unlinkSync(global.rootProjectLocation + imgURL);

      await db.query('delete from users where id=$1', [id]);

      await sendDeleteEmail(userQuery.rows[0].email);

      return res.json({ message: 'Utilizatorul a fost sters' });
    } catch (err) {
      res.status(404).json({ message: 'Utilizatorul nu a fost gasit in baza de date' });
    }
  }
};
