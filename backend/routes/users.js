const router = require('express').Router();

const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
