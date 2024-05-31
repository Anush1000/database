const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('photo'), patientController.registerPatient);

module.exports = router;
