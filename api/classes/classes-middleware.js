const Classes = require('./classes-model')

/** @type {express.RequestHandler} */
const validateClass = (req, res, next) => {

	const { class_name, class_time, duration, activity_name, intensity, address, max_size } = req.body;

	const newClass = {
		class_name,
		class_time,
		duration,
		activity_name,
		intensity,
		address,
		max_size,
		available_slots: max_size,
		instructor_id: req.instructor.instructor_id
	}

	req.newClass = newClass;
	next();
};

/** @type {express.RequestHandler} */
const verifyClassExists = async (req, res, next) => {
	const existing = await Classes.getById(req.params.class_id, req.token.user_id);
	if (!existing) {
		next({status: 404, message: `Class not found`, class_id: req.params.class_id, user_id: req.token.user_id })
	} else {
		next()
	}
}

module.exports = { validateClass };
