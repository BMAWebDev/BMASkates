const { db } = require('../../db');
const { sendInvoiceEmail } = require('../../functions');
const html_to_pdf = require('html-pdf-node');
const juice = require('juice');
const ejs = require('ejs');
const fs = require('fs');

module.exports = async (req, res) => {
  const { produse } = req.body;

  if (!req.session.user) {
    res.status(403).json({ err: 403 });
  } else {
    const query = `select * from products where id in (${produse.map((produs, index) => {
      return ' $' + (index + 1);
    })})`;

    const ids = [];
    produse.forEach((produs) => ids.push(produs.productID));

    const productsQuery = await db.query(query, ids);
    if (!productsQuery) res.status(400).json({ err: 400 });
    else {
      const products = productsQuery.rows;
      let produsePDF = [];

      produse.forEach((prod) => {
        const produs = products.filter((e) => e.id == prod.productID)[0];
        produsePDF.push({
          produs,
          cantitate: prod.cantitate,
        });
      });

      fs.readFile(global.rootProjectLocation + '/views/pagini/factura.ejs', 'utf8', async (err, data) => {
        if (err) console.log(err);
        else {
          const factura = ejs.render(data, {
            user: req.session.user,
            data_cumparare: new Date().toISOString().split('T')[0].split('-').reverse().join('.'),
            produse: produsePDF,
            protocol: global.protocol,
            domeniu: global.domain,
          });

          const file = { content: juice(factura, { inlinePseudoElements: true }) };
          const options = { format: 'A4', args: ['--no-sandbox', '--disable-extensions', '--disable-setuid-sandbox'] };

          try {
            const buffer = await html_to_pdf.generatePdf(file, options);
            console.log('buff', buffer);
            res.json({ message: 'all good' });
          } catch (err) {
            console.log('err', err);
            res.json({ err });
          }

          // res.json({ message: 'all good' });
        }
      });

      // const file = { content: juice(factura, { inlinePseudoElements: true }) };
      // const options = { format: 'A4', args: ['--no-sandbox', '--disable-extensions', '--disable-setuid-sandbox'] };

      // try {
      //   const buffer = await html_to_pdf.generatePdf(file, options);
      //   console.log(buffer);
      //   res.json({ message: 'all good' });
      // } catch (err) {
      //   console.log(err);
      //   res.json({ err });
      // }

      // // if (buffer) res.json({ message: 'all good' });
      // // else res.json({ message: 'sss' });

      // // html_to_pdf.generatePdf(file, options).then((pdf) => {
      // //   console.log(' all good');
      // //   // if (!fs.existsSync(global.rootProjectLocation + '/assets/facturi')) fs.mkdirSync(global.rootProjectLocation + '/assets/facturi');

      // //   // const fileName = global.rootProjectLocation + '/assets/facturi/test' + new Date().getTime() + '.pdf';

      // //   // fs.writeFileSync(fileName, pdf);

      // //   // sendInvoiceEmail(req.session.user.email, fileName);

      // //   res.json({ message: 'all good' });
      // // });
    }
  }
};
