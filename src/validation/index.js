var Joi = require("joi");

const ValidUserRegistration = input => {
  const validSchema = {
    username: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required()
      .min(6),
    name: Joi.string().required()
  };

  return Joi.validate(input, validSchema, error => error);
};

module.exports.ValidUserRegistration = ValidUserRegistration;
/**
 * Login validation
 */

const ValidLogin = input => {
  return Joi.validate(
    input,
    {
      username: Joi.string()
        .required()
        .email(),
      password: Joi.string().required()
    },
    error => error
  );
};
module.exports.ValidLogin = ValidLogin;
