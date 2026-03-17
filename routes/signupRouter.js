const express = require("express");
const { handleSignUpController } = require("../controllers/controller");
const { body, validationResult, matchedData } = require("express-validator");
const signupRouter = express.Router();

signupRouter.get("/", (req, res) => res.render("signup", {}));
const validators = [
	body("username")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
	body("firstname")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
	body("lastname")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
	body("password")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
];


signupRouter.post(
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
	handleSignUpController,
);

module.exports = signupRouter;
