const express = require('express');
const { buildToken, checkPassword, hash } = require('../secure');
const { validateUser, verifyUsernameAvailable, verifyUserExists, validateNewUser } = require('./users-middleware');
const { addUser } = require('./users-model');

const router = express.Router();

router.post('/register', validateNewUser, verifyUsernameAvailable, async (req, res) => {
	req.postedUser.password = hash(req.postedUser.password);
	const user = await addUser(req.postedUser);

	if (user)
		delete user.password;

	return res.status(201).json(user);
});

router.post('/login', validateUser, verifyUserExists, async (req, res, next) => {
	if (checkPassword(req.postedUser.password, req.user.password)) {
		return res.status(200).json({
			message: `welcome, ${req.user.name}`,
			token: buildToken(req.user)
		})
	}
	else {
		return next([401, "invalid credentials"]);
	}
});

module.exports = router;
