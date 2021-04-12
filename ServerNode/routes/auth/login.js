const express = require("express");
const { isUserRegistered, createUser } = require("../../controllers/auth.js");
const getValidationFunction = require("../../validations/auth_Login.js");
const router = express.Router();
const { signJWT } = require("../../controllers/JWT/jwt");
const logger = require("../../logger");

router.post(
  "/login",
  getValidationFunction("login"),
  async (req, res, next) => {
    const { userName, password } = req.body;
    if (!userName || !password) res.send("error");
    logger.info(`${userName} has just joined`);

    const result = await isUserRegistered(userName, password);

    if (result) {
      {
        const token = await signJWT(result);
        return res.json({
          firstName: result.firstName,
          lastName: result.lastName,
          userType: result.userType,
          userName: result.userName,
          id: result.id,
          token,
        });
      }
    } else {
      logger.error(`login failed by user:${userName} and password:${password}`);
      return res.json(`Login Failed`);
    }
  }
);

router.post(
  `/register`,
  getValidationFunction("register"),
  async (req, res, next) => {
    const { userName } = req.body;
    if (!userName) throw new error("general error");
    try {
      const result = await isUserRegistered(userName);
      if (result) throw new Error(`User ${result.userName} is already exist`);
      const create = await createUser(req.body);
      if (create) {
        logger.info(`${req.body} has just joined us `);
        return res.json({ message: `Registration completed` });
      } else throw new Error("Registration Failed");
    } catch (ex) {
      logger.error(ex);
      return res.send({ message: "this userName is already exists!" });
    }
  }
);

module.exports = router;
