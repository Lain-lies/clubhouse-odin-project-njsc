const { getPosts, insertNewUsers } = require("../db/queries");
const { generatePassword } = require("../authentication/auth");
const bcrypt = require("bcryptjs");

async function getIndexController(req, res) {
	const authenticated = req.isAuthenticated();
	if (authenticated) {
		const posts = await getPosts(authenticated);
		res.render("index", { posts: posts, isAuthenticated: authenticated });
	} else {
		res.render("index", { isAuthenticated: authenticated });
	}
}

async function handleSignUpController(req, res) {
	const salt = await bcrypt.genSalt(12);
	try {
		const hashed = await generatePassword(req.body.password);
		const values = [
			req.body.username,
			req.body.firstname,
			req.body.lastname,
			hashed,
		];
		await insertNewUsers(values);
		res.redirect("/");
	} catch (error) {
		console.error(error);
		res.send("<h1>An error occured</h1>");
	}
}

module.exports = { getIndexController, handleSignUpController };
