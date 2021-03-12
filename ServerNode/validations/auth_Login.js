const Joi = require("@hapi/joi");

const registerSchema = Joi.object().keys({
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  userType: Joi.string().required(),
});

const validationsObj = {
  register: (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
};

function getValidationFunction(path) {
  return validationsObj[path];
}

module.exports = getValidationFunction;
