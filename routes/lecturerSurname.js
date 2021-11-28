const express = require('express');
const router = express.Router();

const lecturerController = require('../controllers/lecturerSurname');

router.get('/wykladowcy_nazwiska', lecturerController.getLecturerSurname);

module.exports = router;
