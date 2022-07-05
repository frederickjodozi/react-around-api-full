const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('No cards found');
    })
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { user } = req;

  Card.create({ name, link, owner: user })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${err.name}: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .orFail(() => {
      throw new NotFoundError('No card found with specified Id');
    })

    .then((card) => {
      if (!card.owner.equals(req.user)) {
        throw new ForbiddenError('Cannot delete other user\'s cards');
      }
      return Card.findByIdAndDelete(card._id);
    })
    .then(res.status(204).send(''))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.name}: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with specified Id');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.name}: ${err.message}`));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('No card found with specified Id');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${err.name}: ${err.message}`));
      } else {
        next(err);
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
