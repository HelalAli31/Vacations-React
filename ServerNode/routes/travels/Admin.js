const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../controllers/JWT/jwt");
const logger = require("../../logger");
const { DeleteTravel, EditTravel,AddTravel } = require("../../controllers/travels/index");

const getValidationFunction = require("../../validations/auth_Login.js");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.headers.authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    console.log("verify", verify);
    if (verify.data.userType === "admin") return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.post("/DeleteTravel", async (req, res, next) => {
  console.log("DeeleteTravel");
  const { id } = req.body;
  console.log(id);
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
});

router.post("/AddVacations", async (req, res, next) => {
  console.log("AddVacations");
  console.log("body", req.body);
  try {
    const result = await AddTravel(req.body);
    if (result) {
      logger.info(`${req.body.id} travel has added now`);
      res.json("travel Added");
    }
  } catch (ex) {
    console.log(ex);
    logger.error(ex);
    res.send(ex);
  }
});

router.post("/EditTravel", async (req, res, next) => {
  console.log("EditTravel");
  const { id } = req.query;
  console.log("req.query:", req.query, id);
  console.log("body", req.body);
  try {
    console.log(id);
    const result = await EditTravel(req.body, id);
    if (result) {
      logger.info(`${req.body.id} travel has edited now`);
      res.json("travel Edited");
    }
  } catch (ex) {
    console.log(ex);
    logger.error(ex);
    res.send(ex);
  }
});

module.exports = router;
