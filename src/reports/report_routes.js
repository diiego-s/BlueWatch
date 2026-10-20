const {Router} = require('express');
// The controllers contain the logic of each route
const controller = require('./report_controller.js');

const router = Router();

// Paths are relative to the '/reports' prefix defined in server.js

// GET /reports/:id -> a single report
router.get('/:id', controller.getReportbyId);

// POST /reports -> create a new report
router.post('/', controller.postReport);

// GET /reports/:id/volunteer -> all reports written by the volunteer with that id
router.get('/:id/volunteer', controller.getReportbyVol);

module.exports = router;
