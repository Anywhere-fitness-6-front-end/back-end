const db = require('../../data/db-config');
const Classes = require('../classes/classes-model');

async function getEnrolled(class_id) {
	const result = await db('attendants')
		.join('users', 'attendants.user_id', 'users.user_id')
		.where('attendants.class_id', class_id)
		.select('users.name', 'users.user_id');

	return result;
}

async function isEnrolled(class_id, user_id) {
	const result = await db('attendants')
		.where({ class_id, user_id })
		.count().first();

	console.log(result.count);
	if (result.count > 0)
		return true;
	else
		return false;
}

/**
 *
 * @param {number} class_id
 * @param {number} user_id
 * @returns {Boolean} if user was enrolled
 */
async function enrollUser(class_id, user_id) {
	db.transaction(async (tran) => {

		const { available_slots } = await db('classes').where({ class_id }).select('available_slots').first();

		if (available_slots > 0) {
			const result = await tran('attendants')
				.insert({ class_id, user_id });
			console.log(result);

			const resultb = await Classes.changeAvailability(class_id, -1);
			console.log(resultb);
		}
	})

	return;
}

module.exports = {
	getEnrolled,
	isEnrolled,
	enrollUser,
}
