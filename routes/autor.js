const express = require('express');
const router = express.Router();

const authorController = require('../controllers/author');

router.get('/autor', authorController.getOneAuthor);

module.exports = router;
