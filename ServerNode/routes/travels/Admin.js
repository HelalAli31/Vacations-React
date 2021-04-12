const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../controllers/JWT/jwt");
const getValidationFunction = require("../../validations/vacations.js");
const logger = require("../../logger");
const {
  DeleteTravel,
  EditTravel,
  AddTravel,
} = require("../../controllers/travels/index");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.headers.authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    if (verify.data.userType === "admin") return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post(
  "/DeleteTravel",
  getValidationFunction("DeleteTravel"),
  async (req, res, next) => {
    const { id } = req.body;
    if (!id) throw new error("general error");
    try {
      if (!id) throw new error("id is not found ");
      const result = await DeleteTravel(id, "followers", "travel_id");
      const data = await DeleteTravel(id, "travels", "id");
      if (!data) throw new error("Deleted travels fails");
      logger.info(`travel id=${id} has just deleted`);
      res.json("travel deleted");
    } catch (ex) {
      logger.error(ex);
      res.send(ex);
    }
  }
);

router.post(
  "/AddVacations",
  getValidationFunction("AddTravel"),
  async (req, res, next) => {
    try {
      const result = await AddTravel(req.body);
      if (result) {
        logger.info(`${req.body.id} travel has added now`);
        res.json("travel Added");
      }
    } catch (ex) {
      logger.error(ex);
      return res.send(ex);
    }
  }
);

router.post(
  "/EditTravel",
  getValidationFunction("EditTravel"),
  async (req, res, next) => {
    const { id } = req.query;
    if (!id) throw new error("general error");
    try {
      const result = await EditTravel(req.body, id);
      if (result) {
        logger.info(`${req.body.id} travel has edited now`);
        res.json("travel Edited");
      }
    } catch (ex) {
      console.log(ex);
      logger.error(ex);
      return res.send(ex);
    }
  }
);

module.exports = router;
