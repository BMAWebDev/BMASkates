const fs = require('fs');

module.exports = (req, res) => {
  const fileExists = fs.existsSync(`views/pagini/${req.url}.ejs`);

  if (req.url.slice(-4) == '.ejs') res.locals.page = '/403';
  else if (fileExists) res.locals.page = req.url;
  else res.locals.page = '/404';

  res.render('pagini' + req.url, (err, rezRandare) => {
    if (req.url.slice(-4) == '.ejs') res.status(403).render('pagini/403');
    else if (err && err.message.includes('Failed to lookup')) res.status(404).render('pagini/404');
    else res.send(rezRandare);
  });
};
