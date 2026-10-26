const {Router} = require('express');
// The functions that handle the requests (the controllers) live in the other file
const controller = require('./mission_controller.js');

const router = Router();


// All paths are relative to the '/missions' prefix defined in server.js

// Get a single mission by its id
// GET /missions/:id -> a single mission (:id is a URL parameter, read with req.params.id)
router.get('/:id', controller.getMissionbyId);

// POST /missions -> create a new mission (the data comes in the JSON body)
router.post('/', controller.postMission);

//EXERCISE 1
// GET /missions/list -> list of all missions
// Must be declared BEFORE '/:id', otherwise Express would treat "list" as an id
router.get('/list', controller.getMissionList);



module.exports = router;
