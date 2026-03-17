const passport = require("passport");
const LocalStrategy = require("passport-local");
const { getUser, getUserById } = require("../db/queries");
const { checkIfPasswordMatch } = require("../authentication/auth");

async function verifyCallback(username, password, done) {
	try {
		const user = await getUser(username);
		if (!user) return done(null, false);
		const isPasswordValid = await checkIfPasswordMatch(password, user.password);
		return isPasswordValid ? done(null, user) : done(null, false);
	} catch (error) {
		console.error(error);
		done(error);
	}
}

const authStrategy = new LocalStrategy(verifyCallback);

passport.use(authStrategy);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (userId, done) => {
	try {
		const user = await getUserById(userId);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
