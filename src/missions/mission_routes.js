const {Router} = require('express');
const controller = require('./mission_controller.js');

const router = Router();


//EXERCISE 1
router.get('/', controller.getMissionList);

// Get a single mission by its id
router.get('/:id', controller.getMissionbyId);

router.post('/', controller.postMission);


module.exports = router;