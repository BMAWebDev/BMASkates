const nodemailer = require('nodemailer');
const fs = require('fs');

module.exports = async (email, fileName) => {
  const transp = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'bmaskates@gmail.com',
      pass: 'vcv5rwb!RHW4twd0wym',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //genereaza html
  await transp.sendMail({
    from: 'bmaskates@gmail.com',
    to: email,
    subject: 'Factura comanda',
    text: `Buna ziua. Atasata aveti factura in format pdf pentru produsele cumparate pe BMASkates.`,
    html: `<h1>Buna ziua. Atasata aveti factura in format pdf pentru produsele cumparate pe BMASkates.</h1>`,
    attachments: [
      {
        filename: 'factura.pdf',
        content: fs.readFileSync(fileName),
      },
    ],
  });
};
