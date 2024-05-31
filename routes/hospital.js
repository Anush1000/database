const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

router.post('/data', hospitalController.getHospitalData);

module.exports = router;
