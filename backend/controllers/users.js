const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require('../utils/errorStatusCodes');

const getUserData = (id, res) => {
  User.findById(id)
    .orFail(() => {
      const error = new Error('No user found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(ERROR_CODE_404).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const getUser = (req, res) => {
  getUserData(req.params.id, res);
};

const getCurrentUser = (req, res) => {
  getUserData(req.id, res);
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' }));
};

const updateUser = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { name, about } },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      const error = new Error('No user found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(ERROR_CODE_404).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { avatar } },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      const error = new Error('No user found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else if (err.statusCode === 404) {
        res.status(ERROR_CODE_404).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

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

module.exports = {
  getUser,
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
  createUser,
  userLogin,
};
