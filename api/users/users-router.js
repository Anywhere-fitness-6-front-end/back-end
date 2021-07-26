const express = require('express');
const { buildToken, checkPassword } = require('../secure');
const { validateUser, verifyUsernameAvailable, verifyUserExists } = require('./users-middleware');
const { addUser } = require('./users-model');

const router = express.Router();

router.post('/register', validateUser, verifyUsernameAvailable, async (req, res) => {
	const user = await addUser(req.postedUser);
	return res.status(200).json(user);
});

router.post('/login', validateUser, verifyUserExists, (req, res, next) => {
	if (checkPassword(req.postedUser.password, req.user.password)) {
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
