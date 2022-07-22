const centralizedErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      Error: statusCode === 500
        ? 'An error occurred on the server'
        : message,
    });
};

module.exports = centralizedErrorHandler;
