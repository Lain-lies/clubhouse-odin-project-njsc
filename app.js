const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const session = require("express-session");
const { Pool } = require("pg");
const passport = require("passport");
const { newPostController } = require("./controllers/controller");
const pgStore = require("connect-pg-simple")(session);
const { body, validationResult, matchedData } = require("express-validator");

require("./config/passportConfig");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
	session({
		store: new pgStore({
			pool: new Pool({
				host: process.env.SESH_HOST,
				user: process.env.SESH_USER,
				database: process.env.SESH_NAME,
				password: process.env.SESH_PASS,
				port: process.env.SESH_PORT,
			}),
			tableName: "user_sessions",
		}),
		secret: process.env.COOKIE_SECRET,
		resave: false,
		cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.post(
	"/createPost",
	express.urlencoded({ extended: true }),
	body("newpost")
		.notEmpty()
		.withMessage("Field cannot be empty")
		.trim()
		.escape(),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.error(`Error Occured: ${errors.array()}`);
			return res.send({ error: errors.array() });
		}
		next();
	},
	newPostController,
);

app.post("/logout", (req, res) => {
	req.logout((error) => {
		if (error)
			throw new Error("idk dawg something went wrong sorry bout that homeboi");
		req.session.destroy(() => {
			res.clearCookie("connect.sid");
			res.redirect("/");
		});
	});
});

app.listen(process.env.APP_PORT, (err) => {
	if (err) throw err;
	console.log(`Server running on PORT ${process.env.APP_PORT}`);
});
