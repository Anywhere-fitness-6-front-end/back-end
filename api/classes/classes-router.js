const express = require('express');
const { restricted } = require('../secure');
const { validateClass } = require('./classes-middleware');
const Classes = require('./classes-model');

const router = express.Router();

/*

get 		/classes
get 		/classes?activity={activity}&intensity={intensity}&instructor={instructor_id}
get 		/classes/{id}
post 		/classes
put 		/classes/{id}
delete 	/classes/{id}

get 		/classes/{id}/enroll
					for the class instructor:	returns a list of users enrolled in the class
					for any other user: returns true if user is enrolled in the class

post		/classes/{id}/enroll
					enrolls the user in the class (if space available)
delete  /classes/{id}/enroll
					removes the user from the class
*/

router.get('/', restricted, (req, res, next) => {
	Classes.getAll().then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	);
});

router.get('/:id', restricted, (req, res, next) => {
	Classes.getById(req.params.id, req.token.user_id).then(
		result => {
			if (result)
				res.status(200).json(result);
			else
				next([404, "not found"]);
		},
		error => next(error)
	);
});

router.post('/', validateClass, (req, res, next) => {
	Classes.add(req.newClass).then(
		result => {
			res.status(201).json(result);
		},
		error => next(error)
	)
});

router.put('/:id', (req, res, next) => {
	const upd = {};

	if (req.body.class_name)
		upd.class_name = req.body.class_name;

	if (req.body.class_time)
		upd.class_time = req.body.class_time;

	if (req.body.address)
		upd.address = req.body.address;

	if (req.body.max_size)
		upd.max_size = req.body.max_size;

	Classes.update(req.params.id, upd).then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	)
});

router.delete('/:id', (req, res, next) => {
	Classes.remove(req.params.id).then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	)
});

module.exports = router;
