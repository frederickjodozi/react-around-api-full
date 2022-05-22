const jwt = require('jsonwebtoken');
const ERROR_CODE_401 = require('../utils/errorStatusCodes');

// eslint-disable-next-line consistent-return
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(ERROR_CODE_401).send({ Message: 'Authorization required' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(ERROR_CODE_401).send({ Message: 'Authorization required' });
  }

  req.user = payload;

  next();
};

module.exports = auth;
