const express = require("express");
const indexRouter = express.Router();
const { getIndexController } = require("../controllers/controller");

function fakeAuth(req, res, next) {
	req.testFakeAuth = true;
	next();
}

indexRouter.get("/", (req, res) => res.render("index", {}));

module.exports = indexRouter;
