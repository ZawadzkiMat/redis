const express = require('express');
const router = express.Router();

const lecturerController = require('../controllers/lecturer');

router.get('/wykladowcy_nazwiska', lecturerController.getLecturerSurname);
router.get('/wykladowcy_przedmioty', lecturerController.getLecturerClasses);

module.exports = router;
