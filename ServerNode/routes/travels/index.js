const express = require("express");
const router = express.Router();
const { verifyJWT } = require("../../controllers/JWT/jwt");
const logger = require("../../logger");
const getValidationFunction = require("../../validations/vacations.js");
const {
  getTravels,
  ChangeFollowingTravel,
  getFollowerState,
  UpdateFollowersAfterDelete,
  isFollowing,
  getTravelsFollowingStatus,
} = require("../../controllers/travels/index");

router.use(async (req, res, next) => {
  try {
    const clientJwt = req.headers.authorization;
    console.log("client Token:", clientJwt);
    const UpdateToken = clientJwt.replace(clientJwt[0], "");
    const lastToken = UpdateToken.replace(clientJwt[UpdateToken.length], "");
    console.log("token from middlewear", lastToken);
    const verify = await verifyJWT(lastToken);
    console.log("verify", verify);
    if (verify) return next();
  } catch (error) {
    logger.error("er:", error);
    return next(error);
  }
});

router.get("/", getValidationFunction("GetTravels"), async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) res.send("general error");
    const data = await getTravels(id);
    if (!data) throw new error("faild to get the travels");
    logger.info("getTravels mode on");
    const followingTravels = await isFollowing(id);
    console.log("ft", followingTravels);
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

// router.get("/", getValidationFunction("GetTravels"), async (req, res, next) => {
//   try {
//     const { id } = req.query;

//     const followingData = await getTravelsFollowingStatus(id, "");
//     const NotfollowingData = await getTravelsFollowingStatus(id, "!");
//     const finalData = [...followingData, ...NotfollowingData];

//     followingData.map((travel) => {
//       travel.followingState = "true";
//     });

//     if (!Array.isArray(followingData)) return;
//     const data = finalData.reduce((travelsObj, currentTravel) => {
//       const { id } = currentTravel;

//       const newTravel = travelsObj[id]
//         ? {
//             ...travelsObj[id],
//           }
//         : { ...currentTravel };
//       return {
//         ...travelsObj,
//         [id]: newTravel,
//       };
//     }, {});
//     console.log(data);

//     return res.json(Object.values(data));
//   } catch (ex) {
//     logger.error(ex);
//     res.send(ex);
//   }
// });

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
