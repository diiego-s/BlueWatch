const {Router} = require('express');
// The controllers contain the logic of each route
const controller = require('./volunteer_controller.js');

const router = Router();

// Paths are relative to the '/volunteers' prefix defined in server.js

// GET /volunteers/:id -> a single volunteer
router.get('/:id', controller.getVolunteerbyId);
// POST /volunteers -> create a new volunteer
router.post('/', controller.postVolunteer);
// PUT /volunteers/:id -> update an existing volunteer
router.put('/:id', controller.putVolunteer);
// GET /volunteers/:id/mission -> volunteers linked to the mission with that id
router.get('/:id/mission', controller.getVolunteerbyMission);

module.exports = router;
