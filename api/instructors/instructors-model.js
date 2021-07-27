const db = require('../../data/db-config');

async function findByUserId(user_id) {
	const result = await db('instructors').where({ user_id }).select().first();
	return result;
}

module.exports = {
	findByUserId,
}
