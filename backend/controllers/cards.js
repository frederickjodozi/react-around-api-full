const Card = require('../models/card');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } = require('../utils/errorStatusCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send({ Error: `${err.message}` });
      } else {
        res.status(ERROR_CODE_500).send({ Error: 'An error has occured on the server' });
      }
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => {
      const error = new Error('No card found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        const error = new Error('Cannot delete other user\'s cards');
        error.statusCode = 404;
        throw error;
      }
      return Card.findByIdAndDelete(card._id);
    })
    .then((data) => res.send(data))
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

const likeCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No card found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
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

const dislikeCard = (req, res) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('No card found with specified Id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
