module.exports = (req) => {
  const ip = req.headers['x-forwarded-for'];
  if (ip) {
    let vect = ip.split(',');
    return vect[vect.length - 1];
  } else if (req.ip) {
    return req.ip;
  } else {
    return req.connection.remoteAddress;
  }
};
