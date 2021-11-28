const express = require('express');
const router = express.Router();

const classController = require('../controllers/class');

router.get('/add_class', classController.createClass);

module.exports = router;
