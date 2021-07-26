const express = require('express');
const { restricted } = require('../secure');
const Classes = require('./classes-model');

const router = express.Router();

router.get('/', restricted, (req, res, next) => {
	Classes.getAll().then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	);
});

router.get('/:id', restricted, (req, res, next) => {
		Classes.getById(req.params.id, req.decodedToken.user_id).then(
		result => {

			res.status(200).json(result);

		},
		error => next(error)
	);
});

module.exports = router;
