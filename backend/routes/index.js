const router = require('express').Router();
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardsRouter = require('./cards');

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({ Error: 'Requested resource not found' });
});

module.exports = router;
