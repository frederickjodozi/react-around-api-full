const router = require('express').Router();

const userRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({ Error: 'Requested resource not found' });
});

module.exports = router;
