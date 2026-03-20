const express = require("express");
const indexRouter = express.Router();
const { getIndexController } = require("../controllers/controller");

indexRouter.get("/", getIndexController);

module.exports = indexRouter;
