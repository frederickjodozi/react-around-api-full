const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const getUserData = (id, res, next) => {
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('No user found with specified Id');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  getUserData(req.params.id, res, next);
};

const getCurrentUser = (req, res, next) => {
  getUserData(req.user._id, res, next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('No users found');
    })
    .then((users) => res.send(users))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { name, about } },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      throw new UnauthorizedError('Not authorized to update');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === ('CastError' || 'ValidationError')) {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { $set: { avatar } },
    { runValidators: true, new: true },
  )
    .orFail(() => {
      throw new UnauthorizedError('Not authorized to update');
    })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === ('CastError' || 'ValidationError')) {
        next(new BadRequestError(`${`${err.name}: ${err.message}`}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
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
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`${err.name}: ${err.message}`));
          } else {
            next(err);
          }
        });
    });
};

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if ((!user || !req.body.password)) {
        throw new UnauthorizedError('Incorrect Password or email');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect password or email');
          }
          const token = jwt.sign({ _id: user._id }, 'secret', { expiresIn: '7d' });

          return res.send(token);
        });
    })
    .catch(next);
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
