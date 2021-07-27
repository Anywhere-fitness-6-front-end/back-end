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

module.exports = { validateClass };
