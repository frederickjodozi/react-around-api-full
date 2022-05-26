const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'A valid email adress is required',
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'The Avatar image must a valid URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
