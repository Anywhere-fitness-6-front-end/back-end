const express = require('express');
const { buildToken, checkPassword, hash } = require('../secure');
const { validateUser, verifyUsernameAvailable, verifyUserExists } = require('./users-middleware');
const { addUser } = require('./users-model');
const Instructors = require('../instructors/instructors-model');

const router = express.Router();

router.post('/register', validateUser, verifyUsernameAvailable, async (req, res) => {
	const newUser = {
		username: req.postedUser.username,
		password: hash(req.postedUser.password)
	}
	const user = await addUser(newUser);
	return res.status(201).json(user);
});

router.post('/login', validateUser, verifyUserExists, async (req, res, next) => {
	if (checkPassword(req.postedUser.password, req.user.password)) {

		const instructor = await Instructors.findByUserId(req.user.user_id);
		if (instructor) {
			req.user.instructor_id = instructor.instructor_id;
		}

		return res.status(200).json({
			message: `welcome, ${req.user.username}`,
			token: buildToken(req.user)
		})
	}
	else {
		return next([401, "invalid credentials"]);
	}
});

module.exports = router;
