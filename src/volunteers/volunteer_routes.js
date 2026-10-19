const {Router} = require('express');
const controller = require('./volunteer_controller.js');

const router = Router();

router.get('/:id', controller.getVolunteerbyId);
router.post('/', controller.postVolunteer);
router.put('/:id', controller.putVolunteer);
router.get('/:id/mission', controller.getVolunteerbyMission);

module.exports = router;