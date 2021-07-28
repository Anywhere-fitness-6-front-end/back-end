const db = require('../../data/db-config')

async function getUser(email) {
	const result = await db('users').where({ email }).select().first();

	return result;
}

async function addUser(user) {
	const [result] = await db('users').insert(user, "*");

	// if (result)
	// 	return await getUser(user.username);
	// else
	// 	return null;

	return result;
}

module.exports = { getUser, addUser };
