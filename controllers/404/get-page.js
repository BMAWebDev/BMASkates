const fs = require('fs');

module.exports = (req, res) => {
  let fileExists = fs.existsSync(`views/pagini/${req.url}.ejs`);
  res.locals.page = fileExists ? req.url : '/404';

  res.render('pagini' + req.url, (err, rezRandare) => {
    if (err && err.message.includes('Failed to lookup')) res.status(404).render('pagini/404');
    else res.send(rezRandare);
  });
};
