const express = require('express');
const router = express.Router();

const classController = require('../controllers/class');

router.get('/new_class', classController.createClassForm);
router.get('/createClass', classController.createClass);

module.exports = router;
