const express = require('express');
const { verifyClassExists, verifyNotEnrolled } = require('./classes-middleware');
const Classes = require('./classes-model')

const router = express.Router();

// You can get the user id from req.token.user_id
// attendants table only needs the user_id and the class_id


router.get('/:class_id', verifyClassExists, async (req, res, next) => {
    try {
            const result = await Classes.getById(req.params.class_id, req.token.user_id);
            res.json(result);
        } catch (error) {
            next({status: 500, message: "internal server error", error})
    } 

});

// Not sure what I'm supposed to be doing here.
router.post('/:class_id', verifyClassExists, verifyNotEnrolled, async (req, res, next) => {
    try{
        await Classes.addMember(req.params.class_id, req.token.user_id)
        res.json({message: "Successfully added user to class."})
    } catch (error) {
        next({status: 500, message: "internal server error", error})
    }
});

router.delete('/:class_id', verifyClassExists, async (req, res, next) => {
    try {
        const removed = await Classes.remove(req.params.class_id);
        res.json(removed)
    } catch (error) {
        next({status: 500, message: "internal server error", error})
    }

});

module.exports = router;
