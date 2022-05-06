/**
 * Custom error handler
 * @see https://expressjs.com/en/guide/error-handling.html
 */
module.exports = (err, req, res, next) => {
  if (!(err instanceof Error)) {
    return res.status(500).json({
      name: 'Error',
      message: 'Unknown error',
    });
  }

  const { status = 400, name, message } = err;
  return res.status(status).json({ name, message });
};
