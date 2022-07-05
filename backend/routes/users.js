const router = require('express').Router();
const { validateUserUpdate, validateAvatarUpdate } = require('../middlewares/validation');

const {
  getUser,
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:id', getUser);
router.get('/', getUsers);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
