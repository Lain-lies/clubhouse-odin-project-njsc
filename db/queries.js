const pool = require("./pool");

async function getPosts() {
	let query = `
            SELECT post,
            CONCAT(firstname,' ',lastname)  AS fullname
            FROM posts
            INNER JOIN users
            ON posts.user_id = users.id;                                                                   
        `;
	try {
		const { rows } = await pool.query(query);
		return rows;
	} catch (error) {
		throw new Error(error);
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

async function insertNewPost(values) {
	const query = `
		INSERT INTO posts (post, user_id) VALUES ($1, $2);
	`;
	try {
		await pool.query(query, values);
	} catch (error) {
		throw new Error();
	}
}
module.exports = {
	getPosts,
	insertNewUsers,
	getUser,
	getUserById,
	insertNewPost,
};
