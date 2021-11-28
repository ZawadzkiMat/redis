const express = require('express');
const router = express.Router();

const luaController = require('../controllers/lua');

router.get('/lua', luaController.getInfo);

module.exports = router;
