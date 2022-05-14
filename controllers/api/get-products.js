const { db } = require('../../db');

module.exports = async (req, res) => {
  try {
    const productsQuery = await db.query('select * from products');
    res.json({ produse: productsQuery.rows });
  } catch (err) {
    res.json({ message: err });
  }
};
