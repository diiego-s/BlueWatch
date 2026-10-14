const {Router} = require('express');
const controller = require('./volunteer_controller.js');

const router = Router();

router.post('/', controller.postVolunteer);

module.exports = router;