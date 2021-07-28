const express = require('express');
const Classes = require('./classes-model')

const router = express.Router();

// You can get the user id from req.token.user_id
// attendants table only needs the user_id and the class_id


router.get('/:class_id', async (req, res, next) => {
    try {
        const result = await Classes.getById(req.params.class_id, req.token.user_id);
        res.json(result);
    } catch (error) {
        res.status(500).json(error)
    }

});

// Not sure what I'm supposed to be doing here.
router.post('/:class_id', (req, res, next) => {

});

router.delete('/:class_id', async (req, res, next) => {
    try {
        const removed = await Classes.remove(req.params.class_id);
        res.json(removed)
    } catch (err) {
        console.error(err)
    }

});

module.exports = router;
