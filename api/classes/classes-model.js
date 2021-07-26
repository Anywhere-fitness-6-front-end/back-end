const db = require('../../data/db-config');

async function getAll() {
	return await db('classes')
		.join('instructors', 'classes.instructor_id', 'instructors.instructor_id')
		.join('activities', 'classes.activity_id', 'activities.activity_id')
		.select('classes.*', 'instructors.instructor_name', 'activities.activity_name')
}

async function getById(class_id, user_id) {
	const result = await db('classes')
		.join('instructors', 'classes.instructor_id', 'instructors.instructor_id')
		.join('activities', 'classes.activity_id', 'activities.activity_id')
		.where({ class_id })
		.select('classes.*', 'instructors.instructor_name', 'instructors.user_id as inst_user_id', 'activities.activity_name').first()

	const attending = await db('attendants')
		.join('users', 'attendants.user_id', 'users.user_id')
		.where('attendants.class_id', class_id)
		.select('users.username', 'users.user_id');

	// this means the instructor is requesting the class info, so we can include
	// the list of attendants
	if (result.inst_user_id === user_id) {
		result.attending = attending;
	}
	// if it's not the instructor, don't include the list of attending
	// but show whether or not the requesting user is enrolled
	else {
		if (attending.filter(atn => atn.user_id === user_id).length)
			result.isEnrolled = true;
		else
			result.isEnrolled = false;
	}

	delete result.inst_user_id;

	return result;
}

module.exports = {
	getAll,
	getById
}
