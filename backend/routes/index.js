const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/not-found-error');

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
