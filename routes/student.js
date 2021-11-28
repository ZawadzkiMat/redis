const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');

router.get('/student', studentController.getStudents);
router.get('/student/:id', studentController.getStudent);
router.get('/new_student', studentController.createStudentForm);
router.get('/createStudent', studentController.createStudent);

module.exports = router;
