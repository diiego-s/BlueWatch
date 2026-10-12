const {Router} = require('express');
const controller = require('./report_controller.js');

const router = Router();

router.get('/:id', controller.getReportbyId);

module.exports = router;