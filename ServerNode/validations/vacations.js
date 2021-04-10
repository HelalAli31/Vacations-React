const Joi = require("@hapi/joi");

const followerSchema = Joi.object().keys({
  user_id: Joi.number().required(),
  travel_id: Joi.number().required(),
});

const getTravelsSchema = Joi.object().keys({
  id: Joi.number().optional(),
});
const deleteTravelSchema = Joi.object().keys({
  id: Joi.number().optional(),
});
const editTravelSchema = Joi.object().keys({
  id: Joi.number().optional(),
});
const addTravelSchema = Joi.object().keys({
  id: Joi.number().optional(),
  Image: Joi.string().optional(),
  WhereTo: Joi.string().required(),
  Description: Joi.string().optional(),
  From: Joi.date().required(),
  To: Joi.date().required(),
  Price: Joi.number().required(),
});

const validationsObj = {
  follower: (req, res, next) => {
    const { error } = followerSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  getTravels: (req, res, next) => {
    const { error } = getTravelsSchema.validate(req.query);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  DeleteTravel: (req, res, next) => {
    const { error } = deleteTravelSchema.validate(req.body);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  EditTravel: (req, res, next) => {
    const { error } = editTravelSchema.validate(req.query);
    if (error) {
      console.log(error.details);
      return next(error.details);
    }
    return next();
  },
  AddTravel: (req, res, next) => {
    const { error } = addTravelSchema.validate(req.body);
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
