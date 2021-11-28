const express = require('express');
const router = express.Router();

const tabController = require('../controllers/tab');

router.get('/tab', tabController.readList);

module.exports = router;
