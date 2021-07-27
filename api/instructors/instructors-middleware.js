const Instructors = require('./instructors-model')

/** @type {express.RequestHandler} */
const checkInstructor = async (req, res, next) => {
	const user_id = req.token.user_id;

	const result = await Instructors.findByUserId(user_id);

	if (result) {
		req.instructor = result;
		return next();
	}
	else {
		return next([400, "only for instructors"]);
	}
};

module.exports = {
	checkInstructor,
}
