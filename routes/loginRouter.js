const express = require("express");
const { body, validationResult, matchedData } = require("express-validator");
const passport = require("passport");
const loginRouter = express.Router();

loginRouter.get("/", (req, res) => res.render("login", {}));

const validators = [
	body("username")
		.notEmpty()
		.withMessage("Username cannot be empty")
		.trim()
		.escape(),
	body("password")
		.notEmpty()
		.withMessage("Password cannot be empty")
		.trim()
		.escape(),
];

loginRouter.post(
	"/",
	express.urlencoded({ extended: true }),
	validators,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(`Error Occured: ${errors.array()}`);
			return res.send({ error: errors.array() });
		}
		next();
	},
	passport.authenticate("local"),
	(req, res) => res.redirect("./"),
);

module.exports = loginRouter;
