const { celebrate, Joi } = require('celebrate');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the name field is 2',
        'string.max': 'The maximum length of the name field is 30',
        'any.required': 'The name field is required',
      }),
    link: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the link field is 2',
        'string.max': 'The maximum length of the link field is 30',
        'any.required': 'The link field is required',
      }),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
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
    avatar: Joi.string().uri()
      .messages({
        'string.uri': 'The Avatar field needs to be a uri',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
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
    avatar: Joi.string().uri()
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
