const router = require('express').Router();

const {
  getUser,
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/:id', getUser);
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);

module.exports = router;
