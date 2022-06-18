const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the name field is 2',
        'string.max': 'The maximum length of the name field is 30',
        'any.required': 'The name field is required',
      }),
    link: Joi.string().required().custom(validateURL)
      .messages({
        'string.uri': 'The link field needs to be a uri',
        'any.required': 'The link field is required',
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Email and Password are required',
        'any.required': 'Email and Password are required',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Email and Password are required',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the Name field is 2',
        'string.max': 'The maximum length of the Name field is 30',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the About field is 2',
        'string.max': 'The maximum length of the About field is 30',
      }),
    avatar: Joi.string().custom(validateURL)
      .messages({
        'string.uri': 'The Avatar field needs to be a uri',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages({
        'string.email': 'Email and Password are required',
        'any.required': 'Email and Password are required',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Email and Password are required',
      }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the Name field is 2',
        'string.max': 'The maximum length of the Name field is 30',
      }),
    about: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the About field is 2',
        'string.max': 'The maximum length of the About field is 30',
      }),
  }),
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateURL)
      .messages({
        'string.uri': 'The Avatar field needs to be a uri',
      }),
  }),
});

module.exports = {
  validateCard,
  validateUser,
  validateLogin,
  validateUserUpdate,
  validateAvatarUpdate,
};
