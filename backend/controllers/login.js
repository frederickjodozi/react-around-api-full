const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ERROR_CODE_401 } = require('../utils/errorStatusCodes');

const userLogin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect password or email'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect password or email'));
          }
          const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });

          return res.send(token);
        });
    })
    .catch((err) => {
      res.status(ERROR_CODE_401).send({ Error: `${err.message}` });
    });
};

module.exports = userLogin;
