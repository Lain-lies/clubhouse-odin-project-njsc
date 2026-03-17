const pool = require("./pool");

async function getPosts(isAuthenticated) {
	let query = "";
	if (isAuthenticated) {
		console.log(1);
		query = `
            SELECT post,
            CONCAT(firstname,' ',lastname)  AS fullname
            FROM posts
            INNER JOIN users
            ON posts.user_id = users.id;                                                                   
        `;
	} else {
		console.log(2);

		query = "SELECT post FROM posts;";
	}
	try {
		const { rows } = await pool.query(query);
		return rows;
	} catch (error) {
		console.error(error);
	}
}

async function insertNewUsers(values) {
	const query = `
		INSERT INTO users (username, firstname, lastname, password) VALUES ($1, $2, $3, $4);
	`;
	try {
		await pool.query(query, values);
	} catch (error) {
		throw new Error();
	}
}

async function getUser(username) {
	try {
		const { rows } = await pool.query(
			"SELECT * FROM users WHERE username = $1;",
			[username],
		);
		console.log(rows);
		return rows[0];
	} catch (error) {
		throw new Error("Failed fetching user");
	}
}

async function getUserById(userId) {
	try {
		const { rows } = await pool.query("SELECT * FROM users WHERE id = $1;", [
			userId,
		]);
		return rows[0];
	} catch (error) {
		throw new Error("Failed fetching user");
	}
}

module.exports = { getPosts, insertNewUsers, getUser, getUserById };
