const express = require('express');
const router = express.Router();

router.use('/api/v1/auth', require('./api/auth.api'));

module.exports = router;