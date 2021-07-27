const express = require('express');
const Activities = require('./activities-model');

const router = express.Router();

router.get('/', (req, res, next) => {
	Activities.listActivities().then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	)
});

module.exports = router;
