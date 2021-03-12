require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = express();
const auth = require("./routes/auth/login");
const vacations = require("./routes/travels/index");
const Admin = require("./routes/travels/Admin");

api.use(cors());
api.use(bodyParser.json());

api.use("/auth", auth);
api.use("/vacations", vacations);
api.use("/vacations/Admin", Admin);

api.use((error, req, res, next) => {
  console.log("in error handler...");
  res.send("Something went wrong");
});

api.listen(process.env.PORT, () => {
  console.log(`Server is listening to Port ${process.env.PORT}`);
});
