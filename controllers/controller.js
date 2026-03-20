const { getPosts, insertNewUsers, insertNewPost } = require("../db/queries");
const { generatePassword } = require("../authentication/auth");
const bcrypt = require("bcryptjs");

async function getIndexController(req, res) {
	if (req.isAuthenticated()) {
		try {
			const posts = await getPosts();
			res.render("index", { posts: posts, isAuthenticated: true });
		} catch (error) {
			console.error(error);
		}
	} else {
		res.render("index", { isAuthenticated: false });
	}
}

async function handleSignUpController(req, res) {
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

async function newPostController(req, res) {
	try {
		await insertNewPost([req.body.newpost, req.user.id]);
		res.redirect("/");
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	getIndexController,
	handleSignUpController,
	newPostController,
};
