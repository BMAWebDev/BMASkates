const { db } = require('../db');
const QRCode = require('qrcode');
const fs = require('fs');

module.exports = (req, res, next) => {
  const cale_qr = global.rootProjectLocation + '/assets/img/qrcode';

  if (fs.existsSync(cale_qr)) fs.rmSync(cale_qr, { force: true, recursive: true });
  fs.mkdirSync(cale_qr);

  const cale_produse = global.protocol + '://' + global.domain + ':8080' + '/produse';
  QRCode.toFile(cale_qr + '/qr-produse.png', cale_produse);

  db.query('select id from products', (err, resQuery) => {
    for (let prod of resQuery.rows) {
      const cale_prod = global.protocol + '://' + global.domain + ':8080' + '/produs/' + prod.id;

      QRCode.toFile(cale_qr + '/' + prod.id + '.png', cale_prod);
    }

    next();
  });
};
