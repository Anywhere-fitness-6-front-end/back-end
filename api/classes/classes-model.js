const db = require('../../data/db-config');
const Enroll = require('../enroll/enroll-model');

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

	// this means the instructor is requesting the class info, so we can include
	// the list of attendants
	if (result.inst_user_id === user_id || user_id === true) {
		result.enrolled = await Enroll.getEnrolled();
	}
	// if it's not the instructor, don't include the list of attending
	// but show whether or not the requesting user is enrolled
	else {
		result.enrolled = await Enroll.isEnrolled(class_id, user_id);
	}

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

async function changeAvailability(class_id, n) {
	const result = await db('classes').where({ class_id }).increment('available_slots', n);
	return result;
}

module.exports = {
	getAll,
	getById,
	add,
	update,
	remove,
	changeAvailability,
}
