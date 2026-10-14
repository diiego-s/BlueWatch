const {Router} = require('express');
const controller = require('./report_controller.js');

const router = Router();

router.get('/:id', controller.getReportbyId);

router.post('/', controller.postReport);

module.exports = router;