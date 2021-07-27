const db = require('../../data/db-config');

async function listActivities() {
	const result = await db('activities').select();

	return result;
}

module.exports = { listActivities };
