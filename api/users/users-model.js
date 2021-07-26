const db = require('../../data/db-config')

async function getUser(username) {
	const result = await db('users').where({ username }).select().first();

	return result;
}

async function addUser(user) {
	const result = await db('users').insert(user, ['username', 'user_id', 'created_at']);

	// if (result)
	// 	return await getUser(user.username);
	// else
	// 	return null;

	return result;
}

module.exports = { getUser, addUser };
