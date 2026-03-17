const bcrypt = require("bcryptjs");

async function checkIfPasswordMatch(password, hashedPassword) {
	return bcrypt.compare(password, hashedPassword);
}

async function generatePassword(password) {
	const salt = 12;
	return await bcrypt.hash(password, salt);
}

module.exports = { checkIfPasswordMatch, generatePassword };
