import Joi from 'joi';
import { JoiPassword } from 'joi-password';

const checkSignUp = Joi.object({
  userName: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  password: JoiPassword.string()
    .min(8)
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required()
    .messages({
      'password.minOfUppercase':
        'Password must contains at least 1 uppercase character',
      'password.minOfSpecialCharacters':
        'Password must contains at least 1 sppeical character',
      'password.minOfNumeric': 'Password must contains at least 1 number'
    })
});

const checkSignIn = Joi.object({
  emailAddress: Joi.string().required(),
  password: Joi.string().required()
});

const updatePasswordReq = Joi.object({
  userName: Joi.string().allow('').allow(null),
  emailAddress: Joi.string().allow('').allow(null)
});

export {
  checkSignIn,
  checkSignUp,
  updatePasswordReq
};
