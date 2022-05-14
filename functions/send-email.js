const nodemailer = require('nodemailer');

module.exports = async (username, email, token) => {
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
    subject: 'Cont nou',
    text: `Bine ai venit in comunitatea BMASkates. Username-ul tau este: ${username}`,
    html: `<h1>Salut! Bine ai venit in comunitatea BMASkates.</h1><p>Username-ul tau este <span style='color: #ccee44; font-weight: bold;'>${username}.</span> <p><a href='${global.protocol}://${global.domain}${!global.port ? ':8080' : ''}/confirmare-token/${username}/${token}'>Click aici pentru confirmare</a></p>`,
  });
};
