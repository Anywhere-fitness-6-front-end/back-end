const db = require('../../data/db-config');

/*
 This is the shape the front end team is using:

 {
	"class_name": "spin class",
	* "instructor_name": "bailey",
	"activity_name": "cycling",
	"address": "123 Yoga Lane, Sun Town, CA",
	"class_time": "2021-07-31T01:01:00.000z",
	"duration": 5,
	"intensity": "easy",
	"max_size": 10,
	* "available_slots": 15
}

*/

async function getAll() {
	return await db('classes').select();
}

async function getById(class_id, user_id) {
	const result = await db('classes')
	.where({ class_id })
		.join('users', 'classes.instructor_id', 'users.user_id')
		.select('classes.*', 'users.name as instructor_name').first()

	if (!result)
		return null;

	const attending = await db('attendants')
		.join('users', 'attendants.user_id', 'users.user_id')
		.where('attendants.class_id', class_id)
		.select('users.name', 'users.user_id');

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
