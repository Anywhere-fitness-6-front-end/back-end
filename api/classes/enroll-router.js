const express = require('express');
const { verifyClassExists, verifyNotEnrolled } = require('./classes-middleware');
const Classes = require('./classes-model')

const router = express.Router();

// You can get the user id from req.token.user_id
// attendants table only needs the user_id and the class_id


router.get('/:class_id', verifyClassExists, async (req, res, next) => {
    try {
            const result = await Classes.getById(req.params.class_id, req.token.user_id);
            res.json(result.enrolled ? true : false);
        } catch (error) {
            next({status: 500, message: "internal server error", error})
    }

});

router.post('/:class_id', verifyClassExists, verifyNotEnrolled, async (req, res, next) => {
    try{
        if (req.available_slots > 0) {
            await Classes.addMember(req.params.class_id, req.token.user_id)
            await Classes.changeAvailability(req.params.class_id, -1)
            res.status(201).json({message: "Successfully added user to class."})
        } else {
            next([409, "no slots available"])
        }
    } catch (error) {
        next({status: 500, message: "internal server error", error})
    }
});

router.delete('/:class_id', verifyClassExists, async (req, res, next) => {
    try {
        const deleted = await Classes.removeMember(req.params.class_id, req.token.user_id);
        if (deleted) {
            await Classes.changeAvailability(req.params.class_id, 1)
            res.json({message: "Successfully removed user from class."})
        } else  {
            next({status: 409, message: "User already not enrolled in class"})
        }
    } catch (error) {
        next({status: 500, message: "internal server error", error})
    }

});

module.exports = router;
