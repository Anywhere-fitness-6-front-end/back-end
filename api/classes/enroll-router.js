const express = require('express');

const router = express.Router();

// You can get the user id from req.token.user_id
// attendants table only needs the user_id and the class_id


router.get('/:class_id', (req, res, next) => {

});

router.post('/:class_id', (req, res, next) => {

});

router.delete('/:class_id', (req, res, next) => {

});

module.exports = router;
