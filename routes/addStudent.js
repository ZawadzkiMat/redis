const express = require('express');
const router = express.Router();

const addStudentController = require('../controllers/addStudent');

router.get('/new_student', authorController.getOneAuthor);

module.exports = router;
