const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const validateUrl = require('../middleware/validateUrl');

router.post('/shorten', validateUrl, urlController.shortenUrl);
router.get('/:shortCode', urlController.redirectToUrl);
router.get('/stats/:shortCode', urlController.getUrlStats);

module.exports = router;