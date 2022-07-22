const router = require('express').Router();
const { validateObjectId, validateUserUpdate, validateAvatarUpdate } = require('../middlewares/validation');

const {
  getUser,
  getUsers,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/:id', validateObjectId, getUser);
router.get('/', getUsers);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
