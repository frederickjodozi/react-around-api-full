const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateObjectId, validateCard } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateObjectId, deleteCard);
router.put('/:id/likes', validateObjectId, likeCard);
router.delete('/:id/likes', validateObjectId, dislikeCard);

module.exports = router;
