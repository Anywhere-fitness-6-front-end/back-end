const Users = require('./users-model');

/** @type {import('express').RequestHandler} */
const validateNewUser = (req, res, next) => {
	const { email, password, name, instructor } = req.body;

	if (!email || typeof email !== 'string' || email.trim().length < 3
		|| !password || typeof password !== 'string' || password.length < 8) {
		return next([400, "username (min 3 chars) and password (min 8 chars) are required"])
	}
	else if (!name || typeof name !== 'string' || name.trim().length < 3) {
		return next([400, "name is required"]);
	}
	else {
		req.postedUser =
		{
			email: email.trim(),
			password,
			name: name.trim(),
			instructor: Boolean(instructor)
		};
		return next();
	}
};

const validateUser = (req, res, next) => {
	const { email, password } = req.body;

	if (!email || typeof email !== 'string' || email.trim().length < 3
		|| !password || typeof password !== 'string' || password.length < 8) {
		return next([400, "email and password are required"])
	}
	else {
		req.postedUser =
		{
			email: email.trim(),
			password
		};
		return next();
	}
};

/** @type {import('express').RequestHandler} */
const verifyUserExists = async (req, res, next) => {
	const user = await Users.getUser(req.postedUser.email);

	if (user) {
		req.user = user;
		return next();
	}
	else {
		next([400, "invalid credentials"]);
	}
};


/** @type {import('express').RequestHandler} */
const verifyUsernameAvailable = async (req, res, next) => {
	const user = await Users.getUser(req.postedUser.email);

	if (user) {
		return next([400, "email already registered"]);
	}
	else {
		next();
	}
};

module.exports = { validateUser, verifyUserExists, verifyUsernameAvailable, validateNewUser };
