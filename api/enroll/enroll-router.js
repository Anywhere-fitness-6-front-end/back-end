const express = require('express');
const Classes = require('../classes/classes-model');
const Enroll = require('../enroll/enroll-model');
const router = express.Router();


// You can get the user id from req.token.user_id
// attendants table only needs the user_id and the class_id

router.get('/', (req, res, next) => {

});

router.get('/:id', async (req, res, next) => {
	const class_id = req.params.id;
	const user_id = req.token.user_id;

	const info = await Classes.getById(class_id, user_id);

	res.status(200).json({ enrolled: info.enrolled });
});

router.post('/:id', (req, res, next) => {
	const class_id = req.params.id;
	const user_id = req.token.user_id;

	Enroll.enrollUser(class_id, user_id).then(
		result => {
			res.status(200).json(result);
		},
		error => next(error)
	);
});

router.delete('/', (req, res, next) => {

});

module.exports = router;
