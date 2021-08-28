const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../controllers/JWT/jwt");
const logger = require("../../logger");
const getValidationFunction = require("../../validations/vacations.js");
const {
  getTravels,
  getSearchVacations,
  ChangeFollowingTravel,
  getFollowerState,
  UpdateFollowersAfterDelete,
  isFollowing,
  getTravelsFollowingStatus,
} = require("../../controllers/travels/index");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.headers.authorization;
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    const verify = await verifyJWT(lastToken);
    if (verify) return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.get("/", getValidationFunction("GetTravels"), async (req, res, next) => {
  try {
    console.log("AA");
    const { id } = req.query;
    const { distination, from, to } = req.headers;
    if (!id) res.send("general error");
    const data = await getTravels(id, { distination, from, to });
    console.log(data);
    if (!data) throw new error("faild to get the travels");
    const followingTravels = await isFollowing(id);
    followingTravels.map((followingTravel) => {
      const followingTravelIndex = data.findIndex((d) => {
        return d.id === followingTravel.travel_id;
      });
      data[followingTravelIndex].followingState = "true";
    });
    return res.json(data);
  } catch (ex) {
    logger.error(ex);
    res.send(ex);
  }
});

router.post(
  "/Followers",
  getValidationFunction("GetFollower"),
  async (req, res, next) => {
    const { user_id, travel_id } = req.body;
    if (!user_id || !travel_id) throw new error("general error");
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
      logger.error(ex);
      return res.send(ex);
    }
  }
);

module.exports = router;
