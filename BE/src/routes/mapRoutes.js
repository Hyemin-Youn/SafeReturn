const express = require('express');
const router = express.Router();
const {mapController} = require('../controllers');

router.get('/facilities', mapController.getFacilities);

module.exports = router;