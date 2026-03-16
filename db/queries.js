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

module.exports = { getPosts, insertNewUsers };
