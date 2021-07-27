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

	if (!result)
		return null;

	const attending = await db('attendants')
		.join('users', 'attendants.user_id', 'users.user_id')
		.where('attendants.class_id', class_id)
		.select('users.username', 'users.user_id');

	// this means the instructor is requesting the class info, so we can include
	// the list of attendants
	if (result.inst_user_id === user_id || user_id === true) {
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

async function add(classInfo) {
	const result = await db('classes').insert(classInfo, 'class_id');
	console.log(result)

	const newClass = getById(result[0], true)
	return newClass;
}

async function update(class_id, classInfo) {
	const result = await db('classes').where({ class_id }).update(classInfo);
	return result;
}

async function remove(class_id) {
	const result = await db('classes').where({ class_id }).delete();
	return result;
}

module.exports = {
	getAll,
	getById,
	add,
	update,
	remove,
}
