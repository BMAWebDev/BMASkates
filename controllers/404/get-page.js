module.exports = (req, res) => {
  res.render('pagini' + req.url, (err, rezRandare) => {
    if (err && err.message.includes('Failed to lookup')) res.status(404).render('pagini/404');
    else res.send(rezRandare);
  });
};
