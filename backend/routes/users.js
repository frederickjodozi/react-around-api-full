const router = require('express').Router();

const {
  getUser,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
