const express = require('express');
const router = express.Router();

const keysController = require('../controllers/keys');

router.get('/keys', keysController.getKeys);

module.exports = router;
