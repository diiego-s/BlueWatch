const {Router} = require('express');
const controller = require('./volunteer_controller.js');

const router = Router();

router.get('/:id', controller.getVolunteerbyId);
router.post('/', controller.postVolunteer);

module.exports = router;