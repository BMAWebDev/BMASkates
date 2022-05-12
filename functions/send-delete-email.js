const nodemailer = require('nodemailer');

module.exports = async (email) => {
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
    subject: 'Cont sters',
    text: `Cu sinceră părere de rău, vă anunțăm că ați fost șters de pe BMASkates! Adio.`,
    html: `<h1>Cu sinceră părere de rău, vă anunțăm că ați fost șters de pe BMASkates! Adio.</h1>`,
  });
};
