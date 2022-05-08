const { erori } = require('../assets/json/erori.json');
const { jsonErrorHandler } = require('../middleware');

module.exports = (req, res) => {
  const { errorID, response } = jsonErrorHandler(req, res);
  res = response;

  res.render('pagini' + req.url, (err, rezRandare) => {
    if (errorID && parseInt(errorID) >= 400 && parseInt(errorID) < 600 && erori.filter((e) => e.id == errorID).length) res.status(errorID).render('pagini/eroare_generala');
    else if (errorID) res.status(400).render('pagini/eroare_generala');
    else res.send(rezRandare);
  });
};
