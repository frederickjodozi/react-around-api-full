const bcrypt = require('bcrypt');
const User = require('../models/user');
const { ERROR_CODE_400, ERROR_CODE_500 } = require('../utils/errorStatusCodes');

const createUser = (req, res) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
        about,
        avatar,
      })
        .then((user) => res.status(201).send({
          _id: user._id,
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          __v: user.__v,
        }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

module.exports = createUser;
