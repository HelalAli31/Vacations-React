const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../controllers/JWT/jwt");
const logger = require("../../logger");
const {
  getTravels,
  ChangeFollowingTravel,
  getFollowerState,
  UpdateFollowersAfterDelete,
  DeleteTravel,
  EditTravel,
} = require("../../controllers/travels/index");

const getValidationFunction = require("../../validations/auth_Login.js");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.headers.authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    console.log(lastToken);
    const verify = await verifyJWT(lastToken);
    console.log("verify", verify);
    if (verify) return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = await getTravels(id);
    if (!data) throw new error("faild to get the travels");
    logger.info("getTravels mode on");
    return res.json(data);
  } catch (ex) {
    logger.error(ex);
    res.send(ex);
  }
});

router.post("/Followers", async (req, res, next) => {
  const { user_id, travel_id } = req.body;
  let query = ``;
  try {
    const UserFollowing = await getFollowerState(user_id, travel_id);
    if (UserFollowing.length > 0) {
      query = `DELETE FROM travels_db.followers WHERE user_id=${user_id} and travel_id=${travel_id} ;`;
      var data = await ChangeFollowingTravel(query);
      await UpdateFollowersAfterDelete(travel_id, "-");
      logger.info(`user=${user_id} has just disliked travel=${travel_id}`);
    } else {
      query = `INSERT INTO travels_db.followers (  user_id, travel_id)  VALUES (  ${user_id},  ${travel_id}); `;
      var data = await ChangeFollowingTravel(query);
      await UpdateFollowersAfterDelete(travel_id, "+");
      logger.info(`user=${user_id} has just liked travel=${travel_id}`);
    }
    res.json(data);
  } catch (ex) {
    res.send(ex);
  }
});

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
