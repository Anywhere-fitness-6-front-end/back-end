const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'my not so secret backup secret, clear as day in the repo source'

function hash(password) {
	return bcrypt.hashSync(password, 8);
}

function checkPassword(password, hash) {
	return bcrypt.compareSync(password, hash);
}

function buildToken(user) {
	const payload = {
		user_id: user.user_id,
		username: user.username,
	}

	const options = {
		expiresIn: '1d',
	}

	return jwt.sign(payload, JWT_SECRET, options);
}

function decodeToken(token) {
	return new Promise(resolve => {
		jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
			if (err)
				resolve(null);
			else
				resolve(decodedToken);
		})
	})
}

async function restricted(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return next([401, "token required"]);
	}

	const decodedToken = await decodeToken(token);

	if (decodedToken) {
		req.token = decodedToken;
		console.log(req.token)
		return next();
	}
	else {
		return next([401, "token invalid"]);
	}
}

module.exports = { hash, checkPassword, buildToken, restricted, JWT_SECRET };
